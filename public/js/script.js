const menu = document.querySelector ('.hamburger-menu');
const nav = document.querySelector ('.primary');

menu.addEventListener("click", function(){

  nav.classList.toggle("change");

});