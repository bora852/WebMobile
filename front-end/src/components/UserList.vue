<template>
  <div>
    <v-progress-circular
      :size="50"
      color="amber"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
    <v-flex
      v-for="i in userList.length > count ? count : userList.length"
      :key="i"
    >
    </v-flex>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "UserList",
  components: {},
  data: function() {
    return {
      listLoding: false,
      userList: []
    };
  },
  created: async () => {
    if ((await AuthService.authChk()) != "admin") {
      SwalAlert.swatAlert("Error", "잘못된 접근입니다.", "error", "OK!");
      this.$router.push("/");
    } else {
      this.getList();
    }
  },
  methods: {
    async getList() {
      this.loding = true;
      this.userList = await AuthService.getUserList();
      this.loding = false;
    }
  }
};
</script>

<style></style>
