<template>
  <v-app id="App">
    <v-container>
      <NavBar></NavBar>
    </v-container>

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
