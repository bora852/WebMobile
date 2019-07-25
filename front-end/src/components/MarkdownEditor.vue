<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xs12 sm6>
        <editor v-model="editorText" @input="postMsg()"/>
      </v-flex>
      <v-flex xs12 sm6>
        <viewer :value="editorText" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'

export default {
  components: {
    'editor': Editor,
    'viewer': Viewer
  },
  data () {
    return {
      editorText: '## 내용을 마크다운 형식으로 작성해주세요!'
    }
  },
  methods: {
    postMsg() {
      this.$emit("sendBody", this.editorText);
    }
  }
};
</script>
