<template>
  <v-app class="pa-md-2 mx-lg-auto">
    <v-container fill-height fill-width text-center>
      <v-layout justify="center">
        <v-card>
          <v-card-title :class="['pa-3', 'mt-5']">
            <v-col cols="6">
              {{ `${"Incidentes " + incidentStatusSelected + "s"}` }}
            </v-col>
            <v-btn
              color="primary"
              x-large
              class="mb-2 pa-5  mx-auto"
              v-on:click="createIncident"
            >
              Crear Incidente
            </v-btn>
          </v-card-title>
          <v-card-title :class="['pa-2']">
            <v-row align="center" justify="center">
              <v-col cols="6">
                <v-autocomplete
                  v-model="autoCompleteIncidentType"
                  :items="typeIncidentTypeList"
                  item-text="name"
                  clearable
                  label="Tipos de incidentes"
                  @change="searchIncident()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="incidentStatusSelected"
                  :items="incidentStatus"
                  v-on:change="searchIncident()"
                  label="Estado del incidente"
                >
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="incidentVisibilitySelected"
                  :items="incidentVisibility"
                  v-on:change="searchIncident()"
                  label="Visibilidad del incidente"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="incidentCompletedSelected"
                  :items="incidentCompleted"
                  v-on:change="searchIncident()"
                  label="Visibilidad del incidente"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text :class="['pa-1']">
            <v-data-table
              :loading="loadingTable"
              loading-text="Cargando... Espere por favor"
              :headers="headersIncident"
              :items="userIncidentData"
              text-center
              item-key="id"
              :class="['pb-1']"
              hide-default-footer
            >
              <template v-slot:top>
                <IncidentResourceManager
                  v-if="showIncidentResourceList === true"
                ></IncidentResourceManager>

                <v-dialog v-model="dialogChangeVisibility" max-width="515px">
                  <v-card>
                    <v-card-title class="headline"
                      >¿Desea cambiar la visibilidad del
                      incidente?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="success"
                        outlined
                        @click="changeStateSupport()"
                        :class="['mr-5']"
                        >Cambiar</v-btn
                      >
                      <v-btn
                        color="primary"
                        outlined
                        @click="dialogChangeVisibility = false"
                        >Cancelar</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogChangeStatus" max-width="610px">
                  <v-card>
                    <v-card-title
                      class="d-flex align-center justify-center pa-4 mx-auto"
                      >¿Desea cambiar el estado del incidente?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="success"
                        outlined
                        @click="changeStatusIncident('finalize')"
                        :class="['mr-5']"
                        >Finalizar incidente</v-btn
                      >
                      <v-btn
                        color="#FFB91F"
                        outlined
                        @click="changeStatusIncident('cancel')"
                        :class="['mr-5']"
                        >Cancelar incidente</v-btn
                      >
                      <v-btn
                        color="primary"
                        outlined
                        @click="dialogChangeStatus = false"
                        >Cancelar accion</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="success"
                      @click="openDialogEditResource(item)"
                      :class="['mr-2']"
                    >
                      mdi-account-convert
                    </v-icon>
                  </template>
                  <span>
                    {{
                      `${
                        incidentStatus === "Iniciado"
                          ? "Editar usuario relacionados"
                          : "Ver usuarios relacionados"
                      }`
                    }}
                  </span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="pink"
                      @click="functionParaElEmi(item)"
                      :class="['mr-2']"
                    >
                      mdi-google-maps
                    </v-icon>
                  </template>
                  <span>Emi apretame ;)</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="blue"
                      @click="openDialogChangeVisibility(item)"
                      :class="['mr-2']"
                    >
                      mdi-pencil-circle-outline
                    </v-icon>
                  </template>
                  <span>Cambiar Visibilidad del incidente</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template
                    v-slot:activator="{ on, attrs }"
                    v-if="incidentStatusSelected === 'Iniciado'"
                  >
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="#68D4CE"
                      @click="openDialogChangeStatus(item)"
                      :class="['mr-2']"
                    >
                      mdi-ballot-recount
                    </v-icon>
                  </template>
                  <span>Cambiar estado del incidente</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <v-pagination
              v-model="page"
              class="my-4"
              :total-visible="10"
              :length="numberOfPage"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import IncidentResourceManager from "@/components/IncidentResourceManager";

