import firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";
import axios from "axios";
import store from "../store";
// import * as admin from "firebase-admin";
// import serviceAccount from "./webmobileproject-2d658-cdaad03d7b86"

const URL = "http://192.168.100.87:8082/";
const messaging = firebase.messaging();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

export default {
  saveFCMToken() {
    return messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then(token => {
        if (token != null) {
          axios
            .post(URL + "ass/api/tokenInsert", {
              email: store.state.user,
              token: token
            })
            .then(() => {
              console.log("token save finish!")
            });
        } else {
          console.log("firebase Error (token is null)")
        }
      })
      .catch(error => {
        console.log("token save Error");
        console.log(error)
      });
  },
  getFCMToken(email) {
    return axios
      .get(URL + "ass/api/tokenSelect", {
        params: {
          email: email
        }
      })
      .then(response => {
        console.log("getFCMTOKEN !");
        console.log(response);
        console.log(response.data.token);
        return response.data.token;
      });
  },
  async sendPush(email) {
    // functions.httpsCallable("addMessage").call(["text": inputField.text])
    var token = await this.getFCMToken(email);
    console.log("getTokenSuccess!", token);
    var message = {
      data: {
        score: "850",
        time: "2:45"
      },
      token: token
    };

    admin
      .messaging()
      .send(message)
      .then(response => {
    // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch(error => {
        console.log("Error sending message:", error);
      });
  },

  listenPush() {
    messaging.onMessage(payload => {
      console.log("Message received. ", payload);
    });

    messaging.setBackgroundMessagHandler(function(payload) {
      return self.registration.showNotification();
    });
  }
};
