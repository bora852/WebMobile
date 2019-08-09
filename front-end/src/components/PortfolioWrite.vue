<template>
  <div>
    <div class="text_font subFontSize">📝포트폴리오 작성</div>
    <div class="v-card theme--light detailPadding">
      <v-layout>
        <v-flex>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-flex px10 py10>
                <v-text-field
                  v-model="title"
                  :counter="30"
                  :rules="titleRules"
                  label="제목"
                  required
                  color="orange"
                  class="body_font titleFontSize"
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
              <v-flex px10 py10 class="text-sm-right text-xs-center text_font">
                <v-btn
                  color="warning"
                  class="ImgBtnSize"
                  dark
                  @click.stop="submit()"
                  >작성</v-btn
                >
                <v-btn color="warning" class="ImgBtnSize" dark to="portfolio"
                  >취소</v-btn
                >
              </v-flex>
            </v-container>
          </v-form>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import insertWriter from "./insertWriter";
import MarkdownEditor from "../components/MarkdownEditor";
import PortfolioService from "../services/PortfolioService";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "PortfolioWrite",
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
    async submit() {
      if (this.title == "") {
        SwalAlert.swatAlert("Error!", "제목을 입력해주세요!", "error", "Ok!");
      } else if (this.body == "내용을 마크다운 형식으로 작성해주세요!") {
        SwalAlert.swatAlert("Error!", "내용을 입력해주세요!", "error", "Ok!");
      } else if (this.linkeddata == "") {
        SwalAlert.swatAlert("Error!", "사진을 등록해주세요!", "error", "Ok!");
      } else {
        var isPost = await PortfolioService.postPortfolio(
          this.title,
          this.body,
          this.$store.state.user,
          this.linkeddata
        );
        if (isPost == 1) {
          SwalAlert.swatAlert(
            "Success!",
            "포트폴리오가 등록되었습니다!",
            "success",
            "Ok!"
          );
          this.$router.push("portfolio");
        } else {
          SwalAlert.swatAlert(
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
