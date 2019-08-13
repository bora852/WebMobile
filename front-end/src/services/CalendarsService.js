import axios from "axios";

const URL = "https://donkey2.hibuz.com:443/";

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
