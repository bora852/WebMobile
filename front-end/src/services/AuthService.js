import store from "../store";
import axios from "axios";
import SwalAlert from "./SwalAlert";
const URL = "http://192.168.100.87:8082/";

export default {
  // 권한 확인 함수
  authChk() {
    // store.state.user 사용
    var result = "admin";
    store.state.userAuth = result;
    return result;
  },
  // 유저리스트 가져오는 함수
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
  // 유저 권한 업데이트 함수
  userAuthUpdate(email, auth) {
    if (store.state.userAuth == "admin") {
      return axios
        .put(URL + "ass/api/userUpdate", {
          email: email,
          authority: auth
        })
        .then(response => {
          console.log(response);
          if (response.state == 1) {
            SwalAlert.swatAlert("Success", "변경되었습니다.", "success", "OK!");
          } else{
              SwalAlert.swatAlert("Error", "알수없는 오류가 발생했습니다.", "error", "OK!");
          }
        });
    }else {
      SwalAlert.swatAlert("Error", "권한이 없습니다.", "error", "OK!");
    }
    // if(result == null)
    // alert 실패
    return true;
  },
  // 유저 탈퇴 함수
  userDelete() {
    return true;
  },
  getCounts(){
    var result = { postCount: 100, portfolioCount: 5 };
    return result;
  }
};
