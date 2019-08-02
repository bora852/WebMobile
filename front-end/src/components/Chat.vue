<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-container
          style="max-height: 400px; background-color:#ffc966; border-radius:10px 10px 10px 10px;"
        >
          <div
            style="max-height: 360px; overflow:auto;"
            id="scroll-target"
            v-html="content"
            column
          ></div>
        </v-container>

        <v-text-field
          v-model="id"
          :counter="8"
          label="ID"
          required
          xs4
        ></v-text-field>
        <v-text-field
          v-on:keyup.enter="submit()"
          v-model="message"
          :counter="50"
          label="message"
          required
          xs8
        >
        </v-text-field>
        <v-btn color="warning" dark @click.stop="submit()">전송</v-btn>
        <div>
          <br />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ChatService from "@/services/ChatService";
import { eventBus } from "../main.js";
import Swal from "sweetalert2";

export default {
  name: "Chat",
  components: {},
  data() {
    return {
      id: "",
      message: "",
      content: ""
    };
  },
  methods: {
    submit() {
      if (this.id.length > 8) {
        Swal.fire({
          title: "Error!",
          text: "아이디는 최대 8자 입니다!",
          type: "error",
          confirmButtonText: "Ok!"
        });
      } else if (this.message == "") {
        Swal.fire({
          title: "Error!",
          text: "메시지를 입력해주세요!",
          type: "error",
          confirmButtonText: "Ok!"
        });
      } else {
        ChatService.sendMessage(this.id, this.message);
        this.message = "";
      }
    },
    preventHtmlInjection(text) {
      if (text != null) {
        text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      return text;
    },
    convertTime(data) {
      var d = new Date(data);

      var hour = d.getHours();
      var minute = d.getMinutes();
      var second = d.getSeconds();

      var time = hour + ":" + minute + ":" + second;
      return time;
    }
  },
  created() {
    ChatService.getMessage();

    eventBus.$on("updateMessage", result => {
      var getTime = this.convertTime(result.time);
      var getId = result.id;
      var getMessage = result.message;

      getId = this.preventHtmlInjection(getId);
      getMessage = this.preventHtmlInjection(getMessage);

      this.content +=
        "<div class='contentBox chatWidth'><p class='chatID'>" +
        getId +
        "</p><div class='chatBox'>" +
        getMessage +
        "</div><span class='chattime'>" +
        getTime +
        "</span><br /></div>";
    });
  },
  updated() {
    var sc = document.getElementById("scroll-target");
    sc.scrollTop = sc.scrollHeight;
  },
  destroyed() {
    ChatService.closeChat();
  }
};
</script>

<style>
.contentBox {
  margin-top: 3px;
  margin-bottom: 3px;
}
.chatID {
  font-weight: bold;
  text-decoration-style: bold;
  color: black;
  margin-bottom: 0px;
}
.chatBox {
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: white;
  height: auto;
  color: black;
  border-width: 2px;
  padding: 5px;
  border-radius: 0px 12px 12px 12px;
}
.chattime {
  color: gray;
  float: right;
}
.chatboxRight {
  float: right;
}
.chatboxleft {
  float: left;
}

@media screen and (min-width: 550px) {
  .chatWidth {
    width: 500px;
  }
}
</style>
