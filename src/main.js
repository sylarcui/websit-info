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
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-pro-solid'
import regular from '@fortawesome/fontawesome-pro-regular'
import light from '@fortawesome/fontawesome-pro-light'
import brands from '@fortawesome/fontawesome-free-brands'
import TABLE from './lib/table'
import './mock/mock'
// Require Froala Editor js file.
// import 'froala-editor/js/froala_editor.pkgd.min'
import './lib/froala_editor.pkgd.min'
// import 'froala-editor/js/plugins/table.min.js'
import 'froala-editor/js/languages/zh_cn'
// Require Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'font-awesome/css/font-awesome.css'
import 'froala-editor/css/froala_style.min.css'
import VueFroala from 'vue-froala-wysiwyg'
import $ from 'jquery'
Vue.use(VueFroala)
Vue.prototype.TABLE = TABLE
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
