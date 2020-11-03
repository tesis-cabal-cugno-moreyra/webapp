<template>
  <v-app>
    <v-container fill-height fill-width fluid class="pa-0">
      <v-div class="col-md-3">
        <v-row align="center" justify="center">
          <v-col cols="2" sm="12" md="12">
            <v-btn
              rounded
              color="primary"
              width="250"
              dark
              x-large
              class="ma-5 pa-5"
              v-on:click="createIncident"
            >
              Ver Recursos
            </v-btn>
          </v-col>
          <v-col cols="2" sm="12" md="12">
            <v-btn
              rounded
              color="primary"
              width="250"
              dark
              x-large
              class="ma-5 pa-5"
            >
              Ver Supervisores
            </v-btn>
          </v-col>
          <v-col cols="2" sm="12" md="12">
            <v-btn
              rounded
              color="primary"
              width="250"
              dark
              x-large
              class="ma-5 pa-5"
            >
              Ver Administradores
            </v-btn>
          </v-col>
        </v-row>
      </v-div>

      <v-divider vertical></v-divider>
      <v-div class="col-md-8">
        <v-card>
          <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
            Recursos para relacionar
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="searchName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por nombre"
                  v-on:keyup.enter="serchResource()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="searchLastName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por apellido"
                  v-on:keyup.enter="serchResource()"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-autocomplete
                  v-model="autoCompleteTypeResource"
                  :items="typeResourceSelectedList"
                  item-text="name"
                  clearable
                  label="Tipo de recurso"
                  @change="serchResource()"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text :class="[' black_selected', 'pa-3']">
            <v-data-table
              :loading="loadingTable"
              loading-text="Cargando... Espere por favor"
              v-model="selected"
              :headers="headers"
              :items="resourceData"
              :single-select="singleSelect"
              item-key="id"
              show-select
              :class="['pb-1']"
              hide-default-footer
            >
            </v-data-table>
            <v-pagination
              v-model="page"
              class="my-4"
              :total-visible="10"
              :length="numberOfPage"
            ></v-pagination>
          </v-card-text>

          <v-card-actions :class="['pa-2', 'pb-1', ' black_selected']">
            <v-spacer></v-spacer>
            <v-btn
              :loading="loadingProcessInfo"
              :class="['mb-2', 'mr-1', 'primary', 'float-right']"
              v-on:click="proccessInfo()"
              >Continuar</v-btn
            >
            <v-btn
              :class="['pa-0', 'mb-2', 'mr-4', 'primary', 'float-right']"
              @click="isComponentEnable = false"
              >Cerrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  //name: userManager,
  data() {
    return {
      referenceSearch: {
        user__first_name: "",
        user__last_name: "",
        type__name: "",
        page: 1
      },
      loadingTable: false,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "user.first_name"
        },
        { text: "Apellido", sortable: false, value: "user.last_name" },
        { text: "Tipos de Recursos", sortable: false, value: "type.name" }
      ],
      resourceData: []
    };
  }
};
</script>
