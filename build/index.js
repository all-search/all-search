// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单
// @version      0.1.7e
// @description  在各个引擎之间跳转的顶部固定菜单，借鉴自searchEngineJump
// @author       endday
// @license      GPL-2.0
// @update       2020/4/29
// @include      *
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://cdn.jsdelivr.net/npm/vue
// @run-at       document-start

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle

// ==/UserScript==
/* eslint-disable */

!function(e) {
    "use strict";
    e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    var t = [ {
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
            name: "多吉",
            url: "https://www.dogedoge.com/results?q=%s"
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
            name: "DeepL",
            url: "https://www.deepl.com/translator#zh/en/%s"
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
    function s(e) {
        return e ? `__allSearch__${e}` : null;
    }
    function n(e) {
        window.GM_addStyle && window.GM_addStyle(e);
    }
    function o(e, t, s, n, o, a, r, i, c, l) {
        "boolean" != typeof r && (c = i, i = r, r = !1);
        const h = "function" == typeof s ? s.options : s;
        let u;
        if (e && e.render && (h.render = e.render, h.staticRenderFns = e.staticRenderFns, 
        h._compiled = !0, o && (h.functional = !0)), n && (h._scopeId = n), a ? (u = function(e) {
            (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), 
            t && t.call(this, c(e)), e && e._registeredComponents && e._registeredComponents.add(a);
        }, h._ssrRegister = u) : t && (u = r ? function(e) {
            t.call(this, l(e, this.$root.$options.shadowRoot));
        } : function(e) {
            t.call(this, i(e));
        }), u) if (h.functional) {
            const e = h.render;
            h.render = function(t, s) {
                return u.call(s), e(t, s);
            };
        } else {
            const e = h.beforeCreate;
            h.beforeCreate = e ? [].concat(e, u) : [ u ];
        }
        return s;
    }
    const a = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function r(e) {
        return (e, t) => function(e, t) {
            const s = a ? t.media || "default" : e, n = c[s] || (c[s] = {
                ids: new Set,
                styles: []
            });
            if (!n.ids.has(e)) {
                n.ids.add(e);
                let s = t.source;
                if (t.map && (s += "\n/*# sourceURL=" + t.map.sources[0] + " */", s += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t.map)))) + " */"), 
                n.element || (n.element = document.createElement("style"), n.element.type = "text/css", 
                t.media && n.element.setAttribute("media", t.media), void 0 === i && (i = document.head || document.getElementsByTagName("head")[0]), 
                i.appendChild(n.element)), "styleSheet" in n.element) n.styles.push(s), n.element.styleSheet.cssText = n.styles.filter(Boolean).join("\n"); else {
                    const e = n.ids.size - 1, t = document.createTextNode(s), o = n.element.childNodes;
                    o[e] && n.element.removeChild(o[e]), o.length ? n.element.insertBefore(t, o[e]) : n.element.appendChild(t);
                }
            }
        }(e, t);
    }
    let i;
    const c = {};
    const l = {
        name: "logo"
    };
    var h = function() {
        var e = this.$createElement;
        this._self._c;
        return this._m(0);
    };
    h._withStripped = !0;
    const u = o({
        render: h,
        staticRenderFns: [ function() {
            var e = this.$createElement, t = this._self._c || e;
            return t("a", {
                staticClass: "as-title",
                attrs: {
                    href: "https://github.com/endday/all-search",
                    target: "_blank"
                }
            }, [ t("p", {
                staticClass: "as-title-inner"
            }, [ this._v("\n    All Search\n  ") ]) ]);
        } ]
    }, (function(e) {
        e && e("data-v-080671f6_0", {
            source: "@media screen and (max-width: 768px) {\n.as-title {\n    display: none;\n}\n}\n.as-title {\n  text-decoration: none;\n  padding: 0;\n  margin: 0;\n}\n.as-title .as-title-inner {\n  font-size: 18px;\n  width: 90px;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0;\n  padding-left: 15px;\n  text-align: center;\n  cursor: pointer;\n}",
            map: void 0,
            media: void 0
        });
    }), l, void 0, !1, void 0, !1, r, void 0, void 0);
    const m = {
        name: "category",
        props: {
            value: {
                type: String,
                default: ""
            }
        },
        data: () => ({
            engines: t,
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
            selectCategory(e, t) {
                this.handleChange(t.name), this.show = !1;
            }
        }
    };
    var p = function() {
        var e = this, t = e.$createElement, s = e._self._c || t;
        return s("div", {
            staticClass: "as-select"
        }, [ s("div", {
            staticClass: "as-select-content",
            on: {
                click: e.openValue
            }
        }, [ s("span", {
            domProps: {
                textContent: e._s(e.nameZh)
            }
        }) ]), e._v(" "), s("ul", {
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
        }, e._l(e.engines, (function(t, n) {
            return s("li", {
                key: t.index,
                domProps: {
                    textContent: e._s(t.nameZh)
                },
                on: {
                    click: function(s) {
                        return e.selectCategory(n, t);
                    }
                }
            });
        })), 0), e._v(" "), s("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: e.show,
                expression: "show"
            } ],
            staticClass: "as-select-mask",
            on: {
                click: function(t) {
                    e.show = !1;
                }
            }
        }) ]);
    };
    p._withStripped = !0;
    const d = o({
        render: p,
        staticRenderFns: []
    }, (function(e) {
        e && e("data-v-b2fc85ca_0", {
            source: '@charset "UTF-8";\n.as-select {\n  position: relative;\n}\n.as-select ul li {\n  list-style: none;\n}\n.as-select-content {\n  width: 65px;\n  height: 30px;\n  line-height: 30px;\n  padding-left: 20px;\n  font-size: 14px;\n  cursor: pointer;\n  position: relative;\n}\n.as-select-content::after {\n  content: " ▾";\n  position: absolute;\n  right: 10px;\n  font-size: 24px;\n  color: #999;\n}\n.as-select-list {\n  padding: 4px 0;\n  min-width: 90px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 5px 0;\n  position: absolute;\n  right: -4px;\n  z-index: 99;\n}\n.as-select-list li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.as-select-list li:hover {\n  background-color: #f5f7fa;\n}\n.as-select-mask {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n}',
            map: void 0,
            media: void 0
        });
    }), m, void 0, !1, void 0, !1, r, void 0, void 0);
    const w = {
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
                const t = this.getKeyword();
                window.location.href = e.url.replace("%s", t);
            },
            handleMouseWheelClick(e, t) {
                if (1 === e.button) {
                    const e = this.getKeyword();
                    window.open(t.url.replace("%s", e));
                }
            }
        }
    };
    var g = function() {
        var e = this, t = e.$createElement, s = e._self._c || t;
        return s("div", {
            staticClass: "as-menu-container"
        }, [ s("ul", {
            staticClass: "as-menu"
        }, e._l(e.menus, (function(t, n) {
            return s("li", {
                key: n,
                staticClass: "as-submenu",
                on: {
                    click: function(s) {
                        return e.handleClick(t);
                    },
                    mousedown: function(s) {
                        return e.handleMouseWheelClick(s, t);
                    }
                }
            }, [ s("p", {
                staticClass: "as-submenu-title",
                domProps: {
                    textContent: e._s(t.name)
                }
            }) ]);
        })), 0) ]);
    };
    g._withStripped = !0;
    const f = {
        name: "all-search",
        components: {
            logo: u,
            category: d,
            siteMenu: o({
                render: g,
                staticRenderFns: []
            }, (function(e) {
                e && e("data-v-b9378046_0", {
                    source: "@media screen and (max-width: 768px) {\n.as-menu-container {\n    overflow: auto;\n}\n}\n.as-menu-container {\n  display: flex;\n  flex: 1;\n}\n.as-menu {\n  display: flex;\n  line-height: 30px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin-top: -1px;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n}\n.as-submenu {\n  display: flex;\n  align-items: center;\n  position: relative;\n  top: 1px;\n}\n.as-submenu-title {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}\n.as-submenu-title:hover {\n  color: #1890ff;\n}",
                    map: void 0,
                    media: void 0
                });
            }), w, void 0, !1, void 0, !1, r, void 0, void 0)
        },
        data: () => ({
            engines: t,
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
                const t = s(e);
                if (window.GM_getValue) return window.GM_getValue(t);
                const n = window.localStorage.getItem(t);
                return n ? JSON.parse(n) : null;
            }("categoryName") || this.categoryName;
        },
        methods: {
            handleClick(e) {
                this.$emit("menu-click", e);
            },
            changeCategory(e) {
                !function(e, t) {
                    const n = s(e);
                    if (window.GM_setValue) window.GM_setValue(n, t); else {
                        const e = JSON.stringify(t);
                        e && window.localStorage.setItem(n, e);
                    }
                }("categoryName", e), this.categoryName = e;
            },
            openSetDialog() {
                this.visible = !0;
            }
        }
    };
    var y = function() {
        var e = this.$createElement, t = this._self._c || e;
        return t("header", {
            ref: "all-search",
            attrs: {
                id: "all-search"
            }
        }, [ t("logo"), this._v(" "), t("category", {
            attrs: {
                value: this.categoryName
            },
            on: {
                change: this.changeCategory
            }
        }), this._v(" "), t("site-menu", {
            attrs: {
                menus: this.menus
            }
        }) ], 1);
    };
    y._withStripped = !0;
    const b = o({
        render: y,
        staticRenderFns: []
    }, (function(e) {
        e && e("data-v-010cc4e0_0", {
            source: 'body {\n  margin-top: 30px;\n}\n#all-search {\n  height: 30px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  z-index: 999999;\n  display: flex !important;\n  border-bottom: 1px #e8e8e8 solid;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n.setting {\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n}',
            map: void 0,
            media: void 0
        });
    }), f, void 0, !1, void 0, !1, r, void 0, void 0);
    let x = {};
    const v = [ {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
        style: ".srp #searchform:not(.minidiv){top: 50px !important;} .srp .minidiv{top: 30px !important;}"
    }, {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/
    }, {
        url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/
    }, {
        url: /^https?:\/\/[^.]*\.bing\.com\/search/,
        style: "body { padding-top: 30px }"
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
        url: /^https?:\/\/www\.dogedoge\.com\/results\?q/i,
        style: "#header_wrapper{ top: 30px!important }"
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
        url: /^https?:\/\/s\.taobao\.com\/search/,
        style: ".m-header-fixed .header-inner { top: 30px !important;}"
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
    v && !v.disabled ? (x.url = v.url, x.disabled = v.disabled, x.style = v.style, x.keyword = v.keyword, 
    x.create = v.create, x.mounted = v.mounted) : x = null;
    var k = x;
    e.config.productionTip = !1;
    const q = k;
    if (k) {
        let t = null;
        const s = document.getElementById("all-search");
        s ? t = s : (t = document.createElement("div"), t.id = "all-search"), t.style.display = "none";
        const o = new e({
            data: () => ({
                currentSite: q
            }),
            render: e => e(b)
        });
        !function() {
            const e = document.getElementsByTagName("head")[0], t = {
                childList: !0
            };
            let s;
            MutationObserver && (s = new MutationObserver((function(e) {
                for (const t of e) t.removedNodes.length && "STYLE" === t.removedNodes[0].nodeName && n(t.removedNodes[0].innerText);
            })), s.observe(e, t));
        }(), function() {
            let e = 0;
            return new Promise((t, s) => {
                if (document && document.body) t(); else {
                    const n = setInterval((function() {
                        e += 1, document && document.body && (clearInterval(n), t()), 50 === e && (clearInterval(n), 
                        s(new Error("timeOut")));
                    }), 200);
                }
            });
        }().then(() => {
            const e = document.body.parentElement.insertBefore(t, document.body);
            o.$mount(e), k && k.style && n(k.style);
        }).catch(e => {
            console.error(e);
        });
    }
}(Vue);
