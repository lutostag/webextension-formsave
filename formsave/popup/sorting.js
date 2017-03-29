/* global _ */

class TableSorter { // eslint-disable-line
  constructor (callback) {
    this.callback = callback
    this.sortBy = {column: null, reverse: false}
    this.columns = {}
    for (let id of ['url', 'id', 'date']) {
      this.columns[id] = document.querySelector('#' + id)
      this.columns[id].defaultClassName = this.columns[id].className
      this.columns[id].addEventListener('click', this.click.bind(this))
    }
  }
  clearCSS () {
    for (let element of _.values(this.columns)) {
      element.className = element.defaultClassName
    }
  }
  click (calledEvent) {
    this.clearCSS()
    let id = calledEvent.target.id
    if (id === this.sortBy.column) {
      if (this.sortBy.reverse) {
        this.sortBy = {column: null, reverse: false}
        this.callback()
        return
      }
      this.sortBy.reverse = !this.sortBy.reverse
    } else {
      this.sortBy = {column: id, reverse: false}
    }
    this.columns[id].className += ' sorting'
    this.callback()
  }
  sort (items) {
    if (this.sortBy.column === null) {
      return items
    }
    items = _.sortBy(items, [this.sortBy.column])
    if (this.sortBy.reverse) {
      items = _.reverse(items)
    }
    return items
  }
}
