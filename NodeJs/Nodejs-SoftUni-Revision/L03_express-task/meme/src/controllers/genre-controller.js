const genreService = require('../services/genreService');

module.exports = {
  get: (req, res) => {
    res.render('genres/addGenre');
  },
  post: async (req, res) => {
    let params = req.body;
    console.log(params);
    let response = await genreService.addGenre(params);
    console.log(response);
    res.redirect('/');
  }
};
