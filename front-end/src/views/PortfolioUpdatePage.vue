<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <PortfolioUpdate></PortfolioUpdate>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioUpdate from "../components/PortfolioUpdate";
import { eventBus } from "../main.js";

export default {
  name: "PortfolioUpdatePage",
  components: {
    PortfolioUpdate
  },
  created() {
    eventBus.$emit("sendTitle", "PortfolioDetail");
  }
};
</script>

<style></style>
