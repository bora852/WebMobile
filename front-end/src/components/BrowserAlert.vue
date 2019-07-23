<template>
  <div>
    <v-alert
      :value="alert"
      type="error"
      icon="new_releases"
      @click="alert = !alert"
      style="margin:0px"
    >
      본 사이트는 Chrome 브라우저에 최적화 되어 있습니다.
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {
      alert: false
    };
  },
  mounted() {
    this.checkBrowser();
  },
  methods: {
    checkBrowser() {
      var isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);
      if (!isChrome) {
        this.alert = true;
      }
    }
  }
};
</script>

<style></style>
