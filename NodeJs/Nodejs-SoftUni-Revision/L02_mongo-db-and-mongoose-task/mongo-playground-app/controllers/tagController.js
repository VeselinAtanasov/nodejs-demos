const formidable = require('formidable');

const formidable = require('formidable');
const tagService = require('../services/tagService');
const FileAPI = require('../services/apis/FileAPI');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
<<<<<<< HEAD
=======
    let fileAPI = new FileAPI(req, res);
>>>>>>> c9c7d3af29d33a41f67c0295de722c2cf976f164
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }
<<<<<<< HEAD
      console.log(fields, files);
=======
      tagService.addTag(fields).then(data => {
        fileAPI.redirect('/');
      })
        .catch(err => console.log(err));
>>>>>>> c9c7d3af29d33a41f67c0295de722c2cf976f164
    });
  } else {
    return true;
  }
};
