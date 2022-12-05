class UserManagement {
  constructor(gridId) {
    var me = this;
    // Lưu lại grid đang thao tác
    me.grid = $(`#${gridId}`);
    me.container = $(`body`);
    // lấy dữ liệu
    me.getData();
    // Dùng khởi tạo sự kiện
    me.initEvents();
    // khởi tạo form detail
    me.formDetail = null;
    // khởi tạo hàng được chọn
    me.selectedRows = [];
    // khởi tạo dữ liệu grid
    me.storedData = [];
  }
  initEvents() {
    let me = this;

    me.loadUser();
    debugger;
    me.container.off("change", ".position");
    me.container.on("change", ".position", function () {
      me.updateUser($(this).val(), $(this).parents("tr").attr("Id"));
    });
    me.initCommandColumnEvents();
    me.container.on("click", ".logout", function () {
      localStorage.removeItem("userID");
      localStorage.removeItem("username");
      localStorage.removeItem("position");
      me.loadUser();
    });
  }

  initCommandColumnEvents() {
    let me = this;
    // Khởi tạo sự kiện cho nút xóa
    me.grid.off("click", ".command-delete");
    me.grid.on("click", ".command-delete", function () {
      me.delete($(this).parents("tr"));
    });
  }
  delete(selectedRecord) {
    var me = this;
    $.ajax({
      type: "DELETE",
      url: `https://localhost:7008/api/Users/DeleteUser/${selectedRecord.attr(
        "Id"
      )}`,
      success: function (response) {
        try {
          me.grid.find(`tbody tr[Id="${selectedRecord.attr("Id")}"]`).remove();
          me.selectedRows = [];
          alert("Xóa thành công");
        } catch (error) {}
      },
      error: function (res) {
        console.log(res);
      },
    });
  }
  loadUser() {
    var me = this;
    const username = localStorage.getItem("username");
    if (!username) {
      $(".btnLogin").show();
      $(".header__username").hide();
      $(".header__avatar").hide();

      window.location.href = "login.html";
    } else {
      if (localStorage.getItem("position") !== "admin") {
        // window.location.href = "login.html";
      }

      $(".btnLogin").hide();
      $(".header__username").show();
      $(".header__username").text(username);
      $(".header__avatar").show();
    }
  }
  getData() {
    let me = this;
    $.ajax({
      type: "GET",
      url: "https://localhost:7008/api/Users/GetUser",
      success: function (response) {
        me.renderData(response);

        me.storedData = response;
      },
      error: function (res) {
        console.log(res);
      },
    });
  }
  renderData(data) {
    try {
      let me = this,
        table = $(`<table class="table"></table>`),
        thead = me.renderThead(),
        tbody = me.renderTbody(data);

      table.append(thead);
      table.append(tbody);
      me.grid.html(table);
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Render header
   */
  renderThead() {
    try {
      let me = this,
        thead = $(`<thead><tr>
                <th class="col" fieldname="id" style="width: 50px" >ID</th><th class="col" style="width: 150px">Tên người dùng</th><th class="col"  style="width: 150px" >Địa chỉ</th><th class="col" fieldname="price" style="width: 100px" >Ngày sinh</th><th class="col" fieldname="phoneNumber" style="width: 100px" >Số điện thoại</th><th class="col"  style="width: 150px" >email</th> <th style="width: 50px">Chức vụ</th><th style="width: 50px"></th></tr></thead>`);

      return thead;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Render tbody
   */
  renderTbody(data) {
    try {
      let me = this,
        tbody = $("<tbody></tbody>");

      if (data) {
        data.filter(function (item) {
          let tr = $(`<tr Id=${item.id}>
          
        <td fieldname="id">${item.id}</td><td >${item.name}</td><td >${
            item.address
          }</td><td fieldname="price">${
            item.dateOfBirth == null
              ? ""
              : new Date(item.dateOfBirth).toISOString().slice(0, 10)
          }</td><td fieldname="category">${item.phoneNumber}</td><td >${
            item.email
          }</td><td >
          
<select title="position" name="position" class="position">
  <option value="customer" ${
    item.position === "customer" ? "selected" : ""
  }>Customer</option>
  <option value="admin" ${
    item.position === "admin" ? "selected" : ""
  }>Admin</option>
  
</select>
          
          
          </td>
          
          <td class="text-center">
                    <div class="table__command">
                      <div class="command-delete">
                        <svg class="svg-inline--fa fa-trash-can table-icon-delete" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-can" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"></path></svg><!-- <i class="fa-regular fa-trash-can table-icon-delete"></i> -->
                      </div>
                    </div>
                </td></tr>`);

          tbody.append(tr);
        });
      }

      return tbody;
    } catch (error) {
      console.log(error);
    }
  }

  getValueCell(col, item, fieldName, dataType) {
    let value = item[fieldName];
    if (value === null || value === "") {
      return "";
    }

    return value;
  }
  updateUser(value, userID) {
    var me = this,
      url = `https://localhost:7008/api/Users/updatePosition/${userID}`,
      data = value;
    CommonFn.Ajax(url, "PUT", data, "json", function (err, response) {
      if (err) {
        console.log(err);
      } else if (response) {
        console.log(response);
      }
    });
  }
}

var userManagement = new UserManagement("userGrid");
