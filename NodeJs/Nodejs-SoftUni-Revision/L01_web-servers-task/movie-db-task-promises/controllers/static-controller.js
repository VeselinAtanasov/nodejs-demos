const FileApi = require('../utils/apis/FileApi');
const mimeTypes = {
  'css': 'text/css',
  'js': 'application/javascript',
  'png': 'image/png',
  'ico': 'mage/x-icon'
};

module.exports = function (req, res) {
  if (req.path.startsWith('/public/') || req.path === '/favicon.ico') {
    let fileApi = new FileApi(req, res);
    const mime = req.path.split('.').pop();
    const mimeType = mimeTypes[mime];
    fileApi
      .loadStaticHtmlPage(mime, mimeType)
      .then()
      .catch();
  } else {
    return true;
  }
};
