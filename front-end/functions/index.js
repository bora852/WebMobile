const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


export.sendPush = functions.https.onCall((data, context) => {
  console.log(data);

  const playload = {
    notification {
      title: "Tuna's blog"
      body: "새 댓글이 등록되었습니다."
      click_action : "http://localhost:8080/" + data.category + "?num=" + data.num
    }
  }

  admin.messaging().sendToDevice(data.token, playload).then(response => {
    console.log("success sendPush Call");
    console.log(response);
  });

});



// 회원가입 트리거
exports.signUpLog = functions.https.onCall((data, context) => {
  var email = context.auth.token.email;
  var date = new Date();
  date.setHours(date.getHours() + 9);
  console.log(date + " " + email + " 회원가입");
  return true;
});

// 회원탈퇴 트리거
exports.withDrawal = functions.auth.user().onDelete((user) => {
  var email = user.email;
  var date = new Date();
  date.setHours(date.getHours() + 9);
  console.log(date + " " + email + " 회원탈퇴");
  return true;
});

// exports.withDrawal = functions.https.onCall((data, context) => {
//   var email = context.auth.token.email;
//   var date = new Date();
//   date.setHours(today.getHours() + 9);
//   console.log(date + " " + email + " 회원탈퇴");
//   return true;
// });


// 로그인 트리거
exports.signInLog = functions.https.onCall((data, context) => {
  var email = context.auth.token.email;
  var date = new Date();
  date.setHours(date.getHours() + 9);
  console.log(date + " " + email + " 로그인");
  return true;
});

// 로그아웃 트리거
exports.signOutLog = functions.https.onCall((data, context) => {
  var email = context.auth.token.email;
  var date = new Date();
  date.setHours(date.getHours() + 9);
  console.log(date + " " + email + " 로그아웃");
  return true;
});
