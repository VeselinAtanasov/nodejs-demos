const fileApi = require('../apis/FileAPI.js');
const HOME_PAGE = require('../utils/constants.js').HOME_PAGE_HTML;

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    fileApi
      .loadHtml(req, res, HOME_PAGE, 200)
      .then()
      .catch(err => console.log(err));
  } else {
    return true;
  }
};
