<template>
  <v-app>
    <go-top right="22px" :size="60"/>
    <ChatBot />
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
import ChatBot from "./components/ChatBot"

export default {
  name: "App",
  components: {
    Header,
    Footer,
    GoTop,
    Alert,
    BannerImg,
    ChatBot
  },
  store,
  data() {
    return {};
  }
};
</script>

<style></style>
