<template>
  <v-form>
    <v-card>
      <v-dialog v-model="show" width="600" persistent dark>
        <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
          Recursos para relacionar
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="searchName"
                append-icon="mdi-magnify"
                label="Enter para buscar por nombre"
                v-on:keyup.enter="serchResource()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="searchLastName"
                append-icon="mdi-magnify"
                label="Enter para buscar por apellido"
                v-on:keyup.enter="serchResource()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-autocomplete
                v-model="autoCompleteTypeResource"
                :items="typeResourceSelectedList"
                item-text="name"
                clearable
                label="Tipo de recurso"
                @change="serchResource()"
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
            v-on:click="proccessInfo()"
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
  name: "incidentResourceList",
  props: ["show", "incidentId"],
  data() {
    return {
      referenceSearch: {
        user__first_name: "",
        user__last_name: "",
        type__name: "",
        page: 1
      },
      loadingTable: false,
      loadingProcessInfo: false,
      isComponentEnable: false,
      singleSelect: false,
      searchName: "",
      searchLastName: "",
      autoCompleteTypeResource: "",
      page: 1,
      numberOfPage: 1,
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
    this.serchResource();
  },
  watch: {
    page() {
      this.serchResource();
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", true);
    },
    async serchResource() {
      this.loadingTable = true;

      let searchInfo = {
        user__first_name: this.searchName,
        user__last_name: this.searchLastName,
        type__name:
          this.autoCompleteTypeResource == undefined
            ? ""
            : this.autoCompleteTypeResource,
        page: this.page
      };

      if (
        searchInfo.user__first_name != this.referenceSearch.user__first_name ||
        searchInfo.user__last_name != this.referenceSearch.user__last_name ||
        searchInfo.type__name != this.referenceSearch.type__name
      ) {
        this.page = 1;
        searchInfo.page = 1;
      }

      await this.$store
        .dispatch("domainConfig/getResource", searchInfo)
        .then(response => {
          this.loadResourceData(response);
          this.referenceSearch = searchInfo;
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
      this.typeResourceSelectedList = this.domainConfig.incidentAbstractions[1].types[0].resourceTypes;
    },

    loadResourceData(completeData) {
      //Refactorizar y mandar a store ?
      this.resourceData = completeData.data.results;
      let itemsPerPage = process.env.VUE_APP_ITEMS_PER_PAGE;
      if (!itemsPerPage) {
        console.error("Variable no declarada en: VUE_APP_ITEMS_PER_PAGE");
      }
      this.numberOfPage = Math.ceil(completeData.data.count / itemsPerPage);
    },

    async proccessInfo() {
      if (this.selected.length === 0) {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "Debe seleccionar al menos un recurso",
          color: "primary",
          timeout: 3000
        });
        return;
      }
      this.loadingProcessInfo = true;
      let errorPost = "";
      this.selected.forEach(async (element, index) => {
        let resourceIncidentData = {
          incidentId: this.incidentId,
          incidentTypeId: element.id
        };

        await this.$store
          .dispatch("domainConfig/postResourceIncident", resourceIncidentData)
          .then(async () => {
            this.$store.commit("uiParams/dispatchAlert", {
              text: "Se cargo  correctamente: ",
              color: "success",
              timeout: 5000
            });
          })
          .catch(async () => {
            //comparo el indice de el array con la cantidad de elementos para finalizar el mensaje
            errorPost = `${errorPost} ${element.user.first_name} ${element.user.last_name}`;
            if (index != this.selected.length - 1) {
              errorPost = `${errorPost}, `;
            }
          })
          .finally(async () => {
            this.loadingProcessInfo = false;
          });
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
    }
  },
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig"
    })
  }
};
</script>
