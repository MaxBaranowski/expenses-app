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
          <a href="#" class="default-button button-left">
            <span class="arrow down">&#10095;</span> Income
          </a>
          <a href="#" class="default-button button-right">New Expenses</a>
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
            <tr v-for="(month,key) in months" v-bind:key="'month_' + month">
              <td>{{month}}</td>

              <td
                v-if="years[activeYear].hasOwnProperty('months') && years[activeYear].months.hasOwnProperty(key-1)"
              >
                <span class="table-money">{{years[activeYear].months[key-1].ammount}}</span>
              </td>
              <td v-else>-</td>

              <td
                v-if="years[activeYear].hasOwnProperty('months') && years[activeYear].months.hasOwnProperty(key-1)"
              >
                <span class="table-money">{{years[activeYear].months[key-1].income}}</span>
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
              <td v-for="(el, year) in years" v-bind:key="'year_' + year">
                <a
                  href="#"
                  v-on:click="changeYear(year, $event)"
                  :ref="'year_' + year"
                  :class="[
                    'default-button' , 
                    (Object.keys(years).indexOf(year) == 0 ? 'button-left': ''), , 
                    (Object.keys(years).indexOf(year) == Object.keys(years).length-1 ? 'button-right': '') 
                  ]"
                >{{year}}</a>
              </td>
            </tr>
          </tfoot>
        </table>

        <div v-if="activeYear" class="expenses-calendar-month-day-cards">
          <div class="expenses-calendar-card">
            <h3 class="expenses-calendar-card-day">
              <span class="arrow down">&#10095;</span> 2019-12-19
            </h3>
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
                <tr>
                  <td>1</td>
                  <td colspan="3">Beer</td>
                  <td colspan="2">$32</td>
                  <td colspan="2">Delete</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td colspan="3">Total</td>
                  <td colspan="2">$32</td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="expenses-calendar-card">
            <h3 class="expenses-calendar-card-day">
              <span class="arrow down">&#10095;</span> 2019-12-19
            </h3>
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
                <tr>
                  <td>1</td>
                  <td colspan="3">Beer</td>
                  <td colspan="2">$32</td>
                  <td colspan="2">Delete</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td colspan="3">Total</td>
                  <td colspan="2">$32</td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="expenses-calendar-card">
            <h3 class="expenses-calendar-card-day">
              <span class="arrow down">&#10095;</span> 2019-12-19
            </h3>
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
                <tr>
                  <td>1</td>
                  <td colspan="3">Beer</td>
                  <td colspan="2">$32</td>
                  <td colspan="2">Delete</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td colspan="3">Total</td>
                  <td colspan="2">$32</td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <h1 v-else>no data for current year</h1>
      </main>
    </section>
  </div>
</template>

<script>
import "../UserExpensesTable.scss";

const defaultData = { activeYear: "2018", year: 2018, month: 1 };
const GET_YEAR_DATA_URL = "http://localhost:3000/card/getYearlyExpenses";

export default {
  name: "UserExpensesTableBudget",
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
      activeYear: defaultData.activeYear
    };
  },
  methods: {
    chooseDefaultActiveYear() {
      this.setActiveYear(defaultData.activeYear);
      // this.getYearData(defaultData.year, defaultData.month);
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
    changeYear(year, event) {
      if (!event) {
        return;
      }
      this.setActiveYear(year);
    },
    getYearData(year, month) {
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