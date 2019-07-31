<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <PostEdit></PostEdit>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import PostEdit from "../components/PostEdit";

export default {
  name: "PostEditPage",
  components: { PostEdit },
  created() {
    eventBus.$emit("sendTitle", "PostEdit");
  }
};
</script>

<style></style>
