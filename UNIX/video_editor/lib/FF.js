const { spawn } = require("node:child_process");
const path = require('node:path');

function makeThumbnail(fullPath, thumlnailPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      fullPath,
      "-ss",
      "5",
      "-vframes",
      "1",
      thumlnailPath
    ]);

    ffmpeg.on('close', (code) => {
      if(code === 0) {
        resolve();
      } else {
        reject(`FFmpeg exited with this code: ${code}`);
      }
    })

    ffmpeg.on('error', (error) => {
      reject(error);
    })
  })
}

function getDimensions(fullPath) {
  return new Promise((resolve, reject) => {
    const ffprobe = spawn("ffprobe", [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "csv=p=0",
      fullPath,
    ]);

    let dimensions = '';
    ffprobe.stdout.on('data', (data) => {
      dimensions += data.toString("utf-8");
    })

    ffprobe.on('close', (code) => {
      if(code === 0) {
        dimensions = dimensions.replace(/\s/g, "").split(',');
        console.log(dimensions);
        resolve({
          width: Number(dimensions[0]),
          height: Number(dimensions[1])
        });
      } else {
        reject(`FFmpeg exited with this code: ${code}`);
      }
    })

    ffprobe.on('error', (error) => {
      reject(error);
    })
  })
}

module.exports = {
  makeThumbnail,
  getDimensions,
};