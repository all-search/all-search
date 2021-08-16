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
    console.log(err)
  }
}
list = Array.from(new Set(list)).filter(item => item.indexOf('as-container') < 0)
list = list.map(selectorText => ({
  selectorText,
  el: document.querySelector(selectorText)
})).filter(item => item.el)

let sheet = document.styleSheets[0]
for (let i = 0; i < document.styleSheets.length; i++) {
  if (
    document.styleSheets[i].ownerNode
    && document.styleSheets[i].ownerNode.classList
    && document.styleSheets[i].ownerNode.classList.contains('as-custom-style')
  ) {
    sheet = document.styleSheets[i]
    break
  }
}

list.forEach(item => {
  const top = window.getComputedStyle(item.el).getPropertyValue('top')
  console.log(item.el, top)
  if (top) {
    sheet.addRule(item.selectorText, `top: ${top.replace('px', '') + 30 + 'px'}`)
  }
})
