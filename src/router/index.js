import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import authServices from "@/services/authServices";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requires_auth: true,
      is_admin: true,
      is_supervisor: true
    }
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let accessToken = null;
  // let roles = null;
  let isAdmin = false;
  let isSupervisor = false;
  let isResource = false;
  try {
    accessToken = authServices.getToken();
    isAdmin = authServices.isAdmin();
    isSupervisor = authServices.isSupervisor();
    isResource = authServices.isResource();
  } catch (e) {
    console.log(e);
    //this.$store.dispatch("restAuth/logout");
  }
  if (to.matched.some(record => record.meta.requires_auth)) {
    if (accessToken == null) {
      next({
        name: "Login",
        params: { nextUrl: to.fullPath }
      });
    } else if (!authServices.tokenIsExpired(accessToken)) {
      if (to.matched.some(record => record.meta.is_admin) && isAdmin) {
        next();
      } else if (
        to.matched.some(record => record.meta.is_supervisor) &&
        isSupervisor
      ) {
        next();
      } else if (
        to.matched.some(record => record.meta.is_resource) &&
        isResource
      ) {
        next();
      } else {
        router.push({
          name: "error-page",
          params: {
            errorCode: 403,
            errorMessage:
              "Sorry, you don't have the right permissions to enter this page"
          }
        });
      }
      // TODO: prepare logic for all possible roles
    } else {
      //this.$store.dispatch("restAuth/logout");
      next({
        name: "Login"
      });
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (accessToken == null) {
      next();
    } else {
      next({
        name: "Home"
      });
    }
  } else {
    next();
  }
});

export default router;
