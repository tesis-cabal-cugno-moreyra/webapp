export default {
  token(state) {
    return state.accessToken;
  },
  isLogged(state) {
    return state.user.username !== null;
  },
  user(state) {
    return state.user;
  }
};
