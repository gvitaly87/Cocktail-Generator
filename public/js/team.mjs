import getRequest from '/js/get-json.mjs';

const getTeam = async () => {
  const data = await getRequest('/api/v0/members');
  const teamMember = data;
  const card = document.querySelector('.row.team');
  //create output string for html
  let output = '';
  teamMember.forEach(function (item) {
    output += `
      <div class="member">
        <div class="card">
          <img class ="profile-image" src="${item.profilePic}" alt="${item.name}">
          <h2> ${item.name} </h2>
          <p>Favorite Drink: ${item.favoriteDrink} </p>
          <p>Bio: ${item.bio} </p>
          <div class="social-links">
            <a href="#" ${item.github} ><i class="fab fa-github"></i></a> 
          </div>
        </div>
      </div>`;
    card.innerHTML = output;
  });
};

getTeam();
