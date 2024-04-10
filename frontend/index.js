const isDevelopment = window.location.hostname.includes("127.0.0.1");

let baseURL = isDevelopment
  ? "http://127.0.0.1:5500/frontend"
  : "https://loop-illusionist-8901.vercel.app";

let cat_links = document.querySelectorAll("#cat_links > ul > li > a");
let cards = document.querySelectorAll(".productimg1 > divs");
let cards_2 = document.querySelectorAll(".groupimage2");
let cartElement = document.querySelector(".mybag > .bag");
let groupimages1 = document.querySelectorAll(".groupimages1");
let wishListElement = document.querySelector(".wishtlist > .wish");
let signin = document.querySelector(".shiipinglist >.signin");
let signInContainer = document.querySelector(".shiipinglist");

let user = JSON.parse(localStorage.getItem("user"));

function checkUser() {
  if (user) {
    signin.remove();
    if (user.role == "admin") {
      let adminButton = document.createElement("li");
      adminButton.classList.add("signin");
      adminButton.innerHTML = `<a href="pages/admin/admin.html">Admin Panel</a>`;
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
let gender = "female";
function appendLinks() {
  // categories links
  cat_links.forEach((item) => {
    let endPoint = item.innerHTML.toLocaleLowerCase();
    let arr = ["clothing", "shoes", "bags", "accessories", "beauty"];
    if (!arr.includes(endPoint)) {
      endPoint = "clothing";
    }
    let url = `${baseURL}/pages/categories/categories.html?gender=${gender}&category=${endPoint}`;
    item.setAttribute("href", url);
  });

  // card links
  cards.forEach((item) => {});

  // hero  links
  cards_2.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      window.location.href = `${baseURL}/pages/categories/categories.html?gender=${gender}`;
    });
  });

  // subhero links
  groupimages1.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      window.location.href = `${baseURL}/pages/categories/categories.html?gender=${gender}`;
    });
  });

  // wishlist link
  wishListElement.style.cursor = "pointer";
  wishListElement.addEventListener("click", () => {
    window.location.href = `${baseURL}/pages/wishlist/wishlist.html`;
  });

  // cart link
  cartElement.style.cursor = "pointer";

  cartElement.addEventListener("click", () => {
    window.location.href = `${baseURL}/pages/cart/cart.html`;
  });
}

appendLinks();

// get cart
function cartValues() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartElement.innerText = `My Bag (${cart.length})`;
}

cartValues();

// get wishlist

function wishlistValues() {
  let wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishListElement.innerText = `Wish List (${wishList.length})`;
}

wishlistValues();
