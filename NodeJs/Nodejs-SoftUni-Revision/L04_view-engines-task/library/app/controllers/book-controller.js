const BookService = require('../services/BookService');
const bookService = new BookService();

module.exports = {
  getAddBookPage: (req, res) => {
    res.render('books/addBook');
  },
  createNewBook: (req, res) => {
    let bookParams = req.body;
    bookService
      .addBook(bookParams, req.files.bookPoster)
      .then(book => {
        res.render('books/addBook', { success: true });
      })
      .catch(e => {
        console.log(e);
        res.render('books/addBook', { error: true });
      });
  },
  viewAllBooks: (req, res) => {
    bookService
      .getAllBooks()
      .then(books => {
        res.render('books/viewAll', { books });
      })
      .catch(e => console.log(e));
  },
  viewBookById: (req, res) => {
    let id = req.params.id;
    bookService
      .getBookById(id)
      .then(book => {
        res.render('books/details', book);
      })
      .catch(e => console.log(e));
  },

  deleteBookById: (req, res) => {
    let id = req.params.id;
    bookService
      .deleteBook(id)
      .then(book => {
        bookService
          .getAllBooks()
          .then(books => {
            res.render('books/viewAll', { books }, (err, html) =>{
              res.redirect('/viewAllBooks');
            });
            // res.redirect('/addBook');
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
};
