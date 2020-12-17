import Vue from "vue";
import Vuetify from "vuetify/lib";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
    current: "es"
  },
  theme: {
    themes: {
      // TODO: Arreglar la selección de colores en modo claro, modo oscuro están bien.
      light: {
        primary: "#cc4125",
        success: "#00e64d",
        grey_selected: "#302f2f",
        white_selected: "#999999",
        black_selected: "#FAFAFA"
      },
      dark: {
        primary: "#cc4125",
        success: "#009933",
        grey_selected: "#999999",
        white_selected: "#FAFAFA",
        black_selected: "#222222"
      }
    }
  }
});
