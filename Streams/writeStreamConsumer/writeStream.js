const fs = require('fs/promises');

(async () => {
  console.time('writeMany');
  const fileHandle = await fs.open('test.txt', 'a');
  const stream = fileHandle.createWriteStream();

  let i = 0;
  const writeMany = () => {
    while (i < 1000000) {
      const buff = Buffer.from(`${i}`, "utf-8");

      if(i === 999999) return stream.end(buff);
      if(!stream.write(buff)) break;

      i++
    }
  }

  writeMany();

  stream.on('drain', () => {
    writeMany();
  })

  stream.on('finish', () => {
    console.timeEnd('writeMany');
    fileHandle.close();
  })
})();

// const fs = require('node:fs');

// console.time("writeMany");

// fs.open('test.txt', 'a', (err, fd) => {
//   const stream = fs.createWriteStream("", {fd});

//   let i = 0;
//   const writeMany = () => {
//     while (i < 1000000) {
//       const buff = Buffer.from(`${i}`, "utf-8");

//       if(i === 999999) return stream.end(buff);
//       if(!stream.write(buff)) break;

//       i++
//     }
//   }

//   writeMany();

//   stream.on('drain', () => {
//     writeMany();
//   })

//   stream.on('finish', () => {
//     fs.close(fd);
//     console.timeEnd('writeMany');
//   })
// })