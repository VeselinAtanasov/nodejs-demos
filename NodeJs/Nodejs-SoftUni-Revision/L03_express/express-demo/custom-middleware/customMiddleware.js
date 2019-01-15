module.exports = (req, res, next) => {
  console.log('Middleware was entered!');
  next();
};
