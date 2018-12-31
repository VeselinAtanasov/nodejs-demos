const formidable = require('formidable');
const fileApi = require('../apis/fileAPI');

module.exports = (req, res) => {
  if (req.path === '/upload' && req.method === 'GET') {
    fileApi
      .loadHtmlFile(req, res, 'send-file.html')
      .then()
      .catch(err => console.log(err));
  } else if (req.path === '/upload' && req.method === 'POST') {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }
      let file = files.file;
      let fileExtension = '.' + file.name.split('.').pop();
      let fileName = fields.firstName + '_' + fields.lastName + '_' + Date.now() + fileExtension;
      fileApi
        .move(req, res, file.path, fileName)
        .then()
        .catch(err => console.log(err));
    });
  } else {
    return true;
  }
};
