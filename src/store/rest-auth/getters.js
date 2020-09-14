export default {
  token(state) {
    return state.accessToken;
  },
  isLogged(state) {
    // TODO: check, if JWT is valid return true, else return false.
    if (state.user.username === null) {
      return false;
    } else {
      return true;
    }
  }
};
