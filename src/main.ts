import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./assets/index.css";
import "./assets/crmStyling.css";

import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";

import "sweetalert2/dist/sweetalert2.min.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(mdiVue, {
    icons: mdijs,
});

app.mount("#app");
