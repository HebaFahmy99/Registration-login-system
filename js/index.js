let loginPage = document.getElementById("loginPage");
let signUpPage = document.getElementById("signUpPage");

let signUpLink = document.querySelector("#loginPage a");
let signInLink = document.querySelector("#signUpPage a");

let logInBtn = document.querySelector("#loginPage button");
let signUpBtn = document.querySelector("#signUpPage button");

let signUpName = document.getElementById("nameRegisteration");
let signUpEmail = document.getElementById("emailRegisteration");
let signUpPassword = document.getElementById("passwordRegisteration");

let logInEmail = document.getElementById("emailLogIn");
let logInPassword = document.getElementById("passwordLogIn");

let UserList = []

if (localStorage.getItem('list') != null) {
    UserList = JSON.parse(localStorage.getItem('list'));
}

function signUp() {

    if (nameValidation() == true && emailValidation() == true && passwordValidation() == true) {
        let newUserList;
        newUserList = UserList.find((element) => {
            return element.email == signUpEmail.value
        })
        if (newUserList == undefined) {
            user = {
                name: signUpName.value,
                email: signUpEmail.value,
                password: signUpPassword.value
            }
            UserList.push(user);
            localStorage.setItem('list', JSON.stringify(UserList));
        }
        else {
            document.getElementById("email-incorrect").style.display = "block";
        }
    }
}


function clear() {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
}

function logIn() {
    for (let i = 0; i < UserList.length; i++) {
        if (logInEmail.value == UserList[i].email && logInPassword.value == UserList[i].password) {
            loginPage.classList.replace("d-block", "d-none");
            var temp = ` <div class="conitaner py-5 text-center">
            <div class="shadow-lg w-75 mx-auto py-5">
                <h1 class="fw-bold">Welcome ${UserList[i].name} </h1>
                <div class="d-flex justify-content-end me-4"> 
                    <button type="button"  onclick="logOut()" class=" btn btn-outline py-2 px-3">Log Out</button>
                </div>
            </div>
        </div>`
            document.getElementById("page-info").innerHTML = temp;
        }
        else {
            document.getElementById("info-incorrect").style.display = "block";
        }
    }
}

function logOut() {
    console.log(signUpLink);
    window.location.href = signUpLink;
}

logInBtn.addEventListener("click", logIn);


signUpBtn.addEventListener("click", function () {
    signUp();
    clear();
})

signUpLink.addEventListener("click", function () {
    loginPage.classList.replace("d-block", "d-none");
    signUpPage.classList.replace("d-none", "d-block");
})

signInLink.addEventListener("click", function () {
    signUpPage.classList.replace("d-block", "d-none");
    loginPage.classList.replace("d-none", "d-block");
})

signUpName.addEventListener("blur", nameValidation);
signUpEmail.addEventListener("blur", emailValidation);
signUpPassword.addEventListener("blur", passwordValidation);

function nameValidation() {
    const regexName = /^[a-zA-Z ]{2,30}$/;
    if (regexName.test(signUpName.value) == true) {
        signUpName.classList.add("is-valid");
        signUpName.classList.remove("is-invalid");
        return true;
    }
    else {
        signUpName.classList.add("is-invalid");
        signUpName.classList.remove("is-valid");
        return false;

    }
}
function emailValidation() {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(signUpEmail.value) == true) {
        signUpEmail.classList.add("is-valid");
        signUpEmail.classList.remove("is-invalid");
        return true;
    }
    else {
        signUpEmail.classList.add("is-invalid");
        signUpEmail.classList.remove("is-valid");
        return false;

    }
}
function passwordValidation() {
    const regexPassword = /^[A-Za-z0-9]{7,14}$/;
    if (regexPassword.test(signUpPassword.value) == true) {
        signUpPassword.classList.add("is-valid");
        signUpPassword.classList.remove("is-invalid");
        return true;
    }
    else {
        signUpPassword.classList.add("is-invalid");
        signUpPassword.classList.remove("is-valid");
        return false;

    }
}






