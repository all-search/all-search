// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      1.0.12
// @description  2021年5月25日更新 竖向横向布局随意切换，支持图形界面自定义设置分类和添加链接，个人配置自动保存到谷歌插件。
// @author       endday
// @license      GPL-2.0
// @update       2021/5/25
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.prod.js
// @resource     as-icon  https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search@1.0.12/build/as-style.css
// @run-at       document-start

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText

// @include      /^https?:\/\/www\.google\.com(.hk)?\/search/
// @include      /^https?:\/\/www\.baidu\.com\/$/
// @include      /^https?:\/\/www\.baidu\.com\/s/
// @include      /^https?:\/\/www\.baidu\.com\/baidu\?wd/
// @include      /^https?:\/\/[^.]*\.bing\.com\/search/
// @include      /^https?:\/\/duckduckgo\.com\/*/
// @include      /^https?:\/\/search\.yahoo\.com\/search/
// @include      /^https?:\/\/tw\.search\.yahoo\.com\/search/
// @include      /^https?:\/\/searx\.me\/\?q/
// @include      /^https?:\/\/www\.sogou\.com\/(?:web|s)/
// @include      /^https?:\/\/yandex\.com\/search/
// @include      /^https?:\/\/www\.startpage\.com\/do\/asearch/
// @include      /^https?:\/\/mijisou.com\/\?q/
// @include      /^https?:\/\/google\.infinitynewtab\.com\/\?q/
// @include      /^https?:\/\/www\.dogedoge\.com\/results\?q/
// @include      /^https?:\/\/baike\.baidu\.com\/item/
// @include      /^https?:\/\/baike\.baidu\.com\/search/
// @include      /^https?:\/\/wenku\.baidu\.com\/search/
// @include      /^https?:\/\/zhidao\.baidu\.com\/search/
// @include      /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/
// @include      /^https?:\/\/www\.zhihu\.com\/search\?/
// @include      /^https?:\/\/www\.so\.com\/s/
// @include      /^https?:\/\/so\.baike\.com\/doc/
// @include      /^https?:\/\/www\.baike\.com\/wiki/
// @include      /^https?:\/\/www\.docin\.com\/search\.do/
// @include      /^https?:\/\/zhihu\.sogou\.com\/zhihu/
// @include      /^https?:\/\/weixin\.sogou\.com\/weixin\?/
// @include      /^https?:\/\/www\.quora\.com\/search\?/
// @include      /^https?:\/\/stackoverflow\.com\/search\?/
// @include      /^https?:\/\/search\.bilibili\.com\/all/
// @include      /^https?:\/\/www\.acfun\.cn\/search/
// @include      /^https?:\/\/www\.youtube\.com\/results/
// @include      /^https?:\/\/www\.nicovideo\.jp\/search\//
// @include      /^https?:\/\/so\.iqiyi\.com\/so\/q/
// @include      /^https?:\/\/v\.qq\.com\/x\/search/
// @include      /^https?:\/\/music\.baidu\.com\/search/
// @include      /^https?:\/\/so\.1ting\.com\/all\.do/
// @include      /^https?:\/\/www\.xiami\.com\/search/
// @include      /^https?:\/\/s\.music\.qq\.com/
// @include      /^https?:\/\/music\.163\.com\/.*?#\/search/
// @include      /^https?:\/\/so\.yinyuetai\.com\/\?keyword/
// @include      /^https?:\/\/image\.baidu\.com\/search/
// @include      /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
// @include      /^https?:\/\/.*\.bing\.com\/images\/search/
// @include      /^https?:\/\/www\.flickr\.com\/search\//
// @include      /^http:\/\/www\.pixiv\.net\/search\.php/
// @include      /^https?:\/\/huaban\.com\/search\/\?/
// @include      /^https?:\/\/www\.pinterest\.com\/search\//
// @include      /^https?:\/\/thepiratebay\.org\/search/
// @include      /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/
// @include      /^https?:\/\/www\.ed2000\.com\/filelist\.asp/
// @include      /^https?:\/\/www\.zimuzu\.tv\/search\//
// @include      /^https?:\/\/so\.cqp\.cc\/search/
// @include      /^https?:\/\/subhd\.com\/search/
// @include      /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/
// @include      /^https?:\/\/fanyi\.baidu\.com/
// @include      /^https?:\/\/.*\.bing\.com\/dict\/search\?q=/
// @include      /^https?:\/\/dict\.youdao\.com\/search/
// @include      /^https?:\/\/dict\.youdao\.com\/w/
// @include      /^https?:\/\/dict\.cn\/./
// @include      /^https?:\/\/s\.taobao\.com\/search/
// @include      /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/
// @include      /^https?:\/\/list\.tmall\.com\/search_product\.htm/
// @include      /^https?:\/\/search\.jd\.com\/search/
// @include      /^https?:\/\/search\.suning\.com/
// @include      /^https?:\/\/search\.yhd\.com\/c0-0\/k/
// @include      /^https?:\/\/search\.smzdm\.com\/\?/
// @include      /^https?:\/\/s\.weibo\.com\/weibo\?q=/
// @include      /^https?:\/\/tieba\.baidu\.com\/f\/search/
// @include      /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/
// @include      /^https?:\/\/www\.douban\.com\/search/
// @include      /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/
// @include      /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
// @include      /^http:\/\/search\.cnki\.net\/search\.aspx/
// @include      /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/
// @include      /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/
// @include      /^http:\/\/.*?ebscohost\.com\/.*?results/
// @include      /^http:\/\/link\.springer\.com\/search\?query=/
// @include      /^https?:.*?jstor.org\/action\/doAdvancedSearch/
// @include      /^https?:.*?runoob\.com\//
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
    var t = "1.0.12";
    e.reactive({
        tmVersion: ""
    });
    const o = t;
    function s(e, t) {
        t = t || window.location.href;
        const o = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)"), s = t.match(o);
        return decodeURIComponent(s ? s[2] : "");
    }
    function a(e) {
        return e ? "__allSearch__" + e : null;
    }
    let n = function(e) {
        const t = a(e);
        let o;
        if (o = window.GM_getValue ? window.GM_getValue(t) : window.localStorage.getItem(t), 
        o) try {
            return JSON.parse(o);
        } catch (e) {
            return o;
        }
        return null;
    }, r = function(e, t) {
        const o = a(e);
        if (window.GM_setValue) window.GM_setValue(o, t); else {
            const e = JSON.stringify(t);
            e && window.localStorage.setItem(o, e);
        }
    };
    function l(e, t) {
        let o;
        window.GM_getResourceText && (o = window.GM_getResourceText(e)), o ? i(o, e) : function(e, t) {
            if (!e) return;
            if (t) {
                const e = document.styleSheets;
                for (let o = 0; o < e.length; o++) if (e[o].ownerNode.className === t) return;
            }
            const o = document.createElement("link");
            o.href = e, o.rel = "stylesheet", o.type = "text/css", o.crossorigin = "anonymous", 
            document.getElementsByTagName("head")[0].appendChild(o);
        }(t, e);
    }
    function i(e, t, o, s = !1) {
        !function(e, t, o) {
            const s = t / 1e3 * 60;
            let a = 0;
            if (!0 === o) {
                if (e()) return;
            }
            requestAnimationFrame((function t() {
                if (a < s) a++, requestAnimationFrame(t); else {
                    e() || !1 || (a = 0, requestAnimationFrame(t));
                }
            }));
        }((function() {
            let a = document.querySelector(o);
            if (void 0 === o && (a = document.body || document.head || document.documentElement || document), 
            void 0 === o || void 0 !== o && null !== document.querySelector(o)) {
                if (!s) {
                    if (s || null === document.querySelector("." + t)) {
                        let o = document.createElement("style");
                        t && (o.className = t), o.setAttribute("type", "text/css"), o.innerHTML = e;
                        try {
                            a.appendChild(o);
                        } catch (e) {
                            console.log(e.message);
                        }
                        return !0;
                    }
                    return !0;
                }
                !function(e) {
                    try {
                        if ("string" == typeof e) {
                            let t = document.querySelectorAll(e);
                            for (let e = 0; e < t.length; e++) t[e].remove();
                        } else "function" == typeof e ? e() : console.log("未知命令：" + e);
                    } catch (e) {
                        console.log(e);
                    }
                }("." + t);
            }
        }), 20, !0);
    }
    const c = a("script-loaded"), u = a("page-loaded");
    const h = [ {
        url: /^https?:\/\/www\.google\.com(.hk)?\/search/,
        style: {
            1: ".srp #searchform:not(.minidiv){top: 50px !important;} .srp .minidiv{top: 30px !important;}"
        }
    }, {
        url: /^https?:\/\/www\.baidu\.com\/$/,
        invisible: !0
    }, {
        url: /^https?:\/\/www\.baidu\.com\/s/,
        style: {
            1: ".fix-head { top: 30px !important; }",
            2: ".fix-head #u { right: 100px; }"
        }
    }, {
        url: /^https?:\/\/www\.baidu\.com\/baidu\?wd/,
        style: {
            1: ".fix-head { top: 30px !important; }",
            2: ".fix-head #u { right: 100px; }"
        }
    }, {
        url: /^https?:\/\/[^.]*\.bing\.com\/search/
    }, {
        url: /^https?:\/\/duckduckgo\.com\/*/
    }, {
        url: /^https?:\/\/search\.yahoo\.com\/search/
    }, {
        url: /^https?:\/\/tw\.search\.yahoo\.com\/search/
    }, {
        url: /^https?:\/\/searx\.me\/\?q/
    }, {
        url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
        style: {
            1: ".header { top: 30px }",
            2: ".header { right: 100px }"
        }
    }, {
        url: /^https?:\/\/yandex\.com\/search/,
        style: {
            1: "body { margin: 30px!important; }"
        }
    }, {
        url: /^https?:\/\/www\.startpage\.com\/do\/asearch/
    }, {
        url: /^https?:\/\/mijisou.com\/\?q/,
        style: {
            1: ".search-page{top: 30px;} .searx-navbar{top: 42px!important;}",
            2: ".search-page{right: 100px!important;}"
        }
    }, {
        url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/
    }, {
        url: /^https?:\/\/www\.dogedoge\.com\/results\?q/,
        style: {
            1: "#header_wrapper{top: 30px!important;}",
            2: "#header_wrapper{right: 100px!important;}"
        }
    }, {
        url: /^https?:\/\/baike\.baidu\.com\/item/
    }, {
        url: /^https?:\/\/baike\.baidu\.com\/search/
    }, {
        url: /^https?:\/\/wenku\.baidu\.com\/search/
    }, {
        url: /^https?:\/\/zhidao\.baidu\.com\/search/
    }, {
        url: /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/
    }, {
        url: /^https?:\/\/www\.zhihu\.com\/search\?/,
        style: {
            1: ".AppHeader.is-fixed {top: 30px!important;}"
        }
    }, {
        url: /^https?:\/\/www\.so\.com\/s/
    }, {
        url: /^https?:\/\/so\.baike\.com\/doc/
    }, {
        url: /^https?:\/\/www\.baike\.com\/wiki/
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
        url: /^https?:\/\/www\.quora\.com\/search\?/
    }, {
        url: /^https?:\/\/stackoverflow\.com\/search\?/,
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
        url: /^https?:\/\/www\.acfun\.cn\/search/,
        keyword: () => document.getElementById("search-text--standalone").value,
        style: {
            1: "#header {top: 30px;}"
        }
    }, {
        url: /^https?:\/\/www\.youtube\.com\/results/,
        style: {
            1: "#masthead-container.ytd-app {top:30px !important;} html:not(.style-scope) {--ytd-toolbar-height:86px !important;}",
            2: "ytd-app {margin-left:100px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:100px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}"
        }
    }, {
        url: /^https?:\/\/www\.nicovideo\.jp\/search\//
    }, {
        url: /^https?:\/\/so\.iqiyi\.com\/so\/q/
    }, {
        url: /^https?:\/\/v\.qq\.com\/x\/search/,
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
        url: /^https?:\/\/s\.music\.qq\.com/
    }, {
        url: /^https?:\/\/music\.163\.com\/.*?#\/search/
    }, {
        url: /^https?:\/\/so\.yinyuetai\.com\/\?keyword/
    }, {
        url: /^https?:\/\/image\.baidu\.com\/search/,
        style: {
            1: "#search .s_search { top: 30px; }"
        }
    }, {
        url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
    }, {
        url: /^https?:\/\/.*\.bing\.com\/images\/search/,
        style: {
            1: "#miniheader {padding-top: 30px;}"
        }
    }, {
        url: /^https?:\/\/www\.flickr\.com\/search\//
    }, {
        url: /^http:\/\/www\.pixiv\.net\/search\.php/
    }, {
        url: /^https?:\/\/huaban\.com\/search\/\?/
    }, {
        url: /^https?:\/\/www\.pinterest\.com\/search\//
    }, {
        url: /^https?:\/\/thepiratebay\.org\/search/
    }, {
        url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/
    }, {
        url: /^https?:\/\/www\.ed2000\.com\/filelist\.asp/
    }, {
        url: /^https?:\/\/www\.zimuzu\.tv\/search\//
    }, {
        url: /^https?:\/\/so\.cqp\.cc\/search/
    }, {
        url: /^https?:\/\/subhd\.com\/search/
    }, {
        url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/,
        keyword: () => s("text") || s("q")
    }, {
        url: /^https?:\/\/fanyi\.baidu\.com/,
        keyword: () => document.getElementById("baidu_translate_input").value
    }, {
        url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q=/
    }, {
        url: /^https?:\/\/dict\.youdao\.com\/search/
    }, {
        url: /^https?:\/\/dict\.youdao\.com\/w/
    }, {
        url: /^https?:\/\/dict\.cn\/./
    }, {
        url: /^https?:\/\/s\.taobao\.com\/search/,
        style: {
            1: ".m-header-fixed .header-inner { top: 30px !important;}"
        }
    }, {
        url: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/
    }, {
        url: /^https?:\/\/list\.tmall\.com\/search_product\.htm/
    }, {
        url: /^https?:\/\/search\.jd\.com\/search/
    }, {
        url: /^https?:\/\/search\.suning\.com/
    }, {
        url: /^https?:\/\/search\.yhd\.com\/c0-0\/k/
    }, {
        url: /^https?:\/\/search\.smzdm\.com\/\?/
    }, {
        url: /^https?:\/\/s\.weibo\.com\/weibo\?q=/,
        style: {
            1: ".WB_global_nav { top: 30px !important;}"
        }
    }, {
        url: /^https?:\/\/tieba\.baidu\.com\/f\/search/
    }, {
        url: /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/
    }, {
        url: /^https?:\/\/www\.douban\.com\/search/
    }, {
        url: /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/
    }, {
        url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
    }, {
        url: /^http:\/\/search\.cnki\.net\/search\.aspx/
    }, {
        url: /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/
    }, {
        url: /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/
    }, {
        url: /^http:\/\/.*?ebscohost\.com\/.*?results/
    }, {
        url: /^http:\/\/link\.springer\.com\/search\?query=/
    }, {
        url: /^https?:.*?jstor.org\/action\/doAdvancedSearch/
    }, {
        url: /^https?:.*?runoob\.com\//
    }, {
        url: /^https?:\/\/github\.com\/search/
    }, {
        url: /^https?:\/\/developer\.mozilla\.org\/.{2,5}\/search/
    }, {
        url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/
    }, {
        url: /^https?:\/\/www\.startpage\.com\/do\/search/
    }, {
        url: /^https?:\/\/endday\.github\.io/,
        invisible: !0
    }, {
        url: /^https?:\/\/endday\.gitee\.io/,
        invisible: !0
    } ], m = function() {
        const e = h.find(e => e.url.test(window.location.href.toLowerCase()));
        return e ? {
            url: e.url,
            invisible: e.invisible,
            disabled: e.disabled,
            style: e.style,
            keyword: e.keyword,
            create: e.create,
            mounted: e.mounted
        } : null;
    };
    const d = n("mode"), p = e => "vertical" !== e && "horizontal" !== e ? "horizontal" : e, w = e.ref(p(d)), g = new Map([ [ "body-horizontal", "body-vertical" ], [ "body-vertical", "body-horizontal" ] ]), f = (e = "horizontal") => {
        (e => {
            const t = document.body, o = "body-" + e, s = g.get(o);
            t.classList.toggle(s, !1), t.classList.toggle(o, !0);
        })(e), (e => {
            const t = m();
            if (t && t.style) {
                let o = "";
                t.style[1] && "horizontal" === e ? o = t.style[1] : t.style[2] && "vertical" === e && (o = t.style[2]), 
                i(o, "as-custom-style", void 0, !0);
            }
        })(e);
    };
    e.watch(w, e => {
        const t = p(e);
        f(t), r("mode", t);
    });
    const y = function(e, t = 500) {
        let o = null;
        return function() {
            clearTimeout(o), o = setTimeout(() => {
                e.apply(this, arguments);
            }, t);
        };
    }(() => f(w.value));
    function b() {
        return e.onMounted(() => {
            f(w.value), window.addEventListener("resize", y, !1);
        }), e.onUnmounted(() => {
            window.removeEventListener("resize", y, !1);
        }), {
            mode: w
        };
    }
    var v = {
        name: "logo",
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].includes(e)
            }
        }
    };
    const k = e.createVNode("p", {
        class: "as-title-inner"
    }, " All Search ", -1);
    v.render = function(t, o, s, a, n, r) {
        return e.openBlock(), e.createBlock("a", {
            class: [ "as-title", "as-title-" + s.mode ],
            href: "https://github.com/endday/all-search",
            target: "_blank"
        }, [ k ], 2);
    }, v.__file = "src/components/logo.vue";
    let x = document.createElement("a");
    function Z(e) {
        let t = e;
        if (t.indexOf("//") < 0) t = "//" + t; else {
            if (!(t.indexOf("//") > -1)) return x;
            {
                const e = t.toLowerCase();
                e.startsWith("http://") || e.startsWith("https://") || e.startsWith("ftp://") || e.startsWith("files://") || (t = t.replace(/.*\/\//, "//"));
            }
        }
        return x.href = t, {
            href: x.href,
            origin: x.origin,
            protocol: x.protocol,
            host: x.host,
            hostname: x.hostname,
            port: x.port,
            pathname: x.pathname,
            search: x.search,
            hash: x.hash
        };
    }
    const q = [ {
        nameZh: "搜索",
        name: "search",
        list: [ {
            nameZh: "百度",
            url: "https://www.baidu.com/s?wd=%s&ie=utf-8"
        }, {
            nameZh: "谷歌",
            url: "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8"
        }, {
            nameZh: "必应",
            url: "https://cn.bing.com/search?q=%s"
        }, {
            nameZh: "多吉",
            url: "https://www.dogedoge.com/results?q=%s"
        }, {
            nameZh: "DDG",
            url: "https://duckduckgo.com/?q=%s"
        }, {
            nameZh: "360",
            url: "https://www.so.com/s?ie=utf-8&q=%s"
        }, {
            nameZh: "雅虎",
            url: "https://search.yahoo.com/search;?p=%s"
        }, {
            nameZh: "搜狗",
            url: "https://www.sogou.com/web?query=%s"
        }, {
            nameZh: "秘迹搜索",
            url: "https://mijisou.com/?q=%s&category_general=on&time_range=&language=zh-CN"
        }, {
            nameZh: "Yandex",
            url: "https://yandex.com/search/?text=%s"
        } ]
    }, {
        nameZh: "翻译",
        name: "translate",
        list: [ {
            nameZh: "百度翻译",
            url: "http://fanyi.baidu.com/#auto/zh/%s"
        }, {
            nameZh: "DeepL",
            url: "https://www.deepl.com/translator#zh/en/%s"
        }, {
            nameZh: "谷歌翻译",
            url: "https://translate.google.com/?q=%s"
        }, {
            nameZh: "有道词典",
            url: "http://dict.youdao.com/search?q=%s"
        }, {
            nameZh: "必应翻译",
            url: "http://cn.bing.com/dict/search?q=%s"
        } ]
    }, {
        nameZh: "视频",
        name: "video",
        list: [ {
            nameZh: "youtube",
            url: "https://www.youtube.com/results?search_query=%s"
        }, {
            nameZh: "bilibili",
            url: "http://search.bilibili.com/all?keyword=%s"
        }, {
            nameZh: "优酷",
            url: "http://www.soku.com/search_video/q_%s"
        }, {
            nameZh: "腾讯视频",
            url: "https://v.qq.com/x/search/?q=%s"
        }, {
            nameZh: "AcFun",
            url: "https://www.acfun.cn/search?keyword=%s"
        }, {
            nameZh: "乐视",
            url: "http://so.letv.com/s?wd=%s"
        }, {
            nameZh: "搜狐",
            url: "http://so.tv.sohu.com/mts?wd=%s"
        }, {
            nameZh: "niconico",
            url: "http://www.nicovideo.jp/search/%s"
        }, {
            nameZh: "爱奇艺",
            url: "http://so.iqiyi.com/so/q_%s"
        } ]
    }, {
        nameZh: "购物",
        name: "shopping",
        list: [ {
            nameZh: "淘宝",
            url: "http://s.taobao.com/search?q=%s"
        }, {
            nameZh: "京东",
            url: "http://search.jd.com/search?keyword=%s&enc=utf-8"
        }, {
            nameZh: "苏宁",
            url: "http://search.suning.com/%s/"
        }, {
            nameZh: "亚马逊",
            url: "http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s"
        }, {
            nameZh: "天猫",
            url: "http://list.tmall.com/search_product.htm?q=%s"
        }, {
            nameZh: "值得买",
            url: "http://search.smzdm.com/?c=home&s=%s"
        }, {
            nameZh: "当当网",
            url: "http://search.dangdang.com/?key=%s"
        }, {
            nameZh: "1688",
            url: "https://s.1688.com/selloffer/offer_search.htm?keywords=%s"
        } ]
    }, {
        nameZh: "音乐",
        name: "music",
        list: [ {
            nameZh: "网易音乐",
            url: "http://music.163.com/#/search/m/?s=%s"
        }, {
            nameZh: "一听",
            url: "http://so.1ting.com/all.do?q=%s"
        }, {
            nameZh: "音悦Tai",
            url: "http://so.yinyuetai.com/?keyword=%s"
        }, {
            nameZh: "QQ音乐",
            url: "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s"
        }, {
            nameZh: "百度音乐",
            url: "http://music.baidu.com/search?ie=utf-8&oe=utf-8&key=%s"
        }, {
            nameZh: "酷我音乐",
            url: "http://sou.kuwo.cn/ws/NSearch?type=all&key=%s"
        }, {
            nameZh: "酷狗",
            url: "http://search.5sing.kugou.com/?keyword=%s"
        } ]
    }, {
        nameZh: "开发",
        name: "developer",
        list: [ {
            nameZh: "MDN",
            url: "https://developer.mozilla.org/zh-CN/search?q=%s"
        }, {
            nameZh: "stackoverflow",
            url: "https://stackoverflow.com/search?q=%s"
        }, {
            nameZh: "掘金",
            url: "https://juejin.im/search?query=%s&type=all"
        }, {
            nameZh: "Can I Use",
            url: "http://caniuse.com/#search=%s"
        }, {
            nameZh: "GitHub",
            url: "https://github.com/search?utf8=✓&q=%s"
        }, {
            nameZh: "w3c",
            url: "http://www.runoob.com/?s=%s"
        }, {
            nameZh: "GreasyFork",
            url: "https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓"
        } ]
    }, {
        nameZh: "新闻",
        name: "news",
        list: [ {
            nameZh: "谷歌中文",
            url: "https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"
        }, {
            nameZh: "百度新闻",
            url: "http://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1"
        }, {
            nameZh: "网易-百度",
            url: "https://www.baidu.com/s?wd=%s%20site%3Anews.163.com"
        }, {
            nameZh: "腾讯新闻",
            url: "https://www.sogou.com/sogou?site=news.qq.com&query=%s"
        }, {
            nameZh: "凤凰新闻",
            url: "https://so.ifeng.com/?q=%s&c=1"
        }, {
            nameZh: "CNN",
            url: "https://edition.cnn.com/search/?q=%s"
        }, {
            nameZh: "BBC",
            url: "https://www.bbc.co.uk/search?q=%s"
        }, {
            nameZh: "今日头条",
            url: "https://www.toutiao.com/search/?keyword=%s"
        } ]
    }, {
        nameZh: "社交",
        name: "social",
        list: [ {
            nameZh: "知乎",
            url: "https://www.zhihu.com/search?q=%s&type=content"
        }, {
            nameZh: "推特",
            url: "https://twitter.com/search/%s"
        }, {
            nameZh: "豆瓣",
            url: "https://www.douban.com/search?source=suggest&q=%s"
        }, {
            nameZh: "百度贴吧",
            url: "https://tieba.baidu.com/f?kw=%s&ie=utf-8"
        }, {
            nameZh: "新浪微博",
            url: "https://s.weibo.com/weibo?q=%s"
        }, {
            nameZh: "脸书",
            url: "https://www.facebook.com/search/results.php?q=%s"
        }, {
            nameZh: "微信搜索",
            url: "http://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s"
        } ]
    }, {
        nameZh: "百科",
        name: "knowledge",
        list: [ {
            nameZh: "维基",
            url: "http://zh.wikipedia.org/wiki/%s"
        }, {
            nameZh: "百度百科",
            url: "http://baike.baidu.com/search/word?pic=1&sug=1&word=%s"
        }, {
            nameZh: "百度文库",
            url: "http://wenku.baidu.com/search?word=%s&ie=utf-8"
        }, {
            nameZh: "豆丁文档",
            url: "http://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s"
        }, {
            nameZh: "爱问知识",
            url: "http://iask.sina.com.cn/search?searchWord=%s"
        }, {
            nameZh: "萌娘百科",
            url: "https://zh.moegirl.org/%s"
        }, {
            nameZh: "果壳",
            url: "http://www.guokr.com/search/all/?wd=%s"
        }, {
            nameZh: "Quora",
            url: "https://www.quora.com/search?q=%s"
        } ]
    }, {
        nameZh: "图片",
        name: "image",
        list: [ {
            nameZh: "谷歌图片",
            url: "https://www.google.com/search?q=%s&tbm=isch"
        }, {
            nameZh: "百度图片",
            url: "http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=%s"
        }, {
            nameZh: "必应图片",
            url: "https://www.bing.com/images/search?q=%s"
        }, {
            nameZh: "搜狗图片",
            url: "https://pic.sogou.com/pics?query=%s"
        }, {
            nameZh: "pixiv",
            url: "http://www.pixiv.net/search.php?word=%s"
        }, {
            nameZh: "flickr",
            url: "http://www.flickr.com/search/?q=%s"
        }, {
            nameZh: "花瓣",
            url: "http://huaban.com/search/?q=%s"
        }, {
            nameZh: "easyicon",
            url: "http://www.easyicon.net/iconsearch/%s/"
        }, {
            nameZh: "Pinterest",
            url: "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta"
        }, {
            nameZh: "yandex",
            url: "https://yandex.com/images/search?text=%s"
        }, {
            nameZh: "pixabay",
            url: "https://pixabay.com/images/search/%s/"
        }, {
            nameZh: "unsplash",
            url: "https://unsplash.com/s/photos/%s"
        } ]
    }, {
        nameZh: "常用",
        name: "personal",
        list: []
    } ].map(e => ({
        ...e,
        list: e.list.map(t => {
            const {hostname: o} = Z(t.url);
            return {
                ...t,
                id: `${e.name}-${o}`,
                data: {
                    visible: !0
                }
            };
        }),
        data: {
            visible: !0
        }
    }));
    function C(e) {
        let t = q;
        const s = n("sites"), a = n("sites-version");
        return s && (t = s, s && a && (a !== o || "tm" !== e) && (t = function(e, t) {
            const o = JSON.parse(JSON.stringify(e));
            let s = JSON.parse(JSON.stringify(t.filter(e => "personal" !== e.name)));
            return s.forEach(e => {
                const t = o.find(t => t.name === e.name);
                t && (e.list.forEach(e => {
                    const o = t.list.findIndex(t => t.id === e.id);
                    o > -1 && (Object.keys(e).forEach(s => {
                        "data" !== s && (t.list[o][s] = e[s]);
                    }), e.isAdd = !0);
                }), e.list = e.list.filter(e => !e.isAdd), e.list.length && (t.list = t.list.concat(e.list)), 
                e.isAdd = !0);
            }), s = s.filter(e => !e.isAdd), s.length && o.push(...s), o;
        }(s, q), r("sites", t), r("sites-version", o))), "tm" === e && (t = t.filter(e => e.list && e.list.length > 0 && e.data && e.data.visible).map(e => ({
            ...e,
            show: !1
        }))), t;
    }
    var _ = {
        name: "menuItem",
        props: {
            showTimeout: {
                type: Number,
                default: 100
            },
            hideTimeout: {
                type: Number,
                default: 200
            },
            disabled: {
                type: Boolean,
                default: !1
            }
        },
        setup(e, t) {
            let o = null;
            const s = () => {
                o && clearTimeout(o);
            };
            return {
                handleMouseEnter: () => {
                    e.disabled || (s(), o = setTimeout(() => {
                        t.emit("show", !0);
                    }, e.showTimeout));
                },
                handleMouseLeave: () => {
                    e.disabled || (s(), o = setTimeout(() => {
                        t.emit("show", !1);
                    }, e.hideTimeout));
                }
            };
        }
    };
    _.render = function(t, o, s, a, n, r) {
        return e.openBlock(), e.createBlock("li", {
            onMouseenter: o[1] || (o[1] = e => a.handleMouseEnter(e)),
            onMouseleave: o[2] || (o[2] = e => a.handleMouseLeave(e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, _.__file = "src/components/menuItem.vue";
    var N = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    N.render = function(t, o, s, a, n, r) {
        return e.openBlock(), e.createBlock("i", {
            class: [ "as-menu-item-icon", "icon-" + s.name ]
        }, null, 2);
    }, N.__file = "src/components/icon.vue";
    const S = n("align"), V = new Map([ [ "flex-start", "开始" ], [ "center", "居中" ], [ "flex-end", "末尾" ] ]), M = e => V.has(e) ? e : "flex-start", B = e.ref(M(S)), z = e.reactive(V);
    function T() {
        return {
            alignList: z,
            align: B
        };
    }
    e.watch(B, e => {
        r("align", M(e));
    });
    var L = {
        name: "as-menu",
        components: {
            menuItem: _,
            icon: N
        },
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].includes(e)
            }
        },
        setup(t) {
            const o = e.reactive(C("tm")), s = m(), a = e.reactive({
                showTimeout: 50,
                hideTimeout: 200
            }), n = e.computed(() => "horizontal" === t.mode ? "drop" : "fade"), r = () => s && s.keyword ? s.keyword() : function() {
                const e = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                return e ? "INPUT" === e.nodeName || "textarea" === e.localName ? e.value : e.textContent : "";
            }();
            const {align: l} = T();
            return {
                sites: o,
                data: a,
                align: l,
                transition: n,
                handleClick: (e, t) => {
                    const o = r();
                    t ? window.open(e.url.replace("%s", o)) : window.location.href = e.url.replace("%s", o);
                },
                handleMenuShow: (e, t) => {
                    t.show = e;
                },
                getFavicon: function(e) {
                    const t = Z(e), o = t.host.split(".");
                    let s = t.host;
                    return o.length > 2 && (s = o.slice(1).join(".")), `https://ico.ihuan.me/${s}/cdn.ico`;
                }
            };
        }
    };
    const E = {
        class: "as-menu-item-title"
    }, D = {
        key: 0,
        class: "as-subMenu-container"
    }, I = {
        class: "as-subMenu"
    }, A = {
        class: "as-url-icon"
    };
    L.render = function(t, o, s, a, n, r) {
        const l = e.resolveComponent("icon"), i = e.resolveComponent("menu-item");
        return e.openBlock(), e.createBlock("ul", {
            class: "as-menu",
            style: {
                justifyContent: a.align
            }
        }, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(a.sites, t => (e.openBlock(), 
        e.createBlock(i, {
            class: "as-menu-item",
            key: t.index,
            showTimeout: a.data.showTimeout,
            hideTimeout: a.data.hideTimeout,
            onShow: e => a.handleMenuShow(e, t)
        }, {
            default: e.withCtx(() => [ e.createVNode("div", E, [ e.createVNode(l, {
                name: t.name
            }, null, 8, [ "name" ]), e.createVNode("span", {
                textContent: e.toDisplayString(t.nameZh),
                onClick: e => a.handleClick(t.list[0]),
                onMouseup: e.withModifiers(e => a.handleClick(t.list[0], !0), [ "middle" ])
            }, null, 40, [ "textContent", "onClick", "onMouseup" ]) ]), e.createVNode(e.Transition, {
                name: a.transition
            }, {
                default: e.withCtx(() => [ t.list && t.list.length ? e.withDirectives((e.openBlock(), 
                e.createBlock("div", D, [ e.createVNode("ul", I, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(t.list, (t, o) => e.withDirectives((e.openBlock(), 
                e.createBlock("li", {
                    key: o,
                    onClick: e => a.handleClick(t),
                    onMouseup: e.withModifiers(e => a.handleClick(t, !0), [ "middle" ])
                }, [ e.createVNode("div", A, [ e.createVNode("img", {
                    src: a.getFavicon(t.url),
                    onerror: "this.classList.add('error')"
                }, null, 8, [ "src" ]) ]), e.createVNode("p", {
                    class: "as-subMenu-text",
                    textContent: e.toDisplayString(t.nameZh)
                }, null, 8, [ "textContent" ]) ], 40, [ "onClick", "onMouseup" ])), [ [ e.vShow, t.data.visible ] ])), 128)) ]) ], 512)), [ [ e.vShow, t.show ] ]) : e.createCommentVNode("v-if", !0) ]),
                _: 2
            }, 1032, [ "name" ]) ]),
            _: 2
        }, 1032, [ "showTimeout", "hideTimeout", "onShow" ]))), 128)) ], 4);
    }, L.__file = "src/components/menu.vue";
    var j = {
        name: "overlay",
        setup(e, {emit: t}) {
            let o = !1, s = !1;
            return {
                onMouseDown: e => {
                    o = e.target === e.currentTarget;
                },
                onMouseUp: e => {
                    s = e.target === e.currentTarget;
                },
                onMaskClick: e => {
                    o && s && t("click", e), o = s = !1;
                }
            };
        }
    };
    j.render = function(t, o, s, a, n, r) {
        return e.openBlock(), e.createBlock("div", {
            class: "as-overlay",
            onMousedown: o[1] || (o[1] = (...e) => a.onMouseDown && a.onMouseDown(...e)),
            onMouseup: o[2] || (o[2] = (...e) => a.onMouseUp && a.onMouseUp(...e)),
            onClick: o[3] || (o[3] = (...e) => a.onMaskClick && a.onMaskClick(...e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, j.__file = "src/components/overlay.vue";
    var F = {
        name: "as-radio",
        props: {
            modelValue: {
                type: [ String, Number ]
            },
            label: {
                type: [ String, Number ],
                default: ""
            }
        },
        setup: (t, o) => ({
            id: "radio_" + e.getCurrentInstance().uid,
            model: e.computed({
                get: () => t.modelValue,
                set(e) {
                    o.emit("update:modelValue", e);
                }
            })
        })
    };
    const U = {
        class: "as-radio as-radio-animate"
    }, G = e.createVNode("i", {
        class: "as-radio-icon"
    }, null, -1), O = {
        class: "as-radio-label"
    };
    F.render = function(t, o, s, a, n, r) {
        return e.openBlock(), e.createBlock("label", U, [ e.withDirectives(e.createVNode("input", {
            type: "radio",
            value: s.label,
            "onUpdate:modelValue": o[1] || (o[1] = e => a.model = e)
        }, null, 8, [ "value" ]), [ [ e.vModelRadio, a.model ] ]), G, e.createVNode("span", O, [ e.renderSlot(t.$slots, "default") ]) ]);
    }, F.__file = "src/components/radio.vue";
    var $ = {
        name: "form-item",
        props: {
            labelWidth: {
                type: [ String, Number ],
                default: 60
            },
            label: {
                type: [ String, Number ],
                default: ""
            }
        },
        setup: t => ({
            labelStyle: e.computed(() => ({
                width: t.labelWidth + "px"
            })),
            contentStyle: e.computed(() => ({
                marginLeft: t.labelWidth + "px"
            }))
        })
    };
    $.render = function(t, o, s, a, n, r) {
        return e.openBlock(), e.createBlock("div", null, [ e.createVNode("label", {
            class: "as-label",
            style: a.labelStyle,
            textContent: e.toDisplayString(s.label)
        }, null, 12, [ "textContent" ]), e.createVNode("div", {
            class: "as-content",
            style: a.contentStyle
        }, [ e.renderSlot(t.$slots, "default") ], 4) ]);
    }, $.__file = "src/components/form-item.vue";
    var W = {
        name: "side-bar",
        components: {
            overlay: j,
            asRadio: F,
            formItem: $
        },
        setup() {
            const t = e.ref(!1), {mode: o} = b(), {alignList: s, align: a} = T();
            return {
                mode: o,
                visible: t,
                open: () => {
                    t.value = !0;
                },
                onMaskClick: () => {
                    t.value = !1;
                },
                changeMode: e => {
                    o.value = e.target.value;
                },
                alignList: s,
                align: a,
                changeAlign: e => {
                    a.value = e.target.value;
                }
            };
        }
    };
    const J = e.createVNode("header", {
        class: "header"
    }, " 设置 ", -1), R = e.createTextVNode(" 横向 "), H = e.createTextVNode(" 竖向 "), P = e.createVNode("footer", null, [ e.createVNode("a", {
        class: "link",
        title: "all-search",
        href: "https://endday.github.io/all-search/",
        target: "_blank"
    }, " 设置页 "), e.createVNode("a", {
        class: "link",
        title: "github",
        href: "https://github.com/endday/all-search",
        target: "_blank"
    }, " GitHub地址 ") ], -1);
    W.render = function(t, o, s, a, n, r) {
        const l = e.resolveComponent("as-radio"), i = e.resolveComponent("form-item"), c = e.resolveComponent("overlay");
        return e.openBlock(), e.createBlock(e.Fragment, null, [ e.createVNode("div", {
            class: "as-setting",
            onClick: o[1] || (o[1] = (...e) => a.open && a.open(...e))
        }, " 设置 "), (e.openBlock(), e.createBlock(e.Teleport, {
            to: "#all-search"
        }, [ e.createVNode(e.Transition, {
            name: "overlay",
            appear: ""
        }, {
            default: e.withCtx(() => [ e.withDirectives(e.createVNode(c, {
                onClick: a.onMaskClick
            }, {
                default: e.withCtx(() => [ e.createVNode(e.Transition, {
                    name: "drawer",
                    appear: ""
                }, {
                    default: e.withCtx(() => [ e.withDirectives(e.createVNode("div", {
                        "aria-modal": "true",
                        role: "dialog",
                        class: "as-side-bar",
                        onClick: o[5] || (o[5] = e.withModifiers(() => {}, [ "stop" ]))
                    }, [ J, e.createVNode("section", null, [ e.createVNode(i, {
                        label: "方向"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(l, {
                            label: "horizontal",
                            modelValue: a.mode,
                            "onUpdate:modelValue": o[2] || (o[2] = e => a.mode = e),
                            onChange: a.changeMode
                        }, {
                            default: e.withCtx(() => [ R ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]), e.createVNode(l, {
                            label: "vertical",
                            modelValue: a.mode,
                            "onUpdate:modelValue": o[3] || (o[3] = e => a.mode = e),
                            onChange: a.changeMode
                        }, {
                            default: e.withCtx(() => [ H ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]) ]),
                        _: 1
                    }), e.createVNode(i, {
                        label: "对齐"
                    }, {
                        default: e.withCtx(() => [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(a.alignList, ([t, s]) => (e.openBlock(), 
                        e.createBlock(l, {
                            label: t,
                            modelValue: a.align,
                            "onUpdate:modelValue": o[4] || (o[4] = e => a.align = e),
                            onChange: a.changeAlign
                        }, {
                            default: e.withCtx(() => [ e.createTextVNode(e.toDisplayString(s), 1) ]),
                            _: 2
                        }, 1032, [ "label", "modelValue", "onChange" ]))), 256)) ]),
                        _: 1
                    }) ]), P ], 512), [ [ e.vShow, a.visible ] ]) ]),
                    _: 1
                }) ]),
                _: 1
            }, 8, [ "onClick" ]), [ [ e.vShow, a.visible ] ]) ]),
            _: 1
        }) ])) ], 64);
    }, W.__file = "src/components/side-bar.vue";
    var Q = {
        name: "all-search",
        components: {
            logo: v,
            asMenu: L,
            sideBar: W
        },
        setup() {
            const t = m(), o = e.ref(!1), s = e.computed(() => [ "as-" + a.value ]);
            const {mode: a} = b();
            return {
                currentSite: t,
                mode: a,
                classList: s,
                openSet: () => {
                    window.open("https://endday.gitee.io/all-search/");
                },
                showBar: function() {
                    o.value = !0;
                }
            };
        }
    };
    function Y(e, t) {
        return function() {
            const o = e.apply(this, arguments);
            return t.apply(this, arguments), o;
        };
    }
    Q.render = function(t, o, s, a, n, r) {
        const l = e.resolveComponent("logo"), i = e.resolveComponent("as-menu"), c = e.resolveComponent("side-bar");
        return e.openBlock(), e.createBlock("div", {
            class: [ "as-container", a.classList ],
            style: {
                display: "none"
            }
        }, [ e.createVNode(l, {
            mode: a.mode
        }, null, 8, [ "mode" ]), e.createVNode(i, {
            mode: a.mode
        }, null, 8, [ "mode" ]), e.createVNode(c) ], 2);
    }, Q.__file = "src/as-script/index.vue";
    let K = m();
    const X = e.createApp(Q);
    console.log("all-search running 全搜运行中(production)");
    function ee() {
        if (K = m(), !K) return;
        if (K.disabled) return;
        K.invisible || l("as-style", `https://cdn.jsdelivr.net/npm/all-search@${o}/build/as-style.css`), 
        l("as-icon", "https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css");
        const e = document.getElementById("all-search");
        if (e) e.style.display = K.invisible ? "none" : "unset"; else {
            const e = function() {
                let e = document.createElement("div");
                return e.id = "all-search", e;
            }(), t = document.body.parentElement.insertBefore(e, document.body);
            X.mount(t), function() {
                const e = function() {
                    document.dispatchEvent(new CustomEvent(c, {
                        detail: {
                            version: o,
                            getSession: n,
                            setSession: r
                        }
                    }));
                };
                document.addEventListener(u, e), e();
            }();
        }
    }
    var te, oe;
    history.pushState = Y(history.pushState, ee), history.replaceState = Y(history.replaceState, ee), 
    Node.prototype.removeChild = (te = Node.prototype.removeChild, oe = e => !e || "STYLE" !== e.tagName || !(e.classList.contains("as-icon") || e.classList.contains("as-style")), 
    function() {
        if (!1 !== oe.apply(this, arguments)) return te.apply(this, arguments);
    }), function() {
        let e = 0;
        return new Promise((t, o) => {
            if (document && document.body) t(); else {
                const s = setInterval((function() {
                    e += 1, document && document.body && (clearInterval(s), t()), 50 === e && (clearInterval(s), 
                    o(new Error("timeOut")));
                }), 200);
            }
        });
    }().then(() => {
        ee();
    }).catch(e => {
        console.error(e);
    });
}(Vue);
