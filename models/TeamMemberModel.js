const mongoose = require('mongoose');

const teamMemberSchema = mongoose.Schema({
  name: String,
  profilePic: String,
  title: String,
  bio: String,
  favoriteDrink: String,
  github: String,
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
