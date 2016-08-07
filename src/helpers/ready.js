/* global document, window, Promise */

const readyState = new Promise((resolve, reject) => {
  let counter = 0
  const limit = 1500
  const runCheck = () => {
    if (document.readyState === 'complete') {
      window.cancelAnimationFrame(runCheck)
      resolve()
    } else {
      if (++counter > limit) {
        const err = new Error('timeout')
        reject(err)
      } else {
        window.requestAnimationFrame(runCheck)
      }
    }
  }
  runCheck()
})

export default readyState
