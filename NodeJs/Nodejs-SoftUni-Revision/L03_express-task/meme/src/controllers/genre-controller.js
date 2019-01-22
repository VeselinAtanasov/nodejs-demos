const genreService = require('../services/genreService');

module.exports = {
  get: (req, res) => {
    res.render('genres/addGenre');
  },
  post: async (req, res) => {
    let params = req.body;
    await genreService.addGenre(params);
    res.redirect('/');
  }
};
