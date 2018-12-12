const fs = require('fs');

const mimeTypes = {
  'css': 'text/css',
  'js': 'application/javascript',
  'png': 'image/png',
  'ico': 'mage/x-icon'
};

module.exports = function (req, res) {
  if (req.path.startsWith('/public/') || req.path === '/favicon.ico') {
    const mime = req.path.split('.').pop();

    res.writeHead(200, {
      'content-type': mimeTypes[mime]
    });
    if (mime === 'ico') {
      req.path = '/public/images' + req.path;
    }
    const stream = fs.createReadStream('.' + req.path);
    stream.on('data', data => {
      res.write(data);
    });
    stream.on('end', () => {
      res.end();
    });

    // stream.pipe(res); - with this row we can replace on events for data and end.
  } else {
    return true;
  }
};
