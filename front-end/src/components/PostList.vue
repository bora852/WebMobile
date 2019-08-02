<template>
  <v-layout row wrap mw-700>
    <v-flex
      v-for="i in posts.length > count ? count : posts.length"
      px-3
      md4
      sm6
      xs12
      :key="i"
    >
    <!-- :class="'xs' + 12 / column" -->
      <Post
        class="ma-2"

        :date="dateFormating(posts[i - 1].created_at)"
        :title="posts[i - 1].title"
        :body="posts[i - 1].body"
        :idx="posts[i - 1].idx"
      ></Post>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="warning" dark v-on:click="loadMorePosts">
        <v-icon size="25" class="mr-2">fa-plus</v-icon> View more
      </v-btn>
      <v-btn color="warning" dark to="writePost" v-show="isWriter">
        <v-icon size="25" class="mr-2">fa-edit</v-icon> writePost
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SwalAlert from "@/services/SwalAlert";
import Post from "@/components/Post";
import PostService from "@/services/PostService";

export default {
  name: "PostList",
  props: {
    column: {
      type: Number,
      default: 1
    },
    limits: {
      type: Number,
      default: 6
    },
    loadMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isWriter: false,
      posts: [],
      count: this.limits
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
    if (
      this.$store.state.userAuth == "admin" ||
      this.$store.state.userAuth == "team"
    ) {
      this.isWriter = true;
    }
  },
  methods: {
    async getPosts() {
      var data = await PostService.getList();
      if (data != null) {
        this.posts = data;
      } else {
        SwalAlert.swatAlert(
          "Error",
          "데이터를 불러오는데 실패했습니다.",
          "error",
          "Ok!"
        );
      }
    },
    loadMorePosts() {
      this.count = this.count + 6;
    }
  },
  computed: {
    watch_auth() {
      return this.$store.state.userAuth;
    },
    dateFormating() {
      return postDate => {
        var curDate = new Date(postDate);
        var year = curDate.getFullYear();
        var month = curDate.getMonth() + 1;
        var day = curDate.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        return year + "/" + month + "/" + day;
      };
    }
  },
  watch: {
    watch_auth(auth) {
      if (auth == "admin" || auth == "team") {
        this.isWriter = true;
      } else {
        this.isWriter = false;
      }
    }
  }
};
</script>

<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
