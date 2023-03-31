let formErrors = {};
let formValues = {};
let touchedElements = [];

const userInfo = {
    username: "user",
    password: "test",
    token: ""
};

function setFormValue(fieldNameKey, value) {
    formValues[fieldNameKey] = value;
    validateField(fieldNameKey, value);
}

function setTouchedElements(e) {
    touchedElements.push(e.target);
}

function setFormErrors(fieldNameKey, error) {
    formErrors[fieldNameKey] = error;
    renderLoginForm();
}

renderLoginForm();

function validateField(fieldName, value) {
    if(fieldName === "username") {
        setFormErrors(fieldName, isValidUsername(value));
    }
    if(fieldName === "password") {
        setFormErrors(fieldName, isValidPassword(value));
    }
}

function isValidUsername(value) {
    const nameRegex = /^[a-zA-Z\-]+$/;

    if (!value) {
        return "The username is empty";
    } else if (value.length > 10 || value.length < 4) {
        return "The username should be between 4 - 10";
    } else if (!value.match(nameRegex)) {
        return "Characters are not allowed";
    }
}

function isValidPassword(value) {
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if (!value) {
        return "The password is empty";
    } else if (value.length > 15 || value.length < 4) {
        return "The password should be between 4 - 15";
    } else if (!value.match(nameRegex)) {
        return "Characters are not allowed";
    }   
}

function checkLoginPassword(currentValue, rightValue) {
    if(currentValue.username === rightValue.username && currentValue.password === rightValue.password) {
        return true;
    }
    return false;
}

function onSubmitHandler(e) {
    e.preventDefault();

    if (checkLoginPassword(formValues, userInfo)) {
        userInfo.token = "xxx";
        alert("correct");
    } else {
        setFormErrors("authentication", "Username or password is not correct");
    }
}

function renderLoginForm() {
    const form = createFormContainer(onSubmitHandler);
    const loginForm = form.children.item(0);

    loginForm.appendChild(createTitle("Login form"));
    loginForm.appendChild(createInputField({
        divId: "form_username", 
        paragraphId: "username_error", 
        paragraphClass: "error",
        inputName: "username", 
        labelText: "Username", 
        inputValue: formValues.username, 
        error: formErrors.username,
        onClick: setTouchedElements, 
        onInput: function(e) {
            setFormValue(e.target.id, e.target.value);
        }
    }));
    loginForm.appendChild(createInputField({
        divId: "form_password", 
        paragraphId: "password_error", 
        paragraphClass: "error",
        inputName: "password", 
        labelText: "Password", 
        inputValue: formValues.password, 
        error: formErrors.password,
        onClick: setTouchedElements, 
        onInput: function(e) {
            setFormValue(e.target.id, e.target.value);
        }
    }));
    loginForm.appendChild(createButton("login_btn", setTouchedElements));
    loginForm.appendChild(createParagraph("authentication_error", formErrors.authentication ,"error")); 

    const currentForm = document.querySelector(".form_container");
    if(!currentForm) {
        document.body.append(form);
    } else {
        replaceChangedChild(currentForm, form);
    }
}

function replaceChangedChild(currentForm, form) {
    if(!currentForm.isEqualNode(form)) {
        for(let i = 0; i < currentForm.children.length; i++) {
            replaceChangedChild(currentForm.children.item(i), form.children.item(i))  
        }
        if(!currentForm.firstElementChild) {
            currentForm.replaceWith(form);
        }
    }
    return;
}
 
function createFormContainer(finalValidationHandler) {
    const divFormContainer = createBaseElement({ className: "form_container" });
    const loginForm = divFormContainer.appendChild(createBaseElement({
        tagName: "form",
        className: "form",
        tagId: "login",
    }));

    loginForm.addEventListener("submit", finalValidationHandler);

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
    onInput
}) {
    const inputField = createBaseElement({ className: "form_input", tagId: divId });
    inputField.appendChild(createInput({
        onClick: onClick,
        onInput: onInput,
        value: inputValue,
        name: inputName,
    }));
    inputField.appendChild(createLabel(inputName, labelText));
    inputField.appendChild(createParagraph(paragraphId, error, paragraphClass));
    
    return inputField;
}

function createBaseElement({ tagName = "div", className, tagId }) {
    const baseElement = document.createElement(tagName);
    if(className) baseElement.setAttribute("class", className);
    if(tagId) baseElement.setAttribute("id", tagId);
    return baseElement;
}

function createButton(buttonId, onClick) {
    const divButton = createBaseElement({ className: "button" });
    const button = createBaseElement({ tagName: "button", tagId: buttonId });
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
    type = name
}) {
    const input = createBaseElement({ tagName: "input", tagId: inputId });
    input.value = value;
    input.type = type;
    input.name = name;
    input.required = true;

    input.addEventListener("input", onInput);

    input.addEventListener("click", onClick);

    return input;
}

function createParagraph(paragraphId, text, className) {
    const paragraph = createBaseElement({ tagName: "p", className, tagId: paragraphId });
    paragraph.textContent = text;
    return paragraph;
}