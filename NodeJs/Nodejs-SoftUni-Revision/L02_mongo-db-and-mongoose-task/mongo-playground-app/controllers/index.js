const homeController = require('./homeController');
const addImageController = require('./addImageController');
const addTagController = require('./tagController');
const searchController = require('./searchController');
const staticFileController = require('./staticController');


module.exports = [homeController, addTagController, searchController, addImageController, staticFileController];
