import firebase from "firebase/app";
import { eventBus } from "../main.js";
import "firebase/database";

var ref = firebase.database().ref("chatTest");

export default {
  sendMessage(id, message) {
    firebase
      .database()
      .ref()
      .child("chatTest")
      .push()
      .set({
        time: firebase.database.ServerValue.TIMESTAMP,
        id: id,
        message: message
      });
  },
  getMessage() {
    ref.on("child_added", function(data) {
      var result = data.val();
      eventBus.$emit("updateMessage", result);
    });
  },
  closeChat() {
    ref.off("child_added");
  }
};
