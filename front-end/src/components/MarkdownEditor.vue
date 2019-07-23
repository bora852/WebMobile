<template>
  <div class="container">
    <markdown-editor v-model="body" @input="postMsg()"></markdown-editor>
  </div>
</template>

<script>
import "v-markdown-editor/dist/index.css";

export default {
  data() {
    return {
      body: "내용을 마크다운 형식으로 작성해주세요!"
    };
  },
  methods: {
    postMsg() {
      this.$emit("sendBody", this.body);
    }
  }
};
</script>
