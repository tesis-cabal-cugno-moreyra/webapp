<template>
  <v-main>
    <v-form ref="form" lazy-validation>
      <v-row justify="center">
        <v-dialog v-model="showSignInResource" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Registro de Recursos</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row
                  ><v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="userName"
                      :rules="userNameRules"
                      autocomplete="off"
                      label="Nombre de usuario*"
                      :error-messages="errorUserNameField"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="name"
                      :rules="[v => !!v || 'El nombre es obligatorio']"
                      autocomplete="off"
                      label="Nombre*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="lastName"
                      :rules="[v => !!v || 'El apellido es obligatorio']"
                      label="Apellido*"
                      required
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="11">
                    <v-text-field
                      label="Email *"
                      required
                      autocomplete="off"
                      v-model="email"
                      :rules="emailRules"
                      :error-messages="errorEmailField"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="password"
                      :rules="[
                        v => !!v || 'La contraseña es obligatoria',
                        v =>
                          (v && v.length > 5) ||
                          'Debe tener mas de 5 caracteres'
                      ]"
                      label="Contraseña *"
                      type="password"
                      required
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      label="Repita la contraseña *"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="autoCompleteTypeResource"
                      :items="typeResourceSelectedList"
                      item-text="name"
                      label="Cargo a ocupar"
                      :rules="[v => !!v || 'Debe seleccionar un alias']"
                      required
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>* Campos requeridos</small>
            </v-card-text>
            <v-card-actions :class="['mb-2', 'pa-1', 'mr-3']">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :loading="loadingCreate"
                text
                v-on:click="validateAndCreateResource()"
                >Enviar</v-btn
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
  name: "SignInResource",

  data: function() {
    return {
      loadingCreate: false,
      userName: "",
      name: "",
      lastName: "",
      userNameRules: [
        v => !!v || "El nombre de usuario es obligatorio",
        v =>
          (v && v.length <= 15) ||
          "El nombre de usuario no debe exceder los 15 caracteres"
      ],
      email: "",
      emailRules: [
        v => !!v || "El E-mail es obligatorio",
        v => /.+@.+\..+/.test(v) || "El e-mail debe ser valido"
      ],
      autoCompleteTypeResource: "",
      typeResourceSelectedList: [],
      password: "",
      confirmPassword: "",
      confirmPasswordRules: [
        v => !!v || "Debe repetir la contraseña",
        v => v == this.password || "Las contreñas no son iguales"
      ],
      errorEmailField: null,
      errorUserNameField: null,
      domainAccessCode: null
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
  },
  methods: {
    clearCustomErrors() {
      this.errorEmailField = null;
      this.errorUserNameField = null;
    },
    onClose() {
      this.$store.commit("uiParams/changeSignInResourceState", false);
    },
    async validateAndCreateResource() {
      this.loadingCreate = true;
      this.clearCustomErrors();
      let isValid = this.$refs.form.validate();
      if (isValid) {
        let userInfo = {
          username: this.userName,
          password: this.password,
          first_name: this.name,
          last_name: this.lastName,
          email: this.email,
          domain_code: this.domainAccessCode
        };
        await this.$store
          .dispatch("domainConfig/createUser", userInfo)
          .then(response => {
            let userId = response.data.id;
            this.createResourceProfile(userId);
          })
          .catch(async responseError => {
            if (responseError.data.email) {
              this.errorEmailField = "Este email ya se encuetra registrado";
            }
            if (responseError.data.username) {
              if (
                responseError.data.username ==
                "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."
              ) {
                this.errorUserNameField =
                  "El usuario solo puede contener: letras, numeros y/o @/./+/-/_";
                return;
              }
              this.errorUserNameField =
                "Este usuario ya se encuetra registrado";
              return;
            }
            if (!responseError.data.email && !responseError.data.username) {
              this.$store.commit("uiParams/dispatchAlert", {
                text: "Problemas para crear usuario intente luego",
                color: "primary"
              });
            }
          })
          .finally(async () => {
            this.loadingCreate = false;
          });
      } else {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "Debe rellenar todos los campos",
          color: "primary"
        });
      }
    },
    async createResourceProfile(userId) {
      let ResourceInfo = {
        domain_code: this.domainAccessCode,
        user: userId,
        domain_name: this.domainConfig.name,
        type: this.autoCompleteTypeResource
      };

      // Luego de creado el usuario, le da sus valores a el recurso
      await this.$store
        .dispatch("domainConfig/createResource", ResourceInfo)
        .then(async () => {
          this.onClose();
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Se creo el usuario recurso, debe esperar habilitacion",
            color: "success",
            timeout: 5000
          });
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Problemas dentro de la creacion del recurso",
            color: "primary"
          });
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
