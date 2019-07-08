<template>
  <div id="UserExpensesTableBudget">
    <section class="user-expenses-content">
      <header>
        <h1>Expenses Office</h1>
        <p class="expenses-balance">
          Balance: $
          <span>195.0</span>
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
            <tr>
              <td>January</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>February</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr class="active">
              <td>March</td>
              <td>
                <span class="table-money">99</span>
              </td>
              <td>
                <span class="table-money">15</span>
              </td>
            </tr>
            <tr>
              <td>April</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>May</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>June</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>July</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>August</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>September</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>October</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>November</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr>
              <td>December</td>
              <td>99</td>
              <td>15</td>
            </tr>
            <tr class="expenses-calendar-months-total">
              <td>Total:</td>
              <td>4599</td>
              <td>1455</td>
            </tr>
          </tbody>

          <tfoot class="expenses-calendar-months-years">
            <tr>
              <td colspan="3">Years:</td>
            </tr>
            <tr>
              <td>
                <a href="#" class="default-button button-left">2017</a>
              </td>
              <td>
                <a href="#" class="default-button">2018</a>
              </td>
              <td>
                <a href="#" class="default-button button-right">2019</a>
              </td>
            </tr>
          </tfoot>
        </table>

        <div class="expenses-calendar-month-day-cards">
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
      </main>
    </section>
  </div>
</template>

<script>
import "../UserExpensesTable.scss";

export default {
  name: "UserExpensesTableBudget",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>