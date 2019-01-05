let tagService = require('../services/tagService');
let FileAPI = require('../services/apis/FileAPI');
let helpers = require('../utils/helpers');
let REPLACE_ME = require('../utils/constants').REPLACE_ME;
let HOME_PAGE = require('../utils/constants').HOME_PAGE;

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    let fileAPI = new FileAPI(req, res);
    Promise.all([ fileAPI.loadDynamicHTML(HOME_PAGE), tagService.getAllTags() ])
      .then((values) => {
        let [ html, serviceData ] = values;
        let updatedServiceData = helpers.prepareHomePage(serviceData);
        let finalHtml = fileAPI.updateDynamicHTML(html, updatedServiceData, REPLACE_ME);
        fileAPI.sendHTML(finalHtml, 200);
      })
      .catch(e => console.log(e));
  } else {
    return true;
  }
};
