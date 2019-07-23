<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <WritePortfolio></WritePortfolio>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import WritePortfolio from "../components/WritePortfolio";
import { eventBus } from "../main.js";
export default {
  name: "PortfolioPage",
  components: {
    WritePortfolio
  },
  created() {
    eventBus.$emit("sendTitle", "WritePortfolio");
  }
};
</script>

<style></style>
