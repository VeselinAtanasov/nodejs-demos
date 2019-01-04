const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: { type: mongoose.SchemaTypes.String, required: true },
  creationDate: { type: mongoose.SchemaTypes.Date, required: true, default: Date.now },
  images: [{ type: mongoose.SchemaTypes.ObjectId }]
});

tagSchema.methods.convertToLowerCase = function () {
  return this.name.toLowerCase();
};

tagSchema.virtual('description').get(function () {
  return `This Schema with name ${this.name} has virtual property with name description`;
});

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
