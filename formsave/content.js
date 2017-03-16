let texts = document.querySelectorAll('textarea', 'div[contenteditable="true"]')
texts.forEach((text) => {
  text.addEventListener('input', changeHandler, false)
  text.addEventListener('change', changeHandler)
})

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
