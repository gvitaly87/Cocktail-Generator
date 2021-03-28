/*****************************************************/
/*******Deletes all elements with for a given ********/
/*****************************************************/

const deleteDrinks = (className) => {
  document.querySelectorAll(className).forEach((e) => e.parentNode.removeChild(e));
};

export default deleteDrinks;
