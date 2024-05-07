import { defineBackground } from 'wxt'

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })
})
