const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const dirsToScan = [
  path.join(__dirname, 'public/layers'),
  path.join(__dirname, 'public/reels'),
  path.join(__dirname, 'public/videos'),
  path.join(__dirname, 'public/logos'),
  path.join(__dirname, 'public/solutions'),
  path.join(__dirname, 'public/images'),
  path.join(__dirname, 'public/slideshow')
];

async function optimizeImages() {
  for (const dir of dirsToScan) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const fullPath = path.join(dir, file);
        const newPath = path.join(dir, path.basename(file, path.extname(file)) + '.webp');
        if (!fs.existsSync(newPath)) {
          console.log(`Converting ${file} to WebP...`);
          try {
            await sharp(fullPath)
              .webp({ quality: 80, effort: 6 })
              .toFile(newPath);
            console.log(`Success: ${newPath}`);
          } catch (e) {
            console.error(`Error converting ${file}:`, e);
          }
        }
      }
    }
  }
}

function runFfmpeg(input, output, options) {
  return new Promise((resolve) => {
    ffmpeg(input)
      .outputOptions(options)
      .save(output)
      .on('end', () => {
        console.log(`Success: ${output}`);
        resolve(true);
      })
      .on('error', (err) => {
        console.error(`Error generating ${output}:`, err.message);
        resolve(false);
      });
  });
}

async function optimizeVideos() {
  const videoFiles = [];
  for (const dir of dirsToScan) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.mp4', '.webm'].includes(ext)) {
        if (!file.includes('_opt.')) {
          videoFiles.push(path.join(dir, file));
        }
      }
    }
  }

  console.log(`Found ${videoFiles.length} raw videos to process.`);

  for (const fullPath of videoFiles) {
    const filename = path.basename(fullPath);
    const dir = path.dirname(fullPath);
    const ext = path.extname(fullPath);
    const baseName = path.basename(fullPath, ext);
    
    const newPathMp4 = path.join(dir, `${baseName}_opt.mp4`);
    const newPathWebm = path.join(dir, `${baseName}_opt.webm`);

    const isReel = fullPath.includes('reels');
    const isHeroVideo = filename === 'banner-video-6-2.mp4';
    const isMobileVideo = filename === 'mobile.mp4';
    const isSolution = fullPath.includes('solutions');

    // MP4 Configuration
    const crfMp4 = isHeroVideo ? 24 : (isMobileVideo ? 28 : (isReel ? 32 : 28));
    const presetMp4 = (isHeroVideo || isMobileVideo) ? 'medium' : 'fast';
    
    const mp4Options = [
      '-vcodec libx264',
      `-crf ${crfMp4}`,
      `-preset ${presetMp4}`,
      '-profile:v high',
      '-pix_fmt yuv420p',
      '-movflags +faststart',
      '-an' // Strip audio for background loops
    ];

    if (isReel) {
      mp4Options.push('-vf scale=-2:480');
    } else if (isSolution) {
      mp4Options.push('-vf scale=-2:720');
    } else if (isMobileVideo) {
      mp4Options.push('-vf scale=-2:720');
    }

    // WebM Configuration (VP9 tuned for lightweight web delivery)
    const crfWebm = isHeroVideo ? 32 : (isMobileVideo ? 34 : (isReel ? 36 : 34));
    const webmOptions = [
      '-vcodec libvpx-vp9',
      `-crf ${crfWebm}`,
      '-b:v 450k',
      '-maxrate 650k',
      '-bufsize 1300k',
      '-deadline good',
      '-cpu-used 4',
      '-an' // Strip audio for background loops
    ];

    if (isReel) {
      webmOptions.push('-vf scale=-2:480');
    } else if (isSolution) {
      webmOptions.push('-vf scale=-2:720');
    } else if (isMobileVideo) {
      webmOptions.push('-vf scale=-2:720');
    }

    const forceOverwrite = true;

    // Process MP4
    if (forceOverwrite || !fs.existsSync(newPathMp4)) {
      console.log(`Compressing ${filename} to MP4 (CRF ${crfMp4})...`);
      if (fs.existsSync(newPathMp4)) {
        try { fs.unlinkSync(newPathMp4); } catch (_) {}
      }
      await runFfmpeg(fullPath, newPathMp4, mp4Options);
    }

    // Process WebM
    if (forceOverwrite || !fs.existsSync(newPathWebm)) {
      console.log(`Compressing ${filename} to WebM (CRF ${crfWebm})...`);
      if (fs.existsSync(newPathWebm)) {
        try { fs.unlinkSync(newPathWebm); } catch (_) {}
      }
      await runFfmpeg(fullPath, newPathWebm, webmOptions);
    }
  }
}

async function run() {
  console.log("Optimizing images...");
  await optimizeImages();
  console.log("Optimizing videos...");
  await optimizeVideos();
  console.log("Optimization complete!");
}

run();

