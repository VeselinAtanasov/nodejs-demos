const FileApi = require('../utils/apis/FileApi');

module.exports = function (req, res) {
  if (req.path === '/' || req.path === '/home' || req.path === '/index.html') {
    let fileApi = new FileApi(req, res);
    fileApi
      .loadHtml('home.html', 200)
      .then()
      .catch();
  } else {
    return true;
  }
};
