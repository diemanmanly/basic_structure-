import toastr from "../../assets/js/toastr/toastr";

let lastError = 0;
let lastErrorRange = 1000;

export const success = (message, title) => {
  toastr.success(message, title);
}

export const error = (message, title) => {
  toastr.error(message, title);
};

export const error2 = (message, title) => {
  var cur = +new Date();
  if (cur - lastError > lastErrorRange) {
    toastr.error(message, title);
  }
  lastError = cur;
};

export const info = (message, title) => {
  toastr.info(message, title);
};

export const warning = (message, title) => {
  toastr.warning(message, title);
};

export const confirm = (message, title, callback) => {
  var confirmModal = $("#rs-confirm-modal");
  var res = false;
  confirmModal.find(".tit").html(title);
  confirmModal.find(".msg").html(message);
  confirmModal.modal("show");
  confirmModal.find(".yes").off().click(function () {
    res = true;
  }).focus();
  confirmModal.unbind('shown.bs.modal').on('shown.bs.modal', function () {
    confirmModal.find(".yes").focus();
  });
  confirmModal.unbind('hidden.bs.modal').on('hidden.bs.modal', function () {
    callback(res);
  });
};
