/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDateInput,
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#08090a",
          secondary: "#5CBBF6",
        },
      },
    },
  },
});
