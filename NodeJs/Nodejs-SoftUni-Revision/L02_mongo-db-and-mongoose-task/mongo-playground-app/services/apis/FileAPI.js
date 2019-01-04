const fs = require('fs');

class FileAPI {
  constructor (req, res) {
    this.req = req;
    this.res = res;
  }

  loadDynamicHTML (htmlFilename) {
    return new Promise(function (resolve, reject) {
      fs.readFile(`./views/${htmlFilename}`, function (err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  sendHTML (html, statusCode) {
    this.res.writeHead(statusCode, {
      'Content-Type': 'text/html'
    });
    this.res.write(html);
    this.res.end();
  }

  updateDynamicHTML (data, serviceData, replaceConstant) {
    return this.extendHTML(data, serviceData, replaceConstant);
  }

  extendHTML (data, serviceData, replaceConstant) {
    if (serviceData) {
      return data.toString().replace(replaceConstant, serviceData);
    }
    return data.toString();
  }

  loadFavicon (fullFilePath, statusCode) {
    return new Promise(function (resolve, reject) {
      fs.readFile(fullFilePath, function (err, data) {
        if (err) {
          return reject(err);
        }

        this.res.writeHead(statusCode, {
          'Content-Type': this.getFileType(this.req.pathname)
        });
        this.res.write(data);
        this.res.end();
        resolve();
      }.bind(this));
    }.bind(this));
  }

  loadStaticFile () {
    return new Promise(function (resolve, reject) {
      fs.readFile('.' + this.req.pathname, function (err, data) {
        if (err) {
          return reject(err);
        }
        this.res.writeHead(200, {
          'Content-Type': this.getFileType(this.req.pathname)
        });
        this.res.write(data);
        this.res.end();
        resolve();
      }.bind(this));
    }.bind(this));
  }

  getFileType (path) {
    let dataTypes = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.ico': 'image/x-icon'
    };
    for (let type in dataTypes) {
      if (path.endsWith(type)) {
        return dataTypes[type];
      }
    }
  }
}

module.exports = FileAPI;
