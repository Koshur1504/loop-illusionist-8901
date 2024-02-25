let tableBody = document.getElementById("tablebody");
let paginationWrapper = document.getElementById("pagination-wrapper");
let productsUrl = "https://loop-illusionist-8901.onrender.com/products";

async function fetchData(productsUrl, queryParams = "") {
    
    try {
        let res = await fetch(`${productsUrl}&${queryParams}`);
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
fetchData(`${productsUrl}?_page=1&_limit=20`);

function appendData(item) {
    tableBody.innerHTML = "";
    item.forEach(ele => {
        let row = document.createElement("tr");

        let id = document.createElement("td");
        id.innerHTML = ele.id;

        let title = document.createElement("td");
        title.innerHTML = ele.title;

        let image = document.createElement("td");
        let img = document.createElement("img");
        img.src = ele.image;
        img.style.width = "100px";
        image.append(img);

        let brand = document.createElement("td");
        brand.innerHTML = ele.brand;

        let description = document.createElement("td");
        description.innerHTML = ele.description;

        let price = document.createElement("td");
        price.innerHTML = `₹${ele.price}`;

        let gender = document.createElement("td");
        gender.innerHTML = ele.gender;

        let category = document.createElement("td");
        category.innerHTML = ele.category;

        let viewTd = document.createElement("td");
        let viewBtn = document.createElement("i");
        viewBtn.classList.add("fa-solid", "fa-eye");
        viewBtn.style.color = "green";
        viewBtn.style.cursor = "pointer";
        viewTd.append(viewBtn);
        viewBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.open(ele.original_src, '_blank');
        });

        let editTd = document.createElement("td");
        let editBtn = document.createElement("a");
        editBtn.innerHTML = "Edit";
        editBtn.style.color = "blue"
        editBtn.style.cursor = "pointer";
        editTd.append(editBtn);
        editBtn.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById('id').value = ele.id;
            document.getElementById('title').value = ele.title;
            document.getElementById('original_src').value = ele.original_src;
            document.getElementById('image').value = ele.image;
            document.getElementById('brand').value = ele.brand;
            document.getElementById('description').value = ele.description;
            document.getElementById('price').value = ele.price;
            document.getElementById('price_sale').value = ele.price_sale;
            document.getElementById('gender').value = ele.gender;
            document.getElementById('category').value = ele.category;
        });

        let deleteTd = document.createElement("td");
        let deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fa-solid", "fa-trash-can");
        deleteBtn.style.color = "red";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            DeleteProduct(ele.id)
        });
        deleteTd.append(deleteBtn);

        row.append(id, title, image, brand, description, price, gender, category, viewTd, editTd, deleteTd);
        tableBody.append(row);
    });
}

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
            fetchData(`${productsUrl}?_page=${currentPage}&_limit=${limit}`, queryParams);
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
            fetchData(`${productsUrl}?_page=${currentPage}&_limit=${limit}`, queryParams);
        }
    });

    paginationWrapper.append(prevBtn, currPageBtn, nextBtn,);
}

async function AddProduct() {
    try {
        const productData = {
            title: document.getElementById('title').value,
            original_src: document.getElementById('original_src').value,
            image: document.getElementById('image').value,
            brand: document.getElementById('brand').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            price_sale: document.getElementById('price_sale').value,
            gender: document.getElementById('gender').value,
            category: document.getElementById('category').value
        };

        let res = await fetch(productsUrl, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(productData),
        });
        let data = await res.json();
        console.log(data);

        alert("Product added Successfully !!!");

        document.getElementById('id').value = '';
        document.getElementById('title').value = '';
        document.getElementById('original_src').value = '';
        document.getElementById('image').value = '';
        document.getElementById('brand').value = '';
        document.getElementById('description').value = '';
        document.getElementById('price').value = '';
        document.getElementById('price_sale').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('category').value = '';

        fetchData(`${productsUrl}?_page=1&_limit=20`);
    }
    catch (error) {
        console.log(error);
    }
}

