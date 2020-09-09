export default {
  updateToken(state, newToken) {
    localStorage.setItem("t", newToken);
    state.jwt = newToken;
  },
  removeToken(state) {
    localStorage.removeItem("t");
    state.jwt = null;
  }
};
