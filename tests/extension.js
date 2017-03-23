/* eslint-env mocha */

const assert = require('assert')

describe('formsave', function () {
  it('has a reachable moz-extension', function () {
    browser.url('moz-extension://88de8cc8-d1ce-484a-bd9f-dd0b100cf262/icons/icon.svg')
    assert(browser.element('svg').value !== null)
  })
})
