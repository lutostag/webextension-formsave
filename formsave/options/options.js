/* global config, defaults */

const lookup = {
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24
}

let reapFalse = document.querySelector('input[value="false"]')
let reapTrue = document.querySelector('input[value="true"]')
let count = document.querySelector('#count')
let interval = document.querySelector('#interval')
let debounce = document.querySelector('#debounce')
let excludes = document.querySelector('#excludes')

function toRegexes (text) {
  return []
}

function load () {
  config().then((options) => {
    reapTrue.checked = options.reap.enable
    reapFalse.checked = !options.reap.enable
    count.value = options.reap.count
    interval.value = options.reap.interval
    debounce.value = options.debounce
    excludes.value = options.excludes.text
  })
}

function save () {
  let options = {
    reap: {
      enable: reapTrue.checked,
      count: count.value,
      interval: interval.value,
      offset: null
    },
    debounce: debounce.value,
    excludes: {
      text: excludes.value,
      regexes: toRegexes(excludes.value)
    }
  }
  if (options.reap.enable && !isNaN(options.reap.count)) {
    options.reap.offset = options.reap.count * lookup[options.reap.interval]
  }
  browser.storage.local.set({options: options})
}

function reset () {
  if (!window.confirm('Reset all settings to addon defaults?')) return
  browser.storage.local.set({options: defaults}).then(() => load())
}

function removeAll () {
  if (!window.confirm('Delete all saved form data?')) return
  let result = browser.storage.local.get('options')
  result.then((config) => {
    browser.storage.local.clear().then(() => {
      browser.storage.local.set(config)
    })
  })
}

function exportData () {
  let result = browser.storage.local.get()
  result.then((all) => {
    delete all['options']
    let file = new window.File([JSON.stringify(all)], 'formsave.json', {type: 'application/json'})
    let url = window.URL.createObjectURL(file)
    window.open(url)
  })
}

document.addEventListener('DOMContentLoaded', load)
document.querySelector('#save').addEventListener('click', save)
document.querySelector('#reset').addEventListener('click', reset)
document.querySelector('#remove-all').addEventListener('click', removeAll)
document.querySelector('#export').addEventListener('click', exportData)
