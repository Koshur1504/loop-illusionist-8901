let tableBody = document.getElementById("tablebody");
let paginationWrapper = document.getElementById("pagination-wrapper");
// let ordersUrl = "https://loop-illusionist-8901.onrender.com/orders";
const isDevelopment = window.location.hostname.includes("127.0.0.1");
let ordersUrl = isDevelopment
  ? "http://127.0.0.1:4000/orders"
  : "https://loop-illusionist-8901.onrender.com/orders";

async function fetchData(ordersUrl, queryParams = "") { 
    try {
        let res = await fetch(`${ordersUrl}&${queryParams}`);
        let TotalData = res.headers.get("X-Total-Count");
        let limit = 20;
        let TotalPages = Math.ceil(TotalData / limit);
        pagination(TotalPages, limit, queryParams);
        let data = await res.json();
        appendData(data);
        Totaldata();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData(`${ordersUrl}?_page=1&_limit=20`);

let currentPage = 1;
function pagination(TotalPages, limit, queryParams) {
    paginationWrapper.innerHTML = "";

    // Previous Button
    let prevBtn = document.createElement("button");
    prevBtn.classList.add("PageBtn");
    let prev = document.createElement("i");
    prev.classList.add("fa-solid", "fa-backward");
    prevBtn.append(prev);
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchData(`${ordersUrl}?_page=${currentPage}&_limit=${limit}`, queryParams);
        }
    });

    // Current Page Button
    let currPageBtn = document.createElement("button");
    currPageBtn.classList.add("PageBtn");
    currPageBtn.innerText = currentPage;

    // Next Button
    let nextBtn = document.createElement("button");
    nextBtn.classList.add("PageBtn");
    let next = document.createElement("i");
    next.classList.add("fa-solid", "fa-forward");
    nextBtn.append(next);
    nextBtn.addEventListener("click", () => {
        if (currentPage < TotalPages) {
            currentPage++;
            fetchData(`${ordersUrl}?_page=${currentPage}&_limit=${limit}`, queryParams);
        }
    });

    paginationWrapper.append(prevBtn, currPageBtn, nextBtn,);
}

function appendData(item) {
    tableBody.innerHTML = "";
    item.forEach(ele => {
        let row = document.createElement("tr");

        let id = document.createElement("td");
        id.innerHTML = ele.order_id;

        let customer_id = document.createElement("td");
        customer_id.innerHTML = ele.customer_id;

        let customer_name = document.createElement("td");
        customer_name.innerHTML = ele.customer_name;

        let items = document.createElement("td");
        items.style.padding=0;
        let nestedTable = document.createElement("table");
        nestedTable.style.width = "100%"; 
        nestedTable.style.border = "none";
        nestedTable.style.borderCollapse = "collapse";
        //Headers for nested table
        let headersRow = document.createElement("tr");
        let productNameHeader = document.createElement("th");
        productNameHeader.innerHTML = "Product Name";
        let quantityHeader = document.createElement("th");
        quantityHeader.innerHTML = "Quantity";
        let priceHeader = document.createElement("th");
        priceHeader.innerHTML = "Price";

        headersRow.append(productNameHeader, quantityHeader, priceHeader);
        nestedTable.append(headersRow);

        ele.items.forEach(item => {
            let itemRow = document.createElement("tr");
            let productNameCell = document.createElement("td");
            productNameCell.innerHTML = item.product_name;
            productNameCell.style.width="60%";

            let quantityCell = document.createElement("td");
            quantityCell.innerHTML = item.quantity;
            quantityCell.style.width="30%";

            let priceCell = document.createElement("td");
            priceCell.innerHTML = `₹${item.price}`;
            priceCell.style.width="30%";

            itemRow.append(productNameCell, quantityCell, priceCell);
            nestedTable.append(itemRow);
        });

        items.append(nestedTable);

        let Totalamount = document.createElement("td");
        Totalamount.innerHTML = `₹${ele.total_amount}`;

        let shipping_address = document.createElement("td");
        shipping_address.innerHTML = ele.shipping_address;

        let payment_method = document.createElement("td");
        payment_method.innerHTML = ele.payment_method;

        let payment_status = document.createElement("td");
        payment_status.innerHTML = ele.payment_status;
        if(payment_status.innerHTML=="Paid"){
            payment_status.style.color="#369023";
        }
        else if(payment_status.innerHTML=="Un-paid"){
            payment_status.style.color="red";
        }
        let expected_delivery_date = document.createElement("td");
        expected_delivery_date.innerHTML = ele.expected_delivery_date;

        let status = document.createElement("td");
        status.innerHTML = ele.status;
        if(status.innerHTML=="Pending"){
            status.style.color="#fff30f";
        }
        else if(status.innerHTML=="Processing"){
            status.style.color="#ffa20f";
        }
        else if(status.innerHTML=="Dispatched"){
            status.style.color="#acff1f";
        }
        else if(status.innerHTML=="Delivered"){
            status.style.color="#369023";
        }
        else if(status.innerHTML=="Canceled"){
            status.style.color="red";
        }
        else if(status.innerHTML=="Returned"){
            status.style.color="brown";
        }
        else if(status.innerHTML=="Refunded"){
            status.style.color="violet";
        }
        row.append(id, expected_delivery_date, items, customer_id, customer_name,  shipping_address,Totalamount, payment_method, payment_status, status);
        tableBody.append(row);
    });
}

let sortDropdown = document.getElementById("sortbyprice");
    sortDropdown.addEventListener("change", () => {
        let selectedOption = sortDropdown.value;

        if (selectedOption === "newToOld") {
            fetchData(`${productsUrl}?_page=1&_limit=20&_sort=expected_delivery_date&_order=asc`);
        } else if (selectedOption === "oldToNew") {
            fetchData(`${productsUrl}?_page=1&_limit=20&_sort=expected_delivery_date&_order=desc`);
        }
        else{
            fetchData(`${productsUrl}?_page=1&_limit=20`);
        }
});

let filterData = document.getElementById("filtering");
    filterData.addEventListener("change", () => {
        let selectedOption = filterData.value;
        console.log(selectedOption);
        if (selectedOption === "paid") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "payment_status=Paid");
        } 
        else if (selectedOption === "Un-paid") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "payment_status=Un-paid");
        } 
        else if (selectedOption === "pending") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "status=Pending");
        } 
        else if (selectedOption === "processing") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "status=Processing");
        } 
        else if (selectedOption === "dispatched") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "status=Dispatched");
        } 
        else if (selectedOption === "delivered") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "status=Delivered");
        }
        else if (selectedOption === "canceled") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "status=Canceled");
        }
        else if (selectedOption === "returned") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "status=Returned");
        }
        else if (selectedOption === "refunded") {
            fetchData(`${ordersUrl}?_page=1&_limit=20`, "status=Refunded");
        }
        else {
            fetchData(`${ordersUrl}?_page=1&_limit=20`);
        }
    });
    
//Search
let searchByButton = document.getElementById("searchButton");

searchByButton.addEventListener("click", () => {
    let input = document.getElementById("textbox").value;

    if (input === "") {
        fetchData(`${ordersUrl}?_page=1&_limit=20`);
    } else {
        fetchData(`${ordersUrl}?customer_name_like=${input}&_page=1&_limit=20`) || 
        fetchData(`${ordersUrl}?customer_id_like=${input}&_page=1&_limit=20`);
    }
});

async function Totaldata(){
    try{
        let res = await fetch(ordersUrl);
        let data = await res.json();
        let total = document.getElementById("totalorders");
        total.innerText=data.length;
    }
    catch(error){
        console.log(error);
    }
}

