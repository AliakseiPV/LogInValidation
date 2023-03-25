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
    } else if(formValues.username !== userInfo.username ){
        setValidationError("errorUsername","Username is not correct");
    } else 
        return true;

    showError("username_error",validationErrors.errorUsername);

    return false;
}

function isValidPassword() {
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if(!formValues.password){
        setValidationError("errorPassword","The password is empty");
    } else if(formValues.password.length > 15 || formValues.password.length < 4){
        setValidationError("errorPassword","The password should be between 4 - 15");
    } else if(!formValues.password.match(nameRegex)){
        setValidationError("errorPassword","The password contains characters that are not allowed");   
    } else if(formValues.password !== userInfo.password){
        setValidationError("errorPassword","Password is not correct");
    } else
        return true;

    showError("password_error",validationErrors.errorPassword);

    return false;
}

function setValidationError(fieldNameKey, error){
    validationErrors[fieldNameKey] = error;
}

function showError(elementId, textError){
    document.getElementById(elementId).textContent = textError;
}

function finalValidation(e){
    e.preventDefault();
    
    if (isValidUsername() & isValidPassword()) {
        userInfo.token = "xxx"
        alert("correct");
    }  
}

function setFormValue(e){
    formValues[e.target.id] = e.target.value;
}

function addTouchedElements(e) {
    touchedElements.push(e.target);
}

function createLoginForm() {
    document.body.append(createFormContainer(finalValidation));

    const parentElement = document.getElementById("login");
    parentElement.appendChild(createTitle("Login form"));
    parentElement.appendChild(createInputField({divId: "form_username", paragraphId: "username_error", paragraphClass: "error",
        inputName: "username", labelText: "Username", inputValue: formValues.username, error: validationErrors.username,
        funcAddTouchedElements: addTouchedElements, funcSetFormValue: setFormValue}));
    parentElement.appendChild(createInputField({divId: "form_password", paragraphId: "password_error", paragraphClass: "error",
        inputName: "password", labelText: "Password", inputValue: formValues.password, error: validationErrors.password,
        funcAddTouchedElements: addTouchedElements, funcSetFormValue: setFormValue}));
    parentElement.appendChild(createButton("login_btn", addTouchedElements)); 
}

function createFormContainer(funcFinalValidation){
    const divFormContainer = createBaseElement({className: "form_container"});
    const loginForm = divFormContainer.appendChild(createBaseElement({tagName: "form", className: "form", tagId: "login"}));
    
    loginForm.addEventListener("submit",funcFinalValidation);

    return divFormContainer;
}

function createInputField({divId, paragraphId, paragraphClass, inputName, labelText, inputValue, error, funcAddTouchedElements, funcSetFormValue}){
    const inputField = createBaseElement({className: "form_input", tagId: divId});
    inputField.appendChild(createLabel(inputName, labelText));
    inputField.appendChild(createInput(funcAddTouchedElements, funcSetFormValue, inputValue, inputName));
    inputField.appendChild(createParagraph(paragraphId, error, paragraphClass));
    
    return inputField;
}

function createBaseElement({tagName = "div", className, tagId}){
    const baseElement = document.createElement(tagName);
    if(className) baseElement.setAttribute("class", className);
    if(tagId) baseElement.setAttribute("id", tagId);
    return baseElement;
}

function createButton(buttonId, funcAddTouchedElements){
    const divButton = createBaseElement({className: "button"});
    const button = createBaseElement({tagName: "button", tagId: buttonId});
    button.textContent = "login";
    divButton.appendChild(button);

    button.addEventListener("click", funcAddTouchedElements);
    
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

function createInput(funcAddTouchedElements, funcSetFormValue, value = "", name, inputId = name, placeholder = name, type = name){
    const input = createBaseElement({tagName: "input", tagId: inputId});
    input.value = value;
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;

    input.addEventListener("input", funcSetFormValue);

    input.addEventListener("click", funcAddTouchedElements);

    return input;
}

function createParagraph(paragraphId, text, className){
    const paragraph = createBaseElement({tagName: "p", className, tagId: paragraphId});
    paragraph.textContent = text;
    return paragraph;
}