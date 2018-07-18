<template>
  <div canvas="container" id="app">
    <top-bar></top-bar>
    <router-view/>
    <confirm-modal></confirm-modal>
    <div class="fakeloader"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapState, mapActions} from 'vuex';
  import {MENUS} from './common/consts';
  import './assets/css/layout.css';
  import './assets/css/style.css';
  import './assets/css/plugin.css';
  import './assets/js/main';
  import './assets/js/toastr/toastr';
  import './assets/css/toastr/toastr.css';
  import './assets/js/jquery.contextMenu';
  import './assets/js/jquery.ui.position.min';
  import './assets/js/jquery.datetimepicker.full';
  import './assets/css/jquery.datetimepicker.css';
  import './assets/js/jquery.gridster.min';
  import './assets/css/jquery.gridster.css';
  import * as auth from "./common/auth";
//  import './assets/js/jquery.xdomainajax'


  import topBar from './app/top-bar/top-bar'
  Vue.component('top-bar', topBar);

  export default {
    name: 'app',
    data() {
      return {
      }
    },
    created(state) {
    },
    mounted() {
      let vm = this;
    },
    methods: {
      ...mapActions([
      ]),
    },
    computed: {
      ...mapState({
      })
    },
  }
</script>

