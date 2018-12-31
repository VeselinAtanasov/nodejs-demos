const movieService = require('../utils/movie-service');
const FileApi = require('../utils/apis/FileApi');
const REPLACE_ME = require('../utils/constants').REPLACE_ME;

module.exports = function (req, res) {
  if (req.path.startsWith('/details/')) {
    let id = req.path.split('/').pop();
    let fileApi = new FileApi(req, res);
    movieService.getMovieById(id).then(film => {
      let userData = `<div class="content">
      <img src="${film.moviePoster}" alt=""/>
      <h3>Title  ${film.movieTitle}</h3>
      <h3>Year ${film.movieYear}</h3>
      <p> ${film.movieDescription}</p>
  </div>
  `;
      fileApi
        .loadHtml('details.html', 200, userData, REPLACE_ME)
        .then()
        .catch();
    }).catch(err => console.log(err));
  }
};
