<template>
  <v-footer height="123">
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <div id="openweathermap-widget-23"></div>
        <!-- <v-spacer></v-spacer> -->
      </v-card-title>
      <v-flex class="blue-grey darken-1 py-2 text-xs-center white--text xs12">
        &copy; <strong>당근당근</strong> {{ new Date().getFullYear() }}
      </v-flex>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>

<script>
window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
window.myWidgetParam.push({
  id: 23,
  cityid: "1835848",
  appid: "01e23afa18654a10b34e254d246cd1e9",
  units: "metric",
  containerid: "openweathermap-widget-23"
});
(function() {
  var script = document.createElement("script");
  script.async = true;
  script.charset = "utf-8";
  script.src =
    "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(script, s);
})();
</script>

<style>
.widget-left-menu--small {
  box-shadow: none !important;
  min-height: 40px !important;
}

.widget-left-menu {
  background-color: rgba(255, 255, 255, 0) !important;
}

.widget-left--small {
  min-height: 0px !important;
}

.teal {
  background-color: #fafafa !important;
}
</style>
