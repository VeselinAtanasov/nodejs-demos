const path = require('path');

let rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://admin:admin123@ds163984.mlab.com:63984/book_library',
    port: 3000
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
};
