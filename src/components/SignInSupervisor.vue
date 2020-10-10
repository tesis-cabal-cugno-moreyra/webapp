<template>
  <v-main>
    <v-form ref="form" lazy-validation>
      <v-row justify="center">
        <v-dialog
          v-model="$store.state.uiParams.showSignInSupervisor"
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Registro de supervisor</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row
                  ><v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="userName"
                      :rules="UserNameRules"
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
                      label="Repita la contraseña  *"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="supervisorAliasesSelect"
                      :items="supervisorAliases"
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
                text
                v-on:click="validateAndCreateSupervisor()"
                >OK</v-btn
              >
              <v-btn color="primary" text @click="onClose()">Close</v-btn>
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
  name: "SignInSupervisor",
  data: function() {
    return {
      adminMessaggeProblem: false,
      messaggeProblem: "",
      supervisorAliases: [
        { name: "Bombero" },
        { name: "Oficial" },
        { name: "Suboficial" }
      ],
      userName: "",
      name: "",
      lastName: "",
      UserNameRules: [
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
      supervisorAliasesSelect: null,
      password: "",
      confirmPassword: "",
      confirmPasswordRules: [
        v => !!v || "Debe repetir la contraseña",
        v => v == this.password || "Las contreñas no son iguales"
      ],
      errorEmailField: null,
      errorUserNameField: null
    };
  },
  methods: {
    clearCustomErrors() {
      this.errorEmailField = null;
      this.errorUserNameField = null;
    },
    onClose() {
      this.clearCustomErrors();
      this.$store.state.uiParams.showSignInSupervisor = false;
    },
    // nombre de dominio "DominioPersonalizado"
    async validateAndCreateSupervisor() {
      this.clearCustomErrors();
      let isValid = this.$refs.form.validate();
      console.log(this.$refs.form.validate());
      if (isValid) {
        let userInfo = {
          username: this.userName,
          password: this.password,
          first_name: this.name,
          last_name: this.lastName,
          email: this.email,
          domain_code: this.domainCode
        };
        // last correct code SUSRFK3P6I

        await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
        await this.$store
          .dispatch("domainConfig/createUser", userInfo)
          .then(async response => {
            let userId = response.data.id;
            this.createSupervisorProfile(userId);
          })
          .catch(async responseError => {
            console.log(responseError);
            if (responseError.data.email) {
              this.errorEmailField = "Este email ya se encuetra registrado";
              return;
            }
            if (responseError.data.username) {
              this.errorUserNameField =
                "Este usuario ya se encuetra registrado";
              return;
            }
            this.$store.commit("uiParams/dispatchAlert", {
              text: "Problemas para crear usuario",
              color: "primary"
            });
          })
          .finally(
            async () =>
              await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
          );
      } else {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "Debe rellenar todos los campos",
          color: "primary"
        });
      }
    },

    async createSupervisorProfile(userId) {
      // el domain_name esta hardcodeado por que se necesita traer el nombre del store lo esta haciendo emi
      let supervisorInfo = {
        domain_code: this.domainCode,
        user: userId,
        domain_name: "DominioPersonalizado",
        alias: this.supervisorAliasesSelect
      };

      // Luego de creado el usuario, le da sus valores a el supervisor
      await this.$store
        .dispatch("domainConfig/createSupervisor", supervisorInfo)
        .then(async resp => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Creacion del usuario supervisor exitosa",
            color: "success"
          });
          console.log(resp);
        })
        .catch(async () => {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Problemas dentro de la creacion del supervisor",
            color: "primary"
          });
        });
    }
  },
  computed: {
    ...mapGetters({
      domainCode: "domainConfig/domainCode"
    })
  }
};
</script>

<style></style>
