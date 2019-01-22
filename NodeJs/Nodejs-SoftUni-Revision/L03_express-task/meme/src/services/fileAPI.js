
const pathToStorage = './public/memeStorage/0/';

module.exports = {
  move: (file, fileName) => {
    return file.mv(`${pathToStorage}${fileName}`);
  }
};
