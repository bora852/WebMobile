import firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";
import "firebase/functions";
import axios from "axios";
import store from "../store";

const URL = "https://donkey2.hibuz.com:443/";
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
  sendPush(idx, category) {
    var pushFunction = firebase.functions().httpsCallable("sendPush");
    var token = null;
    axios
      .get(URL + "ass/api/" + category + "Select", {
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
            token = response.data.token;
            pushFunction({ token: token, category: category, num: "idx" });
          });
      });
    axios.get(URL + "ass/api/adminSelect").then(response => {
      response.data.forEach(element => {
        if (token != element) {
          pushFunction({ token: element, category: category, num: "idx" });
        }
      });
    });
  }
};
