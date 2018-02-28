const lookup = {
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24
}

let reapFalse = document.querySelector('input[value="false"]')
let reapTrue = document.querySelector('input[value="true"]')
let count = document.querySelector('input[name="count"]')
let interval = document.querySelector('select[name="interval"]')
let debounce = document.querySelector('input[name="debounce"]')

function saveOptions (e) {
  let options = {}
  options.reap = {}
  options.reap.enable = reapTrue.checked
  options.reap.count = count.value
  options.reap.interval = interval.value
  options.reap.offset = null
  options.debounce = debounce.value
  if (!isNaN(options.reap.count)) {
    options.reap.offset = options.reap.count * lookup[options.reap.interval]
  }
  browser.storage.local.set({options: options})
}

function restoreOptions () {
  let result = browser.storage.local.get('options')
  result.then((storage) => {
    console.log(storage)
    let options = storage.options
    if (typeof options === 'undefined') {
      reapFalse.checked = true
      debounce.value = 200
      return
    } else if (typeof options.debounce === 'undefined') {
      debounce.value = 200
      return
    }
    reapTrue.checked = options.reap.enable
    reapFalse.checked = !options.reap.enable
    count.value = options.reap.count
    interval.value = options.reap.interval
    debounce.value = options.debounce
  })
}

function removeAll (calledEvent) {
  let result = browser.storage.local.get('options')
  result.then((config) => {
    browser.storage.local.clear().then(() => {
      browser.storage.local.set(config)
    })
  })
}

function exportData (calledEvent) {
  let result = browser.storage.local.get()
  result.then((all) => {
    delete all['options']
    let file = new window.File([JSON.stringify(all)], 'formsave.json', {type: 'application/json'})
    let url = window.URL.createObjectURL(file)
    window.open(url)
  })
}

document.addEventListener('DOMContentLoaded', restoreOptions)
for (let element of document.querySelectorAll('input, select')) {
  element.addEventListener('change', saveOptions)
}
document.querySelector('#remove-all').addEventListener('click', removeAll)
document.querySelector('#export').addEventListener('click', exportData)
