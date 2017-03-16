document.querySelector('.refresh').addEventListener('click', refresh)
document.querySelector('.clear').addEventListener('click', clear)
document.querySelector('.clear-all').addEventListener('click', clearAll)
let tableContainer = document.querySelector('#selection-table')

let selected = ''
refresh()

function refresh () {
  let reading = browser.storage.local.get()
  while (tableContainer.firstChild) {
    tableContainer.removeChild(tableContainer.firstChild)
  }
  reading.then((results) => {
    Object.keys(results).forEach((result) => {
      let tr = document.createElement('tr')
      let url = document.createElement('td')
      url.textContent = results[result].url.slice(0, 30)
      url.title = results[result].url
      url.id = result
      let id = document.createElement('td')
      id.textContent = results[result].id.slice(0, 10)
      id.id = result
      let time = document.createElement('td')
      time.textContent = results[result].time
      time.id = result
      tr.appendChild(url)
      tr.appendChild(id)
      tr.appendChild(time)
      tr.id = result
      tableContainer.appendChild(tr)
      tr.addEventListener('click', changeSelection)
    })
  })
}

function changeSelection (calledEvent) {
  selected = calledEvent.target.id
  let reading = browser.storage.local.get(selected)
  reading.then((results) => {
    document.querySelector('textarea').value = results[selected].content
  })
}

function clear () {
  browser.storage.local.remove(selected)
  refresh()
}

function clearAll () {
  browser.storage.local.clear()
  refresh()
}
