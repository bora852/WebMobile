import axios from "axios";

const URL = "http://192.168.100.87:8082/";

export default {
  getList(user_email) {
    return axios
      .get(URL + "ass/api/calenAll", {
        params:{
        user_email: user_email
      }
      })
      .then(response => {
      // console.log(response);
      console.log("hi "+user_email );
        return response.data;
      })
      .catch(function(error) {
      console.log(error);
      });
  }
};
