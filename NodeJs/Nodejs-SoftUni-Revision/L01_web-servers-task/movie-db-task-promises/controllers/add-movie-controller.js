const formidable = require('formidable');
const movieService = require('../utils/movie-service');
const FileApi = require('../utils/apis/FileApi');
const CONSTANTS = require('../utils/constants');

module.exports = function (req, res) {
  if (req.path === '/addMovie' && req.method === 'GET') {
    let fileApi = new FileApi(req, res);
    fileApi
      .loadHtml('addMovie.html', 200)
      .then()
      .catch();
  } else if (req.path === '/addMovie' && req.method === 'POST') {
    let fileApi = new FileApi(req, res);
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
        req.handleError(req, res);
        return;
      }
      if (fields.moviePoster === null || fields.moviePoster === undefined || fields.moviePoster === '') {
        fileApi
          .loadHtml('addMovie.html', 200, CONSTANTS.ERROR_MESSAGE, CONSTANTS.REPLACE_ME)
          .then()
          .catch();
      } else {
        movieService.saveFilm(fields).then(movies => {
          console.log(movies);
          fileApi
            .loadHtml('addMovie.html', 200, CONSTANTS.SUCCESS_MESSAGE, CONSTANTS.REPLACE_ME)
            .then()
            .catch();
        }).catch(err => console.log(err));
      }
    });
  } else {
    return true;
  }
};
