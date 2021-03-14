// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import CryptoJs  from 'crypto-js';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';

Vue.prototype.$http = Axios
Vue.config.productionTip = false;
Vue.prototype.sha256 = sha256
Vue.prototype.base64 = Base64
Vue.prototype.CryptoJs = CryptoJs
Axios.defaults.baseURL = 'http://127.0.0.1:8081/'
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
