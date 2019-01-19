const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.homeController);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
};
