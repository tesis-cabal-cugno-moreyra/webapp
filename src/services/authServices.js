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
  getRoles() {
    let roles = [];
    const parsedJWT = this.parseJwt();
    console.log(this.parseJwt());
    console.log(parsedJWT.roles);
    if (parsedJWT.roles !== null && parsedJWT.roles !== []) {
      parsedJWT.roles.forEach(function(role) {
        // console.log(role);
        let unwrappedRole = Object.keys(role);
        console.log(unwrappedRole[0]);
        console.log(ROLES.ADMIN.toString());
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
        // console.log(Object.keys(context.roles));
      });
    }
    console.log(roles);
    return roles;
  },
  isAdmin() {
    const roles = this.getRoles();
    roles.forEach(function(role) {
      if (role === ROLES.ADMIN.toString()) {
        return true;
      }
    });
    return false;
  },
  isSupervisor() {
    const roles = this.getRoles();
    roles.forEach(function(role) {
      if (role === ROLES.SUPERVISOR.toString()) {
        return true;
      }
    });
    return false;
  },
  isResource() {
    const roles = this.getRoles();
    roles.forEach(function(role) {
      if (role === ROLES.RESOURCE.toString()) {
        return true;
      }
    });
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
