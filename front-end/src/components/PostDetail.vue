<template>
  <div>
    <div class="text_font subFontSize">📑포스트</div>
    <div class="v-card theme--light detailPadding">
      <v-layout py-4 h-100>
        <v-flex row>
          <div class="text_font titleFontSize">
            {{ post.title }}
          </div>
          <div class="text-md-right">
            <v-icon class="mr-0 iconSize">date_range</v-icon>
            {{ formatedDate }} <v-icon class="mr-0 iconSize">person</v-icon>
            {{ post.email }}
          </div>
          <hr />
          <br />
          <div>
            <p class="body_font">
              {{ post.body }}
            </p>
          </div>
        </v-flex>
      </v-layout>
      <hr />
      <div class="text-sm-right text-xs-center my-2">
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
      <div class="cmtPadding">
        <Comments category="post"></Comments>
      </div>
    </div>
  </div>
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
    },
    formatedDate() {
      let curDate = new Date(this.post.created_at);
      let year = curDate.getFullYear();
      let month = curDate.getMonth() + 1;
      let day = curDate.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return year + "/" + month + "/" + day;
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

<style></style>
