let validationErrors = {};
let formValues = {};
let touchedElements = [];

const userInfo = {
    username: "user",
    password: "test",
    token: ""
};

createLoginForm();

function isValidUsername(setError, showError, errorId, currentUsername, correctUsername, error) {
    const nameRegex = /^[a-zA-Z\-]+$/;

    if(!currentUsername){
        setError("errorUsername","The username is empty");
    } else if(currentUsername.length > 10 || currentUsername.length < 4){
        setError("errorUsername","The username should be between 4 - 10");
    } else if(!currentUsername.match(nameRegex)){
        setError("errorUsername","The username contains characters that are not allowed");
    } else if(currentUsername !== correctUsername ){
        setError("errorUsername","Username is not correct");
    } else 
        return true;

    showError(errorId, error.errorUsername);

    return false;
}

function isValidPassword(setError, showError, errorId, currentPassword, correctPassword, error) {
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if(!currentPassword){
        setError("errorPassword","The password is empty");
    } else if(currentPassword.length > 15 || currentPassword.length < 4){
        setError("errorPassword","The password should be between 4 - 15");
    } else if(!currentPassword.match(nameRegex)){
        setError("errorPassword","The password contains characters that are not allowed");   
    } else if(currentPassword !== correctPassword){
        setError("errorPassword","Password is not correct");
    } else
        return true;

    showError(errorId, error.errorPassword);

    return false;
}

function showError(elementId, textError) {
    document.getElementById(elementId).textContent = textError;
}

function setValidationError(fieldNameKey, error) {
    validationErrors[fieldNameKey] = error;
}

function finalValidation(e) {
    e.preventDefault();
    
    if (isValidUsername(setValidationError, showError, "username_error", formValues.username, userInfo.username, validationErrors)
        & isValidPassword(setValidationError, showError, "password_error", formValues.password, userInfo.password, validationErrors))
    {
        userInfo.token = "xxx";
        alert("correct");
    }  
}

function setFormValue(e) {
    formValues[e.target.id] = e.target.value;
}

function setTouchedElements(e) {
    touchedElements.push(e.target);
}

function createLoginForm() {
    const parentElement = createFormContainer(finalValidation);
    const loginForm = parentElement.querySelector("#login");

    loginForm.appendChild(createTitle("Login form"));
    loginForm.appendChild(createInputField({
        divId: "form_username", 
        paragraphId: "username_error", 
        paragraphClass: "error",
        inputName: "username", 
        labelText: "Username", 
        inputValue: formValues.username, 
        error: validationErrors.username,
        onClick: setTouchedElements, 
        onInput: setFormValue}));
    loginForm.appendChild(createInputField({
        divId: "form_password", 
        paragraphId: "password_error", 
        paragraphClass: "error",
        inputName: "password", 
        labelText: "Password", 
        inputValue: formValues.password, 
        error: validationErrors.password,
        onClick: setTouchedElements, 
        onInput: setFormValue}));
    loginForm.appendChild(createButton("login_btn", setTouchedElements)); 

    document.body.append(parentElement);
}

function createFormContainer(finalValidationHandler) {
    const divFormContainer = createBaseElement({className: "form_container"});
    const loginForm = divFormContainer.appendChild(createBaseElement({tagName: "form", className: "form", tagId: "login"}));

    loginForm.addEventListener("submit",finalValidationHandler);

    return divFormContainer;
}

function createInputField({
        divId, 
        paragraphId, 
        paragraphClass, 
        inputName, 
        labelText, 
        inputValue, 
        error, 
        onClick, 
        onInput}) {
    const inputField = createBaseElement({className: "form_input", tagId: divId});
    inputField.appendChild(createLabel(inputName, labelText));
    inputField.appendChild(createInput({onClick: onClick,onInput: onInput, value: inputValue, name: inputName}));
    inputField.appendChild(createParagraph(paragraphId, error, paragraphClass));
    
    return inputField;
}

function createBaseElement({tagName = "div", className, tagId}) {
    const baseElement = document.createElement(tagName);
    if(className) baseElement.setAttribute("class", className);
    if(tagId) baseElement.setAttribute("id", tagId);
    return baseElement;
}

function createButton(buttonId, onClick) {
    const divButton = createBaseElement({className: "button"});
    const button = createBaseElement({tagName: "button", tagId: buttonId});
    button.textContent = "login";
    divButton.appendChild(button);

    button.addEventListener("click", onClick);
    
    return divButton;
}

function createTitle(titleText) {
    const title = document.createElement("h1");
    title.textContent = titleText;
    return title;
}

function createLabel(htmlForName, labelText) {
    const label = document.createElement("label");
    label.htmlForName = htmlForName;
    label.textContent = labelText;
    return label;
} 

function createInput({
        onClick, 
        onInput, 
        value = "", 
        name, 
        inputId = name, 
        placeholder = name, 
        type = name}) {
    const input = createBaseElement({tagName: "input", tagId: inputId});
    input.value = value;
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;

    input.addEventListener("input", onInput);

    input.addEventListener("click", onClick);

    return input;
}

function createParagraph(paragraphId, text, className) {
    const paragraph = createBaseElement({tagName: "p", className, tagId: paragraphId});
    paragraph.textContent = text;
    return paragraph;
}