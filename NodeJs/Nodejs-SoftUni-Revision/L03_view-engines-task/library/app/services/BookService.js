const Book = require('../models/Book');
const shortid = require('shortid');
const fileApi = require('./fileApi');
const pathToStorage = './static/images/img/';

class BookService {
  getAllBooks () {
    return new Promise((resolve, reject) => {
      Book
        .find()
        .then(resp => resolve(resp))
        .catch(err => reject(err));
    });
  }
  prepareFile (fileFormat) {
    if (!fileFormat) {
      throw new Error('File is missing - please add it');
    }
    let fileName = shortid.generate() + '.jpg';
    fileFormat['name'] = fileName;
    return fileFormat;
  }
  idValidBookParams (bookParams) {
    let book = new Book(bookParams);
    if (book['errors']) {
      console.log(book['errors']);
      return false;
    }
    return book;
  }

  getBook (bookParams) {
    return new Book(bookParams);
  }

  getBookById (id) {
    return new Promise((resolve, reject) => {
      Book
        .findOne({ _id: id })
        .then(book => resolve(book))
        .catch(e => reject(e));
    });
  }

  addBook (bookParams, file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('file is missing'));
        return;
      }
      let currentFile = this.prepareFile(file);
      bookParams['bookPoster'] = pathToStorage + currentFile.name;
      let book = this.getBook(bookParams);

      if (!this.idValidBookParams(bookParams)) {
        reject(new Error('params are not correct'));
        return;
      }

      fileApi
        .move(currentFile, currentFile['name'])
        .then(resp => {
          book
            .save(book)
            .then(b => resolve(b))
            .catch(e => reject(e));
        })
        .catch(e => reject(e));
    });
  }
}

module.exports = BookService;
