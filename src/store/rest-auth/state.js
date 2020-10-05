export default {
  accessToken: localStorage.getItem("access-token"),
  refreshToken: localStorage.getItem("refresh-token"),
  user: {
    username: localStorage.getItem("user.username"),
    email: localStorage.getItem("user.email"),
    firstName: localStorage.getItem("user.firstName"),
    lastName: localStorage.getItem("user.lastName"),
    roles: localStorage.getItem("user.roles")
  }
};
