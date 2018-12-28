// const fileAPI = require('../apis/fileAPI');
const FileAPI = require('../apis/fileAPI');

module.exports = (req, res) => {
  if (req.path === '/' && req.method === 'GET') {
    let fileAPI = new FileAPI(req, res);
    fileAPI
      .loadHtmlFile('home.html')
      .then()
      .catch(err => console.log(err));
  } else {
    return true;
  }
};
