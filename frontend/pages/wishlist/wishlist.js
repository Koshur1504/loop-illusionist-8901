const isDevelopment = window.location.hostname.includes("127.0.0.1");
let baseURL = isDevelopment
  ? "http://127.0.0.1:5500/frontend"
  : "https://loop-illusionist-8901.vercel.app";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
let user = JSON.parse(localStorage.getItem("user"));
let wish = document.querySelector(".wish");
let cartEl = document.querySelector(".bag");
let bag = document.querySelector(".bag");
bag.addEventListener("click", () => {
  window.location.href = `${baseURL}/pages/cart/cart.html`;
});

let wishlistContainer = document.getElementById("wishlistContainer");
function appendData() {
  getCarts();
  wishlistContainer.innerHTML = "";
  wishList.forEach((item) => {
    let wishlistItemDiv = document.createElement("div");
    wishlistItemDiv.className = "wishlist-item";
    wishlistItemDiv.addEventListener("click", () => {
      window.location.href = `${baseURL}/pages/productPage/index.html?id=${item.id}`;
    });
    let titleElement = document.createElement("h2");
    titleElement.className = "productname";
    titleElement.textContent =
      item.title.charAt(0).toUpperCase() + item.title.slice(1);

    let image = document.createElement("div");
    image.className = "imagediv";

    let imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.title;

    image.append(imageElement);

    let priceElement = document.createElement("h2");
    priceElement.textContent = `Price: ₹${item.price}`;

    wishlistItemDiv.appendChild(image);
    wishlistItemDiv.appendChild(titleElement);
    wishlistItemDiv.appendChild(priceElement);

    wishlistContainer.appendChild(wishlistItemDiv);
  });
}

appendData();

function getCarts() {
  wish.innerText = `Wish List (${wishList.length})`;
  cartEl.innerText = `My Bag (${cart.length})`;
}

let signin = document.querySelector(".signin");
console.log(signin);
let signInContainer = document.querySelector(".shiipinglist");
function checkUser() {
  if (user) {
    signin.remove();
    if (user.role == "admin") {
      let adminButton = document.createElement("li");
      adminButton.classList.add("signin");
      adminButton.innerHTML = `<a href="../admin/admin.html">Admin Panel</a>`;
      signInContainer.append(adminButton);
    } else {
      let adminButton = document.createElement("li");
      adminButton.classList.add("signin");
      adminButton.innerHTML = `<a>${user.name}</a>`;
      signInContainer.append(adminButton);
    }
  }
}

checkUser();