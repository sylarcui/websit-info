import icon from '@/components/icon.vue'

const iconcom = {
  install: function (Vue) {
    Vue.component('icon', icon)
    // 'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
  }
}

export default iconcom
