import getRequest from '/js/get-json.mjs';
// fetch("/api/v0/members")

//   .then(function (response) {
//     if (!response.ok) {
//       throw new Error("This is an error");
//     }
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
const getTeam = async () => {
    const data = await getRequest('/api/v0/members');
    const teamMember = data;
    const card = document.querySelector(".card");
    //create output string for html
    let output='';
    teamMember.forEach(function(item){
      output += `
        <img class ="profile-image" src="${item.profilePic}" alt="${item.name}">
        <h2> ${item.name} </h2>
        <p>${item.role} </p>
        <p>${item.bio} </p>
        <a href="#" ${item.github} ><i class="fab fa-github"></i></a> `;
  
      document.querySelector('.card').innerHTML= output;
  });
}

getTeam();
// .catch(function (error) {
//   console.log(error);
// });