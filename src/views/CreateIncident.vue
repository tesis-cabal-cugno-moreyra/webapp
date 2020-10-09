<template>
  <v-app>
    <v-container fill-height fill-width>
      <v-layout row>
        <v-row align="center" justify="center">
          <v-container text-center>
            <v-form>
              <v-select :items="incidents" label="Incidente"></v-select>

              <v-select
                :items="incidentTypes"
                label="Tipo de Incidente"
              ></v-select>
              <v-text-field
                id="place"
                v-model="place"
                label="Lugar"
                name="place"
                type="text"
              ></v-text-field>
              <v-text-field
                id="incident-id"
                v-model="incident_id"
                label="Referencia"
                name="incident-id"
                type="text"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-row>
        <v-row align="center" justify="center">
          <v-container text-center fluid>
            <v-btn
              x-large
              fab
              color="primary"
              :loading="tryToLogin"
              v-on:click="loginWithJWT"
              style="height: 200px; width: 200px;"
              >¡Crear!</v-btn
            >
            <v-btn color="black_selected" class="ma-5 pa-3" x-large
              >Cancelar</v-btn
            >
          </v-container>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "CreateIncident"
};
</script>

<style scoped></style>