let addProductBtn = document.getElementById("addProductBtn");
addProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    AddProduct();
})

async function updateProduct(id) {
    try {
        const productData = {
            title: document.getElementById('title').value,
            original_src: document.getElementById('original_src').value,
            image: document.getElementById('image').value,
            brand: document.getElementById('brand').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            price_sale: document.getElementById('price_sale').value,
            gender: document.getElementById('gender').value,
            category: document.getElementById('category').value
        };
        let res = await fetch(`${productsUrl}/${id}`, {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(productData)
        });
        document.getElementById('id').value = '';
        document.getElementById('title').value = '';
        document.getElementById('original_src').value = '';
        document.getElementById('image').value = '';
        document.getElementById('brand').value = '';
        document.getElementById('description').value = '';
        document.getElementById('price').value = '';
        document.getElementById('price_sale').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('category').value = '';
        // let data = await res.json();
        fetchData(`${productsUrl}?_page=1&_limit=20`);
    }
    catch (error) {
        console.log(error);
    }
}

let updateProductBtn = document.getElementById("updateProductBtn");
updateProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let id = document.getElementById('id').value;
    updateProduct(id);
})

async function DeleteProduct(id) {
    try {
        let res = await fetch(`${productsUrl}/${id}`, {
            method: "DELETE",
        });
        fetchData(`${productsUrl}?_page=1&_limit=20`);
    }
    catch (error) {
        console.log(error);
    }
}

let sortDropdown = document.getElementById("sortbyprice");
    sortDropdown.addEventListener("change", () => {
        let selectedOption = sortDropdown.value;

        if (selectedOption === "HighToLow") {
            fetchData(`${productsUrl}?_page=1&_limit=20&_sort=price&_order=desc`);
        } else if (selectedOption === "LowToHigh") {
            fetchData(`${productsUrl}?_page=1&_limit=20&_sort=price&_order=asc`);
        }
        else{
            fetchData(`${productsUrl}?_page=1&_limit=20`);
        }
});

let filterData = document.getElementById("filtering");
    filterData.addEventListener("change", () => {
        let selectedOption = filterData.value;

        if (selectedOption === "byMale") {
            fetchData(`${productsUrl}?_page=1&_limit=20`, "gender=male");
        } 
        else if (selectedOption === "byFemale") {
            fetchData(`${productsUrl}?_page=1&_limit=20`, "gender=female");
        } 
        else if (selectedOption === "Clothing") {
            fetchData(`${productsUrl}?_page=1&_limit=20`, "category=clothing");
        } 
        else if (selectedOption === "Shoes") {
            fetchData(`${productsUrl}?_page=1&_limit=20`, "category=shoes");
        }
        else if (selectedOption === "Bags") {
            fetchData(`${productsUrl}?_page=1&_limit=20`, "category=bags");
        }
        else if (selectedOption === "Beauty") {
            fetchData(`${productsUrl}?_page=1&_limit=20`, "category=beauty");
        }
        else if (selectedOption === "Accessories") {
            fetchData(`${productsUrl}?_page=1&_limit=20`, "category=accessories");
        }
        else {
            fetchData(`${productsUrl}?_page=1&_limit=20`);
        }
    });
    
//Search
let searchByButton = document.getElementById("searchButton");

searchByButton.addEventListener("click", () => {
    let input = document.getElementById("textbox").value;

    if (input === "") {
        fetchData(`${productsUrl}?_page=1&_limit=20`);
    } else {
        fetchData(`${productsUrl}?title_like=${input}&_page=1&_limit=20`);
    }
});

async function Totaldata(){
    try{
        let res = await fetch("https://loop-illusionist-8901.onrender.com/products");
        let data = await res.json();
        let total = document.getElementById("totalproducts");
        total.innerText=data.length;
    }
    catch(error){
        console.log(error);
    }
}
