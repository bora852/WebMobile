import SwalAlert from "./SwalAlert";
import axios from "axios";

const URL = "http://192.168.100.87:8082/";

export default {
  //AllCalendars
  getList(user_email) {
    return axios
      .get(URL + "ass/api/calenAll", {
        params: { user_email: user_email }
      })
      .then(response => {
        return response.data;
      })
      .catch(function(error) {
      console.log(error);
      });
  },
  //insertCalendars
  CalendarsInsert(title, body, user_email, date) {
    return axios
      .post(URL + "ass/api/calenInsert", {
        title: title,
        body: body,
        user_email: user_email,
        date: date
      })
      .then(response => {
        if (response.data.state == 1) {
          SwalAlert.swatAlert(
            "Success!",
            "포스트가 등록되었습니다!",
            "success",
            "Ok!"
          );
          return "success";
        } else {
          SwalAlert.swatAlert(
            "Error!",
            "알수없는 에러가 발생했습니다! (error code : " +
              response.status +
              ")",
            "error",
            "Ok!"
          );
          return "fail";
        }
      })
      .catch(error => {
        SwalAlert.swatAlert(
          "Error!",
          "알수없는 에러가 발생했습니다! (" + error + ")",
          "error",
          "Ok!"
        );
      });
  }
};
