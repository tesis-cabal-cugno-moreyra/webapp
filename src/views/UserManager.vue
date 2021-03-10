<template>
  <v-app class="pa-md-2 mx-lg-auto">
    <v-container fill-height fill-width text-center>
      <v-layout align="center" justify="center">
        <v-card>
          <v-card-title :class="['pa-3', 'mt-5', 'black_selected']">
            <v-row>
              <v-col cols="7">
                USUARIOS
              </v-col>
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
                        @click="changeStateAdmin"
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
    <sign-in-admin></sign-in-admin>
  </v-app>
</template>

<script>
/* eslint-disable prettier/prettier */

import { mapGetters } from "vuex";
import SignInAdmin from "../components/SignInAdmin";
export default {
  name: "UserManager",
  components: { SignInAdmin },
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
          text: "Cambiar el estado",
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
        page: this.page
      };

      await this.$store
          .dispatch("domainConfig/getUser", searchInfo)
          .then(response => {
            this.loadUserData(response);
            this.referenceSearch = searchInfo;
          })
          .catch(async () => {
            if (searchInfo.page !== 1) {
              this.page = this.page - 1;
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
      console.log(this.userData)

      let itemsPerPage = process.env.VUE_APP_ITEMS_PER_PAGE;
      if (!itemsPerPage) {
        console.error("Variable no declarada en: VUE_APP_ITEMS_PER_PAGE");
      }

      this.numberOfPage = Math.ceil(completeData.data.count / itemsPerPage);
    },

    openDialog(userSelected) {
      this.idUser = userSelected.user.id;
      this.dialogChangeStatus = true;
    },

    async changeStateAdmin() {
      this.dialogChangeStatus = false;

      if (
          this.isUserActiveFilter &&
          this.userData.length === 1 &&
          this.referenceSearch.user__first_name === "" &&
          this.referenceSearch.user__last_name === ""
      ) {
        this.$store.commit("uiParams/dispatchAlert", {
          text:
              "No puede desactivar este usuario ya que es el unico admin activo",
          color: "primary",
          timeout: 4000
        });

        return;
      }
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      let userInfo = {
        user_id: this.idUser,
        new_state: this.isUserActiveFilter ? "deactivate" : "activate"
      };
      const userState = this.isUserActiveFilter ? "desactivado" : "activado";
      await this.$store
          .dispatch("domainConfig/postChangeStatusUser", userInfo)
          .then(() => {
            this.searchUser();
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
      domainConfig: "domainConfig/domainConfig"
    })
  }
};
</script>
