<template>
  <div>
    {{ this.datas }}
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
      count: this.limits,
      datas: ""
    };
  },
  components: {
    Comments
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
     this.datas = this.$store.state.portfolioData;
     console.log("가져왔니?",this.$route.query.id);

  }
};
</script>

<style>
</style>
