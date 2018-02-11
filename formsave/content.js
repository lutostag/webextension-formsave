/* global _, config */

const selector = 'textarea, *[contenteditable="true"]'
let listened = []
let options = config()
setup()

function toArray (nodeList) {
  return Array.prototype.slice.call(nodeList)
}

async function setup () {
  let regexes = (await options).excludes.regexes
  for (let regex of regexes) {
    try {
      if ((new RegExp(regex)).match(document.URL)) return
    } catch (err) {}
  }
  setupHandlers()
}

async function setupHandlers () {
  let debounceTimeout = (await options).debounce
  let texts = toArray(document.querySelectorAll(selector))
  document.querySelectorAll('iframe').forEach(item => {
    try {
      texts = texts.concat(toArray(item.contentWindow.document.querySelectorAll(selector)))
    } catch (err) {}
  })
  for (let text of texts) {
    if (!listened.includes(text)) {
      listened.push(text)
      text.addEventListener('input', _.debounce(changeHandler, debounceTimeout), false)
      text.addEventListener('change', _.debounce(changeHandler, debounceTimeout))
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
