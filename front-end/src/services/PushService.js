import firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";
import "firebase/functions";
import axios from "axios";
import store from "../store";

const URL = "http://192.168.100.87:8082/";
const messaging = firebase.messaging();

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
            .then(() => {});
        }
      })
      .catch(() => {});
  },
  getFCMToken(email) {
    return axios
      .get(URL + "ass/api/tokenSelect", {
        params: {
          email: email
        }
      })
      .then(response => {
        return response.data.token;
      });
  },
  sendPushPortfolio(idx) {
    axios
      .get(URL + "ass/api/portSelect", {
        params: {
          idx: idx
        }
      })
      .then(response => {
        var email = response.data.email;
        axios
          .get(URL + "ass/api/tokenSelect", {
            params: {
              email: email
            }
          })
          .then(response => {
            var token = response.data.token;
            var pushFunction = firebase.functions().httpsCallable("sendPush");
            pushFunction({ token: token, category: "portfolio", num: "idx" });
          });
      });
  },
  sendPushPost(idx) {
    axios
      .get(URL + "ass/api/postSelect", {
        params: {
          idx: idx
        }
      })
      .then(response => {
        var email = response.data.email;
        axios
          .get(URL + "ass/api/tokenSelect", {
            params: {
              email: email
            }
          })
          .then(response => {
            var token = response.data.token;
            var pushFunction = firebase.functions().httpsCallable("sendPush");
            pushFunction({ token: token, category: "post", num: "idx" });
          });
      });
  }
};
