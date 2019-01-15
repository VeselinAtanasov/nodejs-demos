const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;

const middleware = require('./custom-middleware/customMiddleware');
const cats = require('./cats-router/cats-router');

// this middleware will serve all static files
app.use(express.static('public'));
// this is a middleware, which will be executed every time before entering th final callback.
app.use(bodyParser.urlencoded({ extended: true }));

// This is a custom middleware - will be executed every time when /user/:userId is accessed
app.use('/user/:userId', (req, res, next) => {
  console.log('Custom Middleware');
  let userId = req.params.userId;
  console.log(userId);
  // TODO: Check if user exists in db/session
  let userExists = true;
  if (!userExists) {
    res.redirect('/login');
  } else {
    next();
  }
});
app.get('/user/:userId', (req, res) => {
  res.send('User home page!');
});

// when access this path first the custom middleware will be used then the callback
app.get('/', middleware, (req, res) => {
  res.send('Welcome to express');
});

// we can get all query params from req.params object
app.get('/details/:id', (req, res) => {
  let paramsObj = req.params;
  res.send(paramsObj);
  // res.json(paramsObj);
  // res.redirect('/about');
  // res.render();
  // res.sendFile('/index.js');
  // res.download(__dirname+'/index.js');
});

// Use bodyParser here to parse the form - all params a are in req.body object.
app.post('/save-form', (req, res) => {
  console.log(req.body);
  console.log(req.body.firstName);
  console.log(req.body.age);
  res.redirect('/');
});

// Using modular router - if we access /cats/create, /cats/...
app.use('/cats', cats);

app.listen(port, () => console.log(`Express running on port ${port}`));
