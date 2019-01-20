const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.homeController);
  app.get('/addGenre', controllers.genreController.get);
  app.post('/addGenre', controllers.genreController.post);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
};
