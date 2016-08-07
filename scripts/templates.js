const fs = require('fs')
const chokidar = require('chokidar')
const Log = require('log')
const templates = require('templates')

const log = new Log('info')
const app = templates()
app.engine('json', require('engine-lodash'))
app.create('pages')


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


const manifest = 'src/tpl/manifest.json'

var watcher = chokidar.watch(manifest, {
  ignored: /[\/\\]\./,
  persistent: true
});
watcher.add(['package.json', 'settings.json'])

const manifestOpts = () => {
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

const render = () => {
  manifestOpts().then((response)=>{
    const opts = {
      name: response.name,
      version: response.version,
      description: response.description,
      homepage_url: response.homepageUrl,
      popup_title: response.popupTitle,
    }
    run(manifest, 'public', opts)
  })
}

watcher
  .on('add', render)
  .on('change', render)
