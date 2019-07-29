<template>
  <v-container>
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
      hint="At least 6 characters"
      v-model="password"
      class="input-group--focused"
      @click:append="show3 = !show3"
    ></v-text-field>

    <v-text-field
      :append-icon="show3 ? 'visibility' : 'visibility_off'"
      :rules="[passwordRules.required, passwordRules.min]"
      :type="show3 ? 'text' : 'password'"
      name="input-10-2"
      label="Conform Password"
      hint="At least 6 characters"
      v-model="confirm_password"
      class="input-group--focused"
      @click:append="show3 = !show3"
    ></v-text-field>

    <v-flex px10 py10>
      <v-btn color="warning" dark @click.stop="submit()">회원가입</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import UserService from "@/services/UserService";
import Swal from "sweetalert2";

export default {
  data: () => ({
    passwordRules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 6 || "Min 6 characters",
      emailMatch: () => ('The email and password you entered don\'t match')
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    email: "",
    password: "",
    confirm_password: "",
    show3: false,
    message: ""
  }),
  methods: {
    async submit() {
      if (this.password == this.confirm_password) {
        var signUpSuccess = await UserService.signUp(this.email, this.password);
        if (signUpSuccess) {
          this.$router.push("/");
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "비밀번호를 다시 확인해주세요",
          type: "error",
          confirmButtonText: "Ok!"
        });
      }
    }
  }
};
</script>

<style></style>
