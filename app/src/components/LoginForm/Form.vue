<template>
  <div id="Form">
    <h1>this is form componen</h1>
  </div>
</template>

<script>

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
