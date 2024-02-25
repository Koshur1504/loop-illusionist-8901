let submit = document.querySelector("#shippingForm");
let fullName = document.querySelector("#fullName");
let selectCountry = document.querySelector("#selectCountry");
let address1 = document.querySelector("#address1");
let address2 = document.querySelector("#address2");
let postcode = document.querySelector("#postcode");
let city = document.querySelector("#city");
let state = document.querySelector("#state");
let phone = document.querySelector("#phone");
let prices = document.querySelector(".price2 > p:nth-of-type(1)");
let shipping = document.querySelector(".price2 > p:nth-of-type(2)");
let total = document.querySelector(".price2 > p:nth-of-type(3)");
let cartDiv = document.querySelector("#cartDiv");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

submit.addEventListener("submit", async (e) => {
  e.preventDefault();
  let obj = {
    name: fullName.value,
    Phone: +phone.value,
    address: {
      address_line: address1.value,
      city: city.value,
      state: state.value,
      postcode: +postcode.value,
      country: selectCountry.value,
    },
  };
  try {
    let data = await fetch(`https://loop-illusionist-8901.onrender.com/users`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let res = await data.json();
    localStorage.setItem("user", JSON.stringify(res));
    window.location.href = "../payment/payment.html";
  } catch (error) {
    console.log(error);
  }
});

function getTotal() {
  return cart.reduce((prev, cur) => {
    let quant = cur.quantity;
    let price = cur.price;
    return (prev += quant * price);
  }, 0);
}

prices.innerText = `₹${getTotal()}`;
shipping.innerText = `₹${Math.ceil((getTotal() * 0.6) / 100)}`;
total.innerText = `₹${getTotal() + Math.ceil((getTotal() * 0.6) / 100)}`;

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
