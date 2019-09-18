<template>
  <div id="UserExpensesTableBudget">
    <section class="user-expenses-content">
      <header>
        <h1>Expenses Office</h1>
        <p class="expenses-balance">
          Balance: $
          <span>{{years[activeYear].balance || 0}}</span>
        </p>
        <div class="expenses-actions">
          <a @click="openAddIncomeModel" class="default-button button-left">Income</a>
          <a @click="openNewExpensesModel" class="default-button button-right">New Expenses</a>
        </div>
      </header>
      <main>
        <table id="expenses-calendar-months">
          <thead>
          <tr>
            <th colspan="1">Months</th>
            <th colspan="1">Ammount</th>
            <th colspan="1">Income</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-on:click="changeMonth(key)"
            v-for="(month, key) in months"
            v-bind:key="activeYear + '_' + key"
            :ref="'month_' + key"
            :class="[
              (activeMonth.month === key ? 'active' :'')
              ]"
          >
            <td>{{month}}</td>

            <td
              v-if="years[activeYear].hasOwnProperty('months') && years[activeYear].months.hasOwnProperty(key)"
            >
              <span class="table-money">{{years[activeYear].months[key].ammount}}</span>
            </td>
            <td v-else>-</td>

            <td
              v-if="years[activeYear].hasOwnProperty('months') && years[activeYear].months.hasOwnProperty(key)"
            >
              <span class="table-money">{{years[activeYear].months[key].income}}</span>
            </td>
            <td v-else>-</td>
          </tr>

          <tr class="expenses-calendar-months-total">
            <td>Total:</td>
            <td>{{years[activeYear].totalAmmount || 0}}</td>
            <td>{{years[activeYear].totalIncome || 0}}</td>
          </tr>
          </tbody>

          <tfoot class="expenses-calendar-months-years">
          <tr>
            <td colspan="3">Years:</td>
          </tr>
          <tr>
            <td v-for="(el, year) in years" v-bind:key="year">
              <a
                href="#"
                v-on:click="changeYear(year, $event)"
                :ref="'year_' + year"
                :class="[
                    'default-button' , 
                    (Object.keys(years).indexOf(year) === 0 ? 'button-left': ''), ,
                    (Object.keys(years).indexOf(year) === Object.keys(years).length-1 ? 'button-right': '')
                  ]"
              >{{year}}</a>
            </td>
          </tr>
          </tfoot>
        </table>

        <div v-if="activeMonth.cards.length > 0" class="expenses-calendar-month-day-cards">
          <div v-for="day of activeMonth.cards" v-bind:key="day._id" class="expenses-calendar-card">
            <h3
              @click="showHideDayRecords(day, activeMonth.cards.indexOf(day), $event)"
              class="expenses-calendar-card-day"
            >
              <transition>
                <span v-if="day.show" class="arrow down">&#10095;</span>
                <span v-else class="arrow up">&#10095;</span>
              </transition>
              {{convertDate(day.date)}}
            </h3>

            <transition name="fade">
              <div key="full-card" v-if="day.show">
                <table class="expenses-calendar-card-table">
                  <thead>
                  <tr>
                    <th></th>
                    <th colspan="3">Description</th>
                    <th colspan="2">Ammount</th>
                    <th colspan="2">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="card of day.cards" v-bind:key="card._id">
                    <td>{{day.cards.indexOf(card)+1}}</td>
                    <td colspan="3">{{card.description}}</td>
                    <td colspan="2">${{card.ammount}}</td>
                    <td colspan="2">
                      <a href="#" @click="deleteCardRecord(card._id, day.date)">Delete</a>
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <td></td>
                    <td colspan="3">Total</td>
                    <td colspan="2">${{day.totalAmmount}}</td>
                    <td colspan="2"></td>
                  </tr>
                  </tfoot>
                </table>
              </div>

              <div key="hiden-card" v-else>
                <table class="expenses-calendar-card-table">
                  <thead>
                  <tr>
                    <th width="200px">Total items:</th>
                    <th width="50px">{{Object.keys(day.cards).length}}</th>
                    <th width="200px">Total ammount:</th>
                    <th width="50px">${{day.totalAmmount}}</th>
                  </tr>
                  </thead>
                </table>
              </div>
            </transition>
          </div>
        </div>
        <h1 v-else>No data</h1>
      </main>
    </section>

    <section v-show="isAddNewExpense">
      <addDayExpense v-on:update="updateTable" v-on:close="closeNewExpensesModel" />
    </section>

    <section v-show="isAddNewIncome">
      <addIncome v-on:update="updateTable" v-on:close="closeAddIncomeModel" />
    </section>
  </div>
</template>

