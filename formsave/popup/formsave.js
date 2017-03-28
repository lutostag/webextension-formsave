let tableContainer = document.querySelector('#selection-table')
let textarea = document.querySelector('textarea')

class Table {
  constructor () {
    this.selected = ''
    this.refresh()
  }
  remove () {
    browser.storage.local.remove(this.selected)
    this.refresh()
  }
  removeAll () {
    browser.storage.local.clear()
    this.clear()
  }
  clear () {
    while (tableContainer.firstChild) {
      tableContainer.removeChild(tableContainer.firstChild)
    }
  }
  createRow (uniq, item) {
    let row = document.createElement('div')
    row.id = uniq
    row.className = 'container'
    let template = `<div title="${item.url}" class="item clip">${item.url}</div>` +
      `<div class="item clip pad">${item.id}</div>` +
      `<div class="item">${item.time}</div>`
    row.insertAdjacentHTML('afterbegin', template)
    tableContainer.appendChild(row)
    row.addEventListener('click', this.select)
  }
  select (calledEvent) {
    this.selected = calledEvent.target.parentElement.id
    let reading = browser.storage.local.get(this.selected)
    reading.then((results) => {
      textarea.value = results[this.selected].content
    })
  }
  refresh () {
    let reading = browser.storage.local.get()
    reading.then((results) => {
      this.clear()
      for (let result in results) {
        let item = results[result]
        this.createRow(result, item)
      }
    })
  }
}

let table = new Table()
document.querySelector('.refresh').addEventListener('click', table.refresh)
document.querySelector('.clear').addEventListener('click', table.remove)
document.querySelector('.clear-all').addEventListener('click', table.removeAll)
