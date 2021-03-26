import getRequest from '/js/get-json.mjs';

const image = document.querySelector('image');
const button = document.querySelector('button');

const getDrinks = async () => {
  const data = await getRequest('/api/v0/gallery');
  const drinkGenerator = data.drinkList;

  let output = '';

  drinkGenerator.forEach(function (drink) {
    // output += ` <h2 class="name"${drink.name}></h2>
    // <div class="image"><img src="${drink.image}" alt="${drink.name}"></div>
    // <div class="baseAlcohol">${drink.baseAlcohol}</div>
    // <div class="glassType">${drink.glassType}</div>
    // <div class="ingredients">${drink.ingredients}</div>
    // <div class="recipe"><p>${drink.recipe}</p></div> `;

    output += `
    <div class="recipe-card">
      <figure>
        <img src="${drink.imgPath}" alt="${drink.name}">
      </figure>
      <div class="recipe-data">`;

    for (let i = 0; i < drink.baseAlcohol.length; i++) {
      output += `
        <p class="alcohol-type">${drink.baseAlcohol[i].name}</p>`;
    }
    output +=`
      <h1 class="drink-name">Whiskey Sour</h1>
      <div class="star-rating">
        <i class="fas fa-star"></i>
        <p class="rating">4.5</p>
      </div>
    </div>
  </div>`
  });
  document.querySelector('.drink').innerHTML = output;
};

getDrinks();
