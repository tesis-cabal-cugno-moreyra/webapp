<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" color="black_selected">
              <v-toolbar color="primary" dark flat>
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
                  color="primary"
                  :loading="tryToLogin"
                  v-on:click="loginWithJWT"
                  >Ingresar</v-btn
                >
                <v-btn
                  color="primary"
                  :loading="tryToLogin"
                  v-on:click="confirmDomain = true"
                  >Registrarse</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-row justify="center">
        <v-dialog v-model="confirmDomain" persistent max-width="330">
          <v-card>
            <v-card-title>
              Codigo de acceso al dominio
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="requiredCode"
                label=" Ingrese el codigo *"
                required
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :loading="tryToLogin"
                color="primary"
                text
                v-on:click="SendConfirm(requiredCode)"
              >
                Enviar
              </v-btn>
              <v-btn
                color="primary"
                text
                v-on:click="(confirmDomain = false), (requiredCode = '')"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <SignInSupervisor></SignInSupervisor>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import authServices from "@/services/authServices";
import SignInSupervisor from "../components/SignInSupervisor.vue";

export default {
  name: "Login",
  components: {
    SignInSupervisor
  },
  data: function() {
    return {
      username: "",
      password: "",
      tryToLogin: false,
      loginError: false,
      errorMessage: "",
      confirmDomain: false,
      requiredCode: ""
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
            this.$router.push({ name: "incidentsView" });
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
    },

    async SendConfirm(requiredCode) {
      this.tryToLogin = true;
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");

      if (requiredCode.trim() == "") {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "Ingrese un codigo",
          color: "primary"
        });
        await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        this.tryToLogin = false;
        return;
      }

      await this.$store
        .dispatch("domainConfig/checkDomainAccessCode", {
          domain_code: requiredCode
        })
        .then(async () => {
          this.tryToLogin = false;
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");

          await this.$store.commit("domainConfig/addDomainCode", requiredCode);

          this.$store.commit(
            "uiParams/changeSignInSupervisorState",
            !this.showSignInSupervisor
          );

          this.confirmDomain = false;
          this.requiredCode = "";
        })
        .catch(async () => {
          this.tryToLogin = false;
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Codigo incorrecto",
            color: "primary"
          });
        })
        .finally(
          async () =>
            await this.$store.dispatch("uiParams/turnOffSpinnerOverlay"),
          (this.tryToLogin = false)
        );
    }
  },
  computed: {
    ...mapGetters({
      token: "restAuth/accessToken",
      showSignInSupervisor: "uiParams/showSignInSupervisor"
    })
  }
};
</script>
