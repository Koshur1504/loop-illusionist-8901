let prices = document.querySelector(".price2 > p:nth-of-type(1)");
let shipping = document.querySelector(".price2 > p:nth-of-type(2)");
let total = document.querySelector(".price2 > p:nth-of-type(3)");
let cartDiv = document.querySelector("#cartDiv");
let items = document.querySelector("#box ~ p");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const isDevelopment = window.location.hostname.includes("127.0.0.1");
let baseURL = isDevelopment
  ? "http://127.0.0.1:4000"
  : "https://loop-illusionist-8901.onrender.com";

function getTotal() {
  return cart.reduce((prev, cur) => {
    let quant = cur.quantity;
    let price = cur.price;
    return (prev += quant * price);
  }, 0);
}

if (cart.length == 0) {
  prices.innerText = `₹0`;
  shipping.innerText = `₹0`;
  total.innerText = `₹0`;
} else {
  prices.innerText = `₹${getTotal()}`;
  shipping.innerText = `₹${Math.ceil((getTotal() * 0.6) / 100)}`;
  total.innerText = `₹${getTotal() + Math.ceil((getTotal() * 0.6) / 100)}`;
}

items.innerText = `Items in Your Order (${cart.length})`;

function renderCards() {
  cartDiv.innerHTML = "";
  cart.forEach((item) => {
    cartDiv.append(createCard(item));
  });
}

function createCard(item) {
  let card = document.createElement("div");
  card.classList.add("pro_image");
  card.innerHTML = `<div class="img1">
  <img
    src=${item.image}
    alt=""
  />
</div>
<div class="text1">
  <span style="font-size: 14px; font-weight: 550">${item.brand}</span>
  <p>
    ${item.title} <br />
    Color: Syram Red & Chianti <br />
    Size: ONE SIZE / Quantity: ${item.quantity} <br />
    ₹${item.price} <br />
  </p>
  <p>
    <span style="font-size: 14px; font-weight: 550">Preorder:</span>
    Expected to be In-Stock: <br />
    May 30 - Jun 09
  </p>
</div>`;
  return card;
}

renderCards();
