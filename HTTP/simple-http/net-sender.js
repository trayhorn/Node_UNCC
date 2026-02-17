const net = require('net');

const socket = net.createConnection({host: 'localhost', port: 8050}, () => {
  const req = Buffer.alloc(8);
  req[1] = 12;
  req[2] = 24;

  socket.write(req)

  socket.on('data', (chunk) => {
    console.log('Received a response');
    console.log(chunk.toString('utf-8'));
    socket.end();
  })

  socket.on('end', () => {
    console.log('Connection closed');
  })
})