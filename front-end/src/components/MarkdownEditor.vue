<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xs12>
        <editor v-model="editorText" @input="postMsg()" />
      </v-flex>
      <v-flex xs12>
        <div class="my-3 text_font">
          <v-icon class="mr-0 previewIcon">pageview</v-icon>
          <span class="titleFontSize">미리보기</span>
          <v-divider></v-divider>
        </div>
        <viewer class="border-styles body_font" :value="editorText" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import { Editor, Viewer } from "@toast-ui/vue-editor";

export default {
  props: {
    body: {
      type: String,
      default: "## 내용을 마크다운 형식으로 작성해주세요!"
    }
  },
  components: {
    editor: Editor,
    viewer: Viewer
  },
  data() {
    return {
      editorText: "## 내용을 마크다운 형식으로 작성해주세요!"
    };
  },
  methods: {
    postMsg() {
      this.$emit("sendBody", this.editorText);
    }
  },
  mounted() {
    this.editorText = this.body;
  },
  watch: {
    body: function() {
      this.editorText = this.body;
    }
  }
};
</script>

<style>
.previewIcon {
  font-size: 2em;
}

.border-styles {
  padding: 10px;
  border-width: 1px;
  border-color: #aaa;
  border-style: solid;
}
</style>
