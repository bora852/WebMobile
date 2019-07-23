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
