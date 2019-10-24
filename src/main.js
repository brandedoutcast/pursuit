import Vue from "vue"
import App from "./App.vue"

Vue.config.productionTip = false

new Vue({ render: h => h(App) }).$mount("#app")

if ("serviceWorker" in navigator)
    navigator.serviceWorker.register("../sw.js")