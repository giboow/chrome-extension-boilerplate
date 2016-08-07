const fs = require('fs')
const Log = require('log')
const browserify = require('browserify')
const babelify = require('babelify')
const errorify = require('errorify')
const cssmodulesify = require('css-modulesify')

const log = new Log('info')

const files = ['inject', 'background', 'popup']

files.forEach(file => {
  const b = browserify({
    entries: [`src/${file}.js`],
    plugin: [errorify]
  })
  b.plugin(cssmodulesify, {
    rootDir: __dirname,
    output: `public/css/${file}.css`
  })
  function bundle() {
    b.bundle().pipe(fs.createWriteStream(`public/js/${file}.js`))
  }
  b.on('log',  message => log.info(message))
  bundle()
})
