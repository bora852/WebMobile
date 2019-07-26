// import SwalAlert from "./SwalAlert";
import axios from "axios";

const URL = "http://192.168.100.87:8082/";

export default {
  getList() {
    return axios.get(URL + "ass/api/postAll").then(response => {
      // console.log(response.data);
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
        console.log(response.data);
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
        console.log(response.data);
        return response.data;
      });
  }
};
