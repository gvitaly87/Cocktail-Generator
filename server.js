const dotenv = require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');

const routes = require('./routes');

// Read the host address and the port from the environment
const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

//Every time we see a app.use we apply a Middleware in express
//Returns the static asset as long as it is found in the specified folder.
app.use(express.static(path.join(__dirname, './public')));

//set ejs as the view engine for express
app.set('view engine', 'ejs');

app.use('/', (req, res, next) => {
  res.locals.siteName = 'Cocktail Drink Generator';
  next();
});
app.use('/', routes());

//404 Not Found page.
app.use((req, res) => res.status(404).redirect('404.html'));

// Start a TCP server listening for connections on the given port and host
app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
