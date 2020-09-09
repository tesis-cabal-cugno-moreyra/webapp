import axios from "axios";

export default {
  obtainToken(context, { username, password }) {
    const payload = {
      username: username,
      password: password
    };
    axios
      .post(this.state.endpoints.obtainJWT, payload)
      .then(response => {
        this.commit("updateToken", response.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  },
  refreshToken() {
    const payload = {
      token: this.state.jwt
    };
    axios
      .post(this.state.endpoints.refreshJWT, payload)
      .then(response => {
        this.commit("updateToken", response.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
