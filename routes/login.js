const express = require('express');
const passport = require('passport');
const router = express.Router();

// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', (req, res) => {
    res.render('layout', {
      pageTitle: 'Login',
      template: 'login',
    });
  });

  router.use(express.urlencoded({ extended: true }));

  router.post(
    '/',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })
  );

  return router;
};
