import raf from './raf'

let styles = ''

export function injectStyle (cssContent) {
  styles += cssContent
  const styleNode = document.querySelector('#as-style-common')
  if (styleNode) {
    styleNode.styleSheet.cssText += cssContent
  } else {
    raf.setTimeout(() => {
      const cssNode = document.createElement('style')
      cssNode.setAttribute('type', 'text/css')
      cssNode.classList.add('as-style')
      cssNode.id = 'as-style-common'
      cssNode.appendChild(document.createTextNode(styles))
      styles = ''
      const container = (document.body || document.head || document.documentElement || document)
      container.appendChild(cssNode)
    }, 0)
  }
}
