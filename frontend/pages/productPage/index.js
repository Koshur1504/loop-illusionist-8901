// product data 
let details = document.querySelectorAll(".details")
let three_details = document.querySelectorAll(".three-details")
// let product_image=document.querySelector(".product-image")

let products = [

    { id: 1, image: "https://is4.fwrdassets.com/images/p/ip2/pl2/TERX-WY497_V1.jpg", name: 'THE ROW', title: 'The Row Joe Backpack in Espresso', price: '165,411.98' },
    { id: 2, image: "https://is4.fwrdassets.com/images/p/ip2/pl2/TERX-WY485_V1.jpg", name: 'THE ROW', title: 'The Row Joe Backpack in Espresso', price: '165,411.98' },
    { id: 3, image: "https://is4.fwrdassets.com/images/p/ip2/pl2/TERX-WY490_V1.jpg", name: 'THE ROW', title: 'The Row Joe Backpack in Espresso', price: '165,411.98' },
    { id: 4, image: "https://is4.fwrdassets.com/images/p/ip2/pl2/TERX-WY492_V1.jpg", name: 'THE ROW', title: 'The Row Joe Backpack in Espresso', price: '165,411.98' },
    { id: 5, image: "https://is4.fwrdassets.com/images/p/ip2/pl2/TERX-WY462_V1.jpg", name: 'THE ROW', title: 'The Row Joe Backpack in Espresso', price: '165,411.98' },
];

function rainderItems() {
    product_image.setAttribute("src", products.image)
    three_details.forEach(item => {

        item.addEventListener("click", (e) => {

            handelActive(e);
        })
    })
    details[0].style.display = "block"
    three_details[0].classList.add("visible")
}
function handelActive(e) {

    three_details.forEach(item => {
        item.classList.remove("visible")
    })
    e.target.classList.add("visible")
}
// let productID = JSON.parse(localStorage.getItem("product")) || 1;
// let baseurl = `https://loop-illusionist-8901.onrender.com/products/${productID}`;
// async function getdata() {
//   try {
//     let data = await fetch(`${baseurl}`);
//     products = await data.json();
//     rainderItems();
//     console.log(products);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getdata();

// // Function to display products on the page
// function displayProducts() {
//     const productContainer = document.getElementById('product-container');
//     // Clear existing content in the container
//     productContainer.innerHTML = '';

//     // Loop through each product and create a product card
//     products.forEach(product => {
//         const productCard = document.createElement('div');
//         productCard.className = 'product-card';
//         productCard.style.border = "none";
//         productCard.style.marginLeft = "0px";
//         productCard.innerHTML = `
//         <img src="${product.image}"/>
//             <p>${product.name}</p>
//             <p>${product.title}</p>
//             <p>${product.price}</p>
//         `;

//         // Add the product card to the container
//         productContainer.appendChild(productCard);
//     });

// }

// displayProducts();

////viewed



// function displayProductsView() {
//     const productContainerviewed = document.getElementById('product-viewed');
//     // Clear existing content in the container

//     productContainerviewed.innerHTML = '';

//     // Loop through each product and create a product card
//     products.forEach(product => {
//         const productCard = document.createElement('div');
//         productCard.className = 'product-card';
//         // productCard.style.border = "none";
//         // productCard.style.marginLeft = "0px";

//         productCard.innerHTML = `
//         <img src="${product.image}"/>
//             <p>${product.name}</p>
//             <p>${product.title}</p>
//             <p>${product.price}</p>
//         `;

//         // Add the product card to the container

//         productContainerviewed.appendChild(productCard);
//     });
// }
// displayProductsView();

//

var expanded = false;

function toggleContent() {
    var content = document.getElementById('content');
    var viewToggleBtn = document.getElementById('viewToggleBtn');

    if (!expanded) {
        content.style.maxHeight = '100%';
        viewToggleBtn.textContent = 'View Less';
    } else {
        content.style.maxHeight = '600px';
        viewToggleBtn.textContent = 'View More';
    }
    expanded = !expanded;

}
viewToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
})


/////

var links = document.querySelectorAll('a');

links.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior
        var detailsId = link.getAttribute('data-details');
        showDetails(detailsId);
    });
});

function showDetails(detailsId) {
    // Hide all details divs
    var allDetails = document.querySelectorAll('.details');
    allDetails.forEach(function (details) {
        details.style.display = 'none';
    });

    // Show the selected details div
    var selectedDetails = document.getElementById(detailsId);
    selectedDetails.style.display = 'block';
}


