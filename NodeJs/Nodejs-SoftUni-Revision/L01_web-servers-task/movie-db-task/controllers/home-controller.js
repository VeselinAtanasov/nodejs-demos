const fs = require('fs');

module.exports = function (req, res) {
  if (req.path === '/' || req.path === '/home' || req.path === '/index.html') {
    fs.readFile('./views/home.html', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return;
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
