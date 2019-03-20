const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookTitle: { type: mongoose.Schema.Types.String, required: true },
  bookYear: { type: mongoose.Schema.Types.Number, required: true },
  bookPoster: { type: mongoose.Schema.Types.String, required: true },
  bookAuthor: { type: mongoose.Schema.Types.String, required: true }
});

bookSchema.path('bookTitle').validate(function () {
  return this.bookTitle.length > 0;
}, 'Book Title should be a valid string');

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
