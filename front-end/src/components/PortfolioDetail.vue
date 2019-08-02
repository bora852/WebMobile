<template>
  <div>
    <div class="text_font" style="font-size:1.5em;">{{ portfolio.title }}</div>
    <div class="text-md-right">
      <v-icon class="mr-1">date_range</v-icon> {{ formatedDate }}
      <v-icon>person</v-icon> {{ portfolio.email }}
    </div>
    <v-divider></v-divider>
    <div class="ImgPadding">
      <v-img :src="portfolio.img" aspect-ratio="3" contain></v-img>
      <Viewer :value="portfolio.body" class="body_font"/>
    </div>
    <div class="text-sm-right text-xs-center">
      <v-btn
        v-show="isAuthor()"
        color="warning"
        @click="portfolioUpdate()"
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
    <v-divider></v-divider>
    <div class="replyPadding">
      <Comments></Comments>
      <!-- <Reply></Reply> -->
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
      return year + "/" + month + "/" + day;
    }
  },
  mounted() {
    this.getPortfolioById();
  },
  methods: {
    async getPortfolioById() {
      this.portfolio = await PortfolioService.getPortfolio(
        this.$route.query.idx
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
    portfolioUpdate() {
      this.$router.push("/portfolioUpdate?idx=" + this.portfolio.idx);
    },
    async portfolioDelete() {
      await PortfolioService.delete(this.$route.query.idx);
      this.$router.replace("/portfolio");
    }
  }
};
</script>

<style>
.ImgPadding {
  padding: 10px;
}
.replyPadding {
  padding: 20px;
}
</style>
