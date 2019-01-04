const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  URL: { type: mongoose.SchemaTypes.String, required: true },
  creationDate: { type: mongoose.SchemaTypes.Date, required: true, default: Date.now },
  description: { type: mongoose.SchemaTypes.String },
  tags: [{ type: mongoose.SchemaTypes.ObjectId }]
});

let Image = mongoose.model('Image', imageSchema);

module.exports = Image;
