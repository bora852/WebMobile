<template>
  <div>
    <v-container>
      <!-- PortfolioDetail -->
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <h1>detail</h1>
          <PortfolioDetail></PortfolioDetail>
          <!-- <PortfolioList :limits="6" :load-more="true"></PortfolioList> -->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioDetail from "../components/PortfolioDetail";
import { eventBus } from "../main.js";

export default {
  name: "PortfolioPage",
  components: {
    PortfolioDetail
  },
  created() {
    eventBus.$emit("sendTitle", "PortfolioDetail");
  }
};
</script>

<style></style>
