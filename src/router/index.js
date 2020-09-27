import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import DomainInformation from "../components/DomainInformation.vue";
import Login from "../views/Login.vue";
import Error from "../views/Error.vue";
import authServices from "@/services/authServices";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: { name: "Error" }
  },
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
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/error-page",
    name: "Error",
    component: Error,
    meta: {
      requires_auth: true,
      is_admin: true,
      is_supervisor: true
    }
  },
  {
    path: "/domain-config",
    name: "Config",
    component: DomainInformation,
    meta: {
      requires_auth: true,
      is_admin: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let accessToken = null;
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
    //TODO: Add error view.
  }
  if (to.matched.some(record => record.meta.requires_auth)) {
    if (accessToken === null) {
      next({
        name: "Login",
        params: { nextUrl: to.fullPath }
      });
    } else if (!authServices.tokenIsExpired(accessToken)) {
      if (to.matched.some(record => record.meta.is_admin) && isAdmin) {
        console.log("Is admin.");
        next();
      } else if (
        to.matched.some(record => record.meta.is_supervisor) &&
        isSupervisor
      ) {
        console.log("Is supervisor.");
        next();
      } else if (
        to.matched.some(record => record.meta.is_resource) &&
        isResource
      ) {
        console.log("Is resource.");
        next();
      } else {
        router.push({
          name: "Error"
        });
      }
    } else {
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
