<template>
  <v-main>
    <v-form v-model="valid">
      <v-jsf v-model="model" :schema="schema" />
    </v-form>
  </v-main>
</template>

<script>
import VJsf from "@koumoul/vjsf/lib/VJsf.js";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";

export default {
  name: "IncidentDetails",
  components: { VJsf },
  data: () => ({
    valid: false,
    model: {},
    schema: {
      type: "object",
      properties: {
        stringProp: {
          type: "string",
          title: "I'm a string",
          description: "This description is used as a help message."
        },
        stringTextareaProp: {
          type: "string",
          title: "I'm a string in a textarea",
          "x-display": "textarea"
        },
        numberProp: {
          type: "number",
          title: "I'm a number"
        },
        integerProp: {
          type: "integer",
          title: "I'm an integer"
        },
        integerSliderProp: {
          type: "integer",
          title: "I'm an integer in a slider",
          "x-display": "slider",
          minimum: 0,
          maximum: 5
        },
        booleanProp: {
          type: "boolean",
          title: "I'm a boolean",
          description: "This description is used as a help message."
        },
        booleanSwitchProp: {
          type: "boolean",
          title: "I'm a boolean with switch display",
          "x-display": "switch",
          description: "This description is used as a help message."
        },
        stringArrayProp: {
          type: "array",
          title: "I'm an array of strings",
          items: {
            type: "string"
          }
        },
        integerArrayProp: {
          type: "array",
          title: "I'm an array of integers",
          items: {
            type: "integer"
          }
        }
      }
    }
  })
};
</script>

<style scoped></style>
