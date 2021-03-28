require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(function () {
    console.log('Connected to DB...');
  })
  .catch(function (err) {
    err.message = "Couldn't connect to the DB...";
    err.status = 500;
    console.log(err);
  });

module.exports = mongoose;
