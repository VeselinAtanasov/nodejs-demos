const fs = require('fs');
module.exports = function (req, res) {
  fs.readFile('./views/error.html', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      return err;
    }
    res.writeHead(404, {
      'content-type': 'text/html'
    });
    res.write(data);
    res.end();
  });
};
