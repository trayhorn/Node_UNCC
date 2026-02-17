const http = require('http');

const port = 4080;
const host = '10.250.103.32';

const server = http.createServer((req, res) => {
  const data = {message: "Hi there!"};

  res.setHeader("Content-Type", 'application/json');
  res.setHeader('Connection', 'close');
  res.statusCode = 200;
  res.end(JSON.stringify(data));
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
})