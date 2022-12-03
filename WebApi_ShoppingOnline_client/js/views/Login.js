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
        alert("Có lỗi xảy ra!");
      } else if (response) {
        console.log(response);
        localStorage.setItem("username", response.username);
        window.location.href = "index.html";
      }
    });
  }
}

var login = new Login();
