<template>
  <v-form>
    <v-btn @click="isComponentEnable = true">
      Mostrar recursos para incidentes</v-btn
    >

    <v-card>
      <v-dialog v-model="isComponentEnable" width="600" persistent dark>
        <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
          Recursos para relacionar
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Enter para buscar"
            hide-details
            single-line
            v-on:keyup.enter="serchResource()"
          ></v-text-field>
        </v-card-title>

        <v-card-text :class="[' black_selected', 'pa-3']">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :search="search"
            :items="resourceData"
            :single-select="singleSelect"
            item-key="name"
            show-select
            :class="['pb-1']"
          >
          </v-data-table>
        </v-card-text>

        <v-card-actions :class="['pa-2', 'mt-0', 'pb-1', ' black_selected']">
          <v-spacer></v-spacer>
          <v-btn
            :class="['mb-2', 'mr-1', 'primary', 'float-right']"
            @click="proccessInfo()"
            >Continuar</v-btn
          >
          <v-btn
            :class="['pa-0', 'mb-2', 'mr-4', 'primary', 'float-right']"
            @click="isComponentEnable = false"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-dialog>
    </v-card>
  </v-form>
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
      resourceData: [
        { id: "1", name: "Santiago ", type: "R1" },
        { id: "2", name: "More", type: "R2" },
        { id: "3", name: "Emi", type: "R3" },
        { id: "4", name: "Joa", type: "R4" },
        { id: "5", name: "Bone", type: "R5" },
        { id: "6", name: "Matias", type: "R6" },
        { id: "7", name: "Santiago 2 ", type: "R1" },
        { id: "8", name: "More 2", type: "R2" },
        { id: "9", name: "Emi 2", type: "R3" },
        { id: "10", name: "Joa 2", type: "R4" },
        { id: "11", name: "Bone 2", type: "R5" },
        { id: "12", name: "Matias 2", type: "R6" },
        { id: "13", name: "Santiago  3", type: "R1" },
        { id: "14", name: "More 3", type: "R2" },
        { id: "15", name: "Emi 3", type: "R3" },
        { id: "16", name: "Joa 3", type: "R4" },
        { id: "17", name: "Bone 3", type: "R5" },
        { id: "18", name: "Matias 3", type: "R6" },
        { id: "19", name: "Santiago  5", type: "R1" },
        { id: "20", name: "More 5", type: "R2" },
        { id: "21", name: "Emi 5", type: "R3" },
        { id: "22", name: "Joa 5", type: "R4" },
        { id: "23", name: "Bone 5", type: "R5" },
        { id: "24", name: "Matias 5", type: "R6" }
      ]
    };
  },
  methods: {
    async proccessInfo() {
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      let errorPost = "";

      this.selected.forEach(async (element, index) => {
        const urlPost =
          "/api/v1/incidents/" +
          element.id +
          "/resources/" +
          element.type +
          "/";
        await this.$store
          .dispatch("domainConfig/postResourceIncident", urlPost)
          .then(async () => {
            await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
            console.log("tabien");
          })
          .catch(async () => {
            //comparo el indice de el array con la cantidad de elementos para cambiar el mensaje
            if (index == this.selected.length - 1) {
              errorPost = errorPost + element.name + " ";
            } else {
              errorPost = errorPost + element.name + ", ";
            }
          })
          .finally(
            async () =>
              await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
          );
        if (errorPost.length > 2) {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se pudieron cargar los recursos: " + errorPost,
            color: "primary",
            timeout: 5000
          });
        } else {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "se cargaron corecamente todos los recursos",
            color: "success",
            timeout: 2000
          });
        }
      });
    },
    async serchResource() {
      await this.$store
        .dispatch("domainConfig/getResource", this.search)
        .then(response => {
          console.log(response);
          console.log("bien");
        })
        .catch(async resp => {
          console.log(resp);
        })
        .finally(
          async () =>
            await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
        );
    }
  }
};
</script>
