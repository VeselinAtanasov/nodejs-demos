const http = require('http');
const url = require('url');
const qs = require('querystring');
const port = process.env.PORT || 5000;
const controllers = require('./controllers');

require('./config/db').then(() => {
  console.log(`DB was successfully loaded...`);
  http
    .createServer((req, res) => {
      req['pathname'] = url.parse(req.url)['pathname'];
      req['pathquery'] = qs.parse(url.parse(req.url).query);
      for (let controller of controllers) {
        if (!controller(req, res)) {
          break;
        }
      }
    })
    .listen(port);
  console.log(`Server is listening on port: ${port}`);
}).catch(err => console.log(err));
