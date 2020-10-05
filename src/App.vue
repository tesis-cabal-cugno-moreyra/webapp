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
import domainConfigServices from "@/services/domainConfigServices";

export default {
  name: "App",
  data: function() {
    return {
      aliases: null
    };
  },
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
  async created() {
    this.$vuetify.theme.dark = true;
    if (this.aliases === null) {
      await this.$store
        .dispatch("domainConfig/getDomainConfig")
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      let aliases = domainConfigServices.getDomainConfigAlias(
        this.domainConfig
      );
      console.log(aliases);
      this.aliases = aliases;
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
