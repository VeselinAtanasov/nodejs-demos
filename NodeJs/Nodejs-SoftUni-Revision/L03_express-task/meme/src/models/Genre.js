const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  title: { type: mongoose.Schema.Types.String, required: true },
  memes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }]
});

let Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
