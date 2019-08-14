<template>
  <div>
    <v-container>
      <SignUp></SignUp>
    </v-container>
  </div>
</template>

<script>
import SignUp from "../components/SignUp";
import { eventBus } from "../main.js";

export default {
  name: "signuppage",
  components: {
    SignUp
  },
  data: function() {
    return {};
  },
  mounted() {},
  created() {
    eventBus.$emit("sendTitle", "SignUp");
  }
};
</script>

<style></style>
