const lookup = {
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24
}

let cullFalse = document.querySelector('input[value="false"]')
let cullTrue = document.querySelector('input[value="true"]')
let count = document.querySelector('input[name="count"]')
let interval = document.querySelector('select[name="interval"]')

function saveOptions (e) {
  let options = {}
  options.enable = cullTrue.checked
  options.count = count.value
  options.interval = interval.value
  options.offset = null
  if (!isNaN(options.count)) {
    options.offset = options.count * lookup[options.interval]
  }
  browser.storage.local.set({cull: options})
}

function restoreOptions () {
  let result = browser.storage.local.get('cull')
  result.then((options) => {
    if (typeof options.cull === 'undefined') {
      cullFalse.checked = true
      return
    }
    cullTrue.checked = options.cull.enable
    cullFalse.checked = !options.cull.enable
    count.value = options.cull.count
    interval.value = options.cull.interval
  })
}

document.addEventListener('DOMContentLoaded', restoreOptions)
for (let element of document.querySelectorAll('input, select')) {
  element.addEventListener('change', saveOptions)
}
