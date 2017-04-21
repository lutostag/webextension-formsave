exports.config = {
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    './tests/**/*.js'
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 2,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  firefoxProfile: {
    extensions: [
      './formsave' // path to .xpi file
    ],
    'extensions.webextensions.uuids': '{"{88de8cc8-d1ce-484a-bd9f-dd0b100cf262}":"88de8cc8-d1ce-484a-bd9f-dd0b100cf262"}',
    'xpinstall.signatures.required': false
  },
  capabilities: [
    {
      browserName: 'firefox',
      firefox_binary: '/home/lutostag/Downloads/ffx/firefox/firefox'
    },
    {
      browserName: 'chrome',
      chromeOptions: {
        binary: '/usr/bin/chromium-browser',
        args: ['--temp-profile', '--password-store=basic', '--load-extension=formsave', 'about:blank']
      }
    }
  ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'silent',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Saves a screenshot to a given path if a command fails.
  // screenshotPath: './errorShots/',
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  baseUrl: 'http://localhost',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as properties. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  // plugins: {
  //     webdrivercss: {
  //         screenshotRoot: 'my-shots',
  //         failedComparisonsRoot: 'diffs',
  //         misMatchTolerance: 0.05,
  //         screenWidth: [320,480,640,1024]
  //     },
  //     webdriverrtc: {},
  //     browserevent: {}
  // },
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['firefox-profile', 'selenium-standalone'],
  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/testrunner/reporters.html
  reporters: ['dot'],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd'
  },
  seleniumLogs: './',
  seleniumArgs: {
    version: '3.3.1',
    drivers: {
      firefox: {
        version: '0.15.0'
      },
      chrome: {
        version: '2.28'
      }
    }
  },
  seleniumInstallArgs: {
    version: '3.3.1',
    drivers: {
      firefox: {
        version: '0.15.0'
      },
      chrome: {
        version: '2.28'
      }
    }
  }
}
