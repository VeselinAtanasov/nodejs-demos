const http = require('http');
const url = require('url');
const port = 5000;
const handlers = require('./controllers/index');

http.createServer(function (req, res) {
  req['path'] = url.parse(req.url).pathname;
  console.log(req['path']);
  if (req.method === 'GET') {
    for (let handler of handlers) {
      if (!handler(req, res)) {
        break;
      }
    }
  } else if (req.method === 'POST') {
    // Using Readable Streams:from Postman we are sending POST request to http://localhost:5000/ and the data we are sending(could be e a big file) is displayed on the console.
    let body = '';
    req.on('data', data => {
      body += data;
    });
    req.on('end', () => {
      console.log(body);
      res.end();
    });
  }
}).listen(port);
console.log(`Server is listening and on port: ${port}`);
