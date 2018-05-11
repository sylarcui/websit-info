<template>

</template>

<script>
export default {
  name: 'hot-table',
  created () {
    this.initTdData()
  },
  mounted: function () {
    this.$nextTick(function () {
      this.tableEl = this.$refs.contactTable
      this.tableEvent.init = () => {
        var rt = this.TABLE.table
        rt.onmousedown('mainTable', true)
        rt.cell_index(false, this.initTableData)
        rt.color.cell = this.cellColor
      }
      this.tableEvent.merge = () => {
        this.TABLE.table.merge('h', false)
        this.TABLE.table.merge('v')
      }
      this.tableEvent.split = (mode) => {
        this.TABLE.table.split(mode)
      }
      console.log(this.cellColor)
      this.tableEvent.row = (type, position) => {
        console.log(this.currentElList)
        let _minEl = _.minBy(this.currentElList, (o) => { return o.parentNode.rowIndex })
        let _position = _minEl ? _minEl.parentNode.rowIndex : ''
        switch (position) {
          case 'start':
            _position = 0
            break
          case 'end':
            _position = -1
            break
          case 'top':
            _position = _minEl ? _position - 1 : 0
            break
          case 'bottom':
            _position = _minEl ? _position : -1
            break
          default:
            _position = ''
        }
        this.TABLE.table.row('mainTable', type, _position, position)
      }

      this.tableEvent.column = (type, position) => {
        console.log(this.currentElList)
        let _minEl = _.minBy(this.currentElList, (o) => { return o.cellIndex })
        console.log(_minEl)
        let _position = _minEl ? _minEl.cellIndex : ''
        switch (position) {
          case 'start':
            _position = 0
            break
          case 'end':
            _position = -1
            break
          case 'left':
            if (type === 'delete') {
              _position = _minEl ? _position - 1 : 0
            } else {
              _position = _minEl ? _position : 0
            }

            break
          case 'right':
            _position = _minEl ? _position + 1 : -1
            break
          default:
            _position = ''
        }
        console.log(_position)
        this.TABLE.table.column('mainTable', type, _position)
      }

      if (window.addEventListener) {
        window.addEventListener('load', this.tableEvent.init, false)
      } else if (window.attachEvent) {
        window.attachEvent('onload', this.tableEvent.init)
      }
    })
  }
}
</script>

<style scoped>

</style>
