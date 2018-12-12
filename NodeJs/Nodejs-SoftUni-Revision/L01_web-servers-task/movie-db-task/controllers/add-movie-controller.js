const fs = require('fs');
const formidable = require('formidable');
const movieService = require('../utils/movie-service');

module.exports = function (req, res) {
  if (req.path === '/addMovie' && req.method === 'GET') {
    fs.readFile('./views/addMovie.html', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else if (req.path === '/addMovie' && req.method === 'POST') {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log('error during parsing the form...');
        console.log(err);
        return;
      }
      if (fields.moviePoster === null || fields.moviePoster === undefined || fields.moviePoster === '') {
        fs.readFile('./views/addMovie.html', 'utf8', function (err, data) {
          if (err) {
            console.log(err);
            return;
          }
          let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');
          res.writeHead(200, {
            'content-type': 'text/html'
          });
          res.write(html);
          res.end();
        });
      } else {
        fs.readFile('./views/addMovie.html', 'utf8', function (err, data) {
          if (err) {
            console.log(err);
            return;
          }
          movieService.saveFilm(fields).then(movies => {
            console.log(movies);
            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');
            res.writeHead(200, {
              'content-type': 'text/html'
            });
            res.write(html);
            res.end();
          }).catch(err => console.log(err));
        });
      }
    });
  } else {
    return true;
  }
};
