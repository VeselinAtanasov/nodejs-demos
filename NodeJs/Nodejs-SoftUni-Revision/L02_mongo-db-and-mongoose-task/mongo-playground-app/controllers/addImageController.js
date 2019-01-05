
const formidable = require('formidable');
const helpers = require('../utils/helpers');
const imageService = require('../services/imageService');
const FileAPI = require('../services/apis/FileAPI');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    let fileAPI = new FileAPI(req, res);
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }
      let tag = helpers.getRealImageModel(fields);
      imageService
        .addImage(tag)
        .then(image => {
          fileAPI.redirect('/');
        })
        .catch(e => console.log(e));
    });
  } else if (req.pathname === '/delete' && req.method === 'GET') {

  } else {
    return true;
  }
};
