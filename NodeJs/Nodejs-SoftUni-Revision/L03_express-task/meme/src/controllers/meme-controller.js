const genreService = require('../services/genreService');
const memeService = require('../services/memeService');
const shortid = require('shortid');
const fileAPI = require('../services/fileAPI');

module.exports = {
  getMemeForm: async (req, res) => {
    let genres = await genreService.getAllGenre();
    res.render('memes/addMeme', { genres });
  },
  addMeme: async (req, res) => {
    let fields = req.body;
    let selectedGenre = await genreService.getGenreByName(fields.genreSelect);

    let fileName = shortid.generate() + '.jpg';
    let file = req.files.meme;
    file.name = fileName;

    try {
      await fileAPI.move(file, fileName);
      let meme = await memeService.createMeme(req.body, selectedGenre[0]['_id'], fileName);
      await genreService.updateGenre(selectedGenre[0], meme._id);
      res.redirect('/');
    } catch (err) {
      console.log('Error was returned:');
      console.log(err.message);
      res.redirect('/');
    }
  },
  viewAll: async (req, res) => {
    let memes = await memeService.getAllMemes();
    res.render('memes/viewAll', { memes });
  },
  getDetails: async (req, res) => {
    let id = req.params.id;
    let meme = await memeService.getMemeById(id);
    res.render('memes/details', meme);
  },
  deleteMeme: async (req, res) => {
    let memeId = req.params.id;
    let meme = await memeService.getMemeById(memeId);
    let genre = await genreService.getGenreById(meme.genreId);

    await genreService.updateGenreAsRemovingMeme(genre, meme);
    await memeService.deleteMemeById(meme._id);

    res.redirect('/viewAllMemes');
  },
  searchMeme: async (req, res) => {
    let genres = await genreService.getAllGenre();
    res.render('memes/searchMeme', { genres });
  },
  getAllSearchedMemes: async (req, res) => {
    let params = req.body;
    let genre = await genreService.getGenreById(params.genreSelect);
    let memes = await memeService.findMemeByGenreID(genre._id);
    console.log(memes);
  }
};
