import firebase from "firebase/app";
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
      });
  },
  getOneComment(category, num, key) {
    return ref
      .child(category)
      .child(num)
      .child(key)
      .once("value")
      .then(data => {
        console.log(data);
        return data;
      });
  },
  getAllComment(category, num) {
    var result;
    ref
      .child(category)
      .child(num)
      .on("child_added", data => {
        console.log("data key :", data.key);
        console.log("data value : ", data.val());
        result = data;
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
  }
}
