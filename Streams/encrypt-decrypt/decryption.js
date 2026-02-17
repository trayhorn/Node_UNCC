const fs = require("node:fs/promises");
const { Transform } = require("node:stream");

class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      if(chunk[i] !== 255) {
        chunk[i] = chunk[i] - 1;
      }
    }
    this.push(chunk);
    callback();
  }
}

(async () => {
  const readFileHandle = await fs.open("./write.txt", "r");
  const writeFileHandle = await fs.open("./decrypted.txt", "w");

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();
  const encrypt = new Decrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();