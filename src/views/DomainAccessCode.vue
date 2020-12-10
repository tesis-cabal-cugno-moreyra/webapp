<template>
  <v-app>
    <v-container fill-height fill-width>
      <v-layout row>
        <v-row align="center" justify="center">
          <v-container text-center v-if="this.domainAccessCode !== null">
            <h1 style="font-size: 102px">{{ this.domainAccessCode }}</h1>
            <v-btn v-on:click="goIncidentView" class="ma-5 pa-5"
              >Ir a la página principal</v-btn
            >
            <v-btn v-on:click="generateNewDomainAccessCode" class="ma-5 pa-5"
              >Generar nuevo código</v-btn
            >
          </v-container>
          <v-container text-center v-else>
            <h1>El código de acceso no está disponible.</h1>
            <v-btn v-on:click="goIncidentView">Ir a la página principal</v-btn>
          </v-container>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "DomainAccessCode",
  data() {
    return {
      domainAccessCode: null
    };
  },
  async mounted() {
    await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
    await this.$store
      .dispatch("domainConfig/getDomainAccessCode")
      .then(response => {
        this.domainAccessCode = response.data.domain_code;
      })
      .finally(
        async () => await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
      );
  },
  methods: {
    goIncidentView() {
      this.$router.push({ name: "IncidentsView" });
    },
    async generateNewDomainAccessCode() {
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      await this.$store
        .dispatch("domainConfig/refreshDomainAccessCode")
        .then(response => {
          this.domainAccessCode = response.data.domain_code;
        })
        .finally(
          async () =>
            await this.$store.dispatch("uiParams/turnOffSpinnerOverlay")
        );
    }
  }
};
</script>

<style scoped></style>
