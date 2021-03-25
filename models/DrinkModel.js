const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true, index: { unique: true } },
  baseAlcohol: [{ name: { type: String, index: true }, measure: String }],
  Ingredients: [{ name: { type: String, index: true }, measure: String }],
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
