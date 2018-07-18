import Vue from 'vue';
import Vuex from 'vuex';
import { vuex } from '../app';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

console.log(vuex)
export default new Vuex.Store({
  modules: vuex,
  strict: debug
});
