fetch("/api/v0/subscribers")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("This is an error");
    }
    return response.json();
  })
  .then(function (data) {
    const subs = data;
    const card = document.querySelector(".form");
    //create output string for html
    let output='';
    data.forEach(function(input){
      output += `
      <form action="/subscribe" method="POST">
      <label for="name">
        <input type="text" ${input.type} name="name" id="name"  required ${input.required}/>
        <span class="placeholder">${input.name}Enter Name</span>
      </label>
      <label for="email">
        <input type="email" ${input.type} name="email" id="email" required ${input.required} />
        <span class="placeholder">Enter Email ${input.email}</span>
      </label>
      <button class="form-btn" type="submit">Subscribe</button>
    </form> `;
  
      document.querySelector('.form').innerHTML= output;
  });

})
.catch(function (error) {
  console.log(error);
});