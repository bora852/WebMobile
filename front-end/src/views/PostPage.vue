<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 data-aos="fade-right">
          <PostList :limits="6" :load-more="true"></PostList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PostList from "../components/PostList";
import { eventBus } from "../main.js";
export default {
  name: "PostPage",
  components: {
    PostList
  },
  created() {
    eventBus.$emit("sendTitle", "Post");
  }
};
</script>

<style></style>
