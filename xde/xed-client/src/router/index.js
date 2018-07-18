import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {routes} from '../app';
import * as auth from '../common/auth';
import {P_ROLE} from '../config/routing.config';
import store from '../store'

Vue.use(Router)

export default new Router({
  routes:routes
  //   [
  //   {
  //     path: '/',
  //     name: 'HelloWorld',
  //     component: HelloWorld
  //   }
  // ]
})
