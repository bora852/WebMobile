<template>
  <v-layout mt-5 wrap row>
    <v-flex
      v-for="i in portfolios.length > count ? count : portfolios.length"
      md4
      sm6
      xs12
      :key="i"
    >
      <Portfolio
        class="ma-3"
        :date="portfolios[i - 1].created_at.toString()"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgSrc="portfolios[i - 1].img"
        :idx="portfolios[i - 1].idx"
      ></Portfolio>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="warning" dark v-on:click="loadMorePortfolios">
        <v-icon size="25" class="mr-2">fa-plus</v-icon> View more
      </v-btn>
      <v-btn color="warning" dark to="writePortfolio" v-show="isWriter">
        <v-icon size="25" class="mr-2">fa-edit</v-icon> writePortfolio
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Portfolio from "./Portfolio";
import PortfolioService from "../services/PortfolioService";

export default {
  name: "PortfoliosList",
  props: {
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
      portfolios: [],
      count: this.limits
    };
  },
  components: {
    Portfolio
  },
  mounted() {
    this.getPortfolios();
    if (
      this.$store.state.userAuth == "admin" ||
      this.$store.state.userAuth == "team"
    ) {
      this.isWriter = true;
    }
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await PortfolioService.getList();
    },
    loadMorePortfolios() {
      this.count = this.count + 6;
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
