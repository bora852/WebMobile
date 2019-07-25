<template>
  <div>
    <h1>{{ portfolio.title }}</h1><!--display-3 font-weight-bold mb-4-->
    <v-icon class="mr-1">date_range</v-icon>{{ formatedDate }}
    <v-icon class="mr-1">person</v-icon> 작성자
    <v-img :src="portfolio.img" aspect-ratio="1.4" contain></v-img>
    <h3>{{ portfolio.body }}</h3>

    <Comments></Comments>
  </div>
</template>

<script>
import Comments from "@/components/Comments";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PortfolioDetail",
  data() {
    return {
      portfolio: []
    };
  },
  components: {
    Comments
  },
  computed: {
    formatedDate() {
      return `${this.portfolio.created_at.getFullYear()}년 ${this.portfolio.created_at.getMonth()}월 ${this.portfolio.created_at.getDate()}일 ${this.portfolio.created_at.getHours()}:${this.portfolio.created_at.getMinutes()}`;
    }
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
</style>
