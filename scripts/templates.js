const fs = require('fs')
const chokidar = require('chokidar')
const Log = require('log')
const templates = require('templates')

const log = new Log('info')
const app = templates()
app.engine('json', require('engine-lodash'))
app.engine('html', require('engine-lodash'))
app.create('pages')

const opts = {}
const optionSources = ['settings.json', 'package.json']

const run = (path, outDir, options) => {
  const parts = path.split('/')
  const file = parts[parts.length - 1]
  fs.readFile(path,'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    app.page(file, {content: data})
    write(file, outDir, options)
  })
}

const write = (name, outDir, options) => {
  app.render(name, options, function(err, view) {
    if (err) {
      throw err
    } else {
     fs.writeFile(`${outDir}/${name}`, view.content, {})
    }
  })
}



var watcher = chokidar.watch('src/tpl/**/*', {
  ignored: /[\/\\]\./,
  persistent: true
})

watcher.add(optionSources)

const getOptions = () => {
  return new Promise((resolve,reject)=>{
   fs.readFile('./package.json','utf8', (pErr, pkg) => {
      if (pErr) {
         reject(pErr);
      }
      fs.readFile('./settings.json','utf8', (sErr, settings) => {
        if (sErr) {
           reject(sErr);
        }
        pkg = JSON.parse(pkg)
        settings = JSON.parse(settings)
        const data = Object.assign({},pkg,settings)
        resolve(data)
      })
    })
  })
}

const render = (path) => {
  if (optionSources.indexOf(path) >= 0) {
    getOptions().then((response)=>{
      Object.assign(opts,{
        name: response.name,
        version: response.version,
        description: response.description,
        homepageUrl: response.homepageUrl,
        popupTitle: response.popupTitle,
        matches: response.matches,
      })
        run('src/tpl/manifest.json', 'public', opts)
        run('src/tpl/popup.html', 'public', opts)
        run('src/tpl/background.html', 'public', opts)
      
    })
  } else {
    run(path, 'public', opts)
  }
}

watcher
  .on('add', path => render(path))
  .on('change', path => render(path))


