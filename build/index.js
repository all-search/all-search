// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单
// @version      0.2.1e
// @description  在各个引擎之间跳转的顶部固定菜单，借鉴自searchEngineJump
// @author       endday
// @license      GPL-2.0
// @update       2020/9/7
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://lib.baomitu.com/vue/2.6.11/vue.js
// @resource     iconFont  https://cdn.jsdelivr.net/gh/endday/all-search/src/assets/iconfont.css
// @resource     as-style  https://raw.githubusercontent.com/endday/all-search/master/build/as-style.css
// @run-at       document-start

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText

// @include      /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/
// @include      /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/
// @include      /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/
// @include      /^https?:\/\/[^.]*\.bing\.com\/search/
// @include      /^https?:\/\/duckduckgo\.com\/*/i
// @include      /^https?:\/\/search\.yahoo\.com\/search/i
// @include      /^https?:\/\/tw\.search\.yahoo\.com\/search/i
// @include      /^https?:\/\/searx\.me\/\?q/i
// @include      /^https?:\/\/www\.sogou\.com\/(?:web|s)/
// @include      /^https?:\/\/yandex\.com\/search/i
// @include      /^https?:\/\/www\.startpage\.com\/do\/asearch/i
// @include      /^https?:\/\/mijisou.com\/\?q/i
// @include      /^https?:\/\/google\.infinitynewtab\.com\/\?q/i
// @include      /^https?:\/\/www\.dogedoge\.com\/results\?q/i
// @include      /^https?:\/\/baike\.baidu\.com\/item/
// @include      /^https?:\/\/baike\.baidu\.com\/search/
// @include      /^https?:\/\/wenku\.baidu\.com\/search/i
// @include      /^https?:\/\/zhidao\.baidu\.com\/search/i
// @include      /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/i
// @include      /^https?:\/\/www\.zhihu\.com\/search\?/i
// @include      /^https?:\/\/www\.so\.com\/s/i
// @include      /^https?:\/\/so\.baike\.com\/doc/i
// @include      /^https?:\/\/www\.baike\.com\/wiki/i
// @include      /^https?:\/\/www\.docin\.com\/search\.do/
// @include      /^https?:\/\/zhihu\.sogou\.com\/zhihu/
// @include      /^https?:\/\/weixin\.sogou\.com\/weixin\?/
// @include      /^https?:\/\/www\.quora\.com\/search\?/i
// @include      /^https?:\/\/stackoverflow\.com\/search\?/i
// @include      /^https?:\/\/search\.bilibili\.com\/all/
// @include      /^https?:\/\/www\.acfun\.cn\/search/
// @include      /^https?:\/\/www\.youtube\.com\/results/
// @include      /^https?:\/\/www\.nicovideo\.jp\/search\//
// @include      /^https?:\/\/so\.iqiyi\.com\/so\/q/
// @include      /^https?:\/\/v\.qq\.com\/x\/search/i
// @include      /^https?:\/\/music\.baidu\.com\/search/
// @include      /^https?:\/\/so\.1ting\.com\/all\.do/
// @include      /^https?:\/\/www\.xiami\.com\/search/
// @include      /^https?:\/\/s\.music\.qq\.com/i
// @include      /^https?:\/\/music\.163\.com\/.*?#\/search/i
// @include      /^https?:\/\/so\.yinyuetai\.com\/\?keyword/
// @include      /^https?:\/\/image\.baidu\.com\/search/i
// @include      /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/i
// @include      /^https?:\/\/.*\.bing\.com\/images\/search/i
// @include      /^https?:\/\/www\.flickr\.com\/search\//
// @include      /^http:\/\/www\.pixiv\.net\/search\.php/i
// @include      /^https?:\/\/huaban\.com\/search\/\?/
// @include      /^https?:\/\/www\.pinterest\.com\/search\//
// @include      /^https?:\/\/thepiratebay\.org\/search/i
// @include      /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/i
// @include      /^https?:\/\/www\.ed2000\.com\/filelist\.asp/i
// @include      /^https?:\/\/www\.zimuzu\.tv\/search\//
// @include      /^https?:\/\/so\.cqp\.cc\/search/i
// @include      /^https?:\/\/subhd\.com\/search/i
// @include      /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/i
// @include      /^https?:\/\/fanyi\.baidu\.com/i
// @include      /^https?:\/\/.*\.bing\.com\/dict\/search\?q=/i
// @include      /^https?:\/\/dict\.youdao\.com\/search/i
// @include      /^https?:\/\/dict\.youdao\.com\/w/i
// @include      /^https?:\/\/dict\.cn\/./
// @include      /^https?:\/\/s\.taobao\.com\/search/
// @include      /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/i
// @include      /^https?:\/\/list\.tmall\.com\/search_product\.htm/i
// @include      /^https?:\/\/search\.jd\.com\/Search/
// @include      /^https?:\/\/search\.suning\.com/i
// @include      /^https?:\/\/search\.yhd\.com\/c0-0\/k/i
// @include      /^https?:\/\/search\.smzdm\.com\/\?/i
// @include      /^https?:\/\/s\.weibo\.com\/weibo\?q=/i
// @include      /^https?:\/\/tieba\.baidu\.com\/f\/search/i
// @include      /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/
// @include      /^https?:\/\/www\.douban\.com\/search/i
// @include      /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/
// @include      /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
// @include      /^http:\/\/search\.cnki\.net\/search\.aspx/i
// @include      /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/i
// @include      /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/i
// @include      /^http:\/\/.*?ebscohost\.com\/.*?results/i
// @include      /^http:\/\/link\.springer\.com\/search\?query=/i
// @include      /^https?:.*?jstor.org\/action\/doAdvancedSearch/i
// @include      /^https?:.*?runoob\.com\//i
// @include      /^https?:\/\/github\.com\/search/
// @include      /^https?:\/\/developer\.mozilla\.org\/.{2,5}\/search/
// @include      /^https?:\/\/google\.infinitynewtab\.com\/\?q/
// @include      /^https?:\/\/www\.startpage\.com\/do\/search/
// @include      /^https?:\/\/endday\.github\.io/
// @include      /^https?:\/\/endday\.gitee\.io/

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
            url: "http://s.weibo.com/weibo?q=%s"
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
        }, {
            name: "pixabay",
            url: "https://pixabay.com/images/search/%s/"
        }, {
            name: "unsplash",
            url: "https://unsplash.com/s/photos/%s"
        } ]
    } ];
    document.createElement("a");
    function s(e) {
        return e ? `__allSearch__${e}` : null;
    }
    function o(e) {
        const t = s(e);
        if (window.GM_getValue) return window.GM_getValue(t);
        const o = window.localStorage.getItem(t);
        return o ? JSON.parse(o) : null;
    }
    function a(e, t) {
        const o = s(e);
        if (window.GM_setValue) window.GM_setValue(o, t); else {
            const e = JSON.stringify(t);
            e && window.localStorage.setItem(o, e);
        }
    }
    function r(e) {
        if (!e) return;
        const t = document.createElement("style");
        t.innerHTML = e, t.class = "all-search-style", document.getElementsByTagName("head")[0].appendChild(t);
    }
    function n(e, t) {
        let s;
        window.GM_getResourceText && (s = window.GM_getResourceText(e)), s ? i(s, e) : function(e) {
            if (!e) return;
            const t = document.createElement("link");
            t.href = e, t.rel = "stylesheet", t.type = "text/css", t.crossorigin = "anonymous", 
            document.getElementsByTagName("head")[0].appendChild(t);
        }(t);
    }
    function i(e, t, s, o) {
        !function(e, t, s) {
            const o = t / 1e3 * 60;
            let a = 0;
            if (!0 === s) {
                if (e()) return;
            }
            requestAnimationFrame((function t() {
                if (a < o) a++, requestAnimationFrame(t); else {
                    e() || !1 || (a = 0, requestAnimationFrame(t));
                }
            }));
        }((function() {
            let a = document.querySelector(s);
            if (void 0 === s && (a = document.body || document.head || document.documentElement || document), 
            o = o || !1, void 0 === s || void 0 !== s && null !== document.querySelector(s)) {
                if (!0 !== o) {
                    if (!1 === o && null != document.querySelector("." + t)) return !0;
                    {
                        let s = document.createElement("style");
                        null != t && (s.className = t), s.setAttribute("type", "text/css"), s.innerHTML = e;
                        try {
                            a.appendChild(s);
                        } catch (e) {
                            console.log(e.message);
                        }
                        return !0;
                    }
                }
                !function(e) {
                    try {
                        if ("string" == typeof e) {
                            let t = document.querySelectorAll(e);
                            for (let e = 0; e < t.length; e++) t[e].remove();
                        } else "function" == typeof e ? e() : console.log("未知命令：" + e);
                    } catch (e) {}
                }("." + t);
            }
        }), 20, !0);
    }
    function l(e, t, s, o, a, r, n, i, l, c) {
        "boolean" != typeof n && (l = i, i = n, n = !1);
        const u = "function" == typeof s ? s.options : s;
        let h;
        if (e && e.render && (u.render = e.render, u.staticRenderFns = e.staticRenderFns, 
        u._compiled = !0, a && (u.functional = !0)), o && (u._scopeId = o), r ? (h = function(e) {
            (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), 
            t && t.call(this, l(e)), e && e._registeredComponents && e._registeredComponents.add(r);
        }, u._ssrRegister = h) : t && (h = n ? function(e) {
            t.call(this, c(e, this.$root.$options.shadowRoot));
        } : function(e) {
            t.call(this, i(e));
        }), h) if (u.functional) {
            const e = u.render;
            u.render = function(t, s) {
                return h.call(s), e(t, s);
            };
        } else {
            const e = u.beforeCreate;
            u.beforeCreate = e ? [].concat(e, h) : [ h ];
        }
        return s;
    }
    const c = {
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
    var u = function() {
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
    u._withStripped = !0;
    const h = l({
        render: u,
        staticRenderFns: []
    }, void 0, c, void 0, !1, void 0, !1, void 0, void 0, void 0);
    const m = {
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
    var d = function() {
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
    d._withStripped = !0;
    const p = l({
        render: d,
        staticRenderFns: []
    }, void 0, m, void 0, !1, void 0, !1, void 0, void 0, void 0);
    const w = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    var g = function() {
        var e = this.$createElement;
        return (this._self._c || e)("i", {
            staticClass: "as-menu-item-icon",
            class: "icon-" + this.name
        });
    };
    g._withStripped = !0;
    const y = {
        name: "as-menu",
        components: {
            menuItem: p,
            icon: l({
                render: g,
                staticRenderFns: []
            }, void 0, w, void 0, !1, void 0, !1, void 0, void 0, void 0)
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
    var v = function() {
        var e = this, t = e.$createElement, s = e._self._c || t;
        return s("ul", {
            staticClass: "as-menu",
            class: e.menuClass
        }, e._l(e.engines, (function(t) {
            return s("menu-item", {
                key: t.index,
                staticClass: "as-menu-item",
                class: {
                    "as-menu-item-active": t.show
                },
                on: {
                    show: function(s) {
                        return e.handleMenuShow(s, t);
                    }
                }
            }, [ s("div", {
                staticClass: "as-menu-item-title"
            }, [ s("icon", {
                attrs: {
                    name: t.name
                }
            }), e._v(" "), s("span", {
                domProps: {
                    textContent: e._s(t.nameZh)
                }
            }) ], 1), e._v(" "), s("transition", {
                attrs: {
                    name: e.transition
                }
            }, [ s("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "item.show"
                } ],
                staticClass: "as-subMenu-container"
            }, [ s("ul", {
                staticClass: "as-subMenu"
            }, e._l(t.list, (function(t, o) {
                return s("li", {
                    key: o,
                    domProps: {
                        textContent: e._s(t.name)
                    },
                    on: {
                        click: function(s) {
                            return e.handleClick(t);
                        }
                    }
                });
            })), 0) ]) ]) ], 1);
        })), 1);
    };
    v._withStripped = !0;
    const b = {
        name: "all-search",
        components: {
            logo: h,
            asMenu: l({
                render: v,
                staticRenderFns: []
            }, void 0, y, void 0, !1, void 0, !1, void 0, void 0, void 0)
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
                a("categoryName", e), this.categoryName = e;
            },
            changeMode() {
                "horizontal" === this.mode ? this.mode = "vertical" : this.mode = "horizontal", 
                a("mode", this.mode), window.location.reload();
            }
        }
    };
    var f = function() {
        var e = this, t = e.$createElement, s = e._self._c || t;
        return s("div", {
            class: e.asClass,
            attrs: {
                id: "all-search"
            }
        }, [ s("logo", {
            attrs: {
                mode: e.mode
            }
        }), e._v(" "), s("as-menu", {
            attrs: {
                mode: e.mode,
                inline: e.inline,
                value: e.categoryName
            },
            on: {
                change: e.changeCategory
            }
        }), e._v(" "), s("div", {
            staticClass: "as-setting",
            on: {
                click: e.changeMode
            }
        }, [ e._v("\n    切换模式\n  ") ]) ], 1);
    };
    f._withStripped = !0;
    const x = l({
        render: f,
        staticRenderFns: []
    }, void 0, b, void 0, !1, void 0, !1, void 0, void 0, void 0), q = [ {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
        style: {
            1: ".srp #searchform:not(.minidiv){top: 50px !important;} .srp .minidiv{top: 30px !important;}"
        }
    }, {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/
    }, {
        url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
        style: {
            1: ".fix-head { top: 30px !important; }",
            2: ".fix-head #u { right: 100px; }"
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
            2: ".header { right: 100px }"
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
            2: ".search-page{right: 100px!important;}"
        }
    }, {
        url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/i
    }, {
        url: /^https?:\/\/www\.dogedoge\.com\/results\?q/i,
        style: {
            1: "#header_wrapper{top: 30px!important;}",
            2: "#header_wrapper{right: 100px!important;}"
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
            2: ".top-bar._fixed { right: 100px }"
        }
    }, {
        url: /^https?:\/\/search\.bilibili\.com\/all/,
        keyword: () => document.getElementById("search-keyword").value,
        style: {
            1: "body { margin-top: 30px!important; } .fixed-top {top: 30px;}"
        }
    }, {
        url: /^https?:\/\/www\.acfun\.cn\/search/
    }, {
        url: /^https?:\/\/www\.youtube\.com\/results/,
        style: {
            1: "#masthead-container.ytd-app {top:30px;} html:not(.style-scope) {--ytd-toolbar-height:86px;}",
            2: "ytd-app {margin-left:100px;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:100px;}#masthead-container.ytd-app {width: calc(100% - 100px);}"
        }
    }, {
        url: /^https?:\/\/www\.nicovideo\.jp\/search\//
    }, {
        url: /^https?:\/\/so\.iqiyi\.com\/so\/q/
    }, {
        url: /^https?:\/\/v\.qq\.com\/x\/search/i,
        style: {
            1: ".site_head {top: 30px;}"
        }
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
        url: /^https?:\/\/image\.baidu\.com\/search/i,
        style: {
            1: "#search .s_search { top: 30px; }"
        }
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
        url: /^https?:\/\/s\.weibo\.com\/weibo\?q=/i,
        style: {
            1: ".WB_global_nav { top: 30px !important;}"
        }
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
    } ];
    const k = {
        name: "all-search",
        description: "在各个引擎之间跳转的顶部固定菜单，借鉴自searchEngineJump",
        version: "0.2.1e",
        main: "dist/index.js",
        author: "endday",
        license: "GPL-2.0",
        homepage: "https://github.com/endday/all-search",
        repository: {
            type: "git",
            url: "git@github.com:endday/all-search.git"
        },
        scripts: {
            serve: "vue-cli-service serve --fix",
            build: "vue-cli-service build",
            buildScript: "rollup -c",
            lint: "vue-cli-service lint",
            report: "vue-cli-service build --report",
            sourceMap: "vue-cli-service build --sourceMap"
        },
        dependencies: {
            "@babel/polyfill": "^7.4.3",
            axios: "^0.19.0",
            "element-ui": "^2.12.0",
            vue: "^2.6.12",
            "vue-router": "^3.0.1",
            vuex: "^3.0.1",
            "workbox-webpack-plugin": "^4.3.1"
        },
        devDependencies: {
            "@rollup/plugin-json": "^4.0.3",
            "@vue/cli-plugin-babel": "^3.10.0",
            "@vue/cli-plugin-eslint": "^3.10.0",
            "@vue/cli-service": "^3.10.0",
            "@vue/eslint-config-standard": "^4.0.0",
            "babel-eslint": "^10.0.1",
            "babel-plugin-component": "^1.1.1",
            "babel-plugin-import": "^1.11.0",
            "babel-plugin-transform-modules": "^0.1.1",
            "babel-preset-env": "^1.7.0",
            eslint: "^5.16.0",
            "eslint-plugin-vue": "^5.0.0",
            "file-loader": "^3.0.1",
            "html-webpack-inline-source-plugin": "0.0.10",
            "node-sass": "^4.9.0",
            rollup: "^1.32.0",
            "rollup-plugin-commonjs": "^10.1.0",
            "rollup-plugin-css-only": "^2.0.0",
            "rollup-plugin-delete": "^1.2.0",
            "rollup-plugin-node-resolve": "^5.2.0",
            "rollup-plugin-replace": "^2.2.0",
            "rollup-plugin-terser": "^5.2.0",
            "rollup-plugin-vue": "^5.1.6",
            "sass-loader": "^7.0.1",
            "vue-template-compiler": "^2.6.12",
            webpack: "^4.29.6"
        }
    }.version.replace(/\./g, "");
    e.config.productionTip = !1;
    const _ = function() {
        const e = q.find(e => e.url.test(window.location.href));
        return e && !e.disabled ? {
            url: e.url,
            disabled: e.disabled,
            style: e.style,
            keyword: e.keyword,
            create: e.create,
            mounted: e.mounted
        } : null;
    }();
    let C = null;
    const z = document.getElementById("all-search");
    z ? C = z : (C = document.createElement("div"), C.id = "all-search"), C.style.display = "none";
    const S = new e({
        data: () => ({
            currentSite: _
        }),
        render: e => e(x)
    });
    n("iconFont", "https://cdn.jsdelivr.net/gh/endday/all-search/src/assets/iconfont.css"), 
    n("as-style", `https://raw.githubusercontent.com/endday/all-search/master/build/as-style.css?v=${k}`);
    const N = o("mode") || "horizontal";
    !function() {
        const e = document.getElementsByTagName("head")[0], t = {
            childList: !0
        }, s = function(e) {
            for (const t of e) t.removedNodes.length && "STYLE" === t.removedNodes[0].nodeName && "as-style" === t.removedNodes[0].class && r(t.removedNodes[0].innerText);
        };
        let o, a = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        a && (o = new a(s), o.observe(e, t));
    }(), function() {
        let e = 0;
        return new Promise((t, s) => {
            if (document && document.body) t(); else {
                const o = setInterval((function() {
                    e += 1, document && document.body && (clearInterval(o), t()), 50 === e && (clearInterval(o), 
                    s(new Error("timeOut")));
                }), 200);
            }
        });
    }().then(() => {
        const e = document.body.parentElement.insertBefore(C, document.body);
        S.$mount(e), _ && _.style && (_.style[1] && "horizontal" === N && i(_.style[1], "as-horizontal"), 
        _.style[2] && "vertical" === N && i(_.style[2], "as-vertical"));
    }).catch(e => {
        console.error(e);
    });
}(Vue);
