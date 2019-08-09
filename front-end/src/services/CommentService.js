import firebase from "firebase/app";
import pushService from "./PushService";
import { eventBus } from "../main.js";
import "firebase/database";
var ref = firebase.database().ref("reply");

export default {
  sendComment(category, num, email, message) {
    ref
      .child(category)
      .child(num)
      .push()
      .set({
        time: firebase.database.ServerValue.TIMESTAMP,
        email: email,
        message: message
      })
      .then(() => {
        if (category == "post") {
          pushService.sendPushPost(num);
        } else {
          pushService.sendPush(num, category);
        }
      });
  },
  getOneComment(category, num, key) {
    return ref
      .child(category)
      .child(num)
      .child(key)
      .once("value")
      .then(data => {
        return data;
      });
  },
  getAllComment(category, num) {
    var result;
    ref
      .child(category)
      .child(num)
      .on("child_added", data => {
        result = data;
        eventBus.$emit("commentData", result);
      });
    return result;
  },
  modifyComment(category, num, key, email, message) {
    var value = {
      time: firebase.database.ServerValue.TIMESTAMP,
      email: email,
      message: message
    };

    ref
      .child(category)
      .child(num)
      .child(key)
      .update(value);
  },
  deleteComment(category, num, key) {
    ref
      .child(category)
      .child(num)
      .child(key)
      .remove();
  },
  closeComment(category, num) {
    ref
      .child(category)
      .child(num)
      .off();
  }
};
