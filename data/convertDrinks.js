const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const drinksArr = require('./drinks');
const jsonPath = './drinks.json';

const getDrinks = async () => {
  const data = await readFile(jsonPath, 'utf8');
  if (!data) return [];
  return JSON.parse(data);
};

const writeDrink = async (drinkObj) => {
  const data = (await getDrinks()) || [];
  data.unshift(drinkObj);
  return writeFile(jsonPath, JSON.stringify(data));
};

class Drink {
  constructor(name, baseAlcohol, ingredients, glassType, recipe, imgPath) {
    this.name = name;
    this.baseAlcohol = baseAlcohol;
    this.ingredients = ingredients;
    this.glassType = glassType;
    this.recipe = recipe;
    this.imgPath = imgPath;
    this.width = 700;
    this.height = 700;
  }
}
class Ingredient {
  constructor(name, measure) {
    this.name = name;
    this.measure = measure;
    // this.unit = measure.trim().split(' ').pop();
  }
}
const convertDrinks = async () => {
  let formattedDrinks = [];
  drinksArr.forEach(async (drink) => {
    let ingredientList = [];
    let baseAlcohol = new Ingredient(drink.strIngredient1, drink.strMeasure1);
    for (let i = 2; i <= 15; i++) {
      if (drink[`strIngredient${i}`] !== null) {
        const ingredientObJ = new Ingredient(drink[`strIngredient${i}`], drink[`strMeasure${i}`]);
        // console.log(ingredientObJ);
        ingredientList.push(ingredientObJ);
      }
    }
    const drinkObj = new Drink(
      drink.strDrink,
      baseAlcohol,
      ingredientList,
      drink.strGlass,
      drink.strInstructions,
      drink.strDrinkThumb
    );
    formattedDrinks.push(drinkObj);
    // console.log(formattedDrinks);
    const promise = await writeDrink(formattedDrinks);
  });
};

convertDrinks();
