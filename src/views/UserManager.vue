<template>
  <v-app class="pa-md-2 mx-lg-auto">
    <v-container fill-height fill-width text-center>
      <v-layout justify="center">
        <v-card>
          <v-card-title :class="['pa-3', 'mt-7', 'black_selected']">
            <v-row align="center" justify="center">
              <v-span>
                Administrador de perfiles de los usuarios
              </v-span>
            </v-row>
          </v-card-title>
          <v-card-title :class="['pa-2', 'black_selected']">
            <v-row align="center" justify="center">
              <v-col cols="6">
                <v-text-field
                  v-model="searchName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por nombre"
                  v-on:keyup.enter="searchUser()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="searchLastName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por apellido"
                  v-on:keyup.enter="searchUser()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text :class="[' black_selected', 'pa-1']">
            <v-data-table
              :loading="loadingTable"
              loading-text="Cargando... Espere por favor"
              :headers="headersUser"
              :items="userData"
              text-center
              item-key="id"
              :class="['pb-1']"
              hide-default-footer
            >
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="!isUserActiveFilter"
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="success"
                      @click="openDialog(item)"
                    >
                      <v-icon>
                        mdi-account-group
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Ver roles del usuario</span>
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
    <SeeUserProfiles></SeeUserProfiles>
  </v-app>
</template>

<script>
/* eslint-disable prettier/prettier */

import { mapGetters } from "vuex";
import SeeUserProfiles from "../components/SeeUserProfiles.vue";


export default {
  name: "UserManager",
  components: {SeeUserProfiles  },
  data() {
    return {
      searchName: "",
      searchLastName: "",
      idUser: "",
      dialogChangeStatus: false,
      loadingTable: false,
      isUserActiveFilter: false,
      page: 1,
      numberOfPage: 1,
      referenceSearch: {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        page: 1
      },
      headersUser: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "first_name"
        },
        { text: "Apellido", sortable: false, value: "last_name" },
        { text: "Usuario", sortable: false, value: "username" },

        { text: "email", sortable: false, value: "email" },
        {
          text: "ver perfiles",
          value: "actions",
          sortable: false
        }
      ],
      userData: []
    };
  },
  watch: {
    page() {
      this.searchUser();
    }
  },
  created() {
    this.searchUser();
  },
  methods: {
    async searchUser() {
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      this.loadingTable = true;

      let searchInfo = {
        first_name: this.searchName,
        last_name: this.searchLastName,
        page: this.page
      };

      if (
          searchInfo.first_name != this.referenceSearch.first_name ||
          searchInfo.last_name != this.referenceSearch.last_name
      ) {
        this.page = 1;
        searchInfo.page = 1;
      }

      await this.$store
          .dispatch("domainConfig/getUser", searchInfo)
          .then(response => {
            this.loadUserData(response);
            this.referenceSearch = searchInfo;
          })
          .catch(async () => {
            if (searchInfo.page !== 1) {
              this.page = this.page - 1;
              this.referenceSearch = searchInfo;
              await this.searchUser();
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

    loadUserData(completeData) {
      this.userData = completeData.data.results;

      let itemsPerPage = process.env.VUE_APP_ITEMS_PER_PAGE;
      if (!itemsPerPage) {
        console.error("Variable no declarada en: VUE_APP_ITEMS_PER_PAGE");
      }

      this.numberOfPage = Math.ceil(completeData.data.count / itemsPerPage);
    },

    openDialog(userSelected) {
      this.idUser = userSelected.id;
      this.dialogChangeStatus = true;

      this.$store.commit(
          "uiParams/changeSeeUserProfilesState",
          { id: this.idUser}
      );
    },

  },
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig",
      showUserProfiles: "uiParams/showUserProfiles"
    })
  }
};
</script>
