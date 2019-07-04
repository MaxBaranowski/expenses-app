<template>
  <section class="form-wrapper">
    <form class="form-action" action>
      <h1>Already have na account?</h1>
      <h2>Log In Here</h2>

      <label for="login">First name:</label>
      <input type="text" name="login" value="Mickey" />

      <label for="pasword">Password:</label>
      <input type="password" name="password" value="Mouse" />

      <input type="submit" value="Submit" />

      <router-link tag="li" to="/forget">
        <a>Forgot your password?</a>
      </router-link>
    </form>
  </section>
</template>

<script>
import "../Form.scss";

export default {};
</script>

<style scoped>
</style>
