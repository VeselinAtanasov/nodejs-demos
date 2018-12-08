const homeController = require('./home-controller');
const aboutController = require('./about-controller');
const errorController = require('./home-controller');
const cssController = require('./static-controller');
const bigFileController = require('./big-file-controller');

module.exports = [homeController, aboutController, cssController, bigFileController, errorController];
