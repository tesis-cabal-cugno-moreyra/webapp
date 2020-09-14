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
  }
};
