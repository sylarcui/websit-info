// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { sync } from 'vuex-router-sync'
import VModal from 'vue-js-modal'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from './lib/fontawesome/fontawesome'
import solid from './lib/fontawesome/fontawesome-pro-solid'
import regular from './lib/fontawesome/fontawesome-pro-regular'
import light from './lib/fontawesome/fontawesome-pro-light'
import brands from './lib/fontawesome/fontawesome-pro-brands'

import './mock/mock'

import './lib/webformeditor/js/froala_editor.pkgd.min'
import './lib/webformeditor/js/languages/zh_cn'
// Require Froala Editor css files.
import './lib/webformeditor/css/froala_editor.pkgd.min.css'
import './lib/webformeditor/css/froala_style.min.css'
import VueFroala from 'vue-froala-wysiwyg'

import 'font-awesome/css/font-awesome.css'

import $ from 'jquery'
Vue.use(VueFroala)

fontawesome.library.add(brands, light, regular, solid)
Vue.component('icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VModal)
sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  $,
  components: { App },
  template: '<App/>'
})

// import TABLE from './lib/table'
// Vue.prototype.TABLE = TABLE
