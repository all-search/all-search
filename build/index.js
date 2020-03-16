// ==UserScript==
// @name         all-search
// @version      0.1.1f
// @description  在各个引擎之间跳转的顶部菜单，借鉴自searchEngineJump
// @author       endday
// @include      *
// @namespace    https://github.com/endday
// @homepage     /all-search

// @require      https://cdn.jsdelivr.net/npm/vue
// @run-at       document-body

// @grant        GM_getValue
// @grant        GM_setValue

// ==/UserScript==


(function (Vue) {
  'use strict'

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'logo'
  };

  function normalizeComponent (template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector
      createInjector = shadowMode
      shadowMode = false
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script
    // render functions
    if (template && template.render) {
      options.render = template.render
      options.staticRenderFns = template.staticRenderFns
      options._compiled = true
      // functional template
      if (isFunctionalTemplate) {
        options.functional = true
      }
    }
    // scopedId
    if (scopeId) {
      options._scopeId = scopeId
    }
    let hook
    if (moduleIdentifier) {
      // server build
      hook = function (context) {
        // 2.3 injection
        context =
          context || // cached call
          (this.$vnode && this.$vnode.ssrContext) || // stateful
          (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
        // 2.2 with runInNewContext: true
        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__
        }
        // inject component styles
        if (style) {
          style.call(this, createInjectorSSR(context))
        }
        // register component module identifier for async chunk inference
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier)
        }
      }
      // used by ssr in case component is cached and beforeCreate
      // never gets called
      options._ssrRegister = hook
    }
    else if (style) {
      hook = shadowMode
        ? function (context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot))
        }
        : function (context) {
          style.call(this, createInjector(context))
        }
    }
    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        const originalRender = options.render
        options.render = function renderWithStyleInjection (h, context) {
          hook.call(context)
          return originalRender(h, context)
        }
      }
      else {
        // inject component registration as beforeCreate hook
        const existing = options.beforeCreate
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
      }
    }
    return script
  }

  const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  function createInjector (context) {
    return (id, style) => addStyle(id, style)
  }

  let HEAD
  const styles = {}

  function addStyle (id, css) {
    const group = isOldIE ? css.media || 'default' : id
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] })
    if (!style.ids.has(id)) {
      style.ids.add(id)
      let code = css.source
      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'
        // http://stackoverflow.com/a/26603875
        code +=
          '\n/*# sourceMappingURL=data:application/json;base64,' +
          btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
          ' */'
      }
      if (!style.element) {
        style.element = document.createElement('style')
        style.element.type = 'text/css'
        if (css.media)
          style.element.setAttribute('media', css.media)
        if (HEAD === undefined) {
          HEAD = document.head || document.getElementsByTagName('head')[0]
        }
        HEAD.appendChild(style.element)
      }
      if ('styleSheet' in style.element) {
        style.styles.push(code)
        style.element.styleSheet.cssText = style.styles
          .filter(Boolean)
          .join('\n')
      }
      else {
        const index = style.ids.size - 1
        const textNode = document.createTextNode(code)
        const nodes = style.element.childNodes
        if (nodes[index])
          style.element.removeChild(nodes[index])
        if (nodes.length)
          style.element.insertBefore(textNode, nodes[index])
        else
          style.element.appendChild(textNode)
      }
    }
  }

  /* script */
  const __vue_script__ = script

  /* template */
  var __vue_render__ = function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _vm._m(0)
  };
  var __vue_staticRenderFns__ = [
    function () {
      var _vm = this
      var _h = _vm.$createElement
      var _c = _vm._self._c || _h
      return _c(
        'a',
        {
          staticClass: 'title',
          attrs: {
            href: 'https://github.com/endday/all-search',
            target: '_blank'
          }
        },
        [
          _c('p', { staticClass: 'title-inner' }, [
            _vm._v('\n    All Search\n  ')
          ])
        ]
      )
    }
  ];
  __vue_render__._withStripped = true

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject('data-v-379cea1e_0', { source: '.title[data-v-379cea1e] {\n  text-decoration: none;\n}\n.title .title-inner[data-v-379cea1e] {\n  font-size: 18px;\n  width: 120px;\n  height: 36px;\n  line-height: 36px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=logo.vue.map */',
      map: {
        'version': 3,
        'sources': ['E:\\project\\all-search\\src\\components\\logo.vue', 'logo.vue'],
        'names': [],
        'mappings': 'AAmBA;EACA,qBAAA;AClBA;ADoBA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,SAAA;EACA,kBAAA;EACA,eAAA;AClBA;;AAEA,mCAAmC',
        'file': 'logo.vue',
        'sourcesContent': ['<template>\r\n  <a class="title"\r\n     href="https://github.com/endday/all-search"\r\n     target="_blank"\r\n  >\r\n    <p class="title-inner">\r\n      All Search\r\n    </p>\r\n  </a>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \'logo\'\r\n}\r\n</script>\r\n\r\n<style lang="scss" scoped>\r\n  @import "../assets/common";\r\n  .title {\r\n    text-decoration: none;\r\n\r\n    .title-inner {\r\n      font-size: 18px;\r\n      width: 120px;\r\n      height: $height;\r\n      line-height: $height;\r\n      font-weight: 600;\r\n      color: #1990fc;\r\n      margin: 0;\r\n      text-align: center;\r\n      cursor: pointer;\r\n    }\r\n  }\r\n</style>\r\n', '.title {\n  text-decoration: none;\n}\n.title .title-inner {\n  font-size: 18px;\n  width: 120px;\n  height: 36px;\n  line-height: 36px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=logo.vue.map */']
      },
      media: undefined
    })

  }
  /* scoped */
  const __vue_scope_id__ = 'data-v-379cea1e'
  /* module identifier */
  const __vue_module_identifier__ = undefined
  /* functional template */
  const __vue_is_functional_template__ = false
  /* style inject SSR */

  /* style inject shadow dom */


  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  )

  var search = [
    {
      name: 'baidu',
      nameZh: '百度',
      url: 'https://www.baidu.com/s?wd=%s&ie=utf-8'
    },
    {
      name: 'google',
      nameZh: '谷歌',
      url: 'https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8'
    },
    {
      name: 'bing',
      nameZh: '必应',
      url: 'https://cn.bing.com/search?q=%s'
    },
    {
      name: 'DDG',
      nameZh: 'DDG',
      url: 'https://duckduckgo.com/?q=%s',
      disable: true
    },
    {
      name: '360',
      nameZh: '360',
      url: 'https://www.so.com/s?ie=utf-8&q=%s'
    },
    {
      name: 'yahoo',
      nameZh: '雅虎',
      url: 'https://search.yahoo.com/search;?p=%s',
      disable: true
    },
    {
      name: 'sogou',
      nameZh: '搜狗',
      url: 'https://www.sogou.com/web?query=%s',
      disable: false
    },
    {
      name: 'startpage',
      nameZh: 'Startpage',
      url: 'https://www.startpage.com/do/asearch$post$query',
      disable: true
    },
    {
      name: 'mijisou',
      nameZh: '秘迹搜索',
      url: 'https://mijisou.com/?q=%s&category_general=on&time_range=&language=zh-CN'
    },
    {
      name: 'Yandex',
      nameZh: 'Yandex',
      url: 'https://yandex.com/search/?text=%s',
      disabled: true
    }
  ];

  var developer = [
    {
      name: 'MDN',
      nameZh: 'MDN',
      url: 'https://developer.mozilla.org/zh-CN/search?q=%s'
    },
    {
      name: 'Can I Use',
      nameZh: 'Can I Use',
      url: 'http://caniuse.com/#search=%s',
      blank: true
    },
    {
      name: 'GitHub',
      nameZh: 'GitHub',
      url: 'https://github.com/search?utf8=✓&q=%s',
      blank: true
    },
    {
      name: 'w3c',
      nameZh: 'w3c',
      url: 'http://www.runoob.com/?s=%s'
    },
    {
      name: 'GreasyFork',
      nameZh: 'GreasyFork',
      url: 'https://greasyfork.org/scripts?q=%s&utf8=✓',
      blank: true
    }
  ];

  var engines = [
    {
      nameZh: '搜索',
      name: 'search',
      list: search
    },
    {
      nameZh: '开发者',
      name: 'developer',
      list: developer
    }
  ];

  //

  var script$1 = {
    name: 'category',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        engines,
        show: false
      }
    },
    computed: {
      nameZh () {
        const i = this.engines.findIndex(item => item.name === this.value)
        if (i > -1) {
          return this.engines[i].nameZh
        } else {
          return this.engines[0].nameZh
        }
      }
    },
    methods: {
      handleChange (val) {
        this.$emit('change', val)
      },
      openValue () {
        this.show = !this.show
      },
      selectCategory (index, item) {
        this.handleChange(item.name)
        this.show = false
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1

  /* template */
  var __vue_render__$1 = function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c('div', { staticClass: 'all-search-select' }, [
      _c('div', { staticClass: 'content', on: { click: _vm.openValue } }, [
        _c('span', { domProps: { textContent: _vm._s(_vm.nameZh) } })
      ]),
      _vm._v(' '),
      _c(
        'ul',
        {
          directives: [
            {
              name: 'show',
              rawName: 'v-show',
              value: _vm.show,
              expression: 'show'
            }
          ],
          staticClass: 'list'
        },
        _vm._l(_vm.engines, function (item, index) {
          return _c('li', {
            key: item.index,
            domProps: { textContent: _vm._s(item.nameZh) },
            on: {
              click: function ($event) {
                return _vm.selectCategory(index, item)
              }
            }
          })
        }),
        0
      )
    ])
  };
  var __vue_staticRenderFns__$1 = []
  __vue_render__$1._withStripped = true

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject('data-v-67b587fd_0', { source: '.all-search-select {\n  position: relative;\n}\n.all-search-select ul li {\n  list-style: none;\n}\n.all-search-select .content {\n  width: 100px;\n  height: 36px;\n  line-height: 36px;\n  font-size: 14px;\n  padding-left: 10px;\n  position: relative;\n}\n.all-search-select .content :after {\n  position: absolute;\n  right: 10px;\n  top: 0;\n  width: 10px;\n  height: 10px;\n  border: #666 solid;\n  border-width: 1px 1px 0 0;\n  transform: rotate(135deg);\n  margin-bottom: 10px;\n}\n.all-search-select .list {\n  padding: 4px 0;\n  min-width: 100px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n}\n.all-search-select .list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.all-search-select .list li:hover {\n  background-color: #f5f7fa;\n}\n\n/*# sourceMappingURL=category.vue.map */',
      map: {
        'version': 3,
        'sources': ['E:\\project\\all-search\\src\\components\\category.vue', 'category.vue'],
        'names': [],
        'mappings': 'AA+DA;EACA,kBAAA;AC9DA;AD+DA;EACA,gBAAA;AC7DA;ADgEA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,kBAAA;EACA,kBAAA;AC9DA;AD+DA;EACA,kBAAA;EACA,WAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,yBAAA;EACA,yBAAA;EACA,mBAAA;AC7DA;ADgEA;EACA,cAAA;EACA,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,sBAAA;EACA,2CAAA;EACA,sBAAA;EACA,aAAA;EACA,kBAAA;AC9DA;AD+DA;EACA,eAAA;EACA,eAAA;EACA,kBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,cAAA;EACA,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;AC7DA;AD8DA;EACA,yBAAA;AC5DA;;AAEA,uCAAuC',
        'file': 'category.vue',
        'sourcesContent': ['<template>\r\n  <div class="all-search-select">\r\n    <div class="content"\r\n         @click="openValue">\r\n      <span v-text="nameZh"></span>\r\n    </div>\r\n    <ul class="list"\r\n        v-show="show">\r\n      <li\r\n        v-for="(item,index) in engines"\r\n        :key="item.index"\r\n        v-text="item.nameZh"\r\n        @click="selectCategory(index,item)">\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport engines from \'../config/engines\'\r\n\r\nexport default {\r\n  name: \'category\',\r\n  props: {\r\n    value: {\r\n      type: String,\r\n      default: \'\'\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      engines,\r\n      show: false\r\n    }\r\n  },\r\n  computed: {\r\n    nameZh () {\r\n      const i = this.engines.findIndex(item => item.name === this.value)\r\n      if (i > -1) {\r\n        return this.engines[i].nameZh\r\n      } else {\r\n        return this.engines[0].nameZh\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    handleChange (val) {\r\n      this.$emit(\'change\', val)\r\n    },\r\n    openValue () {\r\n      this.show = !this.show\r\n    },\r\n    selectCategory (index, item) {\r\n      this.handleChange(item.name)\r\n      this.show = false\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .all-search-select {\r\n    position: relative;\r\n    ul li {\r\n      list-style: none;\r\n    }\r\n\r\n    .content {\r\n      width: 100px;\r\n      height: $height;\r\n      line-height: $height;\r\n      font-size: 14px;\r\n      padding-left: 10px;\r\n      position: relative;\r\n      :after {\r\n        position: absolute;\r\n        right: 10px;\r\n        top: 0;\r\n        width: 10px;\r\n        height: 10px;\r\n        border: #666 solid;\r\n        border-width: 1px 1px 0 0;\r\n        transform: rotate(135deg);\r\n        margin-bottom: 10px;\r\n      }\r\n    }\r\n    .list {\r\n      padding: 4px 0;\r\n      min-width: 100px;\r\n      border: 1px solid #e4e7ed;\r\n      border-radius: 4px;\r\n      background-color: #fff;\r\n      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);\r\n      box-sizing: border-box;\r\n      margin: 5px 0;\r\n      position: absolute;\r\n      li {\r\n        font-size: 14px;\r\n        padding: 0 20px;\r\n        position: relative;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n        color: #606266;\r\n        height: 34px;\r\n        line-height: 34px;\r\n        box-sizing: border-box;\r\n        cursor: pointer;\r\n        &:hover {\r\n          background-color: #f5f7fa;\r\n        }\r\n      }\r\n    }\r\n  }\r\n</style>\r\n', '.all-search-select {\n  position: relative;\n}\n.all-search-select ul li {\n  list-style: none;\n}\n.all-search-select .content {\n  width: 100px;\n  height: 36px;\n  line-height: 36px;\n  font-size: 14px;\n  padding-left: 10px;\n  position: relative;\n}\n.all-search-select .content :after {\n  position: absolute;\n  right: 10px;\n  top: 0;\n  width: 10px;\n  height: 10px;\n  border: #666 solid;\n  border-width: 1px 1px 0 0;\n  transform: rotate(135deg);\n  margin-bottom: 10px;\n}\n.all-search-select .list {\n  padding: 4px 0;\n  min-width: 100px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n}\n.all-search-select .list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.all-search-select .list li:hover {\n  background-color: #f5f7fa;\n}\n\n/*# sourceMappingURL=category.vue.map */']
      },
      media: undefined
    })

  }
  /* scoped */
  const __vue_scope_id__$1 = undefined
  /* module identifier */
  const __vue_module_identifier__$1 = undefined
  /* functional template */
  const __vue_is_functional_template__$1 = false
  /* style inject SSR */

  /* style inject shadow dom */


  const __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  )

  function getKeyword () {
    const el = document.querySelector('input[type=\'search\'],input[type=\'text\'][autocomplete=\'off\'],input[autocomplete=\'off\']:not([type])') ||
      document.querySelector('input[type=\'text\'][name][value],input[name][value]:not([type])');
    if (el) {
      if (el.nodeName === 'INPUT' || el.localName === 'textarea') {
        return el.value
      } else {
        return el.textContent
      }
    }
    return ''
  }

  const el = document.createElement('a')

  function parseUrl (url) {
    let val = url
    val = val.toLowerCase()
    if (val.indexOf('//') < 0) {
      val = `//${val}`
    } else if (val.indexOf('//') > -1) {
      if (
        !val.startsWith('http://') &&
        !val.startsWith('https://') &&
        !val.startsWith('ftp://') &&
        !val.startsWith('files://')
      ) {
        val = val.replace(/.*\/\//, '//')
      }
    } else {
      return el
    }
    el.href = val
    return {
      href: el.href, // '包含完整的url'
      origin: el.origin, // '包含协议到pathname之前的内容'
      protocol: el.protocol, //  'url使用的协议，包含末尾的:'
      host: el.host, //  '完整主机名，包含:和端口'
      hostname: el.hostname, //  '主机名，不包含端口'
      port: el.port, //  '端口号'
      pathname: el.pathname, //  '服务器上访问资源的路径/开头'
      search: el.search, //  'query string，?开头'
      hash: el.hash //  '#开头的fragment identifier'
    }
  }

  function getCurrentSite () {
    let currentSite = null
    for (const module of engines) {
      if (!currentSite) {
        currentSite = module.list.find(item => {
          const urlObj = parseUrl(item.url)
          return window.location.hostname.includes(urlObj.hostname)
        });
      }
    }
    return currentSite
  }

  function checkBody () {
    let time = 0
    return new Promise((resolve, reject) => {
      if (document.body) {
        resolve()
      } else {
        const id = setInterval(function () {
          time += 1
          if (document.body) {
            clearInterval(id)
            resolve()
          }
          if (time === 20) {
            clearInterval(id)
            reject(new Error('timeOut'))
          }
        }, 100);
      }
    })
  }

  function getSession (name) {
    // eslint-disable-next-line
    return GM_getValue(name)
  }

  function setSession (name, value) {
    // eslint-disable-next-line
    GM_setValue(name, value)
  }

  //

  var script$2 = {
    name: 'site-menu',
    props: {
      menus: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      handleClick (item) {
        this.$emit('click', item)
        let keyword = ''
        if (this.$root.currentSite.keyword) {
          keyword = this.$root.currentSite.keyword()
        } else {
          keyword = getKeyword()
        }
        window.location.href = item.url.replace('%s', keyword)
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2

  /* template */
  var __vue_render__$2 = function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c('div', { staticClass: 'menu-container' }, [
      _c(
        'ul',
        { staticClass: 'menu' },
        _vm._l(_vm.menus, function (item, i) {
          return _c(
            'li',
            {
              key: i,
              staticClass: 'menu-submenu',
              on: {
                click: function ($event) {
                  return _vm.handleClick(item)
                }
              }
            },
            [
              _c('div', {
                staticClass: 'menu-submenu-title',
                domProps: { textContent: _vm._s(item.nameZh) }
              })
            ]
          )
        }),
        0
      )
    ])
  };
  var __vue_staticRenderFns__$2 = []
  __vue_render__$2._withStripped = true

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject('data-v-b3cefad2_0', { source: '.menu-container[data-v-b3cefad2] {\n  display: flex;\n}\n.menu[data-v-b3cefad2] {\n  line-height: 36px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n.menu-submenu[data-v-b3cefad2] {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  vertical-align: bottom;\n}\n.menu-submenu-selected[data-v-b3cefad2] {\n  color: #1890ff;\n  border-bottom: 2px solid #1890ff;\n}\n.menu-submenu-title[data-v-b3cefad2] {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n/*# sourceMappingURL=menu.vue.map */',
      map: {
        'version': 3,
        'sources': ['E:\\project\\all-search\\src\\components\\menu.vue', 'menu.vue'],
        'names': [],
        'mappings': 'AAiDA;EACA,aAAA;AChDA;ADmDA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;EACA,SAAA;EACA,gBAAA;EACA,sBAAA;AChDA;ADmDA;EACA,kBAAA;EACA,QAAA;EACA,qBAAA;EACA,sBAAA;AChDA;ADmDA;EACA,cAAA;EACA,gCAAA;AChDA;ADmDA;EACA,kBAAA;EACA,cAAA;EACA,SAAA;EACA,eAAA;EACA,mBAAA;EACA,eAAA;EACA,eAAA;AChDA;;AAEA,mCAAmC',
        'file': 'menu.vue',
        'sourcesContent': ['<template>\r\n  <div class="menu-container">\r\n    <ul class="menu">\r\n      <li class="menu-submenu"\r\n          v-for="(item, i) in menus"\r\n          :key="i"\r\n          @click="handleClick(item)">\r\n        <div class="menu-submenu-title"\r\n             v-text="item.nameZh">\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { getKeyword } from \'../util\'\r\n\r\nexport default {\r\n  name: \'site-menu\',\r\n  props: {\r\n    menus: {\r\n      type: Array,\r\n      default () {\r\n        return []\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {}\r\n  },\r\n  methods: {\r\n    handleClick (item) {\r\n      this.$emit(\'click\', item)\r\n      let keyword = \'\'\r\n      if (this.$root.currentSite.keyword) {\r\n        keyword = this.$root.currentSite.keyword()\r\n      } else {\r\n        keyword = getKeyword()\r\n      }\r\n      window.location.href = item.url.replace(\'%s\', keyword)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang="scss" scoped>\r\n  @import "../assets/common";\r\n\r\n  .menu-container {\r\n    display: flex;\r\n  }\r\n\r\n  .menu {\r\n    line-height: $height;\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 0;\r\n    margin-top: -1px;\r\n    margin-bottom: 0;\r\n    white-space: nowrap;\r\n    border: 0;\r\n    box-shadow: none;\r\n    background-color: #fff;\r\n  }\r\n\r\n  .menu-submenu {\r\n    position: relative;\r\n    top: 1px;\r\n    display: inline-block;\r\n    vertical-align: bottom;\r\n  }\r\n\r\n  .menu-submenu-selected {\r\n    color: #1890ff;\r\n    border-bottom: 2px solid #1890ff;\r\n  }\r\n\r\n  .menu-submenu-title {\r\n    position: relative;\r\n    display: block;\r\n    margin: 0;\r\n    padding: 0 20px;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n    font-size: 14px;\r\n  }\r\n</style>\r\n', '.menu-container {\n  display: flex;\n}\n\n.menu {\n  line-height: 36px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n\n.menu-submenu {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  vertical-align: bottom;\n}\n\n.menu-submenu-selected {\n  color: #1890ff;\n  border-bottom: 2px solid #1890ff;\n}\n\n.menu-submenu-title {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n/*# sourceMappingURL=menu.vue.map */']
      },
      media: undefined
    })

  }
  /* scoped */
  const __vue_scope_id__$2 = 'data-v-b3cefad2'
  /* module identifier */
  const __vue_module_identifier__$2 = undefined
  /* functional template */
  const __vue_is_functional_template__$2 = false
  /* style inject SSR */

  /* style inject shadow dom */


  const __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  )

  //

  var script$3 = {
    name: 'all-search',
    components: {
      logo: __vue_component__,
      category: __vue_component__$1,
      siteMenu: __vue_component__$2
    },
    data () {
      return {
        engines,
        categoryName: 'search'
      }
    },
    computed: {
      menus () {
        const i = this.engines.findIndex(item => item.name === this.categoryName)
        if (i > -1) {
          return this.engines[i].list
        }
        return this.engines[0].list
      }
    },
    created () {
      this.categoryName = getSession('__allSearch__categoryName') || this.categoryName
    },
    methods: {
      handleClick (tab) {
        this.$emit('menu-click', tab)
      },
      changeCategory (name) {
        setSession('__allSearch__categoryName', name)
        this.categoryName = name
      }
    }
  };

  /* script */
  const __vue_script__$3 = script$3

  /* template */
  var __vue_render__$3 = function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      'header',
      { attrs: { id: 'all-search' } },
      [
        _c('logo'),
        _vm._v(' '),
        _c('category', {
          attrs: { value: _vm.categoryName },
          on: { change: _vm.changeCategory }
        }),
        _vm._v(' '),
        _c('site-menu', { attrs: { menus: _vm.menus } })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$3 = []
  __vue_render__$3._withStripped = true

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject('data-v-5316ad40_0', { source: 'body {\n  margin-top: 36px;\n}\n#all-search {\n  height: 36px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  z-index: 999999;\n  display: flex;\n  border-bottom: 1px #e8e8e8 solid;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n.el-tabs .el-tabs__header {\n  margin-bottom: 0;\n}\n.el-tabs .el-tabs__nav-wrap::after {\n  height: 0;\n}\n.el-tabs .el-tabs__nav {\n  margin: 0 20px;\n}\n.el-tabs .el-tabs__item {\n  height: 36px;\n  line-height: 36px;\n}\n\n/*# sourceMappingURL=App.vue.map */',
      map: {
        'version': 3,
        'sources': ['E:\\project\\all-search\\src\\App.vue', 'App.vue'],
        'names': [],
        'mappings': 'AAwDA;EACA,gBAAA;ACvDA;AD0DA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,MAAA;EACA,eAAA;EACA,aAAA;EACA,gCAAA;EACA,sBAAA;EACA,kMAAA;ACvDA;AD2DA;EACA,gBAAA;ACxDA;AD2DA;EACA,SAAA;ACzDA;AD4DA;EACA,cAAA;AC1DA;AD4DA;EACA,YAAA;EACA,iBAAA;AC1DA;;AAEA,kCAAkC',
        'file': 'App.vue',
        'sourcesContent': ['<template>\r\n  <header id="all-search">\r\n    <logo/>\r\n    <category :value="categoryName"\r\n              @change="changeCategory"/>\r\n    <site-menu :menus="menus"/>\r\n  </header>\r\n</template>\r\n\r\n<script>\r\nimport logo from \'./components/logo.vue\'\r\nimport category from \'./components/category.vue\'\r\nimport siteMenu from \'./components/menu.vue\'\r\nimport engines from \'./config/engines/index.js\'\r\nimport { getSession, setSession } from \'./util\'\r\n\r\nexport default {\r\n  name: \'all-search\',\r\n  components: {\r\n    logo,\r\n    category,\r\n    siteMenu\r\n  },\r\n  data () {\r\n    return {\r\n      engines,\r\n      categoryName: \'search\'\r\n    }\r\n  },\r\n  computed: {\r\n    menus () {\r\n      const i = this.engines.findIndex(item => item.name === this.categoryName)\r\n      if (i > -1) {\r\n        return this.engines[i].list\r\n      }\r\n      return this.engines[0].list\r\n    }\r\n  },\r\n  created () {\r\n    this.categoryName = getSession(\'__allSearch__categoryName\') || this.categoryName\r\n  },\r\n  methods: {\r\n    handleClick (tab) {\r\n      this.$emit(\'menu-click\', tab)\r\n    },\r\n    changeCategory (name) {\r\n      setSession(\'__allSearch__categoryName\', name)\r\n      this.categoryName = name\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang="scss">\r\n  @import "./assets/common";\r\n\r\n  body {\r\n    margin-top: $height;\r\n  }\r\n\r\n  #all-search {\r\n    height: $height;\r\n    width: 100%;\r\n    position: fixed;\r\n    top: 0;\r\n    z-index: 999999;\r\n    display: flex;\r\n    border-bottom: 1px #e8e8e8 solid;\r\n    background-color: #fff;\r\n    font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Sans\', sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\', \'Noto Color Emoji\';\r\n  }\r\n\r\n  .el-tabs {\r\n    .el-tabs__header {\r\n      margin-bottom: 0;\r\n    }\r\n\r\n    .el-tabs__nav-wrap::after {\r\n      height: 0;\r\n    }\r\n\r\n    .el-tabs__nav {\r\n      margin: 0 20px;\r\n    }\r\n    .el-tabs__item {\r\n      height: $height;\r\n      line-height: $height;\r\n    }\r\n  }\r\n</style>\r\n', 'body {\n  margin-top: 36px;\n}\n\n#all-search {\n  height: 36px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  z-index: 999999;\n  display: flex;\n  border-bottom: 1px #e8e8e8 solid;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n\n.el-tabs .el-tabs__header {\n  margin-bottom: 0;\n}\n.el-tabs .el-tabs__nav-wrap::after {\n  height: 0;\n}\n.el-tabs .el-tabs__nav {\n  margin: 0 20px;\n}\n.el-tabs .el-tabs__item {\n  height: 36px;\n  line-height: 36px;\n}\n\n/*# sourceMappingURL=App.vue.map */']
      },
      media: undefined
    })

  }
  /* scoped */
  const __vue_scope_id__$3 = undefined
  /* module identifier */
  const __vue_module_identifier__$3 = undefined
  /* functional template */
  const __vue_is_functional_template__$3 = false
  /* style inject SSR */

  /* style inject shadow dom */


  const __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  )

  const whiteList = [
    'endday.github.io',
    'endday.gitee.io',
    'localhost'
  ];
  function isWhiteList () {
    return whiteList.findIndex(url => url === window.location.hostname) > -1
  }

  Vue.config.productionTip = false

  const currentSite = getCurrentSite()

  if (currentSite || isWhiteList()) {
    const el = document.createElement('div')
    el.id = 'all-search'

    const app = new Vue({
      data () {
        return {
          currentSite
        }
      },
      render: h => h(__vue_component__$3)
    });

    checkBody().then(() => {
      document.body.insertBefore(el, document.body.childNodes[0])
      app.$mount('#all-search')
    });
  }

}(Vue));
