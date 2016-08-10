/* global Promise */
import {load, save} from '../database'


const removeEntry = (ID) => {
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

export default removeEntry
