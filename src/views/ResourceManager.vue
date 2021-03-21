<template>
  <v-app class="pa-md-2 mx-lg-auto">
    <v-container fill-height fill-width text-center>
      <v-layout align="center" justify="center">
        <v-card>
          <v-card-title :class="['pa-3', 'mt-5', 'black_selected']">
            <v-col cols="6">
              {{
                `${
                  isUserActiveFilter
                    ? "Usuarios de recursos activos "
                    : "Usuarios de recursos no activos"
                }`
              }}
            </v-col>
            <v-btn
              color="primary"
              x-large
              class="mb-2 pa-5  mx-auto"
              v-on:click="registerResource"
            >
              Registrar un usuario
            </v-btn>
          </v-card-title>
          <v-card-title :class="['pa-2', 'black_selected']">
            <v-row align="center" justify="center">
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
                  @change="searchResource()"
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
                      {{ `${isUserActiveFilter ? "desactivar" : "activar"}` }}
                      el siguiente usuario?</v-card-title
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
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-if="!isUserActiveFilter"
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="success"
                      @click="openDialog(item)"
                    >
                      mdi-account-plus
                    </v-icon>
                  </template>
                  <span>Activar usuario</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-if="isUserActiveFilter"
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
    <SignInResource></SignInResource>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import SignInResource from "../components/SignInResource";
export default {
  name: "ResourceManager",
  components: { SignInResource },
  data() {
    return {
      searchName: "",
      searchLastName: "",
      autoCompleteTypeResource: "",
      idResource: "",
      dialogChangeStatus: false,
      loadingTable: false,
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
          value: "actions",
          sortable: false
        }
      ],
      userResourceData: [],
      typeResourceSelectedList: []
    };
  },
  created() {
    this.searchResource();
  },
  watch: {
    page() {
      this.searchResource();
    },
    showSignInResource() {
      if (!this.showSignInResource) {
        this.searchResource();
      }
    }
  },
  methods: {
    registerResource() {
      this.$store.commit(
        "uiParams/changeSignInResourceState",
        !this.showSignInResource
      );
    },
    async searchResource() {
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      this.loadingTable = true;

      let searchInfo = {
        user__first_name: this.searchName,
        user__last_name: this.searchLastName,
        type__name:
          this.autoCompleteTypeResource === undefined
            ? ""
            : this.autoCompleteTypeResource,
        user__is_active: this.isUserActiveFilter,
        page: this.page
      };

      if (
        searchInfo.user__first_name !== this.referenceSearch.user__first_name ||
        searchInfo.user__last_name !== this.referenceSearch.user__last_name ||
        searchInfo.type__name !== this.referenceSearch.type__name ||
        searchInfo.user__is_active !== this.referenceSearch.user__is_active
      ) {
        this.page = 1;
        searchInfo.page = 1;
      }

      await this.$store
        .dispatch("domainConfig/getResource", searchInfo)
        .then(response => {
          this.loadUserResourceData(response);
          this.referenceSearch = searchInfo;
        })
        .catch(() => {
          if (searchInfo.page !== 1) {
            this.page = this.page - 1;
            this.searchResource();
          } else {
            this.$store.commit("uiParams/dispatchAlert", {
              text: "No hay resultados con esas especificaciones",
              color: "primary",
              timeout: 4000
            });
          }
          this.loadingTable = false;
          this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        })
        .finally(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
          this.loadingTable = false;
        });

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

    loadUserResourceData(completeData) {
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
        .dispatch("domainConfig/postChangeStatusUser", userInfo)
        .then(() => {
          this.searchResource();
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Usuario " + userState + " correctamente",
            color: "success",
            timeout: 4000
          });
        })
        .catch(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");

          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se pudo realizar la acción intente luego",
            color: "primary",
            timeout: 4000
          });
        })
        .finally(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
        });
    }
  },
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig",
      showSignInResource: "uiParams/showSignInResource"
    })
  }
};
</script>
