const fs = require('fs');

class FileAPI {
  constructor (req, res) {
    this.req = req;
    this.res = res;
  }
  loadHtml (fileName, statusCode, serviceData, replaceConstant) {
    return new Promise(function (resolve, reject) {
      fs.readFile(`./views/${fileName}`, 'utf8', function (err, data) {
        if (err) {
          reject(this.req.handleError(this.req, this.res));
          return;
        }
        this.res.writeHead(statusCode, {
          'content-type': 'text/html'
        });
        let html = this.addServiceData(data, serviceData, replaceConstant);
        this.res.write(html);
        this.res.end();
        resolve();
      }.bind(this));
    }.bind(this));
  }

  addServiceData (data, serviceData, replaceConstant) {
    if (!serviceData) {
      return data.toString();
    }
    return data.toString().replace(replaceConstant, serviceData);
  }

  loadStaticHtmlPage (mime, mimeType) {
    return new Promise(function (resolve, reject) {
      this.res.writeHead(200, {
        'content-type': mimeType
      });
      if (mime === 'ico') {
        this.req.path = '/public/images' + this.req.path;
      }
      const stream = fs.createReadStream('.' + this.req.path);
      stream.on('data', data => {
        this.res.write(data);
      });
      stream.on('end', () => {
        this.res.end();
        resolve();
      });
      stream.on('error', (e) => {
        this.res.end();
        reject(e);
      });

      // stream.pipe(res); - with this row we can replace on events for data and end.
    }.bind(this));
  }
}

module.exports = FileAPI;
