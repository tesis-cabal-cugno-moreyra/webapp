<template>
  <v-app id="App">
    <NavBar v-if="showNavBar"></NavBar>

    <v-overlay v-if="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <router-view />
    <AlertSnackbar></AlertSnackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import authServices from "@/services/authServices";
import AlertSnackbar from "@/components/AlertSnackbar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    AlertSnackbar
  },
  beforeCreate() {
    if (authServices.getUser()) {
      this.$store.dispatch("restAuth/updateUser", authServices.getUser());
      this.$store.dispatch(
        "restAuth/updateAccessToken",
        authServices.getToken()
      );
    }
    this.$store.dispatch("domainConfig/getDomainConfig");
  },
  async mounted() {
    this.$vuetify.theme.dark = true;
    console.log(this.domainConfig);
    if (this.domainConfig === null) {
      await this.$store.dispatch("domainConfig/getDomainConfig").catch(e => {
        console.log(e);
      });
    }
  },

  computed: {
    ...mapGetters({
      isLoading: "uiParams/isLoading",
      isNavBarEnable: "uiParams/showNavBar",
      isLoggedIn: "restAuth/isLoggedIn",
      domainConfig: "domainConfig/domainConfig"
    }),
    showNavBar: function() {
      if (this.isLoggedIn && this.isNavBarEnable) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
