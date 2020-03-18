// ==UserScript==
// @name         all-search
// @version      0.1.2c
// @description  在各个引擎之间跳转的顶部菜单，借鉴自searchEngineJump
// @author       endday
// @include      *
// @namespace    https://github.com/endday
// @homepage     /all-search

// @require      https://cdn.jsdelivr.net/npm/vue
// @run-at       document-body

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle

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
  }

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
    } else if (style) {
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
      } else {
        // inject component registration as beforeCreate hook
        const existing = options.beforeCreate
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
      }
    }
    return script
  }

  const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase())

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
      } else {
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
  }
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
  ]
  __vue_render__._withStripped = true

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject('data-v-4cf5fe12_0', {
      source: '.title[data-v-4cf5fe12] {\n  text-decoration: none;\n}\n.title .title-inner[data-v-4cf5fe12] {\n  font-size: 18px;\n  width: 120px;\n  height: 36px;\n  line-height: 36px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=logo.vue.map */',
      map: {
        'version': 3,
        'sources': ['E:\\myProject\\all-search\\src\\components\\logo.vue', 'logo.vue'],
        'names': [],
        'mappings': 'AAmBA;EACA,qBAAA;AClBA;ADoBA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,SAAA;EACA,kBAAA;EACA,eAAA;AClBA;;AAEA,mCAAmC',
        'file': 'logo.vue',
        'sourcesContent': ['<template>\r\n  <a class="title"\r\n     href="https://github.com/endday/all-search"\r\n     target="_blank"\r\n  >\r\n    <p class="title-inner">\r\n      All Search\r\n    </p>\r\n  </a>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \'logo\'\r\n}\r\n</script>\r\n\r\n<style lang="scss" scoped>\r\n  @import "../assets/common";\r\n  .title {\r\n    text-decoration: none;\r\n\r\n    .title-inner {\r\n      font-size: 18px;\r\n      width: 120px;\r\n      height: $height;\r\n      line-height: $height;\r\n      font-weight: 600;\r\n      color: #1990fc;\r\n      margin: 0;\r\n      text-align: center;\r\n      cursor: pointer;\r\n    }\r\n  }\r\n</style>\r\n', '.title {\n  text-decoration: none;\n}\n.title .title-inner {\n  font-size: 18px;\n  width: 120px;\n  height: 36px;\n  line-height: 36px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=logo.vue.map */']
      },
      media: undefined
    })

  }
  /* scoped */
  const __vue_scope_id__ = 'data-v-4cf5fe12'
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
      url: 'https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8',
      styleString: '.srp #searchform:not(.minidiv){top: 56px !important;} .srp .minidiv{top: 36px !important;}'
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
      url: 'https://mijisou.com/?q=%s&category_general=on&time_range=&language=zh-CN',
      styleString: '.search-page{top: 36px} .searx-navbar{top: 48px!important;}'
    },
    {
      name: 'Yandex',
      nameZh: 'Yandex',
      url: 'https://yandex.com/search/?text=%s',
      disabled: true
    }
  ];

  var translate = [
    {
      name: 'google',
      nameZh: '谷歌翻译',
      url: 'https://translate.google.com/?q=%s'
    },
    {
      name: 'baidu',
      nameZh: '百度翻译',
      url: 'http://fanyi.baidu.com/#auto/zh/%s'
    },
    {
      name: 'youdao',
      nameZh: '有道词典',
      url: 'http://dict.youdao.com/search?q=%s',
      blank: true
    },
    {
      name: 'bing',
      nameZh: '必应翻译',
      url: 'http://cn.bing.com/dict/search?q=%s'
    },
    {
      name: 'forvo',
      nameZh: 'Forvo发音',
      url: 'https://zh.forvo.com/search/%s',
      blank: true
    },
    {
      name: 'cnki',
      nameZh: 'CNKI翻译',
      url: 'http://dict.cnki.net/dict_result.aspx?searchword=%s',
      disable: true
    },
    {
      name: 'zdic',
      nameZh: '汉典',
      url: 'http://www.zdic.net/sousuo/?q=%s',
      disable: true
    },
    {
      name: 'dict',
      nameZh: '海词',
      url: 'http://dict.cn/%s'
    }
  ];

  var developer = [
    {
      name: 'MDN',
      nameZh: 'MDN',
      url: 'https://developer.mozilla.org/zh-CN/search?q=%s'
    },
    {
      name: 'stackoverflow',
      nameZh: 'stackoverflow',
      url: 'https://stackoverflow.com/search?q=%s'
    },
    {
      name: 'juejin',
      nameZh: '掘金',
      url: 'https://juejin.im/search?query=%s&type=all'
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
      url: 'https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓',
      blank: true
    }
  ];

  var music = [
    {
      name: 'NetEase',
      nameZh: '网易音乐',
      url: 'http://music.163.com/#/search/m/?s=%s'
    },
    {
      name: '1ting',
      nameZh: '一听',
      url: 'http://so.1ting.com/all.do?q=%s'
    },
    {
      name: 'xiami',
      nameZh: '虾米音乐',
      url: 'http://www.xiami.com/search?key=%s'
    },
    {
      name: 'yinyuetai',
      nameZh: '音悦Tai',
      url: 'http://so.yinyuetai.com/?keyword=%s'
    },
    {
      name: 'qq',
      nameZh: 'QQ音乐',
      url: 'https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s',
      blank: true
    },
    {
      name: 'baidu',
      nameZh: '百度音乐',
      url: 'http://music.baidu.com/search?ie=utf-8&oe=utf-8&key=%s'
    },
    {
      name: 'kuwo',
      nameZh: '酷我音乐',
      url: 'http://sou.kuwo.cn/ws/NSearch?type=all&key=%s',
      blank: true
    },
    {
      name: 'kugou',
      nameZh: '酷狗',
      url: 'http://search.5sing.kugou.com/?keyword=%s',
      blank: true
    }
  ];

  var news = [
    {
      name: 'google',
      nameZh: '谷歌中文',
      url: 'https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
      blank: true
    },
    {
      name: 'baidu',
      nameZh: '百度新闻',
      url: 'http://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1',
      blank: true
    },
    {
      name: '163-baidu',
      nameZh: '网易-百度',
      url: 'https://www.baidu.com/s?wd=%s%20site%3Anews.163.com',
      blank: true
    },
    {
      name: '163-google',
      nameZh: '网易-谷歌',
      url: 'https://www.google.com.hk/search?q=site:news.163.com+%s',
      blank: true
    },
    {
      name: 'qq',
      nameZh: '腾讯新闻',
      url: 'https://www.sogou.com/sogou?site=news.qq.com&query=%s',
      blank: true
    },
    {
      name: 'ifeng',
      nameZh: '凤凰新闻',
      url: 'http://search.ifeng.com/sofeng/search.action?q=%s',
      blank: true
    },
    {
      name: 'CNN',
      nameZh: 'CNN',
      url: 'https://edition.cnn.com/search/?q=%s',
      blank: true
    },
    {
      name: 'BBC',
      nameZh: 'BBC',
      url: 'https://www.bbc.co.uk/search?q=%s',
      blank: true
    },
    {
      name: 'Economis',
      nameZh: 'Economis',
      url: 'https://www.google.com/search?q=site:www.economist.com%20%s',
      blank: true
    },
    {
      name: 'toutiao',
      nameZh: '今日头条',
      url: 'https://www.toutiao.com/search/?keyword=%E4%B8%96%E7%95%8C%E6%9D%AF',
      blank: true
    }
  ];

  var social = [
    {
      name: 'Twitter',
      nameZh: '推特',
      url: 'https://twitter.com/search/%s',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABR0lEQVQ4jWNgGEyAH5e4bXhCgX1ibqOVb2gCklpU9ealvRuRFMCBau3cCwxTzvxnmHbhP8PEk//1yyfvl6xb9sDGLywJRaFh/+ZTDBNP/rfOrZ8PM11VW9uAYcnj/wxr3iHwwvv/eZfc/mxkZeeEYoBvdnkdw5p3/xnm3PjP37TunXVu/XyH3LopKJqhODCrtIKBgYEHxQCDliVH4YpWvvrPMOfGf4aZVzA0M6x595+Xl1cEI6RcfIPDeFc8/oxNAzLWWHjuNq5Y4PFvmT6fkCH++dWNuAxgcPAJCteYc+Y2PttFRUUlcBrAwMDA7x4UEWUzbcchbJotbW3tcWq0zq2fz1+38h1D597/DPNvo2h2nrBmG1QzMy4DmNXU1DR8I2IT/FtnLYThkPKWTs+g0HA1NTUNfJqRAY+kpKQ8DEP9y06MxoEDAKUW4Kpi1NnUAAAAAElFTkSuQmCC'
    },
    {
      name: 'douban',
      nameZh: '豆瓣',
      url: 'http://www.douban.com/search?source=suggest&q=%s',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACOElEQVQ4jZXST0jTYRjA8UfQNd2w3DqERIQQBmFQNPFgHVwI2SHokKTQpaB/RJvZ/JPLhWWkCcq2lCIhFILyEHaoYEr9LE1/bXMzqYOYTmeUOT2olWjfDjYV+qcvfC4vL194eR6R7Zqjkqf3SK5ubfL0HslJuCeSr1ekciNSmoAUa1bPvh6pMCJyRNcmJVqqntehjvhXLa02EynSIpKr80iJlmrFSceHLtoHlP/qGfGxs3ZvNKD3yGUDYtWw5XoaJqeZzPoD7Gs4+JsMdzYmZxYxxQakUIfYjdFAEnI+lpa+VgCmv88QmZ1k6uvUkonZSaIn3WVGLLGI3bAiYInjYfARAObbh0i+ksLmyh1Lkh1bud/bAoDJmYVY4v4e2HQ1FTkhyNkVjgt1L+v/FYil9d1TANydd6hsu0mN4qZGcVGjuHA8u4Z3tBeADHf2H75QoKX0iYPP0+MADEaGCX7sp//TewJjb/k2PwdAz4iP1KrdSIF2ZcCAFCUhZwTr40sAHG46hpyLQQr1iC0R/1gfEzMREsqSEeu6xffLASNSEI+cFrZV72F+YZ5GtRk5JchJIeXGLhZ+LNDse7B4Z4lFLiZGx7i4SLe67qKGvPSO9S2NSw15UYd7GIqEABif/oI6rKKO+jG5zIhNsxxoeN2ILxzgzaif9oEOXgx24gsH8IWDdIe8tA8ovBrqxhcO4gsHSHft/xXI1ytSbkQuxCNWzerZEhGHEZEcXZNUGBF7ElK2BuUGxLZh7icJ8DyZ0CDAawAAAABJRU5ErkJggg=='
    },
    {
      name: 'tieba',
      nameZh: '百度贴吧',
      url: 'http://tieba.baidu.com/f?kw=%s&ie=utf-8',
      blank: true
    },
    {
      name: 'qq',
      nameZh: '腾讯微博',
      url: 'http://search.t.qq.com/index.php?k=%s',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADd0lEQVQ4jXXMaUyTBxzH8SfbK98sMjXAoEAB0YHLRuCNjnMLMxhissQd2RYPZgzOuBcsWbIsmbAwNhG6FaaAlhadghzLmFAw8MxyFCiUlkMOW+5SEChFwvGUcn33QvTNsn/yyf/36isIgrBXfvJcdnyGRoz/SSPGpReJMbui0orEY2nP/4t9NK1IPJZeLEak5lQdCIs4I8g/PK/80uTmvHmDZJObs13rfGKQ+NQgkWx0cdYo8VG7xKk2ic87XbvW+cK8zQcavUuITtc0nu50cbx2mgStnfdqpkg3LWByuLCvbjK1uknHnIvvOx3E1UxxvHaaEw+nSWqY50StHeHoDyrxVMsysQ8mift7Au3kCu6tHUT7Cjk9Cyh6F9DZV1nf2ub+8BJRVRO8X20joW6G+KoxhMjvCsSkR4u8XT6MZsjJ9g5cbp4mrNRKyD0LIfcshJVa+UY/w84OKHochJePEFNt490KC8Jb314Xo7WzJFaNIG1uk9k5i0zdT2ylFUX3PDnmOaIrrMjUA/xqnmNe2iC20kp4+QgRJQMIb6bmikdKLKT+M8qCtEFksZngQiPi+DNeXN2oE3l+J1F3e3CsbZCstRBw00SYqgsh8OscMfCmiR8bhxlxruGj0BFeoGduxfUysCi5eadAj1zZhG1J4nLtAAdyGgnKa0Hwu5QtyvI7uVD9mOX1TUJvNBOtbmdJcr8MVPTP4HFVJPJWK07JzccV3ezPfoSfsgnhja+yxACVmfBb7fTNLXPyvpmmcSdKwwQp2gFS6y3I81p4JaOBa23jTCxJBF1vwTtXj6+yCcEzJUs8WNyPV24rhwsNZOpHMU4vslfRgpCpQ/hZx55rTVyse8Lm9g4XH1p4TdGMb34H3soWhP0pWWLwXSueN4zICoz0zM5xWjvIEY2ZjDYbVw02dJPPWHZvcaXVhkeeAZ8CIzJVN96/tz8PHCwbZ19hL59p++maGcVX1c25+gn6HBK9DonbgwskVll5Pb8bWVEf/uo+Am4P4pNvRNh36Tfd4b+e4qWx8EtHF2VDJrzUFvzvPMFbPYi3ehBP9SDemiEC/7AQtCu4dBQ/VR+Cx5krdaH1a8jL7ZQMNVDwuBW/smkOVU4RsuvQf9gIrXHip+pBeNU3KNEz/c+n8pIxEh70EVPVT0DJOIGlY/8rqGwS/6Je9iRduPMvGb/OaZ8pffkAAAAASUVORK5CYII='
    },
    {
      name: 'sina',
      nameZh: '新浪微博',
      url: 'http://s.weibo.com/weibo/%s',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpElEQVQ4jb2SXUiTcRTGH9CZNmeyvXO+2163tSWaFWmsMmtpSpC1EBNDJaiky0AEL6S0D4pKHVFpXmTaB5FdtIuEqBslBCMqKyNDUFKpLQ2rOb9y/s/pIlYUeBFBz+U55wfnBw/wHxO7zowNa4zIAKD6a3pPOkpG6zA+WoeJ50fwJi8VOxc91gLKzpjYwjUq1cbwLA7QbluJHVuSkespxsWpywi5HNj+JxtToZWOv7As980kp3G/1T4pAXJ42VCCpp5q9KZbkHmhFC091ej7JQgk3JLND4LJK3nckcJ+Rwr3W+yTOUuW5rvV6pIqrXRib6L6QI0bp7uq8NRlx7aRs/gc5uO9RqU76EjlUZOF3+llGjGYaECSZ/t0CV8+KTaeSU7jLr190GWM3N68H9d2rEaB34PZH6/pE9umbCt42GBmX3YezRytJXH9JoVaWjlQWcUfMjfzmKzwsySrzwDYAGCtAmdDEZqRGR2d609azr6UVRy40kJibo7eDg/Tw+5uGvT5SAhB8z4/TVRW0ZCshO4ZlccZkdFbfro36PVtAesKnrrrZSEEnfF4CAABIJ1OR16vl4QQtDA/Tx93FfC02cbdim1IA0gAgDvx0qPpfDcLIehJby9pNBoqKioit9tNKpWKnE4nCSFICEHjhyvIn2DkfqtjMqyCGrXG8y07j5mYOzo7aavLRYFAgLKysggAHSwvJyEEhfx+8m1y8YzFwU16QzuAiHBpzA+khFd88hQvBINcW1/P63NyOE6WqXDfPhqbnubQ4BB/LS7loMnC90yWHgkw/tYeCZDr1eqW97sLJ7ntBr++1MgDV1uZO+4zHzvBX9Od/FJv8FfrpHMA4hetsAVILYuIOOSREi+3GpX2xrhlt2tUMed3R0WVGYGkRcF/yXdyajYEKzT4iQAAAABJRU5ErkJggg=='
    },
    {
      name: 'Facebook',
      nameZh: '脸书',
      url: 'https://www.facebook.com/search/results.php?q=%s',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAbQtE48bOXX9J8UrGmdeBhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZYOJRdZhUA8w9a48QmVfxAwATIfnUl6gLIAAAAABJRU5ErkJggg=='
    },
    {
      name: 'weixin',
      nameZh: '微信搜索',
      url: 'http://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s',
      favicon: 'data:image/png;base64,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'
    }
  ];

  var engines = [
    {
      nameZh: '搜索',
      name: 'search',
      list: search
    },
    {
      nameZh: '翻译',
      name: 'translate',
      list: translate
    },
    {
      nameZh: '开发者',
      name: 'developer',
      list: developer
    },
    {
      nameZh: '音乐',
      name: 'music',
      list: music
    },
    {
      nameZh: '新闻',
      name: 'news',
      list: news
    },
    {
      nameZh: '社交',
      name: 'social',
      list: social
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
  }
  var __vue_staticRenderFns__$1 = []
  __vue_render__$1._withStripped = true

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject('data-v-c02246c0_0', {
      source: '@charset "UTF-8";\n.all-search-select {\n  position: relative;\n}\n.all-search-select ul li {\n  list-style: none;\n}\n.all-search-select .content {\n  width: 100px;\n  height: 36px;\n  line-height: 36px;\n  font-size: 14px;\n  cursor: pointer;\n  padding-left: 10px;\n  position: relative;\n}\n.all-search-select .content::after {\n  content: " ▾";\n  position: absolute;\n  right: 12px;\n  font-size: 24px;\n  color: #999;\n}\n.all-search-select .list {\n  padding: 4px 0;\n  min-width: 100px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n}\n.all-search-select .list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.all-search-select .list li:hover {\n  background-color: #f5f7fa;\n}\n\n/*# sourceMappingURL=category.vue.map */',
      map: {
        'version': 3,
        'sources': ['category.vue', 'E:\\myProject\\all-search\\src\\components\\category.vue'],
        'names': [],
        'mappings': 'AAAA,gBAAgB;AC+DhB;EACA,kBAAA;AD7DA;AC8DA;EACA,gBAAA;AD5DA;AC+DA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,eAAA;EACA,kBAAA;EACA,kBAAA;AD7DA;AC8DA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;EACA,eAAA;EACA,WAAA;AD5DA;AC+DA;EACA,cAAA;EACA,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,sBAAA;EACA,2CAAA;EACA,sBAAA;EACA,aAAA;EACA,kBAAA;AD7DA;AC8DA;EACA,eAAA;EACA,eAAA;EACA,kBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,cAAA;EACA,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;AD5DA;AC6DA;EACA,yBAAA;AD3DA;;AAEA,uCAAuC',
        'file': 'category.vue',
        'sourcesContent': ['@charset "UTF-8";\n.all-search-select {\n  position: relative;\n}\n.all-search-select ul li {\n  list-style: none;\n}\n.all-search-select .content {\n  width: 100px;\n  height: 36px;\n  line-height: 36px;\n  font-size: 14px;\n  cursor: pointer;\n  padding-left: 10px;\n  position: relative;\n}\n.all-search-select .content::after {\n  content: " ▾";\n  position: absolute;\n  right: 12px;\n  font-size: 24px;\n  color: #999;\n}\n.all-search-select .list {\n  padding: 4px 0;\n  min-width: 100px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n}\n.all-search-select .list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.all-search-select .list li:hover {\n  background-color: #f5f7fa;\n}\n\n/*# sourceMappingURL=category.vue.map */', '<template>\r\n  <div class="all-search-select">\r\n    <div class="content"\r\n         @click="openValue">\r\n      <span v-text="nameZh"></span>\r\n    </div>\r\n    <ul class="list"\r\n        v-show="show">\r\n      <li\r\n        v-for="(item,index) in engines"\r\n        :key="item.index"\r\n        v-text="item.nameZh"\r\n        @click="selectCategory(index,item)">\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport engines from \'../config/engines\'\r\n\r\nexport default {\r\n  name: \'category\',\r\n  props: {\r\n    value: {\r\n      type: String,\r\n      default: \'\'\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      engines,\r\n      show: false\r\n    }\r\n  },\r\n  computed: {\r\n    nameZh () {\r\n      const i = this.engines.findIndex(item => item.name === this.value)\r\n      if (i > -1) {\r\n        return this.engines[i].nameZh\r\n      } else {\r\n        return this.engines[0].nameZh\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    handleChange (val) {\r\n      this.$emit(\'change\', val)\r\n    },\r\n    openValue () {\r\n      this.show = !this.show\r\n    },\r\n    selectCategory (index, item) {\r\n      this.handleChange(item.name)\r\n      this.show = false\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .all-search-select {\r\n    position: relative;\r\n    ul li {\r\n      list-style: none;\r\n    }\r\n\r\n    .content {\r\n      width: 100px;\r\n      height: $height;\r\n      line-height: $height;\r\n      font-size: 14px;\r\n      cursor: pointer;\r\n      padding-left: 10px;\r\n      position: relative;\r\n      &::after {\r\n        content: \' ▾\';\r\n        position: absolute;\r\n        right: 12px;\r\n        font-size: 24px;\r\n        color: #999;\r\n      }\r\n    }\r\n    .list {\r\n      padding: 4px 0;\r\n      min-width: 100px;\r\n      border: 1px solid #e4e7ed;\r\n      border-radius: 4px;\r\n      background-color: #fff;\r\n      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);\r\n      box-sizing: border-box;\r\n      margin: 5px 0;\r\n      position: absolute;\r\n      li {\r\n        font-size: 14px;\r\n        padding: 0 20px;\r\n        position: relative;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n        color: #606266;\r\n        height: 34px;\r\n        line-height: 34px;\r\n        box-sizing: border-box;\r\n        cursor: pointer;\r\n        &:hover {\r\n          background-color: #f5f7fa;\r\n        }\r\n      }\r\n    }\r\n  }\r\n</style>\r\n']
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
      document.querySelector('input[type=\'text\'][name][value],input[name][value]:not([type])')
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
          return window.location.href.includes(urlObj.hostname + urlObj.pathname)
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
    if (window.location.hostname === 'localhost') {
      return null
    }
    // eslint-disable-next-line
    return GM_getValue(name)
  }

  function setSession (name, value) {
    if (window.location.hostname !== 'localhost') {
      // eslint-disable-next-line
      GM_setValue(name, value)
    }
  }

  function addStyle$1 (style) {
    if (window.location.hostname !== 'localhost') {
      // eslint-disable-next-line
      GM_addStyle(style)
    }
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
  }
  var __vue_staticRenderFns__$2 = []
  __vue_render__$2._withStripped = true

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject('data-v-0ae3a423_0', {
      source: '.menu-container[data-v-0ae3a423] {\n  display: flex;\n}\n.menu[data-v-0ae3a423] {\n  line-height: 36px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n.menu-submenu[data-v-0ae3a423] {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  vertical-align: bottom;\n}\n.menu-submenu-selected[data-v-0ae3a423] {\n  color: #1890ff;\n  border-bottom: 2px solid #1890ff;\n}\n.menu-submenu-title[data-v-0ae3a423] {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n/*# sourceMappingURL=menu.vue.map */',
      map: {
        'version': 3,
        'sources': ['E:\\myProject\\all-search\\src\\components\\menu.vue', 'menu.vue'],
        'names': [],
        'mappings': 'AAiDA;EACA,aAAA;AChDA;ADmDA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;EACA,SAAA;EACA,gBAAA;EACA,sBAAA;AChDA;ADmDA;EACA,kBAAA;EACA,QAAA;EACA,qBAAA;EACA,sBAAA;AChDA;ADmDA;EACA,cAAA;EACA,gCAAA;AChDA;ADmDA;EACA,kBAAA;EACA,cAAA;EACA,SAAA;EACA,eAAA;EACA,mBAAA;EACA,eAAA;EACA,eAAA;AChDA;;AAEA,mCAAmC',
        'file': 'menu.vue',
        'sourcesContent': ['<template>\r\n  <div class="menu-container">\r\n    <ul class="menu">\r\n      <li class="menu-submenu"\r\n          v-for="(item, i) in menus"\r\n          :key="i"\r\n          @click="handleClick(item)">\r\n        <div class="menu-submenu-title"\r\n             v-text="item.nameZh">\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { getKeyword } from \'../util\'\r\n\r\nexport default {\r\n  name: \'site-menu\',\r\n  props: {\r\n    menus: {\r\n      type: Array,\r\n      default () {\r\n        return []\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {}\r\n  },\r\n  methods: {\r\n    handleClick (item) {\r\n      this.$emit(\'click\', item)\r\n      let keyword = \'\'\r\n      if (this.$root.currentSite.keyword) {\r\n        keyword = this.$root.currentSite.keyword()\r\n      } else {\r\n        keyword = getKeyword()\r\n      }\r\n      window.location.href = item.url.replace(\'%s\', keyword)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang="scss" scoped>\r\n  @import "../assets/common";\r\n\r\n  .menu-container {\r\n    display: flex;\r\n  }\r\n\r\n  .menu {\r\n    line-height: $height;\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 0;\r\n    margin-top: -1px;\r\n    margin-bottom: 0;\r\n    white-space: nowrap;\r\n    border: 0;\r\n    box-shadow: none;\r\n    background-color: #fff;\r\n  }\r\n\r\n  .menu-submenu {\r\n    position: relative;\r\n    top: 1px;\r\n    display: inline-block;\r\n    vertical-align: bottom;\r\n  }\r\n\r\n  .menu-submenu-selected {\r\n    color: #1890ff;\r\n    border-bottom: 2px solid #1890ff;\r\n  }\r\n\r\n  .menu-submenu-title {\r\n    position: relative;\r\n    display: block;\r\n    margin: 0;\r\n    padding: 0 20px;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n    font-size: 14px;\r\n  }\r\n</style>\r\n', '.menu-container {\n  display: flex;\n}\n\n.menu {\n  line-height: 36px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n\n.menu-submenu {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  vertical-align: bottom;\n}\n\n.menu-submenu-selected {\n  color: #1890ff;\n  border-bottom: 2px solid #1890ff;\n}\n\n.menu-submenu-title {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n/*# sourceMappingURL=menu.vue.map */']
      },
      media: undefined
    })

  }
  /* scoped */
  const __vue_scope_id__$2 = 'data-v-0ae3a423'
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
  }
  var __vue_staticRenderFns__$3 = []
  __vue_render__$3._withStripped = true

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject('data-v-f0ce6228_0', {
      source: 'body {\n  margin-top: 36px;\n}\n#all-search {\n  height: 36px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  z-index: 999999;\n  display: flex;\n  border-bottom: 1px #e8e8e8 solid;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n.el-tabs .el-tabs__header {\n  margin-bottom: 0;\n}\n.el-tabs .el-tabs__nav-wrap::after {\n  height: 0;\n}\n.el-tabs .el-tabs__nav {\n  margin: 0 20px;\n}\n.el-tabs .el-tabs__item {\n  height: 36px;\n  line-height: 36px;\n}\n\n/*# sourceMappingURL=App.vue.map */',
      map: {
        'version': 3,
        'sources': ['E:\\myProject\\all-search\\src\\App.vue', 'App.vue'],
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
  ]

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
    })

    checkBody().then(() => {
      const mountEL = document.body.parentElement.insertBefore(el, document.body)
      // document.body.insertBefore(el, document.body.childNodes[0])
      app.$mount(mountEL)
      if (
        currentSite &&
        currentSite.styleString
      ) {
        addStyle$1(currentSite.styleString)
      }
    });
  }

}(Vue));
