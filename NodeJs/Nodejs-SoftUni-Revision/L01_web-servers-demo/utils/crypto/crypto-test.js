const crypto = require('./crypto');

const salt = crypto.generateSalt();
const password = 'vesko123';

const hashed = crypto.generateHashedPassword(salt,password);
console.log(hashed);