/* global document */
import React from 'react'
import ReactDOM from 'react-dom'

import readyState from './helpers/ready'
import mountPoint from './helpers/mount-point'
import DATA_VERSION from './etc/data-version'

import init from './init'
import App from './views/app'


readyState.then(() => {
  const mounter = mountPoint(document.body)
  init(DATA_VERSION).then(data => {
    ReactDOM.render(<App data={data}/>, mounter)
  }).catch(err => {
    throw err
  })
}).catch((err) => {
  throw err
})
