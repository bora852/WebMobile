<template>
  <div>
    <v-img :src="imgSrc" aspect-ratio="3">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light title_font">
            <slot name="text" />
          </span>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>
export default {
  name: "ImgBanner",
  props: {
    imgSrc: {
      type: String
    },
    text: {
      type: String
    }
  },
  methods: {},
  data: function() {
    return {
      showMenu: false
    };
  }
};
</script>

<style>
.text-shadow {
  text-shadow: 0 0 15px rgb(255, 255, 255);
}
</style>
