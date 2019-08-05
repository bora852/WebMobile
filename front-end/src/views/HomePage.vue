<template>
  <div style="overflow-x: hidden; overflow-y: hidden;">
    <!--<AttachImg></AttachImg>img components -->
    <v-container>
      <AboutMe data-aos="fade-right"></AboutMe>
      <!-- Portfolio -->
      <v-layout my-5 data-aos="fade-left">
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">
            <v-btn
              color="warning"
              flat
              large
              to="portfolio"
              replace
              style="font-size:1.2em;text-transform:none;"
              slot="text"
              class="title_font"
              >Portfolio</v-btn
            >
          </h2>
          <PortfolioList></PortfolioList>
        </v-flex>
      </v-layout>

      <!-- Post -->
      <v-layout my-5 data-aos="fade-right">
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">
            <v-btn
              color="warning"
              flat
              large
              to="Post"
              replace
              style="font-size:1.2em;text-transform:none;"
              slot="text"
              class="title_font"
              >Post</v-btn
            >
          </h2>
          <PostList :column="2"></PostList>
        </v-flex>
      </v-layout>

      <v-layout my-5 data-aos="fade-right">
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">
            <v-btn
              color="warning"
              flat
              large
              to="repository"
              replace
              style="font-size:1.2em;text-transform:none;"
              slot="text"
              class="title_font"
              >Repository</v-btn
            >
          </h2>
          <RepositoryList></RepositoryList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import AboutMe from "../components/AboutMe";
import { eventBus } from "../main.js";
import RepositoryList from "../components/RepositoryList";
import PushService from "../services/PushService";

export default {
  name: "HomePage",
  components: {
    AboutMe,
    PortfolioList,
    PostList,
    RepositoryList
  },
  data: function() {
    return {};
  },
  created() {
    var user = this.$store.state.user;
    if (user) {
      PushService.sendPush(user);
    }
    eventBus.$emit("sendTitle", "Home");
  }
};
</script>

<style>
@media (max-width: 960px) {
  .mobile_center {
    text-align: center;
  }
}

.borderImg {
  border-radius: 100px;
  box-shadow: 5px 5px 20px 5px gray;
}
</style>
