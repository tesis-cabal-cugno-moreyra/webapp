<template>
  <div>
    <v-row justify="center">
      <v-text-field
        id="place"
        v-model="place"
        label="Lugar"
        name="place"
        type="text"
        class="ma-1 pa-2"
      ></v-text-field>
      <v-btn color="secundary" class="ma-2" dark @click="dialog = false">
        Buscar
      </v-btn>
      <v-btn color="primary" class="ma-2" dark @click="dialog = true">
        Ver mapa
      </v-btn>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar dark color="primary" style="flex: 0 0 auto;">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Buscar el lugar del incidente</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">
                Guardar
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-row justify="center">
              <v-text-field
                id="place"
                v-model="place"
                label="Lugar"
                name="place"
                type="text"
              ></v-text-field>
              <v-btn
                color="secundary"
                class="ma-2"
                dark
                @click="dialog = false"
              >
                Buscar
              </v-btn>
            </v-row>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "MapModal",
  data() {
    return {
      dialog: false,
      dialog2: false,
      dialog3: false,
      notifications: false,
      sound: true,
      widgets: false,
      items: [
        {
          title: "Click Me"
        },
        {
          title: "Click Me"
        },
        {
          title: "Click Me"
        },
        {
          title: "Click Me 2"
        }
      ],
      select: [
        { text: "State 1" },
        { text: "State 2" },
        { text: "State 3" },
        { text: "State 4" },
        { text: "State 5" },
        { text: "State 6" },
        { text: "State 7" }
      ]
    };
  }
};
</script>

<style scoped></style>
