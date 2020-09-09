export default {
  token(state) {
    return state.jwt;
  },
  isLogged(state) {
    // TODO: check, if JWT is valid return true, else return false.
    if (state.jwt !== false && state.jwt !== "") {
      return true;
    } else {
      return false;
    }
  }
};
