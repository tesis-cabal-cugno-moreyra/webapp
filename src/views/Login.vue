<template>
  <!--<<<<<<< HEAD-->
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
import api from "../services/api";

export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      password: "",
      tryToLogin: false,
      tryToLoginWithGoogle: false,
      source: "",
      clientId: process.env.GOOGLE_CLIENT_ID,
      user: {
        // email: 'admin@example.com',
        // password: 'admin',
        // name: 'John Doe',
      }
    };
  },
  methods: {
    loginWithJWT: async function() {
      this.tryToLogin = true;
      if (this.user !== "" && this.password !== "") {
        console.log("Start login!");
        // await this.$store.dispatch("restAuth/obtainToken", {
        //   username: this.username,
        //   password: this.password
        // });

        let payload = { username: this.username, password: this.password };
        await api
          .post("/rest-auth/login/", payload)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
        console.log("End login!");
      }
      this.tryToLogin = false;
    },
    loginWithGoogle: function() {
      this.$store.dispatch("googleLogin/apiTrial");
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
  }
};
</script>
<!--=======-->
<!--  <v-container class="fill-height" fluid>-->
<!--    <v-row align="center" justify="center">-->
<!--      <v-col cols="12" sm="8" md="4">-->
<!--        <v-card class="elevation-12">-->
<!--          <v-toolbar color="primary" dark flat>-->
<!--            <v-toolbar-title>Login form</v-toolbar-title>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-tooltip bottom>-->
<!--              <template v-slot:activator="{ on }">-->
<!--                <v-btn :href="source" icon large target="_blank" v-on="on">-->
<!--                  <v-icon>mdi-code-tags</v-icon>-->
<!--                </v-btn>-->
<!--              </template>-->
<!--              <span>Source</span>-->
<!--            </v-tooltip>-->
<!--          </v-toolbar>-->
<!--          <v-card-text>-->
<!--            <v-form>-->
<!--              <v-text-field-->
<!--                label="Login"-->
<!--                name="login"-->
<!--                prepend-icon="mdi-account"-->
<!--                type="text"-->
<!--              ></v-text-field>-->
<!--              <v-text-field-->
<!--                id="password"-->
<!--                label="Password"-->
<!--                name="password"-->
<!--                prepend-icon="mdi-lock"-->
<!--                type="password"-->
<!--              ></v-text-field>-->
<!--            </v-form>-->
<!--          </v-card-text>-->
<!--          <v-card-actions>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-btn color="primary" @click="login">Login</v-btn>-->
<!--            <v-btn-->
<!--              v-google-signin-button="clientId"-->
<!--              class="google-signin-button"-->
<!--              color="error"-->
<!--              >Google</v-btn-->
<!--            >-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "Login",-->
<!--  data: () => ({-->
<!--    source: "",-->
<!--    clientId: process.env.GOOGLE_CLIENT_ID,-->
<!--    user: {-->
<!--      // email: 'admin@example.com',-->
<!--      // password: 'admin',-->
<!--      // name: 'John Doe',-->
<!--    }-->
<!--  }),-->
<!--  methods: {-->
<!--    login() {-->
<!--      this.$store.dispatch("googleLogin/apiTrial");-->
<!--    },-->
<!--    OnGoogleAuthSuccess(idToken) {-->
<!--      console.log(idToken);-->
<!--      // Receive the idToken and make your magic with the backend-->
<!--      // Send token to localhost:8000/api-auth/google-login/-->
<!--      // this.$store.dispatch("googleLogin/sendGoogleTokenToBackend", idToken);-->
<!--      this.$store.dispatch("googleLogin/apiTrial");-->
<!--    },-->
<!--    OnGoogleAuthFail(error) {-->
<!--      console.log(error);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped></style>-->
<!--&gt;>>>>>> 70586fe10a56157e54e7dd79f2b48b9ca56a8cc1-->
