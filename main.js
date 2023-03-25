let validationErrors = {};
let formValues = {};
let touchedElements = [];

const userInfo = {
    username: "user",
    password: "test",
    token: ""
};

createLoginForm();

function isValidUsername() {
    const nameRegex = /^[a-zA-Z\-]+$/;

    if(!username.value){
        setValidationError("errorUsername","The username is empty");
    } else if(username.value.length > 10 || username.value.length < 4){
        setValidationError("errorUsername","The username should be between 4 - 10");
    } else if(!username.value.match(nameRegex)){
        setValidationError("errorUsername","The username contains characters that are not allowed");
    } else 
        return true;

    showError("username_error",validationErrors.errorUsername);

    return false;
}

function isValidPassword() {
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if(!password.value){
        setValidationError("errorPassword","The password is empty");
    } else if(password.value.length > 15 || password.value.length < 4){
        setValidationError("errorPassword","The password should be between 4 - 15");
    } else if(!password.value.match(nameRegex)){
        setValidationError("errorPassword","The password contains characters that are not allowed");
    } else
        return true;

    showError("password_error",validationErrors.errorPassword);

    return false;
}

function checkPassword(){
    if(password.value === userInfo.password){
        return true;
    } else {
        setValidationError("errorcheckData","Password is not correct");
        showError("password_error",validationErrors.errorcheckData);
    }
    return false;
}

function checkUsername(){
    if(username.value === userInfo.username ){
        return true;   
    } else {
        setValidationError("errorcheckData","Username is not correct");
        showError("username_error",validationErrors.errorcheckData);
    }
    return false;
}

function setValidationError(fieldNameKey, error){
    validationErrors[fieldNameKey] = error;
}

function showError(elementId, textError){
    document.getElementById(elementId).textContent = textError;
}

function setFormValue(fieldNameKey, value){
    formValues[fieldNameKey] = value;
}

function createLoginForm() {
    document.body.append(createFormContainer());

    const parentElement = document.getElementById("login");
    parentElement.appendChild(createTitle("Login form"));
    parentElement.appendChild(createInputField({divId: "form_username", paragraphId: "username_error", paragraphClass: "error",
        inputName: "username", labelText: "Username", inputValue: formValues.valueUsername, error: validationErrors.errorUsername}));
    parentElement.appendChild(createInputField({divId: "form_password", paragraphId: "password_error", paragraphClass: "error",
        inputName: "password", labelText: "Password", inputValue: formValues.valuePassword, error: validationErrors.errorPassword}));
    parentElement.appendChild(createButton("login_btn")); 
}

function createFormContainer(){
    const divFormContainer = createBaseElement({className: "form_container"});
    const loginForm = divFormContainer.appendChild(createBaseElement({tagName: "form", className: "form", tagId: "login"}));
    
    loginForm.addEventListener("submit",function(e){
        e.preventDefault();
    
        if (isValidUsername() & isValidPassword()) {
            if (checkUsername() & checkPassword()) {
                userInfo.token = "xxx"
                alert("correct");
            }
        }  
    });

    return divFormContainer;
}

function createInputField({divId, paragraphId, paragraphClass, inputName, labelText, inputValue, error}){
    const inputField = createBaseElement({className: "form_input", tagId: divId});
    inputField.appendChild(createLabel(inputName, labelText));
    inputField.appendChild(createInput(inputValue, inputName));
    inputField.appendChild(createParagraph(paragraphId, error, paragraphClass));
    
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

    button.addEventListener("click", function(e) {
        touchedElements.push(e.target);
    });

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

    input.addEventListener("input", function(){
        setFormValue(name,input.value);
    });

    input.addEventListener("click", function(e) {
        touchedElements.push(e.target);
    });

    return input;
}

function createParagraph(paragraphId, text, className){
    const paragraph = createBaseElement({tagName: "p", className, tagId: paragraphId});
    paragraph.textContent = text;
    return paragraph;
}
