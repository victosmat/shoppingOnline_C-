class Cart {
  constructor() {
    let me = this;
    me.grid = $("#cart-grid");
    me.selectedRecords = [];
    me.container = $("body");
    me.getData();
    me.initEvents();
    me.loadUser();
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
      $(".btnLogin").hide();
      $(".header__username").show();
      $(".header__username").text(username);
      $(".header__avatar").show();
    }
  }
  initFormDetail(formId) {
    let me = this;
    me.formDetail = new OrderPopup(formId);
  }
  initEvents() {
    var me = this;
    me.container.on("click", ".logout", function () {
      localStorage.removeItem("userID");
      localStorage.removeItem("position");
      localStorage.removeItem("username");
      me.loadUser();
      window.location.href = "login.html";
    });
    // Khởi tạo sự kiện cho nút tăng số lượng và giảm số lượng sản phẩm
    me.container.off("click", ".btn-increase");
    me.container.on("click", ".btn-increase", function () {
      var newValue =
        parseInt($(this).parent().find(".book-item-quantity").text()) + 1;
      $(this).parent().find(".book-item-quantity").text(newValue);
      me.updateQuantity($(this).attr("Id"), newValue);
    });
    me.container.off("click", ".btn-descrease");
    me.container.on("click", ".btn-descrease", function () {
      var newValue =
        Math.max(
          2,
          parseInt($(this).parent().find(".book-item-quantity").text())
        ) - 1;
      $(this).parent().find(".book-item-quantity").text(newValue);
      // thực hiện gọi api cập nhật số lượng sản phẩm trong giỏ hàng
      me.updateQuantity($(this).attr("Id"), newValue);
    });

    // Khởi tạo sự kiện cho nút xóa
    me.container.off("click", ".command-delete");
    me.container.on("click", ".command-delete", function () {
      me.delete($(this).parents("tr"));
    });

    // Khởi tạo sự kiện nút đặt hàng
    me.container.off("click", ".btn-order");
    me.container.on("click", ".btn-order", function () {
      me.order();
    });
    me.initCheckBoxRowEvents();
  }
  initCheckBoxRowEvents() {
    try {
      let me = this;
      // Khởi tạo sự kiện  click vào checkbox cho hàng của bảng
      me.grid.off("click", ".table__checkbox");
      me.grid.on("click", ".table__checkbox", function () {
        me.selectedRecords = [
          ...me.selectedRecords,
          $(this).parents("tr").attr("Id"),
        ];
      });
    } catch (error) {
      console.log(error);
    }
  }
  order() {
    var me = this;
    if (me.selectedRecords.length === 0) {
      alert("Vui lòng chọn sản phẩm để đặt hàng");
      return;
    }
    var data = me.selectedRecords.map((item) => parseInt(item));
    CommonFn.Ajax(
      "https://localhost:7008/api/Order/AddBookInCartToOrderAndPay",
      "POST",
      data,
      "json",
      function (err, response) {
        if (err) {
          console.log(err);
        } else if (response) {
          console.log(response);
          me.formDetail.open(response);
          data.forEach((item) => {
            me.grid.find(`tbody tr[Id="${item}"]`).remove();
          });
          me.selectedRecords = [];
        }
      }
    );
  }

  delete(selectedRecord) {
    var me = this;
    $.ajax({
      type: "DELETE",
      url: `https://localhost:7008/api/Cart/DeleteBooksInCart/${selectedRecord.attr(
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
  /**
   * Goọi api cập nhật số lượng sản phẩm trong giỏ hàng
   */
  updateQuantity(id, quantity) {
    let me = this;
    $.ajax({
      type: "PUT",
      url: `https://localhost:7008/api/Cart/UpdateNumberOfBookInCart/${id}/${quantity}`,
      success: function (response) {
        console.log(response);
      },
      error: function (res) {
        console.log(res);
      },
    });
  }
  async getData() {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      return;
    }
    let cartId = await new Promise((resolve) => {
      let url = `https://localhost:7008/api/Cart/GetCartIDByUserID/${userID}`;
      $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
          console.log(response);
          resolve(response);
        },
        error: function (res) {
          console.log(res);
        },
      });
    });
    let me = this;
    let books = [];
    let bookItems = [];
    await new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: `https://localhost:7008/api/Cart/GetBooksInCart/${cartId}`,
        success: function (response) {
          console.log(response);
          resolve();
          bookItems = [...response];
        },
        error: function (res) {
          console.log(res);
          reject();
        },
      });
    });
    for (const item of bookItems) {
      await new Promise((resolve, reject) => {
        $.ajax({
          type: "GET",
          url: `https://localhost:7008/api/Books/GetBooksById/${item.bookID}`,
          success: function (response) {
            resolve();
            books.push({
              ...response,
              quantity: item.numberOfBooks,
              cartBookId: item.id,
            });
          },
          error: function (res) {
            console.log(res);
            reject();
          },
        });
      });
    }
    me.renderData(books);
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
        <th style="width: 50px" class="text-center">
                   
                  </th>
                <th class="col" fieldname="id" style="width: 50px" >ID</th>
                <th class="col" style="width: 150px">Tên sách</th><th class="col"  style="width: 150px" >Tác giả</th><th class="col" fieldname="price" style="width: 100px" >Giá</th><th class="col" fieldname="category" style="width: 100px" >Thể loại</th><th class="col" fieldname="imageUrl" style="width: 150px" >Ảnh</th> <th style="width: 50px"></th></tr></thead>`);

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
          let tr = $(`
          
          <tr Id=${item.cartBookId}>
           <td class="text-center">
                    <div class="input-checkbox table__checkbox">
                      <input
                        type="checkbox"
                        id="checkbox"
                        class="input-checkbox__input"
                        name="sex"
                        value="checkbox"
                      />
                      <div class="input-checkbox__checkmark"></div>
                    </div>
                  </td>
        <td fieldname="id">${item.id}</td><td >${item.name}</td><td >${item.author}</td><td fieldname="price">${item.price}đ</td><td fieldname="category">${item.category}</td><td fieldname="imageUrl"><img src="${item.imageUrl}" style="width: 100%"></td><td class="text-center">
                    <div class="table__command">
                     <button
                     Id=${item.cartBookId}
                      type="button"
                      class="btn-change-number btn-descrease btn btn-outline-dark"
                    >
                      -
                    </button>
                    <span class="book-item-quantity">${item.quantity}</span>
                    <button
                     Id=${item.cartBookId}
                      type="button"
                      class="btn-change-number btn-increase btn btn-outline-dark"
                    >
                      +
                    </button>
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
}
var cart = new Cart();
cart.initFormDetail("orderPopup");
