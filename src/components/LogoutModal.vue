<template>
  <v-dialog persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Cierre de sesión
      </v-card-title>
      <v-card-text>La sesión se cerrará. ¿Desea continuar?</v-card-text>
      <v-card-text>La sesión se cerrará. ¿Desea continuar?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close-modal')">
          Calcelar
        </v-btn>
        <v-btn color="green darken-1" text @click="logout">
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import router from "@/router";

export default {
  name: "LogoutModal",
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("restAuth/logout");
      router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped></style>
