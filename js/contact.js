const formWrapper = document.querySelector(".contact-form");
const form = document.querySelector(".contact-form form");
const formError = document.querySelector("#form-error__form");
form.addEventListener("submit", validateForm);

const title = document.querySelector("#title");
const titleError = document.querySelector("#form-error__title");
let titleIsValid;
title.addEventListener("blur", () => titleIsValid = validateInput(validateLength(title.value, 5), title, titleError));

const message = document.querySelector("#message");
const messageError = document.querySelector("#form-error__message");
let messageIsValid;
message.addEventListener("blur", () => messageIsValid = validateInput(validateLength(message.value, 10), message, messageError));

const email = document.querySelector("#email");
const emailError = document.querySelector("#form-error__email");
let emailIsValid;
email.addEventListener("blur", () => emailIsValid = validateInput(validateEmail(email.value), email, emailError));

function validateInput(validation, inputContainer, errorContainer){
    if(validation){
        inputContainer.style.border = "1px solid #707070";
        errorContainer.style.display = "none";
        return true;
    }
    else{
        showError(inputContainer, errorContainer);
        return false;
    }
}

function validateForm(event){
    event.preventDefault();

    if(titleIsValid && messageIsValid && emailIsValid){
        formWrapper.innerHTML = `
            <div class="form-feedback">
                <h2>Message sent</h2>
                <p><span class="bold">Title: </span>${title.value}</p>
                <p><span class="bold">Subject: </span>${document.querySelector("#select").value}</p>
                <p><span class="bold">Message: </span>${message.value}</p>
                <p>You can expect feedback on your message in a few business days!</p>
            </div>
        `;
    }
    else{
        formError.style.display = "block";
        if(!titleIsValid){showError(title, titleError)}
        if(!messageIsValid){showError(message, messageError)}
        if(!emailIsValid){showError(email, emailError)}
    }
}

function showError(input, errorContainer){
    input.style.border = "1px solid #F00";
    errorContainer.style.display = "block";
}

function validateLength(value, length){
    if(value.trim().length >= length){
        return true;
    }
    else{
        return false;
    }
}

function validateEmail(email){
    const regularExpression = /\S+@\S+\.\S+/;
    const match = regularExpression.test(email);
    return match;
}