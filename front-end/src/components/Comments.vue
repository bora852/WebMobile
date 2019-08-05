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
        ></v-textarea>
      </v-flex>
    </v-layout>
    <div class="text-sm-right text-xs-center">
      <v-btn color="warning" dark class="text_font"> 등록 </v-btn>
    </div>

    <span v-for="(item, index) in comments" v-bind:key="item.index">
      <v-divider class="cmtPadding" v-if="index === 0"></v-divider>
      <div>
        <span class="text_font">작성자 : {{ item.email }}</span>
      </div>
      <div class="cmtleftAlign grey--text text_font" style="font-size:0.9em;">
        {{ item.time }}
      </div>
      <div class="body_font">{{ item.message }}</div>
      <div class="cmtleftAlign text-sm-right text-xs-center">
        <v-btn
          @click=""
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
          @click=""
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
      // items: [{ email: 'ex1@naver.com', message: '댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.', time: '2019년 8월 1일'}
      //       ,{ email: 'ex2@naver.com', message: '댓글입니다.댓글입니다.댓글입니다.', time: '2019년 8월 1일'}]
      // ,
      comments: [],
      idxArr: []
    };
  },
  created() {
    //CommentService.sendComment("port",41,"admin@ssafy.com","new 댓글댓글"); //억지로 insert Test
    CommentService.getAllComment("port", this.$route.query.idx);
    eventBus.$on("commentData", result => {
      let data = result;
      let dataVal = data.val();
      dataVal.time = this.convertTime(dataVal.time);

      this.comments.push(dataVal);
      this.idxArr.push(data.key);

      console.log(this.comments);
      console.log(this.idxArr);
    });
  },
  mounted() {
  },
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
    }
  },
  computed: {}
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
