/* global chrome */
const sendMessage = message => chrome.runtime.sendMessage(message, () => {
})
const setBadge = badgeText => sendMessage({
  badgeText
}, () => {
})
const extension = {
  setBadge,
  sendMessage
}

export default extension
