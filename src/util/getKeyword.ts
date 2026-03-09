type InputElement = HTMLInputElement | HTMLTextAreaElement;

// 判断 NodeList 中是否有可用的
function findInNodeList (list: NodeListOf<Element>): Element | undefined {
  return Array.from(list).find((item) => isValidate(item as HTMLElement))
}

function isValidate (el: HTMLElement): boolean {
  return isInput(el) && isVisible(el)
}

function isInput (el: HTMLElement): boolean {
  const nodeName = el.nodeName.toLowerCase()
  if (['input', 'textarea'].includes(nodeName)) {
    const inputEl = el as HTMLInputElement
    return ['text', 'search', 'textarea'].includes(inputEl.type)
  }
  return true
}

// 判断元素是否可见
function isVisible (el: HTMLElement): boolean {
  const style = getComputedStyle(el)
  return (
    !!el.getClientRects().length &&
    style.visibility !== 'hidden' &&
    style.width !== '0px' &&
    style.height !== '0px' &&
    style.opacity !== '0'
  )
}

/**
 * 获取页面中的搜索框 DOM
 */
export function getSearchDom (): HTMLElement | undefined {
  const el = document.querySelector('input[type=search],input[type=text][autocomplete=off],input[autocomplete=off]:not([type])') ||
    document.querySelector('input[type=text][name][value],input[name][value]:not([type])')
  
  if (el && isValidate(el as HTMLElement)) {
    return el as HTMLElement
  }

  // 选择第一个 type 为 search 或存在 autofocus 且在页面显示的
  const autofocusOrSearch = document.querySelector('input[autofocus],input[type=search]')
  if (autofocusOrSearch && isValidate(autofocusOrSearch as HTMLElement)) {
    return autofocusOrSearch as HTMLElement
  }

  // 选择第一个 id/class 中包含[search]关键词且在页面显示的
  const idOrClassContainSearch = document.querySelectorAll('input[id*=search],input[class*=search]')
  if (idOrClassContainSearch.length) {
    const found = findInNodeList(idOrClassContainSearch)
    if (found) return found as HTMLElement
  }

  // 选择第一个 placeholder 中包含[search/搜索]关键词且在页面显示的
  const placeholderContainSearch = document.querySelectorAll('input[placeholder*=search],input[placeholder*=搜索]')
  if (placeholderContainSearch.length) {
    const found = findInNodeList(placeholderContainSearch)
    if (found) return found as HTMLElement
  }

  // 选择第一个在页面显示的
  const textInputTypes = ['hidden', 'button', 'checkbox', 'color', 'file', 'image', 'radio', 'range', 'reset', 'submit']
  const selector = textInputTypes.map(t => `[type=${t}]`).join(',')
  const firstInput = document.querySelector(`input:not(${selector}), textarea`)
  if (firstInput && isValidate(firstInput as HTMLElement)) {
    return firstInput as HTMLElement
  }

  const inputSearch = document.getElementsByTagName('input')
  const sameKeywordInput = Array.from(inputSearch).find((item) => {
    if (
      item.value &&
      decodeURI(window.location.pathname + window.location.search).includes(item.value)
    ) {
      return item
    }
  })
  if (sameKeywordInput) {
    return sameKeywordInput as HTMLElement
  }
  
  return undefined
}

/**
 * 获取搜索关键字
 */
export function getKeyword (): string | undefined {
  const el = getSearchDom()
  if (el) {
    let val = ''
    if (['INPUT', 'TEXTAREA'].includes(el.nodeName)) {
      val = (el as InputElement).value
    } else {
      val = el.textContent || ''
    }
    return encodeURIComponent(val)
  }
  console.log('没有找到搜索关键字')
  return undefined
}
