/* global _, Event, config */

const FuzzySearch = require('fuzzy-search')
let options = config()

class Reaper {
  constructor () {
    this.offset = null
    options.then((options) => { this.offset = options.reap.offset })
  }
  reap (items) {
    if (this.offset === null) {
      return items
    }
    let oldest = new Date().getTime() - this.offset
    let [toDelete, toKeep] = _.partition(items, (value) => (new Date(value.time).getTime() < oldest))
    browser.storage.local.remove(toDelete.map((item) => item.uniq))
    return toKeep
  }
}

class TableSorter { // eslint-disable-line
  constructor (callback) {
    this.callback = callback
    this.sortBy = { column: null, reverse: false }
    this.columns = {}
    for (let element of document.querySelectorAll('.column')) {
      let id = element.id
      this.columns[id] = element
      this.columns[id].defaultClassName = this.columns[id].className
      this.columns[id].inverse = this.columns[id].className.includes('inverse')
      this.columns[id].addEventListener('click', this.click.bind(this))
      if (this.columns[id].className.includes('default')) {
        this.columns[id].dispatchEvent(new Event('click'))
      }
    }
    this.search = document.querySelector('#search')
    this.search.addEventListener('input', _.debounce(callback, 200))
    this.reaper = new Reaper()
    this.updateCSS()
  }
  updateCSS () {
    function sortingClassNames () {
      let classNames = ' sorting'
      if (this.sortBy.reverse) {
        classNames += ' reverse'
      }
      return classNames
    }

    for (let element of _.values(this.columns)) {
      element.className = element.defaultClassName
      if (element.id === this.sortBy.column) {
        element.className += sortingClassNames.call(this)
      }
    }
  }
  click (calledEvent) {
    let id = calledEvent.target.id
    if (id === this.sortBy.column) {
      this.sortBy.reverse = !this.sortBy.reverse
      if (this.sortBy.reverse === this.columns[id].inverse) {
        this.sortBy.column = null
      }
    } else {
      this.sortBy = { column: id, reverse: this.columns[id].inverse }
    }
    this.updateCSS()
    this.callback()
  }
  sort (items, filterKeys) {
    items = this.reaper.reap(items)
    items = new FuzzySearch(items, filterKeys).search(this.search.value)
    if (this.sortBy.column !== null) {
      items = _.sortBy(items, [this.sortBy.column])
      if (this.sortBy.reverse) items = _.reverse(items)
    }
    return items
  }
}
