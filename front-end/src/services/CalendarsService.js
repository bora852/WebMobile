import axios from "axios";

const URL = "http://192.168.100.87:8082/";

export default{
  getList(){
    return axios
    .get(URL + "ass/api/calenAll")
    .then(response=>{
      console.log(response);
      console.log("hi");
      return response.data;
    })
    .catch(function(error){
      console.log(error);
    });
  }
};
