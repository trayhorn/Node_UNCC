const http = require('node:http');

const agent = new http.Agent({keepAlive: true});

// const message = JSON.stringify({title: 'title of my post'});

const request = http.request({
  agent,
  hostname: '127.0.0.1',
  port: '8050',
  method: "POST",
  path: '/create-post',
  headers: {
    "Content-Type": "application/json",
    "name": "Ivan"
    // "Content-Length": Buffer.byteLength(message, 'utf-8')
  }
})

// This event is emitted only once
request.on('response', (response) => {

})

request.end(JSON.stringify({title: 'My title', body: 'This is the body of my text'}));