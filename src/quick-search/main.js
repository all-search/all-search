///////////////////////////////////////////////////////////////////
// 全局变量
///////////////////////////////////////////////////////////////////

let conf = GM_getValue('qs-conf', defaultConf)

let hotkey2Engine = {}             // 自定义快捷键搜索的hotkey到engine的映射表

let qsPageLock = false             // 是否在当前页面锁定快搜所有功能, 锁定之后仅响应解锁快捷键

let qsToolbar = null               // 快搜划词工具条
let qsBackgroundLayer = null       // 快搜主窗口背景层
let qsMainBox = null               // 快搜主窗口
let qsSearchInput = null           // 快搜主窗口搜索框
let qsSettingBox = null            // 快搜设置窗口
let qsConfigTextarea = null        // 快搜设置窗口配置框
let qsInfoTipsLayer = null         // 快搜信息提示浮层
let qsSuggestionsLayer = null      // 快搜搜索建议浮层
let qsSuggestionItems = []         // 快搜搜索建议所有item元素(不一定都显示)

///////////////////////////////////////////////////////////////////
// 版本升级更新配置
///////////////////////////////////////////////////////////////////

//
// for 1.1 -> 1.2
//
if (!conf.engineSuggestions) {
  conf.engineSuggestions = defaultConf.engineSuggestions
  GM_setValue('qs-conf', conf)
}

///////////////////////////////////////////////////////////////////
// 功能函数
///////////////////////////////////////////////////////////////////

// 获取元素style属性, 包括css中的
function getStyleByElement (e, styleProp) {
  if (window.getComputedStyle) {
    return document.defaultView.getComputedStyle(e, null).getPropertyValue(styleProp)
  } else if (e.currentStyle) {
    return e.currentStyle[styleProp]
  }
}

// 计算元素在文档(页面)中的绝对位置
function getElementPosition (e) {
  return {
    top: e.getBoundingClientRect().top + window.scrollY,        // 元素顶部相对于文档顶部距离
    bottom: e.getBoundingClientRect().bottom + window.scrollY,  // 元素底部相对于文档顶部距离
    left: e.getBoundingClientRect().left + window.scrollX,      // 元素左边相对于文档左侧距离
    right: e.getBoundingClientRect().right + window.scrollX     // 元素右边相对于文档左侧距离
  }
}

// 获取可视窗口在文档(页面)中的绝对位置
function getWindowPosition () {
  return {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
    left: window.scrollX,
    right: window.scrollX + window.innerWidth
  }
}

// 判断元素在文档(页面)中是否可见
function isVisualOnPage (ele) {
  if (getStyleByElement(ele, 'display') === 'none'
    || getStyleByElement(ele, 'visibility') === 'hidden'
    || getStyleByElement(ele, 'opacity') === '0') {
    return false
  }
  if (getStyleByElement(ele, 'position') != 'fixed'
    && ele.offsetParent === null) {
    return false
  }
  let elePos = getElementPosition(ele)
  if (elePos.bottom - elePos.top === 0 || elePos.right - elePos.left === 0
    || elePos.bottom <= 0 || elePos.right <= 0) {
    return false
  }
  return true
}

// 获取选中文本
function getSelection () {
  return window.getSelection().toString().trim()
}

// 获取当前页面匹配的 搜索引擎 及 其在同类别的搜索引擎列表中的索引 及 同类别的搜索引擎列表.
//
// TODO 目前只是简单地匹配域名, 待完善.
function getMatchedEngineInfo () {
  let hostname = window.location.hostname
  hostname = hostname.replace(/^(www\.)/, '')

  // 因为想要在循环中返回最终结果, 因此不能使用forEach语法
  for (let classEngines of conf.classifiedEngines) {
    for (let i = 0; i < classEngines.engines.length; i++) {
      let engine = classEngines.engines[i]
      let engineHostname = new URL(engine.url).hostname
      engineHostname = engineHostname.replace(/^(www\.)/, '')
      if (hostname === engineHostname) {
        return {
          engine: engine,
          index: i,
          classEngines: classEngines
        }
      }
    }
  }

  return null
}

// 获取搜索引擎url中query的key
function getUrlQueryKey (engine) {
  let params = new URL(engine.url).searchParams
  for (let param of params) {
    if (param[1].includes('%s')) {
      return param[0]
    }
  }
  return null
}

// 移除url中的domain(protocol+host)
function removeUrlDomain (url) {
  let u = new URL(url)
  let domain = `${u.protocol}//${u.host}`
  return url.substring(domain.length)
}

