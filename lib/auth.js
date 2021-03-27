const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserModel');

const authenticateUser = async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username }).exec();
    // Check if user exists
    if (!user) {
      return done(null, false, { message: 'Invalid username' });
    }
    // Check if the password matches
    const passwordOK = await user.comparePassword(password);
    if (!passwordOK) {
      return done(null, false, { message: 'Invalid password' });
    }
    // Returns valid user
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(
  // Set the login using the email field
  new LocalStrategy({ usernameField: 'email' }, authenticateUser)
);

// Only store the user id in session instead of storing all the user information
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = {
  initialize: passport.initialize(),
  session: passport.session(),
  setUser: (req, res, next) => {
    res.locals.user = req.user;
    return next();
  },
};
