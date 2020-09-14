import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requires_auth: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   let token = null;
//   let isAdmin = null;
//   let isSupervisor = null;
//   let isResource = null;
//
//   token = this.$store.getters("restAuth/token");
//
//   if (to.matched.some(record => record.meta.requires_auth)) {
//     if (token == null) {
//       next({
//         name: 'Login',
//         params: { nextUrl: to.fullPath },
//       });
//     } else if (!authService.tokenIsExpired(token)) {
//       if (to.matched.some(record => record.meta.is_admin) && isAdmin) {
//         next();
//       } else if (to.matched.some(record => record.meta.is_teacher) && isTeacher) {
//         next();
//       } else if (to.matched.some(record => record.meta.is_student) && isStudent) {
//         next();
//       } else {
//         router.push(
//           {
//             name: 'error-page',
//             params: {
//               errorCode: 403,
//               errorMessage: "Sorry, you don't have the right permissions to enter this page",
//             },
//           });
//       }
//       // TODO: prepare logic for all possible roles
//     } else {
//       localStorage.removeItem('auth-data');
//       next({
//         name: 'login',
//       });
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (token == null) {
//       next();
//     } else {
//       next({
//         name: 'dashboard',
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
