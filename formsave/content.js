/* global _ */

const selector = 'textarea, *[contenteditable="true"]'
let listened = []
let debounceTimeout = getDebounceTimeout()
setupHandlers()

function toArray (nodeList) {
  return Array.prototype.slice.call(nodeList)
}

function setupHandlers (calledEvent) {
  let texts = toArray(document.querySelectorAll(selector))
  document.querySelectorAll('iframe').forEach(item => {
    try {
      texts = texts.concat(toArray(item.contentWindow.document.querySelectorAll(selector)))
    } catch (err) {}
  })
  for (let text of texts) {
    if (!listened.includes(text)) {
      listened.push(text)
      debounceTimeout.then((timeout) => {
        text.addEventListener('input', _.debounce(changeHandler, timeout), false)
        text.addEventListener('change', _.debounce(changeHandler, timeout))
      })
    }
  }
}

function changeHandler (calledEvent) {
  let target = calledEvent.target
  let item = {
    url: document.URL,
    id: target.id,
    time: new Date().toISOString(),
    content: target.value || target.textContent
  }
  item.uniq = _.escape(item.url + '##' + item.id)
  browser.storage.local.set({[item.uniq]: item})
}

function getDebounceTimeout () {
  let result = browser.storage.local.get('options')
  return result.then((storage) => {
    let options = storage.options
    if (typeof options === 'undefined' || typeof options.debounce === 'undefined') {
      return 200
    }
    return options.debounce
  })
}
