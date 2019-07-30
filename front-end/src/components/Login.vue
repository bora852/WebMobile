<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="290">
      <v-container style="padding:15px;">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon title="구글 아이디로 로그인" @click="loginGoogle">
              <v-img :src="getImgUrl('google_icon.png')" aspect-ratio="1" />
            </v-btn>

            <v-btn icon title="페이스북 아이디로 로그인" @click="loginFacebook">
              <v-img :src="getImgUrl('facebook_icon.png')" aspect-ratio="1" />
            </v-btn>
          </v-card-actions>
          <v-container style="padding:20px;">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              :append-icon="show3 ? 'visibility' : 'visibility_off'"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="show3 ? 'text' : 'password'"
              name="input-10-2"
              label="Password"
              hint="At least 8 characters"
              v-model="password"
              class="input-group--focused"
              @click:append="show3 = !show3"
            ></v-text-field>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="orange darken-1" flat="flat" @click="login()"
              >로그인</v-btn
            >
            <v-btn color="orange darken-1" flat="flat" @click="signUp()"
              >회원가입</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
import { eventBus } from "../main.js";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      passwordRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      dialog: false,
      email: "",
      password: "",
      show3: false
    };
  },
  created() {
    eventBus.$on("popUpLogin", () => {
      this.dialog = !this.dialog;
    });
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    signUp() {
      this.dialog = false;
      this.$router.push("signup");
    },
    async login() {
      const result = await UserService.signIn(this.email, this.password);
      if (result != null) {
        this.$store.state.user = result.user.email;
        this.dialog = false;
      }
    },
    async loginGoogle() {
      const result = await UserService.loginWithGoogle();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user.email;
      this.dialog = false;
    },
    async loginFacebook() {
      const result = await UserService.loginWithFacebook();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user.email;
      this.dialog = false;
    }
  }
};
</script>
