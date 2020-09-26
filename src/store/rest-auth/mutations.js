export default {
  updateAccessToken(state, newToken) {
    localStorage.setItem("access-token", newToken);
    state.accessToken = newToken;
  },
  updateRefreshToken(state, newToken) {
    localStorage.setItem("refresh-token", newToken);
    state.refreshToken = newToken;
  },
  removeToken(state) {
    localStorage.removeItem("access-token");
    state.accessToken = null;
    localStorage.removeItem("refresh-token");
    state.refreshToken = null;
  },
  updateUser(state, user) {
    state.user.username = user.username;
    state.user.email = user.email;
    state.user.firstName = user.firstName;
    state.user.lastName = user.lastName;
    state.user.roles = user.roles;
    localStorage.setItem("user", JSON.stringify(state.user));
  },
  removeUser(state) {
    localStorage.removeItem("user");
    state.user.username = null;
    state.user.email = null;
    state.user.firstName = null;
    state.user.lastName = null;
    state.user.roles = null;
  }
};
