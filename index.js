let button = document.getElementById("button");
button.addEventListener("click", (e) => {
  fetch("http://localhost:4000/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: "AmirMir@gmail.com",
      password: "123123123",
      role:"admin"
    }),
  })
    .then((item) => item.json())
    .then((item) => console.log(item));
});
