<template>
  <div id="Form">
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
import "./Form.scss";

export default {
  name: "Form",
  data() {
    return {
      message: "hello from Form.vue"
    };
  },
  props: {
    msg: String
  },
  methods: {}
};
</script>


<style scoped>
</style>
