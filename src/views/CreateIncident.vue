<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="2" sm="12" md="12">
            <v-btn rounded color="primary" dark x-large>
              Crear Incidente
            </v-btn>
          </v-col>
          <v-col cols="2" sm="12" md="12">
            <v-btn rounded color="primary" dark x-large>
              Ver Incidentes
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="1" sm="8" md="3">
            <v-btn rounded color="primary" dark x-large>
              Ver Recursos
            </v-btn>
          </v-col>
          <v-col cols="1" sm="8" md="3"> </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "CreateIncident"
};
</script>

<style scoped></style>
