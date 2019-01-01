const fs = require('fs');

module.exports = function (req, res) {
  fs.readFile('../views/error.html', 'utf8', (err, data) => {
    if (err) {
      console.log('Errors....');
      console.log(err);
      return;
    }
    res.writeHead(404, {
      'content-type': 'text/html'
    });
    res.write(data);
    res.end();
  });
};
