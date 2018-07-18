// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
Vue.use(require('vue-cookies'))

import * as auth from './common/auth';
import './common/custom-filter';
import confirmModal from '../src/components/confirm-modal'
import * as notify from "../src/common/notify/notify-service"
import {ERROE_CODES} from "../src/common/consts"
// Vue.http.headers.common['Access-Control-Allow-Origin'] = value;

Vue.component('confirm-modal', confirmModal);

Vue.config.productionTip = false
var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function () {
      return EventBus;
    }
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
  created() {
    console.log("started");
    // auth.checkCookies().then((result) => {
    //   if (result.code >= 0) {
    //     auth.setLoginCookie(result.data);
    //     this.$store.commit('LOAD_USER_INFO');
    //     if (window.location.hash == "#/login") {
    //       this.$router.push({name: "product"});
    //     }
    //   } else {
    //     if (result.code != ERROE_CODES.not_login) {
    //       notify.error(result.msg, "Error");
    //     }
    //     auth.clearCookies();
    //     router.push({name: "login"});
    //   }
    // });
  }
});
