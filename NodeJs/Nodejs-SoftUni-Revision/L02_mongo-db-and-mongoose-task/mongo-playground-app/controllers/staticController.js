
const FileAPI = require('../services/apis/FileAPI');
const FAVICON_PATH = require('../utils/constants').FAVICON_PATH;

module.exports = (req, res) => {
  if (req.pathname === '/favicon.ico' && req.method === 'GET') {
    let fileAPI = new FileAPI(req, res);
    fileAPI
      .loadFavicon(FAVICON_PATH, 200)
      .then()
      .catch(err => console.log(err));
  } else if (req.pathname.startsWith('/public/') && req.method === 'GET') {
    let fileAPI = new FileAPI(req, res);
    fileAPI
      .loadStaticFile()
      .then()
      .catch(err => console.log(err));
  } else {
    res.write('404');
    res.end();
  }
};
