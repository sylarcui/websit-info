<template>
  <div>
    <slot v-if="showWidget" :widgetNmae="widgetNmae">
    </slot>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'widget-component',
  props: ['widgetNmae'],
  data () {
    return {
      showWidget: true,
      elmView: {}
    }
  },
  created () {
  },
  mounted: function () {
    this.$nextTick(() => {
      this.elmView = this.$slots.default[0].elm
      // console.log(this.$slots.default[0], this.widgetNmae, '-0-0-0-0-0-0-')
      this.showWidget = false
      if (!this.tdWidgets.hasOwnProperty(this.widgetNmae)) {
        console.log('nonono')
        this.pushWidgets({
          key: this.widgetNmae,
          emlData: this.elmView
        })
        this.currentElList[0].innerHTML = this.tdWidgets[this.widgetNmae].outerHTML
      }
      // this.tdAddWidgets()
      console.log(this.tdWidgets[this.widgetNmae].outerHTML, this.currentElList[0])
    })
  },
  methods: {
    ...mapMutations([
      'pushWidgets',
      'tdAddWidgets'
    ])
  },
  computed: {
    ...mapGetters([
      'tdWidgets',
      'currentElList'
    ])
  }
}
</script>

<style scoped>

</style>
