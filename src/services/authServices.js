import { ROLES } from "@/constants/roles.js";

export default {
  parseJwt() {
    const token = this.getToken();
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  },
  tokenIsExpired() {
    const token = this.getToken();
    if (!this.parseJwt(token).exp) {
      this.removeTokens();
      return console.error("exp is not defined on token!");
    }
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
  removeTokens() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  },
  getRoles() {
    let roles = [];
    const parsedJWT = this.parseJwt();
    if (parsedJWT.roles) {
      parsedJWT.roles.forEach(function(role) {
        let unwrappedRole = Object.keys(role);
        switch (unwrappedRole[0]) {
          case ROLES.ADMIN.toString():
            roles.push(ROLES.ADMIN.toString());
            break;
          case ROLES.SUPERVISOR.toString():
            roles.push(ROLES.SUPERVISOR.toString());
            break;
          case ROLES.RESOURCE.toString():
            roles.push(ROLES.RESOURCE.toString());
            break;
        }
      });
    }
    return roles;
  },
  isAdmin() {
    let isAdmin = false;
    const roles = this.getRoles();
    roles.forEach(function(role) {
      if (role.toString() === ROLES.ADMIN.toString()) {
        isAdmin = true;
      }
    });
    return isAdmin;
  },
  isSupervisor() {
    let isSupervisor = false;
    const roles = this.getRoles();
    roles.forEach(function(role) {
      if (role === ROLES.SUPERVISOR.toString()) {
        isSupervisor = true;
      }
    });
    return isSupervisor;
  },
  isResource() {
    let isResource = false;
    const roles = this.getRoles();
    roles.forEach(function(role) {
      if (role === ROLES.RESOURCE.toString()) {
        isResource = true;
      }
    });
    return isResource;
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
