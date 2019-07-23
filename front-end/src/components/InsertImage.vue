<template>
  <div>
    <v-btn
      @click="clickImgBtn()"
      color="warning"
      flat
      large
      replace
      style="font-size:1.2em;text-transform:none;"
      slot="text"
      class="text_font"
      >Insert Image</v-btn
    >
    <v-btn
      @click="imgrandom()"
      color="warning"
      flat
      large
      replace
      style="font-size:1.2em;text-transform:none;"
      slot="text"
      class="text_font"
      >Random Image</v-btn
    >

    <form ref="myFileInputForm">
      <input
        style="display: none"
        type="file"
        id="ex_file"
        ref="inputBanner"
        v-on:processFile="processFile"
        @change="processFile()"
        class="imgur"
        accept="image/*"
      />
    </form>
    <button id="random_img" @click="imgrandom()"></button>
  </div>
</template>

<script>
import Swal from "sweetalert2";

function extractToken(hash) {
  var match = hash.match(/access_token=(\w+)/);
  return !!match && match[1];
}

var token = extractToken(document.location.hash);
var clientId = "babea18b3af5eaa";
let linkaddr;
var authorization;
if (token) authorization = "Bearer " + token;
else authorization = "Client-ID " + clientId;

export default {
  name: "attachimg",
  components: {},
  data: function() {
    return {};
  },
  mounted() {},
  methods: {
    clickImgBtn() {
      this.$refs.inputBanner.click();
    },
    imgrandom() {
      var tempVue = this;
      var num = Math.floor(Math.random() * 50);
      var num2 = Math.floor(Math.random() * 50);
      $.ajax({
        url: "https://api.imgur.com/3/gallery/random/random/" + num + "/",
        method: "GET",
        headers: {
          Authorization: authorization,
          Accept: "application/json"
        },
        data: {
          image: localStorage.dataBase64,
          type: "base64"
        },
        success: handleData
      });

      function handleData(result) {
        let datalinked = result.data[num2].link + "-";
        let imgok = "https://i.";
        let count = true;
        while (count) {
          if (datalinked.indexOf(imgok) > -1) {
            break;
          } else {
            num2 = Math.floor(Math.random() * 50);
            datalinked = result.data[num2].link + "-";
          }
        }
        linkaddr = result.data[num2].link;
        tempVue.$emit("ImgLink", linkaddr);
        tempVue.$refs.myFileInputForm.reset();
      }
    },
    processFile() {
      var tempVue = this;
      var target = event.currentTarget;
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open("POST", "https://api.imgur.com/3/image/", true);
      xmlHttpRequest.setRequestHeader(
        "Authorization",
        "Client-ID babea18b3af5eaa"
      );
      xmlHttpRequest.send(target.files[0]);

      xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4) {
          if (xmlHttpRequest.status == 200) {
            var result = JSON.parse(xmlHttpRequest.responseText);
            linkaddr = result.data.link;
            tempVue.$emit("ImgLink", linkaddr);
          } else {
            Swal.fire({
              title: "Error!",
              text: "이미지 업로드에 실패했습니다.",
              type: "error",
              confirmButtonText: "Ok!"
            });
            linkaddr = "https://source.unsplash.com/random";
          }
        }
      };
    }
  }
};
</script>

<style></style>
