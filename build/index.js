// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单
// @version      0.1.4f
// @description  在各个引擎之间跳转的顶部固定菜单，借鉴自searchEngineJump
// @author       endday
// @license      GPL-2.0
// @update       2020/4/2
// @include      *
// @homepageURL  https://github.com/endday/all-search

// @require      https://cdn.jsdelivr.net/npm/vue
// @run-at       document-body

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle

// ==/UserScript==
/* eslint-disable */

!function(n) {
    "use strict";
    n = n && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
    var e = [ {
        nameZh: "默认",
        name: "common",
        list: [ {
            name: "百度",
            url: "https://www.baidu.com/s?wd=%s&ie=utf-8"
        }, {
            name: "谷歌",
            url: "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8"
        }, {
            name: "必应",
            url: "https://cn.bing.com/search?q=%s"
        }, {
            name: "百度翻译",
            url: "http://fanyi.baidu.com/#auto/zh/%s"
        }, {
            name: "知乎",
            url: "http://www.zhihu.com/search?q=%s"
        }, {
            name: "stackoverflow",
            url: "https://stackoverflow.com/search?q=%s"
        }, {
            name: "掘金",
            url: "https://juejin.im/search?query=%s&type=all",
            disabled: !0
        }, {
            name: "GitHub",
            url: "https://github.com/search?utf8=✓&q=%s"
        } ]
    }, {
        nameZh: "搜索",
        name: "search",
        list: [ {
            name: "百度",
            url: "https://www.baidu.com/s?wd=%s&ie=utf-8"
        }, {
            name: "谷歌",
            url: "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8"
        }, {
            name: "必应",
            url: "https://cn.bing.com/search?q=%s"
        }, {
            name: "DDG",
            url: "https://duckduckgo.com/?q=%s"
        }, {
            name: "360",
            url: "https://www.so.com/s?ie=utf-8&q=%s"
        }, {
            name: "雅虎",
            url: "https://search.yahoo.com/search;?p=%s"
        }, {
            name: "搜狗",
            url: "https://www.sogou.com/web?query=%s"
        }, {
            name: "Startpage",
            url: "https://www.startpage.com/do/asearch$post$query"
        }, {
            name: "秘迹搜索",
            url: "https://mijisou.com/?q=%s&category_general=on&time_range=&language=zh-CN"
        }, {
            name: "Yandex",
            url: "https://yandex.com/search/?text=%s"
        } ]
    }, {
        nameZh: "翻译",
        name: "translate",
        list: [ {
            name: "谷歌翻译",
            url: "https://translate.google.com/?q=%s"
        }, {
            name: "百度翻译",
            url: "http://fanyi.baidu.com/#auto/zh/%s"
        }, {
            name: "有道词典",
            url: "http://dict.youdao.com/search?q=%s"
        }, {
            name: "必应翻译",
            url: "http://cn.bing.com/dict/search?q=%s"
        }, {
            name: "Forvo翻译",
            url: "https://zh.forvo.com/search/%s",
            blank: !0
        }, {
            name: "CNKI翻译",
            url: "http://dict.cnki.net/dict_result.aspx?searchword=%s",
            disable: !0
        }, {
            name: "汉典",
            url: "http://www.zdic.net/sousuo/?q=%s",
            disable: !0
        }, {
            name: "海词",
            url: "http://dict.cn/%s"
        } ]
    }, {
        nameZh: "视频",
        name: "video",
        list: [ {
            name: "youtube",
            url: "https://www.youtube.com/results?search_query=%s"
        }, {
            name: "bilibili",
            url: "http://search.bilibili.com/all?keyword=%s"
        }, {
            name: "优酷",
            url: "http://www.soku.com/search_video/q_%s"
        }, {
            name: "腾讯视频",
            url: "https://v.qq.com/x/search/?q=%s"
        }, {
            name: "AcFun",
            url: "http://www.acfun.cn/search/?#query=%s"
        }, {
            name: "乐视",
            url: "http://so.letv.com/s?wd=%s"
        }, {
            name: "搜狐",
            url: "http://so.tv.sohu.com/mts?wd=%s"
        }, {
            name: "niconico",
            url: "http://www.nicovideo.jp/search/%s"
        }, {
            name: "爱奇艺",
            url: "http://so.iqiyi.com/so/q_%s"
        } ]
    }, {
        nameZh: "音乐",
        name: "music",
        list: [ {
            name: "网易音乐",
            url: "http://music.163.com/#/search/m/?s=%s"
        }, {
            name: "一听",
            url: "http://so.1ting.com/all.do?q=%s"
        }, {
            name: "虾米音乐",
            url: "http://www.xiami.com/search?key=%s"
        }, {
            name: "音悦Tai",
            url: "http://so.yinyuetai.com/?keyword=%s"
        }, {
            name: "QQ音乐",
            url: "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s"
        }, {
            name: "百度音乐",
            url: "http://music.baidu.com/search?ie=utf-8&oe=utf-8&key=%s"
        }, {
            name: "酷我音乐",
            url: "http://sou.kuwo.cn/ws/NSearch?type=all&key=%s"
        }, {
            name: "酷狗",
            url: "http://search.5sing.kugou.com/?keyword=%s"
        } ]
    }, {
        nameZh: "开发者",
        name: "developer",
        list: [ {
            name: "MDN",
            url: "https://developer.mozilla.org/zh-CN/search?q=%s"
        }, {
            name: "stackoverflow",
            url: "https://stackoverflow.com/search?q=%s"
        }, {
            name: "掘金",
            url: "https://juejin.im/search?query=%s&type=all"
        }, {
            name: "Can I Use",
            url: "http://caniuse.com/#search=%s",
            blank: !0
        }, {
            name: "GitHub",
            url: "https://github.com/search?utf8=✓&q=%s"
        }, {
            name: "w3c",
            url: "http://www.runoob.com/?s=%s"
        }, {
            name: "GreasyFork",
            url: "https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓"
        } ]
    }, {
        nameZh: "新闻",
        name: "news",
        list: [ {
            name: "谷歌中文",
            url: "https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"
        }, {
            name: "百度新闻",
            url: "http://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1"
        }, {
            name: "网易-百度",
            url: "https://www.baidu.com/s?wd=%s%20site%3Anews.163.com"
        }, {
            name: "网易-谷歌",
            url: "https://www.google.com.hk/search?q=site:news.163.com+%s"
        }, {
            name: "腾讯新闻",
            url: "https://www.sogou.com/sogou?site=news.qq.com&query=%s"
        }, {
            name: "凤凰新闻",
            url: "http://search.ifeng.com/sofeng/search.action?q=%s"
        }, {
            name: "CNN",
            url: "https://edition.cnn.com/search/?q=%s"
        }, {
            name: "BBC",
            url: "https://www.bbc.co.uk/search?q=%s"
        }, {
            name: "Economis",
            url: "https://www.google.com/search?q=site:www.economist.com%20%s"
        }, {
            name: "今日头条",
            url: "https://www.toutiao.com/search/?keyword=%E4%B8%96%E7%95%8C%E6%9D%AF"
        } ]
    }, {
        nameZh: "社交",
        name: "social",
        list: [ {
            name: "知乎",
            url: "http://www.zhihu.com/search?q=%s"
        }, {
            name: "推特",
            url: "https://twitter.com/search/%s"
        }, {
            name: "豆瓣",
            url: "http://www.douban.com/search?source=suggest&q=%s"
        }, {
            name: "百度贴吧",
            url: "http://tieba.baidu.com/f?kw=%s&ie=utf-8"
        }, {
            name: "新浪微博",
            url: "http://s.weibo.com/weibo/%s"
        }, {
            name: "脸书",
            url: "https://www.facebook.com/search/results.php?q=%s"
        }, {
            name: "微信搜索",
            url: "http://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s"
        } ]
    }, {
        nameZh: "百科",
        name: "knowledge",
        list: [ {
            name: "维基",
            url: "http://zh.wikipedia.org/wiki/%s"
        }, {
            name: "百度百科",
            url: "http://baike.baidu.com/search/word?pic=1&sug=1&word=%s"
        }, {
            name: "百度文库",
            url: "http://wenku.baidu.com/search?word=%s&ie=utf-8"
        }, {
            name: "豆丁文档",
            url: "http://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s"
        }, {
            name: "爱问知识",
            url: "http://iask.sina.com.cn/search?searchWord=%s"
        }, {
            name: "萌娘百科",
            url: "https://zh.moegirl.org/%s"
        }, {
            name: "果壳",
            url: "http://www.guokr.com/search/all/?wd=%s"
        }, {
            name: "Quora",
            url: "https://www.quora.com/search?q=%s"
        } ]
    }, {
        nameZh: "图片",
        name: "image",
        list: [ {
            name: "谷歌图片",
            url: "https://www.google.com/search?q=%s&tbm=isch"
        }, {
            name: "百度图片",
            url: "http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=%s"
        }, {
            name: "必应图片",
            url: "https://www.bing.com/images/search?q=%s"
        }, {
            name: "pixiv",
            url: "http://www.pixiv.net/search.php?word=%s"
        }, {
            name: "flickr",
            url: "http://www.flickr.com/search/?q=%s"
        }, {
            name: "花瓣",
            url: "http://huaban.com/search/?q=%s"
        }, {
            name: "easyicon",
            url: "http://www.easyicon.net/iconsearch/%s/",
            blank: !0
        }, {
            name: "Pinterest",
            url: "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta"
        } ]
    } ];
    document.createElement("a");
    function t(n) {
        return n ? `__allSearch__${n}` : null;
    }
    function r(n, e, t, r, o, s, i, a, l, c) {
        "boolean" != typeof i && (l = a, a = i, i = !1);
        const A = "function" == typeof t ? t.options : t;
        let p;
        if (n && n.render && (A.render = n.render, A.staticRenderFns = n.staticRenderFns, 
        A._compiled = !0, o && (A.functional = !0)), r && (A._scopeId = r), s ? (p = function(n) {
            (n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (n = __VUE_SSR_CONTEXT__), 
            e && e.call(this, l(n)), n && n._registeredComponents && n._registeredComponents.add(s);
        }, A._ssrRegister = p) : e && (p = i ? function(n) {
            e.call(this, c(n, this.$root.$options.shadowRoot));
        } : function(n) {
            e.call(this, a(n));
        }), p) if (A.functional) {
            const n = A.render;
            A.render = function(e, t) {
                return p.call(t), n(e, t);
            };
        } else {
            const n = A.beforeCreate;
            A.beforeCreate = n ? [].concat(n, p) : [ p ];
        }
        return t;
    }
    const o = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function s(n) {
        return (n, e) => function(n, e) {
            const t = o ? e.media || "default" : n, r = a[t] || (a[t] = {
                ids: new Set,
                styles: []
            });
            if (!r.ids.has(n)) {
                r.ids.add(n);
                let t = e.source;
                if (e.map && (t += "\n/*# sourceURL=" + e.map.sources[0] + " */", t += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e.map)))) + " */"), 
                r.element || (r.element = document.createElement("style"), r.element.type = "text/css", 
                e.media && r.element.setAttribute("media", e.media), void 0 === i && (i = document.head || document.getElementsByTagName("head")[0]), 
                i.appendChild(r.element)), "styleSheet" in r.element) r.styles.push(t), r.element.styleSheet.cssText = r.styles.filter(Boolean).join("\n"); else {
                    const n = r.ids.size - 1, e = document.createTextNode(t), o = r.element.childNodes;
                    o[n] && r.element.removeChild(o[n]), o.length ? r.element.insertBefore(e, o[n]) : r.element.appendChild(e);
                }
            }
        }(n, e);
    }
    let i;
    const a = {};
    const l = {
        name: "logo"
    };
    var c = function() {
        var n = this.$createElement;
        this._self._c;
        return this._m(0);
    };
    c._withStripped = !0;
    const A = r({
        render: c,
        staticRenderFns: [ function() {
            var n = this.$createElement, e = this._self._c || n;
            return e("a", {
                staticClass: "as-title",
                attrs: {
                    href: "https://github.com/endday/all-search",
                    target: "_blank"
                }
            }, [ e("p", {
                staticClass: "as-title-inner"
            }, [ this._v("\n    All Search\n  ") ]) ]);
        } ]
    }, (function(n) {
        n && n("data-v-5c453d41_0", {
            source: ".as-title {\n  text-decoration: none;\n}\n.as-title .as-title-inner {\n  font-size: 18px;\n  width: 120px;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=logo.vue.map */",
            map: {
                version: 3,
                sources: [ "E:\\project\\all-search\\src\\components\\logo.vue", "logo.vue" ],
                names: [],
                mappings: "AAoBA;EACA,qBAAA;ACnBA;ADqBA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,SAAA;EACA,kBAAA;EACA,eAAA;ACnBA;;AAEA,mCAAmC",
                file: "logo.vue",
                sourcesContent: [ '<template>\r\n  <a class="as-title"\r\n     href="https://github.com/endday/all-search"\r\n     target="_blank"\r\n  >\r\n    <p class="as-title-inner">\r\n      All Search\r\n    </p>\r\n  </a>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \'logo\'\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .as-title {\r\n    text-decoration: none;\r\n\r\n    .as-title-inner {\r\n      font-size: 18px;\r\n      width: 120px;\r\n      height: $height;\r\n      line-height: $height;\r\n      font-weight: 600;\r\n      color: #1990fc;\r\n      margin: 0;\r\n      text-align: center;\r\n      cursor: pointer;\r\n    }\r\n  }\r\n</style>\r\n', ".as-title {\n  text-decoration: none;\n}\n.as-title .as-title-inner {\n  font-size: 18px;\n  width: 120px;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=logo.vue.map */" ]
            },
            media: void 0
        });
    }), l, void 0, !1, void 0, !1, s, void 0, void 0);
    const p = {
        name: "category",
        props: {
            value: {
                type: String,
                default: ""
            }
        },
        data: () => ({
            engines: e,
            show: !1
        }),
        computed: {
            nameZh() {
                const n = this.engines.findIndex(n => n.name === this.value);
                return n > -1 ? this.engines[n].nameZh : this.engines[0].nameZh;
            }
        },
        methods: {
            handleChange(n) {
                this.$emit("change", n);
            },
            openValue() {
                this.show = !this.show;
            },
            selectCategory(n, e) {
                this.handleChange(e.name), this.show = !1;
            }
        }
    };
    var d = function() {
        var n = this, e = n.$createElement, t = n._self._c || e;
        return t("div", {
            staticClass: "as-select"
        }, [ t("div", {
            staticClass: "as-select-content",
            on: {
                click: n.openValue
            }
        }, [ t("span", {
            domProps: {
                textContent: n._s(n.nameZh)
            }
        }) ]), n._v(" "), t("ul", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: n.show,
                expression: "show"
            } ],
            staticClass: "as-select-list",
            class: {
                fadeInDown: n.show
            }
        }, n._l(n.engines, (function(e, r) {
            return t("li", {
                key: e.index,
                domProps: {
                    textContent: n._s(e.nameZh)
                },
                on: {
                    click: function(t) {
                        return n.selectCategory(r, e);
                    }
                }
            });
        })), 0), n._v(" "), t("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: n.show,
                expression: "show"
            } ],
            staticClass: "as-select-mask",
            on: {
                click: function(e) {
                    n.show = !1;
                }
            }
        }) ]);
    };
    d._withStripped = !0;
    const h = r({
        render: d,
        staticRenderFns: []
    }, (function(n) {
        n && n("data-v-4c707c2f_0", {
            source: '@charset "UTF-8";\n.as-select {\n  position: relative;\n}\n.as-select ul li {\n  list-style: none;\n}\n.as-select-content {\n  width: 100px;\n  height: 30px;\n  line-height: 30px;\n  font-size: 14px;\n  cursor: pointer;\n  padding-left: 10px;\n  position: relative;\n}\n.as-select-content::after {\n  content: " ▾";\n  position: absolute;\n  right: 12px;\n  font-size: 24px;\n  color: #999;\n}\n.as-select-list {\n  padding: 4px 0;\n  min-width: 100px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n  z-index: 99;\n}\n.as-select-list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.as-select-list li:hover {\n  background-color: #f5f7fa;\n}\n.as-select-mask {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n}\n\n/*# sourceMappingURL=category.vue.map */',
            map: {
                version: 3,
                sources: [ "category.vue", "E:\\project\\all-search\\src\\components\\category.vue" ],
                names: [],
                mappings: "AAAA,gBAAgB;ACoEhB;EACA,kBAAA;ADlEA;ACmEA;EACA,gBAAA;ADjEA;ACqEA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,eAAA;EACA,kBAAA;EACA,kBAAA;ADlEA;ACmEA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;EACA,eAAA;EACA,WAAA;ADjEA;ACqEA;EACA,cAAA;EACA,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,sBAAA;EACA,2CAAA;EACA,sBAAA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;ADlEA;ACmEA;EACA,eAAA;EACA,eAAA;EACA,kBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,cAAA;EACA,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;ADjEA;ACkEA;EACA,yBAAA;ADhEA;ACqEA;EACA,eAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;EACA,OAAA;ADlEA;;AAEA,uCAAuC",
                file: "category.vue",
                sourcesContent: [ '@charset "UTF-8";\n.as-select {\n  position: relative;\n}\n.as-select ul li {\n  list-style: none;\n}\n\n.as-select-content {\n  width: 100px;\n  height: 30px;\n  line-height: 30px;\n  font-size: 14px;\n  cursor: pointer;\n  padding-left: 10px;\n  position: relative;\n}\n.as-select-content::after {\n  content: " ▾";\n  position: absolute;\n  right: 12px;\n  font-size: 24px;\n  color: #999;\n}\n\n.as-select-list {\n  padding: 4px 0;\n  min-width: 100px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n  z-index: 99;\n}\n.as-select-list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.as-select-list li:hover {\n  background-color: #f5f7fa;\n}\n\n.as-select-mask {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n}\n\n/*# sourceMappingURL=category.vue.map */', '<template>\r\n  <div class="as-select">\r\n    <div class="as-select-content"\r\n         @click="openValue">\r\n      <span v-text="nameZh"></span>\r\n    </div>\r\n    <ul class="as-select-list"\r\n        :class="{ fadeInDown: show }"\r\n        v-show="show">\r\n      <li\r\n        v-for="(item,index) in engines"\r\n        :key="item.index"\r\n        v-text="item.nameZh"\r\n        @click="selectCategory(index,item)">\r\n      </li>\r\n    </ul>\r\n    <div class="as-select-mask"\r\n         @click="show = false"\r\n         v-show="show">\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport engines from \'../config/engines\'\r\n\r\nexport default {\r\n  name: \'category\',\r\n  props: {\r\n    value: {\r\n      type: String,\r\n      default: \'\'\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      engines,\r\n      show: false\r\n    }\r\n  },\r\n  computed: {\r\n    nameZh () {\r\n      const i = this.engines.findIndex(item => item.name === this.value)\r\n      if (i > -1) {\r\n        return this.engines[i].nameZh\r\n      } else {\r\n        return this.engines[0].nameZh\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    handleChange (val) {\r\n      this.$emit(\'change\', val)\r\n    },\r\n    openValue () {\r\n      this.show = !this.show\r\n    },\r\n    selectCategory (index, item) {\r\n      this.handleChange(item.name)\r\n      this.show = false\r\n    }\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .as-select {\r\n    position: relative;\r\n    ul li {\r\n      list-style: none;\r\n    }\r\n  }\r\n\r\n  .as-select-content {\r\n    width: 100px;\r\n    height: $height;\r\n    line-height: $height;\r\n    font-size: 14px;\r\n    cursor: pointer;\r\n    padding-left: 10px;\r\n    position: relative;\r\n    &::after {\r\n      content: \' ▾\';\r\n      position: absolute;\r\n      right: 12px;\r\n      font-size: 24px;\r\n      color: #999;\r\n    }\r\n  }\r\n\r\n  .as-select-list {\r\n    padding: 4px 0;\r\n    min-width: 100px;\r\n    border: 1px solid #e4e7ed;\r\n    border-radius: 4px;\r\n    background-color: #fff;\r\n    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);\r\n    box-sizing: border-box;\r\n    margin: 5px 0;\r\n    position: absolute;\r\n    z-index: 99;\r\n    li {\r\n      font-size: 14px;\r\n      padding: 0 20px;\r\n      position: relative;\r\n      white-space: nowrap;\r\n      overflow: hidden;\r\n      text-overflow: ellipsis;\r\n      color: #606266;\r\n      height: 34px;\r\n      line-height: 34px;\r\n      box-sizing: border-box;\r\n      cursor: pointer;\r\n      &:hover {\r\n        background-color: #f5f7fa;\r\n      }\r\n    }\r\n  }\r\n\r\n  .as-select-mask {\r\n    position: fixed;\r\n    top: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    left: 0;\r\n  }\r\n</style>\r\n' ]
            },
            media: void 0
        });
    }), p, void 0, !1, void 0, !1, s, void 0, void 0);
    const u = {
        name: "site-menu",
        props: {
            menus: {
                type: Array,
                default: () => []
            }
        },
        data: () => ({}),
        methods: {
            getKeyword() {
                return this.$root.currentSite.keyword ? this.$root.currentSite.keyword() : function() {
                    const n = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                    return n ? "INPUT" === n.nodeName || "textarea" === n.localName ? n.value : n.textContent : "";
                }();
            },
            handleClick(n) {
                this.$emit("click", n);
                const e = this.getKeyword();
                window.location.href = n.url.replace("%s", e);
            },
            handleMouseWheelClick(n, e) {
                if (1 === n.button) {
                    const n = this.getKeyword();
                    window.open(e.url.replace("%s", n));
                }
            }
        }
    };
    var m = function() {
        var n = this, e = n.$createElement, t = n._self._c || e;
        return t("div", {
            staticClass: "as-menu-container"
        }, [ t("ul", {
            staticClass: "as-menu"
        }, n._l(n.menus, (function(e, r) {
            return t("li", {
                key: r,
                staticClass: "as-submenu",
                on: {
                    click: function(t) {
                        return n.handleClick(e);
                    },
                    mousedown: function(t) {
                        return n.handleMouseWheelClick(t, e);
                    }
                }
            }, [ t("p", {
                staticClass: "as-submenu-title",
                domProps: {
                    textContent: n._s(e.name)
                }
            }) ]);
        })), 0) ]);
    };
    m._withStripped = !0;
    const g = r({
        render: m,
        staticRenderFns: []
    }, (function(n) {
        n && n("data-v-9eb6f43a_0", {
            source: ".as-menu-container {\n  display: flex;\n  flex: 1;\n}\n.as-menu {\n  display: flex;\n  line-height: 30px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n.as-submenu {\n  display: flex;\n  align-items: center;\n  position: relative;\n  top: 1px;\n}\n.as-submenu-title {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n.as-submenu-title:hover {\n  color: #1890ff;\n}\n\n/*# sourceMappingURL=menu.vue.map */",
            map: {
                version: 3,
                sources: [ "E:\\project\\all-search\\src\\components\\menu.vue", "menu.vue" ],
                names: [],
                mappings: "AA2DA;EACA,aAAA;EACA,OAAA;AC1DA;AD6DA;EACA,aAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;EACA,SAAA;EACA,gBAAA;EACA,sBAAA;AC1DA;AD6DA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,QAAA;AC1DA;AD6DA;EACA,kBAAA;EACA,cAAA;EACA,SAAA;EACA,eAAA;EACA,mBAAA;EACA,eAAA;EACA,eAAA;AC1DA;AD4DA;EACA,cAAA;AC1DA;;AAEA,mCAAmC",
                file: "menu.vue",
                sourcesContent: [ '<template>\r\n  <div class="as-menu-container">\r\n    <ul class="as-menu">\r\n      <li class="as-submenu"\r\n          v-for="(item, i) in menus"\r\n          :key="i"\r\n          @click="handleClick(item)"\r\n          @mousedown="handleMouseWheelClick($event, item)">\r\n        <p class="as-submenu-title"\r\n           v-text="item.name">\r\n        </p>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { getKeyword } from \'../util\'\r\n\r\nexport default {\r\n  name: \'site-menu\',\r\n  props: {\r\n    menus: {\r\n      type: Array,\r\n      default () {\r\n        return []\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {}\r\n  },\r\n  methods: {\r\n    getKeyword () {\r\n      if (this.$root.currentSite.keyword) {\r\n        return this.$root.currentSite.keyword()\r\n      } else {\r\n        return getKeyword()\r\n      }\r\n    },\r\n    handleClick (item) {\r\n      this.$emit(\'click\', item)\r\n      const keyword = this.getKeyword()\r\n      window.location.href = item.url.replace(\'%s\', keyword)\r\n    },\r\n    handleMouseWheelClick (event, item) {\r\n      const btnNum = event.button\r\n      if (btnNum === 1) {\r\n        const keyword = this.getKeyword()\r\n        window.open(item.url.replace(\'%s\', keyword))\r\n      }\r\n    }\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .as-menu-container {\r\n    display: flex;\r\n    flex: 1;\r\n  }\r\n\r\n  .as-menu {\r\n    display: flex;\r\n    line-height: $height;\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 0;\r\n    margin-top: -1px;\r\n    margin-bottom: 0;\r\n    white-space: nowrap;\r\n    border: 0;\r\n    box-shadow: none;\r\n    background-color: #fff;\r\n  }\r\n\r\n  .as-submenu {\r\n    display: flex;\r\n    align-items: center;\r\n    position: relative;\r\n    top: 1px;\r\n  }\r\n\r\n  .as-submenu-title {\r\n    position: relative;\r\n    display: block;\r\n    margin: 0;\r\n    padding: 0 20px;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n    font-size: 14px;\r\n\r\n    &:hover {\r\n      color: $color;\r\n    }\r\n  }\r\n</style>\r\n', ".as-menu-container {\n  display: flex;\n  flex: 1;\n}\n\n.as-menu {\n  display: flex;\n  line-height: 30px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n\n.as-submenu {\n  display: flex;\n  align-items: center;\n  position: relative;\n  top: 1px;\n}\n\n.as-submenu-title {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n.as-submenu-title:hover {\n  color: #1890ff;\n}\n\n/*# sourceMappingURL=menu.vue.map */" ]
            },
            media: void 0
        });
    }), u, void 0, !1, void 0, !1, s, void 0, void 0);
    const w = {
        name: "x-dialog",
        props: {
            visible: {
                type: Boolean,
                default: !1
            },
            title: {
                type: String,
                default: ""
            },
            width: {
                type: String,
                default: ""
            }
        },
        computed: {
            style() {
                const n = {};
                return this.width && (n.width = this.width), n;
            }
        },
        methods: {
            handleClose() {
                this.$emit("update:visible", !1);
            }
        }
    };
    var x = function() {
        var n = this, e = n.$createElement, t = n._self._c || e;
        return t("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: n.visible,
                expression: "visible"
            } ],
            staticClass: "as-dialog"
        }, [ t("div", {
            staticClass: "as-dialog-container",
            style: n.style
        }, [ t("div", {
            staticClass: "as-dialog__header"
        }, [ t("p", {
            domProps: {
                textContent: n._s(n.title)
            }
        }), n._v(" "), t("span", {
            staticClass: "as-dialog__close",
            on: {
                click: n.handleClose
            }
        }) ]), n._v(" "), t("div", {
            staticClass: "as-dialog__body"
        }, [ n._t("default") ], 2), n._v(" "), t("div", {
            staticClass: "as-dialog__footer"
        }) ]), n._v(" "), t("div", {
            staticClass: "as-dialog__mask",
            on: {
                click: n.handleClose
            }
        }) ]);
    };
    x._withStripped = !0;
    const b = r({
        render: x,
        staticRenderFns: []
    }, (function(n) {
        n && n("data-v-296f4814_0", {
            source: '@charset "UTF-8";\n.as-dialog {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n  margin: 0;\n}\n.as-dialog__mask {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  background: #000;\n}\n.as-dialog-container {\n  position: relative;\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  box-sizing: border-box;\n  min-width: 50%;\n  z-index: 99;\n  margin: 40vh auto 50px;\n  transform: translateY(-40%);\n}\n.as-dialog__header {\n  padding: 20px 20px 10px;\n  position: relative;\n}\n.as-dialog__header p {\n  margin: 0;\n  line-height: 24px;\n  height: 24px;\n}\n.as-dialog__body {\n  padding: 30px 20px;\n  color: #606266;\n  font-size: 14px;\n  word-break: break-all;\n}\n.as-dialog__footer {\n  padding: 10px 20px 20px;\n  text-align: right;\n  box-sizing: border-box;\n}\n.as-dialog__close {\n  display: inline-block;\n  position: absolute;\n  top: 16px;\n  right: 24px;\n  padding: 0;\n  background: transparent;\n  cursor: pointer;\n  font-size: 16px;\n  color: #909399;\n}\n.as-dialog__close:before {\n  content: "✖";\n}\n\n/*# sourceMappingURL=dialog.vue.map */',
            map: {
                version: 3,
                sources: [ "dialog.vue", "E:\\project\\all-search\\src\\components\\dialog.vue" ],
                names: [],
                mappings: "AAAA,gBAAgB;ACwDhB;EACA,eAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,cAAA;EACA,SAAA;ADtDA;ACyDA;EACA,eAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,gBAAA;ADtDA;ACyDA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;EACA,wCAAA;EACA,sBAAA;EACA,cAAA;EACA,WAAA;EACA,sBAAA;EACA,2BAAA;ADtDA;ACyDA;EACA,uBAAA;EACA,kBAAA;ADtDA;ACuDA;EACA,SAAA;EACA,iBAAA;EACA,YAAA;ADrDA;ACyDA;EACA,kBAAA;EACA,cAAA;EACA,eAAA;EACA,qBAAA;ADtDA;ACyDA;EACA,uBAAA;EACA,iBAAA;EACA,sBAAA;ADtDA;ACyDA;EACA,qBAAA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,UAAA;EACA,uBAAA;EACA,eAAA;EACA,eAAA;EACA,cAAA;ADtDA;ACuDA;EACA,YAAA;ADrDA;;AAEA,qCAAqC",
                file: "dialog.vue",
                sourcesContent: [ '@charset "UTF-8";\n.as-dialog {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n  margin: 0;\n}\n\n.as-dialog__mask {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  background: #000;\n}\n\n.as-dialog-container {\n  position: relative;\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  box-sizing: border-box;\n  min-width: 50%;\n  z-index: 99;\n  margin: 40vh auto 50px;\n  transform: translateY(-40%);\n}\n\n.as-dialog__header {\n  padding: 20px 20px 10px;\n  position: relative;\n}\n.as-dialog__header p {\n  margin: 0;\n  line-height: 24px;\n  height: 24px;\n}\n\n.as-dialog__body {\n  padding: 30px 20px;\n  color: #606266;\n  font-size: 14px;\n  word-break: break-all;\n}\n\n.as-dialog__footer {\n  padding: 10px 20px 20px;\n  text-align: right;\n  box-sizing: border-box;\n}\n\n.as-dialog__close {\n  display: inline-block;\n  position: absolute;\n  top: 16px;\n  right: 24px;\n  padding: 0;\n  background: transparent;\n  cursor: pointer;\n  font-size: 16px;\n  color: #909399;\n}\n.as-dialog__close:before {\n  content: "✖";\n}\n\n/*# sourceMappingURL=dialog.vue.map */', '<template>\r\n  <div class="as-dialog"\r\n       v-show="visible">\r\n    <div class="as-dialog-container"\r\n         :style="style">\r\n      <div class="as-dialog__header">\r\n        <p v-text="title"></p>\r\n        <span class="as-dialog__close"\r\n              @click="handleClose">\r\n        </span>\r\n      </div>\r\n      <div class="as-dialog__body">\r\n        <slot></slot>\r\n      </div>\r\n      <div class="as-dialog__footer"></div>\r\n    </div>\r\n    <div class="as-dialog__mask"\r\n         @click="handleClose"></div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \'x-dialog\',\r\n  props: {\r\n    visible: {\r\n      type: Boolean,\r\n      default: false\r\n    },\r\n    title: {\r\n      type: String,\r\n      default: \'\'\r\n    },\r\n    width: {\r\n      type: String,\r\n      default: \'\'\r\n    }\r\n  },\r\n  computed: {\r\n    style () {\r\n      const obj = {}\r\n      if (this.width) {\r\n        obj.width = this.width\r\n      }\r\n      return obj\r\n    }\r\n  },\r\n  methods: {\r\n    handleClose () {\r\n      this.$emit(\'update:visible\', false)\r\n    }\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  .as-dialog {\r\n    position: fixed;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    overflow: auto;\r\n    margin: 0;\r\n  }\r\n\r\n  .as-dialog__mask {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    opacity: .5;\r\n    background: #000;\r\n  }\r\n\r\n  .as-dialog-container {\r\n    position: relative;\r\n    background: #fff;\r\n    border-radius: 2px;\r\n    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);\r\n    box-sizing: border-box;\r\n    min-width: 50%;\r\n    z-index: 99;\r\n    margin: 40vh auto 50px;\r\n    transform: translateY(-40%);\r\n  }\r\n\r\n  .as-dialog__header {\r\n    padding: 20px 20px 10px;\r\n    position: relative;\r\n    p {\r\n      margin: 0;\r\n      line-height: 24px;\r\n      height: 24px;\r\n    }\r\n  }\r\n\r\n  .as-dialog__body {\r\n    padding: 30px 20px;\r\n    color: #606266;\r\n    font-size: 14px;\r\n    word-break: break-all;\r\n  }\r\n\r\n  .as-dialog__footer {\r\n    padding: 10px 20px 20px;\r\n    text-align: right;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  .as-dialog__close {\r\n    display: inline-block;\r\n    position: absolute;\r\n    top: 16px;\r\n    right: 24px;\r\n    padding: 0;\r\n    background: transparent;\r\n    cursor: pointer;\r\n    font-size: 16px;\r\n    color: #909399;\r\n    &:before {\r\n      content: "\\2716";\r\n    }\r\n  }\r\n</style>\r\n' ]
            },
            media: void 0
        });
    }), w, void 0, !1, void 0, !1, s, void 0, void 0);
    const f = {
        name: "checkbox",
        mounted() {
            console.log(this);
        }
    };
    var C = function() {
        var n = this.$createElement, e = this._self._c || n;
        return e("div", [ e("input", {
            staticClass: "styled-checkbox",
            attrs: {
                id: this._uid,
                type: "checkbox",
                value: "value1"
            }
        }), this._v(" "), e("label", {
            attrs: {
                for: this._uid
            }
        }, [ this._t("default") ], 2) ]);
    };
    C._withStripped = !0;
    const v = {
        name: "setting",
        components: {
            checkbox: r({
                render: C,
                staticRenderFns: []
            }, (function(n) {
                n && n("data-v-523508d8_0", {
                    source: '.styled-checkbox {\n  position: absolute;\n  opacity: 0;\n}\n.styled-checkbox + label {\n  position: relative;\n  cursor: pointer;\n  padding: 0;\n}\n.styled-checkbox + label:before {\n  content: "";\n  margin-right: 10px;\n  display: inline-block;\n  vertical-align: text-top;\n  width: 16px;\n  height: 16px;\n  background: white;\n  border: 1px #eee solid;\n  border-radius: 2px;\n}\n.styled-checkbox:hover + label:before {\n  border-color: #1890ff;\n}\n.styled-checkbox:checked + label:before {\n  background: #1890ff;\n  border-color: #1890ff;\n}\n.styled-checkbox:disabled + label {\n  color: #b8b8b8;\n  cursor: auto;\n}\n.styled-checkbox:disabled + label:before {\n  box-shadow: none;\n  background: #ddd;\n}\n.styled-checkbox:checked + label:after {\n  content: "";\n  position: absolute;\n  left: 4px;\n  top: 8px;\n  background: white;\n  width: 2px;\n  height: 2px;\n  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;\n  transform: rotate(45deg);\n}\n\n/*# sourceMappingURL=checkbox.vue.map */',
                    map: {
                        version: 3,
                        sources: [ "E:\\project\\all-search\\src\\components\\checkbox.vue", "checkbox.vue" ],
                        names: [],
                        mappings: "AAwBA;EACA,kBAAA;EACA,UAAA;ACvBA;ADyBA;EACA,kBAAA;EACA,eAAA;EACA,UAAA;ACvBA;AD2BA;EACA,WAAA;EACA,kBAAA;EACA,qBAAA;EACA,wBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,kBAAA;ACzBA;AD6BA;EACA,qBAAA;AC3BA;AD+BA;EACA,mBAAA;EACA,qBAAA;AC7BA;ADiCA;EACA,cAAA;EACA,YAAA;AC/BA;ADmCA;EACA,gBAAA;EACA,gBAAA;ACjCA;ADqCA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,iBAAA;EACA,UAAA;EACA,WAAA;EACA,gHAAA;EAMA,wBAAA;ACxCA;;AAEA,uCAAuC",
                        file: "checkbox.vue",
                        sourcesContent: [ '<template>\r\n  <div>\r\n    <input class="styled-checkbox"\r\n           :id="_uid"\r\n           type="checkbox"\r\n           value="value1">\r\n    <label :for="_uid">\r\n      <slot></slot>\r\n    </label>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \'checkbox\',\r\n  mounted () {\r\n    console.log(this)\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .styled-checkbox {\r\n    position: absolute; // take it out of document flow\r\n    opacity: 0; // hide it\r\n\r\n    & + label {\r\n      position: relative;\r\n      cursor: pointer;\r\n      padding: 0;\r\n    }\r\n\r\n    // Box.\r\n    & + label:before {\r\n      content: \'\';\r\n      margin-right: 10px;\r\n      display: inline-block;\r\n      vertical-align: text-top;\r\n      width: 16px;\r\n      height: 16px;\r\n      background: white;\r\n      border: 1px #eee solid;\r\n      border-radius: 2px;\r\n    }\r\n\r\n    // Box hover\r\n    &:hover + label:before {\r\n      border-color: $color;\r\n    }\r\n\r\n    // Box checked\r\n    &:checked + label:before {\r\n      background: $color;\r\n      border-color: $color;\r\n    }\r\n\r\n    // Disabled state label.\r\n    &:disabled + label {\r\n      color: #b8b8b8;\r\n      cursor: auto;\r\n    }\r\n\r\n    // Disabled box.\r\n    &:disabled + label:before {\r\n      box-shadow: none;\r\n      background: #ddd;\r\n    }\r\n\r\n    // Checkmark. Could be replaced with an image\r\n    &:checked + label:after {\r\n      content: \'\';\r\n      position: absolute;\r\n      left: 4px;\r\n      top: 8px;\r\n      background: white;\r\n      width: 2px;\r\n      height: 2px;\r\n      box-shadow: 2px 0 0 white,\r\n      4px 0 0 white,\r\n      4px -2px 0 white,\r\n      4px -4px 0 white,\r\n      4px -6px 0 white,\r\n      4px -8px 0 white;\r\n      transform: rotate(45deg);\r\n    }\r\n  }\r\n</style>\r\n', '.styled-checkbox {\n  position: absolute;\n  opacity: 0;\n}\n.styled-checkbox + label {\n  position: relative;\n  cursor: pointer;\n  padding: 0;\n}\n.styled-checkbox + label:before {\n  content: "";\n  margin-right: 10px;\n  display: inline-block;\n  vertical-align: text-top;\n  width: 16px;\n  height: 16px;\n  background: white;\n  border: 1px #eee solid;\n  border-radius: 2px;\n}\n.styled-checkbox:hover + label:before {\n  border-color: #1890ff;\n}\n.styled-checkbox:checked + label:before {\n  background: #1890ff;\n  border-color: #1890ff;\n}\n.styled-checkbox:disabled + label {\n  color: #b8b8b8;\n  cursor: auto;\n}\n.styled-checkbox:disabled + label:before {\n  box-shadow: none;\n  background: #ddd;\n}\n.styled-checkbox:checked + label:after {\n  content: "";\n  position: absolute;\n  left: 4px;\n  top: 8px;\n  background: white;\n  width: 2px;\n  height: 2px;\n  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;\n  transform: rotate(45deg);\n}\n\n/*# sourceMappingURL=checkbox.vue.map */' ]
                    },
                    media: void 0
                });
            }), f, void 0, !1, void 0, !1, s, void 0, void 0)
        },
        data: () => ({
            engines: e
        })
    };
    var y = function() {
        var n = this, e = n.$createElement, t = n._self._c || e;
        return t("div", {
            staticClass: "as-setting"
        }, n._l(n.engines, (function(e, r) {
            return t("div", {
                key: r,
                staticClass: "as-setting-category"
            }, [ t("p", {
                staticClass: "as-category-name",
                domProps: {
                    textContent: n._s(e.nameZh)
                }
            }), n._v(" "), n._l(e.list, (function(e, r) {
                return t("checkbox", {
                    key: r,
                    staticClass: "as-setting-menu"
                }, [ n._v("\n      " + n._s(e.name) + "\n    ") ]);
            })) ], 2);
        })), 0);
    };
    y._withStripped = !0;
    const E = {
        name: "all-search",
        components: {
            logo: A,
            category: h,
            siteMenu: g,
            xDialog: b,
            setting: r({
                render: y,
                staticRenderFns: []
            }, (function(n) {
                n && n("data-v-181e15eb_0", {
                    source: ".as-setting {\n  display: flex;\n  flex-wrap: wrap;\n}\n.as-setting-category {\n  flex: 20%;\n  margin-bottom: 20px;\n}\n.as-category-name {\n  font-size: 16px;\n  color: #666;\n  margin: 0 0 10px;\n}\n.as-setting-menu {\n  margin: 0 0 6px;\n}\n\n/*# sourceMappingURL=setting.vue.map */",
                    map: {
                        version: 3,
                        sources: [ "E:\\project\\all-search\\src\\components\\setting.vue", "setting.vue" ],
                        names: [],
                        mappings: "AAkCA;EACA,aAAA;EACA,eAAA;ACjCA;ADoCA;EACA,SAAA;EACA,mBAAA;ACjCA;ADoCA;EACA,eAAA;EACA,WAAA;EACA,gBAAA;ACjCA;ADoCA;EACA,eAAA;ACjCA;;AAEA,sCAAsC",
                        file: "setting.vue",
                        sourcesContent: [ '<template>\r\n  <div class="as-setting">\r\n    <div v-for="(category, i) in engines"\r\n         :key="i"\r\n         class="as-setting-category">\r\n      <p class="as-category-name" v-text="category.nameZh"></p>\r\n      <checkbox\r\n        class="as-setting-menu"\r\n        v-for="(menu, j) in category.list"\r\n        :key="j">\r\n        {{menu.name}}\r\n      </checkbox>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport engines from \'../config/engines/index.js\'\r\nimport checkbox from \'../components/checkbox.vue\'\r\n\r\nexport default {\r\n  name: \'setting\',\r\n  components: {\r\n    checkbox\r\n  },\r\n  data () {\r\n    return {\r\n      engines\r\n    }\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  .as-setting {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .as-setting-category {\r\n    flex: 20%;\r\n    margin-bottom: 20px;\r\n  }\r\n\r\n  .as-category-name {\r\n    font-size: 16px;\r\n    color: #666;\r\n    margin: 0 0 10px;\r\n  }\r\n\r\n  .as-setting-menu {\r\n    margin: 0 0 6px;\r\n  }\r\n</style>\r\n', ".as-setting {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.as-setting-category {\n  flex: 20%;\n  margin-bottom: 20px;\n}\n\n.as-category-name {\n  font-size: 16px;\n  color: #666;\n  margin: 0 0 10px;\n}\n\n.as-setting-menu {\n  margin: 0 0 6px;\n}\n\n/*# sourceMappingURL=setting.vue.map */" ]
                    },
                    media: void 0
                });
            }), v, void 0, !1, void 0, !1, s, void 0, void 0)
        },
        data: () => ({
            engines: e,
            categoryName: "search",
            visible: !1
        }),
        computed: {
            menus() {
                const n = this.engines.findIndex(n => n.name === this.categoryName);
                return n > -1 ? this.engines[n].list.filter(n => !n.disabled) : this.engines[0].list.filter(n => !n.disabled);
            }
        },
        created() {
            this.categoryName = function(n) {
                const e = t(n);
                if (window.GM_getValue) return window.GM_getValue(e);
                const r = window.localStorage.getItem(e);
                return r ? JSON.parse(r) : null;
            }("categoryName") || this.categoryName;
        },
        methods: {
            handleClick(n) {
                this.$emit("menu-click", n);
            },
            changeCategory(n) {
                !function(n, e) {
                    const r = t(n);
                    if (window.GM_setValue) window.GM_setValue(r, e); else {
                        const n = JSON.stringify(e);
                        n && window.localStorage.setItem(r, n);
                    }
                }("categoryName", n), this.categoryName = n;
            },
            openSetDialog() {
                this.visible = !0;
            }
        }
    };
    var k = function() {
        var n = this, e = n.$createElement, t = n._self._c || e;
        return t("header", {
            attrs: {
                id: "all-search"
            }
        }, [ t("logo"), n._v(" "), t("category", {
            attrs: {
                value: n.categoryName
            },
            on: {
                change: n.changeCategory
            }
        }), n._v(" "), t("site-menu", {
            attrs: {
                menus: n.menus
            }
        }), n._v(" "), t("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: !1,
                expression: "false"
            } ],
            staticClass: "setting",
            on: {
                click: n.openSetDialog
            }
        }, [ n._v("\n    设置\n  ") ]), n._v(" "), t("x-dialog", {
            attrs: {
                visible: n.visible,
                title: "设置",
                width: "1000px"
            },
            on: {
                "update:visible": function(e) {
                    n.visible = e;
                }
            }
        }, [ t("setting") ], 1) ], 1);
    };
    k._withStripped = !0;
    const _ = r({
        render: k,
        staticRenderFns: []
    }, (function(n) {
        n && n("data-v-944cd5a4_0", {
            source: 'body {\n  margin-top: 30px;\n}\n#all-search {\n  height: 30px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  z-index: 999999;\n  display: flex;\n  border-bottom: 1px #e8e8e8 solid;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n.setting {\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n/*# sourceMappingURL=App.vue.map */',
            map: {
                version: 3,
                sources: [ "E:\\project\\all-search\\src\\App.vue", "App.vue" ],
                names: [],
                mappings: "AA2EA;EACA,gBAAA;AC1EA;AD6EA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,MAAA;EACA,eAAA;EACA,aAAA;EACA,gCAAA;EACA,sBAAA;EACA,kMAAA;AC1EA;AD6EA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;EACA,eAAA;AC1EA;;AAEA,kCAAkC",
                file: "App.vue",
                sourcesContent: [ "<template>\r\n  <header id=\"all-search\">\r\n    <logo/>\r\n    <category :value=\"categoryName\"\r\n              @change=\"changeCategory\"/>\r\n    <site-menu :menus=\"menus\"/>\r\n    <div v-show=\"false\"\r\n         class=\"setting\"\r\n         @click=\"openSetDialog\">\r\n      设置\r\n    </div>\r\n    <x-dialog\r\n      :visible.sync=\"visible\"\r\n      title=\"设置\"\r\n      width=\"1000px\">\r\n      <setting/>\r\n    </x-dialog>\r\n  </header>\r\n</template>\r\n\r\n<script>\r\nimport engines from './config/engines/index.js'\r\nimport { getSession, setSession } from './util'\r\nimport logo from './components/logo.vue'\r\nimport category from './components/category.vue'\r\nimport siteMenu from './components/menu.vue'\r\nimport xDialog from './components/dialog.vue'\r\nimport setting from './components/setting.vue'\r\n\r\nexport default {\r\n  name: 'all-search',\r\n  components: {\r\n    logo,\r\n    category,\r\n    siteMenu,\r\n    xDialog,\r\n    setting\r\n  },\r\n  data () {\r\n    return {\r\n      engines,\r\n      categoryName: 'search',\r\n      visible: false\r\n    }\r\n  },\r\n  computed: {\r\n    menus () {\r\n      const i = this.engines.findIndex(item => item.name === this.categoryName)\r\n      if (i > -1) {\r\n        return this.engines[i].list.filter(item => !item.disabled)\r\n      }\r\n      return this.engines[0].list.filter(item => !item.disabled)\r\n    }\r\n  },\r\n  created () {\r\n    this.categoryName = getSession('categoryName') || this.categoryName\r\n  },\r\n  methods: {\r\n    handleClick (tab) {\r\n      this.$emit('menu-click', tab)\r\n    },\r\n    changeCategory (name) {\r\n      setSession('categoryName', name)\r\n      this.categoryName = name\r\n    },\r\n    openSetDialog () {\r\n      this.visible = true\r\n    }\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang=\"scss\">\r\n  @import \"./assets/common\";\r\n\r\n  body {\r\n    margin-top: $height;\r\n  }\r\n\r\n  #all-search {\r\n    height: $height;\r\n    width: 100%;\r\n    position: fixed;\r\n    top: 0;\r\n    z-index: 999999;\r\n    display: flex;\r\n    border-bottom: 1px #e8e8e8 solid;\r\n    background-color: #fff;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\r\n  }\r\n\r\n  .setting {\r\n    padding: 0 20px;\r\n    display: flex;\r\n    align-items: center;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n    font-size: 14px;\r\n  }\r\n</style>\r\n", 'body {\n  margin-top: 30px;\n}\n\n#all-search {\n  height: 30px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  z-index: 999999;\n  display: flex;\n  border-bottom: 1px #e8e8e8 solid;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n\n.setting {\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n/*# sourceMappingURL=App.vue.map */' ]
            },
            media: void 0
        });
    }), E, void 0, !1, void 0, !1, s, void 0, void 0);
    let B = {};
    const q = [ {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
        style: ".srp #searchform:not(.minidiv){top: 50px !important;} .srp .minidiv{top: 30px !important;}"
    }, {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/
    }, {
        url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/
    }, {
        url: /^https?:\/\/[^.]*\.bing\.com\/search/
    }, {
        url: /^https?:\/\/duckduckgo\.com\/*/i
    }, {
        url: /^https?:\/\/search\.yahoo\.com\/search/i
    }, {
        url: /^https?:\/\/tw\.search\.yahoo\.com\/search/i
    }, {
        url: /^https?:\/\/searx\.me\/\?q/i
    }, {
        url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
        style: ".header { top: 30px }"
    }, {
        url: /^https?:\/\/yandex\.com\/search/i,
        style: "body { margin: 30px!important; }"
    }, {
        url: /^https?:\/\/www\.startpage\.com\/do\/asearch/i
    }, {
        url: /^https?:\/\/mijisou.com\/\?q/i,
        style: ".search-page{top: 30px} .searx-navbar{top: 42px!important;}"
    }, {
        url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/i
    }, {
        url: /^https?:\/\/www\.dogedoge\.com\/results\?q/i
    }, {
        url: /^https?:\/\/baike\.baidu\.com\/item/
    }, {
        url: /^https?:\/\/baike\.baidu\.com\/search/
    }, {
        url: /^https?:\/\/wenku\.baidu\.com\/search/i
    }, {
        url: /^https?:\/\/zhidao\.baidu\.com\/search/i
    }, {
        url: /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/i
    }, {
        url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
        style: ".Sticky.is-fixed { transform: translateY(30px); }"
    }, {
        url: /^https?:\/\/www\.so\.com\/s/i
    }, {
        url: /^https?:\/\/so\.baike\.com\/doc/i
    }, {
        url: /^https?:\/\/www\.baike\.com\/wiki/i
    }, {
        url: /^https?:\/\/www\.docin\.com\/search\.do/
    }, {
        url: /^https?:\/\/zhihu\.sogou\.com\/zhihu/,
        style: ".header { top:30px }"
    }, {
        url: /^https?:\/\/weixin\.sogou\.com\/weixin\?/
    }, {
        url: /^https?:\/\/www\.quora\.com\/search\?/i
    }, {
        url: /^https?:\/\/stackoverflow\.com\/search\?/i,
        style: ".top-bar._fixed { top: 30px }"
    }, {
        url: /^https?:\/\/search\.bilibili\.com\/all/,
        keyword: () => document.getElementById("search-keyword").value,
        style: "body { margin-top: 30px!important; } .fixed-top { top: 30px }"
    }, {
        url: /^https?:\/\/www\.acfun\.cn\/search/
    }, {
        url: /^https?:\/\/www\.youtube\.com\/results/
    }, {
        url: /^https?:\/\/www\.nicovideo\.jp\/search\//
    }, {
        url: /^https?:\/\/so\.iqiyi\.com\/so\/q/
    }, {
        url: /^https?:\/\/v\.qq\.com\/x\/search/i
    }, {
        url: /^https?:\/\/music\.baidu\.com\/search/
    }, {
        url: /^https?:\/\/so\.1ting\.com\/all\.do/
    }, {
        url: /^https?:\/\/www\.xiami\.com\/search/
    }, {
        url: /^https?:\/\/s\.music\.qq\.com/i
    }, {
        url: /^https?:\/\/music\.163\.com\/.*?#\/search/i
    }, {
        url: /^https?:\/\/so\.yinyuetai\.com\/\?keyword/
    }, {
        url: /^https?:\/\/image\.baidu\.com\/search/i
    }, {
        url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/i
    }, {
        url: /^https?:\/\/.*\.bing\.com\/images\/search/i
    }, {
        url: /^https?:\/\/www\.flickr\.com\/search\//
    }, {
        url: /^http:\/\/www\.pixiv\.net\/search\.php/i
    }, {
        url: /^https?:\/\/huaban\.com\/search\/\?/
    }, {
        url: /^https?:\/\/www\.pinterest\.com\/search\//
    }, {
        url: /^https?:\/\/thepiratebay\.org\/search/i
    }, {
        url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/i
    }, {
        url: /^https?:\/\/www\.ed2000\.com\/filelist\.asp/i
    }, {
        url: /^https?:\/\/www\.zimuzu\.tv\/search\//
    }, {
        url: /^https?:\/\/so\.cqp\.cc\/search/i
    }, {
        url: /^https?:\/\/subhd\.com\/search/i
    }, {
        url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/i
    }, {
        url: /^https?:\/\/fanyi\.baidu\.com/i,
        keyword: () => document.getElementById("baidu_translate_input").value
    }, {
        url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q=/i
    }, {
        url: /^https?:\/\/dict\.youdao\.com\/search/i
    }, {
        url: /^https?:\/\/dict\.youdao\.com\/w/i
    }, {
        url: /^https?:\/\/dict\.cn\/./
    }, {
        url: /^https?:\/\/s\.taobao\.com\/search/
    }, {
        url: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/i
    }, {
        url: /^https?:\/\/list\.tmall\.com\/search_product\.htm/i
    }, {
        url: /^https?:\/\/search\.jd\.com\/Search/
    }, {
        url: /^https?:\/\/search\.suning\.com/i
    }, {
        url: /^https?:\/\/search\.yhd\.com\/c0-0\/k/i
    }, {
        url: /^https?:\/\/search\.smzdm\.com\/\?/i
    }, {
        url: /^https?:\/\/s\.weibo\.com\/weibo\//i
    }, {
        url: /^https?:\/\/tieba\.baidu\.com\/f\/search/i
    }, {
        url: /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/
    }, {
        url: /^https?:\/\/www\.douban\.com\/search/i
    }, {
        url: /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/
    }, {
        url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
    }, {
        url: /^http:\/\/search\.cnki\.net\/search\.aspx/i
    }, {
        url: /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/i
    }, {
        url: /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/i
    }, {
        url: /^http:\/\/.*?ebscohost\.com\/.*?results/i
    }, {
        url: /^http:\/\/link\.springer\.com\/search\?query=/i
    }, {
        url: /^https?:.*?jstor.org\/action\/doAdvancedSearch/i
    }, {
        url: /^https?:.*?runoob\.com\//i
    }, {
        url: /^https?:\/\/github\.com\/search/
    }, {
        url: /^https?:\/\/developer\.mozilla\.org\/.{2,5}\/search/
    }, {
        url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/
    }, {
        url: /^https?:\/\/www\.startpage\.com\/do\/search/
    }, {
        url: /^https?:\/\/endday\.github\.io/
    }, {
        url: /^https?:\/\/endday\.gitee\.io/
    } ].find(n => n.url.test(window.location.href));
    q && !q.disabled ? (B.url = q.url, B.disabled = q.disabled, B.style = q.style, B.keyword = q.keyword) : B = null;
    var D = B;
    n.config.productionTip = !1;
    const S = D;
    if (D) {
        const e = document.createElement("div");
        e.id = "all-search";
        const t = new n({
            data: () => ({
                currentSite: S
            }),
            render: n => n(_)
        });
        (function() {
            let n = 0;
            return new Promise((e, t) => {
                if (document.body) e(); else {
                    const r = setInterval((function() {
                        n += 1, document.body && (clearInterval(r), e()), 20 === n && (clearInterval(r), 
                        t(new Error("timeOut")));
                    }), 100);
                }
            });
        })().then(() => {
            const n = document.body.parentElement.insertBefore(e, document.body);
            var r;
            t.$mount(n), D && D.style && (r = D.style, window.GM_addStyle && window.GM_addStyle(r));
        });
    }
}(Vue);
