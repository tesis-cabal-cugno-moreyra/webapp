<template>
  <div id="app">
    <v-stepper v-model="stepNumber" vertical>
      <v-stepper-step :complete="stepNumber > 1" step="1" editable
        >Nombre del dominio</v-stepper-step
      >
      <v-stepper-content step="1">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-form ref="form">
              <v-text-field
                v-model="domainField"
                label="Agregar el nombre del dominio"
                autocomplete="off"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continue</v-btn>
        <v-btn
          text
          @click="clearComboBox"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancel</v-btn
        >
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 2" step="2" editable
        >Alias del administrador</v-stepper-step
      >
      <v-stepper-content step="2">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-form>
              <v-text-field
                v-model="AdminField"
                label="Agregar alias"
                autocomplete="off"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continue</v-btn>
        <v-btn
          text
          @click="clearComboBox"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancel</v-btn
        >
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 3" step="3" editable
        >Alias de Supervisor/es</v-stepper-step
      >
      <v-stepper-content step="3">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-form @submit.prevent="addSupervisor" v-if="formAddSupervisor">
              <v-text-field
                v-model="textFieldSupervisor"
                label="Agregar un nombre de supervisor"
                autocomplete="off"
              ></v-text-field>
              <v-btn color="success" outlined small type="submit"
                >Agregar</v-btn
              >
            </v-form>
            <v-form @submit.prevent="editSupervisor" v-if="!formAddSupervisor">
              <v-text-field
                v-model="textFieldSupervisor"
                label="Agregar un nombre de supervisor"
                autocomplete="off"
              ></v-text-field>
              <v-btn color="warning" outlined small type="submit">editar</v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card sm="6" md="4" width="400" left>
              <v-card-subtitle
                v-if="itemsSupervisorList.length == 0 ? true : false"
                >No hay cargados supervisores actualmente</v-card-subtitle
              >
            </v-card>
            <v-form v-if="itemsSupervisorList.length != 0 ? true : false">
              <v-card sm="6" md="4" width="400" left>
                <v-card-subtitle>Supervisores actuales</v-card-subtitle>
                <v-card-text
                  :class="['pa-2', 'black_selected']"
                  sm="6"
                  md="4"
                  v-for="(item, index) in itemsSupervisorList"
                  :key="index"
                >
                  {{ item.name }}
                  <v-btn
                    icon
                    color="success"
                    class="['mr-2','float-right']"
                    small
                    @click="changeFormSupervisor(index)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="primary"
                    small
                    @click="deleteSupervisor(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-form>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continue</v-btn>
        <v-btn
          text
          @click="clearComboBox"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancel</v-btn
        >
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 4" step="4" editable
        >Nombres de incidentes</v-stepper-step
      >
      <v-stepper-content step="4">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-form @submit.prevent="addIncident" v-if="formAddIncident">
              <v-text-field
                v-model="textFieldIncident"
                label="Agregar un nombre de incidente"
                autocomplete="off"
              ></v-text-field>
              <v-btn color="success" outlined small type="submit"
                >Agregar</v-btn
              >
            </v-form>
            <v-form @submit.prevent="editIncident" v-if="!formAddIncident">
              <v-text-field
                v-model="textFieldIncident"
                label="Agregar un nombre de incidente"
                autocomplete="off"
              ></v-text-field>
              <v-btn color="warning" outlined small type="submit">editar</v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card sm="6" md="4" width="400" left>
              <v-card-subtitle
                v-if="itemsIncidenteList.length == 0 ? true : false"
                >No hay incidentes cargados actualmente</v-card-subtitle
              >
            </v-card>
            <v-form v-if="itemsIncidenteList.length != 0 ? true : false">
              <v-card sm="6" md="4" width="400" left>
                <v-card-subtitle>Incidentes actuales</v-card-subtitle>
                <v-card-text
                  :class="['pa-2', 'black_selected']"
                  sm="6"
                  md="4"
                  v-for="(item, index) in itemsIncidenteList"
                  :key="index"
                >
                  {{ item.name }}
                  <v-btn
                    icon
                    color="success"
                    class="['mr-2','float-right']"
                    small
                    @click="changeFormIncident(index)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="primary"
                    small
                    @click="deleteIncident(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-form>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continue</v-btn>
        <v-btn
          text
          @click="clearComboBox"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancel</v-btn
        >
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 5" step="5" editable
        >Tipos de incidentes</v-stepper-step
      >
      <v-stepper-content step="5">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="comboIncident"
              :items="itemsIncidenteList"
              item-value="id"
              item-text="name"
              :return-object="true"
              :search-input.sync="search"
              hide-selected
              label="Agregar un tipo de incidente"
              persistent-hint
              chips
              @change="IncidentSelected(comboIncident)"
              @input.native="course = $event.srcElement.value"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No se encuentra el supervisor "
                      <strong>{{ search }}</strong
                      >". Presione <kbd>enter</kbd> para ingresarlo
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-form
              @submit.prevent="addTypeIncident"
              v-if="formAddTypeIncident"
            >
              <v-text-field
                v-model="textFieldIncident"
                label="Agregar un nombre al tipo de incidente"
                autocomplete="off"
              ></v-text-field>
              <v-btn color="success" outlined small type="submit"
                >Agregar</v-btn
              >
            </v-form>
            <v-form
              @submit.prevent="editTypeIncident"
              v-if="!formAddTypeIncident"
            >
              <v-text-field
                v-model="textFieldIncident"
                label="Edotar el nombre del tipo incidente"
                autocomplete="off"
              ></v-text-field>
              <v-btn color="warning" outlined small type="submit">editar</v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-form v-if="TypeListSelected.length != 0 ? true : false">
              <v-card sm="6" md="4" width="400" left>
                <v-card-subtitle>Tipos de incidente actuales</v-card-subtitle>
                <v-card-text
                  :class="['pa-2', 'black_selected']"
                  sm="6"
                  md="4"
                  v-for="(item, index) in TypeListSelected"
                  :key="index"
                >
                  {{ item.nameIncident }}
                  <v-btn
                    icon
                    color="success"
                    class="['mr-2','float-right']"
                    small
                    @click="changeFormSupervisor(index)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="primary"
                    small
                    @click="deleteSupervisor(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
        <v-btn color="primary" @click="increaseStep()">Continue</v-btn>
        <v-btn
          text
          @click="clearComboBox"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancel</v-btn
        >
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 6" step="6" editable
        >Tareas comunes de los incidentes</v-stepper-step
      >
      <v-stepper-content step="6">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="comboIncident"
              :items="itemsIncidenteList"
              item-value="id"
              item-text="name"
              :return-object="true"
              :search-input.sync="search"
              hide-selected
              label="Agregar un tipo de incidente"
              persistent-hint
              chips
              @change="IncidentSelected(comboIncident)"
              @input.native="course = $event.srcElement.value"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No se encuentra el supervisor "
                      <strong>{{ search }}</strong
                      >". Presione <kbd>enter</kbd> para ingresarlo
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="comboIncidentType"
              :items="TypeListSelected"
              item-value="id"
              item-text="nameIncident"
              :return-object="true"
              :search-input.sync="search"
              hide-selected
              label="Agregar un nombre de incidente"
              persistent-hint
              chips
              @input.native="course = $event.srcElement.value"
            ></v-select>
          </v-col>
        </v-row>

        <!--tarjetas donde te perimite crear, editar o eliminar map points de un cierto incidente-->
        <v-layout>
          <v-flex md4 v-if="formDescriptionMapPoint">
            <v-card
              :class="['mb-2', 'pa-2', 'mr-3', 'black_selected']"
              sm="6"
              md="4"
            >
              <v-card-text>
                <v-form @submit.prevent="addMapPoint">
                  <v-text-field
                    v-model="newMapDescription"
                    label="Descripcion de la tarea"
                  ></v-text-field>
                  <v-btn color="success" outlined small type="submit"
                    >Agregar descripción</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex md4 v-if="!formDescriptionMapPoint">
            <v-card
              :class="['mb-2', 'pa-2', 'mr-3', 'black_selected']"
              sm="6"
              md="4"
            >
              <v-card-text>
                <v-form @submit.prevent="editMapPoint">
                  <v-text-field
                    v-model="newMapDescription"
                    label="Descripcion de la tarea"
                  ></v-text-field>
                  <v-btn color="warning" small outlined type="submit"
                    >Editar descripción</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex md4>
            <v-card
              :class="['mb-2', 'pa-2', 'black_selected']"
              sm="6"
              md="4"
              v-for="(item, index) in MapPointSelectedList"
              :key="index"
            >
              <v-card-text>
                <v-chip
                  small
                  label
                  class="mb-1"
                  color="grey_selected"
                  text-color="white"
                >
                  <v-icon left>label</v-icon>
                  {{ item.IncidentType + " - " + item.Incident }}
                </v-chip>
                <p class="mt-2">{{ item.descriptionPoint }}</p>
                <v-btn
                  color="success"
                  class="mr-2"
                  outlined
                  small
                  @click="changeFormMapPoint(index)"
                  >Editar</v-btn
                >
                <v-btn
                  color="primary"
                  outlined
                  small
                  @click="deleteMapPoint(item.id)"
                  >Eliminar</v-btn
                >
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="increaseStep()">Continue</v-btn>
        <v-btn
          text
          @click="clearComboBox"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancel</v-btn
        >
      </v-stepper-content>
      <v-stepper-step :complete="stepNumber > 7" step="7" editable
        >Tipos de recursos</v-stepper-step
      >
      <v-stepper-content step="7">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-combobox
              v-model="comboResource"
              :items="itemsResource"
              item-value="id"
              item-text="name"
              :return-object="true"
              :search-input.sync="search"
              hide-selected
              label="Agregar el nombre de un recurso"
              multiple
              persistent-hint
              chips
              @input.native="course = $event.srcElement.value"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No se encuentra el recurso "
                      <strong>{{ search }}</strong
                      >". Presione <kbd>enter</kbd> para ingresarlo
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              v-model="AutoCompleteIncident"
              item-text="name"
              hide-selected
              label="seleccionar un incidente"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-btn color="primary" @click="increaseStep()">Continue</v-btn>
        <v-btn
          text
          @click="clearComboBox"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancel</v-btn
        >
      </v-stepper-content>
    </v-stepper>

    <!-- mensajaes de advertencias -->
    <v-snackbar v-model="snackbar" color="primary" :timeout="timeout" top="top">
      {{ messagge }}
      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
