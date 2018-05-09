import Vue from 'vue'
import Router from 'vue-router'
import main from '@/pages/layout/layout'
import NotFound from '@/pages/NotFound'
import login from '@/pages/login'

import bpmn from '@/views/bpmn/'
import message from '@/views/message/'
import website from '@/views/website/'
import webform from '@/views/webform/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'main',
      component: main,
      redirect: '/webform',
      children: [
        {
          path: '/bpmn',
          name: 'bpmn',
          component: bpmn
        },
        {
          path: '/message',
          name: 'message',
          component: message
        },
        {
          path: '/website',
          name: 'website',
          component: website
        },
        {
          path: '/webform',
          name: 'webform',
          component: webform
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
