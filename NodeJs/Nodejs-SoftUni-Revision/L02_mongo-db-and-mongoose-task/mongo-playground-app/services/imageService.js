const Image = require('../models/ImageSchema');
const Tag = require('../models/TagSchema');

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
  },
  getAllImages: function (data) {
    return new Promise((resolve, reject) => {
      Image
        .find()
        .then(resp => resolve(resp))
        .catch(e => reject(e));
    });
  },
  getAllImagesByTag: function (tags) {
    return new Promise((resolve, reject) => {
      Tag
        .find({ name: { $in: tags } })
        .then(resp => {
          let tagIds = resp.map(m => m.id);
          Image
            .find({ tags: { $in: tagIds } })
            .sort('-creationDate')
            .then(images => resolve(images));
        })
        .catch(e => reject(e));
    });
  },
  getImages: function (queryData) {
    let tags = queryData.tagName.split(',').filter(e => e.length > 0).filter(e => e === 'Write tags separted by ,');
    let limit = (queryData.Limit && queryData.Limit !== '' && !Number.isNaN(queryData.Limit)) ? Number(queryData.Limit) : 10;
    queryData.beforeDate = (queryData.beforeDate === '' || queryData.beforeDate === undefined) ? new Date(Date.now()).toISOString() : queryData.beforeDate;
    queryData.afterDate = (queryData.afterDate === '' || queryData.afterDate === undefined) ? new Date(-8640000000000000).toISOString() : queryData.afterDate;
    let obj = tags.length !== 0 ? { name: { $in: tags } } : {};

    return new Promise((resolve, reject) => {
      Tag
        .find(obj)
        .then(resp => {
          let tagIds = resp.map(m => m.id);
          let dataFilter = tags.length !== 0 ? { tags: { $in: tagIds } } : {};
          Image
            .find(dataFilter)
            .where('creationDate').lt(queryData.beforeDate).gt(queryData.afterDate)
            .sort('-creationDate')
            .limit(limit)
            .then(images => resolve(images));
        })
        .catch(e => reject(e));
    });
  },
  deleteImageById: function (id) {
    return new Promise((resolve, reject) => {
      Image
        .findByIdAndRemove({ _id: id })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

};
