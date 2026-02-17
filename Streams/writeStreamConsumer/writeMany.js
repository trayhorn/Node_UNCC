// That example demonstrates incorrect way of writing to a file and here is why we should use streams

// const fs = require('fs/promises');
const fs = require('node:fs');

console.time('Writemany');

fs.open('test.txt', 'w', (err, fd) => {
  for (let i = 0; i < 1000000; i++) {
    fs.writeSync(fd, ` ${i} `);
  }
})

console.timeEnd('Writemany');

// (async () => {
//   console.time("writeMany");

//   const fileHandle = await fs.open("test.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(`${i}`);
//   }

//   console.timeEnd("writeMany");
// })();