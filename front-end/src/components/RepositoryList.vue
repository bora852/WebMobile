<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <div class="text-xs-center">
        <v-progress-circular
          :size="50"
          color="amber"
          indeterminate
          v-if="loading"
        ></v-progress-circular>
      </div>
      <v-card v-for="(item, i) in items" :key="i">
        <v-card-title primary-title>
          <v-list>
            <v-list-tile>
              <v-list-tile-avatar>
                <img :src="item[0].avatar_url" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title
                  ><h3 class="text_font thin">
                    {{ item[0].name }}
                  </h3></v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-title>

        <v-card-actions>
          <v-btn
            flat
            color="#fa6638"
            @click="goToUrl(item[0].gitlab_url)"
            class="text_font"
            ><v-icon>home</v-icon>My GitLab
          </v-btn>
          <v-btn flat color="#fa6638" class="text_font"
            ><v-icon>mail</v-icon>mail</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="chageIcon(i)">
            <v-icon v-show="show[i]">keyboard_arrow_down</v-icon>
            <v-icon v-show="!show[i]">keyboard_arrow_up</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show[i]">
            <v-list two-line>
              <span v-for="(datas, index) in item" v-bind:key="datas.pjt_nm">
                <v-divider v-if="index === 0"></v-divider>
                <v-list-tile @click="goToUrl(datas.pjt_url)">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <v-icon color="green">done</v-icon> Project Name :
                      {{ datas.pjt_nm }}</v-list-tile-title
                    >
                    <v-list-tile-sub-title style="color:grey"
                      >{{ datas.pjt_url }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </span>
            </v-list>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import GitlabService from "@/services/GitlabService";

export default {
  name: "RepositoryList",
  props: {
    limits: {
      type: Number,
      default: 5
    },
    loadMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      members: [],
      show: [false, false, false, false],
      showIcon: false,
      loading: false,
      expand: false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: []
    };
  },
  mounted() {
    this.getGitlabRepos();
  },
  computed: {
    iconShow(index) {
      return this.show[index];
    }
  },
  methods: {
    chageIcon(index) {
      this.$set(this.show, index, !this.show[index]);
    },
    goToUrl(url) {
      window.open(url);
    },
    async getGitlabRepos() {
      this.loading = true;
      const users = await GitlabService.getMembers();
      if (users.status !== 200) {
        return;
      }
      this.members = users.data;
      await this.getGitlabRepoList(this.members);
      this.loading = false;
    },
    getGitlabRepoList: async function(datas) {
      let temp = [];
      let tokens = [
        "LzJhJD-aoChXMwEhsF9y",
        "tZoczoLLa8TYBg8tUJY_",
        "x8dwcM6_CRzxd4jVY6s3",
        "bHR3pMpZAd1mz8SRMzTm"
      ]; //선열, 영웅, 보라, 혜빈

      function RepoInfo(name, gitlab_url, pjt_nm, pjt_url, avatar_url) {
        this.name = name;
        this.gitlab_url = gitlab_url;
        this.pjt_nm = pjt_nm;
        this.pjt_url = pjt_url;
        this.avatar_url = avatar_url;
      }

      for (let i = 0; i < 4; i++) {
        const pjtList = await GitlabService.getMembersPJTList(
          datas[i].username,
          tokens[i]
        );
        let temp2 = [];
        for (let j = 0; j < 4; j++) {
          temp2.push(
            new RepoInfo(
              pjtList.data[j].owner.name,
              pjtList.data[j].owner.web_url,
              pjtList.data[j].name,
              pjtList.data[j].http_url_to_repo,
              pjtList.data[j].owner.avatar_url
            )
          );
        }
        temp.push(temp2);
      }
      this.items = temp;
    }
  }
};
</script>

<style>
.thin{
  font-weight: 100;
}
</style>
