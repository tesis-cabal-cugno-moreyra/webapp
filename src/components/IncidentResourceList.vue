<template>
  <v-div>
    <v-btn @click="isComponentEnable = true">
      Mostrar recursos para incidentes</v-btn
    >
    <v-card color="black_selected">
      <v-dialog v-model="isComponentEnable" width="600" persistent>
        <v-card-title :class="['mt-2']">
          Recursos para relacionar
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
            single-line
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :search="search"
            :items="desserts"
            :single-select="singleSelect"
            item-key="name"
            show-select
            class="elevation-1"
          >
          </v-data-table>

          <v-container>
            <v-btn
              :class="['mb-2', 'pa-1', 'mr-1', 'primary', 'float-right']"
              @click="isComponentEnable = false"
              >Cerrar</v-btn
            >
            <v-btn
              :class="['mb-2', 'pa-1', 'mr-4', 'primary', 'float-right']"
              @click="proccessInfo()"
              >Continuar</v-btn
            >
          </v-container>
        </v-card-text>
      </v-dialog>
    </v-card>
  </v-div>
</template>

<script>
export default {
  name: "incidentResourceList",
  data() {
    return {
      isComponentEnable: false,
      singleSelect: false,
      search: "",
      selected: [],
      headers: [
        {
          text: "Nombre del recurso",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Tipos de Recursos", sortable: false, value: "type" }
      ],
      desserts: [
        { name: "Santiago ", type: "R1" },
        { name: "More", type: "R2" },
        { name: "Emi", type: "R3" },
        { name: "Joa", type: "R4" },
        { name: "Bone", type: "R5" },
        { name: "Matias", type: "R6" },
        { name: "Santiago 2 ", type: "R1" },
        { name: "More 2", type: "R2" },
        { name: "Emi 2", type: "R3" },
        { name: "Joa 2", type: "R4" },
        { name: "Bone 2", type: "R5" },
        { name: "Matias 2", type: "R6" },
        { name: "Santiago  3", type: "R1" },
        { name: "More 3", type: "R2" },
        { name: "Emi 3", type: "R3" },
        { name: "Joa 3", type: "R4" },
        { name: "Bone 3", type: "R5" },
        { name: "Matias 3", type: "R6" },
        { name: "Santiago  5", type: "R1" },
        { name: "More 5", type: "R2" },
        { name: "Emi 5", type: "R3" },
        { name: "Joa 5", type: "R4" },
        { name: "Bone 5", type: "R5" },
        { name: "Matias 5", type: "R6" }
      ]
    };
  },
  methods: {
    proccessInfo() {
      this.isComponentEnable = false;
      console.log(this.selected);
    }
  }
};
</script>

<style></style>
