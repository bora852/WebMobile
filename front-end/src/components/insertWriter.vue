<template>
  <div>
    <div class="text-sm-left text-xs-left">
      <v-icon class="mr-0 previewIcon">add_photo_alternate</v-icon>
      <span class="text_font titleFontSize">이미지 선택</span>
      <v-divider></v-divider>
    </div>
    <v-container fluid>
      <v-flex
        xs12
        class="text-xs-center text-sm-center text-md-center text-lg-center"
      >
        <img :src="imglink" height="150" v-if="imglink" />
        <v-text-field
          label="Select Image"
          @click="pickFile"
          v-model="imageName"
          prepend-icon="attach_file"
        ></v-text-field>
        <form ref="myFileInputForm">
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          />
        </form>
      </v-flex>
    </v-container>
    <div class="text_font">
      <v-btn
        color="warning"
        class="ImgBtnSize"
        flat
        dark
        @click.stop="pickFile()"
        >이미지첨부</v-btn
      >
      <v-btn
        color="warning"
        class="ImgBtnSize"
        flat
        dark
        @click.stop="imgrand()"
        >랜덤이미지</v-btn
      >
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

function extractToken(hash) {
  var match = hash.match(/access_token=(\w+)/);
  return !!match && match[1];
}

var token = extractToken(document.location.hash);
var clientId = "54e7b4d779d63e2";
let linkaddress;
var authorization;
if (token) authorization = "Bearer " + token;
else authorization = "Client-ID " + clientId;

export default {
  props: {
    sendImg: {
      type: String
    }
  },
  name: "attachimg",
  components: {},
  data: function() {
    return {
      imglink: "",
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  mounted() {},
  methods: {
    imgrand() {
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
        linkaddress = result.data[num2].link;
        tempVue.$emit("FolioImgLink", linkaddress);
        tempVue.imglink = linkaddress;
        tempVue.imageName = "Random Image From ImgUr";
        tempVue.$refs.myFileInputForm.reset();
      }
    },
    WriterFile(ImgFile) {
      var Vuethis = this;
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open("POST", "https://api.imgur.com/3/image/", true);
      xmlHttpRequest.setRequestHeader(
        "Authorization",
        "Client-ID 54e7b4d779d63e2"
      );
      xmlHttpRequest.send(ImgFile);

      xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4) {
          if (xmlHttpRequest.status == 200) {
            var result = JSON.parse(xmlHttpRequest.responseText);
            linkaddress = result.data.link;
            Vuethis.$emit("FolioImgLink", linkaddress);
            Vuethis.imglink = linkaddress;
          } else {
            Swal.fire({
              title: "Error!",
              text: "이미지 업로드에 실패했습니다.",
              type: "error",
              confirmButtonText: "Ok!"
            });
            linkaddress = "https://source.unsplash.com/random";
          }
        }
      };
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.WriterFile(files[0]);
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  },
  watch: {
    sendImg: function() {
      var tempVue = this;
      tempVue.$emit("FolioImgLink", this.sendImg);
      tempVue.imglink = this.sendImg;
      tempVue.$refs.myFileInputForm.reset();
    }
  }
};
</script>

<style>
.ImgBtnSize {
  font-size: 1.2em;
}
</style>