// 获取当前页面url中的搜索词.
// 返回值为经过URI解码的明文文本.
//
// 如果当前页面在配置的搜索引擎列表中, 尝试从url中解析参数, 分为engine.url中含有问号(?)和不含问号(?)两种情况.
// 如果没有解析到或者当前页面不在配置的搜索引擎列表中, 尝试获取文本(纯数字除外)在url中完整出现的input/textarea的值.
// 如果还是没有, 则认为当前页面url中没有搜索词.
function getUrlQuery () {

  let urlTail = removeUrlDomain(window.location.href)
  let engineInfo = getMatchedEngineInfo()
  let engine = engineInfo ? engineInfo.engine : null

  // 尝试利用配置的搜索引擎信息从url中获取搜索词
  if (engine && engine.url.includes('%s')) {
    if (engine.url.includes('?')) {    // engine.url中含有问号(?)
      let queryKey = getUrlQueryKey(engine)
      let params = new URLSearchParams(window.location.search)
      let query = params.get(queryKey)
      if (query) {
        console.log(`Quick Search: get query by URL-KV, engine is ${engine.url}`)
        return query   // URLSearchParams已经decode过了
      }
    } else {    // engine.url中没有问号(?)
      let parts = removeUrlDomain(engine.url).split('%s')
      if (parts.length === 2 && urlTail.startsWith(parts[0]) && urlTail.endsWith(parts[1])) {
        let query = urlTail.substring(parts[0].length, urlTail.length - parts[1].length)
        let index = query.search(/[\/\?\=\&\#]/)   // 是否含有 / ? = & #
        if (index != -1) {
          query = query.substring(0, index)
        }
        if (query) {
          console.log(`Quick Search: get query by URL-PART, engine is ${engine.url}`)
          return decodeURIComponent(query)
        }
      }
    }
  }

  // 尝试获取文本(纯数字除外)在url中完整出现的input/textarea的值
  let eles = document.querySelectorAll('input, textarea')
  for (let ele of eles) {
    if (isVisualOnPage(ele) && !qsMainBox.contains(ele) && !qsSettingBox.contains(ele)) {
      let eleValue = ele.value.trim()
      if (eleValue && !/^\d+$/.test(eleValue)) {
        let encodedEleValue = encodeURIComponent(eleValue)
        let index = urlTail.indexOf(encodedEleValue)
        if (index != -1) {
          let leftChar = urlTail[index - 1]
          let rightChar = urlTail[index + encodedEleValue.length]
          if ((!leftChar || /[\/\=\#]/.test(leftChar))
            && (!rightChar || /[\/\?\&\#]/.test(rightChar))) {
            console.log(`Quick Search: get query by ${ele.tagName}[id='${ele.id}'], engine is ${engine ? engine.url : 'NULL'}`)
            return eleValue
          }
        }
      }
    }
  }

  console.log(`Quick Search: query is NULL, engine is ${engine ? engine.url : 'NULL'}`)
  return null
}

// 判断是否允许工具条
function isAllowToolbar (event) {
  let target = event.target
  if (!conf.showToolbar || qsPageLock) {
    return false
  }
  if (!conf.enableOnInput && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
    return false
  }
  if (qsMainBox && qsMainBox.contains(target)
    || qsSettingBox && qsSettingBox.contains(target)) {
    return false
  }
  return true
}

// 判断是否允许响应当前按键
// 默认只响应: 单字符的Escape / Alt+单字符 / Cmd/Ctrl+Alt+单字符
function isAllowHotkey (event) {
  let target = event.target
  if (!qsPageLock && event.code === 'Escape') {
    return true
  }
  if (!event.altKey) {
    return false
  }
  if (event.shiftKey) {
    return false
  }
  if (qsPageLock && event.code != 'KeyL') {
    return false
  }
  if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && !conf.enableOnInput) {
    return false
  }
  if (qsSettingBox && qsSettingBox.contains(target)) {
    return false
  }
  return true
}

// 获取搜索引擎主页url
function getEngineHome (engine) {
  if (engine.home) {
    return engine.home
  } else {
    let url = new URL(engine.url)
    return `${url.protocol}//${url.hostname}/`
  }
}

// 获取直达的网址. 网址优先级: 搜索框已有网址(若快搜主窗口可见) > 网页中选中网址
// 返回 网址 及 网址来源
function getUrl () {
  let url, source

  if (isMainBoxVisual()) {
    url = qsSearchInput.value.trim()
    source = 'mainbox'
  } else {
    url = getSelection()
    source = 'selection'
  }

  // 补全网址
  if (url && !url.includes('://')) {
    let dotCount = (url.match(/\./g) || []).length
    if (dotCount === 0) {
      url = 'www.' + url + '.com'
    } else if (dotCount === 1) {
      url = 'www.' + url
    }
    url = 'http://' + url
  }

  if (!url) {
    source = null
  }
  return {
    url: url,
    source: source
  }
}

// 获取搜索词. 文本优先级: 搜索框已有文本(若快搜主窗口可见) > 网页中选中文本 > 当前页面搜索词
// 返回 搜索词 及 搜索词来源
function getQuery () {
  let query, source

  if (isMainBoxVisual()) {
    query = qsSearchInput.value.trim()
    source = 'mainbox'
  } else {
    query = getSelection()
    source = 'selection'
    if (!query) {
      query = getUrlQuery()
      source = 'url'
    }
  }

  if (!query) {
    source = null
  }
  return {
    query: query,
    source: source
  }
}

// 打开url.
// 当按下Cmd(Mac系统)/Ctrl(Windows/Linux系统), 则后台打开url.
function openUrl (url, event) {
  // console.log(`Quick Search: open url, url is ${url}`);
  if (!url) return
  if (event.metaKey || event.ctrlKey) {
    GM_openInTab(url, true)
  } else {
    GM_openInTab(url, false)
  }
}

// 打开engine搜索结果或engine主页.
function openEngine (engine, query, event) {
  // console.log(`Quick Search: open engine, engine is ${engine.url}, query is ${query}`);
  if (!engine) return
  if (query) {
    let url = engine.url.replace('%s', encodeURIComponent(query))
    openUrl(url, event)
  } else {
    openUrl(getEngineHome(engine), event)
  }
}

// 快捷键搜索.
// 同样, 当query为空时打开引擎主页, 否则正常搜索.
function openEngineOnKey (engine, query, event) {
  openEngine(engine, query, event)
}

// 点击搜索引擎.
// 当按下Alt, 则忽略查询词打开引擎主页, 否则正常搜索.
function openEngineOnClick (engine, query, event) {
  if (event.altKey) {
    openEngine(engine, null, event)
  } else {
    openEngine(engine, query, event)
  }
}

// 点击划词工具条搜索引擎.
function openEngineOnClickToolbar (engine, event) {
  let query = getSelection()
  openEngineOnClick(engine, query, event)
}

// 点击快搜主窗口搜索引擎.
function openEngineOnClickMainBox (engine, event) {
  let query = qsSearchInput.value.trim()
  openEngineOnClick(engine, query, event)
}

// 切换快搜page lock状态
function toggleQuickSearchPageLock () {
  qsPageLock = qsPageLock ? false : true
  if (qsPageLock) {
    hideToolbar()
    hideMainBox()
    showInfoTipsLayer('已禁用(🔒)')
  } else {
    showInfoTipsLayer('已启用(🚀)')
  }
}

///////////////////////////////////////////////////////////////////
// 元素创建 与 元素事件响应
///////////////////////////////////////////////////////////////////

// 加载css样式
function loadSheet () {
  let css = document.createElement('style')
  css.type = 'text/css'
  css.id = 'qs-css'
  css.textContent = sheet
  document.getElementsByTagName('head')[0].appendChild(css)
}

// 初始化热键映射表
function initHotkeyEngineMapping () {
  conf.hotkeyEngines.forEach(engine => {
    if (!engine.enable) return // 此处return搭配forEach, 请勿改为其他形式循环
    engine.hotkeys.forEach(key => {
      hotkey2Engine[key] = engine
    })
  })
}

//
// 划词工具条
//

// 创建划词工具条
function createToolbar () {
  // 工具条container
  let toolbar = document.createElement('div')
  toolbar.id = 'qs-toolbar'
  toolbar.className = 'qs-toolbar'
  toolbar.style.setProperty('display', 'none', 'important')
  document.body.appendChild(toolbar)

  // 常用搜索引擎按钮
  conf.frequentEngines.forEach((engine, index) => {
    if (!engine.enable) return // 此处return搭配forEach, 请勿改为其他形式循环
    let icon = document.createElement('img')
    icon.id = 'qs-toolbar-icon-' + index
    icon.className = 'qs-toolbar-icon'
    icon.src = engine.icon
    icon.addEventListener('click', function (e) {
      openEngineOnClickToolbar(engine, e)
    }, false)
    toolbar.appendChild(icon)
  })

  // 直达网址按钮
  let icon = document.createElement('img')
  icon.id = 'qs-toolbar-icon-url'
  icon.className = 'qs-toolbar-icon'
  icon.src = 'data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXABcXFwAXFxcAFxcXE1cXFzIXFxc81xcXN1cXFx0XFxcCVxcXABcXFwAXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFwAXFxcAFxcXABcXFxXXFxc51xcXMpcXFyLXFxcsVxcXPFcXFyHXFxcCFxcXABcXFwAXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxcAFxcXABcXFwAXFxcWFxcXOxcXFytXFxcGlxcXABcXFwIXFxcfVxcXPRcXFyJXFxcCFxcXABcXFwAXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFwAXFxcAFxcXFhcXFzsXFxcrVxcXBZcXFwAXFxcAFxcXABcXFwFXFxcfFxcXPRcXFyJXFxcCFxcXABcXFwAXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXABcXFxXXFxc7FxcXK1cXFwWXFxcAFxcXABcXFwAXFxcAFxcXABcXFwFXFxcfFxcXPRcXFyJXFxcCFxcXABcXFwAXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxcUVxcXOhcXFytXFxcFlxcXABcXFwAXFxcAFxcXABcXFwAXFxcAFxcXABcXFwFXFxcfFxcXPRcXFyJXFxcCFxcXABcXFwAXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFzQXFxcxlxcXBlcXFwAXFxcAFxcXABcXFwCXFxcFVxcXARcXFwAXFxcAFxcXABcXFwFXFxce1xcXPRcXFyKXFxcCFxcXABcXFwAXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXPtcXFyAXFxcAFxcXABcXFwAXFxcAFxcXBpcXFzAXFxcelxcXAVcXFwAXFxcAFxcXABcXFwFXFxce1xcXPRcXFyKXFxcCVxcXABcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxc6lxcXKNcXFwDXFxcAFxcXABcXFwAXFxcB1xcXIpcXFz0XFxce1xcXARcXFwAXFxcAFxcXABcXFwFXFxce1xcXPRcXFx9XFxcAlxcXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFyGXFxc8VxcXGxcXFwBXFxcAFxcXABcXFwAXFxcCVxcXIpcXFz0XFxce1xcXARcXFwAXFxcAFxcXABcXFwEXFxcj1xcXOZcXFwpXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXA9cXFyYXFxc8lxcXGxcXFwCXFxcAFxcXABcXFwAXFxcCFxcXIpcXFz0XFxce1xcXAVcXFwAXFxcAFxcXABcXFw8XFxc8FxcXE1cXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxcAFxcXA1cXFyZXFxc8lxcXGxcXFwCXFxcAFxcXABcXFwAXFxcCFxcXIpcXFz0XFxce1xcXAVcXFwAXFxcAFxcXF1cXFzwXFxcPVxcXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFwAXFxcAFxcXA5cXFyZXFxc8lxcXGxcXFwCXFxcAFxcXABcXFwAXFxcCFxcXIpcXFz0XFxce1xcXARcXFwOXFxcxVxcXLlcXFwOXFxcAFxcXABcXFwAXFxcAFxcXABcXFwAXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXABcXFwAXFxcAFxcXA1cXFyZXFxc8lxcXGxcXFwCXFxcAFxcXABcXFwAXFxcCFxcXIpcXFz0XFxce1xcXAtcXFxRXFxcKVxc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XG5cXFwCXFxcAFxcXABcXFwAXFxcAFxcXABcXFwXXFxcrlxcXOxcXFxXXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXABcXFwAXFxcAFxcXA1cXFyXXFxc8lxcXG5cXFwCXFxcAFxcXABcXFwAXFxcF1xcXK5cXFzsXFxcV1xcXABcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXABcXFwAXFxcAFxcXA1cXFyXXFxc8lxcXG9cXFwEXFxcAFxcXBlcXFyuXFxc61xcXFdcXFwAXFxcAFxcXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXABcXFwAXFxcAFxcXA1cXFyVXFxc8VxcXKZcXFyCXFxcyFxcXOhcXFxWXFxcAFxcXABcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxcXABcXFwAXFxcAFxcXA5cXFyDXFxc51xcXPlcXFzNXFxcT1xcXABcXFwAXFxcAAAAAAAAAAAAwAP//4AB//8AAP//AAB//wAAP/8AAB//AAAP/wAAD/8AAA//AAAP/wAAD/8AAA//AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAB+AAAAPwAAAD/8AAA//AAAP/wAAD/8AAA//AAAP/wAAD/+AAA//wAAP/+AAD//wAA//+AAf//wAM='
  icon.addEventListener('click', function (e) {
    openUrl(getUrl().url, e)
  }, false)
  toolbar.appendChild(icon)

  // 更多按钮
  let icon2 = document.createElement('img')
  icon2.id = 'qs-toolbar-icon-more'
  icon2.className = 'qs-toolbar-icon'
  icon2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAABYmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgIHRpZmY6T3JpZW50YXRpb249IjYiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz7UGE7IAAACClBMVEX///9VYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBzg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79VYIBzg79VYIBzg79zg79VYIBzg79zg79zg79VYIBVYIBVYIBzg79VYIBVYIBzg79VYIBVYIBzg79z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='
  icon2.addEventListener('click', function (e) {
    showMainBox()
    hideToolbar()
  }, false)
  toolbar.appendChild(icon2)

  qsToolbar = toolbar
}

// 划词工具条是否处于显示状态
function isToolbarVisual () {
  return qsToolbar && qsToolbar.style.display === 'block'
}

// 显示划词工具条
function showToolbar (event) {

  ensureQuickSearchAlive()

  if (!qsToolbar || isToolbarVisual()) {
    return
  }

  let toolbar = qsToolbar

  toolbar.style.setProperty('top', '-10000px', 'important')
  toolbar.style.setProperty('left', '-10000px', 'important')
  toolbar.style.setProperty('display', 'block', 'important')

  let toolbarClientRect = toolbar.getBoundingClientRect()
  let toolbarWidth = toolbarClientRect.right - toolbarClientRect.left
  let toolbarHeight = toolbarClientRect.bottom - toolbarClientRect.top

  let toolbarNewTop = event.pageY + 15
  let toolbarNewLeft = event.pageX - (toolbarWidth / 2)
  let windowPos = getWindowPosition()
  if (toolbarNewTop + toolbarHeight > windowPos.bottom) {
    toolbarNewTop = event.pageY - toolbarHeight - 15
  }
  if (toolbarNewLeft < windowPos.left) {
    toolbarNewLeft = windowPos.left
  } else if (toolbarNewLeft + toolbarWidth > windowPos.right) {
    toolbarNewLeft = windowPos.right - toolbarWidth
  }

  toolbar.style.setProperty('top', toolbarNewTop + 'px', 'important')
  toolbar.style.setProperty('left', toolbarNewLeft + 'px', 'important')
}

// 隐藏划词工具条
function hideToolbar () {
  if (qsToolbar) {
    qsToolbar.style.setProperty('display', 'none', 'important')
  }
}

//
// 快搜主窗口
//

// 创建快搜主窗口
function createMainBox () {
  // 快搜主窗口背景层
  //
  // 随快搜主窗口一同显示/隐藏, 铺满整个可视窗口. 其作用主要是:
  // 1. 想要实现点击快搜主窗口外面就隐藏快搜主窗口, 但如果点击target是页面中的cross-domain iframe的话,
  //    当前window就不能捕获到该iframe的click事件, 所以覆盖一层作为以便捕获点击事件.
  // 2. 也可以做背景虚化/遮罩效果.
  let backgroundLayer = document.createElement('div')
  backgroundLayer.id = 'qs-main-background-layer'
  backgroundLayer.className = 'qs-main-background-layer'
  backgroundLayer.style.setProperty('display', 'none', 'important')
  document.body.appendChild(backgroundLayer)

  // 快搜主窗口container
  let mainBox = document.createElement('div')
  mainBox.id = 'qs-mainbox'
  mainBox.className = 'qs-mainbox'
  mainBox.style.setProperty('display', 'none', 'important')
  document.body.appendChild(mainBox)

  // 搜索框
  let searchBox = document.createElement('div')
  searchBox.id = 'qs-main-search-box'
  searchBox.className = 'qs-main-search-box'
  mainBox.appendChild(searchBox)
  let searchInput = document.createElement('input')
  searchInput.id = 'qs-main-search-input'
  searchInput.className = 'qs-main-search-input'
  searchInput.addEventListener('keydown', function (e) {
    if (e.code === 'Enter') {  // 回车键
      openEngineOnClickMainBox(conf.defaultEngine, e)
    }
  }, false)
  if (conf.showPlaceholder) {
    searchInput.placeholder = `回车以使用${conf.defaultEngine.name}搜索`
  }
  searchBox.appendChild(searchInput)

  // 常用搜索引擎
  if (conf.showFrequentEngines) {
    let frequentBox = document.createElement('div')
    frequentBox.id = 'qs-main-frequent-box'
    frequentBox.className = 'qs-main-frequent-box'
    mainBox.appendChild(frequentBox)
    conf.frequentEngines.forEach((engine, index) => {
      if (!engine.enable) return // 此处return搭配forEach, 请勿改为其他形式循环
      let icon = document.createElement('img')
      icon.id = 'qs-main-frequent-icon-' + index
      icon.className = 'qs-main-frequent-icon'
      icon.src = engine.icon
      icon.addEventListener('click', function (e) {
        openEngineOnClickMainBox(engine, e)
      }, false)
      frequentBox.appendChild(icon)
    })
  }

  // 分类搜索引擎
  if (conf.showClassifiedEngines) {
    let classifiedBox = document.createElement('div')
    classifiedBox.id = 'qs-main-classified-box'
    classifiedBox.className = 'qs-main-classified-box'
    mainBox.appendChild(classifiedBox)
    conf.classifiedEngines.forEach((family, fIndex) => {
      if (!family.enable) return // 此处return搭配forEach, 请勿改为其他形式循环
      // 一个分类一列
      let familyBox = document.createElement('div')
      familyBox.id = 'qs-main-classified-family-box-' + fIndex
      familyBox.className = 'qs-main-classified-family-box'
      classifiedBox.appendChild(familyBox)
      // 分类标题
      let familyTitle = document.createElement('div')
      familyTitle.id = 'qs-main-classified-family-title-' + fIndex
      familyTitle.className = 'qs-main-classified-family-title'
      familyTitle.textContent = family.name
      familyBox.appendChild(familyTitle)
      family.engines.forEach((engine, eIndex) => {
        if (!engine.enable) return // 此处return搭配forEach, 请勿改为其他形式循环
        // 搜索引擎
        let engineBox = document.createElement('div')
        engineBox.id = 'qs-main-classified-family-engine-' + fIndex + '-' + eIndex
        engineBox.className = 'qs-main-classified-family-engine'
        engineBox.addEventListener('click', function (e) {
          openEngineOnClickMainBox(engine, e)
        }, false)
        familyBox.appendChild(engineBox)
        // 搜索引擎icon
        let engineIcon = document.createElement('img')
        engineIcon.id = 'qs-main-classified-family-engine-icon-' + fIndex + '-' + eIndex
        engineIcon.className = 'qs-main-classified-family-engine-icon'
        engineIcon.src = engine.icon
        engineBox.appendChild(engineIcon)
        // 搜索引擎name
        let engineName = document.createElement('span')
        engineName.id = 'qs-main-classified-family-engine-name-' + fIndex + '-' + eIndex
        engineName.className = 'qs-main-classified-family-engine-name'
        engineName.textContent = engine.name
        engineBox.appendChild(engineName)
      })
    })
  }

  // 帮助信息
  let helpInfoBox = document.createElement('div')
  helpInfoBox.id = 'qs-main-help-info-box'
  helpInfoBox.className = 'qs-main-help-info-box'
  mainBox.appendChild(helpInfoBox)
  // 主页
  let homeLink = document.createElement('a')
  homeLink.id = 'qs-main-help-info-home'
  homeLink.className = 'qs-main-help-info-item'
  homeLink.textContent = '主页'
  homeLink.href = 'https://github.com/smallx/monkey-scripts/tree/master/quick-search'
  homeLink.target = '_blank'
  helpInfoBox.appendChild(homeLink)
  // 帮助
  let helpLink = document.createElement('a')
  helpLink.id = 'qs-main-help-info-help'
  helpLink.className = 'qs-main-help-info-item'
  helpLink.textContent = '帮助'
  helpLink.href = 'https://github.com/smallx/monkey-scripts/tree/master/quick-search/README.md'
  helpLink.target = '_blank'
  helpInfoBox.appendChild(helpLink)
  // 设置
  let settingLink = document.createElement('a')
  settingLink.id = 'qs-main-help-info-setting'
  settingLink.className = 'qs-main-help-info-item'
  settingLink.textContent = '设置'
  settingLink.onclick = function () {
    showSettingBox()
  }
  helpInfoBox.appendChild(settingLink)

  qsBackgroundLayer = backgroundLayer
  qsMainBox = mainBox
  qsSearchInput = searchInput
}

// 快搜主窗口是否处于显示状态
function isMainBoxVisual () {
  return qsMainBox.style.display === 'block'
}

// 显示快搜主窗口.
// 可选输入text为没有经过URI编码的明文文本, 该参数一般在iframe发来消息时使用.
// 快搜主窗口中搜索框的文本优先级: 参数指定文本 > 网页选中文本 > 搜索框已有文本 > 当前页面搜索词
function showMainBox (text) {

  ensureQuickSearchAlive()

  // 快搜主窗口在iframe中不显示
  if (isMainBoxVisual() || window.self != window.top) {
    return
  }

  // 设置搜索框内容
  let query = text
  if (!query) {
    query = getSelection()
  }
  if (!query) {
    query = qsSearchInput.value.trim()
  }
  if (!query) {
    query = getUrlQuery()
  }
  qsSearchInput.value = query

  qsBackgroundLayer.style.setProperty('display', 'block', 'important')
  qsMainBox.style.setProperty('display', 'block', 'important')

  // 选中搜索框文本
  qsSearchInput.select()

  // 隐藏划词工具条
  if (isToolbarVisual()) {
    hideToolbar()
  }
}

// 隐藏快搜主窗口
function hideMainBox () {
  destroySuggestions()
  qsBackgroundLayer.style.setProperty('display', 'none', 'important')
  qsMainBox.style.setProperty('display', 'none', 'important')
}

//
// 设置窗口
//

// 创建设置窗口
function createSettingBox () {
  // 设置窗口container
  let settingBox = document.createElement('div')
  settingBox.id = 'qs-setting-box'
  settingBox.className = 'qs-setting-box'
  settingBox.style.setProperty('display', 'none', 'important')
  document.body.appendChild(settingBox)
  // 配置文本框
  let configTextarea = document.createElement('textarea')
  configTextarea.id = 'qs-setting-config-textarea'
  configTextarea.className = 'qs-setting-config-textarea'
  settingBox.appendChild(configTextarea)
  // 底部按钮container
  let buttonBar = document.createElement('div')
  buttonBar.id = 'qs-setting-button-bar'
  buttonBar.className = 'qs-setting-button-bar'
  settingBox.appendChild(buttonBar)
  // 重置按钮
  let resetButton = document.createElement('button')
  resetButton.id = 'qs-setting-button-reset'
  resetButton.className = 'qs-setting-button'
  resetButton.type = 'button'
  resetButton.textContent = '重置'
  resetButton.onclick = function (e) {
    configTextarea.value = JSON.stringify(defaultConf, null, 4)
  }
  buttonBar.appendChild(resetButton)
  // 关闭按钮
  let closeButton = document.createElement('button')
  closeButton.id = 'qs-setting-button-close'
  closeButton.className = 'qs-setting-button'
  closeButton.type = 'button'
  closeButton.textContent = '取消'
  closeButton.onclick = function (e) {
    hideSettingBox()
  }
  buttonBar.appendChild(closeButton)
  // 保存按钮
  let saveButton = document.createElement('button')
  saveButton.id = 'qs-setting-button-save'
  saveButton.className = 'qs-setting-button'
  saveButton.type = 'button'
  saveButton.textContent = '保存'
  saveButton.onclick = function (e) {
    let newConf = JSON.parse(configTextarea.value)
    GM_setValue('qs-conf', newConf)
    hideSettingBox()
    // 需用户手动刷新页面重新加载配置使其生效
    alert('设置已保存, 刷新页面后生效.')
  }
  buttonBar.appendChild(saveButton)

  qsSettingBox = settingBox
  qsConfigTextarea = configTextarea
}

// 设置窗口是否处于显示状态
function isSettingBoxVisual () {
  return qsSettingBox.style.display === 'block'
}

// 显示设置窗口
function showSettingBox () {

  ensureQuickSearchAlive()

  if (isSettingBoxVisual()) {
    return
  }

  let confStr = JSON.stringify(conf, null, 4)
  qsConfigTextarea.value = confStr
  qsSettingBox.style.setProperty('display', 'block', 'important')
}

// 隐藏设置窗口
function hideSettingBox () {
  qsSettingBox.style.setProperty('display', 'none', 'important')
}

//
// 信息提示浮层
//

// 创建信息提示浮层
function createInfoTipsLayer () {
  let infoTipsLayer = document.createElement('div')
  infoTipsLayer.id = 'qs-info-tips-layer'
  infoTipsLayer.className = 'qs-info-tips-layer'
  infoTipsLayer.style.setProperty('display', 'none', 'important')
  document.body.appendChild(infoTipsLayer)

  qsInfoTipsLayer = infoTipsLayer
}

// 显示信息提示浮层
let idOfSettimeout = null

function showInfoTipsLayer (info) {
  qsInfoTipsLayer.textContent = 'Quick Search: ' + info
  qsInfoTipsLayer.style.setProperty('display', 'block', 'important')
  if (idOfSettimeout) {
    clearTimeout(idOfSettimeout)
  }
  idOfSettimeout = setTimeout(function () {
    qsInfoTipsLayer.style.setProperty('display', 'none', 'important')
  }, 2000)
}

//
// 搜索建议
//

let rawInputQuery = null           // 输入框中的原始查询
let multiEngineSuggestions = []    // 多个搜索引擎的建议, 每个一个子数组
let suggestionCount = 0            // 多个搜索引擎的实际建议的总数
let selectedSuggestionIndex = -1   // 用户选中的搜索建议项对应的index

// 搜索建议最大条数, 用于事先创建好相应元素
function getMaxSuggestionCount () {
  let count = 0
  conf.engineSuggestions.forEach(es => {
    if (!es.enable) return
    count += es.showCount
  })
  return count
}

// 创建搜索建议浮层
function createSuggestionsLayer () {

  let maxSuggestionCount = getMaxSuggestionCount()
  if (maxSuggestionCount === 0) {
    return
  }

  // 搜索建议浮层
  let suggestionsLayer = document.createElement('div')
  suggestionsLayer.id = 'qs-suggestions-layer'
  suggestionsLayer.className = 'qs-suggestions-layer'
  suggestionsLayer.style.setProperty('display', 'none', 'important')
  document.body.appendChild(suggestionsLayer)

  // 搜索建议条目
  for (let i = 0; i < maxSuggestionCount; i++) {
    let suggestionItem = document.createElement('div')
    suggestionItem.id = 'qs-suggestion-item-' + i
    suggestionItem.className = 'qs-suggestion-item'
    suggestionItem.addEventListener('click', function (e) {
      qsSearchInput.value = this.textContent
      openEngineOnClickMainBox(conf.defaultEngine, e)
    }, true)
    suggestionsLayer.appendChild(suggestionItem)

    qsSuggestionItems.push(suggestionItem)
  }

  // 向搜索框添加响应函数
  qsSearchInput.addEventListener('input', function (e) {
    let query = qsSearchInput.value.trim()
    if (query) {
      triggerSuggestions(query)
    } else {
      destroySuggestions()
    }
  }, true)
  qsSearchInput.addEventListener('mousedown', function (e) {
    let query = qsSearchInput.value.trim()
    if (query) {
      triggerSuggestions(query)
    }
  }, true)
  qsSearchInput.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowDown' && isSuggestionsLayerVisual()) {
      e.preventDefault()
      selectSuggestionItem(selectedSuggestionIndex + 1)
      return
    }
    if (e.code === 'ArrowUp' && isSuggestionsLayerVisual()) {
      e.preventDefault()
      selectSuggestionItem(selectedSuggestionIndex - 1)
      return
    }
    if (e.code === 'Tab' && isSuggestionsLayerVisual()) {
      e.preventDefault()
      if (e.shiftKey) {
        selectSuggestionItem(selectedSuggestionIndex - 1)
      } else {
        selectSuggestionItem(selectedSuggestionIndex + 1)
      }
      return
    }
  }, true)

  qsSuggestionsLayer = suggestionsLayer
}

// 判断搜索建议浮层是否显示
function isSuggestionsLayerVisual () {
  return qsSuggestionsLayer && qsSuggestionsLayer.style.display === 'block'
}

// 显示搜索建议浮层
function _showSuggestionsLayer () {
  if (!qsSuggestionsLayer || isSuggestionsLayerVisual()) {
    return
  }

  let inputPos = qsSearchInput.getBoundingClientRect()
  let top = inputPos.bottom + 'px'
  let left = inputPos.left + 'px'
  let width = (inputPos.right - inputPos.left) + 'px'
  qsSuggestionsLayer.style.setProperty('top', top, 'important')
  qsSuggestionsLayer.style.setProperty('left', left, 'important')
  qsSuggestionsLayer.style.setProperty('width', width, 'important')

  qsSuggestionsLayer.style.setProperty('display', 'block', 'important')
}

// 隐藏搜索建议浮层
function _hideSuggestionsLayer () {
  if (qsSuggestionsLayer) {
    qsSuggestionsLayer.style.setProperty('display', 'none', 'important')
  }
}

//
// 请求百度搜索建议
//
const baiduSuggestionUrl = {
  'http:': 'http://suggestion.baidu.com/su?wd=%s&cb=callback',
  'https:': 'https://suggestion.baidu.com/su?wd=%s&cb=callback'
}[window.location.protocol]

// 油猴脚本的GM_xmlhttpRequest可以直接跨域请求, 不受同源策略限制, 这样就不用通过jQuery来发送jsonp请求了.
function requestBaiduSuggestions (query, index, count) {

  function callback (res) {
    multiEngineSuggestions[index] = res.s.slice(0, count)
    loadSuggestions()
  }

  let url = baiduSuggestionUrl.replace('%s', encodeURIComponent(query))
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    timeout: 3000,
    onload: response => {
      if (response.status === 200) {
        eval(response.responseText)
      } else {
        console.log(`Quick Search: Baidu Suggestions: code ${response.status}`)
      }
    }
  })
}

