import 'babel-polyfill'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import './../webapp/theme/index.css';
import './../css/common.css';
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import global from './global';
import navbar from './../components/web/navbar.vue'
import footer from './../components/web/components/footer.vue'
import modal from 'vue-js-modal'

import VideoModule from './../store/modules/VideoModule';
import UserModule from './../store/modules/UserModule';
import CommentModule from './../store/modules/CommentModule';
import IndexModule from './../store/modules/IndexModule';
import DetailModule from "../store/modules/DetailModule";
import CategoryModule from "../store/modules/CategoryModule";

import {web_routerConfig} from './../config/RouterConfig';
import { getters } from './../store/getters'
import PlayerModule from "../store/modules/playerModule";
import CartModule from "../store/modules/CartModule";
import CouponModule from "../store/modules/CouponModule";
import OrderModule from "../store/modules/OrderModule";
require('./extend')
require('rgbaster/rgbaster.js')

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(global);
Vue.use(VueRouter);
Vue.use(modal);
Vue.component('vprofooter',footer);
Vue.component('vpronavbar',navbar);

const vuex_store = new Vuex.Store({
  state:{},
  mutations:{},
  actions:{},
  modules:{
    video: VideoModule,
    user: UserModule,
    comment: CommentModule,
    index: IndexModule,
    detail:  DetailModule,
    category: CategoryModule,
    player: PlayerModule,
    Cart: CartModule,
    Coupon: CouponModule,
    Order: OrderModule
  },
  getters: getters
});


//  permission judgement!---------------------------------------------------------------------------------------------
// web_routerConfig.beforeEach((to, from, next) => {
//
// })

// -------------------------------------------------------------------------------------------------------------------


let hub = new Vue()
new Vue({
  el:'.container',
  store:vuex_store,
  router:web_routerConfig
});