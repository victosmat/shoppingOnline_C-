class Teacher {
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
  /**
   * Khởi tạo form detail
   */
  initFormDetail(formId) {
    let me = this;
    me.formDetail = new TeacherDetail(formId);
  }
  /**
   * Dùng để khởi tạo các sự kiện cho trang
   * Author: NPTINH (01/08/2022)
   */
  initEvents() {
    let me = this;

    // Khởi tạo sự kiện cho hàng của bảng
    me.initCheckBoxRowEvents();
    // Khởi tạo sự kiện cho toolbar
    me.initToolbarEvents();
    // Khởi tạo sự kiện cho commandColumn
    me.initCommandColumnEvents();
  }
  /**
   * Khởi tạo sự kiện cho hàng của bảng
   */
  initCheckBoxRowEvents() {
    try {
      let me = this;
      // Khởi tạo sự kiện  click vào checkbox cho hàng của bảng
      me.grid.off("click", ".table__checkbox");
      me.grid.on("click", ".table__checkbox", function () {
        if ($(this).parent().prop("tagName") === "TD") {
          if ($(this).find("input").prop("checked")) {
            $(this).parents("tr").addClass("selected-tr");
            me.selectedRows.push($(this).parents("tr"));
            if (me.selectedRows.length === me.storedData.length) {
              me.grid.find("thead input").prop("checked", true);
            }
          } else {
            me.grid.find("thead input").prop("checked", false);
            $(this).parents("tr").removeClass("selected-tr");
            me.selectedRows = [
              ...me.selectedRows.filter((item) => {
                console.log(
                  item.attr("Id") === $(this).parents("tr").attr("Id")
                );
                return item.attr("Id") !== $(this).parents("tr").attr("Id");
              }),
            ];
          }
        }
        // xử lý nhấn nút checkbox chọn tất cả
        else {
          if ($(this).find("input").prop("checked")) {
            me.selectedRows = [];
            me.grid.find("tbody tr").each(function () {
              if ($(this).parent().prop("tagName") === "TBODY")
                me.selectedRows.push($(this));
              $(this).addClass("selected-tr");
              $(this).find("input").prop("checked", true);
            });
          } else {
            me.grid.find("tbody tr").each(function () {
              $(this).removeClass("selected-tr");
              $(this).find("input").prop("checked", false);
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Khởi tạo các sự kiện cho toolbar
   * Author: NPTINH (01/08/2022)
   */
  initToolbarEvents() {
    let me = this,
      toolbarId = me.grid.attr("ToolbarId");
    // Khởi tạo sự kiện cho nút thêm mới
    $(`#${toolbarId} [CommandType]`).off("click");
    $(`#${toolbarId} [CommandType]`).on("click", function () {
      let commandType = $(this).attr("CommandType");
      switch (commandType) {
        case Resource.CommandType.Add:
          me.add();
          break;
        case Resource.CommandType.Delete:
          $(".tool-bar__more").hide();
          me.delete(me.selectedRows);
          break;
        case Resource.CommandType.More:
          me.toggleMore();
          break;
        default:
          break;
      }
    });
  }
  /**
   * Khởi tạo sự kiện cho commandColumn
   * Author: NPTINH (03/08/2022)
   */
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
    // Khởi tạo sự kiện dbclick
    me.grid.off("dblclick", "tbody tr");
    me.grid.on("dblclick", "tbody tr", function () {
      me.edit($(this));
    });
  }
  /**
   * Khởi tạo sự kiện cho popup
   * Author: NPTINH (07/08/2022)
   */
  initPopupEvents(selectedTeachers) {
    let me = this,
      popupId = me.grid.attr("PopupId");
    // Khởi tạo sự kiện cho nút thêm mới
    $(`#${popupId} [CommandPopup]`).off("click");
    $(`#${popupId} [CommandPopup]`).on("click", function () {
      let commandPopup = $(this).attr("CommandPopup");
      switch (commandPopup) {
        case "Confirm":
          me.senReqDelete(selectedTeachers);
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
  /**
   * Thêm mới cán bộ/ giáo viên
   * Author: NPTINH (03/08/2022)
   */
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
  /**
   * Chỉnh sửa cán bộ/ giáo viên
   * Author: NPTINH (03/08/2022)
   */
  edit(selectedRow) {
    try {
      let me = this,
        data = {};
      // Lấy dữ liệu của hàng được chọn
      if (selectedRow) {
        me.storedData.forEach((element) => {
          if (element["TeacherId"] === selectedRow.attr("Id")) {
            data = element;
          }
        });
      }
      let param = {
        formMode: "Edit",
        data: data,
      };
      // Hiển thị form
      me.showForm(param);
    } catch (error) {
      console.log(error);
    }
  }
  delete(selectedTeachers) {
    try {
      let me = this;
      $(".popup-delete").show();
      // Khởi tạo sự kiện cho popup
      me.initPopupEvents(selectedTeachers);
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Gửi yêu cầu xóa cán bộ/ giáo viên
   * Author: NPTINH (07/08/2022)
   */
  senReqDelete(selectedTeachers) {
    let me = this;
    selectedTeachers.forEach((selectedTeacher) => {
      $.ajax({
        type: "DELETE",
        url: `http://localhost:5068/api/v1/Teachers/${selectedTeacher.attr(
          "Id"
        )}`,
        success: function (response) {
          try {
            me.showToast("success", "Xóa thành công");
            me.grid
              .find(`tbody tr[Id="${selectedTeacher.attr("Id")}"]`)
              .remove();
            me.selectedRows = [];
          } catch (error) {}
        },
        error: function (res) {
          me.showToast("fail", "Có lỗi xảy ra");
        },
      });
    });
  }
  /**
   * Hiển thị toast
   * Author: NPTINH (07/08/2022)
   */
  showToast(type, message) {
    try {
      let me = this;
      let toast = $(`.toast-message.toast--${type} `);
      toast.find(".toast__message").text(message);
      toast.show();
      setTimeout(function () {
        toast.hide();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Hiển thị form detail
   * Author: NPTINH (03/08/2022)
   */
  showForm(param) {
    let me = this;
    // Hiển thị form
    if (me.formDetail) {
      me.formDetail.open(param);
    }
  }
  /**
   * Hiển thị more
   * Author: NPTINH (03/08/2022)
   */
  toggleMore() {
    $(".tool-bar__more").toggle();
  }
  /**
   * Lấy dữ liệu
   * Author: NPTINH (03/08/2022)
   */
  getData() {
    let me = this;
    $.ajax({
      type: "GET",
      url: "http://localhost:5068/api/v1/Teachers",
      success: function (response) {
        me.renderData(response);
        me.storedData = response;
      },
      error: function (res) {
        console.log(res);
      },
    });
  }
  /**
   * Hiển thị dữ liệu
   * Author: NPTINH (03/08/2022)
   */
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
   * Author: NPTINH (03/08/2022)
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
          className = me.getClassFormat(dataType),
          th =
            $(`<th  class="col" FieldName=${fieldName} style="width: ${width}px"
                  DataType=${dataType} EnumName=${enumName}></th>`);

        th.text(text);
        th.addClass(className);

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
   * Author: NPTINH (03/08/2022)
   */
  renderTbody(data) {
    try {
      let me = this,
        tbody = $("<tbody></tbody>");

      if (data) {
        data.filter(function (item) {
          let tr = $(`<tr Id=${item["TeacherId"]} >
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
              value = me.getValueCell($(this), item, fieldName, dataType),
              className = me.getClassFormat(dataType);
            if (fieldName === "TeacherName") {
              className += " text-green";
            }
            if (dataType == Resource.DataTypeColumn.Boolean) {
              if (value === true) {
                td.addClass("cell-icon icon-check");
              }
            } else {
              td.text(value);
            }
            td.addClass(className);

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
  /**
   * Lấy giá trị cho ô
   * Author: NPTINH (03/08/2022)
   */
  getValueCell(col, item, fieldName, dataType) {
    let value = item[fieldName];
    if (value === null || value === "") {
      return "";
    }

    return value;
  }
  /**
   * Hàm dùng để lấy class format cho từng kiểu dữ liệu
   * Author: NPTINH (03/08/2022)
   */
  getClassFormat(dataType) {
    let className = "text-left";

    switch (dataType) {
      case Resource.DataTypeColumn.Number:
        className = "text-right";
        break;
      case Resource.DataTypeColumn.Date:
        className = "text-center";
        break;
    }

    return className;
  }
}
var teacher = new Teacher("gridTeacher");
teacher.initFormDetail("formTeacherDetail");