//
// 请求Google搜索建议
//
const googleSuggestionUrl = {
  'http:': 'http://suggestqueries.google.com/complete/search?client=firefox&q=%s&jsonp=callback',
  'https:': 'https://suggestqueries.google.com/complete/search?client=firefox&q=%s&jsonp=callback'
}[window.location.protocol]

function requestGoogleSuggestions (query, index, count) {

  function callback (res) {
    multiEngineSuggestions[index] = res[1].slice(0, count)
    loadSuggestions()
  }

  let url = googleSuggestionUrl.replace('%s', encodeURIComponent(query))
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    timeout: 3000,
    onload: response => {
      if (response.status === 200) {
        eval(response.responseText)
      } else {
        console.log(`Quick Search: Google Suggestions: code ${response.status}`)
      }
    }
  })
}

let suggestionHandlers = {
  'baidu': requestBaiduSuggestions,
  'google': requestGoogleSuggestions
}

// 选中搜索建议项
function selectSuggestionItem (newSelectedIndex) {
  if (qsSuggestionItems[selectedSuggestionIndex]) {
    qsSuggestionItems[selectedSuggestionIndex].className = 'qs-suggestion-item'
  }
  selectedSuggestionIndex = newSelectedIndex
  selectedSuggestionIndex = selectedSuggestionIndex < -1 ? suggestionCount - 1 : selectedSuggestionIndex
  selectedSuggestionIndex = selectedSuggestionIndex >= suggestionCount ? -1 : selectedSuggestionIndex
  if (selectedSuggestionIndex === -1) {
    qsSearchInput.value = rawInputQuery
  } else {
    qsSearchInput.value = qsSuggestionItems[selectedSuggestionIndex].textContent
    qsSuggestionItems[selectedSuggestionIndex].className = 'qs-suggestion-item-selected'
  }
}

