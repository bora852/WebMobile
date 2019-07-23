export default {
  // 권한 확인 함수
  authChk() {
    // this.$store.state.userAuth = result;
    return true;
  },
  // 유저리스트 가져오는 함수
  getUserList() {
    return true;
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
