const fs = require('fs');

class FileAPI {
  constructor (req, res) {
    this.req = req;
    this.res = res;
  }
  loadHtmlFile (filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(`./views/${filePath}`, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        this.res.writeHead(200, {
          'content-type': 'text/html'
        });
        this.res.write(data);
        this.res.end();
        resolve();
      });
    });
  }
}

module.exports = FileAPI;
