<template>
  <v-app id="App">
    <v-container>
      <NavBar></NavBar>
    </v-container>

    <v-overlay v-if="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "../src/components/NavBar.vue";

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
      isLoading: "uiParams/isLoading"
    })
  }
};
</script>
