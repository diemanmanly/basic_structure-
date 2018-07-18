import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import {vuex} from '../app';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: vuex,
  strict: debug
});

export default store;
Vue.prototype.$store = store;

module.exports = store;