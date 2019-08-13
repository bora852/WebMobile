<template>
  <v-container>
    <div>
      <div class="text_font subFontSize">📝포스트 작성</div>
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
                  >작성</v-btn
                >
                <v-btn color="warning" class="ImgBtnSize" to="post" dark
                  >취소</v-btn
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
import { eventBus } from "../main.js";
import PostService from "@/services/PostService";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "PostWrite",
  components: {},
  data: () => ({
    idx: "",
    body: "",
    title: "",
    valid: true,
    titleRules: [
      v => !!v || "제목을 입력해주세요!",
      v => (v && v.length <= 30) || "제목은 30자 이내로 입력해주세요!"
    ],
    linkeddata: ""
  }),
  created() {},
  methods: {
    async submit() {
      if (this.title == "") {
        SwalAlert.swatAlert("Error!", "제목을 입력해주세요!", "error", "Ok!");
      } else if (this.body == "") {
        SwalAlert.swatAlert("Error!", "내용을 입력해주세요!", "error", "Ok!");
      } else {
        var isPost = await PostService.postPost(
          this.title,
          this.body,
          this.$store.state.user
        );
        if (isPost) {
          this.$router.push("post");
        }
      }
    }
  }
};
</script>

<style>
.float-right {
  float: right;
}
</style>
