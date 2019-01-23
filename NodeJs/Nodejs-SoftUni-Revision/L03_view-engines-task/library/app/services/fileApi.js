const pathToStorage = './static/images/img/';

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
  }
};
