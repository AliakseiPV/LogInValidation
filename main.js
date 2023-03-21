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
    document.body.append(createFormContainer());

    const parentElement = document.getElementById("login");
    parentElement.appendChild(createTitle("Login form"));
    parentElement.appendChild(createInputField("form_input","form_username","username", "Username"));
    parentElement.appendChild(createInputField("form_input","form_password","password", "Password"));
    parentElement.appendChild(createButton("login_btn")); 
}

function createFormContainer(){
    const div_form_container = createBaseElement({className: "form_container"});
    div_form_container.appendChild(createBaseElement({element: "form", className: "form", id: "login"}));
    
    return div_form_container;
}

function createInputField(className, id, typeInput, labelText){
    const inputField = createBaseElement({className: className, id: id});
    inputField.appendChild(createLabel(typeInput, labelText));
    inputField.appendChild(createInput(typeInput));
    return inputField;
}

function createBaseElement({element = "div", className, id}){
    const new_element = document.createElement(element);
    if(className) new_element.setAttribute("class", className);
    if(id) new_element.setAttribute("id", id);
    return new_element;
}

function createButton(id){
    const div_button = createBaseElement({className: "button"});
    const button = createBaseElement({element: "button", id: id});
    button.textContent = "login";
    div_button.appendChild(button);
    return div_button;
}

function createTitle(text){
    const title = document.createElement("h1");
    title.textContent = text;
    return title;
}

function createLabel(htmlFor, text){
    const label = document.createElement("label");
    label.htmlFor = htmlFor;
    label.textContent = text;
    return label;
} 

function createInput(id){
    const username = createBaseElement({element: "input", id: id});
    username.type = id;
    username.name = id;
    username.placeholder = id;
    return username;
}
