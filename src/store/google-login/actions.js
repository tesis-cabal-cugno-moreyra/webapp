import Api from "@/services/api";

export default {
  sendGoogleTokenToBackend(context, googleToken) {
    Api.post("/api-auth/google-login/", { token: googleToken });
  },
  apiTrial() {
    Api.get("/hello/").then(response => {
      console.log(response);
    });
  }
};
