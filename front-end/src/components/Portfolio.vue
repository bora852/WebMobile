<template>
  <v-card @click="sendPortfolioData" hover>
    <v-img :src="imgSrc" height="200px"> </v-img>
    <v-card-title primary-title>
      <div>
        <div class="headline title_overflow">
          <p class=" text_font">{{ thisTitle }}</p>
        </div>
        <span class="grey--text body_overflow text_font">{{ thisBody }}</span>
      </div>
    </v-card-title>
  </v-card>
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
      this.$router.push("/portfolioDetail?idx=" + this.idx);
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
      // console.log(translateUrl)
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
.title_overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
}

.body_overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
</style>
