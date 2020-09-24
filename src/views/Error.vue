<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center">
          <h1 style="font-size: 72px">{{ this.errorCode }}</h1>
        </v-row>
        <v-row align="center" justify="center">
          <h2>{{ this.errorMessage }}</h2>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  beforeCreate() {},
  name: "Error",
  props: {
    errorCode: {
      type: Number,
      default: 404
    },
    errorMessage: {
      type: String,
      default: "No encontramos la página buscada."
    }
  },
  data() {
    return {
      code: this.errorCode,
      message: this.errorMessage
    };
  }
};
</script>

<style scoped></style>
