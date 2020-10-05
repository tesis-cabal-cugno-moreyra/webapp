import { ROLES } from "@/constants/roles.js";

export default {
  accessToken(state) {
    return state.accessToken;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  isLoggedIn(state) {
    return state.user.username !== null;
  },
  user(state) {
    return state.user;
  },
  isAdmin(state) {
    if (state.user.roles !== null) {
      state.user.roles.forEach(function(role) {
        if (role === ROLES.ADMIN.toString()) {
          return true;
        }
      });
    }
    return false;
  },
  isSupervisor(state) {
    if (state.user.roles !== null) {
      state.user.roles.forEach(function(role) {
        if (role === ROLES.SUPERVISOR.toString()) {
          return true;
        }
      });
    }
    return false;
  },
  isResource(state) {
    if (state.user.roles !== null) {
      state.user.roles.forEach(function(role) {
        if (role === ROLES.RESOURCE.toString()) {
          return true;
        }
      });
    }
    return false;
  }
};
