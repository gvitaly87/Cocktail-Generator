import deleteDrinks from '/js/delete-items.mjs';
import getDrinks from '/js/update-gallery.mjs';
//Default for the gallery to start on page 1 and have 12 items per page
let pageCount;
let page = 1;
let entriesPerPage = 12;
pageCount = getDrinks(page, entriesPerPage);

/***********Page Pagination Buttons*********/
document.querySelector('.prev').addEventListener('click', () => {
  if (page > 1) {
    page -= 1;
    deleteDrinks('.recipe-card');
    pageCount = getDrinks(page, entriesPerPage);
  }
});

document.querySelector('.next').addEventListener('click', () => {
  if (page < pageCount) {
    page += 1;
    deleteDrinks('.recipe-card');
    pageCount = getDrinks(page, entriesPerPage);
  }
});
/***********Select Items per page*********/
const entriesSelect = document.querySelector('#entries');
entriesSelect.addEventListener('change', () => {
  page = 1;
  entriesPerPage = entriesSelect.value;
  deleteDrinks('.recipe-card');
  pageCount = getDrinks(page, entriesPerPage);
});

/**************Search Button **************/
document.querySelector('.search-button').addEventListener('click', () => {
  const searchValue = document.querySelector('#search').value;
  console.log(searchValue);
  document.location.href = `/gallery/${searchValue}`;
});
