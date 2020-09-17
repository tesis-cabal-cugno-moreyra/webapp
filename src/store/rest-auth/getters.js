export default {
  accessToken(state) {
    return state.accessToken;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  isLogged(state) {
    console.log(state.user.username);
    return true;
    // return state.user.username !== null && state.user.username !== "";
  },
  user(state) {
    return state.user;
  }
};
