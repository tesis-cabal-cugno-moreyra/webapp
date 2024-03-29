<template>
  <v-form>
    <v-card>
      <v-dialog
        v-model="resourceSelectedInfo.state"
        width="600"
        persistent
        dark
      >
        <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
          {{
            `${
              resourceSelectedInfo.statusSelected === "Iniciado"
                ? " Recursos para relacionar"
                : "Recursos relacionados con el incidente"
            }`
          }}

          <v-spacer></v-spacer>
          <v-row v-if="resourceSelectedInfo.statusSelected === 'Iniciado'">
            <v-col cols="6">
              <v-text-field
                v-model="searchName"
                append-icon="mdi-magnify"
                label="Enter para buscar por nombre"
                v-on:keyup.enter="searchResource()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="searchLastName"
                append-icon="mdi-magnify"
                label="Enter para buscar por apellido"
                v-on:keyup.enter="searchResource()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-autocomplete
                v-model="autoCompleteTypeResource"
                :items="typeResourceSelectedList"
                item-text="name"
                clearable
                label="Tipo de recurso"
                @change="searchResource()"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row v-if="resourceSelectedInfo.statusSelected !== 'Iniciado'">
            <v-col cols="6">
              <v-text-field
                v-model="searchNameFinalized"
                append-icon="mdi-magnify"
                label="Enter para buscar por nombre"
                v-on:keyup.enter="searchIncidentResources()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="searchLastNameFinalized"
                append-icon="mdi-magnify"
                label="Enter para buscar por apellido"
                v-on:keyup.enter="searchIncidentResources()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-autocomplete
                v-model="autoCompleteTypeResourceFinalized"
                :items="typeResourceSelectedList"
                item-text="name"
                clearable
                label="Tipo de recurso"
                @change="searchIncidentResources()"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text :class="[' black_selected', 'pa-3']">
          <v-data-table
            :loading="loadingTable"
            loading-text="Cargando... Espere por favor"
            v-model="selected"
            :headers="headers"
            :items="resourceData"
            :single-select="singleSelect"
            item-key="id"
            :show-select="showSelect"
            :class="['pb-1']"
            hide-default-footer
          >
          </v-data-table>
          <v-pagination
            v-model="page"
            class="my-4"
            :total-visible="10"
            :length="numberOfPage"
          ></v-pagination>
        </v-card-text>

        <v-card-actions :class="['pa-2', 'pb-1', ' black_selected']">
          <v-spacer></v-spacer>
          <v-btn
            v-if="resourceSelectedInfo.statusSelected === 'Iniciado'"
            :loading="loadingProcessInfo"
            :class="['mb-2', 'mr-1', 'primary', 'float-right']"
            v-on:click="
              resourceSelectedInfo.statusSelected === 'Iniciado'
                ? saveAndClose()
                : closeModal()
            "
            >Continuar</v-btn
          >
          <v-btn
            :class="['pa-0', 'mb-2', 'mr-4', 'primary', 'float-right']"
            @click="closeModal()"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-dialog>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "IncidentResourceManager",
  data() {
    return {
      searchResourceFinalized: "",
      searchNameFinalized: "",
      searchLastNameFinalized: "",
      referenceSearch: {
        user__first_name: "",
        user__last_name: "",
        type__name: "",
        user__is_active: true,
        page: 1
      },
      referenceSearchFinalized: {
        resource__user__first_name: "",
        resource__user__last_name: "",
        resource__type: "",
        page: 1
      },
      showSelect: true,
      isUpdate: false,
      loadingTable: false,
      loadingProcessInfo: false,
      isComponentEnable: false,
      singleSelect: false,
      searchName: "",
      searchLastName: "",
      autoCompleteTypeResource: "",
      autoCompleteTypeResourceFinalized: "",
      page: 1,
      pageMarked: 1,
      numberOfCycles: 1,
      countCycles: 2,
      numberOfPage: 1,
      markedResource: [],
      selected: [],
      typeResourceSelectedList: [],
      nextPagination: null,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "user.first_name"
        },
        { text: "Apellido", sortable: false, value: "user.last_name" },
        { text: "Tipos de Recursos", sortable: false, value: "type.name" }
      ],
      resourceData: []
    };
  },
  created() {
    if (
      this.resourceSelectedInfo.state &&
      this.resourceSelectedInfo.statusSelected === "Iniciado"
    ) {
      this.searchResourceMarked();
    } else if (
      this.resourceSelectedInfo.state &&
      this.resourceSelectedInfo.statusSelected !== "Iniciado"
    ) {
      this.showSelect = false;
      this.searchIncidentResources();
    }
    let incidentAbstractions = this.domainConfig.incidentAbstractions;
    let resourceTypes = [];

    incidentAbstractions.forEach(incidentAbstraction => {
      incidentAbstraction.types.forEach(incidentType => {
        resourceTypes = resourceTypes.concat(incidentType.resourceTypes);
      });
    });

    // Se convierte en json para poder quitar los tipos de recursos repetidos y se vuelve a crear el objeto
    this.typeResourceSelectedList = [
      ...new Set(resourceTypes.map(JSON.stringify))
    ].map(JSON.parse);
  },
  updated() {
    if (
      this.resourceSelectedInfo.state &&
      !this.isUpdate &&
      this.resourceSelectedInfo.statusSelected === "Iniciado"
    ) {
      this.showSelect = true;
      this.page = 1;
      this.searchResourceMarked();
    } else if (
      this.resourceSelectedInfo.state &&
      !this.isUpdate &&
      this.resourceSelectedInfo.statusSelected !== "Iniciado"
    ) {
      this.showSelect = false;
      this.page = 1;
      this.searchIncidentResources();
    }
  },
  watch: {
    page() {
      if (this.resourceSelectedInfo.statusSelected === "Iniciado") {
        this.processInfo();
        this.selected = [];
        this.resourceData = [];
        this.markedResource = [];
        this.isUpdate = false;
        this.numberOfCycles = 1;
        this.pageMarked = 1;
        this.countCycles = 2;
        this.searchResourceMarked();
      } else {
        this.isUpdate = false;
        this.searchIncidentResources();
      }
    }
  },
  methods: {
    async searchIncidentResources() {
      this.loadingTable = true;
      this.isUpdate = true;
      this.resourceData = [];
      let incidentInfo = {
        incident_id: this.resourceSelectedInfo.incidentId,
        resource__user__first_name: this.searchNameFinalized,
        resource__user__last_name: this.searchLastNameFinalized,
        resource__type:
          this.autoCompleteTypeResourceFinalized === undefined
            ? ""
            : this.autoCompleteTypeResourceFinalized,
        page: this.page
      };

      if (
        incidentInfo.resource__user__first_name !==
          this.referenceSearchFinalized.resource__user__first_name ||
        incidentInfo.resource__user__last_name !==
          this.referenceSearchFinalized.resource__user__last_name ||
        incidentInfo.resource__type !==
          this.referenceSearchFinalized.resource__type
      ) {
        this.page = 1;
        incidentInfo.page = 1;
      }

      await this.$store
        .dispatch("incident/getIncidentResources", incidentInfo)
        .then(response => {
          this.referenceSearchFinalized = incidentInfo;
          this.loadResourceData(response);
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Hubo problemas en la busqueda de recursos relacionados",
            color: "primary",
            timeout: 4000
          });
        })
        .finally(async () => {
          this.loadingTable = false;
        });
    },
    saveAndClose() {
      this.processInfo();
      this.closeModal();
    },
    async searchResourceMarked() {
      this.isUpdate = true;
      let incidentInfo = {
        resource__user__first_name: "",
        resource__user__last_name: "",
        resource__type: "",
        incident_id: this.resourceSelectedInfo.incidentId,
        page: this.pageMarked
      };
      await this.$store
        .dispatch("incident/getIncidentResources", incidentInfo)
        .then(response => {
          response.data.results.forEach(incident => {
            this.markedResource.push(incident);
          });
          //se obtiene el numero de veces que se recorre esta funcion ciclicamente para obtener una lista de todos los
          // recursos ya seleccinados
          this.numberOfCycles = Math.ceil(
            response.data.count / process.env.VUE_APP_ITEMS_PER_PAGE
          );

          if (this.numberOfCycles >= this.countCycles) {
            for (
              this.countCycles;
              this.countCycles <= this.numberOfCycles;
              this.countCycles++
            ) {
              this.pageMarked++;
              this.searchResourceMarked();
            }
          } else {
            this.searchResource();
          }
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Hubo problemas en la busqueda de recursos seleccionados",
            color: "primary",
            timeout: 4000
          });

          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        })
        .finally(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        });
    },

    closeModal() {
      this.selected = [];
      this.resourceData = [];
      this.markedResource = [];
      this.isUpdate = false;
      this.numberOfCycles = 1;
      this.pageMarked = 1;
      this.countCycles = 2;
      this.searchName = "";
      this.searchLastName = "";
      this.searchLastNameFinalized = "";
      this.searchNameFinalized = "";
      this.$store.commit("incident/closeResource", {});
    },
    async searchResource() {
      this.loadingTable = true;
      this.resourceData = [];
      let searchInfo = {
        user__first_name: this.searchName,
        user__last_name: this.searchLastName,
        type__name:
          this.autoCompleteTypeResource === undefined
            ? ""
            : this.autoCompleteTypeResource,
        user__is_active: true,
        page: this.page
      };

      if (
        searchInfo.user__first_name !== this.referenceSearch.user__first_name ||
        searchInfo.user__last_name !== this.referenceSearch.user__last_name ||
        searchInfo.type__name !== this.referenceSearch.type__name
      ) {
        this.page = 1;
        searchInfo.page = 1;
      }

      await this.$store
        .dispatch("domainConfig/getResource", searchInfo)
        .then(response => {
          this.referenceSearch = searchInfo;

          this.loadResourceData(response);
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No hay resultados con esas especificaciones",
            color: "primary",
            timeout: 3000
          });
        })
        .finally(async () => {
          this.loadingTable = false;
        });
    },

    loadResourceData(completeData) {
      if (this.resourceSelectedInfo.statusSelected === "Iniciado") {
        this.resourceData = completeData.data.results;

        this.markedResource.forEach(resourceInfo => {
          this.selected.push(resourceInfo.resource);
        });
      } else {
        completeData.data.results.forEach(resourceInfo => {
          this.resourceData.push(resourceInfo.resource);
        });
      }

      let itemsPerPage = process.env.VUE_APP_ITEMS_PER_PAGE;
      if (!itemsPerPage) {
        console.error("Variable no declarada en: VUE_APP_ITEMS_PER_PAGE");
      }

      this.numberOfPage = Math.ceil(completeData.data.count / itemsPerPage);
    },

    async processInfo() {
      //se revisan las dos listas para poder verificar que recursos hay que *agregar*
      this.selected.forEach(elementSelected => {
        let isSelected = this.markedResource.some(elementMarked => {
          return elementMarked.resource.id === elementSelected.id;
        });

        if (!isSelected) {
          let resourceIncidentData = {
            incidentId: this.resourceSelectedInfo.incidentId,
            resourceId: elementSelected.id
          };

          this.$store
            .dispatch("incident/postResourceIncident", resourceIncidentData)
            .then(async () => {
              this.$store.commit("uiParams/dispatchAlert", {
                text: "Se agregó correctamente ",
                color: "success",
                timeout: 5000
              });
            })
            .catch(async () => {
              this.$store.commit("uiParams/dispatchAlert", {
                text: "No se agregó correctamente ",
                color: "primary",
                timeout: 5000
              });
            })
            .finally(async () => {
              this.loadingProcessInfo = false;
            });
        }
      });

      //se revisan las dos listas para poder verificar que recursos hay que *eliminar*
      this.markedResource.forEach(elementMarked => {
        let isMarked = this.selected.some(elementSelected => {
          return elementSelected.id === elementMarked.resource.id;
        });

        if (!isMarked) {
          let resourceIncidentData = {
            incidentId: this.resourceSelectedInfo.incidentId,
            resourceId: elementMarked.resource.id
          };

          this.$store
            .dispatch("incident/deleteResourceIncident", resourceIncidentData)
            .then(async () => {
              this.$store.commit("uiParams/dispatchAlert", {
                text: "Se elimino correctamente ",
                color: "success",
                timeout: 5000
              });
            })
            .catch(async () => {
              this.$store.commit("uiParams/dispatchAlert", {
                text: "No se elimino correctamente ",
                color: "primary",
                timeout: 5000
              });
            })
            .finally(async () => {
              this.loadingProcessInfo = false;
            });
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig",
      resourceSelectedInfo: "incident/resourceSelectedInfo"
    })
  }
};
</script>
