const fs = require('fs');
const mimeType = {
  'css': 'text/css',
  'js': 'application/javascript',
  'png': 'image/png',
  'ico': 'mage/x-icon'
};
const displayError = require('../utils/helpers/displayError');

module.exports = function (req, res) {
  if (req.path.startsWith('/styles/')) {
    try {
      const mimeExtension = req.path.split('.').pop();
      res.writeHead(200, {
        'content-type': mimeType[mimeExtension]
      });
      // using stream - pipe readStream to writeStream:
      const stream = fs.createReadStream('.' + req.path);
      stream.pipe(res);
    } catch (error) {
      console.log('Error in static handler:');
      displayError(req, res);
      return true;
    }
  } else {
    return true;
  }
};
