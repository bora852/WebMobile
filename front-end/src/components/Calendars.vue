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
    <v-spacer></v-spacer>
    <!-- modal -->
    <v-dialog ref="form" v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn fab text icon v-on="on">add<v-icon small>create</v-icon> </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Calendars</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="title"
                  label="Title*"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="body"
                  label="Contents"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="date"
                  label="date*"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="amber accent-4" text @click.stop="submit()">
            Save
          </v-btn>
          <v-btn color="amber accent-4" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- modal end -->
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
                    <!-- <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn> -->
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn> -->
                    <v-btn icon @click="DeleteCalendars(event)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.body"></span>
                  </v-card-title>
                  <!-- box cancel -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="modify_btn(event)">
                      Modify
                    </v-btn>
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
import SwalAlert from "../services/SwalAlert";
import { eventBus } from "../main.js";

export default {
  data: () => ({
    dialog: false,
    today: "",
    focus: "",
    type: "month",
    start: null,
    end: null,
    typeOptions: [{ text: "Month", value: "month" }],
    calens: [],
    events: [],
    isnull:[],
    user_email: "",
    title: "",
    body: "",
    date: "",
    count: 0
  }),
  created() {
    this.getId();
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
  mounted() {},
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  methods: {
    modify_btn(data){
      this.dialog = true;
      this.title = data.title;
      this.body = data.body;
      this.date = data.date;
      this.idx = data.idx;
    },
    async getId() {
      await eventBus.$on("getUserId", userId => {
        this.user_email = userId;
      });
    },
    async getcalendar() {
      this.events = [];
      this.calens = await CalendarsService.getList(this.user_email);

      for (var i = 0; i < this.calens.length; i++) {
        let c_temp = { title: "", body: "", date: "", idx: "", open: false };

        var yymmdd = this.calens[i].created_at;
        yymmdd = yymmdd.substring(0, 10);

        c_temp.date = yymmdd;
        c_temp.title = this.calens[i].title;
        c_temp.body = this.calens[i].body;
        c_temp.idx = this.calens[i].idx;

        this.events.push(c_temp);
      }
    },
    async submit() {
      if (this.title == "") {
        SwalAlert.swatAlert("Error!", "제목을 입력해주세요!", "error", "Ok!");
      } else if (this.date == "") {
        SwalAlert.swatAlert("Error!", "날짜를 선택해주세요!", "error", "Ok!");
      } else {
        let created_at = this.date + " 15:00:00";
        var isCalen = await CalendarsService.CalendarsInsert(
          this.idx,
          this.title,
          this.body,
          created_at,
          this.$store.state.user
        );
        if (isCalen == "success") {
          this.getcalendar();
        }
      }
    },
    async DeleteCalendars(event) {
      await CalendarsService.Calendarsdelete(event.idx);
      this.getcalendar();
    },
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
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  watch: {
    user_email: function() {
      this.getcalendar();
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
  background-color: #ffd600;
  color: #ffffff;
  border: 1px solid #ffd600;
  width: 100%;
  font-size: 12px;
  padding: 2.5px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
