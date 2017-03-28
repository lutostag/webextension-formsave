/* global _ */

let texts = document.querySelectorAll('textarea', 'div[contenteditable="true"]')
for (let text of texts) {
  text.addEventListener('input', _.debounce(changeHandler, 200), false)
  text.addEventListener('change', _.debounce(changeHandler, 200))
}

function changeHandler (calledEvent) {
  let target = calledEvent.target
  let item = {
    url: document.URL,
    id: target.id,
    time: new Date(),
    content: target.value
  }
  let key = item.url + '##' + item.id
  browser.storage.local.set({[key]: item})
}
