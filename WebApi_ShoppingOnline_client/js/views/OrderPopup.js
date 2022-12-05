class OrderPopup {
  constructor(formId) {
    let me = this;
    // Lưu lại form đang thao tác
    me.form = $(`#${formId}`);
    // Khởi tạo các sự kiện
    me.initEvents();

    me.jsCaller = null;
  }

  initEvents() {
    try {
      let me = this;
      me.initCommandForm();
    } catch (error) {
      console.log(error);
    }
  }
  initCommandForm() {
    let me = this;
    me.form.find("[CommandForm]").each(function () {
      $(this).off("click");
      $(this).on("click", function () {
        let command = $(this).attr("CommandForm");
        switch (command) {
          case "Save":
            me.save();
            break;
          case "Close":
            me.closeForm();
            break;
        }
      });
    });
  }
  closeForm() {
    try {
      let me = this;
      me.data = null;
      me.form.hide();
      // Reset lại form
      me.form.trigger("reset");
    } catch (error) {
      console.log(error);
    }
  }

  open(data) {
    debugger;
    try {
      let me = this;
      me.form.find("[FieldName]").each(function () {
        if ($(this).attr("FieldName") === "date") {
          $(this).val(
            new Date(data[$(this).attr("FieldName")]).toISOString().slice(0, 10)
          );
        } else $(this).val(data[$(this).attr("FieldName")]);
      });
      $(".customerName").val(localStorage.getItem("username"));
      me.form.show();
    } catch (error) {
      console.log(error);
    }
  }
}
