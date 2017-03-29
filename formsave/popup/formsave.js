/* global _, TableSorter */

const vagueTime = require('vague-time')
const escapeHTML = require('escape-html-template-tag')

let tableContainer = document.querySelector('#selection-table')
let textarea = document.querySelector('textarea')

function shortTime (timestamp) {
  return timestamp.replace(/T/, ' ').slice(0, 16)
}

class Table {
  constructor () {
    this.selected = ''
    this.refresh()
    this.tableSorter = new TableSorter(this.refresh.bind(this))
  }
  remove (calledEvent) {
    browser.storage.local.remove(this.selected)
    this.refresh()
  }
  removeAll (calledEvent) {
    browser.storage.local.clear()
    this.clear()
  }
  clear (calledEvent) {
    while (tableContainer.firstChild) {
      tableContainer.removeChild(tableContainer.firstChild)
    }
    textarea.value = ''
  }
  createRow (item) {
    let row = document.createElement('div')
    row.id = _.escape(item.uniq)
    row.className = 'container'
    let template = escapeHTML`<div title="${item.url}" class="item clip">${item.url}</div>
      <div class="item clip center">${item.id}</div>
      <div title="${shortTime(item.time)}" class="item clip right">${vagueTime.get({to: new Date(item.time)})}</div>`
    row.insertAdjacentHTML('afterbegin', template)
    tableContainer.appendChild(row)
    row.addEventListener('click', this.select.bind(this))
  }
  select (calledEvent) {
    this.selected = calledEvent.target.parentElement.id
    let reading = browser.storage.local.get(this.selected)
    reading.then((results) => {
      textarea.value = results[this.selected].content
    })
  }
  refresh (calledEvent) {
    let reading = browser.storage.local.get()
    reading.then((results) => {
      this.clear()
      for (let item of this.tableSorter.sort(_.values(results), ['url', 'id', 'content'])) {
        this.createRow(item)
      }
    })
  }
}

let table = new Table()
document.querySelector('.refresh').addEventListener('click', table.refresh.bind(table))
document.querySelector('.clear').addEventListener('click', table.remove.bind(table))
document.querySelector('.clear-all').addEventListener('click', table.removeAll.bind(table))
