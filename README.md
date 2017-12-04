# FormSave <img src="https://cdn.rawgit.com/lutostag/webextension-formsave/master/formsave/icons/icon.svg" alt="" width="32" height="32">
[![Travis](https://img.shields.io/travis/lutostag/webextension-formsave/master.svg)](https://travis-ci.org/lutostag/webextension-formsave) [![Code Climate](https://img.shields.io/codeclimate/github/lutostag/webextension-formsave.svg)](https://codeclimate.com/github/lutostag/webextension-formsave/) [![Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com/) [![GitHub tag](https://img.shields.io/github/tag/lutostag/webextension-formsave.svg)](https://github.com/lutostag/webextension-formsave/) [![Mozilla Add-on](https://img.shields.io/amo/v/formsave.svg)](https://addons.mozilla.org/en-US/firefox/addon/formsave/) [![David](https://img.shields.io/david/lutostag/webextension-formsave.svg)](https://david-dm.org/lutostag/webextension-formsave) [![David](https://img.shields.io/david/dev/lutostag/webextension-formsave.svg)](https://david-dm.org/lutostag/webextension-formsave?type=dev)

*A webextension that saves forms automatically*

## Install
* Firefox via [Mozilla Addons](https://addons.mozilla.org/en-US/firefox/addon/formsave/)
* Chromium/Chrome:
> 1. Download the attached `formsave.crx` file from the [latest Github Release](https://github.com/lutostag/webextension-formsave/releases/latest)
> 2. Settings-Icon > Tools > Extensions  
> ( the 'three horizontal-bars' icon in the top-right corner )
> 3. Drag and drop the "crx" extension file onto the Extensions page from [step 1]  
> ( .crx file should likely be in your Downloads directory )
> 4. Automatic updating is enabled, nothing else to do!

## Screenshots
[![popup](https://cdn.rawgit.com/lutostag/webextension-formsave/master/doc/screenshots/popup.png)](https://github.com/lutostag/webextension-formsave/tree/master/doc/screenshots)

## Contribute
* Please submit issues where the text from a textarea is not captured appropriately. (Include the url of the page)

Licensed under GPLv3, original upstream repo @ https://github.com/lutostag/webextension-formsave/

## Develop dependencies
* yarn
* jq
* git
* browser (firefox/chromium/chrome)

To test run `yarn test`

Also to release the software automatically, I use:
* gpg
* github-release
