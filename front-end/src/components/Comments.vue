<template>
  <v-container>
    <v-layout wrap>
      <v-flex>
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

    <span v-for="(item, index) in items" v-bind:key="item.email">
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
export default {
  data() {
    return {
      contents: "",
      items: [{ email: 'ex1@naver.com', message: '댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.', time: '2019년 8월 1일'}
            ,{ email: 'ex2@naver.com', message: '댓글입니다.댓글입니다.댓글입니다.', time: '2019년 8월 1일'}]
    };
  }
};
// import CommentService from "../services/CommentService";
// CommentService.sendComment("post", 2772, "lyy7661@gmail.com", "sendUnitTest2");
// CommentService.modifyComment("post", 2772, "-LlAamagQ7pj-boIUtbh" ,"modify@gmail.com", "modify");
// CommentService.getAllComment("post", 2772);
// CommentService.getOneComment("post", 2772, "-LlAamagQ7pj-boIUtbh");
// CommentService.deleteComment("post", 2772, "-LlAamagQ7pj-boIUtbh");

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
