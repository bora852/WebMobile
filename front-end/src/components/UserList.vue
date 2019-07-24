<template>

  <div>
    <v-progress-circular
      :size="50"
      indeterminate
      v-show="listLoding"
    ></v-progress-circular>

    <div v-show="!listLoding" class="table-box">
      <table class="list-table">
        <thead>
          <tr>
            <th>E-mail</th>
            <th>가입일</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userList" :key="item.email">
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
  </div>

</template>

<script>
import AuthService from "../services/AuthService";

export default {
  name: "UserList",
  data: function() {
    return {
      listLoding: false,
      userList: []
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
      this.listLoding = false;
    },
    async authChange(email, e) {
      var value = e.target.value;
      await AuthService.userAuthUpdate(email, value);
    }
  }
};

</script>

<style>
@media screen and (min-width: 768px) {
  table.list-table {
    width: 700px;
  }
}

table.list-table {
  border-collapse: collapse;
  text-align: center;
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
  padding: 5px;
  vertical-align: center;
  border-bottom: 1px solid #ccc;
}
</style>
