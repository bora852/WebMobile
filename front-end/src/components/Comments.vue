<template>
  <v-container>
    <v-layout wrap>
      <v-flex><!-- v-if="init" -->
        <v-textarea
          v-model="contents"
          background-color="grey lighten-3"
          color="orange"
          label="댓글"
          class="body_font"
          @keyup.enter="sendComment()"
        ></v-textarea>
      </v-flex>
    </v-layout>
    <div class="text-sm-right text-xs-center">
      <v-btn color="warning" dark class="text_font" @click="sendComment()">
        등록
      </v-btn>
    </div>

    <span v-for="(item, index) in comments" v-bind:key="item.index">
      <v-divider class="cmtPadding" v-if="index === 0"></v-divider>
      <div>
        <span class="text_font">작성자 : {{ item.email }}</span>0
      </div>
      <div class="cmtleftAlign grey--text text_font" style="font-size:0.9em;">
        {{ item.time }}
      </div>
      <div v-if="!item.update">
        <div  class="body_font">{{ item.message }}</div>
        <div class="cmtleftAlign text-sm-right text-xs-center">
          <v-btn
            @click="modifyButton(item)"
            color="warning"
            flat
            small
            replace
            style="font-size:1.0em;text-transform:none;"
            slot="text"
            class="text_font"
            >수정</v-btn
          >
          <v-btn
            @click="deleteComment(item)"
            color="warning"
            flat
            small
            replace
            style="font-size:1.0em;text-transform:none;"
            slot="text"
            class="text_font"
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
            @click="modifyButton(item)"
            color="warning"
            flat
            small
            replace
            style="font-size:1.0em;text-transform:none;"
            slot="text"
            class="text_font"
            >수정완료</v-btn
          >
        </div>
      </div>
      <!-- <div class="cmtleftAlign text-sm-right text-xs-center"> -->
        <!-- <v-btn
          @click="modifyButton(item)"
          color="warning"
          flat
          small
          replace
          style="font-size:1.0em;text-transform:none;"
          slot="text"
          class="text_font"
          >수정</v-btn
        > -->
      <!-- </div> -->
      <v-divider class="cmtPadding"></v-divider>
    </span>
  </v-container>
</template>

<script>
import CommentService from "../services/CommentService";
import { eventBus } from "../main.js";
export default {
  data() {
    return {
      contents: "",
      data: "",
      updateContents: "",
      comments: [],
      idxArr: []
    };
  },
  created() {
    this.comments = [];
    this.idxArr = [];
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
    CommentService.getAllComment("port", this.$route.query.idx);
  },
  mounted() {},
  methods: {
    convertTime(data) {
      var d = new Date(data);

      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let hour = d.getHours();
      let minute = d.getMinutes();

      var time = year + "." + month + "." + day + " " + hour + ":" + minute;
      return time;
    },
    deleteComment(data) {
      CommentService.deleteComment("port", this.$route.query.idx, data.keys);
      let index = this.comments.indexOf(data);
      this.comments.splice(index, 1);
    },
    sendComment() {
      CommentService.sendComment(
        "port",
        this.$route.query.idx,
        this.$store.state.user,
        this.contents
      );
      this.contents = "";
    },
    modifyButton(data) {
      console.log("수정 : ",data);
      data.update = !data.update;
    }
  },
  computed: {},
  destroyed() {
    CommentService.closeComment();
    eventBus.$off("commentData");
  }
};
</script>

<style>
.replyMsg {
  min-height: 0px;
}
.cmtPadding {
  padding: 10px;
}
.cmtleftAlign {
  text-align: right;
}
</style>
