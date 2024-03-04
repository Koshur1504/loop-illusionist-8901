let user = JSON.parse(localStorage.getItem("user"));
let signin = document.querySelector(".signin");
let signInContainer = document.querySelector(".shiipinglist");
function checkUser() {
  if (user) {
    signin.remove();
    if (user.role == "admin") {
      let adminButton = document.createElement("li");
      adminButton.classList.add("signin");
      adminButton.innerHTML = `<a href="..//admin/admin.html">Admin Panel</a>`;
      signInContainer.append(adminButton);
    } else {
      let adminButton = document.createElement("li");
      adminButton.classList.add("signin");
      adminButton.innerHTML = `<a">${user.name}</a>`;
      signInContainer.append(adminButton);
    }
  }
}

checkUser();