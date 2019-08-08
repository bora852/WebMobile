<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <PostWrite></PostWrite>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import PostWrite from "../components/PostWrite";

export default {
  name: "PostWritePage",
  components: { PostWrite },
  created() {
    eventBus.$emit("sendTitle", "PostWrite");
  }
};
</script>

<style></style>
