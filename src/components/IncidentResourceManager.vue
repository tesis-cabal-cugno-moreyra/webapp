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
          Recursos para relacionar
          <v-spacer></v-spacer>
          <v-row>
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
            show-select
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
            :loading="loadingProcessInfo"
            :class="['mb-2', 'mr-1', 'primary', 'float-right']"
            v-on:click="saveAndClose()"
            >Continuar</v-btn
          >
          <v-btn
            :class="['pa-0', 'mb-2', 'mr-4', 'primary', 'float-right']"
            @click="closeModal"
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
      referenceSearch: {
        user__first_name: "",
        user__last_name: "",
        type__name: "",
        user__is_active: true,
        page: 1
      },
      isUpdate: false,
      loadingTable: false,
      loadingProcessInfo: false,
      isComponentEnable: false,
      singleSelect: false,
      searchName: "",
      searchLastName: "",
      autoCompleteTypeResource: "",
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
    if (this.resourceSelectedInfo.state) {
      this.searchResourceMarked();
    }
  },
  updated() {
    if (this.resourceSelectedInfo.state && !this.isUpdate) {
      this.searchResourceMarked();
    }
  },
  watch: {
    page() {
      this.processInfo();
      this.selected = [];
      this.resourceData = [];
      this.markedResource = [];
      this.isUpdate = false;
      this.numberOfCycles = 1;
      this.pageMarked = 1;
      this.countCycles = 2;
      this.searchResourceMarked();
    }
  },
  methods: {
    saveAndClose() {
      this.processInfo();
      this.closeModal();
    },
    async searchResourceMarked() {
      this.isUpdate = true;
      let incidentInfo = {
        incident_id: this.resourceSelectedInfo.incidentId,
        page: this.pageMarked
      };
      await this.$store
        .dispatch("incident/getIncidentResources", incidentInfo)
        .then(response => {
          response.data.results.forEach(incident => {
            this.markedResource.push(incident);
          });

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
      this.page = 1;
      this.$store.commit("incident/closeResource", {});
    },
    async searchResource() {
      this.loadingTable = true;

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
            text: "No hay resultados con esas especificaciones 4",
            color: "primary",
            timeout: 3000
          });
        })
        .finally(async () => {
          this.loadingTable = false;
        });
      this.typeResourceSelectedList = this.domainConfig.incidentAbstractions[1].types[0].resourceTypes;
    },

    loadResourceData(completeData) {
      this.resourceData = completeData.data.results;

      this.markedResource.forEach(resourceInfo => {
        this.selected.push(resourceInfo.resource);
      });

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
