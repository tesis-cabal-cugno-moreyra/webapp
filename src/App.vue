<template>
  <v-app id="App">
    <NavBar v-if="showNavBar" v-on:open-logout-modal="openLogoutModal"></NavBar>

    <v-overlay v-if="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <router-view />
    <AlertSnackbar></AlertSnackbar>
    <LogoutModal
      :dialog="logoutModal"
      v-on:close-modal="closeLogoutModal"
    ></LogoutModal>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import authServices from "@/services/authServices";
import { domainConfigRoutes } from "@/router";
import AlertSnackbar from "@/components/AlertSnackbar.vue";
import LogoutModal from "@/components/LogoutModal";

export default {
  name: "App",
  components: {
    NavBar,
    AlertSnackbar,
    LogoutModal
  },
  data() {
    return {
      logoutModal: false
    };
  },
  methods: {
    closeLogoutModal() {
      this.logoutModal = false;
    },
    openLogoutModal() {
      this.logoutModal = true;
    }
  },
  async beforeCreate() {
    if (authServices.getUser()) {
      await this.$store.dispatch("restAuth/updateUser", authServices.getUser());
      await this.$store.dispatch(
        "restAuth/updateAccessToken",
        authServices.getToken()
      );
    }
    this.$vuetify.theme.dark = true;
    if (Object.keys(this.domainConfig)) {
      await this.$store
        .dispatch("domainConfig/getDomainConfig")
        .catch(async () => {
          this.$router.addRoutes(domainConfigRoutes);
          await this.$router.push({ name: "DomainConfig" });
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
