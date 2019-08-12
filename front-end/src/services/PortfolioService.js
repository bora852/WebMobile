import SwalAlert from "./SwalAlert";
import axios from "axios";
import OfflineService from "./OfflineService";

const URL = "https://13.209.77.238:443/";

export default {
  getList() {
    return axios
      .get(URL + "ass/api/portAll")
      .then(response => {
        OfflineService.updatePortfolioMemory(response.data);
        return response.data;
      })
      .catch(() => {
        SwalAlert.swatAlert(
          "Offline",
          "알수없는 에러가 발생했습니다!\
          오프라인 데이터를 사용합니다. 일부 기능이 제한됩니다.",
          "error",
          "Ok!"
        );
        return OfflineService.loadPortfolioMemory();
      });
  },
  getPortfolio(idx) {
    return axios
      .get(URL + "ass/api/portSelect", {
        params: {
          idx: idx
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(() => {
        return OfflineService.selectPortfolioWithMemory(idx);
      });
  },
  postPortfolio(title, body, email, img) {
    return axios
      .post(URL + "ass/api/portInsert", {
        title: title,
        body: body,
        email: email,
        img: img
      })
      .then(response => {
        return response.data.state;
      })
      .catch(error => {
        if (error.message.includes("Network Error")) {
          SwalAlert.alertOffline();
        } else {
          SwalAlert.swatAlert(
            "Error!",
            "알수없는 에러가 발생했습니다! (" + error + ")",
            "error",
            "Ok!"
          );
        }
      });
  },
  updatePortfolio(idx, title, body, img) {
    return axios
      .put(URL + "ass/api/portUpdate", {
        idx: idx,
        title: title,
        body: body,
        img: img
      })
      .then(response => {
        return response.data.state;
      })
      .catch(error => {
        if (error.message.includes("Network Error")) {
          SwalAlert.alertOffline();
        } else {
          SwalAlert.swatAlert(
            "Error!",
            "알수없는 에러가 발생했습니다! (" + error + ")",
            "error",
            "Ok!"
          );
        }
      });
  },
  delete(idx) {
    return axios
      .delete(URL + "ass/api/portDelect", {
        params: {
          idx: idx
        }
      })
      .then(() => {
        return true;
      })
      .catch(error => {
        if (error.message.includes("Network Error")) {
          SwalAlert.alertOffline();
        } else {
          SwalAlert.swatAlert(
            "Error!",
            "알수없는 에러가 발생했습니다! (" + error + ")",
            "error",
            "Ok!"
          );
        }
      });
  }
};
