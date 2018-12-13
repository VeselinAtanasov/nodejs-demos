const fs = require('fs');
const movieService = require('../utils/movie-service');

module.exports = function (req, res) {
  if (req.path === '/viewAllMovies' && req.method === 'GET') {
    fs.readFile('./views/viewAll.html', 'utf8', function (err, data) {
      if (err) {
        req.handleError(req, res);
        return;
      }
      movieService.getAllMovies().then(films => {
        res.writeHead(200, {
          'content-type': 'text/html'
        });

        let allFilms = '';
        for (let i = 0; i < films.length; i++) {
          let film = films[i];
          allFilms += `<div class="movie">
          <img class="moviePoster" src="${film.moviePoster}"/>  
          <a href=/details/${i}>Diteils</a>        
        </div>`;
        }
        let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', allFilms);

        res.write(html);
        res.end();
      }).catch(err => console.log(err));
    });
  } else {
    return true;
  }
};
