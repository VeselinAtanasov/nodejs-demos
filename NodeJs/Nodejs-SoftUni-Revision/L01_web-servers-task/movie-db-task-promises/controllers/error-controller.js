const FileApi = require('../utils/apis/FileApi');

module.exports = function (req, res) {
  let fileApi = new FileApi(req, res);
  fileApi
    .loadHtml('error.html', 404)
    .then()
    .catch();
};
