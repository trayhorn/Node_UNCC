const { Writable } = require("node:stream");
const fs = require("node:fs");

class FileWriteStream extends Writable {
  constructor({ highWaterMark = 16384, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCount = 0;
  }

  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    console.log(this.fd);
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize > this.highWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) return callback(err);
        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCount;
        callback();
      });
    } else {
      callback();
    }
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    console.log(this.writesCount);
    if (this.fd) {
      fs.close(this.fd, (err) => callback(err || error));
      this.fd = null;
    }
  }
}


const customStream = new FileWriteStream({
  fileName: "text.txt",
});

customStream.write(Buffer.from("This is some buffer.", "utf-8"));
customStream.end(Buffer.from("Our last write."));

// customStream.on("finish", () => {
//   console.log("Stream was finished");
// });
