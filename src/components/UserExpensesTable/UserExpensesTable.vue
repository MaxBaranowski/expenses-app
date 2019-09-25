<template>
  <div id="UserExpenses">
    <Nav />
    <BudgetTable />
  </div>
</template>

<script>
  import Nav from "./components/Navigation";
  import BudgetTable from "./components/Budget";

  export default {
    name: "UserExpenses",
    components: {
      Nav,
      BudgetTable
    }
  };
</script>

<style scoped>
</style>
