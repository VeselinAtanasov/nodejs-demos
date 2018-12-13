const homeController = require('./home-controller');
const staticController = require('./static-controller');
const viewAllController = require('./view-all-controller');
const addMovieController = require('./add-movie-controller');
const detailsController = require('./details-controller');
const errorController = require('./error-controller');

module.exports = [homeController, staticController, viewAllController, addMovieController, detailsController, errorController];
