<template>
  <div>
    <v-container>
      <Login></Login>
      <v-toolbar
        fixed
        color="orange"
        dark
        scroll-off-screen
        scroll-target="#scrolling-techniques"
      >
        <v-toolbar-side-icon @click.stop="drawer = !drawer">
          <v-icon>reorder</v-icon>
        </v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor:pointer" title="home">
          <v-toolbar-title class="text_font">donkey's Blog</v-toolbar-title>
        </router-link>

        <v-btn
          icon
          class="hidden-md-and-up"
          v-show="isLogin"
          @click.stop="drawer = !drawer"
        >
          <v-icon color="yellow">check_circle</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <div tag="span" class="mobile_login" v-show="isLogin">
          <span>{{ userId }}님 환영합니다.</span>
          <v-btn icon title="Logout" @click="myLogOut()">
            <v-icon>power_off</v-icon>
          </v-btn>
        </div>

        <v-btn
          icon
          class="hidden-sm-and-down"
          title="LogIn"
          v-show="!isLogin"
          @click="loginPop()"
        >
          <v-icon>account_circle</v-icon>
        </v-btn>

        <v-btn icon class="hidden-screen-only" title="SignUp" v-show="!isLogin">
          <router-link to="signup" tag="span">
            <v-icon>assignment_ind</v-icon>
          </router-link>
        </v-btn>

        <v-btn v-show="isAdmin" icon class="hidden-sm-and-down" title="Admin">
          <router-link to="/admin" tag="span">
            <v-icon>settings</v-icon>
          </router-link>
        </v-btn>

        <v-btn
          v-for="item in items"
          icon
          class="hidden-screen-only"
          :title="item.title"
          :key="item.title"
        >
          <router-link :to="item.router" tag="span">
            <v-icon>{{ item.icon }}</v-icon>
          </router-link>
        </v-btn>

        <v-btn
          v-for="btnItem in btnItems"
          icon
          :title="btnItem.title"
          :key="btnItem.title"
        >
          <v-icon @click="btnItem.clickAction">{{ btnItem.icon }} </v-icon>
        </v-btn>

        <v-btn icon title="home">
          <router-link to="/" tag="div">
            <v-icon>home</v-icon>
          </router-link>
        </v-btn>
      </v-toolbar>

      <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list class="pa-1">
          <v-list-tile avatar v-show="isLogin">
            <v-list-tile-avatar>
              <img src="../assets/logo.png" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ userId }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar v-show="!isLogin">
            <v-list-tile-avatar>
              <img src="../assets/pleaseLogin.png" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="text_font">
                로그인 해주세요.
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <router-link
            v-for="item in items"
            :key="item.title"
            :to="item.router"
            class="hover-effect"
            tag="span"
          >
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="text_font">
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>

          <router-link to="/Calendars" class="hover-effect" tag="span">
            <v-list-tile
              class="hover-effect"
              title="Calendars"
              v-show="isLogin"
            >
              <v-list-tile-action>
                <v-icon>calendar_today</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="text_font">
                Calendars
              </v-list-tile-content>
            </v-list-tile>
          </router-link>

          <v-list-tile
            class="hover-effect"
            title="LogIn"
            v-show="!isLogin"
            @click="loginPop()"
          >
            <v-list-tile-action>
              <v-icon>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="text_font"> Login </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            class="hover-effect"
            v-show="isLogin"
            icon
            title="Logout"
            @click="myLogOut()"
          >
            <v-list-tile-action>
              <v-icon>power_off</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="text_font">
              LogOut
            </v-list-tile-content>
          </v-list-tile>

          <router-link class="hover-effect" to="signup" tag="span">
            <v-list-tile title="SignUp" v-show="!isLogin">
              <v-list-tile-action>
                <v-icon>assignment_ind</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="text_font">
                SignUp
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import UserService from "@/services/UserService";
import PushService from "@/services/PushService";
import Login from "../components/Login.vue";
import Swal from "sweetalert2";

export default {
  name: "Header",
  components: {
    Login
  },
  data() {
    return {
      isAdmin: false,
      isTeam: false,
      dialog: false,
      isLogin: false,
      userId: "",
      drawer: null,
      btnItems: [
        {
          title: "Bookmark",
          clickAction: () => {
            this.favorite();
          },
          icon: "bookmark"
        },
        {
          title: "translate",
          clickAction: () => {
            this.trans();
          },
          icon: "g_translate"
        }
      ],
      items: [
        {
          title: "Post",
          icon: "camera_alt",
          router: "post"
        },
        {
          title: "Portfolio",
          icon: "dvr",
          router: "portfolio"
        },
        {
          title: "Repository",
          icon: "insert_chart_outlined",
          router: "repository"
        },
        {
          title: "Chat",
          icon: "chat",
          router: "chat"
        }
      ]
    };
  },
  methods: {
    favorite() {
      var bookmarkURL = window.location.href;
      var bookmarkTitle = document.title;
      var triggerDefault = false;
      if (window.sidebar && window.sidebar.addPanel) {
        window.sidebar.addPanel(bookmarkTitle, bookmarkURL, "");
      } else if (
        (window.sidebar &&
          navigator.userAgent.toLowerCase().indexOf("firefox") > -1) ||
        (window.opera && window.print)
      ) {
        var $this = $(this);
        $this.attr("href", bookmarkURL);
        $this.attr("title", bookmarkTitle);
        $this.attr("rel", "sidebar");
        $this.off(e);
        triggerDefault = true;
      } else if (window.external && "AddFavorite" in window.external) {
        window.external.AddFavorite(bookmarkURL, bookmarkTitle);
      } else {
        Swal.fire({
          title:
            (navigator.userAgent.toLowerCase().indexOf("mac") != -1
              ? "Cmd"
              : "Ctrl") + "+D",
          text:
            (navigator.userAgent.toLowerCase().indexOf("mac") != -1
              ? "Cmd"
              : "Ctrl") + "+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.",
          type: "info",
          confirmButtonText: "Ok!"
        });
      }
      return triggerDefault;
    },
    async myLogOut() {
      await UserService.logOut();
      this.drawer = false;
    },
    loginPop() {
      eventBus.$emit("popUpLogin", "value");
    },
    trans() {
      eventBus.$emit("click-icon");
    }
  },
  created() {
    UserService.loginChk();
    // PushService.listenPush();
    eventBus.$on("getUserId", userId => {
      this.isLogin = true;
      this.userId = userId;
    });
    eventBus.$on("logOut", () => {
      this.isLogin = false;
      this.userId = null;
      this.$router.push("/");
    });
  },
  computed: {
    watch_auth() {
      return this.$store.state.userAuth;
    }
  },
  watch: {
    watch_auth(auth) {
      if (auth == "admin") {
        this.isAdmin = true;
        this.isTeam = true;
      } else if (auth == "team") {
        this.isAdmin = false;
        this.isTeam = true;
      } else {
        this.isAdmin = false;
        this.isTeam = false;
      }
    }
  }
};
</script>

<style>
.text-white {
  color: white;
}

.hover-effect:hover {
  cursor: pointer;
  color: orange;
}
.container {
  padding-top: 41px;
}

@media (max-width: 960px) {
  .mobile_login {
    display: none;
  }
  .container {
    padding-top: 24px;
  }
}
@media only screen and (max-width: 747px) {
  .container {
    padding-top: 40px;
  }
}
</style>
