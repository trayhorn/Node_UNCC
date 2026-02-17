const fs = require('node:fs/promises');
const { pipeline } = require('node:stream');

// Incorrect way
// (async () => {
//   const textFile = await fs.open('text-copy.txt', 'w');
//   const result = await fs.readFile('text.txt');

//   await textFile.write(result);
// })();


// Manual Stream

// (async () => {
//   const srcFile = await fs.open("source.txt", "r");
//   const destFile = await fs.open("dest.txt", "w");

//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResult = await srcFile.read();
//     bytesRead = readResult.bytesRead;

//     if(bytesRead !== 16384) {
//       const indexOfNotFilled = readResult.buffer.indexOf(0);
//       const newBuffer = Buffer.alloc(indexOfNotFilled);

//       readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer);
//     }
//   }
// })()


// Pipes

// (async () => {
//   console.time("watchTime");
//   const srcFile = await fs.open("source.txt", "r");
//   const destFile = await fs.open("dest.txt", "w");

//   const readStream = srcFile.createReadStream();
//   const writeStream = destFile.createWriteStream();

//   readStream.pipe(writeStream);

//   readStream.on('end', () => {
//     console.timeEnd('watchTime')
//   })
// })()

// Pipeline

(async () => {
  console.time("watchTime");
  const srcFile = await fs.open("source.txt", "r");
  const destFile = await fs.open("dest.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  pipeline(readStream, writeStream, (err) => {
    if(err) console.log(err);
    console.log(writeStream.writableHighWaterMark);
  });
})()