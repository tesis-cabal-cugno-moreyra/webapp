<template>
  <v-container>
    <v-btn class="red_selected" @click="registerDialog = 'true'"
      >Registro</v-btn
    >

    <!--  dialog registro-->
    <v-row justify="center">
      <v-dialog v-model="registerDialog" max-width="600px" sm="6" md="4">
        <template></template>
        <v-card>
          <v-form @submit.prevent="RegisterUserData">
            <v-card-title>
              <span class="headline">Formulario de registro</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="UserName"
                      label="Nombre*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="UserLastName"
                      label="Apellido*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="UserEmail"
                      label="Email *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="UserPass"
                      label="Contraseña *"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="UserAge"
                      type="number"
                      min="1"
                      max="120"
                      label="Edad *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="UserClass"
                      :items="[
                        'Bombero raso',
                        'Supervisor',
                        'administrador',
                        'tester'
                      ]"
                      label="Cargo a ocupar"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>* Campos requeridos</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="registerDialog = false"
                type="submit"
                >Ingresar Datos</v-btn
              >
              <v-btn color="blue darken-1" text @click="registerDialog = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- fin dialog registro-->

    <!-- mensjaes de advertencia -->
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ Messagge }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <!-- Fin mensjaes de advertencia -->
  </v-container>
</template>

<script>
export default {
  name: "SignIn",

  data: () => ({
    registerDialog: false,
    Messagge: "",
    snackbar: false,
    timeout: 2000,
    UserName: "",
    UserPass: "",
    UserLastName: "",
    UserEmail: "",
    UserClass: "",
    UserAge: ""
  }),
  methods: {
    RegisterUserData() {
      if (
        this.UserName === "" ||
        this.UserAge === "" ||
        this.UserEmail === "" ||
        this.UserLastName === "" ||
        this.UserPass === ""
      ) {
        console.log("cuenta: " + this.UserName + ", age: " + this.UserAge);
        this.Messagge = "Complete los datos requeridos para continuar";
        this.snackbar = true;
        this.registerDialog = true;
      } else {
        this.registerDialog = false;
        console.log("cuenta: " + this.UserName + ", asd: " + this.UserAge);
      }
    }
  }
};
</script>
