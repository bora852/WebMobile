<template>
  <v-container>
    <div>
      <div class="text_font subFontSize">📝포스트 수정</div>
      <div class="v-card theme--light padding30">
        <v-layout>
          <v-flex>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-flex class="my-4">
                <v-text-field
                  v-model="title"
                  :counter="30"
                  :rules="titleRules"
                  label="제목"
                  color="orange"
                  required
                >
                </v-text-field>
              </v-flex>

              <v-flex xs12 class="my-3">
                <v-textarea
                  name="input-7-1"
                  label="내용"
                  color="orange"
                  v-model="body"
                ></v-textarea>
              </v-flex>

              <v-flex class="text-sm-right text-xs-center text_font">
                <v-btn
                  color="warning"
                  class="ImgBtnSize"
                  dark
                  @click.stop="submit()"
                  >수정완료</v-btn
                >
                <v-btn color="warning" class="ImgBtnSize" to="post" dark
                  >수정취소</v-btn
                >
              </v-flex>
            </v-form>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-container>
</template>

<script>
import PostService from "@/services/PostService";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "PostEdit",
  components: {},
  data: () => ({
    idx: "",
    body: "",
    title: "",
    post: [],
    valid: true,
    titleRules: [
      v => !!v || "제목을 입력해주세요!",
      v => (v && v.length <= 30) || "제목은 30자 이내로 입력해주세요!"
    ],
    linkeddata: ""
  }),
  created() {
    this.getPostById();
  },
  methods: {
    async submit() {
      if (this.title == "") {
        SwalAlert.swatAlert(
          "warning",
          "제목을 입력해주세요!",
          "warning",
          "Ok!"
        );
      } else if (this.title.length > 30) {
        SwalAlert.swatAlert(
          "warning",
          "제목을 30자 이하로 입력해주세요",
          "warning",
          "Ok!"
        );
      } else if (this.body == "") {
        SwalAlert.swatAlert(
          "warning",
          "내용을 입력해주세요!",
          "warning",
          "Ok!"
        );
      } else {
        var isPost = await PostService.updatePost(
          this.title,
          this.body,
          this.idx
        );
        if (isPost.state == 1) {
          this.$router.push("post");
        }
      }
    },
    async getPostById() {
      if (this.$route.query.num != null) {
        this.post = await PostService.select(this.$route.query.num);
        this.title = this.post.title;
        this.body = this.post.body;
        this.idx = this.post.idx;
      }
    }
  }
};
</script>

<style>
.float-right {
  float: right;
}
.padding30 {
  padding: 30px;
}
</style>
