let drink =[
  {
    image:('./images/gallery/mojito.jpg') ,
    drink-name: 'Mojito',
    glass-size: '4 oz',
    ingredients:{'rum' ,'lime juice','2 tps sugar','2-4 mint leaves','soda water'}, 
    width:"200" ,
    height:"200",
    recipe:'Muddle mint leaves with sugar and lime juice.Add splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw', 
  }, 
];
let output='';


nature.forEach(function(item){
  output += `
  <figure>
    <img class ="image" src="${item.imageURL}" alt="${item.drink-name}"  ${item.drink-name} width="${item.width}" height="${item.height}">
    <figcaption> ${item.glass-size}   ${' '}     ${item.ingredients}  </figcaption>
    <p>${item.recipe} </p>
  </figure> `
});
  
document.querySelector('.image').innerHTML= output;
