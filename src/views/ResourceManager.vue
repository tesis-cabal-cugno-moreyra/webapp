<template>
  <v-container fill-height fill-width>
    <v-layout align-center>
      <v-card>
        <v-card-title :class="['pa-5', 'mt-5', 'black_selected']">
          <v-row>
            <v-col>
              {{
                `${
                  isUserActiveFilter
                    ? "Usuarios activos "
                    : "Usuarios no activos"
                }`
              }}
            </v-col>
          </v-row>

          <v-spacer></v-spacer>
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

            <v-col cols="6">
              <v-switch
                v-model="isUserActiveFilter"
                :label="
                  `${
                    isUserActiveFilter
                      ? 'Usuarios activos'
                      : 'Usuarios no activos'
                  }`
                "
                class="pa-3"
                @change="serchResource()"
              ></v-switch>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text :class="[' black_selected', 'pa-1']">
          <v-data-table
            :loading="loadingTable"
            loading-text="Cargando... Espere por favor"
            :headers="headersResource"
            :items="userResourceData"
            item-key="id"
            :class="['pb-1']"
            hide-default-footer
          >
            <template v-slot:top>
              <v-dialog v-model="dialogChangeStatus" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >¿Desea
                    {{ `${isUserActiveFilter ? "desactivar" : "activar"}` }} el
                    siguiente usuario?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      outlined
                      @click="changeStateResource"
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
            <!--Recursos es aqui!-->
            <template v-slot:item.actions="{ item }">
              <v-row v-if="!isUserActiveFilter">
                <v-icon
                  small
                  color="success"
                  class="mr-2"
                  @click="openDialog(item)"
                >
                  mdi-account-plus
                </v-icon>
                <aside>activar</aside></v-row
              >
              <v-row v-if="isUserActiveFilter">
                <v-icon color="primary" small @click="openDialog(item)">
                  mdi-account-off
                </v-icon>
                <aside>desactivar</aside></v-row
              >
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ResourceManager",
  data() {
    return {
      searchName: "",
      searchLastName: "",
      autoCompleteTypeResource: "",
      idResource: "",
      dialogChangeStatus: false,
      resourceTable: true,
      loadingTable: false,
      isComponentEnable: false,
      isUserActiveFilter: false,
      page: 1,
      numberOfPage: 1,
      referenceSearch: {
        user__first_name: "",
        user__last_name: "",
        type__name: "",
        alias__alias: "",
        user__is_active: false,
        page: 1
      },
      headersResource: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "user.first_name"
        },
        { text: "Apellido", sortable: false, value: "user.last_name" },
        { text: "Tipos de Recursos", sortable: false, value: "type.name" },
        {
          text: "Cambiar el estado",
          value: "actions", //--'user.is_active',
          sortable: false
        }
      ],
      userResourceData: [],
      aqui: [],
      typeResourceSelectedList: []
    };
  },
  created() {
    this.serchResource();
  },
  /*  watch: {
      dialogChangeStatus (val) {
        val || this.close()
      },}

  ,*/
  methods: {
    // Resource methods
    async serchResource() {
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      this.loadingTable = true;

      let searchInfo = {
        user__first_name: this.searchName,
        user__last_name: this.searchLastName,
        type__name:
          this.autoCompleteTypeResource == undefined
            ? ""
            : this.autoCompleteTypeResource,
        user__is_active: this.isUserActiveFilter,
        page: this.page
      };

      if (
        searchInfo.user__first_name != this.referenceSearch.user__first_name ||
        searchInfo.user__last_name != this.referenceSearch.user__last_name ||
        searchInfo.type__name != this.referenceSearch.type__name ||
        searchInfo.user__is_active != this.referenceSearch.user__is_active
      ) {
        this.page = 1;
        searchInfo.page = 1;
      }

      await this.$store
        .dispatch("domainConfig/getResource", searchInfo)
        .then(response => {
          this.loaduserResourceData(response);
          this.referenceSearch = searchInfo;
        })
        .catch(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
          this.loadingTable = false;

          this.$store.commit("uiParams/dispatchAlert", {
            text: "No hay resultados con esas especificaciones",
            color: "primary",
            timeout: 3000
          });
        })
        .finally(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
          this.loadingTable = false;
        });
      this.typeResourceSelectedList = this.domainConfig.incidentAbstractions[1].types[0].resourceTypes;
    },

    loaduserResourceData(completeData) {
      this.userResourceData = completeData.data.results;

      let itemsPerPage = process.env.VUE_APP_ITEMS_PER_PAGE;
      if (!itemsPerPage) {
        console.error("Variable no declarada en: VUE_APP_ITEMS_PER_PAGE");
      }

      this.numberOfPage = Math.ceil(completeData.data.count / itemsPerPage);
    },
    openDialog(resourceSelected) {
      this.idResource = resourceSelected.user.id;
      this.dialogChangeStatus = true;
      console.log(resourceSelected);
    },
    async changeStateResource() {
      this.dialogChangeStatus = false;

      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      let userInfo = {
        user_id: this.idResource,
        new_state: this.isUserActiveFilter ? "deactivate" : "activate"
      };
      const userState = this.isUserActiveFilter ? "desactivado" : "activado";
      await this.$store
        .dispatch("domainConfig/postChangeStatus", userInfo)
        .then(async () => {
          this.serchResource();
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Usuario " + userState + " correctamente",
            color: "success",
            timeout: 3000
          });
        })
        .catch(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");

          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se pudo realizar la acción intente luego",
            color: "primary",
            timeout: 3000
          });
        })
        .finally(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        });
    }
    /* // supervisor methods
    async serchSupervisor() {
     this.dialogChangeStatus = true;     


      let searchInfo = {
        user__first_name: this.searchName,
        user__last_name: this.searchLastName,
        alias__alias:
          this.autoCompleteTypeSupervisor == undefined
            ? ""
            : this.autoCompleteTypeSupervisor,
        page: this.page,
        user__is_active: this.isUserActiveFilter
      };

      if (
        searchInfo.user__first_name != this.referenceSearch.user__first_name ||
        searchInfo.user__last_name != this.referenceSearch.user__last_name ||
        searchInfo.alias__alias != this.referenceSearch.alias__alias ||
        searchInfo.user__is_active != this.referenceSearch.user__is_active
      ) {
        this.page = 1;
        searchInfo.page = 1;
      }

      await this.$store
        .dispatch("domainConfig/getSupervisor", searchInfo)
        .then(response => {
          this.loaduserResourceData(response);
          this.referenceSearch = searchInfo;
        })
        .catch(async resp => {
          console.log(resp);
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No hay resultados con esas especificaciones",
            color: "primary",
            timeout: 3000
          });
        })
        .finally(async () => {
          this.loadingTable = false;
        });
      this.typeSupervisorSelectedList = this.domainConfig.supervisorAliases;
    },
    //Admin Methods
    async serchAdmin() {
      this.resourceTable = false;
      this.supervisorTable = false;
      this.adminTable = true;

      this.loadingTable = true;

      let searchInfo = {
        user__first_name: this.searchName,
        user__last_name: this.searchLastName,
        page: this.page,
        user__is_active: this.isUserActiveFilter
      };

      if (
        searchInfo.user__first_name != this.referenceSearch.user__first_name ||
        searchInfo.user__last_name != this.referenceSearch.user__last_name ||
        searchInfo.user__is_active != this.referenceSearch.user__is_active
      ) {
        this.page = 1;
        searchInfo.page = 1;
      }

      await this.$store
        .dispatch("domainConfig/getAdmin", searchInfo)
        .then(response => {
          this.loaduserResourceData(response);
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
    },*/
    // common methods
  },
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig"
    })
  }
};
</script>
