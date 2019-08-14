<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <PortfolioEdit></PortfolioEdit>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioEdit from "../components/PortfolioEdit";
import { eventBus } from "../main.js";

export default {
  name: "PortfolioEditPage",
  components: {
    PortfolioEdit
  },
  created() {
    eventBus.$emit("sendTitle", "Portfolio Edit");
  }
};
</script>

<style></style>
