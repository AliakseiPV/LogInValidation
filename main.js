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

    if(!formValues.username){
        setValidationError("errorUsername","The username is empty");
    } else if(formValues.username.length > 10 || formValues.username.length < 4){
        setValidationError("errorUsername","The username should be between 4 - 10");
    } else if(!formValues.username.match(nameRegex)){
        setValidationError("errorUsername","The username contains characters that are not allowed");
    } else 
        return true;

    showError("username_error",validationErrors.errorUsername);

    return false;
}

function isValidPassword() {
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if(!formValues.password){
        setValidationError("errorPassword","The password is empty");
    } else if(formValues.password.value.length > 15 || formValues.password.value.length < 4){
        setValidationError("errorPassword","The password should be between 4 - 15");
    } else if(!formValues.password.value.match(nameRegex)){
        setValidationError("errorPassword","The password contains characters that are not allowed");
    } else
        return true;

    showError("password_error",validationErrors.errorPassword);

    return false;
}

function checkPassword(){
    if(formValues.password.value === userInfo.password){
        return true;
    } else {
        setValidationError("errorcheckData","Password is not correct");
        showError("password_error",validationErrors.errorcheckData);
    }
    return false;
}

function checkUsername(){
    if(formValues.username === userInfo.username ){
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

function finalValidation(e){
    e.preventDefault();

    if (isValidUsername() & isValidPassword()) {
        if (checkUsername() & checkPassword()) {
            userInfo.token = "xxx"
            alert("correct");
        }
    }  
}

function addTouchedElements(e) {
    touchedElements.push(e.target);
}

function addFormValue(fieldNameKey, value){
    formValues[fieldNameKey] = value;
    //setFormValue(nameFormValue,inputValue);
}

function createLoginForm() {
    document.body.append(createFormContainer());

    const parentElement = document.getElementById("login");
    parentElement.appendChild(createTitle("Login form"));
    parentElement.appendChild(createInputField({divId: "form_username", paragraphId: "username_error", paragraphClass: "error",
        inputName: "username", labelText: "Username", inputValue: formValues.username, error: validationErrors.errorUsername}));
    parentElement.appendChild(createInputField({divId: "form_password", paragraphId: "password_error", paragraphClass: "error",
        inputName: "password", labelText: "Password", inputValue: formValues.password, error: validationErrors.errorPassword}));
   
        parentElement.appendChild(createButton("login_btn")); 
}

function createFormContainer(){
    const divFormContainer = createBaseElement({className: "form_container"});
    const loginForm = divFormContainer.appendChild(createBaseElement({tagName: "form", className: "form", tagId: "login"}));
    
    loginForm.addEventListener("submit",finalValidation);

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

    button.addEventListener("click", addTouchedElements);

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

    input.addEventListener("input", addFormValue("username", input.value));
    input.addEventListener("click", addTouchedElements);

    return input;
}

function createParagraph(paragraphId, text, className){
    const paragraph = createBaseElement({tagName: "p", className, tagId: paragraphId});
    paragraph.textContent = text;
    return paragraph;
}