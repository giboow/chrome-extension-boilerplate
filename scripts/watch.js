const fs = require('fs')
const Log = require('log')
const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')
const errorify = require('errorify')
const cssModulesify = require('css-modulesify')
const autoprefixer = require('autoprefixer')

const log = new Log('info')

const files = ['inject', 'background', 'popup']

files.forEach(file => {
  const b = browserify({
    entries: [`src/${file}.js`],
    debug: true,
    plugin: [watchify, errorify]
  })
  b.plugin(cssModulesify, {
    rootDir: __dirname,
    output: `public/css/${file}.css`,
    after: [autoprefixer],
    generateScopedName: cssModulesify.generateShortName
  })

  function bundle() {
    b.bundle().pipe(fs.createWriteStream(`public/js/${file}.js`))
  }
  b.on('update', bundle)
  b.on('log',  message => log.info(message))
  bundle()
})

require('./templates')
