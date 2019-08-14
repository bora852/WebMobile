<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header" @click="toggle()">
        <v-icon color="orange darken-3">folder</v-icon> 최근 팀프로젝트
      </div>

      <v-card>
        <v-card-text>
          <div>
            <h2 class="pjt-font-color">📂 프로젝트명 : {{ this.title }}</h2>
          </div>
          <div id="gitgraph"></div>
          <div class="text-xs-center">
            <v-progress-circular
              :size="50"
              color="amber"
              indeterminate
              v-if="loading"
            ></v-progress-circular>
          </div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { createGitgraph, TemplateName, templateExtend } from "@gitgraph/js";
import GitlabService from "@/services/GitlabService";

export default {
  name: "GitRepositories",
  data() {
    return {
      repos: { type: null },
      myGitLabData: {},
      myBranch: {},
      onLoad: -1,
      show: false,
      loading: false,
      title: ""
    };
  },
  mounted: function() {
    $(document).ready(function(){
      $(".fas").addClass("fa");
    });
  },
  watch: {
    show: function(newVal, oldVal) {
      newVal = "";
      oldVal = "";
      if (this.show) {
        if (this.onLoad == window.innerWidth && this.onLoad >= 0) return;
        else {
          document.getElementById("gitgraph").innerHTML = "";
          this.drawGraph();
          this.onLoad = window.innerWidth;
          newVal = oldVal;
        }
      }
    }
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    async drawGraph() {
      this.loading = true;
      this.repos = await GitlabService.getRepos("JeongSY");
      this.commits = await GitlabService.getCommits(this.repos.data[1].id);
      this.draw(this.commits);
      this.loading = false;
      this.title = this.repos.data[1].name;
    },

    draw: function(commits) {
      var customBranchLabels = templateExtend(TemplateName.Metro, {
        colors: ["#fa6638", "blue", "green", "yellow", "magenta"],
        branch: {
          lineWidth: 7,
          spacing: 50
        },
        commit: {
          spacing: 50,
          dot: {
            size: 14
          },
          message: {
            font: "normal 10pt Arial",
            color: "black"
          }
        }
      });

      const graphContainer = document.getElementById("gitgraph");
      const gitgraph = createGitgraph(graphContainer, {
        orientation: "vertical-reverse",
        template: customBranchLabels
      });
      const master = gitgraph.branch("master");

      for (var i = 0; i < commits.data.length; i++) {
        let link =
          this.repos.data[0].path_with_namespace +
          "/commit/" +
          commits.data[i].id;
        let message = commits.data[i].title.toLowerCase();
        let auto = commits.data[i].author_email;
        let emoji;

        if (i == commits.data.length - 1) {
          emoji = "🎉";
        } else if (message.indexOf("merge") >= 0) {
          emoji = "✔️";
        } else if (auto.indexOf("lyy7661@naver.com") >= 0) {
          emoji = "😸";
        } else if (auto.indexOf("jy5491@naver.com") >= 0) {
          emoji = "🐹";
        } else if (auto.indexOf("capsulejay963@naver.com") >= 0) {
          emoji = "🌷";
        } else if (auto.indexOf("rlagpqls123@naver.com") >= 0) {
          emoji = "🌞";
        } else {
          emoji = "⚠️";
        }

        master.commit({
          subject: commits.data[i].title,
          style: { subject: { font: "italic 12pt Calibri" } },
          author:
            commits.data[i].committer_name +
            " <" +
            commits.data[i].author_email +
            ">",
          dotText: emoji,
          onClick: function() {
            window.open("https://lab.ssafy.com/" + link);
          },
          onMessageClick: function() {
            window.open("https://lab.ssafy.com/" + link);
          },
          onMouseOver: function() {
            document.body.style.cursor = "pointer";
          },
          onMouseOut: function() {
            document.body.style.cursor = "default";
          }
        });
      }
    }
  }
};
</script>

<style>
.hover-effect:hover {
  cursor: pointer;
  color: orange;
}

.pjt-font-color {
  color: #fa6638;
}
</style>
