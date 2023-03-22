createLoginForm();

let validationErrors = {};
let formValues = {};
let touchedElements = [];

const userInfo = {
    username: "user",
    password: "test",
    token: ""
};

const loginForm = document.querySelector("#login")
const usernameInput = document.querySelector("#username");
const userPassword = document.querySelector("#password");
const submitButton = document.querySelector("#login_btn");

document.addEventListener("DOMContentLoaded", function(){
    usernameInput.value = localStorage.getItem("userInput");
})

loginForm.addEventListener("click", function(e) {
    if(e.target === usernameInput || e.target === userPassword || e.target === submitButton){
        touchedElements.push(e.target);
    }
    if(e.target === submitButton){
        removeError();
    }
});

loginForm.addEventListener("submit",function(e){
    e.preventDefault();

    formValues.valueUsername = usernameInput.value;
    formValues.valuePassword = userPassword.value;
    localStorage.setItem("userInput", formValues.valueUsername);

    if (isValidUsername() & isValidPassword()) {
        if (checkUsername() & checkPassword()) {
            userInfo.token = "xxx"
            alert("correct");
        }
    }  
});

function isValidUsername() {
    const nameRegex = /^[a-zA-Z\-]+$/;

    if(!usernameInput.value){
        validationErrors.errorUsername = "The username is empty";
    } else if(usernameInput.value.length > 10 || usernameInput.value.length < 4){
        validationErrors.errorUsername = "The username should be between 4 - 10";
    } else if(!usernameInput.value.match(nameRegex)){
        validationErrors.errorUsername = "The username contains characters that are not allowed";
    } else 
        return true;

    showError("form_username",validationErrors.errorUsername);

    return false;
}

function isValidPassword() {
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if(!userPassword.value){
        validationErrors.errorPassword = "The password is empty";
    } else if(userPassword.value.length > 15 || userPassword.value.length < 4){
        validationErrors.errorPassword = "The password should be between 4 - 15";
    } else if(!userPassword.value.match(nameRegex)){
        validationErrors.errorPassword = "The password contains characters that are not allowed";
    } else
        return true;

    showError("form_password",validationErrors.errorPassword);

    return false;
}

function checkPassword(){
    if(userPassword.value === userInfo.password){
        return true;
    } else {
        validationErrors.errorcheckData = "Password is not correct";
        showError("form_password",validationErrors.errorcheckData);
    }
    return false;
}

function checkUsername(){
    if(usernameInput.value === userInfo.username ){
        return true;   
    } else {
        validationErrors.errorcheckData = "Username is not correct";
        showError("form_username",validationErrors.errorcheckData);
    }
    return false;
}

// Output exeption message
function showError(elementId, textError)
{    
    const error = document.getElementById(elementId).appendChild(document.createElement("p"));
    error.classList.add("error");
    error.textContent = textError;
}

// Delete exeption message
function removeError(){
    if(document.getElementById("form_username").contains(document.querySelector(".error"))){
        document.getElementById("form_username").removeChild(document.querySelector(".error"));
    } 
    if(document.getElementById("form_password").contains(document.querySelector(".error"))){
        document.getElementById("form_password").removeChild(document.querySelector(".error"));
    }
}

// Creating html registration form
function createLoginForm() {
    document.body.append(createFormContainer());

    const parentElement = document.getElementById("login");
    parentElement.appendChild(createTitle("Login form"));
    parentElement.appendChild(createInputField("form_username","username", "Username"));
    parentElement.appendChild(createInputField("form_password","password", "Password"));
    parentElement.appendChild(createButton("login_btn")); 
}

function createFormContainer(){
    const divFormContainer = createBaseElement({className: "form_container"});
    divFormContainer.appendChild(createBaseElement({tagName: "form", className: "form", tagId: "login"}));
    
    return divFormContainer;
}

function createInputField(divId, inputName, labelText){
    const inputField = createBaseElement({className: "form_input", tagId: divId});
    inputField.appendChild(createLabel(inputName, labelText));
    inputField.appendChild(createInput(inputName));
    return inputField;
}

function createBaseElement({tagName = "div", className, tagId}){
    const baseElement = document.createElement(tagName);
    if(className) baseElement.setAttribute("class", className);
    if(tagId) baseElement.setAttribute("id", tagId);
    return baseElement;
}

function createButton(buttonId){
    const divButton = createBaseElement({className: "button"});
    const button = createBaseElement({tagName: "button", tagId: buttonId});
    button.textContent = "login";
    divButton.appendChild(button);
    return divButton;
}

function createTitle(titleText){
    const title = document.createElement("h1");
    title.textContent = titleText;
    return title;
}

function createLabel(htmlForName, labelText){
    const label = document.createElement("label");
    label.htmlForName = htmlForName;
    label.textContent = labelText;
    return label;
} 

function createInput(name, inputId = name, placeholder = name, type = name){
    const input = createBaseElement({tagName: "input", tagId: inputId});
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    return input;
}

