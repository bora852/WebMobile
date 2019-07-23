<template>
  <div>
    <UserList></UserList>
  </div>
</template>

<script>
import UserList from "../components/UserList";
import { eventBus } from "../main.js";

export default {
  name: "signuppage",
  components: {
    UserList
  },
  created() {
    eventBus.$emit("sendTitle", "Admin");
  }
};
</script>

<style>
</style>
