const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm(){
    localStorage.removeItem("cart");
}