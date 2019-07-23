import Swal from "sweetalert2";

export default {
  // SwalAlert.swatAlert("Error", "잘못된 접근입니다", "error","OK!");
  swatAlert(title, text, type, confirmButtonText) {
    Swal.fire({
      title: title,
      text: text,
      type: type,
      confirmButtonText: confirmButtonText
    });
  }
};
