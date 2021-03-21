<template>
  <v-main>
    <v-form ref="form" lazy-validation>
      <v-row justify="center">
        <v-dialog
          v-model="showUserProfiles.visible"
          v-if="
            showUserProfiles.visible
              ? (this.loadDataUserWithId = this.showUserProfiles.id)
              : false
          "
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
                    Perfil admin:
                    {{
                      `${
                        adminProfileActive === false ? " No activo " : " Activo"
                      }`
                    }}
                    <v-btn
                      v-if="adminProfileActive === false"
                      color="success"
                      class="ml-9"
                      @click="activateAdmin()"
                      >Activar</v-btn
                    >
                    <v-btn
                      v-if="adminProfileActive === true"
                      color="primary"
                      class="ml-14"
                      @click="deactivateAdmin()"
                      >Desactivar</v-btn
                    >
                  </p>
                </v-row>
                <v-row>
                  <v-col>
                    Perfil recurso: <br />
                    {{
                      `${
                        resourceProfileActive === false
                          ? "No activo "
                          : " Activo"
                      }`
                    }}
                  </v-col>
                  <v-col>
                    <v-btn
                      v-if="resourceProfileActive === false"
                      color="success"
                      class="ml-5"
                      @click="activateResource()"
                      >Activar</v-btn
                    >
                    <v-btn
                      v-if="resourceProfileActive === true"
                      color="primary"
                      class="ml-10"
                      @click="deactivateResource()"
                      >Desactivar</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      v-if="resourceProfileActive === false"
                      v-model="autoCompleteTypeResource"
                      :items="typeResourceSelectedList"
                      item-text="name"
                      label="Tipo de recurso"
                      :rules="[v => !!v || 'Debe seleccionar un tipo']"
                      :error-messages="errorResourceSelect"
                      required
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p>
                      Perfil supervisor:
                      {{
                        `${
                          supervisorProfileActive === false
                            ? " No activo "
                            : " Activo"
                        }`
                      }}
                    </p>
                  </v-col>
                  <v-col>
                    <v-btn
                      v-if="supervisorProfileActive === false"
                      color="success"
                      class="ml-5"
                      @click="activateSupervisor()"
                      >Activar</v-btn
                    >
                    <v-btn
                      v-if="supervisorProfileActive === true"
                      color="primary"
                      class="ml-10"
                      @click="deactivateSupervisor()"
                      >Desactivar</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      v-if="supervisorProfileActive === false"
                      v-model="supervisorAliasesSelect"
                      :items="aliases.supervisorAliases"
                      item-text="name"
                      label="Cargo a ocupar"
                      :rules="[v => !!v || 'Debe seleccionar un alias']"
                      :error-messages="errorSupervisorSelect"
                      required
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="onClose()">Cerrar</v-btn>
              </v-card-actions>
            </v-card-text>
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
      name: "",
      lastName: "",
      loadDataUserWithId: null,
      adminProfile: null,
      resourceProfile: null,
      supervisorProfile: null,
      resourceProfileActive: false,
      adminProfileActive: false,
      supervisorProfileActive: false,
      adminId: "",
      resourceId: "",
      supervisorId: "",
      autoCompleteTypeResource: null,
      typeResourceSelectedList: [],
      supervisorAliases: [],
      supervisorAliasesSelect: null,
      domainAccessCode: null,
      errorSupervisorSelect: null,
      errorResourceSelect: null
    };
  },
  async mounted() {
    if (this.typeResourceSelectedList.length === 0) {
      this.$store.dispatch("domainConfig/getDomainConfig").then(response => {
        let incidentAbstractions = response.data.incidentAbstractions;
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
      });
    }

    await this.$store
      .dispatch("domainConfig/getDomainAccessCode")
      .then(response => {
        this.domainAccessCode = response.data.domain_code;
      });

    this.loadDataUserWithId = this.showUserProfiles.id;
    if (this.showUserProfiles.id !== null) {
      this.getDataUser();
    }
  },
  watch: {
    // variable que cuando se le da el id activa el watch, se uso ya que las variables de getter no reaccionan
    // a este, solo las declaradas en el data.
    loadDataUserWithId() {
      if (this.showUserProfiles.id !== null) {
        this.getDataUser();
      }
    }
  },
  methods: {
    onClose() {
      this.showUserProfiles.visible = false;
      this.showUserProfiles.id = null;
      this.name = null;
      this.lastName = null;
      this.adminProfile = null;
      this.resourceProfile = null;
      this.supervisorProfile = null;
      this.resourceProfileActive = false;
      this.adminProfileActive = false;
      this.supervisorProfileActive = false;
      this.adminId = "";
      this.resourceId = "";
      this.supervisorId = "";
      this.supervisorAliasesSelect = null;
      this.errorSupervisorSelect = null;
      this.autoCompleteTypeResource = null;
      this.errorResourceSelect = null;
      this.loadDataUserWithId = null;

      this.$store.commit("uiParams/closeProfileState");
    },

    async getDataUser() {
      let idUser = this.showUserProfiles.id;
      await this.$store
        .dispatch("incident/getUser", { idUser })
        .then(response => {
          this.loadData(response.data);
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
    loadData(dataUser) {
      this.name = dataUser.first_name;
      this.lastName = dataUser.last_name;
      this.adminProfile = dataUser.adminprofile;

      if (this.adminProfile !== null) {
        this.adminProfileActive = true;
        this.adminId = dataUser.adminprofile.id;
      }

      this.resourceProfile = dataUser.resourceprofile;
      if (this.resourceProfile !== null) {
        this.resourceProfileActive = true;
        this.resourceId = dataUser.resourceprofile.id;
      }

      this.supervisorProfile = dataUser.supervisorprofile;
      if (this.supervisorProfile !== null) {
        this.supervisorProfileActive = true;
        this.supervisorId = dataUser.supervisorprofile.id;
      }
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
          this.adminProfileActive = true;
          this.adminProfile = response.data;
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
          this.adminProfileActive = false;
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
      if (this.autoCompleteTypeResource !== null) {
        let ResourceInfo = {
          domain_code: this.domainAccessCode,
          user: this.showUserProfiles.id,
          domain_name: this.domainConfig.name,
          type: this.autoCompleteTypeResource
        };
        await this.$store
          .dispatch("domainConfig/createResource", ResourceInfo)
          .then(async response => {
            this.resourceProfileActive = true;
            this.resourceId = response.data.id;
            this.autoCompleteTypeResource = null;
            this.errorResourceSelect = null;

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
      } else {
        this.errorResourceSelect = "Debe seleccionar un alias";
      }
    },

    async deactivateResource() {
      let resourceId = this.resourceId;
      await this.$store
        .dispatch("incident/deleteResourceProfile", { resourceId })
        .then(async () => {
          this.resourceProfileActive = false;
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
      if (this.supervisorAliasesSelect !== null) {
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
            this.supervisorProfileActive = true;
            this.supervisorAliasesSelect = null;
            this.errorSupervisorSelect = null;

            this.$store.commit("uiParams/dispatchAlert", {
              text: "Se creo el usuario Supervisor",
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
      } else {
        this.errorSupervisorSelect = "Debe seleccionar un alias";
      }
    },

    deactivateSupervisor() {
      let supervisorId = this.supervisorId;
      this.$store
        .dispatch("incident/deleteSupervisorProfile", { supervisorId })
        .then(async () => {
          this.supervisorProfileActive = false;
          this.supervisorProfile = null;
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se elimino correctamente el perfil supervisor",
            color: "success",
            timeout: 5000
          });
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se pudo eliminar el perfil supervisor",
            color: "primary",
            timeout: 5000
          });
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
