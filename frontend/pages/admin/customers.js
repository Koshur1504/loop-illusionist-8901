let tableBody = document.getElementById("tablebody");
let paginationWrapper = document.getElementById("pagination-wrapper");
// let customersUrl = "https://loop-illusionist-8901.onrender.com/users";
const isDevelopment = window.location.hostname.includes("127.0.0.1");
let customersUrl = isDevelopment
  ? "http://127.0.0.1:4000/users"
  : "https://loop-illusionist-8901.onrender.com/users";

async function fetchData(customersUrl, queryParams = "") { 
    try {
        let res = await fetch(`${customersUrl}&${queryParams}`);
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
fetchData(`${customersUrl}?_page=1&_limit=20`);

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
            fetchData(`${customersUrl}?_page=${currentPage}&_limit=${limit}`, queryParams);
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
            fetchData(`${customersUrl}?_page=${currentPage}&_limit=${limit}`, queryParams);
        }
    });

    paginationWrapper.append(prevBtn, currPageBtn, nextBtn,);
}

function appendData(item) {
    tableBody.innerHTML = "";
    let count = 0;
    item.forEach(ele => {
        let row = document.createElement("tr");

        let customer_id = document.createElement("td");
        customer_id.innerHTML = ele.id;

        let customer_name = document.createElement("td");
        customer_name.innerHTML = ele.name;

        let email = document.createElement("td");
        email.innerHTML = ele.email;

        let address = document.createElement("td");
        address.innerHTML = ele.address.address_line;

        let city = document.createElement("td");
        city.innerHTML = ele.address.city;

        let state = document.createElement("td");
        state.innerHTML = ele.address.state;

        let postcode = document.createElement("td");
        postcode.innerHTML = ele.address.postcode;

        let country = document.createElement("td");
        country.innerHTML = ele.address.country;
        
        let mobile = document.createElement("td");
        mobile.innerHTML = ele.Phone;
        
        row.append(customer_id,customer_name,email,address,city,state,postcode,country, mobile);

        tableBody.append(row);
    });
}

//Search
let searchByButton = document.getElementById("searchButton");

searchByButton.addEventListener("click", () => {
    let input = document.getElementById("textbox").value;

    if (input === "") {
        fetchData(`${customersUrl}?_page=1&_limit=20`);
    } else {
        fetchData(`${customersUrl}?name_like=${input}&_page=1&_limit=20`);
    }
});

async function Totaldata(){
    try{
        let res = await fetch(customersUrl);
        let data = await res.json();
        let total = document.getElementById("totalcustomers");
        total.innerText=data.length;
    }
    catch(error){
        console.log(error);
    }
}

