/* global _ */

const defaults = {
  reap: {
    enable: false,
    count: null,
    interval: 'day'
  },
  debounce: 200,
  excludes: {
    text: '',
    regexes: []
  }
}

function config () { // eslint-disable-line
  let result = browser.storage.local.get('options')
  return result.then((storage) => {
    return _.merge({}, defaults, storage.options)
  })
}
