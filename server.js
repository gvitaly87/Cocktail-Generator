const mongoose = require('./lib/db');
require('dotenv').config();
const express = require('express');

const session = require('express-session');
const flash = require('express-flash');

const app = express();
const path = require('path');
const routes = require('./routes');

const auth = require('./lib/auth');
const { Server } = require('http');
const PORT = process.env.PORT || 3000;

//Every time we see a app.use we apply a Middleware in express
//Returns the static asset as long as it is found in the specified folder.
app.use(express.static(path.join(__dirname, './public')));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));
//set ejs as the view engine for express
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(flash());
// TODO: update and move secret to env
app.use(
  session({
    secret: 'very secret 456123',
    resave: false,
    saveUninitialized: false,
  })
);

// Setting up passport auth
app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser);

app.use('/', (req, res, next) => {
  res.locals.siteName = 'Cocktail Drink Generator';
  next();
});

app.use('/', routes());

//404 Not Found page.
app.use((req, res, next) => {
  const err = new Error('Requested page could not be found');
  err.status = 404;
  next(err);
});

// Catch all the errors that might have occurred
// Displays the full error in the console while providing the user with a pretty error page
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('layout', { pageTitle: `Error ${status}`, template: 'error' });
});

// Start a TCP server listening for connections on the given port and host
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
