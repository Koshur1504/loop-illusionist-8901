const isDevelopment = window.location.hostname.includes("127.0.0.1");
let baseURL = isDevelopment
  ? "http://127.0.0.1:5500/frontend"
  : "https://loop-illusionist-8901-1.onrender.com/";

let cat_links = document.querySelectorAll("#cat_links > ul > li > a");
let cards = document.querySelectorAll(".productimg1 > divs");
function appendLinks() {
  cat_links.forEach((item) => {
    let endPoint = item.innerHTML.toLocaleLowerCase();
    let url = `${baseURL}/pages/Login/login.html?category=${endPoint}`;
    item.setAttribute("href", url);
  });
  cards.forEach(item => {
    
  });
}
appendLinks();
