<template>
  <div>
    <UserList></UserList>
  </div>
</template>

<script>
import UserList from "../components/UserList";
import { eventBus } from "../main.js";
import AuthService from "../services/AuthService";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "adminpage",
  components: {
    UserList
  },
  created: async function() {
    eventBus.$emit("sendTitle", "Admin");
    if ((await AuthService.authChk()) != "admin") {
      SwalAlert.swatAlert("Error", "잘못된 접근입니다.", "error", "OK!");
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
