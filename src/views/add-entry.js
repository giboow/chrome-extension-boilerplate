/* global Promise */
import {load, save} from '../database'


const addEntry = (entry = {}) => {
  return new Promise((resolve, reject) => {
    load().then(loaded => {
      const {entries, itemID} = loaded
      const newID = 1 + parseInt(itemID, 10)
      Object.assign(entry, {
        itemID: newID
      })
      entries.push(entry)
      const newData = {
        entries,
        itemID: newID
      }
      save(newData).then((saved) => {
        resolve(saved)
      })
    }).catch(err => reject(err))
  })
}

export default addEntry
