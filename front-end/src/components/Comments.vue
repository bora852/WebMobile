<template>
  <div>
    <v-textarea
      v-model="contents"
      background-color="grey lighten-3"
      color="orange"
      :label="label"
      class="body_font"
      @keyup.enter="sendComment()"
      :disabled="isWriter"
    ></v-textarea>
    <div class="text-sm-center text-xs-center">
      <v-btn
        color="warning"
        dark
        class="text_font contentFontSize"
        @click="sendComment()"
      >
        등록
      </v-btn>
    </div>
    <span v-for="(item, index) in comments" v-bind:key="item.index">
      <v-divider class="cmtsPadding" v-if="index === 0"></v-divider>
      <div>
        <span class="text_font contentFontSize">작성자 : {{ item.email }}</span>
      </div>
      <div class="cmtleftAlign grey--text text_font dateFontSize">
        {{ item.time }}
      </div>
      <div v-if="!item.update">
        <div class="body_font">{{ item.message }}</div>
        <div class="cmtleftAlign text-sm-right text-xs-center">
          <v-btn
            v-show="chkPermission(item)"
            @click="modifyButton(item)"
            color="warning"
            flat
            small
            replace
            slot="text"
            class="text_font btn"
            >수정</v-btn
          >
          <v-btn
            v-show="chkPermission(item)"
            @click="deleteComment(item)"
            color="warning"
            flat
            small
            replace
            slot="text"
            class="text_font btn"
            >삭제</v-btn
          >
        </div>
      </div>
      <div class="body_font" v-else>
        <div>
          <v-textarea
            background-color="grey lighten-3"
            color="orange"
            v-model="item.message"
          ></v-textarea>
        </div>
        <div class="cmtleftAlign text-sm-right text-xs-center">
          <v-btn
            @click="modifyComment(item)"
            color="warning"
            flat
            small
            replace
            slot="text"
            class="text_font updateBtn"
            >수정완료</v-btn
          >
        </div>
      </div>
      <v-divider class="cmtsPadding"></v-divider>
    </span>
  </div>
</template>

<script>
import CommentService from "../services/CommentService";
import { eventBus } from "../main.js";
import Swal from "sweetalert2";

export default {
  name: "Comments",
  props: {
    category: {
      type: String
    }
  },
  data() {
    return {
      contents: "",
      data: "",
      updateContents: "",
      comments: [],
      num: this.$route.query.num,
      isWriter: true,
      label: "로그인 후 댓글 작성이 가능합니다."
    };
  },
  created() {
    this.comments = [];
    eventBus.$on("commentData", result => {
      if (result.val() != null) {
        let data = result;
        let dataVal = data.val();
        dataVal.time = this.convertTime(dataVal.time);
        dataVal.keys = data.key;
        dataVal.update = false;
        this.comments.push(dataVal);
      }
    });
    CommentService.getAllComment(this.category, this.$route.query.num);
  },
  mounted() {
    this.rePermission();
  },
  methods: {
    convertTime(data) {
      var d = new Date(data);

      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      let hour = d.getHours();
      let minute = d.getMinutes();

      var time = year + "." + month + "." + day + " " + hour + ":" + minute;
      return time;
    },
    deleteComment(data) {
      CommentService.deleteComment(
        this.category,
        this.$route.query.num,
        data.keys
      );
      let index = this.comments.indexOf(data);
      this.comments.splice(index, 1);
    },
    sendComment() {
      if (this.contents.length < 5) {
        Swal.fire({
          text: "댓글을 5글자 이상 작성해주세요.",
          type: "warning",
          confirmButtonText: "Ok"
        });
        return;
      }
      if (this.contents.length > 100) {
        Swal.fire({
          text: "댓글을 100글자 이하로 작성해주세요.",
          type: "warning",
          confirmButtonText: "Ok"
        });
        return;
      }
      CommentService.sendComment(
        this.category,
        this.$route.query.num,
        this.$store.state.user,
        this.contents
      );
      this.contents = "";
    },
    modifyButton(data) {
      data.update = !data.update;
    },
    modifyComment(data) {
      if (data.message.length < 5) {
        Swal.fire({
          text: "댓글을 5글자 이상 작성해주세요.",
          type: "warning",
          confirmButtonText: "Ok"
        });
        return;
      }
      if (data.message.length > 100) {
        Swal.fire({
          text: "댓글을 100글자 이하로 작성해주세요.",
          type: "warning",
          confirmButtonText: "Ok"
        });
        return;
      }
      data.update = !data.update;
      CommentService.modifyComment(
        this.category,
        this.$route.query.num,
        data.keys,
        this.$store.state.user,
        data.message
      );
    },
    chkPermission(data) {
      let email = this.$store.state.user;
      let auth = this.$store.state.userAuth;
      let result = false;
      if (data.email == email || auth == "admin") {
        result = true;
      }
      return result;
    },
    rePermission() {
      if (this.$store.state.userAuth != "") {
        this.isWriter = false;
        this.label = "댓글 작성";
      }
    }
  },
  computed: {
    watch_auto() {
      return this.$store.state.userAuth;
    }
  },
  watch: {
    watch_auto(auth) {
      if (auth != "") {
        this.isWriter = false;
        this.label = "댓글 작성";
      } else {
        this.isWriter = true;
        this.label = "로그인 후 댓글 작성이 가능합니다.";
      }
    }
  },
  beforeDestroy() {
    CommentService.closeComment(this.category, this.num);
    eventBus.$off("commentData");
  }
};
</script>

<style>
.replyMsg {
  min-height: 0px;
}
.cmtsPadding {
  padding: 5px;
}
.cmtleftAlign {
  text-align: right;
}
.btn {
  font-size: 1.2em;
  text-transform: none;
}
.updateBtn {
  font-size: 1.2em;
  text-transform: none;
}
.dateFontSize {
  font-size: 0.9em;
}
.contentFontSize {
  font-size: 1.1em;
}
</style>
