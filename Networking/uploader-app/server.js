const net = require('node:net');
const fs = require('node:fs/promises');

const PORT = 4080;
const HOST = '127.0.0.1';

const server = net.createServer();


server.on('connection', (socket) => {
  console.log('New connection');
  let fileHandle, writeStream;

  socket.on('data', async (data) => {
    if(!fileHandle) {
      socket.pause();

      const indexOfDivider = data.indexOf("---");
      const fileName = data.subarray(10, indexOfDivider).toString('utf-8');

      fileHandle = await fs.open(`storage/${fileName}`, 'w');
      writeStream = fileHandle.createWriteStream();

      writeStream.write(data.subarray(indexOfDivider + 3));
      socket.resume();
      writeStream.on('drain', () => socket.resume());
    } else {
      if(writeStream.write(data)) socket.pause();
    }
  })


  socket.on('end', () => {
    if(fileHandle) fileHandle.close();
    fileHandle = undefined;
    writeStream = undefined;
    console.log('Connection ended');
  })
})

server.listen(PORT, HOST, () => {
  console.log('Server is running on', server.address());
});
