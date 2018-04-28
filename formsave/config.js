/* global _ */

const configDefaults = {
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
    let configOptions = _.get(storage, 'options', {})
    let output = _.merge({}, configDefaults, configOptions)
    if (!output.reap.enable) output.reap.count = null
    return output
  })
}
