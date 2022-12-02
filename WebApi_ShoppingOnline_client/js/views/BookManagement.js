class BookManagement {
  // hàm khởi tạo
  constructor(gridId) {
    let me = this;

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
        thead = $("<thead></thead>"),
        tr = $(`<tr>
              <th style="width: 50px" class="text-center">
                    <div class="input-checkbox table__checkbox">
                      <input
                        type="checkbox"
                        id="checkbox"
                        class="input-checkbox__input"
                        value="checkbox"
                      />
                      <div class="input-checkbox__checkmark"></div>
                    </div>
                  </th>
                </tr>`);
      // Duyệt từng cột để render header
      me.grid.find(".col").each(function () {
        let text = $(this).text(),
          dataType = $(this).attr("DataType"),
          fieldName = $(this).attr("FieldName"),
          enumName = $(this).attr("EnumName"),
          width = $(this).attr("Width"),
          th =
            $(`<th  class="col" FieldName=${fieldName} style="width: ${width}px"
                  DataType=${dataType} EnumName=${enumName}></th>`);

        th.text(text);

        tr.append(th);
      });
      tr.append(` <th style="width: 70px"></th>`);
      thead.append(tr);

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
          let tr = $(`<tr Id=${item["id"]} >
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
        </tr>`);
          me.grid.find(".col").each(function () {
            let fieldName = $(this).attr("FieldName"),
              dataType = $(this).attr("DataType"),
              td = $(`<td  FieldName=${fieldName}></td>`),
              value = me.getValueCell($(this), item, fieldName, dataType);
            if (fieldName == "imageUrl") {
              td.append(`<img src="${value}" style="width: 100px" />`);
            } else td.text(value);

            tr.append(td);
          });
          tr.append(`<td class="text-center">
                    <div class="table__command">
                      <div class="command-edit">
                        <i class="fa-regular fa-pen table-icon-edit"></i>
                      </div>
                      <div class="command-delete">
                        <i
                          class="fa-regular fa-trash-can table-icon-delete"
                        ></i>
                      </div>
                    </div>
                  </td>`);
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
