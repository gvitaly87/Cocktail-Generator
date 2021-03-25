import getRequest from '/js/get-json.mjs';


const image = document.querySelector("image");
const button = document.querySelector("button");
const getTeam = async () => {
const data = await getRequest('/api/v0/gallery');
const drinkGenerator = data;
const card = document.querySelector('.drink');

let output='';

drinkGenerator.forEach(function(drink){
   
  output += ` <h2 class="name"${drink.name}></h2>
  <div class="image"><img src="${drink.image}" alt="${drink.name}"></div>
  <div class="baseAlcohol">${drink.baseAlcohol}</div>
  <div class="glassType">${drink.glassType}</div>
  <div class="ingredients">${drink.ingredients}</div>
  <div class="recipe"><p>${drink.recipe}</p></div> `;
}); 
};
document.querySelector('.drink').innerHTML= output;
