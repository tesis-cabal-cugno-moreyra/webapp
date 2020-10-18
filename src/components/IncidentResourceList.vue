<template>
  <v-form>
    <v-btn @click="isComponentEnable = true">
      Mostrar recursos para incidentes</v-btn
    >

    <v-card>
      <v-dialog v-model="isComponentEnable" width="600" persistent dark>
        <v-card-title :class="['pa-4', 'mb-2', 'black_selected']">
          Recursos para relacionar
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Enter para buscar"
            hide-details
            single-line
            v-on:keyup.enter="serchResource()"
          ></v-text-field>
        </v-card-title>

        <v-card-text :class="[' black_selected', 'pa-3']">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :search="search"
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
            next="nextPagination"
          ></v-pagination>
        </v-card-text>

        <v-card-actions :class="['pa-2', 'pb-1', ' black_selected']">
          <v-spacer></v-spacer>
          <v-btn
            :class="['mb-2', 'mr-1', 'primary', 'float-right']"
            @click="proccessInfo()"
            >Continuar</v-btn
          >
          <v-btn
            :class="['pa-0', 'mb-2', 'mr-4', 'primary', 'float-right']"
            @click="isComponentEnable = false"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-dialog>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "incidentResourceList",
  data() {
    return {
      isComponentEnable: false,
      singleSelect: false,
      search: "",
      page: 1,
      numberOfPage: 1,
      selected: [],
      nextPagination: null,
      headers: [
        {
          text: "Nombre del recurso",
          align: "start",
          sortable: false,
          //value: '"user.first_name" + " " + "user.last_name"'
          value: "user.first_name"
        },
        { text: "Tipos de Recursos", sortable: false, value: "type.name" }
      ],
      resourceData: []
    };
  },
  created() {
    this.fetchPage(this.page);
  },
  watch: {
    page() {
      this.fetchPage(this.page);
    }
  },
  methods: {
    async fetchPage(pageNow) {
      await this.$store
        .dispatch(
          "domainConfig/getResource",
          `/api/v1/resources/?page=${pageNow}`
        )
        .then(response => {
          this.resourceData = response.data.results;
          console.log(response);
          this.nextPagination = response.data.next;
          this.numberOfPage = 2;
        })
        .catch(async resp => {
          console.log(resp);
        })
        .finally(
          async () =>
            await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
        );
    },
    async proccessInfo() {
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      let errorPost = "";
      console.log(this.selected);
      this.selected.forEach(async (element, index) => {
        //tan mal estos datos tengo que poner el id del incidente?????? y poner el id del recurso o el eky
        const urlPost =
          "/api/v1/incidents/" +
          element.id +
          "/resources/" +
          element.type.id +
          "/";
        console.log(urlPost);
        await this.$store
          .dispatch("domainConfig/postResourceIncident", urlPost)
          .then(async () => {
            await this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
            console.log("Se cargo");
          })
          .catch(async () => {
            //comparo el indice de el array con la cantidad de elementos para cambiar el mensaje
            if (index == this.selected.length - 1) {
              errorPost =
                errorPost +
                element.user.first_name +
                " " +
                element.user.last_name +
                " ";
            } else {
              errorPost =
                errorPost +
                element.user.first_name +
                " " +
                element.user.last_name +
                ", ";
            }
          })
          .finally(
            async () =>
              await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
          );
        if (errorPost.length > 2) {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "No se pudieron cargar los recursos: " + errorPost,
            color: "primary",
            timeout: 5000
          });
        } else {
          this.$store.commit("uiParams/dispatchAlert", {
            text: "se cargaron corecamente todos los recursos",
            color: "success",
            timeout: 2000
          });
        }
      });
    },
    async serchResource() {
      console.log(this.search);
      await this.$store
        .dispatch(
          "domainConfig/getResource",
          `/api/v1/resources/?user__first_name=${this.search}`
        )
        .then(response => {
          this.resourceData = response.data.results;
          console.log(response);
        })
        .catch(async resp => {
          console.log(resp);
        })
        .finally(
          async () =>
            await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
        );
      this.page = 1;
    }
  }
};
</script>
