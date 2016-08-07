# Chrome extension boilerplate

A simple boilerplate for chrome extensions.


[![GitHub license](https://img.shields.io/github/license/pixelass/chrome-extension-boilerplate.svg)](https://github.com/pixelass/chrome-extension-boilerplate/blob/master/LICENSE)  
[![Travis](https://img.shields.io/travis/pixelass/chrome-extension-boilerplate.svg)](https://travis-ci.org/pixelass/chrome-extension-boilerplate)
[![David](https://img.shields.io/david/pixelass/chrome-extension-boilerplate.svg)](https://david-dm.org/pixelass/chrome-extension-boilerplate)
[![David](https://img.shields.io/david/dev/pixelass/chrome-extension-boilerplate.svg)](https://david-dm.org/pixelass/chrome-extension-boilerplate#info=devDependencies&view=table)  
[![GitHub issues](https://img.shields.io/github/issues/pixelass/chrome-extension-boilerplate.svg)](https://github.com/pixelass/chrome-extension-boilerplate/issues)
[![GitHub forks](https://img.shields.io/github/forks/pixelass/chrome-extension-boilerplate.svg)](https://github.com/pixelass/chrome-extension-boilerplate/network)
[![GitHub stars](https://img.shields.io/github/stars/pixelass/chrome-extension-boilerplate.svg)](https://github.com/pixelass/chrome-extension-boilerplate/stargazers)  
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


## Browser support
* Chrome
* Opera
* Firefox 50+

## Usage

### settings.json

```js
{
  "name": "my-extension", // default is pkg.name
  "description": "This is my extension", // default is pkg.description
  "dataVersion": "0", // useful for development
  "namespace": "MY_NAMESPACE", // global namespace for chrome.storage
  "homepageUrl": "http://my-chrome-extension.tld",
  "popupTitle": "my Popup" // title of the popup icon
}
```

### Clone
```shell
cd path/to/my/projects
git clone git@github.com:pixelass/chrome-extension-boilerplate.git my-extension
cd my-extension
```

### Run
```shell
cd my-extension
npm i
npm run build
```

### Watch
```shell
npm run watch
```

### Lint
```shell
npm run lint
```

### Format
```shell
npm run format
```

### Test
```shell
npm test
```
