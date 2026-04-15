const cpeak = require('cpeak');

const server = new cpeak();

process.on('message', (message) => {
  console.log(`Worker ${process.pid} sent this ${message}`);
});

server.route('get', '/', (req, res) => {
  process.send({action: "request"});
  res.json({message: 'This is response'});
})

server.route('get', '/heavy', (req, res) => {
  for (let i = 0; i < 10000000; i++) {}
  res.json({message: "The opration is now done."});
})

const PORT = 5090;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})