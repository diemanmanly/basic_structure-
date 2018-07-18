<template>
  <section v-if="user">
    <div class="header">
      <div class="header-container">
        <div class="js-toggle-left-slidebar js-menu-mobile">
          <div class="trigger-menu">
            <!-- add class close when clicked--><span class="three-bars-icon"></span>
          </div>
        </div>
        <div class="brand">
          <router-link class="logo-container"
                       :to="{ name: 'dashboard'}">
          </router-link>
          <!--<a class="logo-container" ></a>-->
        </div>
        <div class="top-nav">
          <ul class="nav-left-link">
            <li v-if="menu.permit" v-for="menu in menus">
              <a v-bind:class="{ active: menu.isActive }" @click="changeMenu(menu)">{{menu.name}}</a>
            </li>
          </ul>
          <ul class="nav-right-link">
            <li>
              <div class="form" style="margin-top: 10px">
                <div class="item-filter">
                  <input v-model="search" type="text" @keyup.enter="searchAction()" placeholder="Search...">
                </div>
              </div>
            </li>
            <li>
              <div class="user">
                <a data-toggle="modal" data-target="#modal-user-profile">
              <span class="avatar avatar--sm">
                  <span class="avatar-img" v-bind:style="{ 'background-image': 'url(' + user.avatar + ')' }"></span>
              </span>
                </a>
                <div class="user-container">
                  <a href="#!"><strong>{{user.displayName}}</strong></a>
                  <span>{{user.displayRole}}</span>
                </div>
              </div>
            </li>
            <li class="in-mobile">
              <div class="dropdown">
                <a class="func-nav" id="dLabelSetting" href="#!" role="button" data-toggle="dropdown">
                  <i class="material-icons md-24">settings</i>
                </a>
                <div class="dropdown-menu" role="menu" aria-labelledby="dLabelSetting">
                  <div class="app-timeline scroll">
                    <ul>
                      <li v-if="menu.permit" v-for="menu in settingMenus"
                          v-bind:class="{ 'active-setting': menu.isActive }" @click="changeMenu(menu)"
                          style="cursor: pointer">
                        {{menu.name}}
                      </li>
                    </ul>
                  </div>
                  <div class="heading">
                    <div class="title" @click="logout()" style="cursor: pointer;">
                      <h5><i class="material-icons" style="color: #087dd7;">subject</i><span
                        style="color: #087dd7; font-weight: bold">Logout</span></h5>
                    </div>
                  </div>
                </div>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</template>
<script>
  import Vue from 'vue';
  import {mapState, mapActions} from 'vuex';
  import {MENUS} from '../../common/consts';
  import * as auth from "../../common/auth";
  import {ROUTING, ROUTING_PERMIT} from "../../config/routing.config"
  import * as utils from "../../common/utils"


  export default {
    name: 'top-bar',
    data() {
      return {
        user: {},
        menus: [],
        settingMenus: [],
        menuSelected: {},
        search: "",
        userInfo: {
          domain: "anntd",
          gender: "Female",
          email: "anntd@vng.com.vn",
          phone: "01633694631",
          zaloId: 100804255,
          role: "admin"
        }
      }
    },
    created(state) {
      this.init();
      this.request();
    },
    mounted() {
    },
    methods: {
      ...mapActions([]),
      request() {
        this.$eventBus.$on('bar-change-menu', menu => {
          this.changeMenu(menu);
        });
      },
      changeMenu(menu) {
        debugger
        if (this.menuSelected) {
          this.menuSelected.isActive = false;
          var index = utils.findObject(this.menus, "router", this.menuSelected.router);
          if (index >= 0) {
            var oldMenu = Object.assign({}, this.menus[index]);
            oldMenu.isActive = false;
            this.menus.splice(index, 1);
            this.menus.splice(index, 0, oldMenu);
          } else {
            debugger
            var index = utils.findObject(this.settingMenus, "router", this.menuSelected.router);
            if (index >= 0) {
              var oldMenu = Object.assign({}, this.settingMenus[index]);
              oldMenu.isActive = false;
              this.settingMenus.splice(index, 1);
              this.settingMenus.splice(index, 0, oldMenu);
            }
          }
          this.menuSelected = null;
        }
        if (menu) {
          Vue.set(menu, 'isActive', true);// isActive no không thay doi trên menu
          var params = {};
          if (menu.router == MENUS[0].router) {
            try {
              params["productId"] = "-1";
              params["query"] = "-1";
            } catch (e) {
            }
          }
          this.menuSelected = menu;
          this.$router.push({name: menu.router, params: params})
        }
      },
      logout() {
        auth.logout().then((result) => {
          if (result && result.code >= 0) {
            console.log("logout ok");
          }
          auth.clearCookies();
          this.$store.commit('CLEAR_USER_INFO', null);
          this.$router.push({name: 'login'});
        });
      },
      initMenu() {
        var roles = JSON.parse(auth.getRole());
        this.menus = [{
          name: "Product Manager",
          router: "product",
          path: "product",
          permit: auth.checkAuth(ROUTING_PERMIT.product, roles)
        }, {
          name: "App Store",
          router: "appstore",
          path: "appstore,appjar,actionstatus",
          permit: auth.checkAuth(ROUTING_PERMIT.appstore, roles)
        }];
        this.settingMenus = [{
          name: "Product Sttings",
          router: "ps_group",
          path: "psettings",
          permit: auth.checkAuth(ROUTING_PERMIT.psettings, roles)
        }, {
          name: "User/Role",
          router: "account",
          path: "account",
          permit: auth.checkAuth(ROUTING_PERMIT.account, roles)
        }, {
          name: "Permissions",
          router: "permission",
          path: "permission",
          permit: auth.checkAuth(ROUTING_PERMIT.permission, roles)
        }, {
          name: "Access key",
          router: "accesskey",
          path: "accesskey",
          permit: auth.checkAuth(ROUTING_PERMIT.accesskey, roles)
        }
        ]
      },
      searchAction() {
        this.$router.push({name: 'product', params: {productId: -1, query: this.search}, path: "product"});
        this.search = "";
      },
      init() {
        let vm = this;
        auth.checkCookiesOk(function () {
          vm.initMenu();
          var arr = vm.menus.concat(vm.settingMenus);
          for (var index = 0; index < arr.length; index++) {
            var slices = arr[index].path.split(",");
            console.log(slices)
            var path = vm.$router.history.current.path.substring(1, vm.$router.history.current.path.length);
            if (slices.indexOf(path) >= 0) {
              debugger
              arr[index].isActive = true;
              vm.menuSelected = arr[index];
              break;
            }
          }
//          vm.$store.commit('LOAD_USER_INFO');
        });
      }
    },
    computed: {
      ...mapState({
//        'user': state => state.login.user,
//        'pGroups': state => state.product.pGroups,
      })
    },
  }
</script>

<style>
  .active-setting {
    font-weight: bold !important;
    background-color: aliceblue;
  }
</style>
