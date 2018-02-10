/* global _, TableSorter */

const vagueTime = require('vague-time')
const escapeHTML = require('escape-html-template-tag')

const searched = ['url', 'content']
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
  open (calledEvent) {
    if (this.current_url) {
      window.open(this.current_url)
    }
  }
  clear () {
    this.current_url = null
    while (tableContainer.firstChild) {
      tableContainer.removeChild(tableContainer.firstChild)
    }
    textarea.value = ''
  }
  createRow (item) {
    let row = document.createElement('div')
    row.id = item.uniq
    row.className = defaultClassName
    if (row.id === this.selected) {
      row.className += ' selected'
      this.select(row.id)
    }
    row.insertAdjacentHTML('afterbegin', escapeHTML`
      <div title="${item.url}" class="item clip">${item.url.replace(/^https?:\/\//, '')}</div>
      <div class="item clip center">${item.content}</div>
      <div title="${shortTime(item.time)}" class="item clip right">${vagueTime.get({to: new Date(item.time)})}</div>`)
    tableContainer.appendChild(row)
    row.addEventListener('click', this.selectClick.bind(this))
  }
  select (id) {
    this.selected = id
    let reading = browser.storage.local.get(id)
    reading.then((results) => {
      textarea.value = results[id].content
      this.current_url = results[id].url
    })
  }
  selectClick (calledEvent) {
    if (this.selected !== null) {
      // clear the selection from the old one if it exists
      let element = document.getElementById(this.selected)
      if (element !== null) {
        element.className = defaultClassName
      }
    }
    calledEvent.target.parentElement.className += ' selected'
    this.select(calledEvent.target.parentElement.id)
  }
  refresh () {
    let reading = browser.storage.local.get()
    reading.then((results) => {
      this.clear()
      delete results['options']
      for (let item of this.tableSorter.sort(_.values(results), searched)) {
        if (item.hasOwnProperty('uniq')) {
          this.createRow(item)
        }
      }
    })
  }
}

function copyToClipboard () {
  textarea.select()
  document.execCommand('Copy')
}

let table = new Table()
document.querySelector('#copy').addEventListener('click', copyToClipboard)
document.querySelector('#goto').addEventListener('click', table.open.bind(table))
document.querySelector('#remove').addEventListener('click', table.remove.bind(table))
