let baseurl = "https://loop-illusionist-8901.onrender.com";
let signInBtn = document.querySelector("#signInBtn");

signInBtn.addEventListener("click", (e) => {
  handleSignin(e);
});

async function handleSignin(e) {
  e.preventDefault();
  try {
    let login = JSON.stringify({
      email: "abc@mail.com",
      password: "abcdefghi",
    });
    let data = await fetch(`${baseurl}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: login,
    });
    let user = await data.json();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
