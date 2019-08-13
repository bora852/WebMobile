const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendPush = functions.https.onCall((data, context) => {
  console.log("data" + data);

  var iconURL =
    "https://item.kakaocdn.net/do/ece533cdf7d604ac0440418f8cad3028f43ad912ad8dd55b04db6a64cddaf76d";

  const playload = {
    notification: {
      title: "당근당근",
      icon: iconURL,
      body: "새 댓글이 등록되었습니다.",
      click_action:
        "https://webmobileproject-2d658.firebaseapp.com/" +
        data.category +
        "?num=" +
        data.num
    }
  };

  admin
    .messaging()
    .sendToDevice(data.token, playload)
    .then(response => {
      return true;
    })
    .catch(error => {
      console.log(error);
    });
});

exports.signUpLog = functions.https.onCall((data, context) => {
  var email = context.auth.token.email;
  var date = new Date();
  date.setHours(date.getHours() + 9);
  console.log(date + " " + email + " 회원가입");
  return true;
});

exports.withDrawal = functions.auth.user().onDelete(user => {
  var email = user.email;
  var date = new Date();
  date.setHours(date.getHours() + 9);
  console.log(date + " " + email + " 회원탈퇴");
  return true;
});

exports.signInLog = functions.https.onCall((data, context) => {
  var email = context.auth.token.email;
  var date = new Date();
  date.setHours(date.getHours() + 9);
  console.log(date + " " + email + " 로그인");
  return true;
});

exports.signOutLog = functions.https.onCall((data, context) => {
  var email = context.auth.token.email;
  var date = new Date();
  date.setHours(date.getHours() + 9);
  console.log(date + " " + email + " 로그아웃");
  return true;
});
