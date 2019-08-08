<template>
  <div class="v-card theme--light detailPadding">
    <v-layout>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-flex px10 py10>
              <v-text-field
                v-model="portfolio.title"
                :counter="30"
                :rules="titleRules"
                label="제목"
                required
                color="orange"
                class="body_font titleFontSize"
              >
              </v-text-field>
            </v-flex>

            <v-flex>
              <MarkdownEditor
                :body="body"
                v-on:sendBody="getBody"
              ></MarkdownEditor>
            </v-flex>

            <v-flex>
              <v-container fluid>
                <v-flex
                  xs12
                  class="text-xs-center text-sm-center text-md-center text-lg-center"
                >
                  <insertWriter
                    :sendImg="sendImg"
                    v-on:FolioImgLink="FolioImgLink"
                  ></insertWriter>
                </v-flex>
              </v-container>
              <v-divider></v-divider>
            </v-flex>

            <v-flex px10 py10 class="text-sm-right text-xs-center text_font">
              <v-btn
                color="warning"
                class="ImgBtnSize"
                dark
                @click.stop="submit()"
                >수정완료</v-btn
              >
              <v-btn color="warning" class="ImgBtnSize" to="portfolio" dark
                >수정취소</v-btn
              >
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
import PortfolioService from "../services/PortfolioService";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "portfolioEdit",
  components: {
    MarkdownEditor,
    insertWriter
  },
  data: () => ({
    valid: true,
    titleRules: [
      v => !!v || "제목을 입력해주세요!",
      v => (v && v.length <= 30) || "제목은 30자 이내로 입력해주세요!"
    ],
    imageName: "",
    imageUrl: "",
    imageFile: "",
    body: "",
    sendImg: "",
    linkeddata: "",
    portfolio: []
  }),
  created() {
    this.getPortfolioById();
  },
  methods: {
    async getPortfolioById() {
      this.portfolio = await PortfolioService.getPortfolio(
        this.$route.query.num
      );
      this.body = this.portfolio.body;
      this.sendImg = this.portfolio.img;
    },
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
      if (this.portfolio.title == "") {
        SwalAlert.swatAlert("Error!", "제목을 입력해주세요!", "error", "Ok!");
      } else if (this.body == "내용을 마크다운 형식으로 작성해주세요!") {
        SwalAlert.swatAlert("Error!", "내용을 입력해주세요!", "error", "Ok!");
      } else if (this.linkeddata == "") {
        SwalAlert.swatAlert("Error!", "사진을 등록해주세요!", "error", "Ok!");
      } else {
        var isPort = await PortfolioService.updatePortfolio(
          this.$route.query.num,
          this.portfolio.title,
          this.body,
          this.linkeddata
        );
        if (isPort == 1) {
          SwalAlert.swatAlert(
            "Success!",
            "포트폴리오가 수정되었습니다!",
            "success",
            "Ok!"
          );
          this.$router.push("portfolio");
        } else {
          SwalAlert.swatAlert(
            "Error!",
            "알수없는 에러가 발생했습니다! (error code : " + isPort + ")",
            "error",
            "Ok!"
          );
        }
      }
    }
  }
};
</script>
