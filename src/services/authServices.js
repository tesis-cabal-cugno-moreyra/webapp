export default {
  parseJwt() {
    const token = this.getToken();
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  },
  tokenIsExpired() {
    const token = this.getToken();
    return Date.now() / 1000 >= this.parseJwt(token).exp;
  },
  tokenTimeToExpiration() {
    const token = this.getToken();
    // eslint-disable-next-line no-mixed-operators
    return this.parseJwt(token).exp - Date.now() / 1000;
  },
  getPayload(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  },
  getToken() {
    return localStorage.getItem("access-token");
  },
  // getFullUserData() {
  //   let fullData = null;
  //   const authData = localStorage.getItem("auth-data");
  //
  //   if (authData !== null) {
  //     fullData = JSON.parse(authData).data;
  //   }
  //   return fullData;
  // },
  // getRoles() {
  //   const roles = [];
  //   const authData = localStorage.getItem("auth-data");
  //
  //   if (authData !== null) {
  //     if ("admin" in JSON.parse(authData).data) {
  //       roles.push("admin");
  //     }
  //     if ("teacher" in JSON.parse(authData).data) {
  //       roles.push("teacher");
  //     }
  //     if ("student" in JSON.parse(authData).data) {
  //       roles.push("student");
  //     }
  //   }
  //   return roles;
  // },
  getUser() {
    let user = {
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null
    };
    const userData = localStorage.getItem("user");

    if (userData !== null) {
      user = JSON.parse(userData);
    } else {
      user = null;
    }
    return user;
  },
  userStored() {
    return localStorage.getItem("user") ? true : false;
  }
};
