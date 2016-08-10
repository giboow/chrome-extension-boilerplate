/* global chrome */
const {runtime} = chrome
const sendMessage = message => runtime.sendMessage(message, () => {
})
const setBadge = badgeText => sendMessage({
  badgeText
}, () => {
})

const port = options => chrome.runtime.connect(options)

const extension = {
  setBadge,
  sendMessage,
  port
}



export default extension
