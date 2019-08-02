import Swal from "sweetalert2";
// import SwalAlert from "../services/SwalAlert";

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
