const Image = require('../models/ImageSchema');

module.exports = {
  addImage: function (data) {
    let image = new Image(data);
    return new Promise(function (resolve, reject) {
      image
        .save(image)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => reject(err));
    });
  }
};
