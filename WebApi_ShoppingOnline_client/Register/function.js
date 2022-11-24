let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btnSignup = document.querySelector(".btn-signup");
let btnLogin = document.querySelector(".btn-login");

btnSignup.addEventListener("click", (e) => {
    e.preventDefault();
    let users = {
        username: username.value,
        email: email.value,
        password: password.value,
    };
    let json = JSON.stringify(users);
    if (!username.value || !email.value || !password.value) {
        alert("vui long nhap day du thong tin");
    } else {
        localStorage.setItem(username.value, json);
        alert("dang ky thanh cong");
    }
});