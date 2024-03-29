import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import DomainInformation from "../components/DomainInformation.vue";
import Login from "../views/Login.vue";
import Error from "../views/Error.vue";
import CreateIncident from "../views/CreateIncident.vue";
import DomainAccessCode from "@/views/DomainAccessCode";
import authServices from "@/services/authServices";
import SupervisorManager from "@/views/SupervisorManager";
import ResourceManager from "@/views/ResourceManager";
import AdminManager from "@/views/AdminManager";
import IncidentsView from "@/views/IncidentsView";
import IncidentDetails from "@/components/IncidentDetails";
import IncidentMap from "@/views/IncidentMap";
import UserManager from "@/views/UserManager";
import ResourceStatistics from "@/views/ResourceStatistics";
import IncidentMetrics from "@/views/IncidentMetrics";
import UploadTrackpointsOfflineData from "@/views/UploadTrackpointsOfflineData";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: { name: "Error" }
  },
  {
    path: "/",
    name: "IncidentsView",
    component: IncidentsView,
    meta: {
      requires_auth: true,
      is_admin: true,
      is_supervisor: true
    }
  },
  {
    path: "/trackpoints-offline-data",
    name: "UploadTrackpointsOfflineData",
    component: UploadTrackpointsOfflineData,
    meta: {
      requires_auth: true,
      is_admin: true,
      is_supervisor: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
    // MUST NOT CONTAIN META WITH GUEST = TRUE
  },
  {
    path: "/domain-access-code",
    name: "DomainAccessCode",
    component: DomainAccessCode,
    meta: {
      requires_auth: true,
      is_admin: true
    }
  },
  {
    path: "/resource-manager",
    name: "ResourceManager",
    component: ResourceManager,
    meta: {
      requires_auth: true,
      is_admin: true
    }
  },
  {
    path: "/user-manager",
    name: "UserManager",
    component: UserManager,
    meta: {
      requires_auth: true,
      is_admin: true
    }
  },
  {
    path: "/admin-manager",
    name: "AdminManager",
    component: AdminManager,
    meta: {
      requires_auth: true,
      is_admin: true
    }
  },
  {
    path: "/supervisor-manager",
    name: "SupervisorManager",
    component: SupervisorManager,
    meta: {
      requires_auth: true,
      is_admin: true
    }
  },
  {
    // Delete this, when details included into Incident flow
    path: "/incident-detail",
    name: "IncidentDetail",
    component: IncidentDetails,
    meta: {
      requires_auth: true,
      is_admin: true
    }
  },
  {
    path: "/error-page",
    name: "Error",
    component: Error,
    meta: {
      guest: true
    }
  },
  {
    path: "/create-incident",
    name: "CreateIncident",
    component: CreateIncident,
    meta: {
      requires_auth: true,
      is_admin: true,
      is_supervisor: true
    }
  },
  {
    path: "/incident-map/:id",
    name: "IncidentMap",
    component: IncidentMap,
    meta: {
      requires_auth: true,
      is_admin: true,
      is_supervisor: true
    },
    props: route => ({
      ...route.params
    })
  },
  {
    path: "/resource_statistics/:id",
    name: "ResourceStatisticsView",
    component: ResourceStatistics,
    meta: {
      requires_auth: true,
      is_admin: true,
      is_supervisor: true
    },
    props: route => ({
      ...route.params
    })
  },
  {
    path: "/incident-metrics/:id",
    name: "IncidentMetricsView",
    component: IncidentMetrics,
    meta: {
      requires_auth: true,
      is_admin: true,
      is_supervisor: true
    },
    props: route => ({
      ...route.params
    })
  }
];

export const domainConfigRoutes = [
  {
    path: "/domain-config",
    name: "DomainConfig",
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

const tokenCheck = (to, next, accessToken) => {
  if (accessToken === null) {
    next({
      name: "Login",
      params: { nextUrl: to.fullPath }
    });
  } else if (!authServices.tokenIsExpired(accessToken)) {
    rolesCheck(to, next);
  } else {
    //TODO: Renovar token, si no se puede mandar a vista de error! En la vista de error, decir que el token es invalido, y brindar boton a login. Vista de error toma título, texto del boton  y nombre de ruta a redireccionar ()
    store.dispatch("uiParams/hideNavBar");
    authServices.removeTokens();
    next({
      name: "Login"
    });
  }
};

const rolesCheck = (to, next) => {
  if (
    to.matched.some(record => record.meta.is_admin) &&
    authServices.isAdmin()
  ) {
    next();
  } else if (
    to.matched.some(record => record.meta.is_supervisor) &&
    authServices.isSupervisor()
  ) {
    next();
  } else if (
    to.matched.some(record => record.meta.is_resource) &&
    authServices.isResource()
  ) {
    next();
  } else {
    next({
      name: "Error"
    });
  }
};

router.beforeEach((to, from, next) => {
  let accessToken = null;
  try {
    accessToken = authServices.getToken();
  } catch (e) {
    console.log(e);
    //TODO: Add error view.
  }

  if (to.matched.some(record => record.meta.requires_auth)) {
    tokenCheck(to, next, accessToken);
  } else if (to.matched.some(record => record.meta.guest)) {
    if (accessToken === null) {
      next();
    } else if (authServices.tokenIsExpired(accessToken)) {
      next();
    } else {
      next({
        name: "IncidentsView"
      });
    }
  } else {
    next();
  }
});

export default router;
