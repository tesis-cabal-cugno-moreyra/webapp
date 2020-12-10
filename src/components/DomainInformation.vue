<template>
  <v-main>
    <v-stepper v-model="stepNumber" vertical>
      <v-stepper-step :complete="stepNumber > 1" step="1" editable
        >Nombre del dominio</v-stepper-step
      >
      <v-stepper-content step="1">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="domainName"
              label="Agregar el nombre del dominio"
              autocomplete="off"
              v-on:keyup.enter="increaseStep()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continuar</v-btn>
        <v-btn
          text
          @click="clearFields"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancelar</v-btn
        >
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 2" step="2" editable
        >Alias del administrador</v-stepper-step
      >
      <v-stepper-content step="2">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="adminAlias"
              label="Agregar alias"
              autocomplete="off"
              v-on:keyup.enter="increaseStep()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continuar</v-btn>
        <v-btn
          text
          @click="clearFields"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancelar</v-btn
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
              <v-btn
                text
                @click="clearFields"
                small
                outlined
                color="grey_selected"
                class="ml-2"
                >Cancelar</v-btn
              >
            </v-form>
            <v-form @submit.prevent="editSupervisor" v-if="!formAddSupervisor">
              <v-text-field
                v-model="textFieldSupervisor"
                label="Editar el nombre del supervisor"
                autocomplete="off"
              ></v-text-field>
              <v-btn color="warning" outlined small type="submit">Editar</v-btn>
              <v-btn
                text
                @click="clearFields"
                small
                outlined
                color="grey_selected"
                class="ml-2"
                >Cancelar</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card sm="6" md="4" width="400" left>
              <v-card-subtitle
                v-if="supervisorAliasesStringList.length == 0 ? true : false"
                >No hay cargados supervisores actualmente</v-card-subtitle
              >
            </v-card>
            <v-form
              v-if="supervisorAliasesStringList.length != 0 ? true : false"
            >
              <v-card sm="6" md="4" width="400" left>
                <v-card-subtitle>Supervisores actuales</v-card-subtitle>

                <v-card-text
                  :class="['pa-2', 'black_selected']"
                  sm="6"
                  md="4"
                  v-for="(item, index) in supervisorAliasesStringList"
                  :key="index"
                >
                  <v-row>
                    <v-col md="9" :class="['ml-2']">
                      {{ item.name }}
                    </v-col>
                    <v-col md="1">
                      <v-btn
                        icon
                        color="success"
                        class="['mr-2','float-right']"
                        small
                        @click="changeFormSupervisor(index)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col md="1">
                      <v-btn
                        icon
                        color="primary"
                        small
                        @click="deleteSupervisor(item.id)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-form>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continuar</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 4" step="4" editable
        >Alias de incidentes</v-stepper-step
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
              <v-textarea
                v-model="detailsSchemaAbstractIncident"
                label="Agregar schema de detalles general, para el alias de incidente"
                hint="Debe ingresarse un JSON válido, compatible con JSON Schema"
              ></v-textarea>
              <v-btn color="success" outlined small type="submit"
                >Agregar</v-btn
              >
              <v-btn
                text
                @click="clearFields"
                small
                outlined
                color="grey_selected"
                class="ml-2"
                >Cancelar</v-btn
              >
            </v-form>
            <v-form @submit.prevent="editIncident" v-if="!formAddIncident">
              <v-text-field
                v-model="textFieldIncident"
                label="Editar un nombre de incidente"
                autocomplete="off"
              ></v-text-field>
              <v-textarea
                v-model="detailsSchemaAbstractIncident"
                label="Editar schema de detalles general, para el alias de incidente"
                hint="Debe ingresarse un JSON válido, compatible con JSON Schema"
              ></v-textarea>
              <v-btn color="warning" outlined small type="submit">Editar</v-btn>
              <v-btn
                text
                @click="clearFields"
                small
                outlined
                color="grey_selected"
                class="ml-2"
                >Cancelar</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card sm="6" md="4" width="400" left>
              <v-card-subtitle
                v-if="incidentAbstractionList.length == 0 ? true : false"
                >No hay incidentes cargados</v-card-subtitle
              >
            </v-card>
            <v-form v-if="incidentAbstractionList.length != 0 ? true : false">
              <v-card sm="6" md="4" width="400" left>
                <v-card-subtitle>Incidentes actuales</v-card-subtitle>
                <v-card-text
                  :class="['pa-2', 'black_selected']"
                  sm="6"
                  md="4"
                  v-for="(item, index) in incidentAbstractionList"
                  :key="index"
                >
                  <v-row>
                    <v-col md="9" :class="['ml-2']">
                      {{ item.name }}
                    </v-col>
                    <v-col md="1">
                      <v-btn
                        icon
                        color="success"
                        class="['mr-2','float-right']"
                        small
                        @click="changeFormIncident(index)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col md="1">
                      <v-btn
                        icon
                        color="primary"
                        small
                        @click="deleteIncident(item.id)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-form>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continuar</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 5" step="5"
        >Alias de tipos de incidentes</v-stepper-step
      >
      <v-stepper-content step="5">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectIncident"
              :items="incidentAbstractionList"
              item-value="id"
              item-text="name"
              :return-object="true"
              hide-selected
              label="Agregar un tipo de incidente"
              persistent-hint
              chips
              @change="IncidentSelected(selectIncident)"
            ></v-select>
          </v-col>
        </v-row>
        <v-form v-if="selectIncident != '' ? true : false">
          <v-row>
            <v-col>
              <v-card sm="6" md="4" width="400" left>
                <v-card-subtitle
                  v-if="TypeListSelected.length == 0 ? true : false"
                  >No hay incidentes cargados actualmente</v-card-subtitle
                >
              </v-card>

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
                    <v-row>
                      <v-col md="9" :class="['ml-2']">
                        {{ item.nameIncident }}
                      </v-col>
                      <v-col md="1">
                        <v-btn
                          icon
                          color="success"
                          class="['mr-2','float-right']"
                          small
                          @click="changeFormTypeIncident(index)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col md="1">
                        <v-btn
                          icon
                          color="primary"
                          small
                          @click="deleteTypeIncident(index)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-form
                @submit.prevent="addTypeIncident"
                v-if="formAddTypeIncident"
              >
                <v-text-field
                  v-model="textFieldTypeIncident"
                  label="Agregar un nombre al tipo de incidente"
                  autocomplete="off"
                ></v-text-field>
                <v-textarea
                  v-model="detailsSchemaTypeIncident"
                  label="Agregar schema de detalles del tipo de incidente"
                  hint="Debe ingresarse un JSON válido, compatible con JSON Schema"
                ></v-textarea>
                <v-btn color="success" outlined small type="submit"
                  >Agregar</v-btn
                >
                <v-btn
                  text
                  @click="clearFields"
                  small
                  outlined
                  color="grey_selected"
                  class="ml-2"
                  >Cancelar</v-btn
                >
              </v-form>
              <v-form
                @submit.prevent="editTypeIncident"
                v-if="!formAddTypeIncident"
              >
                <v-text-field
                  v-model="textFieldTypeIncident"
                  label="Editar el nombre del tipo incidente"
                  autocomplete="off"
                ></v-text-field>
                <v-textarea
                  v-model="detailsSchemaTypeIncident"
                  label="Editar schema de detalles del tipo de incidente"
                  hint="Debe ingresarse un JSON válido, compatible con JSON Schema"
                ></v-textarea>
                <v-btn color="warning" outlined small type="submit"
                  >editar</v-btn
                >
                <v-btn
                  text
                  @click="clearFields"
                  small
                  outlined
                  color="grey_selected"
                  class="ml-2"
                  >Cancelar</v-btn
                >
              </v-form>
            </v-col>
          </v-row>
        </v-form>
        <v-btn color="primary" @click="increaseStep()">Continuar</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepNumber > 6" step="6" editable
        >Tareas comunes de los incidentes</v-stepper-step
      >
      <v-stepper-content step="6">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectIncidentStep6"
              :items="incidentAbstractionList"
              item-value="id"
              item-text="name"
              :return-object="true"
              hide-selected
              label="Seleccionar un tipo de incidente"
              persistent-hint
              chips
              @change="incidentMapPointSelected(selectIncidentStep6)"
            ></v-select>
          </v-col>
          <v-col v-if="!typeIncidentSelectAvalible" cols="12" sm="6" md="4">
            <v-card :class="['pa-2', 'black_selected']">
              <v-card-subtitle>
                No hay Tipo de incidentes cargados para este incidente
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col v-if="typeIncidentSelectAvalible" cols="12" sm="6" md="4">
            <v-select
              v-model="selectedIncidentType"
              :items="TypeListSelected"
              item-value="id"
              item-text="nameIncident"
              :return-object="true"
              :search-input.sync="search"
              hide-selected
              label="Seleccionar un nombre de incidente"
              persistent-hint
              chips
              @change="incidentTypeMapPointSelected(selectedIncidentType)"
              @input.native="course = $event.srcElement.value"
            ></v-select>
          </v-col>
        </v-row>

        <!--tarjetas donde te perimite crear, editar o eliminar map points de un cierto incidente-->
        <v-layout v-if="isMapPointAvaliable">
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
                    >Agregar</v-btn
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
                    label="Editar la tarea"
                  ></v-text-field>
                  <v-btn color="warning" small outlined type="submit"
                    >Editar</v-btn
                  >
                  <v-btn
                    text
                    @click="clearFields"
                    small
                    outlined
                    color="grey_selected"
                    class="ml-2"
                    >Cancelar</v-btn
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
              v-for="(item, index) in MapPointViewSelectedList"
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
                  <v-icon left>mdi-label</v-icon>
                  {{
                    (item.TypeIncident != null
                      ? item.TypeIncident + " - "
                      : "") + item.Incident
                  }}
                </v-chip>
                <p class="mt-2">{{ item.descriptionPoint }}</p>
                <v-btn
                  color="success"
                  class="mr-2"
                  outlined
                  small
                  @click="changeFormMapPoint(index, item)"
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
        <v-btn color="primary" @click="increaseStep()">Continuar</v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="stepNumber > 7" step="7" editable
        >Tipos de recursos</v-stepper-step
      >
      <v-stepper-content step="7">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-form @submit.prevent="addResource" v-if="formAddResource">
              <v-text-field
                v-model="textFieldResource"
                label="Agregar un recurso"
                autocomplete="off"
              ></v-text-field>
              <v-btn color="success" outlined small type="submit"
                >Agregar</v-btn
              >
            </v-form>
            <v-form @submit.prevent="editResource" v-if="!formAddResource">
              <v-text-field
                v-model="textFieldResource"
                label="Modificar el nombre del recurso"
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
                v-if="incidentAbstractionList.length == 0 ? true : false"
                >No hay incidentes cargados actualmente</v-card-subtitle
              >
            </v-card>
            <v-form v-if="resourceSelectedList.length != 0 ? true : false">
              <v-card sm="6" md="4" width="400" left>
                <v-card-subtitle>Recursos actuales</v-card-subtitle>
                <v-card-text
                  :class="['pa-2', 'black_selected']"
                  sm="6"
                  md="4"
                  v-for="(item, index) in resourceSelectedList"
                  :key="index"
                >
                  <v-row>
                    <v-col md="9" :class="['ml-2']">
                      {{ item.descriptionResource }}
                    </v-col>
                    <v-col md="1">
                      <v-btn
                        icon
                        color="success"
                        class="['mr-2','float-right']"
                        small
                        @click="changeFormResource(index)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col md="1">
                      <v-btn
                        icon
                        color="primary"
                        small
                        @click="deleteResource(item.id)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-form>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="increaseStep()">Continuar</v-btn>
        <v-btn
          text
          @click="clearFields"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancelar</v-btn
        >
      </v-stepper-content>
      <v-stepper-step :complete="stepNumber > 8" step="8"
        >Relación entre incidentes y recursos</v-stepper-step
      >
      <v-stepper-content step="8">
        <v-col v-if="!resourceSelectedList.length > 0" cols="12" sm="4" md="6">
          <v-card :class="['black_selected']">
            <v-card-subtitle>
              No hay recursos insertados vuelva al paso anterior
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-form v-if="resourceSelectedList.length > 0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="selectResourceIncident"
                :items="incidentAbstractionList"
                item-value="id"
                item-text="name"
                :return-object="true"
                hide-selected
                label="Seleccionar un incidente"
                persistent-hint
                chips
                @change="resourceIncidentSelected(selectResourceIncident)"
              ></v-select>
            </v-col>
            <v-col
              v-if="!resourceTypeIncidentSelectAvalible"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card :class="['pa-2', 'black_selected']">
                <v-card-subtitle>
                  No hay Tipo de incidentes cargados para este incidente
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col
              v-if="resourceTypeIncidentSelectAvalible"
              cols="12"
              sm="6"
              md="4"
            >
              <v-select
                v-model="selectedResourceIncidentType"
                :items="TypeListSelected"
                item-value="id"
                item-text="nameIncident"
                :return-object="true"
                :search-input.sync="search"
                hide-selected
                label="Seleccionar un tipo de incidente"
                persistent-hint
                chips
                @change="
                  resourceIncidentTypeSelected(selectedResourceIncidentType)
                "
                @input.native="course = $event.srcElement.value"
              ></v-select>
            </v-col>
          </v-row>
          <v-form v-if="isListResourceAvaliable">
            <v-row>
              <v-col cols="12" sm="4" md="8">
                <v-autocomplete
                  v-model="autoCompleteResource"
                  :items="resourceSelectedList"
                  item-text="descriptionResource"
                  multiple
                  label="Seleccione el o los recursos "
                  @change="addResourceSelected(autoCompleteResource)"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-form>
        <v-btn color="primary" @click="increaseStep()">Continuar</v-btn>
        <v-btn
          text
          @click="clearFields"
          outlined
          color="grey_selected"
          class="ml-2"
          >Cancelar</v-btn
        >
      </v-stepper-content>
    </v-stepper>

    <!-- mensajaes de advertencias -->
    <v-snackbar v-model="snackbar" color="primary" :timeout="timeout" top="top">
      {{ messaggeSnackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>

    <!-- mensajes de confirmacion -->
    <v-layout>
      <v-dialog v-model="dialog" width="410">
        <v-card cols="12" sm="4" md="8">
          <v-card-title>{{ messaggeDialog }}</v-card-title>

          <v-card-text></v-card-text>
          <v-card-actions>
            <v-btn color="grey_selected" text @click="dialog = false">No</v-btn>

            <v-btn color="primary" text @click="deleteOrganization()"
              >Continuar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-main>
</template>

<script>
import {
  Domain,
  SupervisorAlias,
  IncidentAbstraction,
  IncidentType,
  MapPointDescription,
  ResourceType
} from "@/domain/initialConfig";
export default {
  name: "DomainInformation",

  data() {
    return {
      domainObject: {},
      snackbar: false,
      dialog: false,
      isMapPointAvaliable: false,
      isListResourceAvaliable: false,
      formDescriptionMapPoint: true,
      formAddSupervisor: true,
      formAddIncident: true,
      formAddTypeIncident: true,
      typeIncidentIsActive: false,
      formAddResource: true,
      typeIncidentSelectAvalible: false,
      resourceTypeIncidentSelectAvalible: false,
      domainName: "",
      newMapDescription: "",
      textFieldSupervisor: "",
      textFieldTypeIncident: "",
      detailsSchemaTypeIncident: "",
      detailsSchemaAbstractIncident: "",
      textFieldIncident: "",
      textFieldResource: "",
      adminAlias: "",
      stepNumber: "1",
      autoCompleteResource: "",
      selectedIncidentType: "",
      search: null,
      supervisorAliasesStringList: [
        /*
        { id: 1, name: "Supervisor" },
        { id: 2, name: "Encargado" },
        { id: 3, name: "Tester" }
     */
      ],
      TypeListSelected: [],
      incidentAbstractionList: [
        /*
        {
          id: 1,
          name: "Incendio",
          incidentTypes: [
            { nameIncident: "casa" },
            { nameIncident: "edificio" },
            { nameIncident: "campo" }
          ]
        },
        { id: 2, name: "Rastrillaje", incidentTypes: [] },
        {
          id: 3,
          name: "Rescate de felino domestico",
          incidentTypes: [
            { nameIncident: "arbol" },
            { nameIncident: "chimenea" }
          ]
        },
        { id: 4, name: "Auxilio", incidentTypes: [] }
     */
      ],
      MapPointSelectedList: [],
      MapPointViewSelectedList: [],
      incidentResourceList: [],
      resourceSelectedList: [],
      name: "",
      messaggeSnackbar: "",
      messaggeDialog: "",
      timeout: 1500,
      selectIncident: "",
      selectIncidentStep6: "",
      selectedResourceIncidentType: "",
      selectResourceIncident: "",
      indexMapPoint: "",
      idMapPoint: "",
      indexResource: "",
      pointerToDelete: ""
    };
  },
  methods: {
    increaseStep() {
      switch (this.stepNumber) {
        case "1":
          if (this.domainName.trim().length === 0) {
            this.domainName = "";
            this.messaggeSnackbar = "Debe ingresar el nobmre del dominio";
            this.snackbar = true;
          } else {
            this.stepNumber = "2";
          }
          break;

        case "2":
          if (this.adminAlias.trim().length === 0 || this.adminAlias === "") {
            this.adminAlias = "";
            this.messaggeSnackbar = "Debe ingresar el alias del administrador";
            this.snackbar = true;
          } else {
            this.stepNumber = "3";
          }
          break;

        case "3":
          if (this.supervisorAliasesStringList.length === 0) {
            this.messaggeSnackbar = "Debe ingresar alias para supervisor/es";
            this.snackbar = true;
          } else {
            this.stepNumber = "4";
          }
          break;

        case "4":
          if (this.incidentAbstractionList.length === 0) {
            this.messaggeSnackbar =
              "Debe ingresar al menos un tipo de incidentes";
            this.snackbar = true;
          } else {
            if (this.typeIncidentIsActive) {
              this.stepNumber = "6";

              this.messaggeSnackbar =
                "Ya no puede modificar los tipos de incidentes";
              this.snackbar = true;
            } else {
              this.textFieldIncident = "";
              this.detailsSchemaAbstractIncident = "";
              this.stepNumber = "5";
            }
          }
          break;

        case "5":
          this.messaggeDialog =
            "No podrá volver a editar este punto, ¿realmente desea continuar?";
          this.pointerToDelete = "";
          this.dialog = true;
          break;

        case "6":
          this.selectIncidentStep6 = null;
          this.selectedIncidentType = null;
          this.isMapPointAvaliable = false;
          this.TypeListSelected = [];
          this.formDescriptionMapPoint = true;
          this.stepNumber = "7";
          break;

        case "7":
          this.textFieldResource = "";
          this.formAddResource = true;
          this.stepNumber = "8";
          break;
        case "8":
          this.selectResourceIncident = null;
          this.isListResourceAvaliable = false;
          this.TypeListSelected = [];
          this.stepNumber = "9";
          this.domainCreate();
          this.supervisorAliasesToDomainObject();
          this.fillDomainWithDependencies();
          this.sendDomainConfig();

          break;

        default:
          break;
      }
    },

    async sendDomainConfig() {
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      await this.$store
        .dispatch("domainConfig/createDomainConfig", this.domainObject)
        .then(async () => {
          await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
          this.messaggeSnackbar = "Creación del dominio exitosa!";
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push({ name: "IncidentsView" });
          }, this.timeout);
        })
        .catch(async () => {
          this.messaggeSnackbar = "No se pudo crear el dominio!";
          this.snackbar = true;
        })
        .finally(
          async () =>
            await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
        );
    },

    domainCreate() {
      const domain = new Domain();
      domain.name = this.domainName;
      this.domainObject = domain;
      this.domainObject.adminAlias = this.adminAlias;
    },

    supervisorAliasesToDomainObject() {
      const supervisorAliasObjects = [];
      this.supervisorAliasesStringList.forEach(supervisorAlias => {
        supervisorAliasObjects.push(new SupervisorAlias(supervisorAlias.name));
      });
      this.domainObject.supervisorAliases = supervisorAliasObjects;
    },

    fillDomainWithDependencies() {
      const incidentAbstractionsObjects = [];
      this.incidentAbstractionList.forEach(incidentAbstraction => {
        const incidentAbstractionInstance = new IncidentAbstraction();
        incidentAbstractionInstance.name = incidentAbstraction.name;
        const incidentTypeObjects = [];

        if (incidentAbstraction.incidentTypes.length > 0) {
          incidentAbstraction.incidentTypes.forEach(incidentType => {
            const incidentTypeInstance = new IncidentType();
            incidentTypeInstance.name = incidentType.nameIncident;
            incidentTypeInstance.detailsSchema =
              incidentType.detailsSchemaIncident;
            const mapPointObjects = [];
            const resourceObjects = [];

            const filteredMapPoints = this.MapPointSelectedList.filter(
              e => e.TypeIncident == incidentType.nameIncident
            );

            const filteredResources = this.incidentResourceList.filter(
              e => e.TypeIncident == incidentType.nameIncident
            );

            filteredMapPoints.forEach(filteredMapPoint => {
              mapPointObjects.push(
                new MapPointDescription(filteredMapPoint.descriptionPoint)
              );
            });
            filteredResources.forEach(filteredResource => {
              filteredResource.Resources.forEach(resource => {
                resourceObjects.push(new ResourceType(resource));
              });
            });

            incidentTypeInstance.descriptions = mapPointObjects;
            incidentTypeInstance.resourceTypes = resourceObjects;
            incidentTypeObjects.push(incidentTypeInstance);
          });
        } else {
          const incidentTypeInstance = new IncidentType();
          incidentTypeInstance.name = incidentAbstractionInstance.name;
          // Delete comment when incident abstraction is done
          incidentTypeInstance.detailsSchema =
            incidentAbstraction.detailsGeneralSchema;
          const mapPointObjects = [];
          const resourceObjects = [];

          const filteredMapPoints = this.MapPointSelectedList.filter(
            e => e.Incident == incidentAbstractionInstance.name
          );

          const filteredResources = this.incidentResourceList.filter(
            e => e.Incident == incidentAbstractionInstance.name
          );

          filteredMapPoints.forEach(filteredMapPoint => {
            mapPointObjects.push(
              new MapPointDescription(filteredMapPoint.descriptionPoint)
            );
          });
          filteredResources.forEach(filteredResource => {
            filteredResource.Resources.forEach(resource => {
              resourceObjects.push(new ResourceType(resource));
            });
          });

          incidentTypeInstance.descriptions = mapPointObjects;
          incidentTypeInstance.resourceTypes = resourceObjects;
          incidentTypeObjects.push(incidentTypeInstance);
        }
        incidentAbstractionInstance.types = incidentTypeObjects;
        incidentAbstractionsObjects.push(incidentAbstractionInstance);
      });

      this.domainObject.incidentAbstractions = incidentAbstractionsObjects;
      this.domainObject.resourceTypes = []; //Los recursos sin relaciones se pierden DOCUMENTAR
    },

    clearFields() {
      switch (this.stepNumber) {
        case "1":
          this.domainName = "";
          break;
        case "2":
          this.adminAlias = "";
          break;
        case "3":
          this.formAddSupervisor = true;
          this.textFieldSupervisor = "";
          break;
        case "4":
          this.formAddIncident = true;

          this.textFieldIncident = "";
          this.detailsSchemaAbstractIncident = "";

          break;
        case "5":
          this.textFieldTypeIncident = "";
          this.detailsSchemaTypeIncident = "";
          this.formAddTypeIncident = true;
          break;
        case "6":
          this.newMapDescription = "";
          this.formDescriptionMapPoint = true;

          break;
        case "7":
          this.textFieldResource = "";
          this.formAddResource = true;
          break;
        case "8":
          this.selectResourceIncident = null;
          this.isListResourceAvaliable = false;
          this.TypeListSelected = [];
          break;
      }
    },
    deleteOrganization() {
      switch (this.stepNumber) {
        case "3":
          this.supervisorAliasesStringList = this.supervisorAliasesStringList.filter(
            e => e.id != this.pointerToDelete
          );
          this.dialog = false;
          this.pointerToDelete = "";
          break;
        case "4":
          this.incidentAbstractionList = this.incidentAbstractionList.filter(
            e => e.id != this.pointerToDelete
          );
          this.dialog = false;
          this.pointerToDelete = "";

          break;

        case "5":
          if (this.pointerToDelete == "") {
            this.selectIncident = "";
            this.textFieldTypeIncident = "";
            this.formAddTypeIncident = true;
            this.dialog = false;
            this.typeIncidentIsActive = true;
            this.stepNumber = "6";
          } else {
            this.TypeListSelected.splice(this.pointerToDelete, 1);
            this.dialog = false;
            this.pointerToDelete = "";
          }

          break;

        case "6":
          this.MapPointSelectedList = this.MapPointSelectedList.filter(
            e => e.id != this.pointerToDelete
          );
          this.MapPointViewSelectedList = this.MapPointViewSelectedList.filter(
            e => e.id != this.pointerToDelete
          );
          this.dialog = false;
          this.pointerToDelete = "";
          break;

        case "7":
          this.resourceSelectedList = this.resourceSelectedList.filter(
            e => e.id != this.pointerToDelete
          );
          this.dialog = false;
          this.pointerToDelete = "";
          break;

        default:
          break;
      }
    },

    addIncident() {
      if (this.textFieldIncident.trim().length === 0) {
        this.messaggeSnackbar = "El campo de incidente esta vacío";
        this.snackbar = true;
        return;
      }
      var incidentIsRepeated = this.incidentAbstractionList.some(
        e =>
          e.name.toLowerCase().trim() ==
          this.textFieldIncident.toLowerCase().trim()
      );
      if (incidentIsRepeated) {
        this.messaggeSnackbar = "El incidente ingresado ya existe";
        this.snackbar = true;
        return;
      }
      if (!this.detailsSchemaAbstractIncident) {
        this.messaggeSnackbar =
          "Debe ingresar un schema de detalles para agregarlo";
        this.snackbar = true;
        return;
      }
      try {
        JSON.parse(this.detailsSchemaAbstractIncident);
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.messaggeSnackbar = "El schema ingresado no es un JSON válido";
          this.snackbar = true;
          return;
        }
        console.error(e);
        return;
      }

      this.incidentAbstractionList.push({
        id: Date.now(),
        name: this.textFieldIncident.trim(),
        detailsGeneralSchema: this.detailsSchemaAbstractIncident,
        incidentTypes: []
      });
      this.textFieldIncident = "";
      this.detailsSchemaAbstractIncident = "";
    },

    deleteIncident(id) {
      this.messaggeDialog = "¿Desea elimninar este incidente?";
      this.dialog = true;
      this.pointerToDelete = id;
    },

    editIncident() {
      if (this.textFieldIncident.trim().length === 0) {
        this.messaggeSnackbar = "El campo de incidente esta vacío";
        this.snackbar = true;
        return;
      }
      if (
        this.textFieldIncident !=
        this.incidentAbstractionList[this.IncidetnIndex].name
      )
        var incidentIsRepeated = this.incidentAbstractionList.some(
          e =>
            e.name.toLowerCase().trim() ==
            this.textFieldIncident.toLowerCase().trim()
        );
      if (incidentIsRepeated) {
        this.messaggeSnackbar = "El incidente ingresado ya existe";
        this.snackbar = true;
        return;
      }

      if (!this.detailsSchemaAbstractIncident) {
        this.messaggeSnackbar =
          "Debe ingresar un schema de detalles para agregarlo";
        this.snackbar = true;
        return;
      }
      try {
        JSON.parse(this.detailsSchemaAbstractIncident);
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.messaggeSnackbar = "El schema ingresado no es un JSON válido";
          this.snackbar = true;
          return;
        }
        console.error(e);
        return;
      }

      this.incidentAbstractionList[
        this.IncidetnIndex
      ].name = this.textFieldIncident;

      this.incidentAbstractionList[
        this.IncidetnIndex
      ].detailsGeneralSchema = this.detailsSchemaAbstractIncident;
      this.textFieldIncident = "";
      this.detailsSchemaAbstractIncident = "";
      this.formAddIncident = true;
    },

    changeFormIncident(IncidetnIndex) {
      this.formAddIncident = false;
      this.textFieldIncident = this.incidentAbstractionList[IncidetnIndex].name;
      this.detailsSchemaAbstractIncident = this.incidentAbstractionList[
        IncidetnIndex
      ].detailsGeneralSchema;
      this.IncidetnIndex = IncidetnIndex;
    },

    addTypeIncident() {
      if (this.textFieldTypeIncident.trim().length === 0) {
        this.messaggeSnackbar =
          "Debe ingresar un tipo de incidente para agregarlo";
        this.snackbar = true;
        return;
      }
      if (!this.detailsSchemaTypeIncident) {
        this.messaggeSnackbar =
          "Debe ingresar un schema de detalles en el tipo de incidente para agregarlo";
        this.snackbar = true;
        return;
      }
      try {
        JSON.parse(this.detailsSchemaTypeIncident);
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.messaggeSnackbar = "El schema ingresado no es un JSON válido";
          this.snackbar = true;
          return;
        }
        console.error(e);
        return;
      }
      var typeIncidentIsRepeated = this.TypeListSelected.some(
        e =>
          e.nameIncident.toLowerCase() ===
          this.textFieldTypeIncident.toLowerCase()
      );
      if (typeIncidentIsRepeated) {
        this.messaggeSnackbar = "El tipo de incidente ingresado ya existe";
        this.snackbar = true;
        return;
      }

      this.TypeListSelected.push({
        nameIncident: this.textFieldTypeIncident,
        detailsSchemaIncident: this.detailsSchemaTypeIncident
      });

      this.textFieldTypeIncident = "";
      this.detailsSchemaTypeIncident = "";
    },

    deleteTypeIncident(index) {
      this.messaggeDialog = "¿Desea eliminar este tipo de incidente?";
      this.dialog = true;
      this.pointerToDelete = index;
    },

    changeFormTypeIncident(indexTypeIncident) {
      this.formAddTypeIncident = false;
      this.textFieldTypeIncident = this.TypeListSelected[
        indexTypeIncident
      ].nameIncident;
      this.detailsSchemaTypeIncident = this.TypeListSelected[
        indexTypeIncident
      ].detailsSchemaIncident;
      this.indexTypeIncident = indexTypeIncident;
    },

    editTypeIncident() {
      if (this.textFieldTypeIncident.trim().length === 0) {
        this.messaggeSnackbar =
          "Debe ingresar un tipo de incidente para agregarlo";
        this.snackbar = true;
        return;
      }
      if (
        this.textFieldTypeIncident !=
        this.TypeListSelected[this.indexTypeIncident].nameIncident
      ) {
        var typeIncidentIsRepeated = this.TypeListSelected.some(
          e =>
            e.nameIncident.toLowerCase().trim() ===
            this.textFieldTypeIncident.toLowerCase().trim()
        );
        if (typeIncidentIsRepeated) {
          this.messaggeSnackbar = "El tipo de incidente ingresado ya existe";
          this.snackbar = true;
          return;
        }
      }

      if (!this.detailsSchemaTypeIncident) {
        this.messaggeSnackbar =
          "Debe ingresar un schema de detalles en el tipo de incidente para agregarlo";
        this.snackbar = true;
        return;
      }
      try {
        JSON.parse(this.detailsSchemaTypeIncident);
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.messaggeSnackbar = "El schema ingresado no es un JSON válido";
          this.snackbar = true;
          return;
        }
        console.error(e);
        return;
      }

      this.TypeListSelected[
        this.indexTypeIncident
      ].nameIncident = this.textFieldTypeIncident;
      this.TypeListSelected[
        this.indexTypeIncident
      ].detailsSchemaIncident = this.detailsSchemaTypeIncident;
      this.textFieldTypeIncident = "";
      this.detailsSchemaTypeIncident = "";
      this.formAddTypeIncident = true;
    },

    editSupervisor() {
      if (this.textFieldSupervisor.trim().length === 0) {
        this.messaggeSnackbar = "Debe ingresar un supervisor para agregarlo";
        this.snackbar = true;
        return;
      }
      if (
        this.supervisorAliasesStringList[
          this.supervisorAliasIndex
        ].name.trim() != this.textFieldSupervisor.trim()
      ) {
        var supervisorIsRepeated = this.supervisorAliasesStringList.some(
          e =>
            e.name.toLowerCase().trim() ==
            this.textFieldSupervisor.toLowerCase().trim()
        );
        if (supervisorIsRepeated) {
          this.messaggeSnackbar = "El supervisor ingresado ya existe";
          this.snackbar = true;
          return;
        }
      }
      this.supervisorAliasesStringList[
        this.supervisorAliasIndex
      ].name = this.textFieldSupervisor;
      this.textFieldSupervisor = "";
      this.formAddSupervisor = true;
    },

    changeFormSupervisor(supervisorAliasIndex) {
      this.formAddSupervisor = false;
      this.textFieldSupervisor = this.supervisorAliasesStringList[
        supervisorAliasIndex
      ].name;
      this.supervisorAliasIndex = supervisorAliasIndex;
    },

    addSupervisor() {
      if (this.textFieldSupervisor.trim().length === 0) {
        this.messaggeSnackbar = "Debe ingresar un supervisor para agregarlo";
        this.snackbar = true;
        return;
      }
      var supervisorIsRepeated = this.supervisorAliasesStringList.some(
        e => e.name.toLowerCase() == this.textFieldSupervisor.toLowerCase()
      );
      if (supervisorIsRepeated) {
        this.messaggeSnackbar = "El supervisor ingresado ya existe";
        this.snackbar = true;
        return;
      }
      this.supervisorAliasesStringList.push({
        id: Date.now(),
        name: this.textFieldSupervisor
      });
      this.textFieldSupervisor = "";
    },

    deleteSupervisor(id) {
      this.messaggeDialog = "¿Desea elimninar este supervisor?";
      this.dialog = true;
      this.pointerToDelete = id;
    },

    IncidentSelected(valueSelected) {
      this.TypeListSelected = "";
      this.TypeListSelected = valueSelected.incidentTypes;
    },

    addMapPoint() {
      if (this.newMapDescription.trim().length === 0) {
        this.messaggeSnackbar = "Debe ingresar la tarea";
        this.snackbar = true;
        return;
      }

      var descriptionIsRepeated = this.MapPointViewSelectedList.some(
        e =>
          e.descriptionPoint.toLowerCase().trim() ==
          this.newMapDescription.toLowerCase().trim()
      );

      if (descriptionIsRepeated) {
        this.messaggeSnackbar = "La tarea ingresada ya existe ";
        this.snackbar = true;
        return;
      }
      const idUnic = Date.now();
      this.MapPointSelectedList.push({
        id: idUnic,
        Incident: this.selectIncidentStep6.name,
        TypeIncident: this.selectedIncidentType.nameIncident,
        descriptionPoint: this.newMapDescription
      });

      this.MapPointViewSelectedList.push({
        id: idUnic,
        Incident: this.selectIncidentStep6.name,
        TypeIncident: this.selectedIncidentType.nameIncident,
        descriptionPoint: this.newMapDescription
      });

      this.newMapDescription = "";
    },

    deleteMapPoint(id) {
      this.messaggeDialog = "¿Desea elimninar esta tarea?";
      this.dialog = true;
      this.pointerToDelete = id;
    },

    changeFormMapPoint(indexMapPointView, itemSelected) {
      this.formDescriptionMapPoint = false;

      this.newMapDescription = this.MapPointViewSelectedList[
        indexMapPointView
      ].descriptionPoint;

      this.indexMapPoint = indexMapPointView;
      this.idMapPoint = itemSelected.id;
    },

    editMapPoint() {
      if (this.newMapDescription.trim().length === 0) {
        this.messaggeSnackbar = "Debe ingresar la tarea";
        this.snackbar = true;
        return;
      }
      if (
        this.MapPointViewSelectedList[this.indexMapPoint].descriptionPoint !=
        this.newMapDescription
      ) {
        var descriptionIsRepeated = this.MapPointViewSelectedList.some(
          e =>
            e.descriptionPoint.toLowerCase().trim() ==
            this.newMapDescription.toLowerCase().trim()
        );

        if (descriptionIsRepeated) {
          this.messaggeSnackbar = "La tarea ingresada ya existe ";
          this.snackbar = true;
          return;
        }
      }

      this.MapPointViewSelectedList[
        this.indexMapPoint
      ].descriptionPoint = this.newMapDescription;
      let idMap = "";
      this.MapPointSelectedList.forEach((mapPoints, index) => {
        if (mapPoints.id == this.idMapPoint) {
          idMap = index;
        }
      });
      this.MapPointSelectedList[
        idMap
      ].descriptionPoint = this.newMapDescription;

      this.formDescriptionMapPoint = true;
      this.newMapDescription = "";
    },

    incidentTypeMapPointSelected(valueSelected) {
      this.MapPointViewSelectedList = this.MapPointSelectedList.filter(
        e => e.TypeIncident == valueSelected.nameIncident
      );
      this.isMapPointAvaliable = true;
      this.formDescriptionMapPoint = true;
      this.newMapDescription = "";
    },

    incidentMapPointSelected(valueSelected) {
      if (valueSelected.incidentTypes.length > 0) {
        this.TypeListSelected = valueSelected.incidentTypes;
        this.typeIncidentSelectAvalible = true;
        this.isMapPointAvaliable = false;
        this.formDescriptionMapPoint = true;
        this.newMapDescription = "";
        return;
      }
      if (valueSelected.incidentTypes.length == 0) {
        this.selectedIncidentType = "";
        this.TypeListSelected = valueSelected.incidentTypes;
        this.typeIncidentSelectAvalible = false;
        this.isMapPointAvaliable = true;
        this.formDescriptionMapPoint = true;
        this.newMapDescription = "";
        this.MapPointViewSelectedList = this.MapPointSelectedList.filter(
          e => e.Incident == valueSelected.name
        );
        return;
      }
    },

    resourceIncidentSelected(incidentSelected) {
      if (incidentSelected.incidentTypes.length > 0) {
        this.TypeListSelected = incidentSelected.incidentTypes;
        this.resourceTypeIncidentSelectAvalible = true;
        this.isListResourceAvaliable = false;
        return;
      }
      if (incidentSelected.incidentTypes.length == 0) {
        this.selectedResourceIncidentType = "";
        this.TypeListSelected = incidentSelected.incidentTypes;
        this.resourceTypeIncidentSelectAvalible = false;
        this.isListResourceAvaliable = true;

        var IncidentFilter = this.incidentResourceList.filter(
          e => e.Incident == incidentSelected.name
        );

        var resourceFilter = [];
        IncidentFilter.forEach(element => {
          if (resourceFilter.length > 0) {
            resourceFilter.pop();
          }
          resourceFilter.push(element.Resources);
        });

        this.autoCompleteResource = resourceFilter[0];

        return;
      }
    },

    resourceIncidentTypeSelected(typeIncidentSelected) {
      this.isListResourceAvaliable = true;

      var IncidentFilter = this.incidentResourceList.filter(
        e => e.TypeIncident == typeIncidentSelected.nameIncident
      );

      var resourceFilter = [];
      IncidentFilter.forEach(element => {
        if (resourceFilter.length > 0) {
          resourceFilter.pop();
        }
        resourceFilter.push(element.Resources);
      });

      this.autoCompleteResource = resourceFilter[0];
    },

    addResource() {
      if (this.textFieldResource.trim().length === 0) {
        this.messaggeSnackbar = "Debe ingresar el recurso";
        this.snackbar = true;
        return;
      }
      var descriptionIsRepeated = this.resourceSelectedList.some(
        resource =>
          resource.descriptionResource.toLowerCase() ==
          this.textFieldResource.toLowerCase()
      );

      if (descriptionIsRepeated) {
        this.messaggeSnackbar = "El recurso ingresado ya existe ";
        this.snackbar = true;
        return;
      }

      this.resourceSelectedList.push({
        id: Date.now(),
        descriptionResource: this.textFieldResource
      });

      this.textFieldResource = "";
    },

    changeFormResource(index) {
      this.formAddResource = false;
      this.textFieldResource = this.resourceSelectedList[
        index
      ].descriptionResource;
      this.indexResource = index;
    },

    editResource() {
      if (this.textFieldResource.trim().length === 0) {
        this.messaggeSnackbar = "Debe ingresar el recurso";
        this.snackbar = true;
        return;
      }
      if (
        this.resourceSelectedList[this.indexResource].descriptionResource !=
        this.textFieldResource
      ) {
        var descriptionIsRepeated = this.resourceSelectedList.some(
          e =>
            e.descriptionResource.toLowerCase().trim() ==
            this.textFieldResource.toLowerCase().trim()
        );

        if (descriptionIsRepeated) {
          this.messaggeSnackbar = "El recurso ingresado ya existe ";
          this.snackbar = true;
          return;
        }
      }

      this.resourceSelectedList[
        this.indexResource
      ].descriptionResource = this.textFieldResource;

      this.formAddResource = true;
      this.textFieldResource = "";
    },

    deleteResource(id) {
      this.messaggeDialog = "¿Desea elimninar este recurso?";
      this.dialog = true;
      this.pointerToDelete = id;
    },

    addResourceSelected(resourcesSelected) {
      if (this.selectedResourceIncidentType.nameIncident != undefined) {
        var filterIncidentList = this.incidentResourceList.filter(
          e => e.Incident == this.selectResourceIncident.name
        );

        var filterIncidentTypeList = filterIncidentList.filter(
          x => x.TypeIncident == this.selectedResourceIncidentType.nameIncident
        );

        if (filterIncidentTypeList.length > 0) {
          this.incidentResourceList = this.incidentResourceList.filter(
            e => e.id != filterIncidentTypeList[0].id
          );
        }
      } else {
        filterIncidentList = this.incidentResourceList.filter(
          e => e.Incident == this.selectResourceIncident.name
        );
        if (filterIncidentList.length > 0) {
          this.incidentResourceList = this.incidentResourceList.filter(
            e => e.id != filterIncidentList[0].id
          );
        }
      }

      var ident = Date.now();
      this.incidentResourceList.push({
        id: ident,
        Incident: this.selectResourceIncident.name,
        TypeIncident: this.selectedResourceIncidentType.nameIncident,
        Resources: resourcesSelected
      });
    }
  }
};
</script>
