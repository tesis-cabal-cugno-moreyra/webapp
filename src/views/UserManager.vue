<template>
  <v-form>
    <v-container fill-height fill-width fluid class="pa-0">
      <div class="col-md-3">
        <v-row>
          <v-col cols="2" sm="12" md="12">
            <v-btn
              rounded
              color="primary"
              width="250"
              dark
              x-large
              class="ma-5 pa-5"
              v-on:click="serchResource()"
            >
              Ver Recursos
            </v-btn>
          </v-col>
          <v-col cols="2" sm="12" md="12">
            <v-btn
              rounded
              color="primary"
              width="250"
              dark
              x-large
              class="ma-5 pa-5"
              v-on:click="serchSupervisor()"
            >
              Ver Supervisores
            </v-btn>
          </v-col>
          <v-col cols="2" sm="12" md="12">
            <v-btn
              rounded
              color="primary"
              width="250"
              dark
              x-large
              class="ma-5 pa-5"
              v-on:click="serchAdmin()"
            >
              Ver Administradores
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <v-divider vertical></v-divider>
      <div class="col-md-8">
        <v-card v-if="resourceTable">
          <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
            Recursos
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

          <v-card-text :class="[' black_selected', 'pa-3']">
            <v-data-table
              :loading="loadingTable"
              loading-text="Cargando... Espere por favor"
              v-model="selected"
              show-select
              :headers="headersResource"
              :items="UserData"
              item-key="id"
              :class="['pb-1']"
              hide-default-footer
            >
              <v-template v-slot: item.user="{UserDataActive}">
                <v-simple-checkbox
                  v-model="UserDataActive.is_active"
                ></v-simple-checkbox>
              </v-template>
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
          </v-card-actions>
        </v-card>
        <v-card v-if="supervisorTable">
          <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
            Supervisores
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="searchName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por nombre"
                  v-on:keyup.enter="serchSupervisor()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="searchLastName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por apellido"
                  v-on:keyup.enter="serchSupervisor()"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-autocomplete
                  v-model="autoCompleteTypeSupervisor"
                  :items="typeSupervisorSelectedList"
                  item-text="name"
                  clearable
                  label="Tipo de supervisor"
                  @change="serchSupervisor()"
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
                  @change="serchSupervisor()"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text :class="[' black_selected', 'pa-3']">
            <v-data-table
              :loading="loadingTable"
              loading-text="Cargando... Espere por favor"
              v-model="selected"
              show-select
              :headers="headersSupervisor"
              :items="UserData"
              item-key="id"
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
          </v-card-actions>
        </v-card>
        <v-card v-if="adminTable">
          <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
            Administradores
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="searchName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por nombre"
                  v-on:keyup.enter="serchAdmin()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="searchLastName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por apellido"
                  v-on:keyup.enter="serchAdmin()"
                ></v-text-field>
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
                  @change="serchAdmin()"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text :class="[' black_selected', 'pa-3']">
            <v-data-table
              :loading="loadingTable"
              loading-text="Cargando... Espere por favor"
              v-model="selected"
              show-select
              :headers="headersAdmin"
              :items="UserData"
              item-key="id"
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
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["show", "incidentId"],
  name: "userManager",
  data() {
    return {
      searchName: "",
      searchLastName: "",
      autoCompleteTypeResource: "",
      autoCompleteTypeSupervisor: "",
      resourceTable: true,
      supervisorTable: false,
      adminTable: false,
      loadingTable: false,
      loadingProcessInfo: false,
      isComponentEnable: false,
      isUserActiveFilter: false,
      selected: [],
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
          text: "Estado",
          value: 'user.is_active == true? "activo" : "No activo"',
          sortable: false
        }
      ],
      headersSupervisor: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "user.first_name"
        },
        { text: "Apellido", sortable: false, value: "user.last_name" },
        { text: "Tipos de Supervisor", sortable: false, value: "alias.alias" },
        {
          text: "Estado",
          value: '`${user.is_active? "activo" : "No activo"}`',
          sortable: false
        }
      ],
      headersAdmin: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "user.first_name"
        },
        { text: "Apellido", sortable: false, value: "user.last_name" },
        {
          text: "Estado",
          value: '`${user.is_active? "activo" : "No activo"}`',
          sortable: false
        }
      ],
      UserData: [],
      typeResourceSelectedList: [],
      typeSupervisorSelectedList: []
    };
  },
  created() {
    this.serchResource();
  },
  methods: {
    // Resource methods
    async serchResource() {
      this.supervisorTable = false;
      this.adminTable = false;
      this.resourceTable = true;
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
          this.loadUserData(response);
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

    // supervisor methods
    async serchSupervisor() {
      this.resourceTable = false;
      this.adminTable = false;
      this.supervisorTable = true;
      this.loadingTable = true;

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
          this.loadUserData(response);
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
          this.loadUserData(response);
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
    },
    // common methods
    loadUserData(completeData) {
      this.UserData = completeData.data.results;

      this.UserData.forEach(async element => {
        if (element.user.is_active) {
          this.selected.push(element);
        }
      });

      let itemsPerPage = process.env.VUE_APP_ITEMS_PER_PAGE;
      if (!itemsPerPage) {
        console.error("Variable no declarada en: VUE_APP_ITEMS_PER_PAGE");
      }
      this.numberOfPage = Math.ceil(completeData.data.count / itemsPerPage);
    },
    async proccessInfo() {
      console.log(this.selected);
    }
  },
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig"
    })
  }
};
</script>
