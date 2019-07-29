<template>
  <div>
    <h1>{{ portfolio.title }}</h1><!--display-3 font-weight-bold mb-4-->
    <p class="text-md-right">
      <v-icon class="mr-1">date_range</v-icon> <!--{{ formatedDate }}-->
      <v-icon class="mr-1">person</v-icon> 작성자
    </p>
    <v-divider></v-divider>
    <div class="ImgPadding">
      <v-img :src="portfolio.img" aspect-ratio="3" contain></v-img>
      <Viewer :value="portfolio.body" />
    </div>
    <Comments></Comments>
  </div>
</template>

<script>
import Comments from "@/components/Comments";
import FirebaseService from "@/services/FirebaseService";
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
    // formatedDate() {
    //   return `${this.portfolio.created_at.getFullYear()}년 ${this.portfolio.created_at.getMonth()}월 ${this.portfolio.created_at.getDate()}일 ${this.portfolio.created_at.getHours()}:${this.portfolio.created_at.getMinutes()}`;
    // }
  },
  mounted() {
    this.getPortfolioById();
  },
  methods: {
    async getPortfolioById(){
      this.portfolio = await FirebaseService.getPortfolioById(this.$route.query.id);
      console.log("포토폴리오",this.portfolio);
    }
  },
  created(){
     // this.datas = this.$store.state.portfolioData;
     // console.log("가져왔니?",this.$route.query.id);

  }
};
</script>

<style>
.ImgPadding {
  padding: 10px;
}
</style>
