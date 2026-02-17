const http = require('node:http');

const server = http.createServer();

server.on('request', (req, res) => {
  let data = '';
  const name = req.headers.name;

  req.on('data', (chunk) => {
    data += chunk.toString();
  })

  req.on('end', () => {
    data = JSON.parse(data);

    console.log(data);

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({message: `Post with the title ${data.title} was created by ${name}`})
    )
  })
})


server.listen(8050, '127.0.0.1', () => {
  console.log(`Server is listening on http://localhost:8050`);
});