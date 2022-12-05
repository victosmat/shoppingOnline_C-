class BookPopup {
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

  open(param) {
    try {
      let me = this;
      Object.assign(me, param);
      if (me.data) {
        me.form.find("[FieldName]").each(function () {
          $(this).val(me.data[$(this).attr("FieldName")]);
        });
      }
      me.form.show();
    } catch (error) {
      console.log(error);
    }
  }

  save() {
    debugger;
    try {
      let me = this;
      let data = { ...me.getValueFromForm() },
        method = "POST",
        url = "https://localhost:7008/api/Books/InsertBook";
      if (me.formMode === "Edit") {
        method = "PUT";
        url = `https://localhost:7008/api/Books/updateBook`;
        data = { ...me.getValueFromForm(), id: me.data.id };
      }
      CommonFn.Ajax(url, method, data, "json", function (err, response) {
        if (err) {
          console.log(err);
        } else if (response) {
          me.jsCaller.getData();
          me.closeForm();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  getValueFromForm() {
    try {
      let me = this;
      let data = {};
      me.form.find("[FieldName]").each(function () {
        data[$(this).attr("FieldName")] = $(this).val();
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
