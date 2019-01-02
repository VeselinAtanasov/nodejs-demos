const fileAPI = require('../apis/FileAPI');
const db = require('../config/dataBase');
const helpers = require('../utils/helpers');
const formidable = require('formidable');

const VIEW_ALL_MEMES_HTML = require('../utils/constants').VIEW_ALL_MEMES_HTML;
const REPLACE_MEME = require('../utils/constants').REPLACE_MEME;
const ADD_MEME = require('../utils/constants').ADD_MEME_HTML;
const DETAILS_MEME = require('../utils/constants').DETAILS_MEME;

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    db.load().then(() => {
      let memes = db.getDb();
      let html = helpers.getAllMemesAsHtml(memes);

      fileAPI
        .loadHtml(req, res, VIEW_ALL_MEMES_HTML, 200, html, REPLACE_MEME)
        .then()
        .catch(err => console.log(err));
    });
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    fileAPI
      .loadHtml(req, res, ADD_MEME, 200)
      .then()
      .catch(err => console.log(err));
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }
      let file = files.meme;
      let fileExtension = '.' + file.name.split('.').pop();
      let fileName = fields.memeTitle + '_' + Date.now() + fileExtension;
      fileAPI
        .move(req, res, file.path, fileName)
        .then(() => {
          db.add({
            id: fileName.split('.').shift(),
            title: fields.memeTitle ? fields.memeTitle : '',
            memeSrc: './public/memeStorage' + fileName,
            description: fields.memeDescription ? fields.memeDescription : '',
            privacy: fields.status,
            dateStamp: Date.now()
          });
          db
            .save()
            .then()
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    let id = req.url.split('id=').pop();
    db
      .load()
      .then(() => {
        let targetedMeme = db.getById(id);
        let html = helpers.getMemeDetailsHtml(targetedMeme);
        fileAPI
          .loadHtml(req, res, DETAILS_MEME, 200, html, REPLACE_MEME)
          .then()
          .catch(e => console.log(e));
      })
      .catch(err => console.log(err));
  } else {
    return true;
  }
};
