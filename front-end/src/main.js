import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSignInAlt, faUserPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret, faSignInAlt, faUserPlus, faArrowLeft);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
