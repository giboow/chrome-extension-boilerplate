/* global exports, Promise */
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

const remove = (ID) => {
  return new Promise((resolve, reject) => {
    load().then(loaded => {
      const {entries} = loaded
      const index = (items => {
        let counter = items.length
        while (counter) {
          if (items[--counter].itemID === ID) {
            return counter
          }
        }
        return -1
      })(entries)
      if (index >= 0) {
        entries.splice(index, 1)
      }
      save({
        entries
      }).then((saved) => {
        resolve(saved)
      })
    }).catch(err => reject(err))
  })
}


Object.assign(exports, {
  save,
  load,
  remove
})


export default database
