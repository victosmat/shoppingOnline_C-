class Home {
  constructor() {
    let me = this;
    //me.initEvents();

    me.loadData();
  }

  loadData() {
    let me = this,
      url = "https://localhost:7008/api/Books/GetBook";
    $.ajax({
      type: "GET",
      url: url,
      success: function (response) {
        console.log(response);
        me.renderData(response);
      },
      error: function (res) {
        console.log(res);
      },
    });
  }

  renderData(data) {
    let me = this,
      cardContainer = $(".book-card-container");

    data.forEach((book) => {
      let cardHtml = $(`<div class="col-3 pb-3">
          <div class="book-card card" style="width: 18rem">
            <img
              src="../assets//images/deathly-hallows-us-childrens-edition.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${book.name + " - " + book.author}</h5>
              <p class="card-text">
               ${book.price}đ
              </p>
              <a href="#" class="btn btn-primary">Thêm vào giỏ</a>
            </div>
          </div>
        </div>`);
      cardContainer.append(cardHtml);
    });
  }
}

var home = new Home();
