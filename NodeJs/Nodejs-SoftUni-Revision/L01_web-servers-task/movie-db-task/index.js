const http = require('http');
const url = require('url');
const port = 5000;
const controllers = require('./controllers');
const errorHandler = require('./controllers/error-controller');

http.createServer(function (req, res) {
  req['path'] = url.parse(req.url).pathname;
  req['handleError'] = errorHandler;

  for (let controller of controllers) {
    if (!controller(req, res)) {
      break;
    }
  }
}).listen(port);
console.log(`Server is listening and on port: ${port}`);
