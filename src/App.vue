<template>
  <div id="app">
    <h1 v-if="isLoading">LOADING!!!!</h1>
    <Form v-else-if="!userLoggedIn" />
    <UserExpensesTable v-else />
  </div>
</template>

<script>
import "./styles.scss";
import Form from "./components/LoginForm/Form.vue";
import UserExpensesTable from "./components/UserExpensesTable/UserExpensesTable";

const LOGIN_URL = "https://expenses-app.maksio.now.sh/user/isUserAuthorized";

export default {
  name: "app",
  components: {
    Form,
    UserExpensesTable
  },
  data() {
    return {
      userLoggedIn: false,
      isLoading: true
    };
  },
  beforeCreate() {
    this.isLoading = true;
    this.axios({
      method: "post",
      url: LOGIN_URL,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => {
        this.userLoggedIn = true;
        this.isLoading = false;
        // console.log(1);
      })
      .catch(error => {
        this.userLoggedIn = false;
        this.isLoading = false;
        // console.log(2);
      });
  }
};
</script>

<style>
</style>
