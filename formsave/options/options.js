/* global _, config, configDefaults */

const matchPattern = require('match-pattern')

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

let exportAll = document.querySelector('#export-all')

function regexify (text) {
  let regexes = []
  let lines = text.split(/\r\n|\r|\n/g)
  let isBlank = (line) => _.trim(line) === '' || line.startsWith('#')
  for (let line of lines) {
    if (isBlank(line)) continue
    let trimmed = _.trim(line)
    let pattern = matchPattern.parse(trimmed)
    if (pattern === null) {
      text = text.replace(line, '# ' + line)
    } else {
      regexes.push(pattern.source)
    }
  }

  return {
    text: text,
    regexes: regexes
  }
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
    excludes: regexify(excludes.value)
  }
  if (options.reap.enable && !isNaN(options.reap.count)) {
    options.reap.offset = options.reap.count * lookup[options.reap.interval]
  }
  browser.storage.local.set({options: options}).then(() => {
    excludes.value = options.excludes.text
  })
}

function confirmation (question) {
  // Chrome(ium) does not allow popups in the options page
  if (/Chrom/.test(navigator.userAgent)) return true
  return window.confirm(question)
}

function reset () {
  if (!confirmation('Reset all settings to addon defaults?')) return
  browser.storage.local.set({options: configDefaults}).then(() => load())
}

function removeAll () {
  if (!confirmation('Delete all saved form data?')) return
  let result = browser.storage.local.get('options')
  result.then((config) => {
    browser.storage.local.clear().then(() => {
      browser.storage.local.set(config)
    })
  })
}

function exportData () {
  if (exportAll.href.startsWith('blob')) return
  let result = browser.storage.local.get()
  result.then((all) => {
    delete all['options']
    let file = new window.File([JSON.stringify(all)], 'formsave.json', {type: 'application/json'})
    let url = window.URL.createObjectURL(file)
    exportAll.href = url
  })
}

exportData()

document.addEventListener('DOMContentLoaded', load)
document.querySelector('#save').addEventListener('click', save)
document.querySelector('#reset').addEventListener('click', reset)
document.querySelector('#remove-all').addEventListener('click', removeAll)
