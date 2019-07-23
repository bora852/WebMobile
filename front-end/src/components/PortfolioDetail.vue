<template>
  <v-layout mt-5 wrap row>
    <div>
      {{ this.datas }}
    </div>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import { eventBus } from "../main.js";

export default {
  name: "PortfolioDetail",
  data() {
    return {
      count: this.limits,
      datas: ""
    };
  },
  components: {
  },
  mounted() {
  },
  methods: {
  },
  created(){
    console.log(this.$store.state.portfolioData);
    // eventBus.$on("sendPortfolioData", data => {
    //   console.log(data);
    //   this.datas = data;
    //   eventBus.$off("sendPortfolioData");
    // });
    // eventBus.$off("sendPortfolioData");
  }
};
</script>

<style>
</style>
