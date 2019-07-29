<template>
  <div>
    <h1>{{ portfolio.title }}</h1>
    <p class="text-md-right">
      <v-icon class="mr-1">date_range</v-icon> {{ formatedDate }}
      <v-icon>person</v-icon> {{ portfolio.email }}
    </p>
    <v-divider></v-divider>
    <div class="ImgPadding">
      <v-img :src="portfolio.img" aspect-ratio="3" contain></v-img>
      <Viewer :value="portfolio.body" />
    </div>
    <v-btn color="warning" dark to="portfolioUpdate">
      <v-icon size="20" class="mr-2">create</v-icon> 수정
    </v-btn>
    <v-btn color="warning" dark to="portfolioUpdate">
      <v-icon size="20" class="mr-2">delete</v-icon> 삭제
    </v-btn>
    <Comments></Comments>
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
      this.portfolio = await PortfolioService.select(this.$route.query.idx);
    }
  },
  created() {}
};
</script>

<style>
.ImgPadding {
  padding: 10px;
}
</style>
