const Genre = require('../models/Genre');

module.exports = {
  addGenre: (args) => {
    let genre = new Genre({ title: args.memeTitle });
    return genre.save(genre);
  },
  getAllGenre: () => {
    return Genre.find().sort('-title');
  },
  getGenreByName: (genreName) => {
    return Genre.find({ title: genreName });
  },
  updateGenre: (genre, memeID) => {
    let genreArr = genre['memes'];
    genreArr.push(memeID);
    genre['memes'] = genreArr;

    return Genre.findById(genre._id).then(genre => {
      genre.memes.push(memeID);
      genre.save();
    });
  },
  updateGenreAsRemovingMeme: (genre, meme) => {
    return Genre.findById(genre._id).then(genre => {
      genre.memes = genre.memes.filter(e => e.toString() !== meme.id);
      genre.save();
    });
  },
  getGenreById (id) {
    return Genre.findById(id);
  }
};
