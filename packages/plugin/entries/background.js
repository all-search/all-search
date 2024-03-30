import browser from 'webextension-polyfill'

browser.runtime.onUpdateAvailable.addListener(() => {
  console.log('插件有新的版本了')
})
