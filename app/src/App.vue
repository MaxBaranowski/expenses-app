<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link tag="li" to="/login">
            <a>login</a>
          </router-link>
        </li>
        <li>
          <router-link tag="li" to="/register">
            <a>register</a>
          </router-link>
        </li>
      </ul>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
// import Form from "./components/LoginForm/Form.vue";

export default {
  name: "app",
  components: {
    // Form
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

nav {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 25px;
}

nav ul {
  display: flex;
  flex-direction: row;
  width: 20%;
  justify-content: space-around;
}

nav li {
  list-style-type: none;
}

nav li a {
  text-decoration: none;
  color: #2c3e50;
}

nav li a:hover {
  text-decoration: underline;
}

main {
  display: flex;
  height: 100%;
}
</style>
