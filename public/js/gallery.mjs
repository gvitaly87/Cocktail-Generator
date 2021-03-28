import getRequest from '/js/get-json.mjs';
import deleteDrinks from '/js/delete-items.mjs';

let pageCount;

// Get drinks requests a drinks list from the api, and inserts them on the gallery page.
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
};

let page = 1;
let entriesPerPage = 12;
getDrinks(page, entriesPerPage);

/***********Page Pagination Buttons*********/
document.querySelector('.prev').addEventListener('click', () => {
  if (page > 1) {
    page -= 1;
    deleteDrinks('.recipe-card');
    getDrinks(page, entriesPerPage);
  }
});

document.querySelector('.next').addEventListener('click', () => {
  if (page < pageCount) {
    page += 1;
    deleteDrinks('.recipe-card');
    getDrinks(page, entriesPerPage);
  }
});
/***********Select Items per page*********/
const entriesSelect = document.querySelector('#entries');
entriesSelect.addEventListener('change', () => {
  page = 1;
  entriesPerPage = entriesSelect.value;
  deleteDrinks('.recipe-card');
  getDrinks(page, entriesPerPage);
});

/**************Search Button **************/
document.querySelector('.search-button').addEventListener('click', () => {
  const searchValue = document.querySelector('#search').value;
  console.log(searchValue);
  document.location.href = `/gallery/${searchValue}`;
});
