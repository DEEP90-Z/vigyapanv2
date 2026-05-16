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
  path.join(__dirname, 'public/logos')
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

function optimizeVideos() {
  const videoFiles = [];
  for (const dir of dirsToScan) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.mp4') {
        // we append _opt to the compressed video
        if (!file.endsWith('_opt.mp4')) {
           videoFiles.push(path.join(dir, file));
        }
      }
    }
  }

  return new Promise((resolve) => {
    let index = 0;
    function processNext() {
      if (index >= videoFiles.length) {
        resolve();
        return;
      }
      const fullPath = videoFiles[index++];
      const newPath = path.join(path.dirname(fullPath), path.basename(fullPath, '.mp4') + '_opt.mp4');
      if (fs.existsSync(newPath)) {
        console.log(`Skipping existing ${newPath}`);
        processNext();
        return;
      }
      console.log(`Compressing ${path.basename(fullPath)}...`);
      
      const isReel = fullPath.includes('reels');
      const isHeroVideo = path.basename(fullPath) === 'banner-video-6-2.mp4';
      const crf = isHeroVideo ? 16 : (isReel ? 30 : 24);
      const videoOptions = [
        '-vcodec libx264',
        `-crf ${crf}`,
        `-preset ${isHeroVideo ? 'slow' : 'fast'}`,
        '-profile:v high',
        '-pix_fmt yuv420p',
        '-movflags +faststart',
      ];

      if (isHeroVideo) {
        videoOptions.push('-an');
      } else {
        videoOptions.push('-vf scale=-2:720');
        videoOptions.push('-acodec aac');
        videoOptions.push('-b:a 128k');
      }

      ffmpeg(fullPath)
        .outputOptions(videoOptions)
        .save(newPath)
        .on('end', () => {
          console.log(`Success: ${newPath}`);
          processNext();
        })
        .on('error', (err) => {
          console.error(`Error compressing ${fullPath}:`, err);
          processNext();
        });
    }
    processNext();
  });
}

async function run() {
  console.log("Optimizing images...");
  await optimizeImages();
  console.log("Optimizing videos...");
  await optimizeVideos();
  console.log("Optimization complete!");
}

run();
