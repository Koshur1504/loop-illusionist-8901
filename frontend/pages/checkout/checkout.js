// function submitForm() {
//     // You can add JavaScript code here to handle form submission
//     alert("Form submitted!");
// }

function showInputForm(show) {
    var inputForm = document.getElementById('inputForm');
    inputForm.style.display = show ? 'block' : 'none';
}

function submitInput() {
    var inputValue = document.getElementById('inputField').value;
    alert('You entered: ' + inputValue);
}

let btnYes = document.getElementById("yesBtn")
let btnNo = document.getElementById("noBtn")

btnYes.addEventListener("click", () => {
    btnYes.style.backgroundColor = "black";
    btnYes.style.color = "white";
    btnNo.style.backgroundColor = "white";
    btnNo.style.color = "black";
})

btnNo.addEventListener("click", () => {
    btnNo.style.backgroundColor = "black";
    btnNo.style.color = "white";
    btnYes.style.backgroundColor = "white";
    btnYes.style.color = "black";

})

