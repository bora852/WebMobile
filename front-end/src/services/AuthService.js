import store from "../store";
import SwalAlert from "../services/SwalAlert";

export default {
  // 권한 확인 함수
  authChk() {
    var result = "admin";
    store.state.userAuth = result;
    return result;
  },
  // 유저리스트 가져오는 함수
  getUserList() {
    var tmpDate = "2019/07/23 18:00:00";
    var result = [
      { email: "admin@ssafy.com", authority: "admin", date: tmpDate },
      { email: "test000@ssafy.com", authority: "team", date: tmpDate },
      { email: "test001@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test002@ssafy.com", authority: "team", date: tmpDate },
      { email: "test003@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test004@ssafy.com", authority: "team", date: tmpDate },
      { email: "test005@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test006@ssafy.com", authority: "team", date: tmpDate },
      { email: "test007@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test008@ssafy.com", authority: "team", date: tmpDate },
      { email: "test009@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test010@ssafy.com", authority: "team", date: tmpDate },
      { email: "test011@ssafy.com", authority: "team", date: tmpDate },
      { email: "test012@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test013@ssafy.com", authority: "team", date: tmpDate },
      { email: "test014@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test015@ssafy.com", authority: "team", date: tmpDate },
      { email: "test016@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test017@ssafy.com", authority: "team", date: tmpDate },
      { email: "test018@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test019@ssafy.com", authority: "team", date: tmpDate },
      { email: "test020@ssafy.com", authority: "guest", date: tmpDate },
      { email: "test021@ssafy.com", authority: "team", date: tmpDate }
    ];
    return result;
  },
  // 유저 권한 업데이트 함수
  userAuthUpdate(email, auth) {
    if (store.state.userAuth == "admin")
      SwalAlert.swatAlert("Success", "변경되었습니다.", "success", "OK!");
    else {
      console.log(store.state.userAuth)
      SwalAlert.swatAlert("Error", "권한이 없습니다.", "error", "OK!");
    }
    // if(result == null)
    // alert 실패
    return true;
  },
  // 유저 탈퇴 함수
  userDelete() {
    return true;
  }
};
