import SwalAlert from "./SwalAlert";
import axios from "axios";
import OfflineService from "./OfflineService";

const URL = "http://192.168.100.87:8082/";

export default {
  getList() {
    return axios
      .get(URL + "ass/api/postAll")
      .then(response => {
        OfflineService.updatePostMemory(response.data);
        return response.data;
      })
      .catch(() => {
        SwalAlert.swatAlert(
          "Offline",
          "알수없는 에러가 발생했습니다!\
          오프라인 데이터를 사용합니다.",
          "error",
          "Ok!"
        );
        return OfflineService.loadPostMemory();
      });
  },
  postPost(title, body, email) {
    return axios
      .post(URL + "ass/api/postInsert", {
        title: title,
        body: body,
        email: email
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
  },
  updatePost(title, body, email, idx){
    return axios
      .post(URL + "ass/api/postUpdate", {
        title: title,
        body: body,
        email: email
      })
      .then(response => {
      console.log(response.data);
        return response.data;
      });
  },
  delete(idx) {
    return axios
      .get(URL + "ass/api/postDelete", {
        params: {
          idx: idx
        }
      })
      .then(response => {
        return response.data;
      });
  },
  select(idx) {
    return axios
      .get(URL + "ass/api/postSelect", {
        params: {
          idx: idx
        }
      })
      .then(response => {
        return response.data;
      });
  }
};
