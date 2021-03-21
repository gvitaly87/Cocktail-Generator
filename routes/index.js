const express = require('express');

const router = express.Router();

const galleryRoute = require('./gallery');
const teamRoute = require('./team');
const loginRoute = require('./login');
const registerRoute = require('./register');
const adminRoute = require('./admin');
const subscribeRoute = require('./subscribe');

const apiRoute = require('./api/v0');

const imgArr = require('../data/images');
// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', (req, res) => {
    // render calls the view engine
    // looks for the page at the path, passes variable pageTitle
    res.render('pages/index', { pageTitle: 'Index' });
  });

  router.use('/subscribe', subscribeRoute());
  router.use('/gallery', galleryRoute());
  router.use('/team', teamRoute());
  router.use('/admin', adminRoute());
  router.use('/login', loginRoute());
  router.use('/register', registerRoute());
  router.use('/api/v0', apiRoute());

  return router;
};
