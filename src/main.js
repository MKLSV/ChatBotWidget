import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoMessenger, IoClose, OiDependabot, FaUser } from "oh-vue-icons/icons";

addIcons(CoMessenger, IoClose, OiDependabot, FaUser);

const app = createApp(App)

app.component("v-icon", OhVueIcon);
app.mount('#app')