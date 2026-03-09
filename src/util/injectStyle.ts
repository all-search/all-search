import raf from './raf'
import { getAsRoot } from './dom'

let id: symbol | null = null
let styles = ''

export function injectStyle (cssContent: string): void {
  styles += cssContent
  
  const host = getAsRoot()
  const container = host?.shadowRoot
  
  if (!container) {
    return
  }

  const styleNode = container.querySelector('#as-style-common') as any
  
  if (styleNode && styleNode.styleSheet) {
    styleNode.styleSheet.cssText += styles
    styles = ''
  } else if (!id) {
    id = raf.setTimeout(() => {
      const currentHost = getAsRoot()
      const currentContainer = currentHost?.shadowRoot
      if (!currentContainer) return

      let currentStyleNode = currentContainer.querySelector('#as-style-common')
      if (!currentStyleNode) {
        currentStyleNode = document.createElement('style')
        currentStyleNode.setAttribute('type', 'text/css')
        currentStyleNode.classList.add('as-style')
        currentStyleNode.id = 'as-style-common'
        currentContainer.appendChild(currentStyleNode)
      }
      
      currentStyleNode.appendChild(document.createTextNode(styles))
      styles = ''
      id = null
    }, 0)
  }
}