// 触发搜索建议
function triggerSuggestions (query) {
  rawInputQuery = query
  if (selectedSuggestionIndex !== -1) {
    selectSuggestionItem(-1)
  }

  let index = 0
  conf.engineSuggestions.forEach(es => {
    if (!es.enable) return
    suggestionHandlers[es.name](query, index, es.showCount)
    index++
  })
}

// 装载搜索建议
function loadSuggestions () {
  // 由于装载是异步延迟的, 若用户已经删光了输入框内容, 则不显示搜索建议
  if (!qsSearchInput.value.trim()) {
    destroySuggestions()
    return
  }

  // 多个搜索引擎的建议合并并去重
  let allSuggestions = multiEngineSuggestions.flat(1).filter((x, i, a) => a.indexOf(x) === i)
  suggestionCount = allSuggestions.length

  allSuggestions.forEach((suggestion, i) => {
    qsSuggestionItems[i].textContent = suggestion
    qsSuggestionItems[i].style.setProperty('display', 'block', 'important')
  })
  for (let i = allSuggestions.length; i < qsSuggestionItems.length; i++) {
    qsSuggestionItems[i].style.setProperty('display', 'none', 'important')
  }
  if (!isSuggestionsLayerVisual()) {
    _showSuggestionsLayer()
  }
}

