function dangNhap() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || password == "") {
        alert("Please enter full information!");
    } else {
        var fetch = new Fetch();
        fetch.post("xac-thuc/dang-nhap", {
            username: username,
            password: password
        })
            .then(function (data) {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    alert("Đăng nhập thành công!");
                    window.location.href = "../trangchu";
                }
                else if (data.trangThai == -1) {
                    alert(data.loiNhan);
                }
            })
            .catch(function (err) {
                alert("Đã có lỗi xảy ra!");
                console.log(err);
            });
    }
}