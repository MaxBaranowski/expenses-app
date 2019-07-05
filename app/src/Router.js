import Vue from "vue";
import VueRouter from "vue-router";

// routing
Vue.use(VueRouter);

import LoginForm from "./components/LoginForm/components/Login.vue";
import RegestrationForm from "./components/LoginForm/components/Regestration";
import ForgetPasswordForm from "./components/LoginForm/components/ForgetPassword";

const routes = [
  { path: "/", component: LoginForm },
  { path: "/login", component: LoginForm },
  { path: "/register", component: RegestrationForm },
  { path: "/forget", component: ForgetPasswordForm }
];

export default new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active-link"
});
