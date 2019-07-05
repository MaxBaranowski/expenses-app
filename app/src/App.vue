<template>
  <div id="app">
    <Form v-if="!this.$cookie.get('connect.sid')" />
    <UserExpensesTable v-else />
  </div>
</template>

<script>
import "./styles.scss";
import Form from "./components/LoginForm/Form.vue";
import UserExpensesTable from "./components/UserExpensesTable/UserExpensesTable";

export default {
  name: "app",
  components: {
    Form,
    UserExpensesTable
  }
};
</script>

<style>
</style>
