<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app clipped temporary>
      <v-layout mt-4 column align-center>
        <v-flex>
          <v-avatar>
            <v-img src="@/assets/avatar.png"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="gray--text mt-3 headline">
            {{ this.user.lastName }} {{ this.user.firstName }}
          </p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>

      <v-list-item link v-on:click="goIncidentsView">
        <v-list-item-icon>
          <v-icon color="grey darken-1">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="grey--text text--darken-1"
          >Página principal</v-list-item-title
        >
      </v-list-item>

      <v-list-item link v-on:click="goDomainAccessCode">
        <v-list-item-icon>
          <v-icon color="grey darken-1">mdi-settings</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="grey--text text--darken-1"
          >Código de Acceso</v-list-item-title
        >
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="grey darken-1">mdi-settings</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="grey--text text--darken-1"
          >Configuración</v-list-item-title
        >
      </v-list-item>

      <v-list-group no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Administrar cuentas</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item link v-on:click="goSupervisorManager">
          <v-list-item-icon>
            <v-icon color="grey darken-1">mdi-account-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--darken-1"
            >Supervisores</v-list-item-title
          >
        </v-list-item>

        <v-list-item link v-on:click="goResourceManager">
          <v-list-item-icon>
            <v-icon color="grey darken-1">mdi-account-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--darken-1"
            >Recursos</v-list-item-title
          >
        </v-list-item>

        <v-list-item link v-on:click="goAdminManager">
          <v-list-item-icon>
            <v-icon color="grey darken-1">mdi-account-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--darken-1"
            >Administradores</v-list-item-title
          >
        </v-list-item>
      </v-list-group>
      <v-list-item link v-on:click="goUserManager">
        <v-list-item-icon>
          <v-icon color="grey darken-1">mdi-account-card-details</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="grey--text text--darken-1"
          >Usuarios</v-list-item-title
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
      <v-list-item link v-on:click="openLogoutModal">
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
    </v-app-bar>
  </v-container>
</template>

<script>
import authServices from "@/services/authServices";
import LogoutModal from "@/components/LogoutModal";

export default {
  name: "ourNavBar",
  components: LogoutModal,
  data() {
    return {
      drawer: false,
      user: null,
      logoutModal: false
    };
  },

  created() {
    this.user = authServices.getUser();
  },
  methods: {
    openLogoutModal: function() {
      this.$emit("open-logout-modal");
    },
    goIncidentsView() {
      this.$router.push({ name: "IncidentsView" });
    },
    goDomainAccessCode() {
      this.$router.push({ name: "DomainAccessCode" });
    },
    goSupervisorManager() {
      this.$router.push({ name: "SupervisorManager" });
    },
    goUserManager() {
      this.$router.push({ name: "UserManager" });
    },
    goResourceManager() {
      this.$router.push({ name: "ResourceManager" });
    },
    goAdminManager() {
      this.$router.push({ name: "AdminManager" });
    }
  }
};
</script>
