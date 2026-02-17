const http = require('node:http');
const fs = require('node:fs/promises');

class Butter {
  constructor() {
    this.server = http.createServer();

    this.routes = {};
    this.middleware = [];

    // When client makes a request
    this.server.on('request', (req, res) => {
      // Attaching a custom method to res object
      res.sendFile = async (path, mimeType) => {
        const fileHandle = await fs.open(path, 'r');
        const fileStream = fileHandle.createReadStream();

        res.setHeader('Content-Type', mimeType);

        fileStream.pipe(res);
      }

      // Set the status code of the response
      res.status = code => {
        res.statusCode = code;
        return res;
      }

      // Send json data back to client
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      }

      // Calling the cb from server.route
      const routeHandler = this.routes[req.method.toLowerCase() + req.url];
      if(!routeHandler) {
        return res.status(404).json({error: `Cannot ${req.method} ${req.url}`});
      }

      const runMiddleware = (req, res, middleware, index) => {
        // Our exit point
        if(index === middleware.length) {
          if(!routeHandler) {
            return res.status(404).json({error: `Cannot ${req.method} ${req.url}`});
          }
          routeHandler(req, res);
        } else {
          middleware[index](req, res, () => {
            runMiddleware(req, res, middleware, index + 1);
          })
        }
      }

      runMiddleware(req, res, this.middleware, 0);
    })
  }

  beforeEach(cb) {
    this.middleware.push(cb);
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Butter;