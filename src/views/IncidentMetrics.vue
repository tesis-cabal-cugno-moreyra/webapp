<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title>sadasdasd</v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "IncidentMetrics",
  data() {
    return {
      incidentMetrics: {
        incidentAbstraction: "",
        incidentType: "",
        external_assistance: "",
        place: "Somewhere", // Acá devolvé lo que puedas, tengo que ver como pasarle las coordenadas al mapa.
        reference: "",

        startDatetime: "", // Estos campos, si podés mandamelos como texto ya que no voy a hacer ningún calculo.
        endDatetime: "",
        workTime: "2h 16m",
        resourcesList: [
          // Esta lista la vamos a usar para armar la tabla de recursos vinculados al incidente.
          {}
        ],
        averageWorkTime: "1h 50m" // Este dato, lo vamos a usar para armar un grafico de barra comparando con el "workTime".
      }
    };
  }
};
</script>

<style scoped></style>
