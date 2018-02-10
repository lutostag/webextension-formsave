/* eslint-env mocha */

const assert = require('assert')
const assetsPrefix = 'file://' + process.cwd() + '/tests/assets/'
function extensionPrefix () {
  if (browser.desiredCapabilities.browserName.match(/firefox/)) {
    return 'moz-extension://88de8cc8-d1ce-484a-bd9f-dd0b100cf262/'
  }
  return 'chrome-extension://ccphhodncefjddemjgiogffigdonldhd/'
}

describe('formsave', function () {
  it('has a reachable moz-extension', function () {
    browser.url(extensionPrefix() + 'icons/icon.svg')
    assert(browser.element('svg').value !== null)
  })
  it('saves forms', function () {
    browser.url(assetsPrefix + 'textarea.html')
    browser.setValue('#textarea', 'foo')
    browser.pause(300)
    browser.url(extensionPrefix() + 'popup/formsave.html')
    browser.click('.clip')
    assert(browser.getValue('textarea') === 'foo')
  })
  describe('popup', function () {
    it('searches', function () {
      browser.url(extensionPrefix() + 'popup/formsave.html')
      browser.setValue('#search', 'foo')
      browser.pause(300)
      browser.click('.clip')
      assert(browser.element('.clip').value !== null)
      browser.setValue('#search', 'something')
      browser.pause(300)
      assert(browser.element('.clip').value === null)
    })
    it('sorts', function () {
      browser.url(assetsPrefix + 'textarea2.html')
      browser.setValue('#textarea', 'bar')
      browser.pause(300)
      browser.url(extensionPrefix() + 'popup/formsave.html')
      browser.click('.clip')
      browser.click('#url')
      let element = browser.element('#selection-table > div').value.ELEMENT
      assert(!browser.elementIdAttribute(element, 'class').value.includes('selected'))
    })
    it('can reverse sort', function () {
      browser.click('#url')
      let element = browser.element('#selection-table > div').value.ELEMENT
      assert(browser.elementIdAttribute(element, 'class').value.includes('selected'))
    })
  })
  describe('options', function () {
    it('clears-all', function () {
      browser.url(extensionPrefix() + 'formsave/options.html')
      browser.click('#remove-all')
      browser.alertAccept()
      browser.url(extensionPrefix() + 'popup/formsave.html')
      assert(browser.element('.clip').value === null)
    })
  })
})
