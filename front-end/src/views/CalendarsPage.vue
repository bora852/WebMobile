<template>
  <Calendars></Calendars>
</template>

<script>
import Calendars from "../components/Calendars";
import { eventBus } from "../main.js";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "calendarsPage",
  components: {
    Calendars
  },
  data() {
    return {};
  },
  created() {
    eventBus.$emit("sendTitle", "Calendar");
    if (this.$store.state.user == "") {
      SwalAlert.swatAlert("Error", "잘못된 접근입니다", "error", "OK!");
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
