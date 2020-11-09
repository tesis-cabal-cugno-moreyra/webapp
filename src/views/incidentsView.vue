<template>
  <v-app class="pa-md-2 mx-lg-auto">
    <v-container fill-height fill-width text-center>
      <v-layout align="center" justify="center">
        <v-card>
          <v-card-title :class="['pa-3', 'mt-5', 'black_selected']">
            <v-col cols="12">
              {{
                `${
                  isIncidentActiveFilter
                    ? "Incidentes activos "
                    : "Incidentes no activos"
                }`
              }}
            </v-col>
          </v-card-title>
          <v-card-title :class="['pa-2', 'black_selected']">
            <v-row align="center" justify="center">
              <v-col cols="6">
                <v-autocomplete
                  v-model="autoCompleteIncidentType"
                  :items="typeIncidentTypeList"
                  item-text="name"
                  clearable
                  label="Tipo de recurso"
                  @change="searchIncident()"
                ></v-autocomplete>
              </v-col>
              <!-- <v-col cols="6">
                <v-text-field
                    v-model="searchDataStatus"
                    append-icon="mdi-magnify"
                    label="Enter para buscar por apellido"
                    v-on:keyup.enter="searchIncident()"
                ></v-text-field>
              </v-col>-->

              <v-col cols="6">
                <v-select
                  v-model="incidentStatusSelected"
                  :items="incidentStatus"
                  v-on:change="searchIncident()"
                  label="Estado del incidente"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-switch
                  v-model="isIncidentPublicFilter"
                  :label="
                    `${
                      isIncidentPublicFilter
                        ? 'Incidentes Publicos'
                        : 'Incidentes Privados'
                    }`
                  "
                  class="pa-3"
                  @change="searchIncident()"
                ></v-switch>
              </v-col>
              <v-col cols="6">
                <v-switch
                  v-model="isIncidentCompleteFilter"
                  :label="
                    `${
                      isIncidentCompleteFilter
                        ? 'Incidentes completos'
                        : 'Incidentes incompletos'
                    }`
                  "
                  class="pa-3"
                  @change="searchIncident()"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text :class="[' black_selected', 'pa-1']">
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
                <v-dialog v-model="dialogChangeStatus" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >¿Desea
                      {{
                        `${isIncidentActiveFilter ? "desactivar" : "activar"}`
                      }}
                      el siguiente usuario?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        outlined
                        @click="dialogChangeStatus = false"
                        :class="['mr-5']"
                        >Acepto</v-btn
                      >
                      <v-btn
                        color="primary"
                        outlined
                        @click="dialogChangeStatus = false"
                        >Cancelar</v-btn
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
                      @click="openDialog(item)"
                    >
                      mdi-account-plus
                    </v-icon>
                  </template>
                  <span>Editar usuario relacionados</span>
                </v-tooltip>

                <!--   <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        v-if="isIncidentActiveFilter"
                        v-bind="attrs"
                        v-on="on"
                        small
                        color="primary"
                        @click="openDialog(item)"
                    >
                      mdi-account-off
                    </v-icon>
                  </template>
                  <span>Desactivar usuario</span>
                </v-tooltip>-->
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
//
import { mapGetters } from "vuex";

export default {
  name: "incidentsView",
  data() {
    return {
      translateName: [],
      incidentStatusSelected: "Iniciado",
      incidentStatus: ["Iniciado", "Cancelado", "Finalizado"],
      autoCompleteIncidentType: "",
      typeIncidentTypeList: [],
      searchIncidentTypeName: "",
      searchDataStatus: "",
      isIncidentActiveFilter: true,
      isIncidentPublicFilter: true,
      isIncidentCompleteFilter: false,
      loadingTable: false,
      headerIncident: {},
      page: 1,
      numberOfPage: 1,
      referenceSearch: {
        searchIncidentTypeName: "",
        searchVisibility: this.isIncidentPublicFilter ? "Public" : "Private",
        searchStatus: this.isIncidentActiveFilter ? "Started" : "Finished",
        searchDataStatus: this.isIncidentCompleteFilter
          ? "Complete"
          : "Incomplete",
        page: 1
      },
      userIncidentData: [],
      headersIncident: [
        {
          text: "Tipo de incidente",
          align: "start",
          sortable: false,
          value: "incident_type.name"
        },
        { text: "Estado", sortable: false, value: "status" },
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
          value: "actions", //--'user.is_active',
          sortable: false
        }
      ],
      incidentSelected: [],
      dialogChangeStatus: false
    };
  },
  computed: {
    ...mapGetters({
      incidentConfig: "domainConfig/incidentConfig"
    })
  },
  created() {
    this.searchIncident();
    this.CreatetypeIncidentTypeList();
  },
  watch: {
    page() {
      this.searchIncident();
    }
  },

  methods: {
    async translate(incidentEnglish) {
      incidentEnglish.forEach(incident => {
        if (this.isIncidentCompleteFilter) {
          incident.data_status = "Completo";
        } else {
          incident.data_status = "Incompleto";
        }
        incident.status = this.incidentStatusSelected;
        if (this.isIncidentPublicFilter) {
          incident.visibility = "Público";
        } else {
          incident.visibility = "Privado";
        }
      });
      this.userIncidentData = incidentEnglish;
    },
    CreatetypeIncidentTypeList() {
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
      if (this.incidentStatusSelected == "Finalizado") {
        Status = "Finalized";
      }
      if (this.incidentStatusSelected == "Cancelado") {
        Status = "Canceled";
      }
      let searchInfo = {
        incident_type__name: incidentType,
        visibility: this.isIncidentPublicFilter ? "Public" : "Private",
        status: Status,
        data_status: this.isIncidentCompleteFilter ? "Complete" : "Incomplete",
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
        .dispatch("domainConfig/getIncident", searchInfo)
        .then(response => {
          this.loadIncidentData(response);
          this.referenceSearch = searchInfo;
        })
        .catch(async () => {
          if (searchInfo.page !== 1) {
            this.page = this.page - 1;
            this.searchIncident();
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
    openDialog(incidentSelected) {
      this.incidentSelected = incidentSelected;
      this.dialogChangeStatus = true;
    }
  }
};
</script>
