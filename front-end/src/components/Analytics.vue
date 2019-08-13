<template>
  <div>
    <v-container>
      <v-layout row wrap mw-700>
        <v-flex md12 sm12 xs12 class="chart text-align">
          <v-card class="px-3 py-3">
            <span class="chart-label title_font">방문자 수</span>
            <WriteVisited :visited="day7Visited"></WriteVisited>
          </v-card>
        </v-flex>

        <v-flex px-2 md6 sm6 xs12 class="chart text-align">
          <v-card class="px-4 py-2">
            <span class="chart-label title_font">게시글 수</span>
            <WriteCount></WriteCount>
          </v-card>
        </v-flex>

        <v-flex px-2 md6 sm6 xs12 class="chart text-align">
          <v-card class="px-4 py-2">
            <span class="chart-label title_font">접속 브라우져</span>
            <WritePieChart
              label="접속 브라우져"
              :originData="browser"
            ></WritePieChart>
          </v-card>
        </v-flex>

        <v-flex px-2 md6 sm6 xs12 class="chart text-align">
          <v-card class="px-4 py-2">
            <span class="chart-label title_font">접속 페이지</span>
            <WritePieChart
              label="접속 페이지"
              :originData="pages"
            ></WritePieChart>
          </v-card>
        </v-flex>

        <v-flex px-2 md6 sm6 xs12 class="chart text-align">
          <v-card class="px-4 py-2">
            <span class="chart-label title_font">접속 국가</span>
            <WritePieChart
              label="접속 국가"
              :originData="national"
            ></WritePieChart>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import WriteVisited from "../components/WriteVisited";
import WritePieChart from "../components/WritePieChart";
import WriteCount from "../components/WriteCount";
import SwalAlert from "../services/SwalAlert";

export default {
  name: "Analytics",
  components: {
    WriteVisited,
    WritePieChart,
    WriteCount
  },
  data() {
    return {
      token:
        "ya29.GltiB7a0IM9reZxOiTXK3O87qxHCZE0IdKNhxVKtEbHDshtsXAAwtUlk8fEI-Vasw-JmA2zPBi8RpBYp7D-FKo2SA-hIieg0gghyf59nwhZk-176Q3lWff0baTZh",
      visited: null,
      day7Visited: null,
      pages: null,
      browser: null,
      national: null
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      axios
        .post("https://accounts.google.com/o/oauth2/token", {
          grant_type: "refresh_token",
          refresh_token:
            "1/cunTPCANU69HpF6lw4r45J26NlMiwcRj9LS3tL0KE2qihkOeIeibfChUU5qlM_Ww",
          client_id:
            "417231299643-lqd17mm8u7koa42av347qqoq9oa9h7nn.apps.googleusercontent.com",
          client_secret: "LPLUgROGppLZxzM-gDDwsiFm"
        })
        .then(response => {
          this.token = response.data.access_token;
          this.requestVisited();
          this.request7Day();
          this.topPages();
          this.topBrowser();
          this.topNational();
        })
        .catch(error => {
          SwalAlert.swatAlert(
            "Error",
            "토큰 발급중 문제가 발생했습니다. (" + error + ")",
            "error",
            "OK!"
          );
        });
    },
    requestVisited() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199742885&start-date=2019-08-08&end-date=today&metrics=ga%3Ausers&access_token=" +
            this.token
        )
        .then(response => {
          this.visited = response.data.rows[0];
        })
        .catch(error => {
          if (error.code == 401) {
            this.refresh();
          } else {
            SwalAlert.swatAlert(
              "Error",
              "알수없는 문제가 발생했습니다. (" + error + ")",
              "error",
              "OK!"
            );
          }
        });
    },
    request7Day() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199742885&start-date=7daysAgo&end-date=today&metrics=ga%3A7dayUsers&dimensions=ga%3Adate&access_token=" +
            this.token
        )
        .then(response => {
          this.day7Visited = response.data.rows;
        });
    },
    topBrowser() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199742885&start-date=2019-08-01&end-date=today&metrics=ga%3Apageviews&dimensions=ga%3Abrowser&sort=-ga%3Apageviews&max-results=5&access_token=" +
            this.token
        )
        .then(response => {
          this.browser = response.data.rows;
        });
    },
    topPages() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199742885&start-date=2019-08-08&end-date=today&metrics=ga%3Apageviews&dimensions=ga%3ApagePathLevel1&sort=-ga%3Apageviews&filters=ga%3ApagePathLevel1!%3D%2F&max-results=7&access_token=" +
            this.token
        )
        .then(response => {
          this.pages = response.data.rows;
        });
    },
    topNational() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199742885&start-date=2019-08-08&end-date=today&metrics=ga%3Asessions&dimensions=ga%3Acountry&sort=-ga%3Asessions&max-results=5&access_token=" +
            this.token
        )
        .then(response => {
          this.national = response.data.rows;
        });
    }
  }
};
</script>

<style>
.text-align {
  text-align: center;
}
.chart-label {
  font-size: 24px;
  color: orange;
}
.chart {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
