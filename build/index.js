// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单
// @version      0.1.4k
// @description  在各个引擎之间跳转的顶部固定菜单，借鉴自searchEngineJump
// @author       endday
// @license      GPL-2.0
// @update       2020/4/14
// @include      *
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://cdn.jsdelivr.net/npm/vue
// @resource     asStyle  https://cdn.jsdelivr.net/gh/endday/all-search/build/as-style.css?v=0.1.4k
// @run-at       document-body

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText

// ==/UserScript==
/* eslint-disable */

!function(t) {
    "use strict";
    t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
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
    function s(t) {
        return t ? `__allSearch__${t}` : null;
    }
    function o(t) {
        window.GM_addStyle && window.GM_addStyle(t);
    }
    function a(t, e, s, o, a, r, n, i, c, h) {
        "boolean" != typeof n && (c = i, i = n, n = !1);
        const l = "function" == typeof s ? s.options : s;
        let u;
        if (t && t.render && (l.render = t.render, l.staticRenderFns = t.staticRenderFns, 
        l._compiled = !0, a && (l.functional = !0)), o && (l._scopeId = o), r ? (u = function(t) {
            (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), 
            e && e.call(this, c(t)), t && t._registeredComponents && t._registeredComponents.add(r);
        }, l._ssrRegister = u) : e && (u = n ? function(t) {
            e.call(this, h(t, this.$root.$options.shadowRoot));
        } : function(t) {
            e.call(this, i(t));
        }), u) if (l.functional) {
            const t = l.render;
            l.render = function(e, s) {
                return u.call(s), t(e, s);
            };
        } else {
            const t = l.beforeCreate;
            l.beforeCreate = t ? [].concat(t, u) : [ u ];
        }
        return s;
    }
    const r = {
        name: "logo"
    };
    var n = function() {
        var t = this.$createElement;
        this._self._c;
        return this._m(0);
    };
    n._withStripped = !0;
    const i = a({
        render: n,
        staticRenderFns: [ function() {
            var t = this.$createElement, e = this._self._c || t;
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
    }, void 0, r, void 0, !1, void 0, !1, void 0, void 0, void 0);
    const c = {
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
                const t = this.engines.findIndex(t => t.name === this.value);
                return t > -1 ? this.engines[t].nameZh : this.engines[0].nameZh;
            }
        },
        methods: {
            handleChange(t) {
                this.$emit("change", t);
            },
            openValue() {
                this.show = !this.show;
            },
            selectCategory(t, e) {
                this.handleChange(e.name), this.show = !1;
            }
        }
    };
    var h = function() {
        var t = this, e = t.$createElement, s = t._self._c || e;
        return s("div", {
            staticClass: "as-select"
        }, [ s("div", {
            staticClass: "as-select-content",
            on: {
                click: t.openValue
            }
        }, [ s("span", {
            domProps: {
                textContent: t._s(t.nameZh)
            }
        }) ]), t._v(" "), s("ul", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: t.show,
                expression: "show"
            } ],
            staticClass: "as-select-list",
            class: {
                fadeInDown: t.show
            }
        }, t._l(t.engines, (function(e, o) {
            return s("li", {
                key: e.index,
                domProps: {
                    textContent: t._s(e.nameZh)
                },
                on: {
                    click: function(s) {
                        return t.selectCategory(o, e);
                    }
                }
            });
        })), 0), t._v(" "), s("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: t.show,
                expression: "show"
            } ],
            staticClass: "as-select-mask",
            on: {
                click: function(e) {
                    t.show = !1;
                }
            }
        }) ]);
    };
    h._withStripped = !0;
    const l = a({
        render: h,
        staticRenderFns: []
    }, void 0, c, void 0, !1, void 0, !1, void 0, void 0, void 0);
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
                    const t = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                    return t ? "INPUT" === t.nodeName || "textarea" === t.localName ? t.value : t.textContent : "";
                }();
            },
            handleClick(t) {
                this.$emit("click", t);
                const e = this.getKeyword();
                window.location.href = t.url.replace("%s", e);
            },
            handleMouseWheelClick(t, e) {
                if (1 === t.button) {
                    const t = this.getKeyword();
                    window.open(e.url.replace("%s", t));
                }
            }
        }
    };
    var m = function() {
        var t = this, e = t.$createElement, s = t._self._c || e;
        return s("div", {
            staticClass: "as-menu-container"
        }, [ s("ul", {
            staticClass: "as-menu"
        }, t._l(t.menus, (function(e, o) {
            return s("li", {
                key: o,
                staticClass: "as-submenu",
                on: {
                    click: function(s) {
                        return t.handleClick(e);
                    },
                    mousedown: function(s) {
                        return t.handleMouseWheelClick(s, e);
                    }
                }
            }, [ s("p", {
                staticClass: "as-submenu-title",
                domProps: {
                    textContent: t._s(e.name)
                }
            }) ]);
        })), 0) ]);
    };
    m._withStripped = !0;
    const p = {
        name: "all-search",
        components: {
            logo: i,
            category: l,
            siteMenu: a({
                render: m,
                staticRenderFns: []
            }, void 0, u, void 0, !1, void 0, !1, void 0, void 0, void 0)
        },
        data: () => ({
            engines: e,
            categoryName: "search",
            visible: !1
        }),
        computed: {
            menus() {
                const t = this.engines.findIndex(t => t.name === this.categoryName);
                return t > -1 ? this.engines[t].list.filter(t => !t.disabled) : this.engines[0].list.filter(t => !t.disabled);
            }
        },
        created() {
            this.categoryName = function(t) {
                const e = s(t);
                if (window.GM_getValue) return window.GM_getValue(e);
                const o = window.localStorage.getItem(e);
                return o ? JSON.parse(o) : null;
            }("categoryName") || this.categoryName;
        },
        methods: {
            handleClick(t) {
                this.$emit("menu-click", t);
            },
            changeCategory(t) {
                !function(t, e) {
                    const o = s(t);
                    if (window.GM_setValue) window.GM_setValue(o, e); else {
                        const t = JSON.stringify(e);
                        t && window.localStorage.setItem(o, t);
                    }
                }("categoryName", t), this.categoryName = t;
            },
            openSetDialog() {
                this.visible = !0;
            }
        }
    };
    var w = function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("header", {
            attrs: {
                id: "all-search"
            }
        }, [ e("logo"), this._v(" "), e("category", {
            attrs: {
                value: this.categoryName
            },
            on: {
                change: this.changeCategory
            }
        }), this._v(" "), e("site-menu", {
            attrs: {
                menus: this.menus
            }
        }) ], 1);
    };
    w._withStripped = !0;
    const d = a({
        render: w,
        staticRenderFns: []
    }, void 0, p, void 0, !1, void 0, !1, void 0, void 0, void 0);
    let g = {};
    const y = [ {
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
    } ].find(t => t.url.test(window.location.href));
    y && !y.disabled ? (g.url = y.url, g.disabled = y.disabled, g.style = y.style, g.keyword = y.keyword, 
    g.create = y.create, g.mounted = y.mounted) : g = null;
    var b = g;
    t.config.productionTip = !1;
    const f = b;
    if (function(t) {
        let e = "";
        window.GM_getResourceText && (e = window.GM_getResourceText(t)), o(e);
    }("asStyle"), b) {
        const e = document.createElement("div");
        e.id = "all-search";
        const s = new t({
            data: () => ({
                currentSite: f
            }),
            render: t => t(d)
        });
        (function() {
            let t = 0;
            return new Promise((e, s) => {
                if (document.body) e(); else {
                    const o = setInterval((function() {
                        t += 1, document.body && (clearInterval(o), e()), 20 === t && (clearInterval(o), 
                        s(new Error("timeOut")));
                    }), 100);
                }
            });
        })().then(() => {
            const t = document.body.parentElement.insertBefore(e, document.body);
            s.$mount(t), b && b.style && o(b.style);
        });
    }
}(Vue);
