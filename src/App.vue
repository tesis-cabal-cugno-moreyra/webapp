<template>
  <v-app id="App">
    <v-container>
      <NavBar></NavBar>
    </v-container>

    <div v-if="$store.getters.isLoading">
      <v-overlay>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
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
  }
};
</script>
