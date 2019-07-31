import firebase from "firebase/app";
import store from "../store";
import "firebase/database";
import "firebase/messaging";

const messaging = firebase.messaging();
messaging.requestPermission();

export default {
  getFCMToken() {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then(token => {
        if (token != null) {
          var email = store.state.user;
          firebase
            .database()
            .ref("FCM")
            .child(this.encodeUserEmail(email))
            .set(token);
        }
      })
      // "FCMId/" + this.encodeUserEmail(email)
      .catch(error => {
        console.log("token save Error");
        console.log(error)
      });
  },
  encodeUserEmail(email) {
    return email.replace(".", ",");
  },
  decodeUserEmail(email) {
    return email.replace(",", ".");
  }
};
// Notification.requestPermission().then(function(permission) {
//   if (permission === "granted") {
//     console.log("Notification permission granted.");
//   } else {
//     console.log('Unable to get permission to notify.');
//   }
// });
