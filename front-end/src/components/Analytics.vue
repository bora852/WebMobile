<template>
  <div>
    <WriteVisited :visited="day7Visited"></WriteVisited>
    <WriteTopBrowserChart :browser="browser"></WriteTopBrowserChart>
    <br />
    브라우져 : {{browser}}
    <br  />
    페이지 : {{pages}}
  </div>
</template>

<script>
import axios from "axios";
import WriteVisited from "../components/WriteVisited";
import WriteTopBrowserChart from "../components/WriteTopBrowserChart"

export default {
  name: "Analytics",
  components: {
    WriteVisited,
    WriteTopBrowserChart
},
  data() {
    return {
      token:"ya29.GlteB-uHJfwh8bkf-XSA3eq8NE0emNlo1rLIjzoymL4pcPLB7qYi7Fg9s16MsaogmKIuLxoBVOXXu6n7SUoDjRLkgvdNWqaegn5jdcG8_OyJtuL1O2B8i4TbIczN",
      visited:null,
      day7Visited:null,
      pages:null,
      browser:null
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      axios.post("https://accounts.google.com/o/oauth2/token", {
        grant_type:'refresh_token',
        refresh_token:"1/XFfJz4iDbcqsOtvHVzaRXecwBFFnTW6XS2iJKW8CQyyHinT3qVh6omdT50hJ1aOv",
        client_id:'417231299643-4mg15acni7fekpatt5ah2ofmqe34g3l8.apps.googleusercontent.com',
        client_secret:'XRmKs8i0CfHUiJa8DcJiS96v',
      }).then(response => {
        console.log(response.data.access_token);
        this.token = response.data.access_token;
        this.requestVisited();
        this.request7Day();
        this.topPages();
        this.topBrowser();
      }).catch(error => {
        console.log("refresh error");
        console.log(error);
      });
    },
    requestVisited() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199746530&start-date=2019-08-08&end-date=today&metrics=ga%3Asessions&access_token="+this.token
        )
        .then(response => {
          console.log(response);
          this.visited = response.data.rows[0];
        })
        .catch(error => {
          console.log("requestVisited",error);
          console.log(error.code);
          if (error.code == 401) {
            this.refresh();
          }
        });
    },
    request7Day() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199746530&start-date=7daysAgo&end-date=today&metrics=ga%3A7dayUsers&dimensions=ga%3Adate&access_token="+this.token
        )
        .then(response => {
          console.log("7day ",response)
          this.day7Visited = response.data.rows;
        }).catch(error => {
          console.log(error);
        })
    },
    topBrowser() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199746530&start-date=2019-08-08&end-date=today&metrics=ga%3Apageviews&dimensions=ga%3Abrowser&sort=-ga%3Apageviews&max-results=5&access_token="+this.token
        )
        .then(response => {
          console.log("browser ",response)
          this.browser = response.data.rows;
        }).catch(error => {
          console.log(error);
        })
    },
    topPages() {
      axios
        .get(
          "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A199746530&start-date=2019-08-08&end-date=today&metrics=ga%3Apageviews&dimensions=ga%3ApagePathLevel1&sort=-ga%3Apageviews&filters=ga%3ApagePathLevel1!%3D%2F&max-results=7&access_token="+this.token
        )
        .then(response => {
          console.log("browser ",response)
          this.pages = response.data.rows;
        }).catch(error => {
          console.log(error);
        })
    }
  }

};
</script>

<style></style>
