class Home {
  constructor() {
    let me = this;
    //me.initEvents();
    me.container = $("body");
    me.pageNumber = 1;
    me.loadData();
    me.initEvents();
    me.loadUser();
  }

  initEvents() {
    var me = this;
    me.container.on("click", ".logout", function () {
      localStorage.removeItem("userID");
      localStorage.removeItem("username");
      localStorage.removeItem("position");
      me.loadUser();
    });
    me.container.off("click", ".btn-increase");
    me.container.on("click", ".btn-increase", function () {
      $(this)
        .parent()
        .find(".book-item-quantity")
        .text(
          parseInt($(this).parent().find(".book-item-quantity").text()) + 1
        );
    });
    me.container.off("click", ".btn-descrease");
    me.container.on("click", ".btn-descrease", function () {
      $(this)
        .parent()
        .find(".book-item-quantity")
        .text(
          Math.max(
            2,
            parseInt($(this).parent().find(".book-item-quantity").text())
          ) - 1
        );
    });

    me.container.off("click", ".btnAddToCart");
    me.container.on("click", ".btnAddToCart", function () {
      const bookId = $(this).attr("Id");
      const quantity = $(this).parent().find(".book-item-quantity").text();
      me.addToCart(bookId, quantity);
    });

    me.container.off("click", ".category");
    me.container.on("click", ".category", function () {
      debugger;
      me.getBookByCategory($(this)[0].innerText);
    });
    me.container.off("click", ".btnSearch");
    me.container.on("click", ".btnSearch", function () {
      debugger;
      me.getBookByKeyWord($(".search-input").val());
    });
  }
  getBookByKeyWord(keyword) {
    var me = this;
    $.ajax({
      type: "GET",
      url: `https://localhost:7008/api/Books/GetBookByKeyword/${keyword}`,
      success: function (response) {
        console.log(response);
        me.renderData([
          ...response.map((item) => {
            return { ...item, quantity: 1 };
          }),
        ]);
      },
      error: function (res) {
        console.log(res);
      },
    });
  }
  getBookByCategory(category) {
    var me = this;
    $.ajax({
      type: "GET",
      url: `https://localhost:7008/api/Books/GetBookByCategory/${category}`,
      success: function (response) {
        console.log(response);
        me.renderData([
          ...response.map((item) => {
            return { ...item, quantity: 1 };
          }),
        ]);
      },
      error: function (res) {
        console.log(res);
      },
    });
  }

  async addToCart(bookId, quantity) {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      alert("Bạn chưa đăng nhập");
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

    let me = this,
      url = `https://localhost:7008/api/Cart/AddBooksToCart/${cartId}/${bookId}/${quantity}`;

    $.ajax({
      type: "POST",
      url: url,
      success: function (response) {
        console.log(response);
        alert("Thêm vào giỏ thành công");
      },
      error: function (res) {
        alert(res.responseText);
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
    } else {
      $(".btnLogin").hide();
      $(".header__username").show();
      $(".header__username").text(username);
      $(".header__avatar").show();
    }
  }
  loadData() {
    let me = this,
      url = "https://localhost:7008/api/Books/GetBook/1/1000";
    $.ajax({
      type: "GET",
      url: url,
      success: function (response) {
        console.log(response);
        me.renderData([
          ...response.map((item) => {
            return { ...item, quantity: 1 };
          }),
        ]);
      },
      error: function (res) {
        console.log(res);
      },
    });
  }

  renderCategory(data) {
    var me = this;
    data.forEach((category) => {
      var html = `<span class="category">${category}</span>`;
      $(".category-container").append(html);
    });
  }

  renderData(data) {
    let me = this,
      cardContainer = $(".book-card-container");
    cardContainer.empty();
    data.forEach((book) => {
      let cardHtml = $(`<div class="col-3 pb-3">
          <div class="book-card card" style="width: 18rem">
            <div class="img-wrapper"><img
              src="${book.imageUrl}"
              class="card-img-top"
              alt="..."
            /></div>
            <div class="card-body">
              <h5 class="card-title">
                <div>${book.name}</div>
              </h5>
              <p class="card-text">
              Tác giả: ${book.author}
              </p>
              <p class="card-text">
               Giá: ${book.price}đ
              </p>
              <p class="card-text">
             Thể loại:  ${book.category}
              </p>
            <div class='card-footer'>
               <button
                      type="button"
                      Id=${book.id}
                      class="btn-change-number btn-descrease btn btn-outline-dark"
                    >
                      -
                    </button>
                    <span class="book-item-quantity">${book.quantity}</span>
                    <button
                     Id=${book.id}
                      type="button"
                      class="btn-change-number btn-increase btn btn-outline-dark"
                    >
                      +
                    </button>
              
              <button    Id=${book.id} class="btn btn-primary btnAddToCart">Thêm vào giỏ</button>
            </div>
            </div>
          </div>
        </div>`);
      cardContainer.append(cardHtml);
    });
  }
}

var home = new Home();
