const swapItems = {
  _swapItems (arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
  },
  upRecord (arr, $index) {
    if ($index === 0) {
      return
    }
    this._swapItems(arr, $index, $index - 1)
  },
  downRecord (arr, $index) {
    if ($index === arr.length - 1) {
      return
    }
    this._swapItems(arr, $index, $index + 1)
  }
}
export default swapItems
