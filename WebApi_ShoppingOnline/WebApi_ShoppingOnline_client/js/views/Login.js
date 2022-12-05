class Login {
  constructor() {
    let me = this;
    me.initEvents();
  }

  initEvents() {
    let me = this;
    $("#btnLogin").click(function () {
      me.login();
    });
  }
  login() {
    let me = this,
      username = $("#username").val(),
      password = $("#password").val(),
      url = "https://localhost:7008/api/Users/Signin",
      data = {
        Username: username,
        Password: password,
      };

    CommonFn.Ajax(url, "POST", data, "json", function (err, response) {
      if (err) {
        console.log(err);
        alert("Thông tin tài khoản hoặc mật khẩu không chính xác!");
      } else if (response) {
        console.log(response);
        localStorage.setItem("username", response.username);
        localStorage.setItem("userID", response.id);
        localStorage.setItem("position", response.position);
        if (response.position == "admin") {
          window.location.href = "bookmanagement.html";
        } else {
          window.location.href = "index.html";
        }
      }
    });
  }
}

var login = new Login();
