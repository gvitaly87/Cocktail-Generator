import getRequest from '/js/get-json.mjs';

let pageCount;
const getDrinks = async (page, limit) => {
  const data = await getRequest(`/api/v0/gallery?page=${page}&limit=${limit}`);
  const drinkGenerator = data.drinkList;
  pageCount = data.totalPages;
  let output = ``;

  drinkGenerator.forEach(function (drink) {
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
    output += `
      <h1 class="drink-name">Whiskey Sour</h1>
      <div class="star-rating">
      <i class="fas fa-star"></i>
      <p class="rating">4.5</p>
      </div>
    </div>
    </div>`;
  });
  document.querySelector('.drink').innerHTML = output;
};

const deleteDrinks = () => {
  document.querySelectorAll('.recipe-card').forEach((e) => e.parentNode.removeChild(e));
};

let page = 1;
let entriesPerPage = 12;
getDrinks(page, entriesPerPage);

document.querySelector('.prev').addEventListener('click', () => {
  if (page > 1) {
    page -= 1;
    deleteDrinks();
    getDrinks(page, entriesPerPage);
  }
});

document.querySelector('.next').addEventListener('click', () => {
  if (page < pageCount) {
    page += 1;
    deleteDrinks();
    getDrinks(page, entriesPerPage);
  }
});
