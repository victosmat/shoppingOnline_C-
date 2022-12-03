class Signup {
  constructor() {
    let me = this;
    me.initEvents();
  }
  initEvents() {
    let me = this;
    $("#btnSignup").click(function () {
      me.signup();
    });
  }
  signup() {
    let me = this,
      username = $("#username").val(),
      password = $("#password").val(),
      confirm_password = $("#confirm_password").val(),
      email = $("#email").val(),
      phoneNumber = $("#phoneNumber").val(),
      dateOfBirth = $("#dateOfBirth").val(),
      address = $("#address").val(),
      gender = $("#gender").val(),
      name = $("#name").val(),
      url = "https://localhost:7008/api/Users/InsertUser",
      data = {
        Username: username,
        Password: password,
        Email: email,
        PhoneNumber: phoneNumber,
        Address: address,
        DateOfBirth: !dateOfBirth ? null : dateOfBirth,
        Gender: gender,
        Name: name,
      };

    CommonFn.Ajax(url, "POST", data, "json", function (err, response) {
      if (err) {
        console.log(err);
        alert("Có lỗi xảy ra!");
      } else if (response) {
        console.log(response);
        window.location.href = "login.html";
        $("#signupForm").trigger("reset");
      }
    });
  }
}
var sigup = new Signup();
