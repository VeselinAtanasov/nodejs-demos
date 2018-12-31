## Issue Description:
In file fileAPI.js located in  /api/ there a re one js class, which accepts http request and resposne through the constructor. There are also one method 'loadHtmlFile' which returns new Promise. When I try to use this.res.end(), I got the following error:
TypeError: Cannot read property 'res' of undefined

#### Solution:
Issue is resolved if I pass arrow function to the Promise constructor:

  loadHtmlFile (filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(`./views/${filePath}`, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        this.res.writeHead(200, {
          'content-type': 'text/html'
        });
        this.res.write(data);
        this.res.end();
        resolve();
      });
    });
  }

  This is because arrow functions do ot keeps the 'this' value

#### TODO:
##### v.1.0.2 - Another .bind(this) is needed in case we pass to fs.readFile not arrow function, but regular function:
  loadHtmlFile (filePath) {
    return new Promise(function (resolve, reject) {
      fs.readFile(`./views/${filePath}`, 'utf8', function(err, data){
        if (err) {
          reject(err);
          return;
        }
        this.res.writeHead(200, {
          'content-type': 'text/html'
        });
        this.res.write(data);
        this.res.end();
        resolve();
      }.bind(this));
    }.bind(this));
  }

##### v.1.0.1 - Issue solved also in case of regular function - the function itself is binded to this:
  loadHtmlFile (filePath) {
    return new Promise(function (resolve, reject) {
      fs.readFile(`./views/${filePath}`, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        this.res.writeHead(200, {
          'content-type': 'text/html'
        });
        this.res.write(data);
        this.res.end();
        resolve();
      });
    }.bind(this));
  }

##### v.1.0.0 - How should I keep this value in case I use regular function, i.e where and what should I bind:
    loadHtmlFile (filePath) {
    return new Promise(function(resolve, reject) {
      fs.readFile(`./views/${filePath}`, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        this.res.writeHead(200, {
          'content-type': 'text/html'
        });
        this.res.write(data);
        this.res.end();
        resolve();
      });
    });
  }
