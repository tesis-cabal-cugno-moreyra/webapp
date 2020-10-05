<template>
  <v-app id="App">
    <NavBar v-if="showNavBar"></NavBar>

    <v-overlay v-if="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <router-view />
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
  async beforeCreate() {
    if (authServices.getUser()) {
      this.$store.dispatch("restAuth/updateUser", authServices.getUser());
      this.$store.dispatch(
        "restAuth/updateAccessToken",
        authServices.getToken()
      );
    }
    await this.$store
      .dispatch("domainConfig/getDomainConfig")
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("///");
    await this.$store.dispatch("domainConfig/getDomainConfigAlias");
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    ...mapGetters({
      isLoading: "uiParams/isLoading",
      isNavBarEnable: "uiParams/showNavBar",
      isLoggedIn: "restAuth/isLoggedIn"
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
