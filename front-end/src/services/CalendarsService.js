import SwalAlert from "./SwalAlert";
import axios from "axios";

const URL = "https://donkey2.hibuz.com:443/";

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
  CalendarsInsert(idx,title, body, created_at, user_email) {
    return axios
      .post(URL + "ass/api/calenInsert", {
        idx: idx,
        title: title,
        body: body,
        created_at: created_at,
        user_email: user_email
      })
      .then(response => {
        if (response.data.state == 1) {
          SwalAlert.swatAlert("Success!", "일정 등록 완료", "success", "Ok!");
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
      .catch(function(error) {
      console.log(error);
      });
  },
  Calendarsdelete(idx) {
    return axios
      .delete(URL + "ass/api/calenDelete", {
        params: {
          idx: idx
        }
      })
      .then(response => {
        return response.data;
      });
  }
};
