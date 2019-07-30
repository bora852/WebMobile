<template>
  <v-footer height="123">
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <div id="openweathermap-widget-23"></div>
        <div id="frogue-container" class="position-right-bottom" data-chatbot="ca2778bc-a8e5-4076-9543-40debed84c1f" data-user="rlagpqls123@gmail.com" data-init-key="value"></div>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-flex class="grey lighten-3 py-2 text-xs-center black--text xs12">
        &copy; <strong>NobleTuna</strong> {{ new Date().getFullYear() }}
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

<script>
(function(d, s, id) {
  var js,fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https:\/\/danbee.ai/js/plugins/frogue-embed/frogue-embed.min.js";
  fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'frogue-embed'));
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
