<template>
  <div>
    <UserList></UserList>
    <WriteCount></WriteCount>
  </div>
</template>

<script>
import UserList from "../components/UserList";
import WriteCount from "../components/WriteCount";
import { eventBus } from "../main.js";
import AuthService from "../services/AuthService";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "adminpage",
  components: {
    UserList,
    WriteCount
  },
  created: async function() {
    eventBus.$emit("sendTitle", "Admin");
    var curEmail = this.$store.state.user;
    var auth = await AuthService.authChk(curEmail);
    if (auth != "admin") {
      SwalAlert.swatAlert("Error", "잘못된 접근입니다.", "error", "OK!");
      this.$router.push("/");
    } else {
      this.$store.state.userAuth = auth;
    }
  }
};
</script>

<style></style>
