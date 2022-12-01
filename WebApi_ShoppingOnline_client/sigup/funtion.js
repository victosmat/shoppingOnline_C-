const i_name = document.getElementById("name");
const i_address = document.getElementById("address");
const i_dateOfBirth = document.getElementById("dateOfBirth");
const i_email = document.getElementById("email");
const i_phoneNumber = document.getElementById("phoneNumber");
const i_username = document.getElementById("username");
const i_password = document.getElementById("password");
const i_confirm_password = document.getElementById("confirm_password");

if (i_password != i_confirm_password) {
    alert("wrong password information!");
} else {
    const submit = document.getElementById("submit");
    console.log(i_password.value)
    submit.addEventListener("click", async () => {
        const data = await _fecth.post('/api/Users/InsertUser', {
            name: i_name.value,
            address: i_address.value,
            dateOfBirth: i_dateOfBirth.value,
            email: i_email.value,
            phoneNumber: i_phoneNumber.value,
            password: i_password.value,
            username: i_username.value
        })

        if (!data) {
            console.log("DATA", data)
            return;
        }
        window.location = "../main/index.html";
    })
}