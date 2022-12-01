class Tag {
  constructor(tagId) {
    let me = this;
    me.tag = $(`#${tagId}`);
    // Khởi tạo sự kiện
    me.initEvent();
    // khởi tạo các options đã được chọn
    me.selectedOptions = new Set();
  }
  /**
   * Thực hiện xử lý sự kiện cho tag
   * Author: NPTINH (01/08/2022)
   */
  initEvent() {
    let me = this;
    try {
      // Xử lý sự kiện đóng mở tag
      me.tag.find(".tag__arrow-down").click(function () {
        me.tag.find(".tag__options").toggle();
      });
      me.tag.on("keypress", function (e) {
        if (e.which == 13) {
          me.tag.find(".tag__options").toggle();
        }
      });
      // Xử lý sự kiện checkbox
      me.tag.find(".tag__input-checkbox").click(function () {
        // Thêm option đã được chọn
        if ($(this).parent().find(".input-checkbox__input").prop("checked")) {
          me.addOptionChecked(this);
        }
        // Xóa option đã được chọn
        else {
          me.removeOptionChecked(this);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Thêm option đã được chọn
   * Author: NPTINH (01/08/2022)
   */
  addOptionChecked(inputCheckbox) {
    try {
      let me = this;
      // Lấy giá trị của option được click
      let value = $(inputCheckbox)
        .parent()
        .find(".input-checkbox__input")
        .val();
      if (value === "Tất cả") {
        me.selectedOptions.clear();
        me.tag.find(".input-checkbox__input").each(function () {
          $(this).prop("checked", true);
        });
      } else if (me.selectedOptions.has("Tất cả")) {
        return;
      }
      me.selectedOptions.add(value);
      $(inputCheckbox)
        .parent()
        .find(".input-checkbox__input")
        .prop("checked", true);
      // Render các options đã được chọn
      me.renderSelectedOptions();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Xóa option  được checked
   * Author: NPTINH (01/08/2022)
   */
  removeOptionChecked(inputCheckbox) {
    let me = this;
    let value = $(inputCheckbox).parent().find(".input-checkbox__input").val();
    if (value === "Tất cả") {
      me.tag.find(".input-checkbox__input").prop("checked", false);
    } else {
      me.tag
        .find(".input-checkbox__input[value='" + value + "']")
        .prop("checked", false);
      if (me.selectedOptions.has("Tất cả")) {
        me.selectedOptions.delete("Tất cả");
        me.tag
          .find(".input-checkbox__input[value='Tất cả']")
          .prop("checked", false);
        me.tag.find(".input-checkbox__input").each(function () {
          if ($(this).val() !== "Tất cả") {
            me.selectedOptions.add($(this).val());
          }
        });
      }
    }
    me.selectedOptions.delete(value);
    // Render các options đã được chọn
    me.renderSelectedOptions();
  }
  /**
   * Render các options đã được chọn
   * Author: NPTINH (01/08/2022)
   */
  renderSelectedOptions() {
    try {
      let me = this;
      me.tag.find(".tag__selected-items").empty();
      me.selectedOptions.forEach((selectedOption) => {
        me.tag.find(".tag__selected-items").append(
          `<div class="tag__selected-item">
                <div class="selected-item__text">${selectedOption}</div>
                <i class="fas fa-times selected-item__icon"></i>
            </div>`
        );
      });
      // Xử lý sự kiện xóa option tag
      $(".tag__selected-item").click(function () {
        // Lấy giá trị của option được click
        let value = $(this).find(".selected-item__text").text().trim();
        me.selectedOptions.delete(value);
        if (value === "Tất cả") {
          me.tag.find(".input-checkbox__input").prop("checked", false);
        }
        me.tag
          .find(".input-checkbox__input[value='" + value + "']")
          .prop("checked", false);
        // Render các options đã được chọn
        me.renderSelectedOptions();
      });
    } catch (error) {
      console.log(error);
    }
  }
}
