<template>
  <div>
    <v-container>
      <!-- PortfolioDetail -->
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <Postdetail></Postdetail>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Postdetail from "../components/PostDetail";
import { eventBus } from "../main.js";

export default {
  name: "PostDetail",
  components: {
    Postdetail
  },
  created() {
    eventBus.$emit("sendTitle", "Post Detail");
  }
};
</script>

<style></style>
