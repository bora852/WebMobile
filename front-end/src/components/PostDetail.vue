<template>
  <v-container>
    <v-layout py-4 h-100>
      <v-flex row class="postbodyStyle">
        <h2 class="color-333 font-weight-light title_overflow text_font">
          제목 : {{ post.title }}
        </h2>
        <br />
        <hr />
        <br />
        <div>
          <p
            class="mb-1 color-666 font-weight-light subheading body_overflow text_font"
          >
            {{ post.body }}
          </p>
        </div>
        <v-btn
          @click="postEdit()"
          color="warning"
          flat
          large
          replace
          style="font-size:1.2em;text-transform:none;"
          slot="text"
          class="text_font"
          >Edit post</v-btn
        >
        <v-btn
          @click="postDelete()"
          color="warning"
          flat
          large
          replace
          style="font-size:1.2em;text-transform:none;"
          slot="text"
          class="text_font"
          >Delete Post</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import PostService from "@/services/PostService";
export default {
  name: "PortfolioDetail",
  data() {
    return {
      post: []
    };
  },
  created() {
    this.getPostById();
  },
  methods: {
    async getPostById() {
      this.post = await PostService.select(this.$route.query.num);
    },
    postEdit(){
      this.$router.push("/postedit?num="+this.post.idx);
    },
    async postDelete(){
      await PostService.delete(this.post.idx);
      this.$router.push("/post");
    }
  }
};
</script>

<style>
.postbodyStyle {
  padding: 10px;
  border: 3px solid orange;
}
</style>
