<template>
  <section id="addDayExpenses-wrapper">
    <form id="addDayExpensesForm" v-on:submit.prevent="handleSubmit">
      <header>
        <h1>New Expanse Card</h1>
        <div @click="closeModal" class="close">x</div>
      </header>
      <main>
        <label for="ammount">Ammount:</label>
        <input
          type="number"
          v-model.number="dayExpenses.cards[0].ammount"
          name="ammount"
          id="ammount"
          required
        />

        <label for="date">Date:</label>
        <input type="date" @change="dateModify" name="date" id="ammount" required />

        <label for="description">Description:</label>
        <input
          type="text"
          v-model="dayExpenses.cards[0].description"
          name="description"
          id="description"
          required
        />
      </main>
      <footer>
        <button @click="closeModal" type="button">Cancel</button>
        <button type="sumbit" form="addDayExpensesForm">Save</button>
      </footer>
    </form>
  </section>
</template>

<script>
  const ADD_NEW_EXPENSE_URL = "http://localhost:3000/card/addDailyExpenses";

  export default {
    name: "addDayExpenses",
    data () {
      return {
        dayExpenses: {
          cards: [
            {
              description: "", // from form
              ammount: 0 // from form
            }
          ],
          date: null, // from form
          year: null,
          month: null
        }
      };
    },
    methods: {
      handleSubmit () {
        this.axios({
          method: "post",
          url: ADD_NEW_EXPENSE_URL,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          data: this.dayExpenses
        })
          .then(result => {
            if ( !result || !result.data ) return;
            // run parent fucntion with update table data
            console.log(result)
            this.updateTable();
          })
          .catch(error => {
            if ( error.response ) {
              console.log(error.response.data);
            } else if ( error.request ) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
      },
      closeModal () {
        this.$emit("close");
      },
      updateTable () {
        this.$emit("update");
      },
      dateModify (element) {
        let oldDate = element.target.value;
        let year = new Date(oldDate).getUTCFullYear();
        let month =
          new Date(oldDate).getUTCMonth() < 10
            ? "0" + ( Number(new Date(oldDate).getUTCMonth()) + 1 )
            : Number(new Date(oldDate).getUTCMonth()) + 1;
        let day =
          new Date(oldDate).getUTCDate() < 10
            ? "0" + new Date(oldDate).getUTCDate()
            : new Date(oldDate).getUTCDate();

        this.dayExpenses.month = Number(month);
        this.dayExpenses.year = Number(year);
        this.dayExpenses.date = Number(year + month + day);
      }
    }
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

