// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单
// @version      0.1.4h
// @description  在各个引擎之间跳转的顶部固定菜单，借鉴自searchEngineJump
// @author       endday
// @license      GPL-2.0
// @update       2020/4/8
// @include      *
// @homepageURL  https://github.com/endday/all-search

// @require      https://cdn.jsdelivr.net/npm/vue
// @run-at       document-body

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle

// ==/UserScript==
/* eslint-disable */

!function(e) {
    "use strict";
    e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    var n = [ {
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
        }, {
            name: "yandex",
            url: "https://yandex.com/images/search?text=%s"
        } ]
    } ];
    document.createElement("a");
    function t(e) {
        return e ? `__allSearch__${e}` : null;
    }
    function r(e, n, t, r, s, o, i, a, l, c) {
        "boolean" != typeof i && (l = a, a = i, i = !1);
        const h = "function" == typeof t ? t.options : t;
        let p;
        if (e && e.render && (h.render = e.render, h.staticRenderFns = e.staticRenderFns, 
        h._compiled = !0, s && (h.functional = !0)), r && (h._scopeId = r), o ? (p = function(e) {
            (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), 
            n && n.call(this, l(e)), e && e._registeredComponents && e._registeredComponents.add(o);
        }, h._ssrRegister = p) : n && (p = i ? function(e) {
            n.call(this, c(e, this.$root.$options.shadowRoot));
        } : function(e) {
            n.call(this, a(e));
        }), p) if (h.functional) {
            const e = h.render;
            h.render = function(n, t) {
                return p.call(t), e(n, t);
            };
        } else {
            const e = h.beforeCreate;
            h.beforeCreate = e ? [].concat(e, p) : [ p ];
        }
        return t;
    }
    const s = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function o(e) {
        return (e, n) => function(e, n) {
            const t = s ? n.media || "default" : e, r = a[t] || (a[t] = {
                ids: new Set,
                styles: []
            });
            if (!r.ids.has(e)) {
                r.ids.add(e);
                let t = n.source;
                if (n.map && (t += "\n/*# sourceURL=" + n.map.sources[0] + " */", t += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n.map)))) + " */"), 
                r.element || (r.element = document.createElement("style"), r.element.type = "text/css", 
                n.media && r.element.setAttribute("media", n.media), void 0 === i && (i = document.head || document.getElementsByTagName("head")[0]), 
                i.appendChild(r.element)), "styleSheet" in r.element) r.styles.push(t), r.element.styleSheet.cssText = r.styles.filter(Boolean).join("\n"); else {
                    const e = r.ids.size - 1, n = document.createTextNode(t), s = r.element.childNodes;
                    s[e] && r.element.removeChild(s[e]), s.length ? r.element.insertBefore(n, s[e]) : r.element.appendChild(n);
                }
            }
        }(e, n);
    }
    let i;
    const a = {};
    const l = {
        name: "logo"
    };
    var c = function() {
        var e = this.$createElement;
        this._self._c;
        return this._m(0);
    };
    c._withStripped = !0;
    const h = r({
        render: c,
        staticRenderFns: [ function() {
            var e = this.$createElement, n = this._self._c || e;
            return n("a", {
                staticClass: "as-title",
                attrs: {
                    href: "https://github.com/endday/all-search",
                    target: "_blank"
                }
            }, [ n("p", {
                staticClass: "as-title-inner"
            }, [ this._v("\n    All Search\n  ") ]) ]);
        } ]
    }, (function(e) {
        e && e("data-v-0c80e266_0", {
            source: ".as-title {\n  text-decoration: none;\n}\n.as-title .as-title-inner {\n  font-size: 18px;\n  width: 120px;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=logo.vue.map */",
            map: {
                version: 3,
                sources: [ "E:\\myProject\\all-search\\src\\components\\logo.vue", "logo.vue" ],
                names: [],
                mappings: "AAoBA;EACA,qBAAA;ACnBA;ADqBA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,SAAA;EACA,kBAAA;EACA,eAAA;ACnBA;;AAEA,mCAAmC",
                file: "logo.vue",
                sourcesContent: [ '<template>\r\n  <a class="as-title"\r\n     href="https://github.com/endday/all-search"\r\n     target="_blank"\r\n  >\r\n    <p class="as-title-inner">\r\n      All Search\r\n    </p>\r\n  </a>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \'logo\'\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .as-title {\r\n    text-decoration: none;\r\n\r\n    .as-title-inner {\r\n      font-size: 18px;\r\n      width: 120px;\r\n      height: $height;\r\n      line-height: $height;\r\n      font-weight: 600;\r\n      color: #1990fc;\r\n      margin: 0;\r\n      text-align: center;\r\n      cursor: pointer;\r\n    }\r\n  }\r\n</style>\r\n', ".as-title {\n  text-decoration: none;\n}\n.as-title .as-title-inner {\n  font-size: 18px;\n  width: 120px;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=logo.vue.map */" ]
            },
            media: void 0
        });
    }), l, void 0, !1, void 0, !1, o, void 0, void 0);
    const p = {
        name: "category",
        props: {
            value: {
                type: String,
                default: ""
            }
        },
        data: () => ({
            engines: n,
            show: !1
        }),
        computed: {
            nameZh() {
                const e = this.engines.findIndex(e => e.name === this.value);
                return e > -1 ? this.engines[e].nameZh : this.engines[0].nameZh;
            }
        },
        methods: {
            handleChange(e) {
                this.$emit("change", e);
            },
            openValue() {
                this.show = !this.show;
            },
            selectCategory(e, n) {
                this.handleChange(n.name), this.show = !1;
            }
        }
    };
    var m = function() {
        var e = this, n = e.$createElement, t = e._self._c || n;
        return t("div", {
            staticClass: "as-select"
        }, [ t("div", {
            staticClass: "as-select-content",
            on: {
                click: e.openValue
            }
        }, [ t("span", {
            domProps: {
                textContent: e._s(e.nameZh)
            }
        }) ]), e._v(" "), t("ul", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: e.show,
                expression: "show"
            } ],
            staticClass: "as-select-list",
            class: {
                fadeInDown: e.show
            }
        }, e._l(e.engines, (function(n, r) {
            return t("li", {
                key: n.index,
                domProps: {
                    textContent: e._s(n.nameZh)
                },
                on: {
                    click: function(t) {
                        return e.selectCategory(r, n);
                    }
                }
            });
        })), 0), e._v(" "), t("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: e.show,
                expression: "show"
            } ],
            staticClass: "as-select-mask",
            on: {
                click: function(n) {
                    e.show = !1;
                }
            }
        }) ]);
    };
    m._withStripped = !0;
    const u = r({
        render: m,
        staticRenderFns: []
    }, (function(e) {
        e && e("data-v-393a67ba_0", {
            source: '@charset "UTF-8";\n.as-select {\n  position: relative;\n}\n.as-select ul li {\n  list-style: none;\n}\n.as-select-content {\n  width: 100px;\n  height: 30px;\n  line-height: 30px;\n  font-size: 14px;\n  cursor: pointer;\n  padding-left: 10px;\n  position: relative;\n}\n.as-select-content::after {\n  content: " ▾";\n  position: absolute;\n  right: 12px;\n  font-size: 24px;\n  color: #999;\n}\n.as-select-list {\n  padding: 4px 0;\n  min-width: 100px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n  z-index: 99;\n}\n.as-select-list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.as-select-list li:hover {\n  background-color: #f5f7fa;\n}\n.as-select-mask {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n}\n\n/*# sourceMappingURL=category.vue.map */',
            map: {
                version: 3,
                sources: [ "category.vue", "E:\\myProject\\all-search\\src\\components\\category.vue" ],
                names: [],
                mappings: "AAAA,gBAAgB;ACoEhB;EACA,kBAAA;ADlEA;ACmEA;EACA,gBAAA;ADjEA;ACqEA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,eAAA;EACA,kBAAA;EACA,kBAAA;ADlEA;ACmEA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;EACA,eAAA;EACA,WAAA;ADjEA;ACqEA;EACA,cAAA;EACA,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,sBAAA;EACA,2CAAA;EACA,sBAAA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;ADlEA;ACmEA;EACA,eAAA;EACA,eAAA;EACA,kBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,cAAA;EACA,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;ADjEA;ACkEA;EACA,yBAAA;ADhEA;ACqEA;EACA,eAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;EACA,OAAA;ADlEA;;AAEA,uCAAuC",
                file: "category.vue",
                sourcesContent: [ '@charset "UTF-8";\n.as-select {\n  position: relative;\n}\n.as-select ul li {\n  list-style: none;\n}\n\n.as-select-content {\n  width: 100px;\n  height: 30px;\n  line-height: 30px;\n  font-size: 14px;\n  cursor: pointer;\n  padding-left: 10px;\n  position: relative;\n}\n.as-select-content::after {\n  content: " ▾";\n  position: absolute;\n  right: 12px;\n  font-size: 24px;\n  color: #999;\n}\n\n.as-select-list {\n  padding: 4px 0;\n  min-width: 100px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n  z-index: 99;\n}\n.as-select-list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.as-select-list li:hover {\n  background-color: #f5f7fa;\n}\n\n.as-select-mask {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n}\n\n/*# sourceMappingURL=category.vue.map */', '<template>\r\n  <div class="as-select">\r\n    <div class="as-select-content"\r\n         @click="openValue">\r\n      <span v-text="nameZh"></span>\r\n    </div>\r\n    <ul class="as-select-list"\r\n        :class="{ fadeInDown: show }"\r\n        v-show="show">\r\n      <li\r\n        v-for="(item,index) in engines"\r\n        :key="item.index"\r\n        v-text="item.nameZh"\r\n        @click="selectCategory(index,item)">\r\n      </li>\r\n    </ul>\r\n    <div class="as-select-mask"\r\n         @click="show = false"\r\n         v-show="show">\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport engines from \'../config/engines\'\r\n\r\nexport default {\r\n  name: \'category\',\r\n  props: {\r\n    value: {\r\n      type: String,\r\n      default: \'\'\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      engines,\r\n      show: false\r\n    }\r\n  },\r\n  computed: {\r\n    nameZh () {\r\n      const i = this.engines.findIndex(item => item.name === this.value)\r\n      if (i > -1) {\r\n        return this.engines[i].nameZh\r\n      } else {\r\n        return this.engines[0].nameZh\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    handleChange (val) {\r\n      this.$emit(\'change\', val)\r\n    },\r\n    openValue () {\r\n      this.show = !this.show\r\n    },\r\n    selectCategory (index, item) {\r\n      this.handleChange(item.name)\r\n      this.show = false\r\n    }\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .as-select {\r\n    position: relative;\r\n    ul li {\r\n      list-style: none;\r\n    }\r\n  }\r\n\r\n  .as-select-content {\r\n    width: 100px;\r\n    height: $height;\r\n    line-height: $height;\r\n    font-size: 14px;\r\n    cursor: pointer;\r\n    padding-left: 10px;\r\n    position: relative;\r\n    &::after {\r\n      content: \' ▾\';\r\n      position: absolute;\r\n      right: 12px;\r\n      font-size: 24px;\r\n      color: #999;\r\n    }\r\n  }\r\n\r\n  .as-select-list {\r\n    padding: 4px 0;\r\n    min-width: 100px;\r\n    border: 1px solid #e4e7ed;\r\n    border-radius: 4px;\r\n    background-color: #fff;\r\n    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);\r\n    box-sizing: border-box;\r\n    margin: 5px 0;\r\n    position: absolute;\r\n    z-index: 99;\r\n    li {\r\n      font-size: 14px;\r\n      padding: 0 20px;\r\n      position: relative;\r\n      white-space: nowrap;\r\n      overflow: hidden;\r\n      text-overflow: ellipsis;\r\n      color: #606266;\r\n      height: 34px;\r\n      line-height: 34px;\r\n      box-sizing: border-box;\r\n      cursor: pointer;\r\n      &:hover {\r\n        background-color: #f5f7fa;\r\n      }\r\n    }\r\n  }\r\n\r\n  .as-select-mask {\r\n    position: fixed;\r\n    top: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    left: 0;\r\n  }\r\n</style>\r\n' ]
            },
            media: void 0
        });
    }), p, void 0, !1, void 0, !1, o, void 0, void 0);
    const A = {
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
                    const e = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                    return e ? "INPUT" === e.nodeName || "textarea" === e.localName ? e.value : e.textContent : "";
                }();
            },
            handleClick(e) {
                this.$emit("click", e);
                const n = this.getKeyword();
                window.location.href = e.url.replace("%s", n);
            },
            handleMouseWheelClick(e, n) {
                if (1 === e.button) {
                    const e = this.getKeyword();
                    window.open(n.url.replace("%s", e));
                }
            }
        }
    };
    var d = function() {
        var e = this, n = e.$createElement, t = e._self._c || n;
        return t("div", {
            staticClass: "as-menu-container"
        }, [ t("ul", {
            staticClass: "as-menu"
        }, e._l(e.menus, (function(n, r) {
            return t("li", {
                key: r,
                staticClass: "as-submenu",
                on: {
                    click: function(t) {
                        return e.handleClick(n);
                    },
                    mousedown: function(t) {
                        return e.handleMouseWheelClick(t, n);
                    }
                }
            }, [ t("p", {
                staticClass: "as-submenu-title",
                domProps: {
                    textContent: e._s(n.name)
                }
            }) ]);
        })), 0) ]);
    };
    d._withStripped = !0;
    const g = {
        name: "all-search",
        components: {
            logo: h,
            category: u,
            siteMenu: r({
                render: d,
                staticRenderFns: []
            }, (function(e) {
                e && e("data-v-18c4106f_0", {
                    source: ".as-menu-container {\n  display: flex;\n  flex: 1;\n}\n.as-menu {\n  display: flex;\n  line-height: 30px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n.as-submenu {\n  display: flex;\n  align-items: center;\n  position: relative;\n  top: 1px;\n}\n.as-submenu-title {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n.as-submenu-title:hover {\n  color: #1890ff;\n}\n\n/*# sourceMappingURL=menu.vue.map */",
                    map: {
                        version: 3,
                        sources: [ "E:\\myProject\\all-search\\src\\components\\menu.vue", "menu.vue" ],
                        names: [],
                        mappings: "AA2DA;EACA,aAAA;EACA,OAAA;AC1DA;AD6DA;EACA,aAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;EACA,SAAA;EACA,gBAAA;EACA,sBAAA;AC1DA;AD6DA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,QAAA;AC1DA;AD6DA;EACA,kBAAA;EACA,cAAA;EACA,SAAA;EACA,eAAA;EACA,mBAAA;EACA,eAAA;EACA,eAAA;AC1DA;AD4DA;EACA,cAAA;AC1DA;;AAEA,mCAAmC",
                        file: "menu.vue",
                        sourcesContent: [ '<template>\r\n  <div class="as-menu-container">\r\n    <ul class="as-menu">\r\n      <li class="as-submenu"\r\n          v-for="(item, i) in menus"\r\n          :key="i"\r\n          @click="handleClick(item)"\r\n          @mousedown="handleMouseWheelClick($event, item)">\r\n        <p class="as-submenu-title"\r\n           v-text="item.name">\r\n        </p>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { getKeyword } from \'../util\'\r\n\r\nexport default {\r\n  name: \'site-menu\',\r\n  props: {\r\n    menus: {\r\n      type: Array,\r\n      default () {\r\n        return []\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {}\r\n  },\r\n  methods: {\r\n    getKeyword () {\r\n      if (this.$root.currentSite.keyword) {\r\n        return this.$root.currentSite.keyword()\r\n      } else {\r\n        return getKeyword()\r\n      }\r\n    },\r\n    handleClick (item) {\r\n      this.$emit(\'click\', item)\r\n      const keyword = this.getKeyword()\r\n      window.location.href = item.url.replace(\'%s\', keyword)\r\n    },\r\n    handleMouseWheelClick (event, item) {\r\n      const btnNum = event.button\r\n      if (btnNum === 1) {\r\n        const keyword = this.getKeyword()\r\n        window.open(item.url.replace(\'%s\', keyword))\r\n      }\r\n    }\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang="scss">\r\n  @import "../assets/common";\r\n\r\n  .as-menu-container {\r\n    display: flex;\r\n    flex: 1;\r\n  }\r\n\r\n  .as-menu {\r\n    display: flex;\r\n    line-height: $height;\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 0;\r\n    margin-top: -1px;\r\n    margin-bottom: 0;\r\n    white-space: nowrap;\r\n    border: 0;\r\n    box-shadow: none;\r\n    background-color: #fff;\r\n  }\r\n\r\n  .as-submenu {\r\n    display: flex;\r\n    align-items: center;\r\n    position: relative;\r\n    top: 1px;\r\n  }\r\n\r\n  .as-submenu-title {\r\n    position: relative;\r\n    display: block;\r\n    margin: 0;\r\n    padding: 0 20px;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n    font-size: 14px;\r\n\r\n    &:hover {\r\n      color: $color;\r\n    }\r\n  }\r\n</style>\r\n', ".as-menu-container {\n  display: flex;\n  flex: 1;\n}\n\n.as-menu {\n  display: flex;\n  line-height: 30px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n\n.as-submenu {\n  display: flex;\n  align-items: center;\n  position: relative;\n  top: 1px;\n}\n\n.as-submenu-title {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n.as-submenu-title:hover {\n  color: #1890ff;\n}\n\n/*# sourceMappingURL=menu.vue.map */" ]
                    },
                    media: void 0
                });
            }), A, void 0, !1, void 0, !1, o, void 0, void 0)
        },
        data: () => ({
            engines: n,
            categoryName: "search",
            visible: !1
        }),
        computed: {
            menus() {
                const e = this.engines.findIndex(e => e.name === this.categoryName);
                return e > -1 ? this.engines[e].list.filter(e => !e.disabled) : this.engines[0].list.filter(e => !e.disabled);
            }
        },
        created() {
            this.categoryName = function(e) {
                const n = t(e);
                if (window.GM_getValue) return window.GM_getValue(n);
                const r = window.localStorage.getItem(n);
                return r ? JSON.parse(r) : null;
            }("categoryName") || this.categoryName;
        },
        methods: {
            handleClick(e) {
                this.$emit("menu-click", e);
            },
            changeCategory(e) {
                !function(e, n) {
                    const r = t(e);
                    if (window.GM_setValue) window.GM_setValue(r, n); else {
                        const e = JSON.stringify(n);
                        e && window.localStorage.setItem(r, e);
                    }
                }("categoryName", e), this.categoryName = e;
            },
            openSetDialog() {
                this.visible = !0;
            }
        }
    };
    var w = function() {
        var e = this.$createElement, n = this._self._c || e;
        return n("header", {
            attrs: {
                id: "all-search"
            }
        }, [ n("logo"), this._v(" "), n("category", {
            attrs: {
                value: this.categoryName
            },
            on: {
                change: this.changeCategory
            }
        }), this._v(" "), n("site-menu", {
            attrs: {
                menus: this.menus
            }
        }) ], 1);
    };
    w._withStripped = !0;
    const f = r({
        render: w,
        staticRenderFns: []
    }, (function(e) {
        e && e("data-v-431c099a_0", {
            source: 'body {\n  margin-top: 30px;\n}\n#all-search {\n  height: 30px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  z-index: 999999;\n  display: flex;\n  border-bottom: 1px #e8e8e8 solid;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n.setting {\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n/*# sourceMappingURL=App.vue.map */',
            map: {
                version: 3,
                sources: [ "E:\\myProject\\all-search\\src\\App.vue", "App.vue" ],
                names: [],
                mappings: "AA2EA;EACA,gBAAA;AC1EA;AD6EA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,MAAA;EACA,eAAA;EACA,aAAA;EACA,gCAAA;EACA,sBAAA;EACA,kMAAA;AC1EA;AD6EA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;EACA,eAAA;AC1EA;;AAEA,kCAAkC",
                file: "App.vue",
                sourcesContent: [ "<template>\r\n  <header id=\"all-search\">\r\n    <logo/>\r\n    <category :value=\"categoryName\"\r\n              @change=\"changeCategory\"/>\r\n    <site-menu :menus=\"menus\"/>\r\n\x3c!--    <div v-show=\"false\"\r\n         class=\"setting\"\r\n         @click=\"openSetDialog\">\r\n      设置\r\n    </div>\r\n    <x-dialog\r\n      :visible.sync=\"visible\"\r\n      title=\"设置\"\r\n      width=\"1000px\">\r\n      <setting/>\r\n    </x-dialog>--\x3e\r\n  </header>\r\n</template>\r\n\r\n<script>\r\nimport engines from './config/engines/index.js'\r\nimport { getSession, setSession } from './util'\r\nimport logo from './components/logo.vue'\r\nimport category from './components/category.vue'\r\nimport siteMenu from './components/menu.vue'\r\n// import xDialog from './components/dialog.vue'\r\n// import setting from './components/setting.vue'\r\n\r\nexport default {\r\n  name: 'all-search',\r\n  components: {\r\n    logo,\r\n    category,\r\n    siteMenu\r\n    // xDialog,\r\n    // setting\r\n  },\r\n  data () {\r\n    return {\r\n      engines,\r\n      categoryName: 'search',\r\n      visible: false\r\n    }\r\n  },\r\n  computed: {\r\n    menus () {\r\n      const i = this.engines.findIndex(item => item.name === this.categoryName)\r\n      if (i > -1) {\r\n        return this.engines[i].list.filter(item => !item.disabled)\r\n      }\r\n      return this.engines[0].list.filter(item => !item.disabled)\r\n    }\r\n  },\r\n  created () {\r\n    this.categoryName = getSession('categoryName') || this.categoryName\r\n  },\r\n  methods: {\r\n    handleClick (tab) {\r\n      this.$emit('menu-click', tab)\r\n    },\r\n    changeCategory (name) {\r\n      setSession('categoryName', name)\r\n      this.categoryName = name\r\n    },\r\n    openSetDialog () {\r\n      this.visible = true\r\n    }\r\n  }\r\n}\r\n<\/script>\r\n\r\n<style lang=\"scss\">\r\n  @import \"./assets/common\";\r\n\r\n  body {\r\n    margin-top: $height;\r\n  }\r\n\r\n  #all-search {\r\n    height: $height;\r\n    width: 100%;\r\n    position: fixed;\r\n    top: 0;\r\n    z-index: 999999;\r\n    display: flex;\r\n    border-bottom: 1px #e8e8e8 solid;\r\n    background-color: #fff;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\r\n  }\r\n\r\n  .setting {\r\n    padding: 0 20px;\r\n    display: flex;\r\n    align-items: center;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n    font-size: 14px;\r\n  }\r\n</style>\r\n", 'body {\n  margin-top: 30px;\n}\n\n#all-search {\n  height: 30px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  z-index: 999999;\n  display: flex;\n  border-bottom: 1px #e8e8e8 solid;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n\n.setting {\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n/*# sourceMappingURL=App.vue.map */' ]
            },
            media: void 0
        });
    }), g, void 0, !1, void 0, !1, o, void 0, void 0);
    let y = {};
    const x = [ {
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
        style: ".AppHeader.is-fixed { top: 30px!important; }"
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
    } ].find(e => e.url.test(window.location.href));
    x && !x.disabled ? (y.url = x.url, y.disabled = x.disabled, y.style = x.style, y.keyword = x.keyword) : y = null;
    var b = y;
    e.config.productionTip = !1;
    const C = b;
    if (b) {
        const n = document.createElement("div");
        n.id = "all-search";
        const t = new e({
            data: () => ({
                currentSite: C
            }),
            render: e => e(f)
        });
        (function() {
            let e = 0;
            return new Promise((n, t) => {
                if (document.body) n(); else {
                    const r = setInterval((function() {
                        e += 1, document.body && (clearInterval(r), n()), 20 === e && (clearInterval(r), 
                        t(new Error("timeOut")));
                    }), 100);
                }
            });
        })().then(() => {
            const e = document.body.parentElement.insertBefore(n, document.body);
            var r;
            t.$mount(e), b && b.style && (r = b.style, window.GM_addStyle && window.GM_addStyle(r));
        });
    }
}(Vue);
