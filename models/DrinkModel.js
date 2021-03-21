const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
  name: String,
  baseAlcohol: [{ name: String, quantity: Number, unit: String }],
  Ingredients: [{ name: String, quantity: Number, unit: String }],
  glassType: String,
  Recipe: String,
  imagePath: String,
  width: Number,
  height: Number,
  meta: {
    votes: Number,
    favs: Number,
  },
});

module.exports = mongoose.model('Drink', drinkSchema);
