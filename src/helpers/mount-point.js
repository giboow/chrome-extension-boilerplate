/* global document */
import namespace from '../etc/namespace'
const mountPoint = (target) => {
  const el = document.createElement('div')
  el.className = `${namespace}__ROOT`
  try {
    target.appendChild(el)
  } catch (err) {
    throw err
  }
  return el
}

export default mountPoint
