<template>
  <v-flex>
    <ImgBanner id="imgsrc" v-bind:imgSrc="imgUrl" data-aos="fade-down">
      <div
        style="line-height:1.2em; font-size:8vw;"
        slot="text"
        class="title_font"
      >
        {{ bannerText }}
      </div>
    </ImgBanner>

    <InsertImg v-on:ImgLink="ImgLink"></InsertImg>
  </v-flex>
</template>

<script>
import ImgBanner from "./ImgBanner";
import InsertImg from "./InsertImage";

import { eventBus } from "../main.js";

export default {
  name: "BannerImgSet",
  components: {
    ImgBanner,
    InsertImg
  },
  data() {
    return {
      imgUrl: "https://source.unsplash.com/random",
      bannerText: "자"
    };
  },
  methods: {
    ImgLink(link) {
      this.imgUrl = link;
    }

    // document.getElementById('imgsrc').children[0].children[1].style.backgroundImage =link;
  },
  created() {
    eventBus.$on("sendTitle", title => {
      this.bannerText = title;
    });
  }
};
</script>

<style></style>
