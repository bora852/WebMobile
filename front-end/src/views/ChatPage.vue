<template>
  <v-container>
    <v-layout>
      <Chat />
    </v-layout>
  </v-container>
</template>

<script>
import Chat from "../components/Chat";
import { eventBus } from "../main.js";

export default {
  name: "ChatPage",
  components: {
    Chat
  },
  created() {
    eventBus.$emit("sendTitle", "Chat");
  }
};
</script>

<style></style>
