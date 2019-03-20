const BookService = require('../services/BookService');
const bookService = new BookService();

module.exports = (req, res) => {
  bookService
    .getAllBooks()
    .then(books => {
      res.render('home/index.hbs', { books });
    })
    .catch(err => console.log(err));
};
