const imageService = require('../services/imageService');
const helpers = require('../utils/helpers');
const FileAPI = require('../services/apis/FileAPI');
const RESULTS_HTML = require('../utils/constants').RESULTS_HTML;
const REPLACE_ME = require('../utils/constants').REPLACE_ME;

const formidable = require('formidable');
module.exports = (req, res) => {
  if (req.pathname === '/search') {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(req.pathquery);
      let fileAPI = new FileAPI(req, res);
      Promise.all([ fileAPI.loadDynamicHTML(RESULTS_HTML), imageService.imageQueryHandler(req.pathquery) ])
        .then((responses) => {
          let [ html, serviceData ] = responses;
          let updatedServiceData = '';
          serviceData.forEach(e => {
            updatedServiceData += helpers.getAllImagesAsHTML(e);
          });
          let finalHtml = fileAPI.updateDynamicHTML(html, updatedServiceData, REPLACE_ME);
          fileAPI.sendHTML(finalHtml, 200);
        });
    });
  } else {
    return true;
  }
};
