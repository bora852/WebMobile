import axios from "axios";

const URL = "http://192.168.100.87:8082/";

export default {
  getList() {
    return axios.get(URL + "ass/api/portAll").then(response => {
      return response.data;
    });
  },
  select(idx) {
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
  updatePortfolio(title, body, email, img) {
    return axios
      .put(URL + "ass/api/portUpdate", {
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
