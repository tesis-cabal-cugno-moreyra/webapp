export default {
  token(state) {
    return state.accessToken;
  },
  isLogged(state) {
    // TODO: check, if JWT is valid return true, else return false.
    if (state.accessToken !== null || state.accessToken !== "") {
      return false;
    } else {
      return true;
    }
  }
};
