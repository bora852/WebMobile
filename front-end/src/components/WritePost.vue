<template>
  <div>
    <v-flex xs10>
      <h1 class="text_font">Post Write</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-flex px10 py10>
            <v-text-field
              v-model="title"
              :counter="30"
              :rules="titleRules"
              label="제목"
              required
            >
            </v-text-field>
          </v-flex>
        </v-container>
        <v-container fluid grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-textarea
                name="input-7-1"
                label="내용"
                v-model="body"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-flex px10 py10>
        <v-btn color="warning" dark @click.stop="submit()" class="float-right"
          >Submit</v-btn
        >
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import PostService from "@/services/PostService";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "WritePost",
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
        console.log("user",this.$store.state.user);
        var isPost = await PostService.postPost(
          this.title,
          this.body,
          this.$store.state.user
        );
        // console.log(isPost);
        if (isPost == "success") {
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
