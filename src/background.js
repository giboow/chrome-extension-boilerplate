/* global chrome */

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  const {badgeText} = request
  if (badgeText || badgeText === '') {
    const badge = {
      text: `${badgeText}`
    }
    chrome.browserAction.setBadgeText(badge)
    sendResponse(badge)
  } else {
    sendResponse(request)
  }
})
