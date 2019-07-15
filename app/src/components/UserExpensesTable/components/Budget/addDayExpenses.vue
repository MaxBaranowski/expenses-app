<template>
  <section id="addDayExpenses-wrapper">
    <form id="addDayExpensesForm" v-on:submit.prevent>
      <header>
        <h1>New Expanse Card</h1>
        <div class="close">x</div>
      </header>
      <main>
        <label for="ammount">Ammount:</label>
        <input type="text" name="ammount" id="ammount" />

        <label for="date">Date:</label>
        <input type="date" name="date" id="ammount" />

        <label for="description">Description:</label>
        <input type="text" name="description" id="description" />
      </main>
      <footer>
        <button>Cancel</button>
        <button type="sumbit" form="addDayExpensesForm">Save</button>
      </footer>
    </form>
  </section>
</template>

<script>
export default {
  name: "addDayExpenses"
};
</script>

<style lang="scss" scoped>
#addDayExpenses-wrapper {
  display: block;
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  #addDayExpensesForm {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    min-height: 300px;
    height: auto;
    border: 1px solid;
    border-radius: 5px;
    background: #ffffff;
    overflow: hidden;
    header {
      position: relative;
      border-bottom: 2px solid #efefef;
      h1 {
        margin: 8px 0;
      }
      .close {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 8px;
        border: 1px solid #efefef;
        border-radius: 5px;
        line-height: 7.7px;
        cursor: pointer;
        &:hover {
          background: #efefef;
          border-color: lightgrey;
          color: red;
        }
      }
    }
    main {
      display: flex;
      flex-direction: column;
      padding: 0 15px 25px;
      label {
        text-align: left;
        padding: 15px 0 5px 0;
      }
      input {
        font-size: 1rem;
        line-height: 1.6rem;
        padding: 0 5px;
      }
    }
    footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      background-color: #efefef;
      border-top: 2px solid #9e9e9e;
      padding: 15px 5px;
      button {
        width: 100px;
        height: 35px;
        margin-right: 15px;
        border-radius: 5px;
        &[type="sumbit"] {
          background-color: #d1e7ff;
        }
      }
    }
  }
}
</style>