//props: { e1: Number};
export default {
  name: "DomainInformation",

  data() {
    return {
      snackbar: false,
      formDescriptionMapPoint: true,
      formAddSupervisor: true,
      formAddIncident: true,
      formAddTypeIncident: true,
      domainField: "",
      newMapDescription: "",
      textFieldSupervisor: "",
      textFieldIncident: "",
      TypeListSelected: [],
      AdminField: "",
      stepNumber: "1",
      comboSupervisor: "",
      AutoCompleteIncident: "",
      search: null,
      itemsSupervisorList: [
        { id: 1, name: "Supervisor" },
        { id: 2, name: "Encargado" },
        { id: 3, name: "Tester" }
      ],
      comboIncidentType: "",
      comoboIncident: "",
      itemsIncidenteList: [
        {
          id: 1,
          name: "Incendio",
          nameType: [
            { nameIncident: "casa" },
            { nameIncident: "edificio" },
            { nameIncident: "campo" }
          ]
        },
        { id: 2, name: "Rastrillaje", nameType: [] },
        {
          id: 3,
          name: "Rescate de felino domestico",
          nameType: [{ nameIncident: "arbol" }, { nameIncident: "chimenea" }]
        },
        { id: 4, name: "Auxilio", nameType: [] }
      ],
      MapPointSelectedList: [
        {
          id: 1,
          IncidentType: "Incendio",
          Incident: "Casa",
          descriptionPoint: "Cuerpo humano"
        },
        {
          id: 4,
          IncidentType: "Incendio",
          Incident: "Casa",
          descriptionPoint: "Foco de incendio"
        },
        {
          id: 3,
          IncidentType: "Incendio",
          Incident: "Casa",
          descriptionPoint: "Garrafa"
        }
      ],
      itemsResource: [],
      name: "",
      messagge: "",
      timeout: 1500,
      comboIncident: "",
      comboResource: "",
      indexMapPoint: ""
    };
  },
  methods: {
    increaseStep() {
      switch (this.stepNumber) {
        case "1":
          if (this.domainField.trim().length === 0) {
            this.domainField = "";
            this.messagge = "Debe ingresar el nobmre del dominio";
            this.snackbar = true;
          } else {
            this.stepNumber = "2";
          }
          break;

        case "2":
          if (this.AdminField.trim().length === 0 || this.AdminField === "") {
            this.AdminField = "";
            this.messagge = "Debe ingresar el alias del administrador";
            this.snackbar = true;
          } else {
            this.stepNumber = "3";
          }
          break;

        case "3":
          if (
            this.comboSupervisor.length === 0 ||
            this.comboSupervisor === ""
          ) {
            this.messagge = "Debe ingresar alias para supervisor/es";
            this.snackbar = true;
          } else {
            this.stepNumber = "4";
          }
          break;

        case "4":
          if (this.comboIncident.length === 0 || this.comboIncident === "") {
            this.messagge = "Debe ingresar al menos un tipo de incidentes";
            this.snackbar = true;
          } else {
            this.stepNumber = "5";
          }
          break;

        case "5":
          if (this.comboResource.length === 0 || this.comboResource === "") {
            this.messagge = "Debe ingresar al menos un tipo de recursos";
            this.snackbar = true;
          } else {
            this.stepNumber = "6";
          }
          break;
        default:
          console.log("fuera");
          console.log(this.stepNumber);
          break;
      }
    },

    clearComboBox() {
      switch (this.stepNumber) {
        case "1":
          this.domainField = "";
          break;
        case "2":
          this.AdminField = "";
          break;
        case "3":
          this.comboSupervisor = "";
          break;
        case "4":
          this.comboIncident = "";
          break;
        case "5":
          this.comboResource = "";
          break;
      }
    },

    addMapPoint() {
      if (this.newMapDescription.trim().length === 0) {
        this.messagge = "Debe ingresar la tarea";
        this.snackbar = true;
        return;
      }

      var descriptionIsRepeated = this.MapPointSelectedList.some(
        e =>
          e.descriptionPoint.toLowerCase() ==
          this.newMapDescription.toLowerCase()
      );

      if (descriptionIsRepeated) {
        this.messagge = "La tarea ingresada ya existe ";
        this.snackbar = true;
        return;
      }

      this.MapPointSelectedList.push({
        id: Date.now(),
        IncidentType: "Incendio",
        Incident: "Casa",
        descriptionPoint: this.newMapDescription
      });

      this.newMapDescription = "";
    },

    deleteMapPoint(id) {
      if (confirm("Desea elimninar esta tarea?")) {
        this.MapPointSelectedList = this.MapPointSelectedList.filter(
          e => e.id != id
        );
      }
    },
    addIncident() {
      if (this.textFieldIncident.trim().length === 0) {
        this.messagge = "El campo de incidente esta vacío";
        this.snackbar = true;
        return;
      }
      var incidentIsRepeated = this.itemsIncidenteList.some(
        e =>
          e.name.toLowerCase().trim() ==
          this.textFieldIncident.toLowerCase().trim()
      );
      if (incidentIsRepeated) {
        this.messagge = "El incidente ingresado ya existe";
        this.snackbar = true;
        return;
      }
      this.itemsIncidenteList.push({
        id: Date.now(),
        name: this.textFieldIncident.trim(),
        nameType: []
      });
      this.textFieldIncident = "";
    },
    deleteIncident(id) {
      if (confirm("Desea elimninar este incidente?")) {
        this.itemsIncidenteList = this.itemsIncidenteList.filter(
          e => e.id != id
        );
      }
    },
    editIncident() {
      this.itemsIncidenteList[this.IncidetnIndex].name = this.textFieldIncident;
      this.textFieldIncident = "";
      this.formAddIncident = true;
    },
    changeFormIncident(IncidetnIndex) {
      this.formAddIncident = false;
      this.textFieldIncident = this.itemsIncidenteList[IncidetnIndex].name;
      this.IncidetnIndex = IncidetnIndex;
    },

    addSupervisor() {
      if (this.textFieldSupervisor.trim().length === 0) {
        this.messagge = "Debe ingresar un supervisor para agregarlo";
        this.snackbar = true;
        return;
      }
      var supervisorIsRepeated = this.itemsSupervisorList.some(
        e => e.name.toLowerCase() == this.textFieldSupervisor.toLowerCase()
      );
      if (supervisorIsRepeated) {
        this.messagge = "El supervisor ingresado ya existe";
        this.snackbar = true;
        return;
      }
      this.itemsSupervisorList.push({
        id: Date.now(),
        name: this.textFieldSupervisor
      });
      this.textFieldSupervisor = "";
    },

    deleteSupervisor(id) {
      if (confirm("Desea elimninar este supervisor?")) {
        this.itemsSupervisorList = this.itemsSupervisorList.filter(
          e => e.id != id
        );
      }
    },

    changeFormMapPoint(index) {
      this.formDescriptionMapPoint = false;
      this.newMapDescription = this.MapPointSelectedList[
        index
      ].descriptionPoint;
      this.indexMapPoint = index;
    },
    editMapPoint() {
      this.MapPointSelectedList[
        this.indexMapPoint
      ].descriptionPoint = this.newMapDescription;
      this.newMapDescription = "";
      this.formDescriptionMapPoint = true;
    },
    editSupervisor() {
      this.itemsSupervisorList[
        this.supervisorAliasIndex
      ].name = this.textFieldSupervisor;
      this.textFieldSupervisor = "";
      this.formAddSupervisor = true;
    },
    changeFormSupervisor(supervisorAliasIndex) {
      this.formAddSupervisor = false;
      this.textFieldSupervisor = this.itemsSupervisorList[
        supervisorAliasIndex
      ].name;
      this.supervisorAliasIndex = supervisorAliasIndex;
    },
    IncidentSelected(valueSelected) {
      this.TypeListSelected = "";
      this.TypeListSelected = valueSelected.nameType;
    }
  }
};
</script>
