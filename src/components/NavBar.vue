<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app clipped temporary>
      <v-layout mt-4 column align-center>
        <v-flex>
          <v-avatar>
            <v-img
              src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
            ></v-img>
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="gray--text mt-3 headline">{{ this.user.username }}</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="grey darken-1">mdi-settings</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="grey--text text--darken-1"
          >Configuración</v-list-item-title
        >
      </v-list-item>

      <v-switch
        class="ml-4"
        v-model="$vuetify.theme.dark"
        inset
        :label="
          `${
            $vuetify.theme.dark
              ? 'Cambiar a tema claro'
              : 'Cambiar a tema oscuro'
          }`
        "
      ></v-switch>
      <v-divider></v-divider>
      <v-list-item link v-on:click="logout">
        <v-list-item-icon>
          <v-icon color="grey darken-1">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="grey--text text--darken-1"
          >Cerrar sesión</v-list-item-title
        >
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Sicoin</v-toolbar-title>
      <v-spacer></v-spacer>

      <!--  <v-btn class="success" @click="accountDialog = 'true'">Ingresar</v-btn>-->
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "NavBar",
  data: function() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters({
      user: "restAuth/user"
    })
  },
  methods: {
    logout: function() {
      this.$store.dispatch("restAuth/logout");
      router.push({ name: "Login" });
    }
  }
};
</script>