// 销毁搜索建议
function destroySuggestions () {
  _hideSuggestionsLayer()
  rawInputQuery = null
  multiEngineSuggestions = []
  suggestionCount = 0
  selectedSuggestionIndex = -1
}

//
// 创建以上所有东东
//

function initQuickSearch () {
  loadSheet()
  initHotkeyEngineMapping()
  if (conf.showToolbar) {
    createToolbar()
  }
  createMainBox()
  createSettingBox()
  createInfoTipsLayer()
  createSuggestionsLayer()
}

// 百度等网页会在不刷新页面的情况下改变网页内容, 导致quick search除了js脚本之外的东东全部没了.
// 此函数用于确保quick search处于可用状态, 需在toolbar或mainbox等窗口每次显示时调用.
function ensureQuickSearchAlive () {
  let css = document.querySelector('#qs-css')
  let mainbox = document.querySelector('#qs-mainbox')
  if (!css || !mainbox) {
    initQuickSearch()
  }
}

initQuickSearch()

///////////////////////////////////////////////////////////////////
// 全局事件响应
//
// 我们将全局事件绑定在捕获阶段执行, 避免事件响应被网页自带的脚本拦截掉.
///////////////////////////////////////////////////////////////////

//
// top window和iframe共用的事件处理逻辑
//

