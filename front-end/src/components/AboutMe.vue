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
      :autoplay-timeout="10000"
      :display="3"
      :perspective="0"
      :height="400"
      :border="0"
    >
      <slide :index="0">
        <v-card
          color="indigo darken-3 white--text"
          class="mx-auto"
          style="height:400px"
        >
          <div>
            <v-btn @click.stop="dialog1 = true" small>
              MY PROFILE
            </v-btn>
            <v-divider color="white"></v-divider>
          </div>

          <div style="padding:10px" class="my-5 text-xs-center text_font">
            <div>
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  style="width:100px; height:100px"
                />
              </v-avatar>
            </div>

            <v-card-text class="my-4">
              <div style="font-size:1.6em">정선열</div>
              <div class="my-3" style="font-size:1.3em">
                농담을 좋아하는 개발자입니다.
              </div>
              <v-divider color="white"></v-divider>
              <div>
                <v-btn
                  icon
                  title="MyProfile"
                  style="color:white"
                  @click.stop="dialog1 = true"
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
          </div>
        </v-card>
      </slide>

      <slide :index="1">
        <v-card
          color="red lighten-1 white--text"
          class="mx-auto"
          style="height:400px"
        >
          <div>
            <v-chip class="ma-2" color="white" label text-color="navy">
              USER PROFILE
            </v-chip>
            <v-divider color="white"></v-divider>
          </div>

          <div style="padding:10px" class="my-5 text-xs-center text_font">
            <div>
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  style="width:100px; height:100px"
                />
              </v-avatar>
            </div>

            <v-card-text class="my-4">
              <div style="font-size:1.6em">정선열</div>
              <div class="my-3" style="font-size:1.3em">
                농담을 좋아하는 개발자입니다.
              </div>

              <div>
                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="signup" tag="span">
                    <v-icon>person</v-icon>
                  </router-link>
                </v-btn>

                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="" tag="span">
                    <v-icon>email</v-icon>
                  </router-link>
                </v-btn>

                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="" tag="span">
                    <v-icon>phone</v-icon>
                  </router-link>
                </v-btn>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </slide>

      <slide :index="2">
        <v-card
          color="amber accent-2 white--text"
          class="mx-auto"
          style="height:400px"
        >
          <div>
            <v-chip class="ma-2" color="white" label text-color="navy">
              MY PROFILE
            </v-chip>
            <v-divider color="white"></v-divider>
          </div>

          <div style="padding:10px" class="my-5 text-xs-center text_font">
            <div>
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  style="width:100px; height:100px"
                />
              </v-avatar>
            </div>

            <v-card-text class="my-4">
              <div style="font-size:1.6em">정선열</div>
              <div class="my-3" style="font-size:1.3em">
                농담을 좋아하는 개발자입니다.
              </div>

              <div>
                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="signup" tag="span">
                    <v-icon>person</v-icon>
                  </router-link>
                </v-btn>

                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="" tag="span">
                    <v-icon>email</v-icon>
                  </router-link>
                </v-btn>

                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="" tag="span">
                    <v-icon>phone</v-icon>
                  </router-link>
                </v-btn>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </slide>

      <slide :index="3">
        <v-card
          color="pink lighten-2 white--text"
          class="mx-auto"
          style="height:400px"
        >
          <div>
            <v-chip class="ma-2" color="white" label text-color="navy">
              USER PROFILE
            </v-chip>
            <v-divider color="white"></v-divider>
          </div>

          <div style="padding:10px" class="my-5 text-xs-center text_font">
            <div>
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  style="width:100px; height:100px"
                />
              </v-avatar>
            </div>

            <v-card-text class="my-4">
              <div style="font-size:1.6em">정선열</div>
              <div class="my-3" style="font-size:1.3em">
                농담을 좋아하는 개발자입니다.
              </div>

              <div>
                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="signup" tag="span">
                    <v-icon>person</v-icon>
                  </router-link>
                </v-btn>

                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="" tag="span">
                    <v-icon>email</v-icon>
                  </router-link>
                </v-btn>

                <v-btn icon title="MyProfile" style="color:white">
                  <router-link to="" tag="span">
                    <v-icon>phone</v-icon>
                  </router-link>
                </v-btn>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </slide>
    </carousel-3d>

    <v-layout>
      <v-dialog v-model="dialog1" max-width="400" max-height="800">
        <v-card color="indigo darken-3 white--text ">
          <v-card-title class="headline">
            <v-icon color="white" large class="mx-1">account_circle</v-icon
            >정선열
          </v-card-title>
          <v-divider color="white"></v-divider>
          <v-card-text style="font-size:1.2em">
            <div class="my-2">
              <v-icon color="orange" class="mx-1">location_on</v-icon
              ><span class="orange--text mx-2">LOCATION</span>
              <div class="mx-4">대한민국 광주광역시</div>
            </div>

            <div class="my-2">
              <v-icon color="orange" class="mx-1">email</v-icon
              ><span class="orange--text mx-2">EMAIL</span>
              <div class="mx-4">선열@google.com</div>
            </div>

            <div class="my-2">
              <v-icon color="orange" class="mx-1">phone</v-icon
              ><span class="orange--text mx-2">PHONE</span>
              <div class="mx-4">010-1111-1111</div>
            </div>

            <div class="my-2">
              <v-icon color="orange" class="mx-1">home</v-icon
              ><span class="orange--text mx-2">MY GITLAB</span>
              <div class="mx-4">
                GO GITLAB<v-icon
                  color="white"
                  class="mx-1"
                  style="font-size:1.0em"
                  >mouse</v-icon
                >
              </div>
            </div>

            <div class="my-2">
              <v-icon color="orange" class="mx-1">folder_special</v-icon
              ><span class="orange--text mx-2">MY PROJECT</span>
            </div>

            <div class="mx-4">
              - 바른먹거리 프로젝트<v-icon
                color="white"
                class="mx-1"
                style="font-size:1.0em"
                >mouse</v-icon
              >
            </div>

            <div class="my-3">
              <v-icon color="orange" class="mx-1">tune</v-icon>MY SKILLS
            </div>

            <div class="mx-4">
              <v-progress-linear value="50" color="pink" height="20" reactive>
                <strong text-center>Vue.js - 중</strong>
              </v-progress-linear>

              <v-progress-linear
                value="50"
                color="deep-purple accent-2"
                height="20"
              >
                <strong text-center>JAVA - 중</strong>
              </v-progress-linear>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="dialog1 = false"
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
  </v-container>
</template>

<script>
import { eventBus } from "../main.js";
// import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  // components: {
  //   "carousel-3d": Carousel3d,
  //   slide: Slide
  // },
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
      dialog1: false,
      fromLang: "ko",
      toLang: "en"
    };
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
