const fs = require('fs');
const movieService = require('../utils/movie-service');

module.exports = function (req, res) {
  if (req.path.startsWith('/details/')) {
    let id = req.path.split('/').pop();
    fs.readFile('./views/details.html', 'utf8', function (err, data) {
      if (err) {
        req.handleError(req, res);
        return;
      }
      movieService.getMovieById(id).then(film => {
        let userData = `<div class="content">
        <img src="${film.moviePoster}" alt=""/>
        <h3>Title  ${film.movieTitle}</h3>
        <h3>Year ${film.movieYear}</h3>
        <p> ${film.movieDescription}</p>
    </div>
    `;
        let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', userData);
        res.write(html);
        res.end();
      }).catch(err => console.log(err));
    });
  }
};
