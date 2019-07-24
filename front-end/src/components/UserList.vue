<template>

  <div>
    <v-progress-circular
      :size="50"
      indeterminate
      v-show="listLoding"
    ></v-progress-circular>

    <div v-show="!listLoding">
      <table class="list-table text-align">
        <thead>
          <tr>
            <th>E-mail</th>
            <th>가입일</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in showList" :key="item.email">
            <td>{{ item.email }}</td>
            <td>{{ item.date }}</td>
            <td>
              <v-select
                ref="select"
                :items="authorities(item.authority)"
                :value="item.authority"
                class="fa"
                @change="authChange(item.email, $event)"
              >
              </v-select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center text-align" v-show="!listLoding">
      <v-container>
        <v-layout justify-center>
          <v-flex xs8>
            <v-container max-width="300">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="pageMax"
                :total-visible="5"
              ></v-pagination>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>

    </div>
  </div>

</template>

<script>
import AuthService from "../services/AuthService";

export default {
  name: "UserList",
  data: function() {
    return {
      pageMax: null,
      page: 1,
      listLength: 10,
      listLoding: false,
      userList: [],
      showList: []
    };
  },
  computed: {
    authorities() {
      return state => {
        if (state == "admin") {
          return [
            { text: "team", value: "team", disabled: true },
            { text: "guest", value: "guest", disabled: true },
            { text: "admin", value: "admin", disabled: true }
          ];
        } else {
          return [
            { text: "team", value: "team", disabled: false },
            { text: "guest", value: "guest", disabled: false },
            { text: "admin", value: "admin", disabled: true }
          ];
        }
      };
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoding = true;
      this.userList = await AuthService.getUserList();
      this.showList = this.userList.slice(
        (this.page - 1) * 10,
        (this.page - 1) * 10 + 10
      );
      this.pageMax = Math.floor(this.userList.length / 10) + 1;

      this.listLoding = false;
    },
    async authChange(email, e) {
      await AuthService.userAuthUpdate(email, e);
    }
  },
  watch: {
    page: function() {
      this.showList = this.userList.slice(
        (this.page - 1) * 10,
        (this.page - 1) * 10 + 10
      );
    }
  }
};

</script>

<style>
.text-align {
  text-align: center;
}
@media screen and (min-width: 768px) {
  table.list-table {
    width: 700px;
  }
}
table.list-table {
  border-collapse: collapse;
  line-height: 1.5;
  margin: 0 auto;
}
table.list-table thead th {
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  color: #369;

  border-bottom: 3px solid #036;
}
table.list-table tbody th {
  width: 150px;
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
  background: #f3f6f7;
}
table.list-table td {
  width: 350px;
  padding: 3px;
  vertical-align: center;
  border-bottom: 1px solid #ccc;
}
</style>
