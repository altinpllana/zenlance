/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";


const app = createApp(App);

app.component("QuillEditor", QuillEditor);

registerPlugins(app);

app.use(VueApexCharts);

app.mount("#app");
