<template>
  <v-layout wrap>
    <v-btn outlined class="mr-4" @click="setToday">Today</v-btn>
    <v-btn fab text icon small @click="prev">
      <v-icon small>arrow_back_ios</v-icon>
    </v-btn>
    <v-btn fab text icon small @click="next">
      <v-icon small>arrow_forward_ios</v-icon>
    </v-btn>
    <v-flex sm4 xs12 class="text-sm-right text-xs-right">
      <h1>Calendar</h1>
    </v-flex>

    <v-flex xs12 class="mb-3">
      <v-sheet height="500">
        <!-- v-model="start" -->
        <v-calendar
          ref="calendar"
          v-model="focus"
          :type="type"
          :end="end"
          :now="today"
          :value="today"
          color="grey darken-3"
        >
        <!-- daily events -->
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu
                :key="event.title"
                v-model="event.open"
                full-width
                offset-x
              >
                <!-- daily event box open -->
                <template v-slot:activator="{ on }">
                  <div
                    v-if="!event.time"
                    v-ripple
                    class="my-event"
                    v-on="on"
                    v-html="event.title"
                  ></div>
                </template>
                <!-- box open!! -->
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar color="amber accent-4" dark>
                    <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>more_vert</v-icon> -->
                    <!-- </v-btn> -->
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.body"></span>
                  </v-card-title>
                  <!-- box cancel -->
                  <v-card-actions>
                    <v-btn flat color="secondary">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import CalendarsService from "../services/CalendarsService";

export default {
  data: () => ({
    today: "",
    focus: "",
    type: "month",
    start: null,
    end: null,
    typeOptions: [{ text: "Month", value: "month" }],
    events: [
      {
        title: "Vacation",
        body: "Going to the beach!sdfsdfsdf!!!!!!!!!!!",
        date: "2019-08-08",
        open: false
      },
      {
        title: "Vacations",
        body: "Going to the beach!",
        date: "2019-08-09",
        open: false
      }
    ]
  }),
  created() {
    let newday = new Date();
    let month = newday.getMonth() + 1;
    let date = newday.getDate();
    const year = newday.getFullYear();

    if (month.toString().length == 1) {
      month = "0" + month.toString();
    }
    if (date.toString().length == 1) {
      date = "0" + date.toString();
    }
    this.today = year + "-" + month + "-" + date;
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  methods: {
    open(event) {
      alert(event.title);
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    }
  }
};
</script>

<style>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #FFD600;
  color: #ffffff;
  border: 1px solid #FFD600;
  width: 100%;
  font-size: 12px;
  padding: 2.5px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
