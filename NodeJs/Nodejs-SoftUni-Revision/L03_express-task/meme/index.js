
let env = process.env.NODE_ENV || 'development';

let settings = require('./src/config/settings')[env];

const app = require('express')();

require('./src/config/database')(settings);
require('./src/config/express')(app);
require('./src/config/routes')(app);

app.listen(settings.port);
console.log(`Server listening on port ${settings.port}...`);
