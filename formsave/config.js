/* global _ */

const configDefaults = {
  reap: {
    enable: false,
    count: 1,
    interval: 'day',
    offset: null
  },
  debounce: 200,
  excludes: {
    text: '# incorrect rules will automatically be commented out and ignored',
    regexes: []
  }
}

function config () { // eslint-disable-line
  let result = browser.storage.local.get('options')
  return result.then((storage) => {
    let configOptions = _.get(storage, 'options', {})
    let output = _.merge({}, configDefaults, configOptions)
    if (!output.reap.enable) output.reap.offset = null
    return output
  })
}
