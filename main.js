let validationErrors = {};
let formValues = {};
let touchedElements = [];

const userInfo = {
    username: "user",
    password: "test",
    token: ""
};

createLoginForm();

const loginForm = document.querySelector("#login");
const usernameInput = document.querySelector("#username");
const userPassword = document.querySelector("#password");
const submitButton = document.querySelector("#login_btn");

document.addEventListener("input", function(){
    formValues.valueUsername = usernameInput.value;
    formValues.valuePassword = userPassword.value;
});

loginForm.addEventListener("click", function(e) {
    if(e.target === usernameInput || e.target === userPassword || e.target === submitButton){
        touchedElements.push(e.target);
    }
});

loginForm.addEventListener("submit",function(e){
    e.preventDefault();

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
        SetValidationError("errorUsername","The username is empty");
    } else if(usernameInput.value.length > 10 || usernameInput.value.length < 4){
        SetValidationError("errorUsername","The username should be between 4 - 10");
    } else if(!usernameInput.value.match(nameRegex)){
        SetValidationError("errorUsername","The username contains characters that are not allowed");
    } else 
        return true;

    showError("username_error",validationErrors.errorUsername);

    return false;
}

function isValidPassword() {
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if(!userPassword.value){
        SetValidationError("errorPassword","The password is empty");
    } else if(userPassword.value.length > 15 || userPassword.value.length < 4){
        SetValidationError("errorPassword","The password should be between 4 - 15");
    } else if(!userPassword.value.match(nameRegex)){
        SetValidationError("errorPassword","The password contains characters that are not allowed");
    } else
        return true;

    showError("password_error",validationErrors.errorPassword);

    return false;
}

function checkPassword(){
    if(userPassword.value === userInfo.password){
        return true;
    } else {
        SetValidationError("errorcheckData","Password is not correct");
        showError("password_error",validationErrors.errorcheckData);
    }
    return false;
}

function checkUsername(){
    if(usernameInput.value === userInfo.username ){
        return true;   
    } else {
        SetValidationError("errorcheckData","Username is not correct");
        showError("username_error",validationErrors.errorcheckData);
    }
    return false;
}

function SetValidationError(fieldNameKey, error){
    validationErrors[fieldNameKey] = error;
}

function showError(elementId, textError){
    document.getElementById(elementId).textContent = textError;
}

function createLoginForm() {
    document.body.append(createFormContainer());

    const parentElement = document.getElementById("login");
    parentElement.appendChild(createTitle("Login form"));
    parentElement.appendChild(createInputField("form_username","username_error","username", "Username",
        {inputValue: formValues.valueUsername, error: validationErrors.errorUsername}));
    parentElement.appendChild(createInputField("form_password","password_error","password", "Password",
        {inputValue: formValues.valuePassword, error: validationErrors.errorPassword}));
    parentElement.appendChild(createButton("login_btn")); 
}

function createFormContainer(){
    const divFormContainer = createBaseElement({className: "form_container"});
    divFormContainer.appendChild(createBaseElement({tagName: "form", className: "form", tagId: "login"}));
    
    return divFormContainer;
}

function createInputField(divId, paragraphId, inputName, labelText, {inputValue, error}){
    const inputField = createBaseElement({className: "form_input", tagId: divId});
    inputField.appendChild(createLabel(inputName, labelText));
    inputField.appendChild(createInput(inputValue, inputName));
    inputField.appendChild(createParagraph(paragraphId, error));
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

function createInput(value = "", name, inputId = name, placeholder = name, type = name){
    const input = createBaseElement({tagName: "input", tagId: inputId});
    input.value = value;
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    return input;
}

function createParagraph(paragraphId, errorText){
    const paragraph = createBaseElement({tagName: "p", className: "error", tagId: paragraphId});
    paragraph.textContent = errorText;
    return paragraph;
}
