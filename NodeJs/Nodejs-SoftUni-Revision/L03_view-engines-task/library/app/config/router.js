const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.homeController);
  app.get('/addBook', controllers.bookController.getAddBookPage);
  app.post('/addBook', controllers.bookController.createNewBook);
  app.get('/viewAllBooks', controllers.bookController.viewAllBooks);
  app.get('/details/:id', controllers.bookController.viewBookById);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
};
