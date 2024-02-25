const isDevelopment = window.location.hostname.includes("127.0.0.1");
let baseURL = isDevelopment
  ? "http://127.0.0.1:5500/frontend"
  : "https://loop-illusionist-8901-1.onrender.com";

let cat_links = document.querySelectorAll("#cat_links > ul > li > a");
let cards = document.querySelectorAll(".productimg1 > divs");
let groupimages1 = document.querySelectorAll(".groupimages1");
let gender = "female";
function appendLinks() {
  cat_links.forEach((item) => {
    let endPoint = item.innerHTML.toLocaleLowerCase();
    let arr = ["clothing", "shoes", "bags", "accessories", "beauty"];
    if (!arr.includes(endPoint)) {
      endPoint = "clothing";
    }
    let url = `${baseURL}/pages/categories/categories.html?gender=${gender}&category=${endPoint}`;
    item.setAttribute("href", url);
  });

  groupimages1.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      window.location.href = `${baseURL}/pages/categories/categories.html?gender=${gender}`;
    });
  });
  cards.forEach((item) => {});
}

appendLinks();

// get cart
function cartValues() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartElement = document.querySelector(".mybag > .bag");
  cartElement.innerText = `My Bag (${cart.length})`;
}

cartValues();

// get wishlist

function wishlistValues() {
  let wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cartElement = document.querySelector(".wishtlist > .wish");
  cartElement.innerText = `Wish List (${wishList.length})`;
}

wishlistValues();
