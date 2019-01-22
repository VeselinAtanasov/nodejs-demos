const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.homeController);
  app.get('/addGenre', controllers.genreController.get);
  app.post('/addGenre', controllers.genreController.post);
  app.get('/addMeme', controllers.memeController.getMemeForm);
  app.post('/addMeme', controllers.memeController.addMeme);
  app.get('/viewAllMemes', controllers.memeController.viewAll);
  app.get('/memes/getDetails/:id', controllers.memeController.getDetails);
  app.get('/memes/delete/:id', controllers.memeController.deleteMeme);
  app.get('/searchMeme', controllers.memeController.searchMeme);
  app.post('/memes/searchMeme', controllers.memeController.getAllSearchedMemes);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
};
