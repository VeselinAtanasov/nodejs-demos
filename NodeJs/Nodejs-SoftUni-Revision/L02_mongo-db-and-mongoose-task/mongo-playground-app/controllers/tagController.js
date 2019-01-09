const formidable = require('formidable');
const tagService = require('../services/tagService');
const FileAPI = require('../services/apis/FileAPI');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let fileAPI = new FileAPI(req, res);
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }

      tagService.addTag(fields).then(() => {
        fileAPI.redirect('/');
      })
        .catch(err => console.log(err));
    });
  } else {
    return true;
  }
};
