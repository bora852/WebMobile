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
  },
  alertOffline() {
    Swal.fire({
      title: "Error",
      text: "오프라인에서는 지원하지 않는 기능입니다.",
      type: "error",
      confirmButtonText: "ok!"
    });
  }
};
