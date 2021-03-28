import getRequest from '/js/get-json.mjs';

const getDrinks = async (page, limit) => {
  const data = await getRequest(`/api/v0/gallery?page=${page}&limit=${limit}`);
  const drinkGenerator = data.drinkList;

  // Set page counter inside the page
  document.querySelector('.page').innerHTML = `Page ${page} of ${data.totalPages}`;

  let output = ``;
  drinkGenerator.forEach(function (drink) {
    output += `
    <div class="recipe-card">
    <figure>
    <a href="/gallery/${drink.name}">
    <img class="gallery-image" src="${drink.imgPath}" alt="${drink.name}"></a>
    </figure>
    <div class="recipe-data">`;

    for (let i = 0; i < drink.baseAlcohol.length; i++) {
      output += `
        <p class="alcohol-type">${drink.baseAlcohol[i].name}</p>`;
    }
    // Rounds a random num form 1 to 5 to the nearest decimal
    const rating = Math.round((Math.random() * 2.5 + 2.5) * 10) / 10;
    output += `
      <a href="/gallery/${drink.name}"><h2 class="drink-name">${drink.name}</h2></a>
      <div class="star-rating">
      <p class="rating">${rating}<i class="fas fa-star"></i></p>
      </div>
    </div>
    </div>`;
  });
  document.querySelector('.drink').innerHTML = output;
  return data.totalPages;
};

export default getDrinks;
