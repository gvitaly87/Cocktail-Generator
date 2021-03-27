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
    output += `<a href="/gallery/${drink.name}">
    <div class="recipe-card">
    <figure>
    <img class="gallery-image" src="${drink.imgPath}" alt="${drink.name}">
    </figure>
    <div class="recipe-data">`;

    for (let i = 0; i < drink.baseAlcohol.length; i++) {
      output += `
        <p class="alcohol-type">${drink.baseAlcohol[i].name}</p>`;
    }
    // Rounds a random num form 1 to 5 to the nearest decimal
    const rating = Math.round((Math.random() * 4 + 1) * 10) / 10;
    output += `
      <h2 class="drink-name">${drink.name}</h2>
      <div class="star-rating">
      <p class="rating">${rating}<i class="fas fa-star"></i></p>
      </div>
    </div>
    </div></a>`;
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

const entriesSelect = document.querySelector('#entries');
entriesSelect.addEventListener('change', () => {
  page = 1;
  entriesPerPage = entriesSelect.value;
  deleteDrinks();
  getDrinks(page, entriesPerPage);
});

/**************Search Button **************/
document.querySelector('.search-button').addEventListener('click', () => {
  const searchValue = document.querySelector('#search').value;
  console.log(searchValue);
  document.location.href = `/gallery/${searchValue}`;
});
