import AuthService from "../services/AuthService";
import firebase from "firebase/app";
import "firebase/functions";
import Swal from "sweetalert2";
import { eventBus } from "../main.js";
import store from "../store";
import SwalAlert from "./SwalAlert";

const config = {
  projectId: "webmobileproject-2d658",
  authDomain: "webmobileproject-2d658.firebaseapp.com",
  apiKey: "AIzaSyCmQ16A9lD5zpXztM6kLbHTBQAyzfht35o",
  databaseURL: "https://webmobileproject-2d658.firebaseio.com",
  storageBucket: ""
};

firebase.initializeApp(config);

var callSignInLog = firebase.functions().httpsCallable("signInLog");
var callSignOutLog = firebase.functions().httpsCallable("signOutLog");
var callSignUpLog = firebase.functions().httpsCallable("signUpLog");

export default {
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        callSignInLog();
        Swal.fire({
          title: "Hello!",
          text: "로그인 되었습니다.",
          type: "success",
          confirmButtonText: "Ok!"
        });
        return result;
      })
      .catch(function(error) {
        if (error.code === "auth/account-exists-with-different-credential") {
          firebase
            .auth()
            .fetchSignInMethodsForEmail(error.email)
            .then(function(providers) {
              if (providers[0] == "facebook.com") {
                var provider = new firebase.auth.FacebookAuthProvider();
                provider.setCustomParameters({
                  login_hint: error.email
                });
                firebase
                  .auth()
                  .signInWithRedirect(provider)
                  .then(function(result) {
                    firebase
                      .auth()
                      .signInWithCredential(result.credential)
                      .then(user => {
                        user.linkWithCredential(error.credential);
                        callSignInLog();
                        Swal.fire({
                          title: "Hello!",
                          text: "로그인 되었습니다.",
                          type: "success",
                          confirmButtonText: "Ok!"
                        });
                      });
                  });
              }
            });
        } else {
          Swal.fire({
            title: "Error!",
            text:
              "예기치 않은 문제가 발생했습니다. 관리자에게 문의바랍니다. ErrorCode : " +
              error.code,
            type: "error",
            confirmButtonText: "Ok!"
          });
        }
      });
  },
  loginWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        callSignInLog();
        Swal.fire({
          title: "Hello!",
          text: "로그인 되었습니다.",
          type: "success",
          confirmButtonText: "Ok!"
        });
        return result;
      })
      .catch(function(error) {
        if (error.code === "auth/account-exists-with-different-credential") {
          firebase
            .auth()
            .fetchSignInMethodsForEmail(error.email)
            .then(function(providers) {
              if (providers[0] == "google.com") {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.setCustomParameters({
                  login_hint: error.email
                });
                firebase
                  .auth()
                  .signInWithRedirect(provider)
                  .then(function(result) {
                    firebase
                      .auth()
                      .signInWithCredential(result.credential)
                      .then(user => {
                        user.linkWithCredential(error.credential);
                        callSignInLog();
                        Swal.fire({
                          title: "Hello!",
                          text: "로그인 되었습니다.",
                          type: "success",
                          confirmButtonText: "Ok!"
                        });
                      });
                  });
              }
            });
        } else {
          Swal.fire({
            title: "Error!",
            text:
              "예기치 않은 문제가 발생했습니다. 관리자에게 문의바랍니다. ErrorCode : " +
              error.code,
            type: "error",
            confirmButtonText: "Ok!"
          });
        }
      });
  },
  async signUp(email, password) {
    // 디비에 권한먼저 등록
    var DBConnect = await AuthService.userAuthInsert(email);
    if (DBConnect != null && DBConnect.data.state == 1) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function() {
          SwalAlert.swatAlert(
            "Welcome",
            email + "님 가입을 환영합니다!",
            "success",
            "OK!"
          );
          callSignUpLog();
          callSignInLog();
          store.state.userAuth = "guest";
          return true;
        })
        .catch(async function(error) {
          // 파이어베이스 계정 등록 실패시 DB에서 권한삭제
          var errorCode = error.code;
          if (errorCode == "auth/weak-password") {
            await AuthService.userDelete(email);
            SwalAlert.swatAlert(
              "Warning!",
              "패스워드가 취약합니다.",
              "warning",
              "Ok!"
            );
          } else if (error.code === "auth/email-already-in-use") {
            SwalAlert.swatAlert(
              "Error!",
              "이미 존재하는 이메일입니다.",
              "error",
              "Ok!"
            );
          } else if (error.code === "auth/invalid-email") {
            await AuthService.userDelete(email);
            SwalAlert.swatAlert(
              "Error!",
              "이메일을 정확히 입력해주세요.",
              "error",
              "Ok!"
            );
          } else {
            await AuthService.userDelete(email);
            SwalAlert.swatAlert(
              "Error!",
              "예기치 않은 문제가 발생했습니다. 관리자에게 문의바랍니다. ErrorCode : " +
                error.code,
              "error",
              "Ok!"
            );
          }
        });
    }
    return false;
  },
  loginChk() {
    return firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        eventBus.$emit("getUserId", user.email);
        store.state.user = user.email;
        AuthService.authChk(user.email);
        return user.email;
      } else {
        store.state.userAuth = "";
        return null;
      }
    });
  },
  logOut() {
    callSignOutLog();
    firebase
      .auth()
      .signOut()
      .then(function() {
        store.state.userAuth = "";
        Swal.fire({
          title: "Bye Bye!",
          text: "로그아웃 되었습니다.",
          type: "success",
          confirmButtonText: "Ok!"
        });
        eventBus.$emit("logOut", "value");
      })
      .catch(function() {});
  },
  signIn(email, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(result) {
        eventBus.$emit("popUpLogin", "value");
        callSignInLog();
        Swal.fire({
          title: "Hello!",
          text: "로그인 되었습니다.",
          type: "success",
          confirmButtonText: "Ok!"
        });
        return result;
      })
      .catch(function(error) {
        var errorCode = error.code;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/invalid-email"
        ) {
          Swal.fire({
            title: "Error!",
            text: "이메일과 패스워드를 다시 확인해주세요!",
            type: "error",
            confirmButtonText: "Ok!"
          });
        } else {
          Swal.fire({
            title: "Error!",
            text:
              "예기치 않은 문제가 발생했습니다. 관리자에게 문의바랍니다. ErrorCode : " +
              error.code,
            type: "error",
            confirmButtonText: "Ok!"
          });
        }
      });
  }
};
