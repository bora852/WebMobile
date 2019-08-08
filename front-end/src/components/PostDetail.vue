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
      </v-flex>
    </v-layout>
    <div class="text-sm-right text-xs-center">
      <v-btn
        v-show="isAuthor()"
        color="warning"
        @click="postEdit()"
        dark
        class="text_font"
      >
        <v-icon size="20" class="mr-2">create</v-icon> 수정
      </v-btn>
      <v-btn
        v-show="isAuthor()"
        color="warning"
        @click="postDelete()"
        dark
        class="text_font"
      >
        <v-icon size="20" class="mr-2">delete</v-icon> 삭제
      </v-btn>
    </div>

    <v-divider></v-divider>
    <div class="cmtPadding">
      <Comments category="post"></Comments>
    </div>
  </v-container>
</template>

<script>
import Comments from "@/components/Comments";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import PostService from "@/services/PostService";
export default {
  name: "PostDetail",
  data() {
    return {
      post: []
    };
  },
  components: {
    Comments
  },
  created() {
    this.getPostById();
  },
  computed: {
    isAuthor: function() {
      return this.chkAuthor;
    }
  },
  methods: {
    chkAuthor() {
      var email = this.$store.state.user;
      var auth = this.$store.state.userAuth;
      var result = false;
      if (this.post.email == email || auth == "admin") {
        result = true;
      }
      return result;
    },
    async getPostById() {
      this.post = await PostService.select(this.$route.query.num);
    },
    postEdit() {
      this.$router.push("/postedit?num=" + this.post.idx);
    },
    async postDelete() {
      await PostService.delete(this.post.idx);
      this.$router.push("/post");
    }
  }
};
</script>

<style>
.postbodyStyle {
  padding: 10px;
  /* border: 3px solid orange; */
}
/* .cmtPadding {
  padding: 20px;
} */
</style>
