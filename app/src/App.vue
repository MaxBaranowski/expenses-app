<template>
  <div id="app">
    <Form v-if="!connect" />
    <!-- !this.$cookie.get('connect.sid') -->
    <UserExpensesTable v-else />
  </div>
</template>

<script>
import "./styles.scss";
import Form from "./components/LoginForm/Form.vue";
import UserExpensesTable from "./components/UserExpensesTable/UserExpensesTable";

const LOGIN_URL = "http://localhost:3000/user/isUserAuthorized";

export default {
  name: "app",
  components: {
    Form,
    UserExpensesTable
  },
  data() {
    return {
      connect: false
    };
  },
  created() {
    this.axios({
      method: "post",
      url: LOGIN_URL,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => {
        this.connect = true;
        // console.log(1);
      })
      .catch(error => {
        this.connect = false;
        // console.log(2);
      });
  }
};
</script>

<style>
</style>
