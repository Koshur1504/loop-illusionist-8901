const isDevelopment = window.location.hostname.includes("127.0.0.1");

let baseURL = isDevelopment
  ? "http://127.0.0.1:5500/frontend"
  : "https://loop-illusionist-8901.vercel.app";

let apiBaseURL = "https://loop-illusionist-8901.onrender.com";

console.log(isDevelopment);

let cat_links = document.querySelectorAll(".dropdownnav > ul > li > a");
let productcardSection = document.querySelector(".productcardSection");
let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
let user = JSON.parse(localStorage.getItem("user"));

let page = 1;
let limit = 10;
let products = [];
let params = new URL(document.location).searchParams;
let paramGender = params.get("gender");
let paramCategory = params.get("category") || "clothing";
let basicFilter = `&gender=${paramGender}&category=${paramCategory}`;
let menNav = document.querySelector(".men-nav");
let womenNav = document.querySelector(".women-nav");
let menlink = document.querySelector(".menlink");
let womenlink = document.querySelectorAll(".womenlink");

paramGender == "male" ? womenNav.remove() : menNav.remove();
let cartElement =
  paramGender == "male"
    ? document.querySelector(".mybag > .bag")
    : document.querySelector(".mybag1 > .bag1");
let wishListElement =
  paramGender == "male"
    ? document.querySelector(".wishtlist > .wish")
    : document.querySelector(".wishtlist1 > .wish1");

paramGender == "female"
  ? womenlink[1].classList.add("active")
  : menlink.classList.add("active");
function appendLinks() {
  cat_links.forEach((item) => {
    let arr = ["BEAUTY", "SHOPS", "KENDELL'S EDITS"];
    if (paramGender == "male") {
      arr.includes(item.innerText) && item.parentNode.remove();
      // console.log(item.innerText);
    }
  });
  // categories links
  cat_links.forEach((item) => {
    let endPoint = item.innerHTML.toLocaleLowerCase();
    let arr = ["clothing", "shoes", "bags", "accessories", "beauty"];
    if (!arr.includes(endPoint)) {
      endPoint = "clothing";
    }
    let url = `${baseURL}/pages/categories/categories.html?gender=${paramGender}&category=${endPoint}`;
    item.setAttribute("href", url);
  });

  // wishList link
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

// get wishList

function wishlistValues() {
  wishListElement.innerText = `Wish List (${wishList.length})`;
}

wishlistValues();

function renderCards() {
  productcardSection.innerHTML = "";
  products.forEach((item) => {
    productcardSection.append(createCard(item));
  });
}

function createCard(item) {
  let card = document.createElement("div");
  card.addEventListener("click", () => {
    window.location.href = `${baseURL}/pages/productPage/index.html?id=${item.id}`;
  });
  card.classList.add("card");
  let heartbox = document.createElement("div");
  heartbox.classList.add("heartbox");
  heartbox.addEventListener("click", (e) => {
    e.stopPropagation();
    handleHeart(item);
  });
  heartbox.innerHTML = `<span class="material-symbols-outlined heart">
  favorite
  </span>`;
  let img = document.createElement("img");
  img.classList.add("card-image");
  img.src = item.image;
  img.alt = item.title;
  // card.innerHTML += `<img class="card-image" src=${item.image} alt="Card Image">
  let cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  cardContent.innerHTML = `  <div class="card-title cardheading">${item.brand}</div>
  <p class="card-description cardpara">${item.title}</p>
  <p class="card-description  cardpara">₹${item.price}</p>`;
  card.append(heartbox, img, cardContent);
  return card;
}
function handleHeart(item) {
  addToWishlist(item);
}

// add to wishlist
function addToWishlist(item) {
  if (!hasItem(wishList, item.id)) {
    wishList = [item, ...wishList];
    localStorage.setItem("wishList", JSON.stringify(wishList));
  } else {
    alert("item already in wishList");
  }

  function hasItem(arr, id) {
    for (const item of arr) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }
  wishlistValues();
}

async function getData(filterParams) {
  // console.log(filterParams);
  try {
    let data = await fetch(
      `${apiBaseURL}/products?_page=${page}&_limit=${limit}${filterParams}`,
    );
    let res = await data.json();
    products = res;
    // console.log(res);
    renderCards();
  } catch (error) {
    console.log(error);
  }
}

getData(basicFilter);

let signin = document.querySelector(".signinpage");

let signInContainer = document.querySelector(".shiplist");
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
