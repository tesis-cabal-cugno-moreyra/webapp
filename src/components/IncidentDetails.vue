<template>
  <v-main>
    <v-form v-model="valid" ref="incidentDetailsForm">
      <v-card>
        <v-dialog v-model="isComponentEnabled" width="600" persistent dark>
          <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
            Detalles del Incidente
          </v-card-title>
          <v-card-text :class="[' black_selected', 'pa-3']">
            <v-jsf v-model="formData" :schema="schema" />
          </v-card-text>

          <v-card-actions :class="['pa-2', 'pb-1', ' black_selected']">
            <v-spacer></v-spacer>
            <v-btn
              :class="['mb-2', 'mr-1', 'primary', 'float-right']"
              @click="send"
            >
              Continuar
            </v-btn>
            <v-btn
              :class="['pa-0', 'mb-2', 'mr-4', 'primary', 'float-right']"
              @click="isComponentEnabled = false"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-dialog>
      </v-card>
    </v-form>
  </v-main>
</template>

<script>
import VJsf from "@koumoul/vjsf/lib/VJsf.js";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
import api from "@/services/api";

export default {
  name: "IncidentDetails",
  components: { VJsf },
  props: {
    incidentAbstraction: {
      type: String,
      default: "string"
    },
    incidentType: {
      type: String,
      default: "string"
    }
  },
  data: () => ({
    isComponentEnabled: true,
    valid: true,
    formData: {},
    schema: {}
  }),
  async mounted() {
    const payload = {
      incidentAbstraction: this.incidentAbstraction,
      incidentType: this.incidentType
    };
    const incidentTypeData = await this.$store.dispatch(
      "domainConfig/getIncidentTypeFromLocalDomainConfig",
      payload
    );
    if (!incidentTypeData.detailsSchema) {
      this.$store.commit("uiParams/dispatchAlert", {
        text:
          "Error al cargar la estructura de datos relacionada al formulario",
        color: "primary",
        timeout: 5000
      });
    }
    this.schema = incidentTypeData.detailsSchema;
  },
  methods: {
    async send() {
      let formIsValid = this.$refs.incidentDetailsForm.validate();
      if (!formIsValid) {
        this.$store.commit("uiParams/dispatchAlert", {
          text:
            "Validación de detalles falló, corrija los datos ingresados e intente nuevamente",
          color: "primary",
          timeout: 5000
        });
        return;
      }
      const payload = {
        incident_id: "", // Replace once workflow is defined. Maybe, this could be a prop?
        details: this.formData
      };
      await api
        .post("api/v1/incidents/details/", payload) // Replace once emi has finished his issue
        .then(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Detalles del incidente cargados correctamente.",
            color: "success",
            timeout: 5000
          });
        })
        .catch(async response => {
          if (response.data.incident_id) {
            this.$store.commit("uiParams/dispatchAlert", {
              text: "Incidente relacionado no existe!",
              color: "primary",
              timeout: 5000
            });
          }
          if (response.data.details) {
            this.$store.commit("uiParams/dispatchAlert", {
              text:
                "Validación de detalles falló, corrija los datos ingresados e intente nuevamente",
              color: "primary",
              timeout: 5000
            });
          }
        })
        .finally(async () => {
          this.loadingProcessInfo = false;
        });
    }
  }
};
</script>

<style scoped></style>
