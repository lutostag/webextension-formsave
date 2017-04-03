/* global _ */

const FuzzySearch = require('fuzzy-search')

class Reaper {
  constructor () {
    this.offset = null
    this.refreshTime()
  }
  refreshTime () {
    browser.storage.local.get('options').then((storage) => {
      let options = storage.options
      if (typeof options === 'undefined') {
        this.offset = null
      } else if (!options.reap.enable) {
        this.offset = null
      } else {
        this.offset = options.reap.offset
      }
    })
  }
  reap (items) {
    this.refreshTime()
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
    this.reaper = new Reaper()
  }
  updateCSS () {
    for (let element of _.values(this.columns)) {
      element.className = element.defaultClassName
      if (element.id === this.sortBy.column) {
        element.className += ' sorting'
        if (this.sortBy.reverse) {
          element.className += ' reverse'
        }
      }
    }
  }
  click (calledEvent) {
    let id = calledEvent.target.id
    if (id === this.sortBy.column) {
      this.sortBy.reverse = !this.sortBy.reverse
      if (!this.sortBy.reverse) {
        this.sortBy.column = null
      }
    } else {
      this.sortBy = {column: id, reverse: false}
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
