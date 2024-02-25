const isDevelopment = window.location.hostname.includes("127.0.0.1");
let baseURL = isDevelopment
  ? "http://127.0.0.1:5500/frontend"
  : "https://loop-illusionist-8901-1.onrender.com";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
let wish = document.querySelector(".wish");
let cartEl = document.querySelector(".bag");

let cartContainer = document.getElementById("cartContainer");
wish.addEventListener("click", () => {
  window.location.href = `${baseURL}/pages/wishlist/wishlist.html`;
});
function appendData() {
  getCarts();
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    let cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.addEventListener("click", () => {
      window.location.href = `${baseURL}/pages/productPage/index.html?id=${item.id}`;
    });
    let image = document.createElement("div");
    image.className = "imagediv";

    let imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.title;

    image.append(imageElement);

    let content = document.createElement("div");

    let titleElement = document.createElement("h1");
    titleElement.className = "productname";
    titleElement.textContent =
      item.title.charAt(0).toUpperCase() + item.title.slice(1);

    let priceElement = document.createElement("h3");
    priceElement.textContent = `Price: ₹${item.price}`;

    let quantity = document.createElement("h3");
    quantity.textContent = `Quantity: ${item.quantity}`;

    let total = document.createElement("h2");
    total.textContent = `Total: ₹${item.price * item.quantity}`;

    content.append(titleElement, priceElement, quantity, total);

    cartItemDiv.append(image, content);

    cartContainer.append(cartItemDiv);
  });
}

appendData();

function getCarts() {
  wish.innerText = `Wish List (${wishList.length})`;
  cartEl.innerText = `My Bag (${cart.length})`;
}
