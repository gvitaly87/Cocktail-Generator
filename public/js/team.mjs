import getRequest from '/js/get-json.mjs';
// <div class="card">
//   <img src="" alt="a person" class="profile-image" />
//   <h2 class="name"> </h2>
//   <p class="role"> </p>
//   <p class="bio"> </p>
//   <div class="social-links">
//     <a href="#">
//       <i class="fab fa-github"></i>
//     </a>
//   </div>
// </div>;
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
          <p>${item.role} </p>
          <p>${item.bio} </p>
          <div class="social-links">
            <a href="#" ${item.github} ><i class="fab fa-github"></i></a> 
          </div>
        </div>
      </div>`;
    card.innerHTML = output;
  });
};

getTeam();
