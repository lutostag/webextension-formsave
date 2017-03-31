/* global _, TableSorter */

const vagueTime = require('vague-time')
const escapeHTML = require('escape-html-template-tag')

const searched = ['url', 'id', 'content']
const defaultClassName = 'container'

let tableContainer = document.querySelector('#selection-table')
let textarea = document.querySelector('#textarea')

function shortTime (timestamp) {
  return timestamp.replace(/T/, ' ').slice(0, 16)
}

class Table {
  constructor () {
    this.selected = null
    this.tableSorter = new TableSorter(this.refresh.bind(this))
    this.refresh()
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
    row.className = defaultClassName
    if (row.id === this.selected) {
      row.className += ' selected'
      this.select(row.id)
    }
    let template = escapeHTML`<div title="${item.url}" class="item clip">${item.url}</div>
      <div class="item clip center">${item.id}</div>
      <div title="${shortTime(item.time)}" class="item clip right">${vagueTime.get({to: new Date(item.time)})}</div>`
    row.insertAdjacentHTML('afterbegin', template)
    tableContainer.appendChild(row)
    row.addEventListener('click', this.selectClick.bind(this))
  }
  select (id) {
    this.selected = id
    let reading = browser.storage.local.get(id)
    reading.then((results) => {
      textarea.value = results[id].content
    })
  }
  selectClick (calledEvent) {
    if (this.selected !== null) {
      // clear the selection from the old one if it exists
      let element = document.getElementById(this.selected)
      if (element !== null){
        element.className = defaultClassName
      }
    }
    calledEvent.target.parentElement.className += ' selected'
    this.select(calledEvent.target.parentElement.id)
  }
  refresh (calledEvent) {
    let reading = browser.storage.local.get()
    reading.then((results) => {
      this.clear()
      for (let item of this.tableSorter.sort(_.values(results), searched)) {
        this.createRow(item)
      }
    })
  }
}

function copyToClipboard () {
  textarea.select()
  document.execCommand('Copy')
}

let table = new Table()
document.querySelector('#refresh').addEventListener('click', table.refresh.bind(table))
document.querySelector('#clear').addEventListener('click', table.remove.bind(table))
document.querySelector('#clear-all').addEventListener('click', table.removeAll.bind(table))
document.querySelector('#copy').addEventListener('click', copyToClipboard)
