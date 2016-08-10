/* global chrome */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if ('badgeText' in request) {
    const badge = {
      text: `${request.badgeText}`
    }
    chrome.browserAction.setBadgeText(badge)
    sendResponse(badge)
  } else {
    sendResponse(request)
  }
})
