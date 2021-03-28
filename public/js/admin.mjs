import getRequest from '/js/get-json.mjs';

const getAdmin = async () => {
  const data = await getRequest('/api/v0/subscribers');
  const admin = data;
  const adminTable = document.querySelector('.admin-table');
  //create output string for html
  let output = '';
  for (let i = 0; i < admin.length; i++) {
    output += `
    <tr>
      <td>${i}</td>
      <td>${admin[i].name}</td>
      <td>${admin[i].email}</td>
    </tr>`;
  }
  adminTable.innerHTML += output;
};

getAdmin();
