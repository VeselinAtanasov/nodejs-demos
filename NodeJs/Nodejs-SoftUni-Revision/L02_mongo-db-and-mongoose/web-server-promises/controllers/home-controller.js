const fileAPI = require('../apis/fileAPI');

module.exports = (req, res) => {
  if (req.path === '/' && req.method === 'GET') {
    fileAPI
      .loadHtmlFile(req, res, 'home.html')
      .then()
      .catch(err => console.log(err));
  } else {
    return true;
  }
};
