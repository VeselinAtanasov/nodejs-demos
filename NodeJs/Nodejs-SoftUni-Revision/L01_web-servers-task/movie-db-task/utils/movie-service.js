const db = require('../config/dataBase');

module.exports = {
  getAllMovies: function () {
    return new Promise((resolve, reject) => {
      if (db.length === 0) {
        return reject(new Error('Database is empty!'));
      }
      resolve(db);
    });
  },
  saveFilm: function (fields) {
    return new Promise((resolve, reject) => {
      if (fields === undefined) {
        return reject(new Error('Wrong input parameters...'));
      }

      let obj = {
        movieDescription: fields.movieDescription,
        moviePoster: fields.moviePoster,
        movieTitle: fields.movieTitle,
        movieYear: fields.movieYear
      };
      db.push(obj);

      resolve(db);
    });
  },
  getMovieById: function (id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      if (id === undefined || db[id] === undefined) {
        return reject(new Error('Wrong Id'));
      }
      resolve(db[id]);
    });
  }
}
;
