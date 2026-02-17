const http = require('node:http');
const fs = require('node:fs/promises');

const server = http.createServer();

const handleFile = async (res, path) => {
  const fileHandle = await fs.open(path, 'r');
  const fileStream = fileHandle.createReadStream();
  fileStream.pipe(res);
}

server.on('request', async (req, res) => {
  if(req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    handleFile(res, './public/index.html');
  }
  if(req.url === '/styles.css' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/css');
    handleFile(res, './public/styles.css');
  }
  if(req.url === '/main.js' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/javascript');
    handleFile(res, './public/main.js');
  }

  if(res.url === '/login' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const body = {
      message: "Loggin you in"
    }

    res.end(JSON.stringify(body));
  }

  if(res.url === '/user' && req.method === 'PUT') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const body = {
      message: "Updating you info"
    }

    res.end(JSON.stringify(body));
  }

  if(res.url === '/upload' && req.method === 'PUT') {
    res.setHeader('Content-Type', 'application/json');
    const fileHandle = await fs.open('./storage/image.jpeg', 'w');
    const fileStream = fileHandle.createWriteStream();

    req.pipe(fileStream);

    req.on('end', () => {
      res.statusCode = 200;
        const body = {
        message: "Uploaded"
      }
      res.end(JSON.stringify(body));
    })
  }
})

server.listen(8050, '127.0.0.1', () => {
  console.log(`Web server is live at http://localhost:8050`);
})