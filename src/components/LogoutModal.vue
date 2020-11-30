<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="300" persistent>
      <v-card>
        <v-card-title class="headline primary">
          Cierre de sesión
          <v-divider></v-divider>
        </v-card-title>
        <v-card-text fill-height>
          La sesión se cerrará. ¿Desea continuar?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="$emit('close-modal')">
            Cancelar
          </v-btn>
          <v-btn color="green" text @click="logout">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div></template
>
<script>
import router from "@/router";

export default {
  name: "LogoutModal",
  props: ["dialog"],
  methods: {
    logout() {
      this.$store.dispatch("restAuth/logout");
      this.$emit("close-modal");
      router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped></style>
