const fs = require('fs');

/**
 * First Solution:
 * Controller for displaying text content on page, using standart file system operations:
 * @param {object} req http request
 * @param {object} res http response
 */
/*
function handleBigFile (req, res) {
  if (req.path === '/bigFile') {
    fs.readFile('./utils/streams/file.txt', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        'content-type': 'text/plain'
      });
      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
}
*/

/**
 * Second Solution
 * Controller for displaying text content on page, using Streams - Readable stream through file and write in Writable Stream to the client using events:
 * @param {object} req http request
 * @param {object} res http response
 */
/*
function handleBigFile (req, res) {
  if (req.path === '/bigFile') {
    // Create ReadStream using fs module - it requires only path to the file.
    const readStream = fs.createReadStream('./utils/streams/file.txt');

    // Sending the response to client(note, res is a Writable stream)
    res.writeHead(200, {
      'content-type': 'text/plain'
    });
    // Subscriber for 'data' event - each chunk of data will be processed by this callback:
    readStream.on('data', data => {
      res.write(data);
    });
    // Subscriber for 'end' event - close the Writable stream (res.end())
    readStream.on('end', () => {
      res.end();
    });
  } else {
    return true;
  }
}
*/

/**
 * Third Solution:
 * Controller for displaying text content on page, using Streams - Readable stream through file and write in Writable Stream to the client using pipe:
 * @param {object} req http request
 * @param {object} res http response
 */

function handleBigFile (req, res) {
  if (req.path === '/bigFile') {
    // Create ReadStream using fs module - it requires only path to the file.
    const readStream = fs.createReadStream('./utils/streams/file.txt');

    // Sending the response to client(note, res is a Writable stream)
    res.writeHead(200, {
      'content-type': 'text/plain'
    });
    // Other option instead of subscriber for events we can use pipe - to pipe readStream to writeStream:
    readStream.pipe(res);
  } else {
    return true;
  }
}

module.exports = handleBigFile;
