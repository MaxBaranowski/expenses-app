<template>
  <section class="form-wrapper" id="register-form">
    <form class="form-action" v-on:submit.prevent="submitForm" method="post">
      <h1>Don`t have an account?</h1>
      <h2>Register Now</h2>

      <label for="password">Login (email):</label>
      <input
        type="text"
        name="login"
        v-model="credentials.login"
        v-on:blur="isFieldEmpty"
        v-on:keyup="isFieldEmpty"
        placeholder="Mickey"
      />
      <p class="text-danger" v-if="errors.login">Login can`t be empty</p>

      <label for="pasword">Password:</label>
      <input
        type="password"
        name="password"
        v-on:blur="isFieldEmpty"
        v-on:keyup="isFieldEmpty"
        v-model="credentials.password"
        placeholder="******"
      />
      <p class="text-danger" v-if="errors.password">Password can`t be empty</p>

      <button type="submit">Register</button>
      <p class="text-danger" v-if="errors.submit">{{errors.submit}}</p>
    </form>
  </section>
</template>

<script>
  /* eslint-disable */
  const LOGIN_URL = "https://expenses-app.maksio.now.sh/user/signup";

  export default {
    name: "register-form",
    data() {
      return {
        errors: {
          login: false,
          password: false,
          submit: false
        },
        credentials: {
          login: null,
          password: null
        }
      };
    },
    methods: {
      isFieldEmpty(event) {
        let el = event.target.name;
        let elValue = event.target.value;
        if (elValue.length < 1) {
          this.errors[el] = true;
        } else {
          this.errors[el] = false;
        }
      },
      submitForm(e) {
        e.preventDefault();

        // this.errors = {}; //  reset errors

        this.validLogin();
        this.validPassword();
        this.makeRequest();
      },
      validLogin() {
        if (!this.credentials.login) {
          this.errors["login"] = true;
        } else {
          this.errors["login"] = false;
        }
      },
      validPassword() {
        if (!this.credentials.password) {
          this.errors["password"] = true;
        } else {
          this.errors["password"] = false;
        }
      },
      makeRequest() {
        if (this.errors.login || this.errors.password) {
          // console.log("errors");
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
        })
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            if (error.response) {
              // console.log(error.response.data);
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
    }
  };
</script>


<style scoped>
</style>
