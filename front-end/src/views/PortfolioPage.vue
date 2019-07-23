<template>
  <div>
    <v-container>
      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <!-- <div id="gitgraph"></div>
          <RepositoryGraph></RepositoryGraph> -->
          <PortfolioList :limits="6" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioList from "../components/PortfolioList";
import { eventBus } from "../main.js";

export default {
  name: "PortfolioPage",
  components: {
    PortfolioList
  },
  created() {
    eventBus.$emit("sendTitle", "Portfolio");
  }
};
</script>

<style></style>
