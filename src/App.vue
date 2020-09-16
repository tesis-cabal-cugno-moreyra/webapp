<template>
  <v-app id="App">
    <v-container v-if="isTrulyLogged">
      <NavBar></NavBar>
    </v-container>

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
import authServices from "@/services/authServices.js";

export default {
  name: "App",

  components: {
    NavBar
  },

  data: () => ({
    //
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    ...mapGetters({
      isLoading: "uiParams/isLoading",
      isLogged: "restAuth/isLogged"
    }),
    isTrulyLogged() {
      if (!this.isLogged) {
        if (localStorage.getItem("user")) {
          let user = authServices.getUser();
          this.$store.dispatch("restAuth/updateUser", user);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
};
</script>
