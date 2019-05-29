import Vue from "vue";
// import App from "./App.vue";
import App from "@/App";

import hui from "h_ui";
import "h_ui/dist/h_ui.min.css";

Vue.use(hui);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount("#app");
