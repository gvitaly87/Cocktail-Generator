import getRequest from '/js/get-json.mjs';

let pageCount;
// Inserts drinks into the page(based on the page number and the amount of drinks/page)
const getDrinks = async (page, limit) => {
  const data = await getRequest(`/api/v0/gallery?page=${page}&limit=${limit}`);
  const drinkGenerator = data.drinkList;
  pageCount = data.totalPages;

  // Set page counter inside the page
  document.querySelector('.page').innerHTML = `Page ${page} of ${pageCount}`;

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
      <h1 class="drink-name">${drink.name}</h1>
      <div class="star-rating">
      <i class="fas fa-star"></i>
      <p class="rating">4.5</p>
      </div>
    </div>
    </div>`;
  });
  document.querySelector('.drink').innerHTML = output;
};
//Deletes all the drink entries inside the gallery
const deleteDrinks = () => {
  document.querySelectorAll('.recipe-card').forEach((e) => e.parentNode.removeChild(e));
};

//Default for the gallery to start on page 1 and have 12 items per page
let page = 1;
let entriesPerPage = 12;
getDrinks(page, entriesPerPage);

/***********Page Pagination Buttons*********/
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
