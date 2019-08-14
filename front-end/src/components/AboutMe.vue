<template>
  <v-container>
    <carousel-3d
      :controls-visible="true"
      :controls-prev-html="'&#9001;'"
      :controls-next-html="'&#9002;'"
      :controls-width="30"
      :controls-height="60"
      :clickable="false"
      :autoplay="true"
      dir="ltr"
      :autoplay-timeout="3000"
      :display="3"
      :perspective="0"
      :height="400"
      :border="0"
    >
      <div v-for="(item, i) in items" :key="i">
        <slide :index="i">
          <v-card :color="item.color" class="mx-auto" style="height:400px">
            <div>
              <v-btn @click.stop="openDialog(i)" small>
                MY PROFILE
              </v-btn>
              <v-divider color="white"></v-divider>
            </div>

            <div style="padding:10px" class="my-4 text-xs-center text_font">
              <div>
                <v-avatar :size="80">
                  <img :src="item.src" />
                </v-avatar>
              </div>

              <v-card-text class="my-3">
                <div style="font-size:1.6em">{{ item.name }}</div>
                <div class="my-3" style="font-size:1.3em">
                  {{ item.detail }}
                </div>
                <v-divider color="white"></v-divider>
                <div class="my-1">
                  <v-btn
                    icon
                    title="MyProfile"
                    style="color:white"
                    @click.stop="openDialog(i)"
                  >
                    <v-icon>person</v-icon>
                  </v-btn>

                  <v-btn icon title="MyProfile" style="color:white">
                    <router-link to="" tag="span">
                      <v-icon>email</v-icon>
                    </router-link>
                  </v-btn>

                  <v-btn icon title="MyProfile" style="color:white">
                    <router-link to="" tag="div">
                      <v-icon>phone</v-icon>
                    </router-link>
                  </v-btn>
                </div>
              </v-card-text>
              <div>
                <v-icon color="white" style="font-size:1.2em"
                  >location_on</v-icon
                ><span>gwangju</span>
              </div>
            </div>
          </v-card>
        </slide>
      </div>
    </carousel-3d>

    <div v-for="(item, i) in items" :key="i">
      <v-layout>
        <v-dialog v-model="dialog[i]" max-width="400" max-height="800">
          <v-card :color="item.color">
            <v-card-title class="headline">
              <v-avatar class="mx-2">
                <img :src="item.src" />
              </v-avatar>
              <span>{{ item.name }}</span>
            </v-card-title>
            <v-divider color="white"></v-divider>
            <v-card-text style="font-size:1.2em">
              <div class="my-2">
                <v-icon :color="item.iconColor" class="mx-1">location_on</v-icon
                ><span :class="item.txtColor">LOCATION</span>
                <div class="mx-4">{{ item.location }}</div>
              </div>

              <div class="my-2">
                <v-icon :color="item.iconColor" class="mx-1">email</v-icon
                ><span :class="item.txtColor">EMAIL</span>
                <div class="mx-4">{{ item.email }}</div>
              </div>

              <div class="my-2">
                <v-icon :color="item.iconColor" class="mx-1">phone</v-icon
                ><span :class="item.txtColor">PHONE</span>
                <div class="mx-4">{{ item.mobile }}</div>
              </div>

              <div class="my-2">
                <v-icon :color="item.iconColor" class="mx-1">home</v-icon
                ><span :class="item.txtColor">MY GITLAB</span>
                <div class="mx-4" @click="goToUrl(item.gitlab)">
                  <span style="cursor:pointer"
                    >GO GITLAB<v-icon
                      color="white"
                      class="mx-1"
                      style="font-size:1.0em"
                      >mouse</v-icon
                    >
                  </span>
                </div>
              </div>

              <div class="my-2">
                <v-icon :color="item.iconColor" class="mx-1"
                  >folder_special</v-icon
                ><span :class="item.txtColor">MY PROJECT</span>
              </div>

              <div class="mx-4" @click="goToUrl(item.projects.project_url)">
                <span style="cursor:pointer">
                  {{ item.projects.project_nm }}
                  <v-icon color="white" class="mx-1" style="font-size:1.0em"
                    >mouse</v-icon
                  >
                </span>
              </div>

              <div class="my-3">
                <v-icon :color="item.iconColor" class="mx-1">tune</v-icon>
                <span :class="item.txtColor">MY SKILLS</span>
              </div>

              <div class="mx-4">
                <v-progress-linear
                  :value="item.skills[0].skill_value"
                  :color="item.skills[0].color"
                  height="20"
                  reactive
                >
                  <strong class="mx-2">{{ item.skills[0].skill_nm }}</strong>
                </v-progress-linear>

                <v-progress-linear
                  :value="item.skills[1].skill_value"
                  :color="item.skills[1].color"
                  height="20"
                  reactive
                >
                  <strong class="mx-2">{{ item.skills[1].skill_nm }}</strong>
                </v-progress-linear>

                <v-progress-linear
                  :value="item.skills[2].skill_value"
                  :color="item.skills[2].color"
                  height="20"
                  reactive
                >
                  <strong class="mx-2">{{ item.skills[2].skill_nm }}</strong>
                </v-progress-linear>

                <v-progress-linear
                  :value="item.skills[3].skill_value"
                  :color="item.skills[3].color"
                  height="20"
                  reactive
                >
                  <strong class="mx-2">{{ item.skills[3].skill_nm }}</strong>
                </v-progress-linear>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="openDialog(i)"
                color="white"
                flat
                small
                replace
                slot="text"
                class="text_font btn"
                >확인</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  data() {
    return {
      dialog: [false, false, false, false],
      fromLang: "ko",
      toLang: "en",
      items: [
        {
          src:
            "https://lab.ssafy.com/uploads/-/system/user/avatar/160/avatar.png",
          name: "위영웅",
          color: "amber accent-2 white--text",
          mobile: "010-2726-2771",
          location: "대한민국 광주광역시",
          detail: "고양이를 좋아하는 개발자입니다.",
          email: "lyy7661@gmail.com",
          gitlab: "https://lab.ssafy.com/NobleTuna",
          iconColor: "indigo darken-3",
          txtColor: ["indigo--text", "mx-2"],
          projects: {
            project_nm: "SW 개발 비서 구현",
            project_url: "https://lab.ssafy.com/JeongSY/webmobile-final"
          },
          skills: [
            { skill_nm: "JAVA - 중상", skill_value: 70, color: "pink" },
            {
              skill_nm: "Vue.js - 중",
              skill_value: 50,
              color: "deep-purple accent-2"
            },
            { skill_nm: "SQL - 중", skill_value: 50, color: "blue" },
            {
              skill_nm: "HTML5/CSS3 - 중",
              skill_value: 50,
              color: "red lighten-1"
            }
          ]
        },
        {
          src:
            "https://lab.ssafy.com/uploads/-/system/user/avatar/231/avatar.png",
          name: "천보라",
          color: "indigo darken-3 white--text",
          mobile: "010-6675-7924",
          location: "대한민국 광주광역시",
          detail: "성장하고 싶은 개발자입니다.",
          email: "cbora852@gmail.com",
          gitlab: "https://lab.ssafy.com/bora",
          iconColor: "orange accent-4",
          txtColor: ["orange--text", "mx-2"],
          projects: {
            project_nm: "SW 개발 비서 구현",
            project_url: "https://lab.ssafy.com/JeongSY/webmobile-final"
          },
          skills: [
            { skill_nm: "JAVA - 중", skill_value: 50, color: "pink" },
            {
              skill_nm: "Vue.js - 중",
              skill_value: 50,
              color: "deep-purple accent-2"
            },
            { skill_nm: "SQL - 중상", skill_value: 65, color: "amber" },
            {
              skill_nm: "HTML5/CSS3 - 중",
              skill_value: 50,
              color: "red lighten-1"
            }
          ]
        },
        {
          src:
            "https://lab.ssafy.com/uploads/-/system/user/avatar/517/avatar.png",
          name: "김혜빈",
          color: "red lighten-1 white--text",
          mobile: "010-4159-5400",
          location: "대한민국 광주광역시",
          detail: "귀여운 개발자입니다.",
          email: "rlagpqls123@gmail.com",
          gitlab: "https://lab.ssafy.com/bini",
          iconColor: "indigo darken-4",
          txtColor: ["indigo--text", "mx-2"],
          projects: {
            project_nm: "SW 개발 비서 구현",
            project_url: "https://lab.ssafy.com/JeongSY/webmobile-final"
          },
          skills: [
            { skill_nm: "JAVA - 중", skill_value: 50, color: "pink" },
            {
              skill_nm: "Vue.js - 중",
              skill_value: 50,
              color: "deep-purple accent-2"
            },
            { skill_nm: "SQL - 중", skill_value: 50, color: "amber" },
            {
              skill_nm: "HTML5/CSS3 - 중",
              skill_value: 50,
              color: "blue lighten-1"
            }
          ]
        },
        {
          src:
            "https://lab.ssafy.com/uploads/-/system/user/avatar/147/avatar.png",
          name: "정선열",
          color: "pink lighten-2 white--text",
          mobile: "010-8989-5491",
          location: "대한민국 광주광역시",
          detail: "아재개그를 좋아하는 개발자입니다.",
          email: "jsy23232323@gmail.com",
          gitlab: "https://lab.ssafy.com/JeongSY",
          iconColor: "indigo darken-4",
          txtColor: ["indigo--text", "mx-2"],
          projects: {
            project_nm: "SW 개발 비서 구현",
            project_url: "https://lab.ssafy.com/JeongSY/webmobile-final"
          },
          skills: [
            { skill_nm: "JAVA - 중", skill_value: 50, color: "blue" },
            {
              skill_nm: "Vue.js - 중",
              skill_value: 50,
              color: "deep-purple accent-2"
            },
            { skill_nm: "SQL - 중", skill_value: 50, color: "amber" },
            {
              skill_nm: "HTML5/CSS3 - 중",
              skill_value: 50,
              color: "red lighten-1"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    openDialog(index) {
      this.$set(this.dialog, index, !this.dialog[index]);
    },
    goToUrl(url) {
      window.open(url);
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
        translateUrl += "&q=" + encodeURIComponent(this.items[i].detail);
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
          this.items[i].detail += "&q=" + encodeURI(this.items[i].detail);
        }
        this.items[0].name = res.data.data.translations[0].translatedText;
        this.items[0].detail = res.data.data.translations[1].translatedText;

        this.items[1].name = res.data.data.translations[2].translatedText;
        this.items[1].detail = res.data.data.translations[3].translatedText;

        this.items[2].name = res.data.data.translations[4].translatedText;
        this.items[2].detail = res.data.data.translations[5].translatedText;

        this.items[3].name = res.data.data.translations[6].translatedText;
        this.items[3].detail = res.data.data.translations[7].translatedText;
      });
    });
  }
};
</script>
<style>
.carousel-3d-container figure {
  margin: 0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>
