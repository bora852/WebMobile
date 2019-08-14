<template>
  <div>
    <v-container>
      <v-layout my-5 data-aos="fade-left">
        <v-flex xs12>
          <h1 my-3 class="sub_title">Projects</h1>
          <RepositoryList></RepositoryList>
        </v-flex>
      </v-layout>

      <v-flex row my-5 class="hidden-sm-and-down" data-aos="fade-right">
        <h1 my-3 class="sub_title">Git Flow</h1>
      </v-flex>

      <v-layout my-5 data-aos="fade-right">
        <v-flex xs12 class="hidden-sm-and-down">
          <RepositoryGraph></RepositoryGraph>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import RepositoryGraph from "../components/RepositoryGraph";
import RepositoryList from "../components/RepositoryList";
import { eventBus } from "../main.js";

export default {
  name: "RepositoryPage",
  components: {
    RepositoryGraph,
    RepositoryList
  },
  created() {
    eventBus.$emit("sendTitle", "Repository");
  }
};
</script>

<style>
.sub_title {
  text-align: center;
  color: orange;
}
</style>
