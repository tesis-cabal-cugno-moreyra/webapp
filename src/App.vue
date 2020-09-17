<template>
  <v-app id="App">
    <v-container v-if="isLogged">
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
    })
    // isTrulyLogged() {
    //   if (!this.isLogged) {
    //     if (localStorage.getItem("user")) {
    //       let user = authServices.getUser();
    //       let isExpired = authServices.tokenIsExpired();
    //
    //       console.log(isExpired);
    //       this.$store.dispatch("restAuth/updateUser", user);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     return true;
    //   }
    //
    //   if (authServices.tokenIsExpired()) {
    //     //TODO: Try to refresh token
    //
    //     return false;
    //   } else {
    //     // Token isn't expired, so we should check if auth store is updated.
    //     if (!this.isLogged && authServices.userStored()) {
    //       this.$store.dispatch("restAuth/updateUser", authServices.getUser());
    //     }
    //   }
    // }
  }
};
</script>
