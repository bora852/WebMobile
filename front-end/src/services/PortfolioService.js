import SwalAlert from "./SwalAlert";
import axios from "axios";
import OfflineService from "./OfflineService";

const URL = "http://192.168.100.87:8082/";

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
          오프라인 데이터를 사용합니다.",
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
      });
  },
  delete(idx) {
    return axios.delete(URL + "ass/api/portDelect", {
      params: {
        idx: idx
      }
    });
  }
};
