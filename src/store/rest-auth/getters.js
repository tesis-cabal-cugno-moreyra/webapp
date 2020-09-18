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
    return state.user.role === ROLES.ADMIN;
  },
  isSupervisor(state) {
    return state.user.role === ROLES.SUPERVISOR;
  },
  isResource(state) {
    return state.user.role === ROLES.RESOURCE;
  }
};
