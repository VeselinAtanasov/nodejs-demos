const fs = require('fs');

module.exports = {
  /**
   * Function which reads html file, using promises.
   * @param {object} req - http.ClientRequest
   * @param {object} res - http.ClientResponse
   * @param {string} filePath - file path, which could be only fileName
   * @returns {Promise} promise which directly modifies the http response.
   */
  loadHtmlFile: function (req, res, filePath) {
    return new Promise(function (resolve, reject) {
      fs.readFile(`./views/${filePath}`, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        res.writeHead(200, {
          'content-type': 'text/html'
        });
        res.write(data);
        res.end();
        resolve();
      });
    });
  },
  /**
   * Function, which moves uploaded file from tem directory to specific directory.
   * @param {object} req - http.ClientRequest
   * @param {object} res - http.ClientResponse
   * @param {string} filePath - path to the file - usually stored in tem folder
   * @param {string} fileName - the new path name.
   * @returns {Promise} promise which directly modifies the http response.
   */
  move: function (req, res, filePath, fileName) {
    return new Promise(function (resolve, reject) {
      fs.rename(filePath, './files/' + fileName, (err) => {
        if (err) {
          reject(err);
          return;
        }
        res.writeHead(200, {
          'content-type': 'text/plain'
        });
        res.write('File Uploaded');
        res.end();
        resolve();
      });
    });
  }
};
