<template>
  <section class="form-wrapper" id="login-form">
    <form class="form-action" @submit="submitForm" method="post">
      <h1>Already have na account?</h1>
      <h2>Log In Here</h2>

      <label for="login">Login:</label>
      <input type="text" name="login" v-model="credentials.login" value="Mickey" />

      <label for="pasword">Password:</label>
      <input type="password" name="password" v-model="credentials.password" value="Mouse" />

      <input type="submit" value="Submit" />

      <router-link tag="li" to="/forget">
        <a>Forgot your password?</a>
      </router-link>
    </form>
  </section>
</template>

<script>
const LOGIN_URL = "http://localhost:3000/user/login";

export default {
  name: "login-form",
  data() {
    return {
      errors: [],
      credentials: {
        login: null,
        password: null
      }
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();

      this.errors = []; //  reset errors

      this.validLogin();
      this.validPassword();

      this.makeRequest();
    },
    validLogin() {
      if (!this.credentials.login) {
        this.errors.push("Login is required.");
      }
    },
    validPassword() {
      if (!this.credentials.password) {
        this.errors.push("Password is required.");
      }
    },
    makeRequest() {
      if (this.errors.length > 0) {
        console.log("errors", this.errors);
        return;
      }
      this.axios({
        method: "post",
        url: LOGIN_URL,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        data: this.credentials
      }).then(result => {
        console.log(result);
      });
    }
  }
};
</script>

<style scoped>
</style>
