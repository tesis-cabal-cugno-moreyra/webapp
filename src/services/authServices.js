import Vue from "vue";

Vue.mixin({
  beforeCreate() {
    const options = this.$options;

    if (options.authService) {
      this.$authService = options.authService;
    } else if (options.parent && options.parent.$authService) {
      this.$authService = options.parent.$authService;
    }
  }
});

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
    let token = null;
    const authData = localStorage.getItem("auth-data");

    if (authData !== null) {
      token = JSON.parse(authData).token;
    }
    return token;
  },
  getFullUserData() {
    let fullData = null;
    const authData = localStorage.getItem("auth-data");

    if (authData !== null) {
      fullData = JSON.parse(authData).data;
    }
    return fullData;
  },
  getRoles() {
    const roles = [];
    const authData = localStorage.getItem("auth-data");

    if (authData !== null) {
      if ("admin" in JSON.parse(authData).data) {
        roles.push("admin");
      }
      if ("teacher" in JSON.parse(authData).data) {
        roles.push("teacher");
      }
      if ("student" in JSON.parse(authData).data) {
        roles.push("student");
      }
    }
    return roles;
  },
  getUsername() {
    let username = null;
    const authData = localStorage.getItem("auth-data");

    if (authData !== null) {
      username = JSON.parse(authData).data.person.user.username;
    }
    return username;
  },
  getUser() {
    let user = {
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null
    };
    const userData = localStorage.getItem("user");
    console.log(userData.user);

    if (userData !== null) {
      user = JSON.parse(userData);
      console.log(user);
    }
    return user;

    // user.username = JSON.parse(userData).username;
    // user.email = JSON.parse(userData).data.email;
    // user.firstName = JSON.parse(userData).data.firstName;
    // user.lastName = JSON.parse(userData).data.lastName;
  }
};
