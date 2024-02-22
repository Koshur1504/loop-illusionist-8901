let baseurl = "https://loop-illusionist-8901.onrender.com";
let signInBtn = document.querySelector("#signUpBtn");

signInBtn.addEventListener("click", handleSignin);

async function handleSignin(e) {
  e.preventDefault();
  try {
    let login = JSON.stringify({
      email: "abc@mail.com",
      password: "abcdefghi",
    });
    let data = await fetch(`${baseurl}/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: login,
    });
    let user = await data.json();
    console.log(user);
  } catch (error) {
    console.error(error.message);
  }
}
