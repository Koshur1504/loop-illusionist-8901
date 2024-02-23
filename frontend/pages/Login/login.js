let baseurl = "https://loop-illusionist-8901.onrender.com";
let signInBtn = document.querySelector("#signInBtn");
let signUpBtn = document.querySelector("#signUpBtn");
let customAlert = document.getElementById("customAlert");
let customAlert2 = document.getElementById("customAlert2");
let customAlertName = document.getElementById("customAlertName");
let customAlertemail = document.getElementById("customAlertemail");
let customAlertpassword = document.getElementById("customAlertpassword");

// signIn
signInBtn.addEventListener("click", (e) => {
    handleSignin(e);
});

async function handleSignin(e) {
    e.preventDefault();
    try {
        let loginEmail = document.getElementById("login-email");
        let loginPassword = document.getElementById("login-password");

        let loginData = {
            email: loginEmail.value,
            password: loginPassword.value,
        };

        let res = await fetch(`${baseurl}/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(loginData),
        });
        
        if (res.status === 200) {
            let data = await res.json();

            customAlert.innerText = "Login Successfull !!"
            customAlert.style.color = "Green";
            loginEmail.style.border = "1px solid black";
            loginPassword.style.border = "1px solid black";

            loginEmail.value='';
            loginPassword.value='';

            setTimeout(() => {
                window.location.href = "../../index.html";
            }, 1);

            localStorage.setItem("localAccessToken", JSON.stringify(data.accessToken));
            localStorage.setItem("user", JSON.stringify(data.user));
        }
        else {
            customAlert.innerText = "Incorrect email or password !!"
            customAlert.style.color = "red";
            loginEmail.style.border = "1px solid red";
            loginPassword.style.border = "1px solid red";
        }
    } catch (error) {
        console.log(error);
    }
}

// signUp
signUpBtn.addEventListener("click", (e) => {
    handleSignup(e);
});

async function handleSignup(e) {
    e.preventDefault();
    try {
        if (signUpValidation()) {
            let signUpName = document.getElementById("name");
            let signUpEmail = document.getElementById("signup-email");
            let signUpPassword = document.getElementById("signup-password");
            let verifyPassword = document.getElementById("confirm-password");

            let signupData = {
                name: signUpName.value,
                email: signUpEmail.value,
                password: signUpPassword.value,
            };

            let res = await fetch(`${baseurl}/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(signupData),
            });

            let data = await res.json();
            console.log(data);

            if (data.accessToken) {
                customAlert2.innerText = "Your account is created successfully !!";
                signUpName.value='';
                signUpEmail.value='';
                signUpPassword.value='';
                verifyPassword.value='';
                customAlert2.style.color = "Green";
            }
            else{
                customAlert2.innerText = "Email already Exists.";
                customAlert2.style.color = "red";
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function signUpValidation() {
    let signUpName = document.getElementById("name");
    let signUpEmail = document.getElementById("signup-email");
    let signUpPassword = document.getElementById("signup-password");
    let verifyPassword = document.getElementById("confirm-password");

    let customAlertName = document.getElementById("customAlertName");
    let customAlertemail = document.getElementById("customAlertemail");
    let customAlertpassword = document.getElementById("customAlertpassword");

    if (signUpName.value === "") {
        customAlertName.innerText = "Please enter your name.";
        customAlertName.style.color = "red";
        signUpName.style.border = "1px solid red";
        return false;
    } 
    else {
        customAlertName.innerText = "";
        signUpName.style.border = "1px solid black";
    }

    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(signUpEmail.value)) {
        customAlertemail.innerText = "Please enter a correct email id.";
        customAlertemail.style.color = "red";
        signUpEmail.style.border = "1px solid red";
        return false;
    } 
    else {
        customAlertemail.innerText = "";
        signUpEmail.style.border = "1px solid black";
    }

    if (signUpPassword.value !== verifyPassword.value) {
        customAlertpassword.innerText = "Passwords do not match.";
        customAlertpassword.style.color = "red";
        signUpPassword.style.border = "1px solid red";
        verifyPassword.style.border = "1px solid red";
        return false;
    } 
    else {
        customAlertpassword.innerText = "";
        signUpPassword.style.border = "1px solid black";
        verifyPassword.style.border = "1px solid black";
    }
    return true;
}
