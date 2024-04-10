let details = document.querySelectorAll(".details");
let three_details = document.querySelectorAll(".three-details");
let cartElement = document.querySelector(".mybag > .bag");
let wishListElement = document.querySelector(".wishtlist > .wish");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
let products = [];

const isDevelopment = window.location.hostname.includes("127.0.0.1");

let depURL = isDevelopment
  ? "http://127.0.0.1:5500/frontend"
  : "https://loop-illusionist-8901.vercel.app";

let params = new URL(document.location).searchParams;
let paramID = params.get("id");
let baseURL = isDevelopment
  ? "http://127.0.0.1:4000/products"
  : "https://loop-illusionist-8901.onrender.com";
function rainderItems() {
  product_image.setAttribute("src", products.image);
  three_details.forEach((item) => {
    item.addEventListener("click", (e) => {
      handelActive(e);
    });
  });
  details[0].style.display = "block";
  three_details[0].classList.add("visible");
}
function handelActive(e) {
  three_details.forEach((item) => {
    item.classList.remove("visible");
  });
  e.target.classList.add("visible");
}

var expanded = false;

function toggleContent() {
  var content = document.getElementById("content");
  var viewToggleBtn = document.getElementById("viewToggleBtn");

  if (!expanded) {
    content.style.maxHeight = "100%";
    viewToggleBtn.textContent = "View Less";
  } else {
    content.style.maxHeight = "600px";
    viewToggleBtn.textContent = "View More";
  }
  expanded = !expanded;
}
// viewToggleBtn.addEventListener("click", (e) => {
//   e.preventDefault();
// });

/////

var links = document.querySelectorAll("a");

// links.forEach(function (link) {
//   link.addEventListener("click", function (event) {
//     event.preventDefault(); // Prevent the default link behavior
//     var detailsId = link.getAttribute("data-details");
//     showDetails(detailsId);
//   });
// });

function showDetails(detailsId) {
  // Hide all details divs
  var allDetails = document.querySelectorAll(".details");
  allDetails.forEach(function (details) {
    details.style.display = "none";
  });

  // Show the selected details div
  var selectedDetails = document.getElementById(detailsId);
  selectedDetails.style.display = "block";
}

let product = {
  id: 1,
  title: "favorite Strapless Bill Pickleball Dress",
  original_src:
    "https://www.fwrd.com/product-norma-kamali-strapless-bill-pickleball-dress-in-black-snow-white/NOMF-WD478/?d=Womens&itrownum=1&itcurrpage=1&itview=05",
  image: "https://is4.fwrdassets.com/images/p/fw/p/NOMF-WD478_V1.jpg",
  brand: "Norma Kamali",
  description: "Strapless Bill Pickleball Dress",
  price: 32833,
  price_sale: null,
  gender: "female",
  category: "clothing",
};

let productID = paramID || 1;
async function getProduct() {
  try {
    let url = `${baseURL}/${productID}`;
    let data = await fetch(url);
    product = await data.json();
    setProductsDetails();
  } catch (error) {
    console.log(error);
  }
}
getProduct();

let car1 = document.querySelectorAll("#car1 > div > img");

function setProductsDetails() {
  car1.forEach((item) => {
    item.src = product.image;
  });
  document.querySelector(".v-container2 .brand").innerHTML = product.brand;
  document.querySelector(".v-container2 .title").innerHTML = product.title;
  document.querySelector(".v-container2 .price").innerHTML = product.price;
  document.querySelector(".v-container2 .price").innerHTML =
    `₹${product.price}`;
}

function creatCard(item) {
  let card = document.createElement("div");
  card.addEventListener("click", () => {
    let id = item.id;
    window.location.href = `${depURL}/pages/productPage/index.html?id=${id}`;
  });
  card.classList.add("card");
  card.style.width = "16rem";
  card.innerHTML = `<img
  src=${item.image}
  class="card-img-top"
  alt=${item.description}
/>
<div class="card-body">
  <h6 class="card-title">${item.brand}</h6>
  <p class="card-text">${item.title}</p>
  <p class="card-text">₹${item.price}</p>
</div>`;
  return card;
}

// mayLike
let mayLike = [];

async function getMaylike() {
  let gender = product.gender;
  let low = Math.ceil(Math.random() * 100);
  let data = await fetch(`${baseURL}?gender=${gender}&_start=${low}&_limit=10`);
  mayLike = await data.json();
  appendmayLikeCards();
}
function appendmayLikeCards() {
  let container = document.getElementById("content");
  container.innerHTML = "";
  mayLike.forEach((item) => {
    container.append(creatCard(item));
  });
}
getMaylike();

// recently viewed
let recently = [];

async function getRecently() {
  let gender = product.gender;
  let low = Math.ceil(Math.random() * 100);
  let data = await fetch(`${baseURL}?gender=${gender}&_start=${low}&_limit=10`);
  recently = await data.json();
  appendrecentLiked();
}
function appendrecentLiked() {
  let container = document.getElementById("rcv");
  container.innerHTML = "";
  recently.forEach((item) => {
    container.append(creatCard(item));
  });
}
getRecently();

// cart

document.querySelector("#cartButton").addEventListener("click", addToCart);
document
  .querySelector(".btn-outline-dark")
  .addEventListener("click", addToCart);
function addToCart() {
  product.quantity = 1;
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartValues();
}

// wishList
function hasItem(arr, id) {
  for (const item of arr) {
    if (item.id === id) {
      return true;
    }
  }
  return false;
}

document.querySelector("#wishlist").addEventListener("click", addToWishlist);
function addToWishlist() {
  if (!hasItem(wishList, product.id)) {
    wishList = [product, ...wishList];
    localStorage.setItem("wishList", JSON.stringify(wishList));
  } else {
    alert("item already in wishList");
  }
  wishlistValues();
}

// get cart
function cartValues() {
  cartElement.innerText = `My Bag (${cart.length})`;
}

cartValues();

// get wishList

function wishlistValues() {
  wishListElement.innerText = `Wish List (${wishList.length})`;
}

wishlistValues();

cartElement.addEventListener("click", () => {
  window.location.href = `${depURL}/pages/cart/cart.html`;
});

wishListElement.addEventListener("click", () => {
  window.location.href = `${depURL}/pages/wishlist/wishlist.html`;
});

let user = JSON.parse(localStorage.getItem("user"));
let signin = document.querySelector(".signin");
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
      adminButton.innerHTML = `<a">${user.name}</a>`;
      signInContainer.append(adminButton);
    }
  }
}

checkUser();
