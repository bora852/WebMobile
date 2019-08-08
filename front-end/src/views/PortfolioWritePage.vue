<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <PortfolioWrite></PortfolioWrite>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioWrite from "../components/PortfolioWrite";
import { eventBus } from "../main.js";
export default {
  name: "PortfolioPage",
  components: {
    PortfolioWrite
  },
  created() {
    eventBus.$emit("sendTitle", "Portfolio Write");
  }
};
</script>

<style></style>
