<template>
  <Calendars></Calendars>
</template>

<script>
import Calendars from "../components/Calendars";
import { eventBus } from "../main.js";

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
  }
};
</script>

<style></style>
