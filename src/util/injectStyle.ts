import raf from './raf'

let id: symbol | null = null
let styles = ''

export function injectStyle (cssContent: string): void {
  styles += cssContent
  const styleNode = document.querySelector('#as-style-common') as any
  
  if (styleNode && styleNode.styleSheet) {
    styleNode.styleSheet.cssText += styles
    styles = ''
  } else if (!id) {
    id = raf.setTimeout(() => {
      const cssNode = document.createElement('style')
      cssNode.setAttribute('type', 'text/css')
      cssNode.classList.add('as-style')
      cssNode.id = 'as-style-common'
      cssNode.appendChild(document.createTextNode(styles))
      styles = ''
      
      const asRoot = document.getElementById('all-search')
      const container = (asRoot || document.body || document.head || document.documentElement || document)
      if (container) {
        container.appendChild(cssNode)
      }
      id = null
    }, 0)
  }
}
