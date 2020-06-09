// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单
// @version      0.2.1a
// @description  在各个引擎之间跳转的顶部固定菜单，借鉴自searchEngineJump
// @author       endday
// @license      GPL-2.0
// @update       2020/5/19
// @include      *
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://cdn.jsdelivr.net/npm/vue
// @resource     iconFont  https://cdn.jsdelivr.net/gh/endday/all-search/src/assets/iconfont.css
// @run-at       document-start

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText

// ==/UserScript==
/* eslint-disable */

!function(e) {
    "use strict";
    e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    var t = [ {
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
        nameZh: "开发",
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
    function n(e) {
        return e ? `__allSearch__${e}` : null;
    }
    function o(e) {
        const t = n(e);
        if (window.GM_getValue) return window.GM_getValue(t);
        const o = window.localStorage.getItem(t);
        return o ? JSON.parse(o) : null;
    }
    function s(e, t) {
        const o = n(e);
        if (window.GM_setValue) window.GM_setValue(o, t); else {
            const e = JSON.stringify(t);
            e && window.localStorage.setItem(o, e);
        }
    }
    function a(e) {
        if (e) if (window.GM_addStyle) window.GM_addStyle(e); else {
            const t = document.createElement("style");
            t.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(t);
        }
    }
    var i = {
        name: "logo",
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].includes(e)
            }
        },
        data: () => ({
            widthMap: {
                horizontal: {
                    width: "90px",
                    margin: "0 10px"
                },
                vertical: {
                    width: "100%"
                }
            }
        }),
        computed: {
            style() {
                return this.widthMap[this.mode];
            }
        }
    };
    function r(e, t, n, o, s, a, i, r, c, l) {
        "boolean" != typeof i && (c = r, r = i, i = !1);
        const h = "function" == typeof n ? n.options : n;
        let u;
        if (e && e.render && (h.render = e.render, h.staticRenderFns = e.staticRenderFns, 
        h._compiled = !0, s && (h.functional = !0)), o && (h._scopeId = o), a ? (u = function(e) {
            (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), 
            t && t.call(this, c(e)), e && e._registeredComponents && e._registeredComponents.add(a);
        }, h._ssrRegister = u) : t && (u = i ? function(e) {
            t.call(this, l(e, this.$root.$options.shadowRoot));
        } : function(e) {
            t.call(this, r(e));
        }), u) if (h.functional) {
            const e = h.render;
            h.render = function(t, n) {
                return u.call(n), e(t, n);
            };
        } else {
            const e = h.beforeCreate;
            h.beforeCreate = e ? [].concat(e, u) : [ u ];
        }
        return n;
    }
    const c = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function l(e) {
        return (e, t) => function(e, t) {
            const n = c ? t.media || "default" : e, o = u[n] || (u[n] = {
                ids: new Set,
                styles: []
            });
            if (!o.ids.has(e)) {
                o.ids.add(e);
                let n = t.source;
                if (t.map && (n += "\n/*# sourceURL=" + t.map.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t.map)))) + " */"), 
                o.element || (o.element = document.createElement("style"), o.element.type = "text/css", 
                t.media && o.element.setAttribute("media", t.media), void 0 === h && (h = document.head || document.getElementsByTagName("head")[0]), 
                h.appendChild(o.element)), "styleSheet" in o.element) o.styles.push(n), o.element.styleSheet.cssText = o.styles.filter(Boolean).join("\n"); else {
                    const e = o.ids.size - 1, t = document.createTextNode(n), s = o.element.childNodes;
                    s[e] && o.element.removeChild(s[e]), s.length ? o.element.insertBefore(t, s[e]) : o.element.appendChild(t);
                }
            }
        }(e, t);
    }
    let h;
    const u = {};
    const m = i;
    var d = function() {
        var e = this.$createElement, t = this._self._c || e;
        return t("a", {
            staticClass: "as-title",
            class: "as-title-" + this.mode,
            attrs: {
                href: "https://github.com/endday/all-search",
                target: "_blank"
            }
        }, [ t("p", {
            staticClass: "as-title-inner"
        }, [ this._v("\n    All Search\n  ") ]) ]);
    };
    d._withStripped = !0;
    const p = r({
        render: d,
        staticRenderFns: []
    }, (function(e) {
        e && e("data-v-13ecd3d2_0", {
            source: "@media screen and (max-width: 768px) {\n.as-title {\n    display: none;\n}\n}\n.as-title-horizontal {\n  width: 100px;\n  margin: 0 10px;\n}\n.as-title-vertical {\n  width: 100%;\n}\n.as-title {\n  text-decoration: none !important;\n  padding: 0;\n  margin: 0;\n}\n.as-title .as-title-inner {\n  font-size: 18px;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0 auto;\n  text-align: center;\n  cursor: pointer;\n}",
            map: void 0,
            media: void 0
        });
    }), m, void 0, !1, void 0, !1, l, void 0, void 0);
    const w = {
        name: "menuItem",
        props: {
            showTimeout: {
                type: Number,
                default: 200
            },
            hideTimeout: {
                type: Number,
                default: 200
            }
        },
        data: () => ({
            timeout: null
        }),
        methods: {
            handleMenuClick(e) {
                clearTimeout(this.timeout), this.$emit("show", !0);
            },
            handleMouseEnter(e) {
                clearTimeout(this.timeout), this.timeout = setTimeout(() => {
                    this.$emit("show", !0);
                }, this.showTimeout);
            },
            handleMouseLeave(e, t) {
                clearTimeout(this.timeout), this.timeout = setTimeout(() => {
                    this.$emit("show", !1);
                }, this.hideTimeout);
            }
        }
    };
    var g = function() {
        var e = this, t = e.$createElement;
        return (e._self._c || t)("li", {
            on: {
                click: function(t) {
                    return e.handleMenuClick(t);
                },
                mouseenter: function(t) {
                    return e.handleMouseEnter(t);
                },
                mouseleave: function(t) {
                    return e.handleMouseLeave(t);
                }
            }
        }, [ e._t("default") ], 2);
    };
    g._withStripped = !0;
    const f = r({
        render: g,
        staticRenderFns: []
    }, (function(e) {
        e && e("data-v-7407f0ef_0", {
            source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
            map: void 0,
            media: void 0
        });
    }), w, void 0, !1, void 0, !1, l, void 0, void 0);
    const y = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    var b = function() {
        var e = this.$createElement;
        return (this._self._c || e)("i", {
            staticClass: "as-menu-item-icon",
            class: "icon-" + this.name
        });
    };
    b._withStripped = !0;
    const v = {
        name: "as-menu",
        components: {
            menuItem: f,
            icon: r({
                render: b,
                staticRenderFns: []
            }, (function(e) {
                e && e("data-v-0f053f2e_0", {
                    source: '.as-menu-item-icon {\n  font-family: "iconfont" !important;\n  font-size: 20px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}',
                    map: void 0,
                    media: void 0
                });
            }), y, void 0, !1, void 0, !1, l, void 0, void 0)
        },
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].includes(e)
            },
            inline: {
                type: Boolean,
                default: !0
            },
            value: {
                type: String,
                default: ""
            }
        },
        computed: {
            menuClass() {
                return {
                    "as-menu--horizontal": "horizontal" === this.mode,
                    "as-menu--vertical": "vertical" === this.mode
                };
            },
            transition() {
                return "horizontal" === this.mode ? "drop" : "fade";
            },
            nameZh() {
                const e = this.engines.findIndex(e => e.name === this.value);
                return e > -1 ? this.engines[e].nameZh : this.engines[0].nameZh;
            },
            menus() {
                const e = this.engines.findIndex(e => e.name === this.value);
                return e > -1 ? this.engines[e].list.filter(e => !e.disabled) : this.engines[0].list.filter(e => !e.disabled);
            }
        },
        data: () => ({
            engines: [],
            show: !1,
            asSubMenuStyle: {
                top: 0,
                left: 0
            }
        }),
        created() {
            this.engines = t.map(e => ({
                ...e,
                show: !1
            }));
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
            },
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
            },
            handleMenuShow(e, t) {
                this.inline || (t.show = e);
            },
            close() {
                this.engines.forEach(e => {
                    e.show = !1;
                }), this.show = !1;
            }
        }
    };
    var x = function() {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("ul", {
            staticClass: "as-menu",
            class: e.menuClass
        }, e._l(e.engines, (function(t) {
            return n("menu-item", {
                key: t.index,
                staticClass: "as-menu-item",
                class: {
                    "as-menu-item-active": t.show
                },
                on: {
                    show: function(n) {
                        return e.handleMenuShow(n, t);
                    }
                }
            }, [ n("div", {
                staticClass: "as-menu-item-title"
            }, [ n("icon", {
                attrs: {
                    name: t.name
                }
            }), e._v(" "), n("span", {
                domProps: {
                    textContent: e._s(t.nameZh)
                }
            }) ], 1), e._v(" "), n("transition", {
                attrs: {
                    name: e.transition
                }
            }, [ n("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "item.show"
                } ],
                staticClass: "as-subMenu-container"
            }, [ n("ul", {
                staticClass: "as-subMenu"
            }, e._l(t.list, (function(t, o) {
                return n("li", {
                    key: o,
                    domProps: {
                        textContent: e._s(t.name)
                    },
                    on: {
                        click: function(n) {
                            return e.handleClick(t);
                        }
                    }
                });
            })), 0) ]) ]) ], 1);
        })), 1);
    };
    x._withStripped = !0;
    const _ = {
        name: "all-search",
        components: {
            logo: p,
            asMenu: r({
                render: x,
                staticRenderFns: []
            }, (function(e) {
                e && e("data-v-19d03e9c_0", {
                    source: '.as-menu {\n  flex: 1;\n}\n.as-menu::before, .as-menu::after {\n  display: table;\n  content: "";\n}\n.as-menu::after {\n  clear: both;\n}\n.as-menu {\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: #fff;\n  display: flex;\n}\n.as-menu--horizontal {\n  flex-direction: row;\n}\n.as-menu--horizontal .as-menu-item-active {\n  border-bottom: 2px solid #1890ff;\n}\n.as-menu--horizontal .as-subMenu-container {\n  left: -22px;\n  top: 24px;\n}\n.as-menu--vertical {\n  flex-direction: column;\n}\n.as-menu--vertical .as-menu-item {\n  margin: 5px 0;\n}\n.as-menu--vertical .as-menu-item-active {\n  border-right: 2px solid #1890ff;\n}\n.as-menu--vertical .as-subMenu-container {\n  left: 85px;\n  top: -16px;\n}\n.as-menu-item {\n  height: 30px;\n  line-height: 30px;\n  list-style: none;\n  position: relative;\n  transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.as-menu-item-icon {\n  color: #606266;\n  margin: 1.25px 10px 0 0;\n  line-height: 28.75px;\n}\n.as-menu-item-title {\n  height: 100%;\n  padding: 0 16px;\n  position: relative;\n  margin: 0;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  color: #606266;\n  border-bottom: 2px solid rgba(255, 255, 255, 0);\n  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.as-menu-item-title:hover {\n  color: #1890ff;\n}\n.as-menu-item-active {\n  color: #1890ff;\n}\n.as-menu-item-active .as-menu-item-icon {\n  color: #1890ff;\n}\n.as-menu-item-active .as-menu-item-title {\n  color: #1890ff;\n}\n.as-subMenu-container {\n  padding: 0 20px 20px;\n  position: absolute;\n  z-index: 99;\n  transform-origin: 30% 0 0;\n}\n.as-subMenu {\n  list-style: none;\n  padding: 4px 0;\n  min-width: 90px;\n  border: 1px solid #e4e7ed;\n  border-radius: 4px;\n  background-color: #fff;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  margin: 10px 0;\n}\n.as-subMenu li {\n  font-size: 14px;\n  padding: 0 20px;\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #606266;\n  height: 34px;\n  line-height: 34px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.as-subMenu li:hover {\n  background-color: #f5f7fa;\n  color: #1890ff;\n}\n.drop-enter-active, .drop-leave-active {\n  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.drop-enter, .drop-leave-to {\n  opacity: 0;\n  transform: scaleY(0.0001);\n}\n.fade-enter-active, .fade-leave-active {\n  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n.as-subMenu-group-list {\n  list-style: none;\n  padding: 0;\n}\n.as-subMenu-group-list .as-menu-item-title {\n  padding-left: 44px;\n}',
                    map: void 0,
                    media: void 0
                });
            }), v, void 0, !1, void 0, !1, l, void 0, void 0)
        },
        data: () => ({
            engines: t,
            categoryName: "search",
            mode: "horizontal",
            inline: !1
        }),
        watch: {
            mode: {
                handler(e, t) {
                    document.body.classList.remove(`body-${t}`), document.body.classList.add(`body-${e}`);
                },
                immediate: !0
            }
        },
        computed: {
            asClass() {
                return {
                    "as-horizontal": "horizontal" === this.mode,
                    "as-vertical": "vertical" === this.mode
                };
            }
        },
        created() {
            this.categoryName = o("categoryName") || this.categoryName, this.mode = o("mode") || this.mode;
        },
        methods: {
            changeCategory(e) {
                s("categoryName", e), this.categoryName = e;
            },
            changeMode() {
                "horizontal" === this.mode ? this.mode = "vertical" : this.mode = "horizontal", 
                s("mode", this.mode), window.location.reload();
            }
        }
    };
    var k = function() {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("div", {
            class: e.asClass,
            attrs: {
                id: "all-search"
            }
        }, [ n("logo", {
            attrs: {
                mode: e.mode
            }
        }), e._v(" "), n("as-menu", {
            attrs: {
                mode: e.mode,
                inline: e.inline,
                value: e.categoryName
            },
            on: {
                change: e.changeCategory
            }
        }), e._v(" "), n("div", {
            staticClass: "as-setting",
            on: {
                click: e.changeMode
            }
        }, [ e._v("\n    切换模式\n  ") ]) ], 1);
    };
    k._withStripped = !0;
    const q = r({
        render: k,
        staticRenderFns: []
    }, (function(e) {
        e && e("data-v-d27901b4_0", {
            source: '.body-horizontal {\n  margin-top: 30px;\n}\n.body-vertical {\n  margin-left: 100px;\n}\n#all-search {\n  position: fixed;\n  display: flex !important;\n  background-color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n.as-horizontal {\n  height: 30px;\n  width: 100%;\n  top: 0;\n  z-index: 999999;\n  border-bottom: 1px #e8e8e8 solid;\n  flex-direction: row;\n}\n.as-vertical {\n  height: 100%;\n  width: 100px;\n  top: 0;\n  left: 0;\n  z-index: 999999;\n  border-right: 1px #e8e8e8 solid;\n  flex-direction: column;\n}\n.as-setting {\n  line-height: 30px;\n  padding: 0 16px;\n  position: relative;\n  margin: 0;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n  color: #606266;\n}\n.as-setting:hover {\n  color: #1890ff;\n}',
            map: void 0,
            media: void 0
        });
    }), _, void 0, !1, void 0, !1, l, void 0, void 0);
    let z = {};
    const C = [ {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
        style: {
            1: ".srp #searchform:not(.minidiv){top: 50px !important;} .srp .minidiv{top: 30px !important;}"
        }
    }, {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/
    }, {
        url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
        style: {
            2: "#u { right: 110px; }"
        }
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
        style: {
            1: ".header { top: 30px }",
            2: ".header { right: 110px }"
        }
    }, {
        url: /^https?:\/\/yandex\.com\/search/i,
        style: {
            1: "body { margin: 30px!important; }"
        }
    }, {
        url: /^https?:\/\/www\.startpage\.com\/do\/asearch/i
    }, {
        url: /^https?:\/\/mijisou.com\/\?q/i,
        style: {
            1: ".search-page{top: 30px;} .searx-navbar{top: 42px!important;}",
            2: ".search-page{right: 110px!important;}"
        }
    }, {
        url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/i
    }, {
        url: /^https?:\/\/www\.dogedoge\.com\/results\?q/i,
        style: {
            1: "#header_wrapper{top: 30px!important;}",
            2: "#header_wrapper{right: 110px!important;}"
        }
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
        style: {
            1: ".AppHeader.is-fixed {top: 30px!important;}"
        }
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
        style: {
            1: ".header { top:30px }"
        }
    }, {
        url: /^https?:\/\/weixin\.sogou\.com\/weixin\?/
    }, {
        url: /^https?:\/\/www\.quora\.com\/search\?/i
    }, {
        url: /^https?:\/\/stackoverflow\.com\/search\?/i,
        style: {
            1: ".top-bar._fixed { top: 30px }",
            2: ".top-bar._fixed { right: 110px }"
        }
    }, {
        url: /^https?:\/\/search\.bilibili\.com\/all/,
        keyword: () => document.getElementById("search-keyword").value,
        style: {
            1: "body { margin-top: 30px!important; } .fixed-top { top: 30px }"
        }
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
        style: {
            1: ".m-header-fixed .header-inner { top: 30px !important;}"
        }
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
    C && !C.disabled ? (z.url = C.url, z.disabled = C.disabled, z.style = C.style, z.keyword = C.keyword, 
    z.create = C.create, z.mounted = C.mounted) : z = null;
    var S = z;
    e.config.productionTip = !1;
    const N = S;
    if (S) {
        let t = null;
        const n = document.getElementById("all-search");
        n ? t = n : (t = document.createElement("div"), t.id = "all-search"), t.style.display = "none";
        const s = new e({
            data: () => ({
                currentSite: N
            }),
            render: e => e(q)
        });
        !function(e, t) {
            let n;
            window.GM_getResourceText && (n = window.GM_getResourceText(e)), n ? a(n) : function(e) {
                if (!e) return;
                const t = document.createElement("link");
                t.href = e, t.rel = "stylesheet", t.type = "text/css", t.crossorigin = "anonymous", 
                document.getElementsByTagName("head")[0].appendChild(t);
            }(t);
        }("iconFont", "https://cdn.jsdelivr.net/gh/endday/all-search/src/assets/iconfont.css");
        const i = o("mode") || "horizontal";
        !function() {
            const e = document.getElementsByTagName("head")[0], t = {
                childList: !0
            };
            let n;
            MutationObserver && (n = new MutationObserver((function(e) {
                for (const t of e) t.removedNodes.length && "STYLE" === t.removedNodes[0].nodeName && a(t.removedNodes[0].innerText);
            })), n.observe(e, t));
        }(), function() {
            let e = 0;
            return new Promise((t, n) => {
                if (document && document.body) t(); else {
                    const o = setInterval((function() {
                        e += 1, document && document.body && (clearInterval(o), t()), 50 === e && (clearInterval(o), 
                        n(new Error("timeOut")));
                    }), 200);
                }
            });
        }().then(() => {
            const e = document.body.parentElement.insertBefore(t, document.body);
            s.$mount(e), S && S.style && (S.style[1] && "horizontal" === i && a(S.style[1]), 
            S.style[2] && "vertical" === i && a(S.style[2]));
        }).catch(e => {
            console.error(e);
        });
    }
}(Vue);
