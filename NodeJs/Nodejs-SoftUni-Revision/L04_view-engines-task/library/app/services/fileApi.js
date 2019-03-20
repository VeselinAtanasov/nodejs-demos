const pathToStorage = './static/images/img/';
const fs = require('fs');

module.exports = {
  move: (file, fileName) => {
    return new Promise((resolve, reject) => {
      file
        .mv(`${pathToStorage}${fileName}`, (err) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve();
        });
    });
  },
  remove: (fileName) => {
    return new Promise((resolve, reject) => {
      fs.unlink(`./static/images/img/${fileName}`, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log('Success');
        resolve();
      });
    });
  }
};
