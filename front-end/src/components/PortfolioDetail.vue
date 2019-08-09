<template>
  <div>
    <div class="text_font subFontSize">📰포트폴리오</div>
    <div class="v-card theme--light detailPadding">
      <div class="text_font titleFontSize">{{ portfolio.title }}</div>
      <div class="text-md-right">
        <v-icon class="mr-0 iconSize">date_range</v-icon>
        {{ formatedDate }} <v-icon class="mr-0 iconSize">person</v-icon>
        {{ portfolio.email }}
      </div>
      <hr />
      <div class="ImgPadding">
        <v-img :src="portfolio.img" aspect-ratio="3" contain></v-img>
        <Viewer :value="portfolio.body" class="body_font" />
      </div>
      <hr />
      <div class="text-sm-right text-xs-center my-2">
        <v-btn
          v-show="isAuthor()"
          color="warning"
          @click="portfolioEdit()"
          dark
          class="text_font"
        >
          <v-icon size="20" class="mr-2">create</v-icon> 수정
        </v-btn>
        <v-btn
          v-show="isAuthor()"
          color="warning"
          @click="portfolioDelete()"
          dark
          class="text_font"
        >
          <v-icon size="20" class="mr-2">delete</v-icon> 삭제
        </v-btn>
      </div>
      <div class="cmtPadding">
        <Comments category="port"></Comments>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/Comments";
import PortfolioService from "../services/PortfolioService";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import { Viewer } from "@toast-ui/vue-editor";

export default {
  name: "PortfolioDetail",
  data() {
    return {
      // categ
      portfolio: []
    };
  },
  components: {
    Comments,
    Viewer
  },
  computed: {
    isAuthor: function() {
      return this.chkAuthor;
    },
    formatedDate() {
      let curDate = new Date(this.portfolio.created_at);
      let year = curDate.getFullYear();
      let month = curDate.getMonth() + 1;
      let day = curDate.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return year + "/" + month + "/" + day;
    }
  },
  mounted() {
    this.getPortfolioById();
  },
  methods: {
    async getPortfolioById() {
      this.portfolio = await PortfolioService.getPortfolio(
        this.$route.query.num
      );
    },
    chkAuthor() {
      let email = this.$store.state.user;
      let auth = this.$store.state.userAuth;
      let result = false;
      if (this.portfolio.email == email || auth == "admin") {
        result = true;
      }
      return result;
    },
    portfolioEdit() {
      this.$router.push("/portfolioEdit?num=" + this.$route.query.num);
    },
    async portfolioDelete() {
      await PortfolioService.delete(this.$route.query.num);
      this.$router.replace("/portfolio");
    }
  }
};
</script>

<style>
.ImgPadding {
  padding: 10px;
}
.titleFontSize {
  font-size: 1.7em;
}
.detailPadding {
  padding: 30px;
}
.iconSize {
  font-size: 1.3em;
}
</style>
