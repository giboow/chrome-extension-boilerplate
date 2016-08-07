/* global chrome, Promise */
const {runtime, storage} = chrome


class Store {
  constructor(type, namespace) {
    this.storage = storage[type]
    this.namespace = namespace
    this.data = {}
    this.setData = this.setData.bind(this)
    this.getData = this.getData.bind(this)
    this.getInitialData = this.getInitialData.bind(this)
  }

  get data() {
    return this.DATA
  }

  set data(newData) {
    const oldData = this.data
    this.DATA = Object.assign({}, oldData, newData)
  }

  setData(key, value) {
    return new Promise((resolve, reject) => {
      const data = this.data
      data[key] = value
      this.data = data
      this.storage.set({
        [this.namespace]: this.data
      }, () => {
        if (runtime.lastError) {
          reject(runtime.lastError)
        } else {
          resolve(value)
        }
      })
    })
  }
  getInitialData() {
    return new Promise((resolve, reject) => {
      this.storage.get(this.namespace, (results) => {
        if (runtime.lastError) {
          reject(runtime.lastError)
        } else {
          resolve(results[this.namespace])
        }
      })
    })
  }
  getData(key) {
    return new Promise((resolve, reject) => {
      this.storage.get(this.namespace, (results) => {
        if (runtime.lastError) {
          reject(runtime.lastError)
        } else {
          if (key.trim !== undefined) {
            resolve(results[this.namespace][key])
          } else {
            resolve(results[this.namespace])
          }
        }
      })
    })
  }
}

export default Store