export default {
  name: "IncidentsView",
  components: { IncidentResourceManager },
  data: function() {
    return {
      showIncidentResourceList: false,
      incidentVisibilitySelected: "Sin asistencia externa",
      incidentVisibility: ["Con asistencia externa", "Sin asistencia externa"],
      incidentStatusSelected: "Iniciado",
      incidentStatus: ["Iniciado", "Cancelado", "Finalizado"],
      incidentCompletedSelected: "Incompleto",
      incidentCompleted: ["Incompleto", "Completo"],
      autoCompleteIncidentType: "",
      typeIncidentTypeList: [],
      loadingTable: false,
      page: 1,
      numberOfPage: 1,
      referenceSearch: {
        searchIncidentTypeName: "",
        searchVisibility:
          this.incidentVisibilitySelected === "Con asistencia externa"
            ? "With external support"
            : "Without external support",
        searchStatus: this.incidentStatusSelected,
        searchDataStatus:
          this.incidentCompletedSelected === "Completo"
            ? "Complete"
            : "Incomplete",
        page: 1
      },
      userIncidentData: [],
      headersIncident: [
        { text: "Estado", sortable: false, value: "statusTranslate" },
        {
          text: "Información del estado",
          sortable: false,
          value: "data_status"
        },
        { text: "Visibilidad", sortable: false, value: "visibility" },
        {
          text: "Referencia",
          sortable: false,
          value: "location_as_string_reference"
        },
        {
          text: "Cambiar el estado",
          value: "actions",
          sortable: false
        }
      ],
      incidentSelected: [],
      dialogChangeVisibility: false,
      dialogChangeStatus: false,
      dialogEditResource: false
    };
  },
  async created() {
    await this.searchIncident();
    await this.createTypeIncidentTypeList();
  },
  watch: {
    page() {
      this.searchIncident();
    }
  },
  methods: {
    createIncident: function() {
      this.$router.push({ name: "CreateIncident" });
    },
    translate(incidentEnglish) {
      incidentEnglish.forEach(incident => {
        if (this.incidentCompletedSelected === "Completo") {
          incident.data_status = "Completo";
        } else {
          incident.data_status = "Incompleto";
        }
        incident.statusTranslate = this.incidentStatusSelected;
        if (this.incidentVisibilitySelected === "Con asistencia externa") {
          incident.visibility = "Con asistencia externa";
        } else {
          incident.visibility = "Sin asistencia externa";
        }
      });
      this.userIncidentData = incidentEnglish;
    },
    createTypeIncidentTypeList() {
      this.incidentConfig.forEach(incident => {
        incident.incidentTypes.forEach(typeIncident => {
          this.typeIncidentTypeList.push(
            incident.incidentAbstraction + " - " + typeIncident
          );
        });
      });
    },
    async searchIncident() {
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      this.loadingTable = true;
      let incidentType = "";

      if (
        this.autoCompleteIncidentType !== "" &&
        this.autoCompleteIncidentType !== undefined
      ) {
        incidentType = this.autoCompleteIncidentType.split("-");
        incidentType = incidentType[1];
      }
      let Status = "Started";
      if (this.incidentStatusSelected === "Finalizado") {
        Status = "Finalized";
      }
      if (this.incidentStatusSelected === "Cancelado") {
        Status = "Canceled";
      }
      let searchInfo = {
        incident_type__name: incidentType,
        visibility:
          this.incidentVisibilitySelected === "Con asistencia externa"
            ? "With external support"
            : "Without external support",
        status: Status,
        data_status:
          this.incidentCompletedSelected === "Completo"
            ? "Complete"
            : "Incomplete",
        page: this.page
      };

      if (
        searchInfo.incident_type__name !==
          this.referenceSearch.incident_type__name ||
        searchInfo.visibility !== this.referenceSearch.visibility ||
        searchInfo.status !== this.referenceSearch.status ||
        searchInfo.data_status !== this.referenceSearch.data_status ||
        searchInfo.alias__alias !== this.referenceSearch.alias__alias
      ) {
        this.page = 1;
        searchInfo.page = 1;
      }

      await this.$store
        .dispatch("incident/getIncident", searchInfo)
        .then(response => {
          this.loadIncidentData(response);
          this.referenceSearch = searchInfo;
        })
        .catch(async () => {
          if (searchInfo.page !== 1) {
            this.page = this.page - 1;
            await this.searchIncident();
          } else {
            this.$store.commit("uiParams/dispatchAlert", {
              text: "No hay resultados con esas especificaciones",
              color: "primary",
              timeout: 4000
            });
          }
          this.loadingTable = false;
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        })
        .finally(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
          this.loadingTable = false;
        });
    },

    loadIncidentData(completeData) {
      this.translate(completeData.data.results);
      let itemsPerPage = process.env.VUE_APP_ITEMS_PER_PAGE;
      if (!itemsPerPage) {
        console.error("Variable no declarada en: VUE_APP_ITEMS_PER_PAGE");
      }

      this.numberOfPage = Math.ceil(completeData.data.count / itemsPerPage);
    },
    async changeStateSupport() {
      this.dialogChangeVisibility = false;
      this.loadingTable = true;
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      let incidentInfo = {
        incidentId: this.incidentSelected.id,
        incidentChange:
          this.incidentVisibilitySelected === "Con asistencia externa"
            ? "without-external-support"
            : "with-external-support"
      };
      await this.$store
        .dispatch("incident/postIncidentChangeExternalSupport", incidentInfo)
        .then(async () => {
          await this.searchIncident();

          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se ha cambiado exitosamente la visibilidad al incidente",
            color: "success",
            timeout: 4000
          });
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No hay resultados con esas especificaciones",
            color: "primary",
            timeout: 4000
          });

          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        })
        .finally(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
          this.loadingTable = false;
        });
    },
    async changeStatusIncident(status) {
      this.dialogChangeStatus = false;
      this.loadingTable = true;
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      let incidentInfo = {
        incidentId: this.incidentSelected.id,
        incidentChangeStatus: status
      };
      await this.$store
        .dispatch("incident/postIncidentChangeStatus", incidentInfo)
        .then(() => {
          this.searchIncident();

          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se ha cambiado exitosamente la visibilidad al incidente",
            color: "success",
            timeout: 4000
          });
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No hay resultados con esas especificaciones",
            color: "primary",
            timeout: 4000
          });

          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        })
        .finally(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
          this.loadingTable = false;
        });
    },

    async openDialogEditResource(incidentSelected) {
      this.incidentSelected = incidentSelected;
      this.$store.commit("incident/dispatchResourceSelected", {
        state: true,
        incidentId: incidentSelected.id,
        statusSelected: this.incidentStatusSelected
      });
      this.showIncidentResourceList = true;
    },

    closeModal() {
      // this.showIncidentResourceList = false;
      this.$router.push({ name: "IncidentsView" });
    },
    openDialogChangeVisibility(incidentSelected) {
      this.incidentSelected = incidentSelected;
      this.dialogChangeVisibility = true;
    },
    functionParaElEmi(incidentSelectData) {
      console.log(incidentSelectData);
      alert(
        "Emi el id de este incidente es: " +
          incidentSelectData.id +
          " para mas información mira el console log"
      );
    },
    openDialogChangeStatus(incidentSelected) {
      this.incidentSelected = incidentSelected;
      this.dialogChangeStatus = true;
    }
  },
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig",
      incidentConfig: "domainConfig/incidentConfig"
    })
  }
};
</script>
