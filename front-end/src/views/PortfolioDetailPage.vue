<template>
  <div>
    <v-container>
      <!-- PortfolioDetail -->
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <PortfolioDetail></PortfolioDetail>
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
    eventBus.$emit("sendTitle", "Portfolio Detail");
  }
};
</script>

<style></style>
