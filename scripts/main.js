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
            userInfo.token = "misha"
            alert("correct");
        }else{
            fieldsClear();
        }
    }else{
        fieldsClear();
    }    
    
});

function isValidUsername() {
    let check = false;
    const nameRegex = /^[a-zA-Z\-]+$/;

    if(usernameInput.value === ""){
        alert("The username is empty");
    }else if(usernameInput.value.length > 10 || usernameInput.value.length < 4){
        alert("The username should be between 4 - 10");
    }else if(!usernameInput.value.match(nameRegex)){
        alert("the username contains characters that are not allowed");
    }else 
        check = true;

    return check;
}

function isValidPassword() {
    let check = false;
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*\-]+$/;

    if(userPassword.value === ""){
        alert("The userpassword is empty");
    }else if(userPassword.value.length > 15 || userPassword.value.length < 4){
        alert("The userpassword should be between 4 - 15");
    }else if(!userPassword.value.match(nameRegex)){
        alert("The userpassword contains characters that are not allowed");
    }else
        check = true;

    return check;
}

function checkData() {
    let check = false; 
    if(usernameInput.value === userInfo.username &&
        userPassword.value === userInfo.password){
        check = true;
    }else alert("Username or password is not correct");

    return check;
}

function fieldsClear(){
    usernameInput.value = "";
    userPassword.value = "";
}




// function checkToken() {
//     let check = false;
//     if(userInfo.token !== ""){
//         check = true;
//     }
        
//     return check;
// }







