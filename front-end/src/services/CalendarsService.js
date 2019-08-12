import axios from "axios";

const URL = "https://13.209.77.238:443/";

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
