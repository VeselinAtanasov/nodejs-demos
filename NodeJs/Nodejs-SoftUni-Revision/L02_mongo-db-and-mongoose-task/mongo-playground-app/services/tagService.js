const Tag = require('../models/TagSchema');

module.exports = {
  getAllTags: function () {
    return new Promise(function (resolve, reject) {
      Tag.find({}).then((tags) => {
        resolve(tags);
      }).catch(err => resolve(err));
    });
  }
}
;
