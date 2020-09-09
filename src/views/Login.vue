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
                  v-on:click="login"
                  >Ingresar</v-btn
                >
                <v-btn color="grey_selected" :loading="tryToLoginWithGoogle"
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
      tryToLoginWithGoogle: false
    };
  },
  methods: {
    login: async function() {
      this.tryToLogin = true;
      if (this.user !== "" && this.password !== "") {
        console.log("Start login!");
        // await this.$store.dispatch("restAuth/obtainToken", {
        //   username: this.username,
        //   password: this.password
        // });

        let payload = { username: this.username, password: this.password };
        await api
          .post(
            "https://tesis-cabal-cugno-moreyra-back.herokuapp.com/rest-auth/login/",
            payload
          )
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
    loginWithGoogle: async function() {
      this.tryToLoginWithGoogle = true;
      let context = this;
      setTimeout(function() {
        context.loginWithGoogle = false;
      }, 5000);
    }
  },
  computed: {
    ...mapGetters({
      token: "restAuth/token"
    })
  }
};
</script>
