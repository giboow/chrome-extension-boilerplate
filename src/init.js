/* global Promise */

import database from './database'
import extension from './helpers/chrome-extension'
const {setBadge} = extension

const init = (version) => {
  return new Promise((resolve, reject) => {
    database.getInitialData().then(namespace => {
      if (!namespace) {
        database.setData(version, {
          entries: [],
          itemID: 0
        }).then(data => {
          resolve(data)
          setBadge('')
        }).catch(err => reject(err))

      } else {
        if (version in namespace) {
          resolve(namespace[version])
          setBadge(`${namespace[version].entries.length || ''}`)
        } else {
          database.setData(version, {
            entries: [],
            itemID: 0
          }).then(data => {
            resolve(data)
            setBadge('')
          }).catch(err => reject(err))
        }
      }
    }).catch(err => reject(err))
  })
}

export default init
