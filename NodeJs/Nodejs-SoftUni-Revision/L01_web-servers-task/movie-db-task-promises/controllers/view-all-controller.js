const movieService = require('../utils/movie-service');
const FileApi = require('../utils/apis/FileApi');
const REPLACE_ME = require('../utils/constants').REPLACE_ME;

module.exports = function (req, res) {
  if (req.path === '/viewAllMovies' && req.method === 'GET') {
    movieService.getAllMovies().then(films => {
      let fileApi = new FileApi(req, res);
      let allFilms = '';
      for (let i = 0; i < films.length; i++) {
        let film = films[i];
        allFilms += `<div class="movie">
        <img class="moviePoster" src="${film.moviePoster}"/>  
        <a href=/details/${i}>Details</a>        
      </div>`;
      }
      fileApi
        .loadHtml('viewAll.html', 200, allFilms, REPLACE_ME)
        .then()
        .catch();
    }).catch(err => console.log(err));
  } else {
    return true;
  }
};
