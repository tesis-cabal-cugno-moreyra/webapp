<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
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
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    source: "",
    clientId: process.env.GOOGLE_CLIENT_ID,
    user: {
      // email: 'admin@example.com',
      // password: 'admin',
      // name: 'John Doe',
    }
  }),
  methods: {
    login() {
      this.$store.dispatch("googleLogin/apiTrial");
    },
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken);
      // Receive the idToken and make your magic with the backend
      // Send token to localhost:8000/api-auth/google-login/
      // this.$store.dispatch("googleLogin/sendGoogleTokenToBackend", idToken);
      this.$store.dispatch("googleLogin/apiTrial");
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped></style>
