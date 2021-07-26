import {addStyleContent} from './index'
let list = []
for (let i = 0; i < document.styleSheets.length; i++) {
  try {
    if (document.styleSheets[i] && document.styleSheets[i].cssRules) {
      let cssRules = document.styleSheets[i].cssRules
      if (cssRules.length) {
        for (let j = 0; j < cssRules.length; j++) {
          if (cssRules[j] && cssRules[j].style && cssRules[j].style.position === 'fixed') {
            list.push(cssRules[j].selectorText)
          }
        }
      }
    }
  } catch (err) {

  }
}
list = Array.from(new Set(list)).filter(item => item.indexOf('as-container') < 0)

list = list
  .filter(selectorText => selectorText.indexOf('.as-') === -1)
  .map(selectorText => ({
    el: document.querySelector(selectorText),
    selectorText
  }))
  .filter(item => item.el)

const style = document.createElement('style')
style.class = 'as-custom-style'
const head = document.getElementsByTagName('head')[0]
head.appendChild(style)

list.forEach(item => {
  const top = window.getComputedStyle(item.el).getPropertyValue('top')
  const position = window.getComputedStyle(item.el).getPropertyValue('position')
  console.log(item.el, item.selectorText, position, top)
  if (top.indexOf('px') > -1) {
    style.sheet.addRule(item.selectorText, `top: ${parseFloat(top.replace('px', '')) + 30 + 'px'}`)
  }
})
