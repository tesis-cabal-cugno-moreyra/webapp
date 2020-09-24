<template>
  <v-app id="App">
    <NavBar v-if="showNavBar"></NavBar>

    <v-overlay v-if="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import authServices from "@/services/authServices";

export default {
  name: "App",

  components: {
    NavBar
  },
  beforeCreate() {
    if (authServices.getUser()) {
      this.$store.dispatch("restAuth/updateUser", authServices.getUser());
      this.$store.dispatch(
        "restAuth/updateAccessToken",
        authServices.getToken()
      );
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    ...mapGetters({
      isLoading: "uiParams/isLoading",
      isLoggedIn: "restAuth/isLoggedIn"
    }),
    showNavBar: function() {
      if (this.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
