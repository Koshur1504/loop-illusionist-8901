async function TotalOrders() {
    try {
        let res = await fetch("https://loop-illusionist-8901.onrender.com/orders");
        let data = await res.json();

        countingOrders(data.length, 4, "totalOrders");
    } catch (error) {
        console.log(error);
    }
}

function countingOrders(targetNumber, duration, elementId) {
    const element = document.getElementById(elementId);
    const increment = targetNumber / (duration * 100);
    let currentNumber = 0;

    const intervalId = setInterval(() => {
        currentNumber += increment;

        element.innerText = Math.round(currentNumber);

        if (currentNumber >= targetNumber) {
            clearInterval(intervalId);
            element.innerText = targetNumber;
        }
    }, 0.1);
}
TotalOrders();


async function TotalCustomers() {
    try {
        let res = await fetch("https://loop-illusionist-8901.onrender.com/users");
        let data = await res.json();

        countingCustomers(data.length, 4, "totalCustomers");
    } catch (error) {
        console.log(error);
    }
}

function countingCustomers(targetNumber, duration, elementId) {
    const element = document.getElementById(elementId);
    const increment = targetNumber / (duration * 100);
    let currentNumber = 0;

    const intervalId = setInterval(() => {
        currentNumber += increment;

        element.innerText = Math.round(currentNumber);

        if (currentNumber >= targetNumber) {
            clearInterval(intervalId);
            element.innerText = targetNumber;
        }
    }, 0.1);
}
TotalCustomers();


async function TotalProducts() {
    try {
        let res = await fetch("https://loop-illusionist-8901.onrender.com/products");
        let data = await res.json();

        countingProducts(data.length, 4, "totalProducts");
    } catch (error) {
        console.log(error);
    }
}

function countingProducts(targetNumber, duration, elementId) {
    const element = document.getElementById(elementId);
    const increment = targetNumber / (duration * 100);
    let currentNumber = 0;

    const intervalId = setInterval(() => {
        currentNumber += increment;

        element.innerText = Math.round(currentNumber);

        if (currentNumber >= targetNumber) {
            clearInterval(intervalId);
            element.innerText = targetNumber;
        }
    }, 0.1);
}
TotalProducts();


async function TotalRevenue() {
    try {
        let res = await fetch("https://loop-illusionist-8901.onrender.com/orders");
        let data = await res.json();

        let totalRevenue = data.reduce((sum, order) => sum + order.total_amount, 0);
        countingRevenue(totalRevenue, 4, "totalRevenue");

    } catch (error) {
        console.log(error);
    }
}
function countingRevenue(targetNumber, duration, elementId) {
    const element = document.getElementById(elementId);
    const increment = targetNumber / (duration * 100);
    let currentNumber = 0;

    const intervalId = setInterval(() => {
        currentNumber += increment;

        element.innerText = `₹${currentNumber.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

        if (currentNumber >= targetNumber) {
            clearInterval(intervalId);

            element.innerText = `₹${targetNumber.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
        }
    }, 0.1);
}
TotalRevenue();


// charts

fetch("https://loop-illusionist-8901.onrender.com/orders")
    .then(response => response.json())
    .then(orders => {
        const productSales = {};

        orders.forEach(order => {
            order.items.forEach(item => {
                const productId = item.product_id;
                const quantity = item.quantity;
                const name = item.product_name;

                if (productSales[productId]) {
                    productSales[productId] += quantity;
                } else {
                    productSales[productId] = quantity;
                }
            });
        });

        // top 5 products with maximum sales
        const top5Products = Object.entries(productSales)
            .sort(([, quantityA], [, quantityB]) => quantityB - quantityA)
            .slice(0, 5);

        // Extract data for the chart
        const labels = top5Products.map(([productId]) => `Product ${productId}`);
        const data = top5Products.map(([, salesQuantity]) => salesQuantity);

        // Create a bar chart using Chart.js
        const ctx = document.getElementById('topProductChart').getContext('2d');
        const barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Sales Quantity',
                    data: data,
                    backgroundColor: 'black',
                    borderColor: 'black',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error("Error fetching data:", error));

// sales chart

fetch("https://loop-illusionist-8901.onrender.com/orders")
      .then(response => response.json())
      .then(orders => {
        // Function to calculate total sales for each month
        const monthlySales = new Array(12).fill(0); // Initialize array for each month

        orders.forEach(order => {
          const orderDate = new Date(order.expected_delivery_date);
          const monthIndex = orderDate.getMonth();
          monthlySales[monthIndex] += order.total_amount;
        });

        // Create a bar chart using Chart.js
        const ctx = document.getElementById('totalSalesChart').getContext('2d');
        const barChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            datasets: [{
              label: 'Total Sales',
              data: monthlySales,
              backgroundColor: 'black',
              borderColor: 'black',
              borderWidth: 3,
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Total Sales ($)',
                }
              }
            }
          }
        });
      })
      .catch(error => console.error("Error fetching data:", error));