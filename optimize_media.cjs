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
  path.join(__dirname, 'public/solutions')
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
              .webp({ quality: 75, effort: 6 })
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
      if (path.extname(file).toLowerCase() === '.mp4') {
        if (!file.endsWith('_opt.mp4')) {
           videoFiles.push(path.join(dir, file));
        }
      }
    }
  }

  console.log(`Found ${videoFiles.length} videos to process.`);

  for (const fullPath of videoFiles) {
    const filename = path.basename(fullPath);
    const dir = path.dirname(fullPath);
    const baseName = path.basename(fullPath, '.mp4');
    
    const newPathMp4 = path.join(dir, `${baseName}_opt.mp4`);
    const newPathWebm = path.join(dir, `${baseName}_opt.webm`);

    const isReel = fullPath.includes('reels');
    const isHeroVideo = filename === 'banner-video-6-2.mp4';
    const isMobileVideo = filename === 'mobile.mp4';
    const isSolution = fullPath.includes('solutions');

    // MP4 Configuration
    const crfMp4 = isHeroVideo ? 22 : (isMobileVideo ? 26 : (isReel ? 32 : 28));
    const presetMp4 = (isHeroVideo || isMobileVideo) ? 'medium' : 'fast';
    
    const mp4Options = [
      '-vcodec libx264',
      `-crf ${crfMp4}`,
      `-preset ${presetMp4}`,
      '-profile:v high',
      '-pix_fmt yuv420p',
      '-movflags +faststart',
      '-an' // Strip audio for all since they are muted background loops
    ];

    if (isReel) {
      mp4Options.push('-vf scale=-2:540');
    } else if (isSolution) {
      mp4Options.push('-vf scale=-2:720');
    } else if (isMobileVideo) {
      // Keep mobile video at high compression scale (height 720)
      mp4Options.push('-vf scale=-2:720');
    }

    // WebM Configuration (VP9)
    const crfWebm = isHeroVideo ? 30 : (isMobileVideo ? 34 : (isReel ? 38 : 34));
    const webmOptions = [
      '-vcodec libvpx-vp9',
      `-crf ${crfWebm}`,
      '-b:v 0',
      '-deadline realtime',
      '-cpu-used 8',
      '-an' // Strip audio
    ];

    if (isReel) {
      webmOptions.push('-vf scale=-2:540');
    } else if (isSolution) {
      webmOptions.push('-vf scale=-2:720');
    } else if (isMobileVideo) {
      webmOptions.push('-vf scale=-2:720');
    }

    const forceOverwrite = true;

    // Process MP4
    if (forceOverwrite || !fs.existsSync(newPathMp4)) {
      console.log(`Compressing ${filename} to MP4 (CRF ${crfMp4}, force=${forceOverwrite})...`);
      // Delete old file if exists to prevent ffmpeg prompt or block issues
      if (fs.existsSync(newPathMp4)) {
        try { fs.unlinkSync(newPathMp4); } catch (_) {}
      }
      await runFfmpeg(fullPath, newPathMp4, mp4Options);
    } else {
      console.log(`Skipping existing MP4: ${path.basename(newPathMp4)}`);
    }

    // Process WebM
    if (forceOverwrite || !fs.existsSync(newPathWebm)) {
      console.log(`Compressing ${filename} to WebM (CRF ${crfWebm}, force=${forceOverwrite})...`);
      if (fs.existsSync(newPathWebm)) {
        try { fs.unlinkSync(newPathWebm); } catch (_) {}
      }
      await runFfmpeg(fullPath, newPathWebm, webmOptions);
    } else {
      console.log(`Skipping existing WebM: ${path.basename(newPathWebm)}`);
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
