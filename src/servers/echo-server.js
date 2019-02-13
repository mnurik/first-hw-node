const http = require('http');
const config = require('./../../config/config.json');

const server = http
  .createServer((req, res) => {
    req.pipe(res);
  });

server.listen(config.port);
