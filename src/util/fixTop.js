import { removeNode } from './index'

const customStyle = document.createElement('style')
customStyle.class = 'as-custom-style'
const head = document.getElementsByTagName('head')[0]
head.appendChild(customStyle)

export function fixTop () {
  removeNode('.as-custom-style')

  var elems = document.body.getElementsByTagName('div')
  var len = elems.length

  for (var i = 0; i < len; i++) {
    let style = window.getComputedStyle(elems[i], null)
    let position = style.getPropertyValue('position')
    let display = style.getPropertyValue('display')
    let visible = style.getPropertyValue('visible')
    let width = style.getPropertyValue('width')
    let height = style.getPropertyValue('height')
    let top = style.getPropertyValue('top')
    if (
      (position === 'fixed' || position === 'absolute')
      && display !== 'none'
      && visible !== 'hidden'
      && width !== '0px' && height !== '0px'
      && elems[i].offsetParent && elems[i].offsetParent.tagName === 'BODY'
    ) {
      elems[i].classList.add(`as-fix-top`)
      // let selectorText
      // if (elems[i].id) {
      //   selectorText = `#${elems[i].id}`
      // } else if (elems[i].class) {
      //   selectorText = `#.${elems[i].class}`
      // } else {
      //   selectorText = `as-fix-top-${i}`
      // }
    }
  }

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
  list = [...new Set(list)].filter(item => item && item.indexOf('as-container') < 0)
  list = list
    .filter(selectorText => selectorText.indexOf('.as-') === -1)
    .map(selectorText => ({
      el: document.querySelector(selectorText),
      selectorText
    }))
    .filter(item => {
      console.log(item.el)
      return item.el && item.el.classList.contains('as-fix-top')
    })
  console.log(list)

  list.forEach(item => {
    const top = window.getComputedStyle(item.el).getPropertyValue('top')
    const position = window.getComputedStyle(item.el).getPropertyValue('position')
    console.log(item.el, item.selectorText, position, top)
    if (top && top.indexOf('px') > -1) {
      customStyle.sheet.addRule(item.selectorText, `top: ${parseFloat(top.replace('px', '')) + 30 + 'px'}`)
    }
  })
}

function searchForCss (searchClassName) {
  for (let i = 0; i < document.styleSheets.length; i++) {
    let styleSheet = document.styleSheets[i]
    try {
      for (let j = 0; j < styleSheet.cssRules.length; j++) {
        let rule = styleSheet.cssRules[j]
        if (
          rule.selectorText
          && rule.selectorText.includes(searchClassName)
          && rule.cssText.includes('position:')
        ) {
          console.log('found - ', rule.selectorText, ' ', i, '-', j)
        }
      }
      if (styleSheet.imports) {
        for (let k = 0; k < styleSheet.imports.length; k++) {
          let imp = styleSheet.imports[k]
          for (let l = 0; l < imp.cssRules.length; l++) {
            let rule = imp.cssRules[l]
            if (
              rule.selectorText &&
              rule.selectorText.includes(searchClassName)
              && rule.cssText.includes('position:')
            ) {
              console.log('found - ', rule.selectorText, ' ', i, '-', k, '-', l)
            }
          }
        }
      }
    } catch (err) {
    }
  }
}
