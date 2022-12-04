class BookManagement {
  // hàm khởi tạo
  constructor(gridId) {
    let me = this;
    me.container = $(`body`);

    // Lưu lại grid đang thao tác
    me.grid = $(`#${gridId}`);
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

    me.initToolbarEvents();
    me.initCommandColumnEvents();
    me.loadUser();
    me.container.on("click", ".logout", function () {
      localStorage.removeItem("userID");
      localStorage.removeItem("username");
      localStorage.removeItem("position");
      me.loadUser();
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

  initFormDetail(formId) {
    let me = this;
    me.formDetail = new BookPopup(formId);
  }
  getData() {
    let me = this;
    $.ajax({
      type: "GET",
      url: "https://localhost:7008/api/Books/GetBook",
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
                <th class="col" fieldname="id" style="width: 50px" >ID</th><th class="col" style="width: 150px">Tên sách</th><th class="col"  style="width: 150px" >Tác giả</th><th class="col" fieldname="price" style="width: 100px" >Giá</th><th class="col" fieldname="category" style="width: 100px" >Thể loại</th><th class="col" fieldname="imageUrl" style="width: 150px" >Ảnh</th> <th style="width: 50px"></th></tr></thead>`);

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
          
        <td fieldname="id">${item.id}</td><td >${item.name}</td><td >${item.author}</td><td fieldname="price">${item.price}đ</td><td fieldname="category">${item.category}</td><td fieldname="imageUrl"><img src="${item.imageUrl}" style="width: 100%"></td><td class="text-center">
                    <div class="table__command">
                      <div class="command-edit">
                        <svg class="svg-inline--fa fa-pen table-icon-edit" aria-hidden="true" focusable="false" data-prefix="far" data-icon="pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M58.57 323.5L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C495.8 61.87 498.5 65.24 500.9 68.79C517.3 93.63 514.6 127.4 492.7 149.3L188.5 453.4C187.2 454.7 185.9 455.1 184.5 457.2C174.9 465.7 163.5 471.1 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L58.57 323.5zM82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L383 191L320.1 128.1L92.51 357.4C91.92 358 91.35 358.6 90.8 359.3C86.94 363.6 84.07 368.8 82.42 374.4L82.42 374.4z"></path></svg><!-- <i class="fa-regular fa-pen table-icon-edit"></i> -->
                      </div>
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

  /**
   * Khởi tạo các sự kiện cho toolbar
   */
  initToolbarEvents() {
    let me = this,
      toolbarId = me.grid.attr("ToolbarId");
    // Khởi tạo sự kiện cho nút thêm mới
    $(`#${toolbarId} [CommandType]`).off("click");
    $(`#${toolbarId} [CommandType]`).on("click", function () {
      let commandType = $(this).attr("CommandType");
      switch (commandType) {
        case "Add":
          me.add();
          break;
        default:
          break;
      }
    });
  }

  add() {
    try {
      let me = this;
      let param = {
        formMode: "Add",
        jsCaller: me,
      };
      // Hiển thị form
      me.showForm(param);
    } catch (error) {
      console.log(error);
    }
  }

  showForm(param) {
    let me = this;
    // Hiển thị form
    if (me.formDetail) {
      me.formDetail.open(param);
    }
  }
  initCommandColumnEvents() {
    let me = this;
    // Khởi tạo sự kiện cho nút xóa
    me.grid.off("click", ".command-delete");
    me.grid.on("click", ".command-delete", function () {
      me.delete([$(this).parents("tr")]);
    });
    // Khởi tạo sự kiện cho nút chỉnh sửa
    me.grid.off("click", ".command-edit");
    me.grid.on("click", ".command-edit", function () {
      me.edit($(this).parents("tr"));
    });
  }
  delete(selectedRecords) {
    try {
      let me = this;
      $(".popup-delete").show();
      // Khởi tạo sự kiện cho popup
      me.initPopupEvents(selectedRecords);
    } catch (error) {
      console.log(error);
    }
  }
  edit(selectedRow) {
    debugger;
    try {
      let me = this,
        data = {};
      // Lấy dữ liệu của hàng được chọn
      if (selectedRow) {
        me.storedData.forEach((element) => {
          if (element["id"] == selectedRow.attr("Id")) {
            data = element;
          }
        });
      }
      let param = {
        formMode: "Edit",
        data: data,
        jsCaller: me,
      };
      // Hiển thị form
      me.showForm(param);
    } catch (error) {
      console.log(error);
    }
  }
  initPopupEvents(selectedRecords) {
    let me = this,
      popupId = me.grid.attr("PopupId");
    // Khởi tạo sự kiện cho nút thêm mới
    $(`#${popupId} [CommandPopup]`).off("click");
    $(`#${popupId} [CommandPopup]`).on("click", function () {
      let commandPopup = $(this).attr("CommandPopup");
      switch (commandPopup) {
        case "Confirm":
          me.senReqDelete(selectedRecords);
          $(`#${popupId}`).hide();

          break;
        case "Cancel":
          $(`#${popupId}`).hide();
          break;
        default:
          break;
      }
    });
  }
  senReqDelete(selectedRecords) {
    let me = this;
    selectedRecords.forEach((selectedRecord) => {
      $.ajax({
        type: "DELETE",
        url: `https://localhost:7008/api/Books/DeleteBook/${selectedRecord.attr(
          "Id"
        )}`,
        success: function (response) {
          try {
            me.grid
              .find(`tbody tr[Id="${selectedRecord.attr("Id")}"]`)
              .remove();
            me.selectedRows = [];
            alert("Xóa thành công");
          } catch (error) {}
        },
        error: function (res) {
          console.log(res);
        },
      });
    });
  }
}

var bookManagement = new BookManagement("bookGrid");
bookManagement.initFormDetail("bookPopup");
