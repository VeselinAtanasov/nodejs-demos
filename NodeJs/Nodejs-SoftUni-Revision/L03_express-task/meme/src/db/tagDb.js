const fs = require('fs');

let db = [];
let dbPath = './db/genreDb.json';

let load = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log('loading');
      db = JSON.parse(data);
      resolve();
    });
  });
};

let save = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
};

let add = (movie) => {
  db.push(movie);
};

let updateMemeArr = (id, img) => {
  console.log(id);
  console.log('found');

  let searchedFor = db.find(e => {
    console.log(e);
    if (e.id === img) {
      return e;
    }
  });

  db.map(x => {
    if (x.id === id) {
      console.log(x);
      x.memeArr.push(img);
    }
  });

  console.log('im db');
  console.log(db);
};

let dbCopy = () => {
  return db.slice(0);
};

module.exports = {
  load: load,
  save: save,
  getDb: dbCopy,
  update: updateMemeArr,
  add: add
};
