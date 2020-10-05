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
                    :error="loginError"
                    v-on:keyup="resetErrors"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :error="loginError"
                    v-on:keyup="resetErrors"
                  ></v-text-field>

                  <v-alert v-if="loginError" color="error" icon="mdi-alert">
                    {{ this.errorMessage }}</v-alert
                  >
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
import authServices from "@/services/authServices";

export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      password: "",
      tryToLogin: false,
      loginError: false,
      errorMessage: ""
    };
  },
  methods: {
    loginWithJWT: async function() {
      this.tryToLogin = true;
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.loginError === false
      ) {
        let payload = { username: this.username, password: this.password };
        await this.$store
          .dispatch("restAuth/login", payload)
          .then(response => {
            let accessToken = response.data.access_token;
            let refreshToken = response.data.refresh_token;

            this.$store.dispatch("restAuth/updateAccessToken", accessToken);
            this.$store.dispatch("restAuth/updateRefreshToken", refreshToken);

            let roles = authServices.getRoles();
            let user = {
              username: response.data.user.username,
              email: response.data.user.email,
              firstName: response.data.user.first_name,
              lastName: response.data.user.last_name,
              roles: roles
            };
            this.$store.dispatch("restAuth/updateUser", user);
            this.$router.push({ name: "Home" });
          })
          .catch(e => {
            if (e.status === 400 && e.statusText === "Bad Request") {
              this.loginError = true;
              this.errorMessage = "¡Ups! Usuario o contraseña erróneo.";
            } else {
              console.log(e);
              this.loginError = true;
              this.errorMessage = "Algo salió mal. Prueba de nuevo.";
            }
          });
      }
      this.tryToLogin = false;
    },
    resetErrors: function() {
      this.loginError = false;
    }
  },
  computed: {
    ...mapGetters({
      token: "restAuth/accessToken"
    })
  }
};
</script>
