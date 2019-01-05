const Tag = require('../models/TagSchema');

module.exports = {
  getAllTags: function () {
    return new Promise(function (resolve, reject) {
      Tag.find({}).then((tags) => {
        resolve(tags);
      }).catch(err => resolve(err));
    });
  },
  addTag: function (data) {
    let tag = new Tag({
      name: data.name
    });
    return new Promise(function (resolve, reject) {
      tag.save(tag).then(resp => {
        resolve(resp);
      })
        .catch(err => reject(err));
    });
  }
}
;
