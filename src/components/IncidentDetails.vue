<template>
  <v-main v-show="isComponentEnabled">
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
              :loading="incidentDetailsLoading"
            >
              Continuar
            </v-btn>
            <v-btn
              :class="['pa-0', 'mb-2', 'mr-4', 'primary', 'float-right']"
              @click="closeModal"
              :loading="incidentDetailsLoading"
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

export default {
  name: "IncidentDetails",
  components: { VJsf },
  props: {
    incidentData: {
      type: Object
    },
    isComponentEnabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: true,
    formData: {},
    incidentDetailsLoading: false
  }),
  computed: {
    schema() {
      if (!this.incidentData) {
        return {};
      } else if (!this.incidentData.incident_type) {
        return {};
      } else if (!this.incidentData.incident_type.details_schema) {
        return {};
      } else {
        if (
          typeof this.incidentData.incident_type.details_schema === "string"
        ) {
          return JSON.parse(this.incidentData.incident_type.details_schema);
        } else if (
          typeof this.incidentData.incident_type.details_schema === "object"
        ) {
          return this.incidentData.incident_type.details_schema;
        } else {
          console.error(
            "incidentData.incident_type.details_schema is not a string!"
          );
          return {};
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("incidentDetailsClosed");
    },
    async send() {
      if (!this.incidentData) {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "Incidente no referenciado",
          color: "primary",
          timeout: 5000
        });
      }
      if (!this.incidentData.id) {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "Incidente referenciado pero ID inexistente",
          color: "primary",
          timeout: 5000
        });
      }
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
        incidentId: this.incidentData.id,
        details: this.formData
      };
      this.incidentDetailsLoading = true;

      await this.$store
        .dispatch("incident/postIncidentDetails", payload)
        .then(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Detalles del incidente cargados correctamente.",
            color: "success",
            timeout: 5000
          });
          this.closeModal();
          this.$emit("detailsLoadedSuccessfully");
        })
        .catch(async error => {
          if (!error.data) {
            this.$store.commit("uiParams/dispatchAlert", {
              text:
                "Error al intentar enviar los datos del formulario! Por favor, intente mas tarde",
              color: "primary",
              timeout: 5000
            });
          } else if (error.data.incident_id) {
            this.$store.commit("uiParams/dispatchAlert", {
              text: "Incidente relacionado no existe!",
              color: "primary",
              timeout: 5000
            });
          } else if (error.data.details) {
            this.$store.commit("uiParams/dispatchAlert", {
              text:
                "Validación de detalles falló, corrija los datos ingresados e intente nuevamente",
              color: "primary",
              timeout: 5000
            });
          } else {
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
          this.formData = {};
          this.incidentDetailsLoading = false;
        });
    }
  }
};
</script>

<style scoped></style>