window.addEventListener('mousedown', function (e) {
  let target = e.target
  // 隐藏工具条
  if (isToolbarVisual() && !qsToolbar.contains(target)) {
    hideToolbar()
  }
}, true)

window.addEventListener('mouseup', function (e) {
  let target = e.target
  // 显示/隐藏工具条
  if (isAllowToolbar(e)) {
    let selection = getSelection()
    if (selection && !isToolbarVisual()) {
      showToolbar(e)
    }
    if (!selection && isToolbarVisual()) {
      hideToolbar()
    }
  }

  // 划词时自动复制文本到剪贴板
  if (conf.autoCopyToClipboard
    && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'
    && !qsMainBox.contains(target) && !qsSettingBox.contains(target)) {
    let selection = getSelection()
    if (selection) {
      GM_setClipboard(selection, 'text/plain')
    }
  }
}, true)

// 有时候selectionchange发生在mouseup之后, 导致没有selection时toolbar依然显示.
// 故再添加selectionchange事件以隐藏toolbar.
// 由于在鼠标划词拖动过程中会不停触发selectionchange事件, 所以最好不要以此事件来显示/调整toolbar位置.
document.addEventListener('selectionchange', function (e) {
  let selection = getSelection()
  if (!selection && isToolbarVisual()) {
    hideToolbar()
  }
}, true)

