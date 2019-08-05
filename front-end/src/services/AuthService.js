import store from "../store";
import axios from "axios";
import SwalAlert from "./SwalAlert";
const URL = "http://192.168.100.87:8082/";

export default {
  authChk(email) {
    return axios
      .get(URL + "ass/api/userSelect", { params: { email: email } })
      .then(response => {
        store.state.userAuth = response.data.authority;
        return response.data.authority;
      })
      .catch(error => {
        SwalAlert.swatAlert(
          "Error",
          "알수없는 에러가 발생했습니다!\
          (" + error + ")",
          "error",
          "Ok!"
        );
      });
  },
  getUserList() {
    return axios
      .get(URL + "ass/api/userAll")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        SwalAlert.swatAlert(
          "Error",
          "알수없는 에러가 발생했습니다!\
          (" + error + ")",
          "error",
          "Ok!"
        );
      });
  },
  userAuthUpdate(email, auth) {
    if (store.state.userAuth == "admin") {
      return axios
        .put(URL + "ass/api/userUpdate", { email: email, authority: auth })
        .then(response => {
          if (response.data.state == 1) {
            SwalAlert.swatAlert("Success", "변경되었습니다.", "success", "OK!");
          } else {
            SwalAlert.swatAlert(
              "Error",
              "알수없는 오류가 발생했습니다.",
              "error",
              "OK!"
            );
          }
        })
        .catch(error => {
          SwalAlert.swatAlert(
            "Error",
            "알수없는 에러가 발생했습니다!\
            (" +
              error.response +
              ")",
            "error",
            "Ok!"
          );
        });
    } else {
      SwalAlert.swatAlert("Error", "권한이 없습니다.", "error", "OK!");
    }
  },
  userDelete(email) {
    return axios
      .delete(URL + "ass/api/userDelete", { params: { email: email } })
      .then(() => {})
      .catch(() => {});
  },
  getCounts() {
    return axios
      .get(URL + "ass/api/counting")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        SwalAlert.swatAlert(
          "Error",
          "게시물 숫자를 가져오는데 에러가 발생했습니다!\
          (" +
            error.response +
            ")",
          "error",
          "Ok!"
        );
      });
  },
  userAuthInsert(email) {
    return axios
      .post(URL + "ass/api/userInsert", {
        email: email,
        authority: "guest"
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.response.data.message.includes("Duplicate entry")) {
          SwalAlert.swatAlert(
            "Error!",
            "이미 존재하는 이메일입니다.",
            "error",
            "Ok!"
          );
        } else {
          SwalAlert.swatAlert(
            "Error!",
            "예기치 않는 문제가 발생했습니다. 관리장게 문의 바랍니다. (" +
              error.response.data.message +
              ")",
            "error",
            "Ok!"
          );
        }
        return null;
      });
  },
  anotherProviderLogin(email) {
    axios
      .get(URL + "ass/api/userSelect", { params: { email: email } })
      .then(response => {
        if (response.data == "") {
          this.userAuthInsert(email);
          store.state.userAuth = "guest";
        } else {
          store.state.userAuth = response.data.authority;
        }
      })
      .catch(() => {
        this.userAuthInsert(email);
        store.state.userAuth = "guest";
      });
  }
};
