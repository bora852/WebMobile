<template>
  <v-hover v-slot:default="{ hover }">
    <v-card @click="sendPortfolioData" hover>
      <v-img :src="imgSrc" height="200px">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          ></div>
        </v-expand-transition>
      </v-img>
      <v-card-title>
        <div>
          <div class="caption">{{ date }}</div>
          <div class="headline">
            <p class=" text_font port_body_overflow">{{ thisTitle }}</p>
          </div>
          <span class="grey--text port_body_overflow text_font">{{
            thisBody
          }}</span>
        </div>
      </v-card-title>
    </v-card>
  </v-hover>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "Portfolio",
  props: {
    date: {
      type: String
    },
    title: {
      type: String
    },
    body: {
      type: String
    },
    imgSrc: {
      type: String
    },
    idx: {
      type: Number
    }
  },
  data() {
    return {
      thisTitle: "",
      thisBody: "",
      fromLang: "ko",
      toLang: "en"
    };
  },
  mounted() {
    this.thisTitle = this.title;
    this.thisBody = this.body;
  },
  methods: {
    sendPortfolioData: function() {
      this.$router.push("/portfolioDetail?num=" + this.idx);
    }
  },
  created() {
    eventBus.$on("click-icon", async () => {
      const axios = require("axios");
      var translateUrl =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyChUf-_S1c5gnxJdSZE8u5hBjTyRlBSgm8";
      translateUrl += "&source=" + this.fromLang;
      translateUrl += "&target=" + this.toLang;
      translateUrl += "&q=" + encodeURI(this.thisTitle);
      translateUrl += "&q=" + encodeURI(this.thisBody);
      axios({
        methods: "GET",
        url: translateUrl
      }).then(res => {
        if (this.fromLang == "en") {
          this.fromLang = "ko";
          this.toLang = "en";
        } else {
          this.fromLang = "en";
          this.toLang = "ko";
        }
        this.thisTitle = res.data.data.translations[0].translatedText;
        this.thisBody = res.data.data.translations[1].translatedText;
      });
    });
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.port_body_overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
