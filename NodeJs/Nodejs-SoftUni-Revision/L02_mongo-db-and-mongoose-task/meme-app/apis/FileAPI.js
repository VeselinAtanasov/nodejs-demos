const fs = require('fs');

module.exports = {
  loadHtml: function (req, res, fileName, statusCode, serviceData, replaceConstant) {
    return new Promise((resolve, reject) => {
      fs.readFile(`./views/${fileName}`, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        res.writeHead(statusCode, {
          'Content-Type': 'text/html'
        });
        let html = data.toString();
        if (serviceData) {
          html = data.toString().replace(replaceConstant, serviceData);
        }
        res.write(html);
        res.end();
        resolve();
      });
    });
  },
  move: function (req, res, filePath, fileName) {
    return new Promise(function (resolve, reject) {
      fs.rename(filePath, './public/memeStorage' + fileName, (err) => {
        if (err) {
          reject(err);
          return;
        }
        res.writeHead(302, {
          'Location': '/'
        });
        res.end();
        resolve();
      });
    });
  }
};
