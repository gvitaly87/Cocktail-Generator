import getRequest from '/js/get-json.mjs';

const getAdmin = async () => {
  const data = await getRequest('../models/SubscriberModel');
  const admin = data;
  const adminTable = document.querySelector('.admin-table');
  //create output string for html
  let output = '';
  admin.forEach(function (admin) {
    output += `
    <table class="admin-table">
    <tr>
      <th>#${admin.#}</th>
      <th>Name${admin.Name}</th>
      <th>Email${drink.Email}</th>
    </tr>
  </table>`;
  
    admin.innerHTML = output;
  });
};

getAdmin();