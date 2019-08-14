<template>
  <v-app>
    <Intro v-if="router_check"/>
    <template v-if="!router_check">
    <go-top right="22px" :size="60"/>
    <ChatBot />
    <Header />
    <Alert />
    <BannerImg />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </template>
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
import Intro from "./components/Intro"

$(document).ready(function(){
$(".fas").addClass("fa");
});

export default {
  name: "App",
  components: {
    Header,
    Footer,
    GoTop,
    Alert,
    BannerImg,
    ChatBot,
    Intro
  },
  store,
  data() {
    return {};
  },
  computed : {
    router_check(){

      return this.$router.history.current.path=="/";
    }
  },

};
</script>

<style></style>
