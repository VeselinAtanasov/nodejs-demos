const fs = require('fs');

const displayError = require('../utils/helpers/displayError');

module.exports = function (req, res) {
  if ((req.path === '/' || req.path === '/index.html') && req.method === 'GET') {
    fs.readFile('./views/index.html', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return displayError(req, res);
      }
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
};
