const http = require('http');
const { product } = require('./../../data/product');
const config = require('./../../config/config.json');

const server = http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(product));
  });

server.listen(config.port);