window.addEventListener('keydown', function (e) {

  if (!isAllowHotkey(e)) {
    return
  }

  // Alt+S键, 超级快搜. 优先级如下:
  // 1. 快搜主窗口可见, 使用默认搜索引擎搜索搜索框文本.
  // 2. 网页有选中文本, 使用默认搜索引擎搜索文本.
  // 3. 当前页面url中有搜索词, 挑选当前搜索引擎分类中的另一个搜索引擎搜索该词.
  // 4. 都没有则打开快搜主窗口.
  if (e.code === 'KeyS') {
    e.preventDefault()

    let engine = null
    let query = getQuery()
    if (query.source === 'mainbox' || query.source === 'selection') {
      engine = conf.defaultEngine
    } else if (query.source === 'url') {
      let nowEngineInfo = getMatchedEngineInfo()
      if (nowEngineInfo) {
        let nowClassEngines = nowEngineInfo.classEngines.engines
        nowClassEngines.forEach((eng, i) => {
          if (!engine && eng.enable && i != nowEngineInfo.index) {
            engine = eng
          }
        })
      }
    }

    if (engine && query.query) {
      openEngineOnKey(engine, query.query, e)
    } else if (!isMainBoxVisual()) {
      showMainBox()
    } else {
      hideMainBox()
    }

    return
  }

  // Alt+D键, 网址直达. 网址优先级: 搜索框已有网址(若快搜主窗口可见) > 网页中选中网址
  if (e.code === 'KeyD') {
    e.preventDefault()
    openUrl(getUrl().url, e)
    return
  }

  // Alt+自定义快捷键搜索. 文本优先级: 搜索框已有文本(若快搜主窗口可见) > 网页中选中文本 > 当前页面搜索词
  if (hotkey2Engine[e.code]) {
    e.preventDefault()
    let engine = hotkey2Engine[e.code]
    let query = getQuery()
    openEngineOnKey(engine, query.query, e)
    return
  }
}, true)

