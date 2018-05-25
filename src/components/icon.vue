<template>
  <i :class="icon"></i>
</template>

<script>
export default {
  name: 'icon',
  props: ['icon'],
  created () {
    console.log(this.icon)
  }
}
</script>

<style scoped>

</style>
