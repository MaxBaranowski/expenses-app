<template>
  <div id="UserExpensesTable">
    <nav>
      <ul>
        <li>
          <a v-on:click="makeRequest">logout</a>
        </li>
      </ul>
    </nav>
    <main>
      <h1>hello user template login</h1>
    </main>
  </div>
</template>

<script>
const LOGIN_URL = "http://localhost:3000/user/logout";

import "./UserExpensesTable.scss";

export default {
  name: "ForUserExpensesTablem",
  data() {
    return {};
  },
  methods: {
    makeRequest() {
      this.axios({
        method: "post",
        url: LOGIN_URL,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(result => {
           this.$router.push("/");
          location.reload();
          console.log(result);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            this.errors["submit"] = error.response.data.error;
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
