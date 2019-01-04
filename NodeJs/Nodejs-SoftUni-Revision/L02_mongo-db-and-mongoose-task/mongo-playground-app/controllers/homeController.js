let tagService = require('../services/tagService');
let FileAPI = require('../services/apis/FileAPI');
let REPLACE_ME = require('../utils/constants').REPLACE_ME;
let HOME_PAGE = require('../utils/constants').HOME_PAGE;

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    let fileAPI = new FileAPI(req, res);
    fileAPI.loadDynamicHTML(HOME_PAGE, 200)
      .then(html => {
        tagService
          .getAllTags()
          .then(tags => {
            let displayTags = '';
            for (let tag of tags) {
              displayTags += `<div class='tag' id="${tag._id}">${tag.tagName}</div>`;
            }
            fileAPI.updateDynamicHTML(html, displayTags, REPLACE_ME);
          })
          .catch(err => {
            console.log(err);
            console.log('Fetching data from db failed.');
            fileAPI.updateDynamicHTML(html);
          });
      })
      .catch(e => console.log(e));
  } else {
    return true;
  }
};
