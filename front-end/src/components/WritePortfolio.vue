<template>
  <div class="py-3">
    <v-layout>
      <v-flex xs10>
        <h1 class="text_font">Portfolio Write</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-flex px10 py10>
              <v-text-field
                v-model="title"
                :counter="30"
                :rules="titleRules"
                label="제목"
                required
              >
              </v-text-field>
            </v-flex>

            <v-flex px10 py10>
              <MarkdownEditor v-on:sendBody="getBody"></MarkdownEditor>
            </v-flex>

            <v-flex>
              <v-container fluid>
                <v-flex
                  xs12
                  class="text-xs-center text-sm-center text-md-center text-lg-center"
                >
                  <img :src="imageUrl" height="150" v-if="imageUrl" />
                  <insertWriter v-on:FolioImgLink="FolioImgLink"></insertWriter>
                </v-flex>
              </v-container>
            </v-flex>
            <v-flex px10 py10>
              <v-btn color="warning" dark @click.stop="submit()">Submit</v-btn>
            </v-flex>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import insertWriter from "./insertWriter";
import MarkdownEditor from "../components/MarkdownEditor";
import FirebaseService from "@/services/FirebaseService";
import Swal from "sweetalert2";

export default {
  name: "writePortfolio",
  components: {
    MarkdownEditor,
    insertWriter
  },
  data: () => ({
    valid: true,
    title: "",
    titleRules: [
      v => !!v || "제목을 입력해주세요!",
      v => (v && v.length <= 30) || "제목은 30자 이내로 입력해주세요!"
    ],
    imageName: "",
    imageUrl: "",
    imageFile: "",
    body: "",
    linkeddata: ""
  }),
  methods: {
    FolioImgLink(link) {
      this.linkeddata = link;
    },
    getBody(msg) {
      this.body = msg;
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    alert(title, text, type, confirmButtonText) {
      Swal.fire({
        title: title,
        text: text,
        type: type,
        confirmButtonText: confirmButtonText
      });
    },
    async submit() {
      if (this.title == "") {
        this.alert("Error!", "제목을 입력해주세요!", "error", "Ok!");
      } else if (this.body == "내용을 마크다운 형식으로 작성해주세요!") {
        this.alert("Error!", "내용을 입력해주세요!", "error", "Ok!");
      } else if (this.linkeddata == "") {
        this.alert("Error!", "사진을 등록해주세요!", "error", "Ok!");
      } else {
        var isPost = await FirebaseService.postPortfolio(
          this.title,
          this.body,
          this.linkeddata
        );
        if (isPost == "success") {
          this.alert(
            "Success!",
            "포트폴리오가 등록되었습니다!",
            "success",
            "Ok!"
          );
          this.$router.push("portfolio");
        } else {
          this.alert(
            "Error!",
            "알수없는 에러가 발생했습니다! (error code : " + isPost + ")",
            "error",
            "Ok!"
          );
        }
      }
    }
  }
};
</script>
