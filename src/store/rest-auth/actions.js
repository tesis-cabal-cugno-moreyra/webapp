import api from "@/services/api";

export default {
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
  logout() {
    this.commit("restAuth/removeToken");
    this.commit("restAuth/removeUser");
  },
  updateAccessToken(context, token) {
    this.commit("restAuth/updateAccessToken", token);
  },
  updateRefreshToken(context, token) {
    this.commit("restAuth/updateRefreshToken", token);
  },
  updateUser(context, user) {
    this.commit("restAuth/updateUser", user);
  }
};
