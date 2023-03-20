createLoginForm();

const userInfo = {
    username: "user",
    password: "test",
    token: ""
};

const loginForm = document.querySelector("#login")
const usernameInput = document.querySelector("#username");
const userPassword = document.querySelector("#password");

loginForm.addEventListener("submit",function(e){
    
     e.preventDefault();

    if (isValidUsername() && isValidPassword()) {
        if (checkData()) {
            userInfo.token = "xxx"
            alert("correct");
        } else{
            fieldsClear();
        }
    } else{
        fieldsClear();
    }    
    
});

function isValidUsername() {
    const nameRegex = /^[a-zA-Z\-]+$/;

    if(!usernameInput.value){
        showError("form_username","The username is empty");
    } else if(usernameInput.value.length > 10 || usernameInput.value.length < 4){
        showError("form_username","The username should be between 4 - 10");
    } else if(!usernameInput.value.match(nameRegex)){
        showError("form_username","the username contains characters that are not allowed");
    } else 
        return true;

    return false;
}

function isValidPassword() {
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if(!userPassword.value){
        showError("form_password","The user password is empty")
    } else if(userPassword.value.length > 15 || userPassword.value.length < 4){
        showError("form_password","The user password should be between 4 - 15")
    } else if(!userPassword.value.match(nameRegex)){
        showError("form_password","The user password contains characters that are not allowed")
    } else
        return true;

    return false;
}

//Checking for a matching login and password
function checkData() { 
    if(usernameInput.value === userInfo.username &&
        userPassword.value === userInfo.password){
        return true;
    } else showError("form_username","Username or password is not correct");

    return false;
}

function fieldsClear() {
    usernameInput.value = "";
    userPassword.value = "";
}

// Output exeption message
function showError(elementId, textError)
{    
    removeError();
    const error = document.getElementById(elementId).appendChild(document.createElement("p"));
    error.classList.add("error");
    error.textContent = textError;
}

// Delete exeption message
function removeError(){
    if(document.getElementById("form_username").contains(document.querySelector(".error"))){
        document.getElementById("form_username").removeChild(document.querySelector(".error"));
    } else if(document.getElementById("form_password").contains(document.querySelector(".error"))){
        document.getElementById("form_password").removeChild(document.querySelector(".error"));
    }
}

// Creating html registration form
function createLoginForm() {
    createFormContainer();

    const parentElement = document.getElementById("login");
    createTitle(parentElement, "Login form");
    createInput(parentElement);
    createButton(parentElement); 
}

function createFormContainer(){
    const div_form_container = document.createElement("div");
    div_form_container.setAttribute("class", "form_container");

    document.body.append(div_form_container);

    div_form_container.appendChild(createBaseElement({element: "form", className: "form", id: "login"}));
}

function createTitle(parentElement, text){
    const title = parentElement.appendChild(document.createElement("h1"));
    title.textContent = text;
}

function createInput(parentElement){
    parentElement.appendChild(createBaseElement({className: "form_input", id: "form_username"}));
    form_username.innerHTML = '<label for="username">Username:</label>' +
    '<input type="text" name="username" id="username" placeholder="username">';

    parentElement.appendChild(createBaseElement({className: "form_input", id: "form_password"}));
    form_password.innerHTML = '<label for="password">Password:</label>' +
    '<input type="password" name="password" id="password" placeholder="password">';
}

function createButton(parentElement){
    parentElement.appendChild(createBaseElement({className: "button", id: ""}));
    document.querySelector(".button").innerHTML = '<button id="login_btn">login</button>';
}

function createBaseElement({element = "div", className, id}){
    const new_element = document.createElement(element);
    if(className) new_element.setAttribute("class", className);
    if(id) new_element.setAttribute("id", id);
    return new_element;
}


