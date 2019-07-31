import firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";
import axios from "axios";
import store from "../store";

const URL = "http://192.168.100.87:8082/";
const messaging = firebase.messaging();

export default {
  getFCMToken() {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then(token => {
        if (token != null) {
          axios.post(URL + "ass/api/***", {
            email: store.state.user,
            token: token
          });
        } else {
          console.log("firebase Error (token is null)")
        }
      })
      .catch(error => {
        console.log("token save Error");
        console.log(error)
      });
  }
};
