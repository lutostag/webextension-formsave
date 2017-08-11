/* global _ */

const selector = 'textarea, *[contenteditable="true"]'
let listened = []
setupHandlers()

let observer = new MutationObserver(_.debounce(setupHandlers, 500))
observer.observe(document.documentElement, { attributes: true, childList: true, characterData: true, subtree: true })

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
      text.addEventListener('input', _.debounce(changeHandler, 200), false)
      text.addEventListener('change', _.debounce(changeHandler, 200))
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
