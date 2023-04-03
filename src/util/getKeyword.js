// 判断 NodeList 中是否有可用的
function findInNodeList (list) {
  return [].find.call(list, (item) => isVisible(item))
}

// 判断元素是否可见
function isVisible (element) {
  const style = getComputedStyle(element)
  return (
    !!element.getClientRects().length &&
    style.visibility !== 'hidden' &&
    style.width !== 0 &&
    style.height !== 0 &&
    style.opacity !== 0
  )
}

export function getSearchDom () {
  const el = document.querySelector('input[type=search],input[type=text][autocomplete=off],input[autocomplete=off]:not([type])') ||
    document.querySelector('input[type=text][name][value],input[name][value]:not([type])')
  if (el && isVisible(el)) {
    return el
  }
  // 选择第一个 type 为 search 或存在 autofocus 且在页面显示的
  const autofocusOrSearch = document.querySelector('input[autofocus],input[type=search]')
  if (autofocusOrSearch && isVisible(autofocusOrSearch)) {
    return autofocusOrSearch
  }

  // 选择第一个 id/class 中包含[search]关键词且在页面显示的
  const idOrClassContainSearch = document.querySelectorAll('input[id*=search],input[class*=search]')
  if (idOrClassContainSearch.length) {
    const element = findInNodeList(idOrClassContainSearch)
    if (element) {
      return element
    }
  }

  // 选择第一个 placeholder 中包含[search/搜索]关键词且在页面显示的
  const placeholderContainSearch = document.querySelectorAll('input[placeholder*=search],input[placeholder*=搜索]')
  if (placeholderContainSearch.length) {
    const element = findInNodeList(placeholderContainSearch)
    if (element) {
      return element
    }
  }

  // 选择第一个在页面显示的
  const textInputTypes = ['hidden', 'button', 'checkbox', 'color', 'file', 'image', 'radio', 'range', 'reset', 'submit']
  const selector = textInputTypes.map(t => `[type=${t}]`).join(',')
  const firstInput = document.querySelector(`input:not(${selector}), textarea`)
  if (firstInput && isVisible(firstInput)) {
    return firstInput
  }

  const inputSearch = document.getElementsByTagName('input')
  const sameKeywordInput = [].find.call(inputSearch, (item) => {
    if (
      item.value &&
      decodeURI(window.location.pathname + window.location.search).includes(item.value)
    ) {
      return item
    }
  })
  if (sameKeywordInput) {
    return sameKeywordInput
  }
}

export function getKeyword () {
  const el = getSearchDom()
  if (el) {
    let val = ''
    if (['INPUT', 'TEXTAREA'].includes(el.nodeName)) {
      val = el.value
    } else {
      val = el.textContent
    }
    return encodeURIComponent(val)
  }
  console.log('没有找到搜索关键字')
}
