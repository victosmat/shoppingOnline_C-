var CommonFn = CommonFn || {};
// Hàm ajax gọi lên server lấy dữ liệu
CommonFn.Ajax = (url, method, data, dataType, fnCallBack, async = true) => {
  $.ajax({
    url: url,
    method: method,
    async: async,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    crossDomain: true,
    contentType: "application/json;charset=utf-8",
    dataType: dataType,
    success: function (response) {
      fnCallBack(null, response);
    },
    error: function (errormessage) {
      fnCallBack(errormessage, null);
      console.log(errormessage.responseText);
    },
  });
};
