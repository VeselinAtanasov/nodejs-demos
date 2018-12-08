const fs = require('fs');
const file = fs.createWriteStream('./file.txt');

for (let i = 0; i <= 1e5; i++) {
  file.write('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor magni rem dignissimos pariatur, ea, obcaecati reprehenderit id odit odio alias, nostrum sequi! Ipsum laborum minus explicabo eius error magni atque.');
}
file.end();
