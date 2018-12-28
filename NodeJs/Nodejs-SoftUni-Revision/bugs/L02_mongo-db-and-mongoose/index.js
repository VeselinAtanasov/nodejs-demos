const http = require('http');
const url = require('url');
const port = 1337;
const controllers = require('./controllers');

http.createServer((req, res) => {
  req['path'] = url.parse(req.url).pathname;
  for (let controller of controllers) {
    if (!controller(req, res)) {
      break;
    }
  }
}).listen(port);

console.log(`Server is listening on port ${port}`);
