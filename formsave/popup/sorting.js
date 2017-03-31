/* global _ */

const FuzzySearch = require('fuzzy-search')

class TableSorter { // eslint-disable-line
  constructor (callback) {
    this.callback = callback
    this.sortBy = {column: null, reverse: false}
    this.columns = {}
    for (let element of document.querySelectorAll('.column')) {
      let id = element.id
      this.columns[id] = element
      this.columns[id].defaultClassName = this.columns[id].className
      this.columns[id].addEventListener('click', this.click.bind(this))
    }
    this.search = document.querySelector('#search')
    this.search.addEventListener('input', _.debounce(callback, 200))
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
  sort (items, filterKeys) {
    if (this.search.value !== '') {
      items = new FuzzySearch(items, filterKeys).search(this.search.value)
    }
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
