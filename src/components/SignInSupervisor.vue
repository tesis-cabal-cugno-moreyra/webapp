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
              <v-btn color="primary" text v-on:click="validatedRegister()"
                >OK</v-btn
              >
              <v-btn
                color="primary"
                text
                @click="$store.state.uiParams.showSignInSupervisor = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-form>
  </v-main>
</template>

<script>
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
      ]
    };
  },
  methods: {
    validatedRegister() {
      if (this.$refs.form.validate()) {
        console.log("Datos para pasar al la api");
        console.log(
          this.userName +
            " " +
            this.name +
            " " +
            this.lastName +
            " " +
            this.email +
            " " +
            this.password +
            " " +
            this.confirmPassword +
            " " +
            this.supervisorAliasesSelect
        );
      } else {
        console.log("no se va a la api por logi");
      }
    }
  }
};
</script>

<style></style>
