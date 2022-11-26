var url = "https://localhost:7008/api/Users/CheckLogin";

async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || password == "") {
        alert("Please enter full information!");
    } else {
        const res = await fetch(`${url}?username=${username}&password=${password}`, {
            method: 'POST',
        })
        // const data = await res.json()
        // console.log(res.status)
        if (res.status == 200) {
            alert("Logged in successfully");
            window.location = "/ShoppingMain/index.html";
        }
        else {

        }
        // console.log(data)
    }
}