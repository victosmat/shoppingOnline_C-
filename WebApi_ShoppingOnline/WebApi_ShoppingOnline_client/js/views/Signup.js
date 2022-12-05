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
      gender = $('input[name="gender"]:checked').val(),
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
    if (password != confirm_password) {
      alert("Mật khẩu không khớp");
      return;
    }
    CommonFn.Ajax(url, "POST", data, "json", function (response) {
      if (response) {
        if (response.status == 201) {
          window.location.href = "Login.html";
        } else {
          alert(response.responseText);
        }
      }
    });
  }
}
var sigup = new Signup();
