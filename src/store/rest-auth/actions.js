import api from "@/services/api";

export default {
  // obtainToken(context, { username, password }) {
  //   const payload = {
  //     username: username,
  //     password: password
  //   };
  //   axios
  //     .post(this.state.endpoints.obtainJWT, payload)
  //     .then(response => {
  //       this.commit("updateToken", response.data.token);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.commit("removeToken");
  //     });
  // },
  // refreshToken() {
  //   const payload = {
  //     token: this.state.jwt
  //   };
  //   axios
  //     .post(this.state.endpoints.refreshJWT, payload)
  //     .then(response => {
  //       this.commit("updateToken", response.data.token);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.commit("removeToken");
  //     });
  // },
  login(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.post("/rest-auth/login/", payload));
      } catch (e) {
        return reject(e);
      }
    });
  },
  updateAccessToken(context, token) {
    this.commit("updateAccessToken", token);
  },
  updateRefreshToken(context, token) {
    this.commit("updateRefreshToken", token);
  }
  //   await api
  //     .post("/rest-auth/login/", payload)
  //     .then(response => {
  //       console.log(response);
  //       this.commit("updateAccessToken", response.data.access_token);
  //       this.commit("updateRefreshToken", response.data.refresh_token);
  //     })
  //     .catch(e => {
  //       if (e.status === 400 && e.statusText === "Bad Request") {
  //         console.log(
  //           "Upa, credenciales rancias mi rey. La pifiaste en el usuario o en la contraseña, ¡probá de nuevo master!"
  //         );
  //       } else {
  //         console.log(e);
  //       }
  //     });
  // }
};
