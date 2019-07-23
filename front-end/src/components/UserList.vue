<template>
  <div>
    <v-progress-circular
      :size="50"
      color="amber"
      indeterminate
      v-show="listLoding"
    ></v-progress-circular>
    <div class="text-xs-center">
      <div v-show="!listLoding" class="fas">
        <v-data-table :headers="headers" :items="userList" class="elevation-1">
          <template v-slot:items="props" item-key="props.item.email">
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">
              <v-select :items="authorities" label="Solo field" solo :value="props.item.authority" style="width:100px" color="orange" dense></v-select>
            </td>
            <td class="text-xs-center">{{ props.item.date }}</td>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";

export default {
  name: "UserList",
  components: {},
  data: function() {
    return {
      listLoding: false,
      authorities: ["team", "guest", "admin"],
      headers: [
        {
          text: "E-mail",
          align: "center",
          value: "email"
        },
        { text: "권한", align: "center", value: "authority" },
        { text: "가입일", align: "center", value: "date" }
      ],
      userList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoding = true;
      this.userList = await AuthService.getUserList();
      this.listLoding = false;
    }
  }
};
</script>

<style></style>
