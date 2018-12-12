let db = (function () {
  const fs = require('fs');
  let storage = {

  };

  /**
   * Function which adds value based on key
   * @param {string} key
   * @param {string} value
   * @throws {new Error}
   */
  function put (key, value) {
    if (typeof key !== 'string') {
      throw new Error('The key parameter in put method should be a string');
    }
    if (storage.hasOwnProperty(key)) {
      throw new Error('The key parameter in put method is already resent in the db');
    }
    storage[key] = value;
  }
  /**
   * Function which returns the value by specific key
   * @param {string} key
   * @param {function} callback
   * @returns {string} the value
   */
  function get (key, callback) {
    if (typeof key !== 'string') {
      throw new Error('The key parameter in get method should be a string');
    }
    if (!storage.hasOwnProperty(key)) {
      throw new Error('The key parameter in get method is not resent in the db');
    }
    if (callback) {
      callback(storage[key]);
    } else {
      return storage[key];
    }
  }
  /**
   * Function which returns all records in db
   * @param {function} callback
   */
  function getAll (callback) {
    if (Object.keys(storage).length === 0) {
      console.log('The DB is empty');
    }
    if (callback) {
      callback(storage);
      return;
    }
    return storage;
  }
  /**
   *  Function which updtes the calue based on key param.
   * @param {string} key
   * @param {any} newValue
   * @throws {new Error} throws errors
   */
  function update (key, newValue) {
    if (typeof key !== 'string') {
      throw new Error('The key parameter in update method should be a string');
    }
    if (!storage.hasOwnProperty(key)) {
      throw new Error('The key parameter in update method is not resent in the db');
    }
    storage[key] = newValue;
  }
  /**
   * Function which accept string key and removes it from db
   * @param {string} key
   * @throws {new Error}
   */
  function remove (key) {
    if (typeof key !== 'string') {
      throw new Error('The key parameter in update method should be a string');
    }
    if (!storage.hasOwnProperty(key)) {
      throw new Error('The key parameter in update method is not resent in the db');
    }
    delete storage[key];
  }
  function clear () {
    storage = {};
  }
  /**
   * Function which returns promise
   * @returns {promise}
   */
  function save () {
    let json = JSON.stringify(storage);

    return new Promise((resolve, reject) => {
      fs.writeFile('./storage/database.json', json, 'utf-8', function (err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }

  /**
   * Function which returns promise
   * @returns {promise}
   */
  function load () {
    return new Promise((resolve, reject) => {
      fs.readFile('./storage/database.json', 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('Data was save successfully!');
        storage = JSON.parse(data);
        resolve(storage);
      });
    });
  }

  return {
    put,
    get,
    getAll,
    update,
    delete: remove,
    clear,
    save,
    load
  };
})();

module.exports = db;
