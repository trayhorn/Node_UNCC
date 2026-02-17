const net = require('node:net');
const fs = require('node:fs/promises');
const path = require('node:path');

const PORT = 4080;
const HOST = '127.0.0.1';

const clearLine = (dir) => {
  return new Promise((resolve) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const socket = net.createConnection({host: HOST, port: PORT}, async () => {
  const filePath = process.argv[2];

  //Error handling for cases where path isn't passed or incorrect
  try {
    if (!filePath) {
      throw new Error('NO_PATH');
    }

    fileHandle = await fs.open(filePath, 'r');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('There is no such file');
    } else if (error.message === 'NO_PATH') {
      console.log('No filename has been provided');
    } else {
      console.error(error);
    }
    socket.end();
    return;
  }
  const fileName = path.basename(filePath);

  const readStream = fileHandle.createReadStream();
  const fileSize = (await fileHandle.stat()).size;

  let uploadedPercentage = 0;
  let bytesUploaded = 0;

  console.log();

  socket.write(`fileName: ${fileName}---`);

  readStream.on('data', async (data) => {
    if(!socket.write(data)) {
      readStream.pause();
    }

    bytesUploaded += data.length; // add the number of bytes read to the variable
    let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);

    if(newPercentage !== uploadedPercentage) {
      uploadedPercentage = newPercentage;
      await moveCursor(0, -1);
      await clearLine(0);
      console.log(`Uploading... ${uploadedPercentage}%`);
    }
  })

  socket.on('drain', () => readStream.resume());

  readStream.on('end', () => {
    console.log('The file was uploaded');
    socket.end();
  })
});