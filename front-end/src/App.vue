<template>
  <v-app>
    <go-top />
    <Header />
    <Alert />
    <BannerImg />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoTop from "@inotom/vue-go-top";
import Alert from "./components/BrowserAlert";
import BannerImg from "./components/BannerImgSetup";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    GoTop,
    Alert,
    BannerImg
  },
  store,
  data() {
    return {};
  }
};
</script>

<style></style>
