/* eslint-env mocha */

const assert = require('assert')
const prefix = 'moz-extension://88de8cc8-d1ce-484a-bd9f-dd0b100cf262/'

describe('formsave', function () {
  it('has a reachable moz-extension', function () {
    browser.url(prefix + 'icons/icon.svg')
    assert(browser.element('svg').value !== null)
  })
  it('can save forms', function () {
    browser.url('http://www.yamllint.com/')
    browser.setValue('#yaml', 'something to say')
    browser.pause(500)
    browser.url(prefix + 'popup/formsave.html')
    browser.pause(300)
    browser.click('.clip')
    assert(browser.getValue('textarea') === 'something to say')
  })
})
