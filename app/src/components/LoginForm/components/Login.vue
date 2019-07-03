<template>
  <section>
    <form action>
      <h1>THIS is login form</h1>

      <label for="password">First name:</label>
      <input type="text" name="login" value="Mickey" />

      <label for="pasword">Password:</label>
      <input type="password" name="password" value="Mouse" />

      <input type="submit" value="Submit" />
    </form>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
   flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 300px;
  border: 1px solid #2c3e50;
  border-radius: 10px;
}
</style>
