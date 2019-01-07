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
  imageQueryHandler: function (queryData) {
    let params = Object.values(queryData).filter(x => x !== '');
    if (params.length === 0) {
      return new Promise((resolve, reject) => {
        Image
          .find()
          .then(resp => resolve(resp))
          .catch(e => reject(e));
      });
    } else if (queryData.tagName !== '' && (queryData.afterDate !== '' || queryData.beforeDate !== '')) {
      let limit = 10;
      if (queryData.Limit && queryData.Limit !== '' && !Number.isNaN(queryData.Limit)) {
        limit = Number(queryData.Limit);
      }
      queryData.beforeDate = (queryData.beforeDate === '' || queryData.beforeDate === undefined) ? new Date(Date.now()).toISOString() : queryData.beforeDate;
      queryData.afterDate = (queryData.afterDate === '' || queryData.afterDate === undefined) ? new Date(-8640000000000000).toISOString() : queryData.afterDate;

      return new Promise((resolve, reject) => {
        Image.find()
          .where('creationDate').lt(queryData.beforeDate).gt(queryData.afterDate)
          .limit(limit)
          .sort('-creationDate')
          .then(resp => resolve(resp))
          .catch(e => reject(e));
      });
    } else if (queryData.tagName !== '' && queryData.afterDate === '' && queryData.beforeDate === '') {
      let tags = queryData.tagName.split(',').filter(e => e.length > 0);
      let limit = 10;
      if (queryData.Limit && queryData.Limit !== '' && !Number.isNaN(queryData.Limit)) {
        limit = Number(queryData.Limit);
      }
      return new Promise((resolve, reject) => {
        Tag
          .find({ name: { $in: tags } })
          .then(resp => {
            let tagIds = resp.map(m => m.id);
            Image
              .find({ tags: { $in: tagIds } })
              .sort('-creationDate')
              .limit(limit)
              .then(images => resolve(images));
          })
          .catch(e => reject(e));
      });
    }
  }
};
