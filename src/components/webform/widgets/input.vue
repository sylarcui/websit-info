<template>
    <div>
      <widgetComponent widgetNmae="inputWidget">
          <div>aaa</div>
      </widgetComponent>
      kkkkkk
    </div>
</template>

<script>
import widgetComponent from './widget-component'
export default {
  name: 'input-widget',
  created () {
    // alert('')
  },
  mounted: function () {
    this.$nextTick(() => {
    })
  },
  components: {
    widgetComponent
  }
}
</script>

<style scoped>

</style>
