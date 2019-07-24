
export default {
  // 권한 확인 함수
  authChk() {
    var result = "admin";
    // this.$store.state.userAuth = result;
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
      { email: "test010@ssafy.com", authority: "team", date: tmpDate }
    ];
    return result;
  },
  // 유저 권한 업데이트 함수
  userAuthUpdate() {
    return true;
  },
  // 유저 탈퇴 함수
  userDelete() {
    return true;
  }
};
