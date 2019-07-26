<template>
  <v-layout row wrap mw-700>
    <v-flex
      v-for="i in posts.length > count ? count : posts.length"
      :class="'xs' + 12 / column"
      px-3
      :key="i"
    >
      <Post
        :date="posts[i - 1].created_at"
        :title="posts[i - 1].title"
        :body="posts[i - 1].body"
      ></Post>
      <v-divider></v-divider>
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
import Post from "@/components/Post";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PostList",
  props: {
    column: {
      type: Number,
      default: 1
    },
    limits: {
      type: Number,
      default: 4
    },
    loadMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isWriter: null,
      posts: [],
      count: this.limits
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
    },
    loadMorePosts() {
      this.count = this.count + 1;
    }
  },
  computed: {
    watch_auth() {
      return this.$store.state.userAuth;
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