<script>
  import "../UserExpensesTable.scss";

  import addDayExpense from "./Budget/addDayExpenses";
  import addIncome from "./Budget/addIncome";

  const defaultData = { activeYear: "2018", year: 2018, month: 1 };
  const GET_YEAR_DATA_URL = "http://localhost:3000/card/getYearlyExpenses";
  const GET_MONTH_DATA_URL = "http://localhost:3000/card/getMonthlyExpenses";
  const DELETE_CARD_RECORD = "http://localhost:3000/card/deleteCardRecord";

  export default {
    name: "UserExpensesTableBudget",
    components: {
      addDayExpense,
      addIncome
    },
    data() {
      return {
        years: {
          "2017": {},
          "2018": {},
          "2019": {}
        },
        months: {
          1: "January",
          2: "February",
          3: "March",
          4: "April",
          5: "May",
          6: "June",
          7: "July",
          8: "August",
          9: "September",
          10: "October",
          11: "November",
          12: "December"
        },
        activeYear: defaultData.activeYear,
        activeMonth: {
          month: defaultData.month,
          cards: []
        },
        isAddNewExpense: false,
        isAddNewIncome: false
      };
    },
    methods: {
      chooseDefaultActiveYear() {
        this.setActiveYear(defaultData.activeYear);
        this.changeMonth(defaultData.month);
      },
      setActiveYear(year) {
        let years = Object.keys(this.years);
        for (let year = 0; year < years.length; year++) {
          this.$refs["year_" + years[year]][0].classList.remove("active-year");
        }

        this.$refs["year_" + year][0].classList.add("active-year");
        this.activeYear = year;
        this.getYearData(this.activeYear, defaultData.month);
      },
      setActiveMonth(currentMonth) {
        for (let month = 1; month <= 12; month++) {
          this.$refs["month_" + month][0].classList.remove("active");
        }
        this.$refs["month_" + currentMonth][0].classList.add("active");
        this.activeMonth.month = currentMonth;
      },
      changeYear(year, event) {
        if (!event) {
          return;
        }
        this.setActiveYear(year);
        this.changeMonth(this.activeMonth.month);
      },
      changeMonth(month) {
        this.setActiveMonth(month);
        this.getMonthData(month);
      },
      updateTable() {
        this.getYearData();
        this.getMonthData(this.activeMonth.month);
      },
      getYearData(year = this.activeYear, month = this.activeMonth.month) {
        this.axios({
          method: "post",
          url: GET_YEAR_DATA_URL,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          data: { year: year, month: month }
        })
          .then(result => {
            if (!result) return;
            this.years[result.data.year] = result.data;
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
      },
      convertDate(dateString) {
        return dateString
          .toString()
          .match(/(\d{4})(\d{2})(\d{2})/)
          .slice(1)
          .join("-");
      },
      getMonthData: function (month = 1) {
        let currentYear = this.activeYear;
        // console.log(currentYear, month);
        this.axios({
          method: "post",
          url: GET_MONTH_DATA_URL,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          data: { year: currentYear, month: month }
        })
          .then(result => {
            if (!result || !result.data) return;
            let openedCards = [];
            // save opened cards for current month
            this.activeMonth.cards.forEach(card => {
                if (card.show) {
                  // openedCards[card._id] = card.show;
                  openedCards.push(card._id);
                }
              }
            );

            this.activeMonth.cards = result.data;
            this.activeMonth.cards.forEach(card => ( openedCards.includes(card._id) ? card.show = true : card.show = false )); //hide detail view of day card by default
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
      },
      openNewExpensesModel() {
        this.isAddNewExpense = true;
      },
      closeNewExpensesModel() {
        this.isAddNewExpense = false;
      },
      openAddIncomeModel() {
        this.isAddNewIncome = true;
      },
      closeAddIncomeModel() {
        this.isAddNewIncome = false;
      },
      showHideDayRecords(day, dayIndex, event) {
        // save last version of object data
        let changed = this.activeMonth.cards[dayIndex];
        changed.show = !changed.show; // changed it

        this.$set(
          this.activeMonth.cards,
          dayIndex,
          changed // and rewrite for vue, so it can see it now. Everything is caused by arrays
        );
      },
      deleteCardRecord(id, date) {
        this.axios({
          method: "post",
          url: DELETE_CARD_RECORD,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            cardId: id,
            date: date,
            year: this.activeYear,
            month: this.activeMonth.month
          }
        })
          .then(result => {
            if (!result || !result.data) return;
            // console.log(result);
            this.updateTable();
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
      }
    },
    created() {
      // this.chooseDefaultActiveYear();
      this.getYearData(defaultData.year, defaultData.month);
    },
    mounted() {
      this.chooseDefaultActiveYear();
    }
  };
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    max-height: 1000px;
    opacity: 1;
    transition: max-height 0.8s ease-in-out, opacity 0.8s ease-in-out;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    max-height: 0;
  }
</style>