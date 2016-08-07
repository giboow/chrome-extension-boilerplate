/* global Promise */

import database from './database'
import extension from './helpers/chrome-extension'
const {setBadge} = extension

const init = (version) => {
  return new Promise((resolve, reject) => {
    database.getInitialData().then(namespace => {
      setBadge('')
      if (!namespace) {
        database.setData(version, {
          entries: [],
          itemID: 0
        }).then(data => {
          resolve(data)
        }).catch(err => reject(err))

      } else {
        if (version in namespace) {
          resolve(namespace[version])
        } else {
          database.setData(version, {
            entries: [],
            itemID: 0
          }).then(data => {
            resolve(data)
          }).catch(err => reject(err))
        }
      }
    }).catch(err => reject(err))
  })
}

export default init
