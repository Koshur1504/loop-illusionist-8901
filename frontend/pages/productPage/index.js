let details = document.querySelectorAll(".details");
let three_details = document.querySelectorAll(".three-details");
let products = [];

let depURL = "http://127.0.0.1:5500/frontend/pages/productPage/index.html";

let params = new URL(document.location).searchParams;
let paramID = params.get("id");
function rainderItems() {
  product_image.setAttribute("src", products.image);
  three_details.forEach((item) => {
    item.addEventListener("click", (e) => {
      handelActive(e);
    });
  });
  details[0].style.display = "block";
  three_details[0].classList.add("visible");
  console.log(car1);
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
viewToggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

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
let baseURL = "https://loop-illusionist-8901.onrender.com/products";
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
  document.querySelector(".v-container2 .price").innerHTML = product.price;
}

function creatCard(item) {
  let card = document.createElement("div");
  card.addEventListener("click", () => {
    let id = item.id;
    window.location.replace(`${depURL}?id=${id}`);
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
let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelector("#cartButton").addEventListener("click", addToCart);
function addToCart() {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// wishlist
function hasItem(arr, id) {
  for (const item of arr) {
    if (item.id === id) {
      return true;
    }
  }
  return false;
}
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
document.querySelector("#wishlist").addEventListener("click", addToWishlist);
function addToWishlist() {
  if (!hasItem(wishlist, product.id)) {
    wishlist = [product, ...wishlist];
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  } else {
    alert("item already in wishlist");
  }
}
