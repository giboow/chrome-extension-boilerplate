/* global exports, Promise, chrome */
import Store from './store'
import dataVersion from '../etc/data-version'
import namespace from '../etc/namespace'

const database = new Store('local', namespace)


const load = (key) => {
  return new Promise((resolve, reject) => {
    database.getData(dataVersion)
      .then(data => {
        if (key && key.trim() !== '') {
          resolve(data[key])
        } else {
          resolve(data)
        }
      })
      .catch(err => reject(err))
  })
}

const save = (newData) => {
  return new Promise((resolve, reject) => {
    load().then(loaded => {
      Object.assign(loaded, newData)
      database.setData(dataVersion, loaded).then(saved => {
        resolve(saved)
      })
    }).catch(err => reject(err))
  })
}


const {onChanged} = chrome.storage


Object.assign(exports, {
  save,
  load,
  onChanged
})


export default database
