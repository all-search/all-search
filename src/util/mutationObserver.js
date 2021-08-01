let customStyle = document.querySelector('.as-custom-style')
if(!customStyle) {
  customStyle = document.createElement('style')
  customStyle.class = 'as-custom-style'
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(customStyle)
}

export const mutationObserver = function () {
  // 选择需要观察变动的节点
  const targetNode = document.body

// 观察器的配置（需要观察什么变动）
  const config = { attributeFilter: ['class', 'style'], childList: true, subtree: true }

// 当观察到变动时执行的回调函数
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
      console.log(mutation)
      if (mutation.target) {
        const style = window.getComputedStyle(mutation.target, null)
        const position = style.getPropertyValue('position')
        const top = style.getPropertyValue('top')
        // customStyle.sheet.addRule(item.selectorText, `top: ${parseFloat(top.replace('px', '')) + 30 + 'px'}`)
      }
    }
  }

// 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback)

// 以上述配置开始观察目标节点
  observer.observe(targetNode, config)

// 之后，可停止观察
//   observer.disconnect();
}
