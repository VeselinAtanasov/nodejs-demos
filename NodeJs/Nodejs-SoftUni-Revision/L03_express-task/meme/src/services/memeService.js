const pathToFile = './public/memeStorage/0/';
const Meme = require('../models/Meme');

module.exports = {
  createMeme: (params, genreID, fileName) => {
    let currentMeme = new Meme({
      title: params['memeTitle'],
      memeSrc: pathToFile + fileName,
      description: params['memeDescription'],
      privacy: params['status'] === 'on',
      dateStamp: Date.now(),
      genreId: genreID
    });
    return currentMeme.save(currentMeme);
  },
  getAllMemes: () => {
    return Meme.find();
  },
  getMemeById: (id) => {
    return Meme.findById(id);
  },
  deleteMemeById: (id) => {
    return Meme.deleteOne({ _id: id });
  },
  findMemeByGenreID: (id) => {
    console.log(id);
    Meme.find({ genreId: id });
  }
};
