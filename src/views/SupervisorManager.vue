<template>
  <v-container fill-width class="pa-0">
    <!--       <v-card v-if="supervisorTable">
          <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
            Supervisores
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="searchName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por nombre"
                  v-on:keyup.enter="serchSupervisor()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="searchLastName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por apellido"
                  v-on:keyup.enter="serchSupervisor()"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-autocomplete
                  v-model="autoCompleteTypeSupervisor"
                  :items="typeSupervisorSelectedList"
                  item-text="name"
                  clearable
                  label="Tipo de supervisor"
                  @change="serchSupervisor()"
                ></v-autocomplete>
              </v-col>

              <v-col cols="6">
                <v-switch
                  v-model="isUserActiveFilter"
                  :label="
                    `${
                      isUserActiveFilter
                        ? 'Usuarios activos'
                        : 'Usuarios no activos'
                    }`
                  "
                  class="pa-3"
                  @change="serchSupervisor()"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text :class="[' black_selected', 'pa-3']">
            <v-data-table
              :loading="loadingTable"
              loading-text="Cargando... Espere por favor"
              v-model="selectedSupervisor"
              show-select
              :single-select="true"
              :headers="headersSupervisor"
              :items="userResourceData"
              item-key="id"
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
          </v-card-actions>
        </v-card>
        <v-card v-if="adminTable">
          <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
            Administradores
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="searchName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por nombre"
                  v-on:keyup.enter="serchAdmin()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="searchLastName"
                  append-icon="mdi-magnify"
                  label="Enter para buscar por apellido"
                  v-on:keyup.enter="serchAdmin()"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-switch
                  v-model="isUserActiveFilter"
                  :label="
                    `${
                      isUserActiveFilter
                        ? 'Usuarios activos'
                        : 'Usuarios no activos'
                    }`
                  "
                  class="pa-3"
                  @change="serchAdmin()"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text :class="[' black_selected', 'pa-3']">
            <v-data-table
              :loading="loadingTable"
              loading-text="Cargando... Espere por favor"
              v-model="selectedAdmin"
              show-select
              :headers="headersAdmin"
              :items="userResourceData"
              item-key="id"
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
          </v-card-actions>
        </v-card>
        -->
  </v-container>
</template>

<script>
export default {
  name: "SupervisorManager",
  data() {
    return {};
  }
};
</script>
