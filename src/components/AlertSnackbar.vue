<template>
  <v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    top="top"
  >
    {{ snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="black" text v-bind="attrs" @click="CloseAlert()"
        >Close</v-btn
      >
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      snackbar: "uiParams/snackbar"
    })
  },
  methods: {
    CloseAlert() {
      this.$store.commit("uiParams/closeAlert", {});
    }
  }
};
</script>
