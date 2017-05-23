/* global _ */

// Firefox for android menu item
if (typeof window.orientation !== 'undefined') {
  window.NativeWindow.menu.add({
    name: 'FormSave',
    parent: window.NativeWindow.menu.toolsMenuID,
    icon: browser.extension.getURL('icons/icon.svg'),
    callback: function () {
      window.open(browser.extension.getURL('popup/formsave.html'), 'FormSave')
    }
  })
}

let texts = document.querySelectorAll('textarea, div[contenteditable="true"]')
for (let text of texts) {
  text.addEventListener('input', _.debounce(changeHandler, 200), false)
  text.addEventListener('change', _.debounce(changeHandler, 200))
}

function changeHandler (calledEvent) {
  let target = calledEvent.target
  let item = {
    url: document.URL,
    id: target.id,
    time: new Date().toISOString(),
    content: target.value
  }
  item.uniq = item.url + '##' + item.id
  browser.storage.local.set({[item.uniq]: item})
}
