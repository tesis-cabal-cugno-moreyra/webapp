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
  }
};
</script>
