const http = require('http');
const config = require('./../../config/config.json');

const server = http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.end('Hello World');
  });

server.listen(config.port);
