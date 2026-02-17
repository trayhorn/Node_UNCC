const fs = require('node:fs');
const {Readable} = require('node:stream');

class FileStreamReadable extends Readable {
  constructor({highWaterMark = 16384, fileName}) {
    super({highWaterMark});

    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      if(err) return callback(err);
      this.fd = fd;
      callback();
    })
  }

  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if(err) return this.destroy(err);
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null)
    })
  }

  _destroy(error, callback) {
    if(this.fd) {
      fs.close(this.fd, (err) => callback(err || error));
      this.fd = null;
    }
    callback(error);
  }
}

const stream = new FileStreamReadable({ fileName: "text.txt" });

stream.on("data", (chunk) => {
  console.log(chunk);
})

stream.on('end', () => {
  console.log('Stream is done reading');
})