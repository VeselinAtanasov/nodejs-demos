const Genre = require('../models/Genre');

module.exports = {
  addGenre: function (args) {
    let genre = new Genre({ title: args.memeTitle });
    return genre.save(genre);
  }
};
