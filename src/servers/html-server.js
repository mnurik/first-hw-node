const http = require('http');
const fs = require('fs');
const through2 = require('through2');
const config = require('./../../config/config.json');

function replaceMessageHandler(htmlTemplate, enc, callback) {
  this.push(htmlTemplate.toString().replace('{message}', 'Hello World'));
  return callback();
}

const server = http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    fs.createReadStream('./src/templates/index.html', 'utf8')
      .pipe(through2(replaceMessageHandler))
      .pipe(res);
  });

server.listen(config.port);
