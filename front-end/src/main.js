import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";
import "font-awesome/css/font-awesome.min.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueResource from "vue-resource";

import AOS from "aos";
import "aos/dist/aos.css";

import Carousel3d from "vue-carousel-3d";

AOS.init();

export const eventBus = new Vue();

AOS.init();
Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "fa",
  theme: {
    primary: "#3f51b5",
    secondary: "#b0bec5",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});
Vue.use(VueSimplemde);
Vue.use(VueResource);
Vue.use(Carousel3d);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
