import Swal from "sweetalert2";

export default {
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
