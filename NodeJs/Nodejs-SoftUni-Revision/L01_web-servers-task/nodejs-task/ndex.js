const db = require('./storage/storage');

/**
 * Simple function which adds some data in the database.json file
 */
function fillDb () {
  db.put('name', 'Veselin');
  db.put('last-name', 'Atanasov');
  db.put('age', '30');
}

fillDb();

console.log(db.getAll());
db.save();
db.load().then(data => {
  console.log('THEN: ');
  console.log(data);
}).catch(err => console.dir(err));


