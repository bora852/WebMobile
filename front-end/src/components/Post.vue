<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <div class="caption">{{ formatedDate }}</div>
      <h2 class="color-333 font-weight-light title_overflow text_font">
        {{ thisTitle }}
      </h2>
      <p
        class="mb-1 color-666 font-weight-light subheading body_overflow text_font"
      >
        {{ thisBody }}
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "Post",
  props: {
    date: {
      type: Date
    },
    title: {
      type: String
    },
    body: {
      type: String
    }
  },
  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`;
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
        this.thisTitle = res.data.data.translations[0].translatedText;
        this.thisBody = res.data.data.translations[1].translatedText;
        if (this.fromLang == "en") {
          this.fromLang = "ko";
          this.toLang = "en";
        } else {
          this.fromLang = "en";
          this.toLang = "ko";
        }
      });
    });
  },
  mounted() {
    this.thisTitle = this.title;
    this.thisBody = this.body;
  },
  data() {
    return {
      thisTitle: "",
      thisBody: "",
      fromLang: "ko",
      toLang: "en"
    };
  }
};
</script>

<style>
.color-666 {
  color: #666;
}

.color-333 {
  color: #333;
}

.h-100 {
  height: 100%;
}

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
