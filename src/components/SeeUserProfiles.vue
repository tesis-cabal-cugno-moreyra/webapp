<template>
  <v-main>
    <v-form ref="form" lazy-validation>
      <v-row justify="center">
        <v-dialog
          v-model="showUserProfiles.visible"
          persistent
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline"
                >Perfiles del usuario: {{ name }} {{ lastName }}
              </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <p>
                    Perfil admin:{{
                      `${adminProfile === null ? " No activo " : " Activo"}`
                    }}
                    <v-btn
                      v-if="adminProfile === null"
                      color="success"
                      class="ml-9"
                      @click="activateAdmin()"
                      >Activar</v-btn
                    >
                    <v-btn
                      v-if="adminProfile !== null"
                      color="primary"
                      class="ml-14"
                      @click="deactivateAdmin()"
                      >Desactivar</v-btn
                    >
                  </p>
                </v-row>
                <v-row>
                  <p>
                    Perfil recurso:
                    {{
                      `${resourceProfile === null ? " No activo " : " Activo"}`
                    }}
                  </p>

                  <v-btn
                    v-if="resourceProfile === null"
                    color="success"
                    class="ml-7"
                    @click="activateResource()"
                    >Activar</v-btn
                  >
                  <v-btn
                    v-if="resourceProfile !== null"
                    color="primary"
                    class="ml-12"
                    @click="deactivateResource()"
                    >Desactivar</v-btn
                  >
                  <v-col>
                    <v-autocomplete
                      v-if="resourceProfile === null"
                      v-model="autoCompleteTypeResource"
                      :items="typeResourceSelectedList"
                      item-text="name"
                      label="Cargo a ocupar"
                      :rules="[v => !!v || 'Debe seleccionar un alias']"
                      required
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <p>
                    Perfil supervisor:
                    {{
                      `${
                        supervisorProfile === null ? " No activo " : " Activo"
                      }`
                    }}
                  </p>

                  <v-btn
                    v-if="supervisorProfile === null"
                    color="success"
                    class="ml-2"
                    @click="activateSupervisor()"
                    >Activar</v-btn
                  >
                  <v-btn
                    v-if="supervisorProfile !== null"
                    color="primary"
                    class="ml-8"
                    @click="deactivateSupervisor()"
                    >Desactivar</v-btn
                  >
                  <v-col>
                    <v-autocomplete
                      v-if="supervisorProfile === null"
                      v-model="supervisorAliasesSelect"
                      :items="aliases.supervisorAliases"
                      item-text="name"
                      label="Cargo a ocupar"
                      :rules="[v => !!v || 'Debe seleccionar un alias']"
                      required
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :loading="loadingCreate"
                text
                @click="getDataPerson()"
              >
                Enviar</v-btn
              >
              <v-btn color="primary" text @click="onClose()">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-form>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SeeUserProfile",
  data: function() {
    return {
      loadingCreate: false,
      dataUser: null,
      name: "",
      lastName: "",
      adminProfile: null,
      resourceProfile: null,
      supervisorProfile: null,
      adminId: "",
      resourceId: "",
      supervisorId: "",
      autoCompleteTypeResource: "",
      typeResourceSelectedList: [],
      supervisorAliases: [],
      supervisorAliasesSelect: null,
      domainAccessCode: null
    };
  },
  async mounted() {
    if (this.typeResourceSelectedList.length === 0) {
      this.$store.dispatch("domainConfig/getDomainConfig").then(response => {
        this.typeResourceSelectedList =
          response.data.incidentAbstractions[1].types[0].resourceTypes;
      });
      await this.$store
        .dispatch("domainConfig/getDomainAccessCode")
        .then(response => {
          this.domainAccessCode = response.data.domain_code;
        });
    }
  },
  watch() {
    if (this.showUserProfiles.id !== null) {
      this.getDataPerson();
    }
  },
  methods: {
    onClose() {
      this.showUserProfiles.visible = false;
      this.dataUser = null;
      this.$store.commit("uiParams/closeProfileState");
    },
    async getDataPerson() {
      let idUser = this.showUserProfiles.id;
      await this.$store
        .dispatch("incident/getUser", { idUser })
        .then(response => {
          this.dataUser = response.data;
          this.loadData();
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text:
              "No se pudieron traer los datos de este recurso pruebe mas tarde",
            color: "primary",
            timeout: 4000
          });
        })
        .finally(async () => {});
    },
    loadData() {
      console.log("gola      asdsadsadsad");
      this.name = this.dataUser.first_name;
      this.lastName = this.dataUser.last_name;
      this.adminProfile = this.dataUser.adminprofile;
      this.adminProfile !== null
        ? (this.adminId = this.dataUser.adminprofile.id)
        : null;
      this.resourceProfile = this.dataUser.resourceprofile;
      this.resourceProfile !== null
        ? (this.resourceId = this.dataUser.resourceprofile.id)
        : null;
      this.supervisorProfile = this.dataUser.supervisorprofile;
      this.supervisorProfile !== null
        ? (this.supervisorId = this.dataUser.supervisorprofile.id)
        : null;
    },
    async activateAdmin() {
      let AdminInfo = {
        domain_code: this.domainAccessCode,
        user: this.showUserProfiles.id,
        domain_name: this.domainConfig.name,
        type: this.autoCompleteTypeResource
      };
      // Luego de creado el usuario, le da sus valores a el recurso
      await this.$store
        .dispatch("domainConfig/createAdmin", AdminInfo)
        .then(async response => {
          this.adminId = response.data.id;
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se le agrego el perfil administrador",
            color: "success",
            timeout: 5000
          });
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se le pudo ingresar el perfil administrador",
            color: "primary"
          });
        })
        .finally(async () => {
          this.adminProfile = null;
        });
    },
    deactivateAdmin() {
      let adminId = this.adminId;
      this.$store
        .dispatch("incident/deleteAdminProfile", { adminId })
        .then(async () => {
          this.adminProfile = null;
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se elimino correctamente el perfil administrador",
            color: "success",
            timeout: 5000
          });
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se pudo eliminar  el perfil administrador",
            color: "primary",
            timeout: 5000
          });
        })
        .finally(async () => {
          this.loadingProcessInfo = false;
        });
    },

    async activateResource() {
      let ResourceInfo = {
        domain_code: this.domainAccessCode,
        user: this.showUserProfiles.id,
        domain_name: this.domainConfig.name,
        type: this.autoCompleteTypeResource
      };
      // Luego de creado el usuario, le da sus valores a el recurso
      await this.$store
        .dispatch("domainConfig/createResource", ResourceInfo)
        .then(async response => {
          this.resourceId = response.data.id;
          this.resourceProfile = null;
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se le agrego el perfil recurso",
            color: "success",
            timeout: 5000
          });
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "no se le pudo  agregar el perfil recurso",
            color: "primary"
          });
        });
    },

    async deactivateResource() {
      let resourceId = this.resourceId;
      await this.$store
        .dispatch("incident/deleteResourceProfile", { resourceId })
        .then(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se elimino correctamente el perfil recurso",
            color: "success",
            timeout: 5000
          });
          this.resourceProfile = null;
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se pudo eliminar el perfil recurso",
            color: "primary",
            timeout: 5000
          });
        })
        .finally(async () => {
          this.loadingProcessInfo = false;
        });
    },

    async activateSupervisor() {
      let SupervisorInfo = {
        domain_code: this.domainAccessCode,
        user: this.showUserProfiles.id,
        domain_name: this.domainConfig.name,
        alias: this.supervisorAliasesSelect
      };
      // Luego de creado el usuario, le da sus valores a el recurso
      await this.$store
        .dispatch("domainConfig/createSupervisor", SupervisorInfo)
        .then(async response => {
          this.supervisorId = response.data.id;
          this.supervisorProfile = null;
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se creo el usuario Supervisor,",
            color: "success",
            timeout: 5000
          });
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se le pudo ingresar el perfil supervisor",
            color: "primary"
          });
        });
    },

    deactivateSupervisor() {
      let supervisorId = this.supervisorId;
      this.$store
        .dispatch("incident/deleteSupervisorProfile", { supervisorId })
        .then(async () => {
          this.supervisorProfile = null;
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se elimino correctamente el perfil supervisor",
            color: "success",
            timeout: 5000
          });
          this.supervisorProfile = null;
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se pudo eliminar el perfil supervisor",
            color: "primary",
            timeout: 5000
          });
        })
        .finally(async () => {
          this.loadingProcessInfo = false;
        });
    }
  },
  computed: {
    ...mapGetters({
      showUserProfiles: "uiParams/showUserProfiles",
      domainCode: "domainConfig/domainCode",
      domainConfig: "domainConfig/domainConfig",
      aliases: "domainConfig/aliases"
    })
  }
};
</script>

<style></style>
