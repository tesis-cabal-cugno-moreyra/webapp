export default {
  accessToken: localStorage.getItem("access-token"),
  refreshToken: localStorage.getItem("refresh-token"),
  user: {
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null
  }
};
