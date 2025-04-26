import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import axios from "axios";
import store from "./store";

axios.defaults.baseURL = "https://backend-lx6d.onrender.com/";

const app = createApp(App);
app.use(router).use(store);

app.mount("#app");
