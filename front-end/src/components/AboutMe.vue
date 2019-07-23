<template>
  <v-container>
    <v-carousel show-arrows-on-hover>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
        <v-layout align-center fill-height justify-center>
          <div class="mb-3 mobile_center opacity text-shadow font-weight-light">
            <p class="name_font common_font text_font">{{ item.name }}</p>
            <br /><br />
            <p class="info_font common_font text_font">{{ item.mobile }}</p>
            <br />
            <p class="info_font common_font text_font">{{ item.address }}</p>
            <br />
            <p class="info_font common_font text_font">{{ item.Skill }}</p>
            <br />
            <p class="info_font common_font text_font">{{ item.Aspiration }}</p>
          </div>
          <br /><br /><br />
        </v-layout>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import { eventBus } from "../main.js";

$(document).ready(function(){
$(".fas").addClass("fa");
});

export default {
  components: {},
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    }
  },
  created() {
    eventBus.$on("click-icon", async () => {
      const axios = require("axios");
      var translateUrl =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyChUf-_S1c5gnxJdSZE8u5hBjTyRlBSgm8";
      translateUrl += "&source=" + this.fromLang;
      translateUrl += "&target=" + this.toLang;
      for (var i = 0; i < 4; i++) {
        translateUrl += "&q=" + encodeURIComponent(this.items[i].name);
        translateUrl += "&q=" + encodeURIComponent(this.items[i].mobile);
        translateUrl += "&q=" + encodeURIComponent(this.items[i].address);
        translateUrl += "&q=" + encodeURIComponent(this.items[i].Skill);
      }
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
        for (var i = 0; i < 4; i++) {
          this.items[i].name += "&q=" + encodeURI(this.items[i].name);
          this.items[i].mobile += "&q=" + encodeURI(this.items[i].mobile);
          this.items[i].address += "&q=" + encodeURI(this.items[i].address);
          this.items[i].Skill += "&q=" + encodeURI(this.items[i].Skill);
        }
        this.items[0].name = res.data.data.translations[0].translatedText;
        this.items[0].mobile = res.data.data.translations[1].translatedText;
        this.items[0].address = res.data.data.translations[2].translatedText;
        this.items[0].Skill = res.data.data.translations[3].translatedText;

        this.items[1].name = res.data.data.translations[4].translatedText;
        this.items[1].mobile = res.data.data.translations[5].translatedText;
        this.items[1].address = res.data.data.translations[6].translatedText;
        this.items[1].Skill = res.data.data.translations[7].translatedText;

        this.items[2].name = res.data.data.translations[8].translatedText;
        this.items[2].mobile = res.data.data.translations[9].translatedText;
        this.items[2].address = res.data.data.translations[10].translatedText;
        this.items[2].Skill = res.data.data.translations[11].translatedText;

        this.items[3].name = res.data.data.translations[12].translatedText;
        this.items[3].mobile = res.data.data.translations[13].translatedText;
        this.items[3].address = res.data.data.translations[14].translatedText;
        this.items[3].Skill = res.data.data.translations[15].translatedText;
      });
    });
  },
  data() {
    return {
      items: [{
          src: "https://i.imgur.com/Kxb4Xpg.png",
          name: "위영웅 😎",
          mobile: "Mobile : 010 2726 2771",
          address: "거주지 : 광주광역시",
          Skill: "Skill : java, Vue.js, mySQL등"
        },
        {
          src: "https://i.imgur.com/Kxb4Xpg.png",
          name: "천보라 😊",
          mobile: "Mobile : 010 6675 7924",
          address: "거주지 : 목포시",
          Skill: "Skill : java, Vue.js, mySQL등"
        },
        {
          src: "https://i.imgur.com/Kxb4Xpg.png",
          name: "김혜빈 🥰",
          mobile: "Mobile : 010 4159 5400",
          address: "거주지 : 광양시",
          Skill: "Skill : java, Vue.js, mySQL등"
        },
        {
          src: "https://i.imgur.com/Kxb4Xpg.png",
          name: "정선열 😋",
          mobile: "Mobile : 010 8989 5491",
          address: "거주지 : 전주시",
          Skill: "Skill : java, Vue.js, mySQL등"
        }
      ],
      fromLang: "ko",
      toLang: "en"
    };
  }
};
</script>
<style>
.name_font {
  font-size: 30px;
  color: black;
  font-weight: 700;
}
.info_font {
  font-size: 20px;
  color: black;
  font-weight: 550;
}
.opacity {
  background: rgba(255, 255, 255, 0.5);
  padding: 5px;
}
</style>