//
// 只在top window中使用的事件处理逻辑
//

if (window.self === window.top) {
  window.addEventListener('mousedown', function (e) {
    let target = e.target
    // 隐藏快搜主窗口
    if (isMainBoxVisual()
      && !isSettingBoxVisual()
      && !qsMainBox.contains(target)
      && !qsSuggestionsLayer.contains(target)) {
      hideMainBox()
    }

    // 隐藏搜索建议浮层
    if (isSuggestionsLayerVisual()
      && !qsSuggestionsLayer.contains(target)
      && !qsSearchInput.contains(target)) {
      destroySuggestions()
    }
  }, true)

  window.addEventListener('keydown', function (e) {

    if (!isAllowHotkey(e)) {
      return
    }

    // Alt+F键, 显示/隐藏快搜主窗口
    if (e.code === 'KeyF') {
      e.preventDefault()
      if (!isMainBoxVisual()) {
        showMainBox()
      } else {
        hideMainBox()
      }
      return
    }

    // Esc键, 隐藏快搜主窗口
    if (e.code === 'Escape') {
      if (isMainBoxVisual() && !isSettingBoxVisual()) {
        hideMainBox()
      }
      return
    }

    // Alt+L键, 锁定/解锁快搜所有功能.
    if (e.code === 'KeyL') {
      e.preventDefault()
      toggleQuickSearchPageLock()
      return
    }
  }, true)

  // 处理iframe发来的消息
  window.addEventListener('message', function (e) {
    if (e.data.source != 'qs-iframe') {
      return
    }

    if (e.data.keydown) {
      if (e.data.keydown === 'Alt+KeyF') {
        if (!qsPageLock) {
          if (!isMainBoxVisual()) {
            showMainBox(e.data.query)
          } else {
            hideMainBox()
          }
        }
      }
      if (e.data.keydown === 'Alt+KeyL') {
        toggleQuickSearchPageLock()
      }
    }
  }, true)
}

//
// 只在iframe中使用的事件处理逻辑
//

if (window.self != window.top) {
  // 向top窗口发送消息
  window.addEventListener('keydown', function (e) {
    if (e.altKey && e.code === 'KeyF') {
      let query = getSelection()
      // 跨域iframe中不能执行window.top.origin, 故此处使用*
      window.top.postMessage({
        source: 'qs-iframe',
        keydown: 'Alt+KeyF',
        query: query
      }, '*')
    }
    if (e.altKey && e.code === 'KeyL') {
      window.top.postMessage({
        source: 'qs-iframe',
        keydown: 'Alt+KeyL'
      }, '*')
    }
  }, true)
}
