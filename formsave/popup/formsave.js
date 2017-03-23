let tableContainer = document.querySelector('#selection-table')

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
    let tr = document.createElement('tr')
    let template = `<td title="${item.url}" id="${uniq}">${item.url.slice(0, 30)}</td>` +
      `<td id="${uniq}">${item.id.slice(0, 10)}</td>` +
      `<td id="${uniq}">${item.time}</td>`
    tr.id = uniq
    tr.insertAdjacentHTML('afterbegin', template)
    tableContainer.appendChild(tr)
    tr.addEventListener('click', this.select)
  }
  select (calledEvent) {
    this.selected = calledEvent.target.id
    let reading = browser.storage.local.get(this.selected)
    reading.then((results) => {
      document.querySelector('textarea').value = results[this.selected].content
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
