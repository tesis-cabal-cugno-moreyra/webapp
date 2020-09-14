<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" color="black_selected">
              <v-toolbar color="red_selected" dark flat>
                <v-toolbar-title>Iniciar sesión</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="user"
                    v-model="username"
                    label="Usuario"
                    name="user"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red_selected"
                  :loading="tryToLogin"
                  v-on:click="loginWithJWT"
                  >Ingresar</v-btn
                >
                <v-btn
                  v-google-signin-button="clientId"
                  class="google-signin-button"
                  color="error"
                  :loading="tryToLoginWithGoogle"
                  >Google</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      password: "",
      tryToLogin: false,
      tryToLoginWithGoogle: false,
      source: "",
      clientId: ""
    };
  },
  methods: {
    loginWithJWT: async function() {
      this.tryToLogin = true;
      if (this.user !== "" && this.password !== "") {
        let payload = { username: this.username, password: this.password };
        await this.$store
          .dispatch("restAuth/login", payload)
          .then(response => {
            let accessToken = response.data.access_token;
            let refreshToken = response.data.refresh_token;
            let user = {
              username: response.data.user.username,
              email: response.data.user.email,
              firstName: response.data.user.first_name,
              lastName: response.data.user.last_name,
              role: "admin"
            };

            this.$store.dispatch("restAuth/updateAccessToken", accessToken);
            this.$store.dispatch("restAuth/updateRefreshToken", refreshToken);
            this.$store.dispatch("restAuth/updateUser", user);

            router.push({ name: "Home" });
          })
          .catch(e => {
            if (e.status === 400 && e.statusText === "Bad Request") {
              console.log(
                "Upa, credenciales rancias mi rey. La pifiaste en el usuario o en la contraseña, ¡probá de nuevo master!"
              );
            } else {
              console.log(e);
            }
          });
      }
      this.tryToLogin = false;
    },
    loginWithGoogle: function() {
      this.tryToLoginWithGoogle = true;
      this.$store.dispatch("googleLogin/apiTrial");
      this.tryToLoginWithGoogle = false;
    },
    OnGoogleAuthSuccess: function(idToken) {
      console.log(idToken);
      // Receive the idToken and make your magic with the backend
      // Send token to localhost:8000/api-auth/google-login/
      // this.$store.dispatch("googleLogin/sendGoogleTokenToBackend", idToken);
      this.$store.dispatch("googleLogin/apiTrial");
    },
    OnGoogleAuthFail: function(error) {
      console.log(error);
    }
  },
  computed: {
    ...mapGetters({
      token: "restAuth/token"
    })
  },
  created() {
    this.clientId = process.env.GOOGLE_CLIENT_ID;
  }
};
</script>
