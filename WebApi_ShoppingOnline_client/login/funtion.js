const i_username = document.getElementById("username");
const i_password = document.getElementById("password");

const submit = document.getElementById("submit");
console.log(i_password.value)
submit.addEventListener("click", async () => {
    const data = await _fecth.post('/api/Users/Signin', {
        password: i_password.value, username: i_username.value
    })

    if (!data) {
        console.log("DATA", data)
        return;
    }
    window.location = "../main/index.html";
})