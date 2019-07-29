<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <WritePost></WritePost>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import WritePost from "../components/WritePost";

export default {
  name: "PostWritePage",
  components: { WritePost },
  created() {
    eventBus.$emit("sendTitle", "PostWrite");
  }
};
</script>

<style></style>
