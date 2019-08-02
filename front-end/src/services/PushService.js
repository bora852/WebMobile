import firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";
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
  async sendPush(email){
    var token = await this.getFCMToken(email);
    

  }
};
