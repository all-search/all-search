// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      1.0.14
// @description  2021年5月30日更新 竖向横向布局随意切换，支持图形界面自定义设置分类和添加链接，个人配置自动保存到谷歌插件。
// @author       endday
// @license      GPL-2.0
// @update       2021/5/30
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.prod.js
// @resource     as-icon  https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search@1.0.14/build/as-style.css
// @run-at       document-start

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText

// @include      /\/\/www\.google\.com(.hk)?\/search/
// @include      /\/\/www\.baidu\.com\/$/
// @include      /\/\/www\.baidu\.com\/s/
// @include      /\/\/www\.baidu\.com\/baidu\?wd/
// @include      /\/\/[^.]*\.bing\.com\/search/
// @include      /\/\/duckduckgo\.com\/*/
// @include      /\/\/search\.yahoo\.com\/search/
// @include      /\/\/tw\.search\.yahoo\.com\/search/
// @include      /\/\/searx\.me\/\?q/
// @include      /\/\/www\.sogou\.com\/(?:web|s)/
// @include      /\/\/yandex\.com\/search/
// @include      /\/\/www\.startpage\.com\/do\/asearch/
// @include      /\/\/mijisou.com\/\?q/
// @include      /\/\/google\.infinitynewtab\.com\/\?q/
// @include      /\/\/www\.dogedoge\.com\/results\?q/
// @include      /\/\/baike\.baidu\.com\/item/
// @include      /\/\/baike\.baidu\.com\/search/
// @include      /\/\/wenku\.baidu\.com\/search/
// @include      /\/\/zhidao\.baidu\.com\/search/
// @include      /\/\/\D{2,5}\.wikipedia\.org\/wiki/
// @include      /\/\/www\.zhihu\.com\/search\?/
// @include      /\/\/www\.so\.com\/s/
// @include      /\/\/so\.baike\.com\/doc/
// @include      /\/\/www\.baike\.com\/wiki/
// @include      /\/\/www\.docin\.com\/search\.do/
// @include      /\/\/zhihu\.sogou\.com\/zhihu/
// @include      /\/\/weixin\.sogou\.com\/weixin\?/
// @include      /\/\/www\.quora\.com\/search\?/
// @include      /\/\/stackoverflow\.com\/search\?/
// @include      /\/\/search\.bilibili\.com\/all/
// @include      /\/\/www\.acfun\.cn\/search/
// @include      /\/\/www\.youtube\.com\/results/
// @include      /\/\/www\.youtube\.com\/watch/
// @include      /\/\/www\.nicovideo\.jp\/search\//
// @include      /\/\/so\.iqiyi\.com\/so\/q/
// @include      /\/\/v\.qq\.com\/x\/search/
// @include      /\/\/music\.baidu\.com\/search/
// @include      /\/\/so\.1ting\.com\/all\.do/
// @include      /\/\/www\.xiami\.com\/search/
// @include      /\/\/s\.music\.qq\.com/
// @include      /\/\/music\.163\.com\/.*?#\/search/
// @include      /\/\/so\.yinyuetai\.com\/\?keyword/
// @include      /\/\/image\.baidu\.com\/search/
// @include      /\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
// @include      /\/\/.*\.bing\.com\/images\/search/
// @include      /\/\/www\.flickr\.com\/search\//
// @include      /^http:\/\/www\.pixiv\.net\/search\.php/
// @include      /\/\/huaban\.com\/search\/\?/
// @include      /\/\/www\.pinterest\.com\/search\//
// @include      /\/\/thepiratebay\.org\/search/
// @include      /\/\/share\.dmhy\.org\/topics\/list\?keyword=/
// @include      /\/\/www\.ed2000\.com\/filelist\.asp/
// @include      /\/\/www\.zimuzu\.tv\/search\//
// @include      /\/\/so\.cqp\.cc\/search/
// @include      /\/\/subhd\.com\/search/
// @include      /\/\/translate\.google(?:\.\D{1,4}){1,2}/
// @include      /\/\/fanyi\.baidu\.com/
// @include      /\/\/.*\.bing\.com\/dict\/search\?q=/
// @include      /\/\/dict\.youdao\.com\/search/
// @include      /\/\/dict\.youdao\.com\/w/
// @include      /\/\/dict\.cn\/./
// @include      /\/\/s\.taobao\.com\/search/
// @include      /\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/
// @include      /\/\/list\.tmall\.com\/search_product\.htm/
// @include      /\/\/search\.jd\.com\/search/
// @include      /\/\/search\.suning\.com/
// @include      /\/\/search\.yhd\.com\/c0-0\/k/
// @include      /\/\/search\.smzdm\.com\/\?/
// @include      /\/\/s\.weibo\.com\/weibo\?q=/
// @include      /\/\/tieba\.baidu\.com\/f\/search/
// @include      /\/\/(movie|music|book)\.douban\.com\/subject_search?/
// @include      /\/\/www\.douban\.com\/search/
// @include      /\/\/xueshu\.baidu\.com\/(?:s|baidu)/
// @include      /\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
// @include      /^http:\/\/search\.cnki\.net\/search\.aspx/
// @include      /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/
// @include      /\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/
// @include      /^http:\/\/.*?ebscohost\.com\/.*?results/
// @include      /^http:\/\/link\.springer\.com\/search\?query=/
// @include      /.*?jstor.org\/action\/doAdvancedSearch/
// @include      /.*?runoob\.com\//
// @include      /\/\/github\.com\/search/
// @include      /\/\/developer\.mozilla\.org\/.{2,5}\/search/
// @include      /\/\/google\.infinitynewtab\.com\/\?q/
// @include      /\/\/www\.startpage\.com\/do\/search/
// @include      /\/\/endday\.github\.io/
// @include      /\/\/endday\.gitee\.io/

// ==/UserScript==
/* eslint-disable */

!function(e) {
    "use strict";
    var t = "1.0.14";
    e.reactive({
        tmVersion: ""
    });
    const o = t;
    function a(e, t) {
        t = t || window.location.href;
        const o = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)"), a = t.match(o);
        return decodeURIComponent(a ? a[2] : "");
    }
    function n(e) {
        return e ? "__allSearch__" + e : null;
    }
    let r = function(e) {
        const t = n(e);
        let o;
        if (o = window.GM_getValue ? window.GM_getValue(t) : window.localStorage.getItem(t), 
        o) try {
            return JSON.parse(o);
        } catch (e) {
            return o;
        }
        return null;
    }, s = function(e, t) {
        const o = n(e);
        if (window.GM_setValue) window.GM_setValue(o, t); else {
            const e = JSON.stringify(t);
            e && window.localStorage.setItem(o, e);
        }
    };
    function l(e, t) {
        let o;
        window.GM_getResourceText && (o = window.GM_getResourceText(e)), o ? c(o, e) : function(e, t) {
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
    function i(e) {
        try {
            if ("string" == typeof e) {
                let t = document.querySelectorAll(e);
                for (let e = 0; e < t.length; e++) t[e].remove();
            } else "function" == typeof e ? e() : console.log("未知命令：" + e);
        } catch (e) {
            console.log(e);
        }
    }
    function c(e, t, o, a = !1) {
        !function(e, t, o) {
            const a = t / 1e3 * 60;
            let n = 0;
            if (!0 === o) {
                if (e()) return;
            }
            requestAnimationFrame((function t() {
                if (n < a) n++, requestAnimationFrame(t); else {
                    e() || !1 || (n = 0, requestAnimationFrame(t));
                }
            }));
        }((function() {
            let n = document.querySelector(o);
            if (void 0 === o && (n = document.body || document.head || document.documentElement || document), 
            void 0 === o || void 0 !== o && null !== document.querySelector(o)) {
                if (a) i("." + t); else if (!a && null !== document.querySelector("." + t)) return !0;
                let o = document.createElement("style");
                t && (o.className = t), o.setAttribute("type", "text/css"), o.innerHTML = e;
                try {
                    n.appendChild(o);
                } catch (e) {
                    console.log(e.message);
                }
                return !0;
            }
        }), 20, !0);
    }
    const u = n("script-loaded"), m = n("page-loaded");
    const h = [ {
        url: /\/\/www\.google\.com(.hk)?\/search/,
        style: {
            1: ".srp #searchform:not(.minidiv){top: 50px !important;}#searchform.minidiv{top: 30px !important;}"
        }
    }, {
        url: /\/\/www\.baidu\.com\/$/,
        invisible: !0
    }, {
        url: /\/\/www\.baidu\.com\/s/,
        style: {
            1: ".fix-head { top: 30px !important; }",
            2: ".fix-head #u { right: 100px; }"
        }
    }, {
        url: /\/\/www\.baidu\.com\/baidu\?wd/,
        style: {
            1: ".fix-head { top: 30px !important; }",
            2: ".fix-head #u { right: 100px; }"
        }
    }, {
        url: /\/\/[^.]*\.bing\.com\/search/
    }, {
        url: /\/\/duckduckgo\.com\/*/
    }, {
        url: /\/\/search\.yahoo\.com\/search/
    }, {
        url: /\/\/tw\.search\.yahoo\.com\/search/
    }, {
        url: /\/\/searx\.me\/\?q/
    }, {
        url: /\/\/www\.sogou\.com\/(?:web|s)/,
        style: {
            1: ".header { top: 30px }",
            2: ".header { right: 100px }"
        }
    }, {
        url: /\/\/yandex\.com\/search/,
        style: {
            1: "body { margin: 30px!important; }"
        }
    }, {
        url: /\/\/www\.startpage\.com\/do\/asearch/
    }, {
        url: /\/\/mijisou.com\/\?q/,
        style: {
            1: ".search-page{top: 30px;} .searx-navbar{top: 42px!important;}",
            2: ".search-page{right: 100px!important;}"
        }
    }, {
        url: /\/\/google\.infinitynewtab\.com\/\?q/
    }, {
        url: /\/\/www\.dogedoge\.com\/results\?q/,
        style: {
            1: "#header_wrapper{top: 30px!important;}",
            2: "#header_wrapper{right: 100px!important;}"
        }
    }, {
        url: /\/\/baike\.baidu\.com\/item/
    }, {
        url: /\/\/baike\.baidu\.com\/search/
    }, {
        url: /\/\/wenku\.baidu\.com\/search/
    }, {
        url: /\/\/zhidao\.baidu\.com\/search/
    }, {
        url: /\/\/\D{2,5}\.wikipedia\.org\/wiki/
    }, {
        url: /\/\/www\.zhihu\.com\/search\?/,
        style: {
            1: ".AppHeader.is-fixed {top: 30px!important;}"
        }
    }, {
        url: /\/\/www\.so\.com\/s/
    }, {
        url: /\/\/so\.baike\.com\/doc/
    }, {
        url: /\/\/www\.baike\.com\/wiki/
    }, {
        url: /\/\/www\.docin\.com\/search\.do/
    }, {
        url: /\/\/zhihu\.sogou\.com\/zhihu/,
        style: {
            1: ".header { top:30px }"
        }
    }, {
        url: /\/\/weixin\.sogou\.com\/weixin\?/
    }, {
        url: /\/\/www\.quora\.com\/search\?/
    }, {
        url: /\/\/stackoverflow\.com\/search\?/,
        style: {
            1: ".top-bar._fixed { top: 30px }",
            2: ".top-bar._fixed { right: 100px }"
        }
    }, {
        url: /\/\/search\.bilibili\.com\/all/,
        keyword: () => document.getElementById("search-keyword").value,
        style: {
            1: "body { margin-top: 30px!important; } .fixed-top {top: 30px;}"
        }
    }, {
        url: /\/\/www\.acfun\.cn\/search/,
        keyword: () => document.getElementById("search-text--standalone").value,
        style: {
            1: "#header {top: 30px;}"
        }
    }, {
        url: /\/\/www\.youtube\.com\/results/,
        style: {
            1: "#masthead-container.ytd-app {top:30px !important;} \n          html:not(.style-scope) {--ytd-toolbar-height:86px !important;}\n          ytd-mini-guide-renderer.ytd-app {padding-top: 30px;}",
            2: "ytd-app {margin-left:100px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:100px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}"
        }
    }, {
        url: /\/\/www\.youtube\.com\/watch/,
        invisible: !0
    }, {
        url: /\/\/www\.nicovideo\.jp\/search\//
    }, {
        url: /\/\/so\.iqiyi\.com\/so\/q/
    }, {
        url: /\/\/v\.qq\.com\/x\/search/,
        style: {
            1: ".site_head {top: 30px;}"
        }
    }, {
        url: /\/\/music\.baidu\.com\/search/
    }, {
        url: /\/\/so\.1ting\.com\/all\.do/
    }, {
        url: /\/\/www\.xiami\.com\/search/
    }, {
        url: /\/\/s\.music\.qq\.com/
    }, {
        url: /\/\/music\.163\.com\/.*?#\/search/
    }, {
        url: /\/\/so\.yinyuetai\.com\/\?keyword/
    }, {
        url: /\/\/image\.baidu\.com\/search/,
        style: {
            1: "#search .s_search { top: 30px; }"
        }
    }, {
        url: /\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
    }, {
        url: /\/\/.*\.bing\.com\/images\/search/,
        style: {
            1: "#miniheader {padding-top: 30px;}"
        }
    }, {
        url: /\/\/www\.flickr\.com\/search\//
    }, {
        url: /^http:\/\/www\.pixiv\.net\/search\.php/
    }, {
        url: /\/\/huaban\.com\/search\/\?/
    }, {
        url: /\/\/www\.pinterest\.com\/search\//
    }, {
        url: /\/\/thepiratebay\.org\/search/
    }, {
        url: /\/\/share\.dmhy\.org\/topics\/list\?keyword=/
    }, {
        url: /\/\/www\.ed2000\.com\/filelist\.asp/
    }, {
        url: /\/\/www\.zimuzu\.tv\/search\//
    }, {
        url: /\/\/so\.cqp\.cc\/search/
    }, {
        url: /\/\/subhd\.com\/search/
    }, {
        url: /\/\/translate\.google(?:\.\D{1,4}){1,2}/,
        keyword: () => a("text") || a("q")
    }, {
        url: /\/\/fanyi\.baidu\.com/,
        keyword: () => document.getElementById("baidu_translate_input").value
    }, {
        url: /\/\/.*\.bing\.com\/dict\/search\?q=/
    }, {
        url: /\/\/dict\.youdao\.com\/search/
    }, {
        url: /\/\/dict\.youdao\.com\/w/
    }, {
        url: /\/\/dict\.cn\/./
    }, {
        url: /\/\/s\.taobao\.com\/search/,
        style: {
            1: ".m-header-fixed .header-inner { top: 30px !important;}"
        }
    }, {
        url: /\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/
    }, {
        url: /\/\/list\.tmall\.com\/search_product\.htm/
    }, {
        url: /\/\/search\.jd\.com\/search/
    }, {
        url: /\/\/search\.suning\.com/
    }, {
        url: /\/\/search\.yhd\.com\/c0-0\/k/
    }, {
        url: /\/\/search\.smzdm\.com\/\?/
    }, {
        url: /\/\/s\.weibo\.com\/weibo\?q=/,
        style: {
            1: ".WB_global_nav { top: 30px !important;}"
        }
    }, {
        url: /\/\/tieba\.baidu\.com\/f\/search/
    }, {
        url: /\/\/(movie|music|book)\.douban\.com\/subject_search?/
    }, {
        url: /\/\/www\.douban\.com\/search/
    }, {
        url: /\/\/xueshu\.baidu\.com\/(?:s|baidu)/
    }, {
        url: /\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
    }, {
        url: /^http:\/\/search\.cnki\.net\/search\.aspx/
    }, {
        url: /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/
    }, {
        url: /\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/
    }, {
        url: /^http:\/\/.*?ebscohost\.com\/.*?results/
    }, {
        url: /^http:\/\/link\.springer\.com\/search\?query=/
    }, {
        url: /.*?jstor.org\/action\/doAdvancedSearch/
    }, {
        url: /.*?runoob\.com\//
    }, {
        url: /\/\/github\.com\/search/
    }, {
        url: /\/\/developer\.mozilla\.org\/.{2,5}\/search/
    }, {
        url: /\/\/google\.infinitynewtab\.com\/\?q/
    }, {
        url: /\/\/www\.startpage\.com\/do\/search/
    }, {
        url: /\/\/endday\.github\.io/,
        invisible: !0
    }, {
        url: /\/\/endday\.gitee\.io/,
        invisible: !0
    } ], d = function() {
        const e = h.find(e => e.url.test(window.location.href.toLowerCase()));
        return e ? {
            url: e.url,
            invisible: e.invisible,
            disabled: e.disabled,
            style: e.style,
            keyword: e.keyword,
            create: e.create,
            mounted: e.mounted
        } : {
            url: "",
            invisible: !0,
            disabled: !0,
            style: {},
            keyword: null,
            create: null,
            mounted: null
        };
    };
    function p(e, t) {
        return function() {
            const o = e.apply(this, arguments);
            return t.apply(this, arguments), o;
        };
    }
    let w = d();
    const g = r("mode"), f = "vertical" !== (y = g) && "horizontal" !== y ? "horizontal" : y;
    var y;
    const b = new Map([ [ "body-horizontal", "body-vertical" ], [ "body-vertical", "body-horizontal" ] ]), v = (e = f) => {
        const t = d(), o = document.body;
        if (t.invisible || t.disabled) o.classList.remove("body-vertical", "body-horizontal"); else if (e) {
            const t = "body-" + e, a = b.get(t);
            o.classList.toggle(a, !1), o.classList.toggle(t, !0);
        }
    }, k = (e = f) => {
        const t = d();
        if (t.invisible || t.disabled) i(".as-custom-style"); else if (t.style) {
            let o = "";
            t.style[1] && "horizontal" === e ? o = t.style[1] : t.style[2] && "vertical" === e && (o = t.style[2]), 
            o && c(o, "as-custom-style", void 0, !0);
        }
    }, x = function() {
        w = d(), w.invisible || w.disabled ? i(".as-style") : l("as-style", `https://cdn.jsdelivr.net/npm/all-search@${o}/build/as-style.css`);
    }, Z = function() {
        var e, t, o;
        Node.prototype.removeChild = (e = Node.prototype.removeChild, t = e => !e || "STYLE" !== e.tagName || !(e.classList.contains("as-icon") || e.classList.contains("as-style")), 
        function() {
            if (!1 !== t.apply(this, arguments)) return e.apply(this, arguments);
        }), k(), v(), l("as-icon", "https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css"), 
        x(), o = () => {
            w = d(), k(), v(), x();
        }, history.pushState = p(history.pushState, o), history.replaceState = p(history.replaceState, o), 
        window.addEventListener("yt-navigate-finish", o);
    }, q = r("mode"), C = e => "vertical" !== e && "horizontal" !== e ? "horizontal" : e, N = e.ref(C(q)), _ = (e = "horizontal") => {
        v(e), k(e);
    };
    !function(e) {
        const t = function() {
            document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || e();
        };
        document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), 
        document.addEventListener("mozfullscreenchange", e), document.addEventListener("MSFullscreenChange", e), 
        document.addEventListener("resize", t);
    }(() => {
        _(N.value);
    }), e.watch(N, e => {
        const t = C(e);
        _(t), s("mode", t);
    });
    const S = function(e, t = 500) {
        let o = null;
        return function() {
            clearTimeout(o), o = setTimeout(() => {
                e.apply(this, arguments);
            }, t);
        };
    }(() => _(N.value));
    function V() {
        return e.onMounted(() => {
            _(N.value), window.addEventListener("resize", S, !1);
        }), e.onUnmounted(() => {
            window.removeEventListener("resize", S, !1);
        }), {
            mode: N
        };
    }
    var M = {
        name: "logo",
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].indexOf(e) > -1
            }
        }
    };
    const B = e.createVNode("p", {
        class: "as-title-inner"
    }, " All Search ", -1);
    M.render = function(t, o, a, n, r, s) {
        return e.openBlock(), e.createBlock("a", {
            class: [ "as-title", "as-title-" + a.mode ],
            href: "https://github.com/endday/all-search",
            target: "_blank"
        }, [ B ], 2);
    }, M.__file = "src/components/logo.vue";
    let z = document.createElement("a");
    function T(e) {
        let t = e;
        if (t.indexOf("//") < 0) t = "//" + t; else {
            if (!(t.indexOf("//") > -1)) return z;
            {
                const e = t.toLowerCase();
                e.startsWith("http://") || e.startsWith("https://") || e.startsWith("ftp://") || e.startsWith("files://") || (t = t.replace(/.*\/\//, "//"));
            }
        }
        return z.href = t, {
            href: z.href,
            origin: z.origin,
            protocol: z.protocol,
            host: z.host,
            hostname: z.hostname,
            port: z.port,
            pathname: z.pathname,
            search: z.search,
            hash: z.hash
        };
    }
    const L = [ {
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
            const {hostname: o} = T(t.url);
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
    function E(e) {
        let t = L;
        const a = r("sites"), n = r("sites-version");
        return a && (t = a, a && n && (n !== o || "tm" !== e) && (t = function(e, t) {
            const o = JSON.parse(JSON.stringify(e));
            let a = JSON.parse(JSON.stringify(t.filter(e => "personal" !== e.name)));
            return a.forEach(e => {
                const t = o.find(t => t.name === e.name);
                t && (e.list.forEach(e => {
                    const o = t.list.findIndex(t => t.id === e.id);
                    o > -1 && (Object.keys(e).forEach(a => {
                        "data" !== a && (t.list[o][a] = e[a]);
                    }), e.isAdd = !0);
                }), e.list = e.list.filter(e => !e.isAdd), e.list.length && (t.list = t.list.concat(e.list)), 
                e.isAdd = !0);
            }), a = a.filter(e => !e.isAdd), a.length && o.push(...a), o;
        }(a, L), s("sites", t), s("sites-version", o))), "tm" === e && (t = t.filter(e => e.list && e.list.length > 0 && e.data && e.data.visible).map(e => ({
            ...e,
            show: !1
        }))), t;
    }
    var D = {
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
            const a = () => {
                o && clearTimeout(o);
            };
            return {
                handleMouseEnter: () => {
                    e.disabled || (a(), o = setTimeout(() => {
                        t.emit("show", !0);
                    }, e.showTimeout));
                },
                handleMouseLeave: () => {
                    e.disabled || (a(), o = setTimeout(() => {
                        t.emit("show", !1);
                    }, e.hideTimeout));
                }
            };
        }
    };
    D.render = function(t, o, a, n, r, s) {
        return e.openBlock(), e.createBlock("li", {
            onMouseenter: o[1] || (o[1] = e => n.handleMouseEnter(e)),
            onMouseleave: o[2] || (o[2] = e => n.handleMouseLeave(e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, D.__file = "src/components/menuItem.vue";
    var I = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    I.render = function(t, o, a, n, r, s) {
        return e.openBlock(), e.createBlock("i", {
            class: [ "as-menu-item-icon", "icon-" + a.name ]
        }, null, 2);
    }, I.__file = "src/components/icon.vue";
    const A = r("align"), j = new Map([ [ "flex-start", "开始" ], [ "center", "居中" ], [ "flex-end", "末尾" ] ]), F = e => j.has(e) ? e : "flex-start", O = e.ref(F(A)), U = e.reactive(j);
    function G() {
        return {
            alignList: U,
            align: O
        };
    }
    e.watch(O, e => {
        s("align", F(e));
    });
    var $ = {
        name: "as-menu",
        components: {
            menuItem: D,
            icon: I
        },
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].indexOf(e) > -1
            }
        },
        setup(t) {
            const o = e.reactive(E("tm")), a = d(), n = e.reactive({
                showTimeout: 50,
                hideTimeout: 200
            }), r = e.computed(() => "horizontal" === t.mode ? "drop" : "fade"), s = () => a && a.keyword ? a.keyword() : function() {
                const e = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                return e ? "INPUT" === e.nodeName || "textarea" === e.localName ? e.value : e.textContent : "";
            }();
            const {align: l} = G();
            return {
                sites: o,
                data: n,
                align: l,
                transition: r,
                handleClick: (e, t) => {
                    const o = s();
                    t ? window.open(e.url.replace("%s", o)) : window.location.href = e.url.replace("%s", o);
                },
                handleMenuShow: (e, t) => {
                    t.show = e;
                },
                getFavicon: function(e) {
                    const t = T(e), o = t.host.split(".");
                    let a = t.host;
                    return o.length > 2 && (a = o.slice(1).join(".")), `https://ico.ihuan.me/${a}/cdn.ico`;
                }
            };
        }
    };
    const W = {
        class: "as-menu-item-title"
    }, J = {
        key: 0,
        class: "as-subMenu-container"
    }, R = {
        class: "as-subMenu"
    }, H = {
        class: "as-url-icon"
    };
    $.render = function(t, o, a, n, r, s) {
        const l = e.resolveComponent("icon"), i = e.resolveComponent("menu-item");
        return e.openBlock(), e.createBlock("ul", {
            class: "as-menu",
            style: {
                justifyContent: n.align
            }
        }, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(n.sites, t => (e.openBlock(), 
        e.createBlock(i, {
            class: "as-menu-item",
            key: t.index,
            showTimeout: n.data.showTimeout,
            hideTimeout: n.data.hideTimeout,
            onShow: e => n.handleMenuShow(e, t)
        }, {
            default: e.withCtx(() => [ e.createVNode("div", W, [ e.createVNode(l, {
                name: t.name
            }, null, 8, [ "name" ]), e.createVNode("span", {
                textContent: e.toDisplayString(t.nameZh),
                onClick: e => n.handleClick(t.list[0]),
                onMouseup: e.withModifiers(e => n.handleClick(t.list[0], !0), [ "middle" ])
            }, null, 40, [ "textContent", "onClick", "onMouseup" ]) ]), e.createVNode(e.Transition, {
                name: n.transition
            }, {
                default: e.withCtx(() => [ t.list && t.list.length ? e.withDirectives((e.openBlock(), 
                e.createBlock("div", J, [ e.createVNode("ul", R, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(t.list, (t, o) => e.withDirectives((e.openBlock(), 
                e.createBlock("li", {
                    key: o,
                    onClick: e => n.handleClick(t),
                    onMouseup: e.withModifiers(e => n.handleClick(t, !0), [ "middle" ])
                }, [ e.createVNode("div", H, [ e.createVNode("img", {
                    src: n.getFavicon(t.url),
                    onerror: "this.classList.add('error')"
                }, null, 8, [ "src" ]) ]), e.createVNode("p", {
                    class: "as-subMenu-text",
                    textContent: e.toDisplayString(t.nameZh)
                }, null, 8, [ "textContent" ]) ], 40, [ "onClick", "onMouseup" ])), [ [ e.vShow, t.data.visible ] ])), 128)) ]) ], 512)), [ [ e.vShow, t.show ] ]) : e.createCommentVNode("v-if", !0) ]),
                _: 2
            }, 1032, [ "name" ]) ]),
            _: 2
        }, 1032, [ "showTimeout", "hideTimeout", "onShow" ]))), 128)) ], 4);
    }, $.__file = "src/components/menu.vue";
    var P = {
        name: "overlay",
        setup(e, {emit: t}) {
            let o = !1, a = !1;
            return {
                onMouseDown: e => {
                    o = e.target === e.currentTarget;
                },
                onMouseUp: e => {
                    a = e.target === e.currentTarget;
                },
                onMaskClick: e => {
                    o && a && t("click", e), o = a = !1;
                }
            };
        }
    };
    P.render = function(t, o, a, n, r, s) {
        return e.openBlock(), e.createBlock("div", {
            class: "as-overlay",
            onMousedown: o[1] || (o[1] = (...e) => n.onMouseDown && n.onMouseDown(...e)),
            onMouseup: o[2] || (o[2] = (...e) => n.onMouseUp && n.onMouseUp(...e)),
            onClick: o[3] || (o[3] = (...e) => n.onMaskClick && n.onMaskClick(...e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, P.__file = "src/components/overlay.vue";
    var Q = {
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
            model: e.computed({
                get: () => t.modelValue,
                set(e) {
                    o.emit("update:modelValue", e);
                }
            })
        })
    };
    const Y = {
        class: "as-radio as-radio-animate"
    }, K = e.createVNode("i", {
        class: "as-radio-icon"
    }, null, -1), X = {
        class: "as-radio-label"
    };
    Q.render = function(t, o, a, n, r, s) {
        return e.openBlock(), e.createBlock("label", Y, [ e.withDirectives(e.createVNode("input", {
            type: "radio",
            value: a.label,
            "onUpdate:modelValue": o[1] || (o[1] = e => n.model = e)
        }, null, 8, [ "value" ]), [ [ e.vModelRadio, n.model ] ]), K, e.createVNode("span", X, [ e.renderSlot(t.$slots, "default") ]) ]);
    }, Q.__file = "src/components/radio.vue";
    var ee = {
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
    ee.render = function(t, o, a, n, r, s) {
        return e.openBlock(), e.createBlock("div", null, [ e.createVNode("label", {
            class: "as-label",
            style: n.labelStyle,
            textContent: e.toDisplayString(a.label)
        }, null, 12, [ "textContent" ]), e.createVNode("div", {
            class: "as-content",
            style: n.contentStyle
        }, [ e.renderSlot(t.$slots, "default") ], 4) ]);
    }, ee.__file = "src/components/form-item.vue";
    var te = {
        name: "side-bar",
        components: {
            overlay: P,
            asRadio: Q,
            formItem: ee
        },
        setup() {
            const t = e.ref(!1), {mode: o} = V(), {alignList: a, align: n} = G();
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
                alignList: a,
                align: n,
                changeAlign: e => {
                    n.value = e.target.value;
                }
            };
        }
    };
    const oe = e.createVNode("header", {
        class: "header"
    }, " 设置 ", -1), ae = e.createTextVNode("横向 "), ne = e.createTextVNode("竖向 "), re = e.createVNode("footer", null, [ e.createVNode("a", {
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
    te.render = function(t, o, a, n, r, s) {
        const l = e.resolveComponent("as-radio"), i = e.resolveComponent("form-item"), c = e.resolveComponent("overlay");
        return e.openBlock(), e.createBlock(e.Fragment, null, [ e.createVNode("div", {
            class: "as-setting",
            onClick: o[1] || (o[1] = (...e) => n.open && n.open(...e))
        }, " 设置 "), (e.openBlock(), e.createBlock(e.Teleport, {
            to: "#all-search"
        }, [ e.createVNode(e.Transition, {
            name: "overlay",
            appear: ""
        }, {
            default: e.withCtx(() => [ e.withDirectives(e.createVNode(c, {
                onClick: n.onMaskClick
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
                    }, [ oe, e.createVNode("section", null, [ e.createVNode(i, {
                        label: "方向"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(l, {
                            label: "horizontal",
                            modelValue: n.mode,
                            "onUpdate:modelValue": o[2] || (o[2] = e => n.mode = e),
                            onChange: n.changeMode
                        }, {
                            default: e.withCtx(() => [ ae ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]), e.createVNode(l, {
                            label: "vertical",
                            modelValue: n.mode,
                            "onUpdate:modelValue": o[3] || (o[3] = e => n.mode = e),
                            onChange: n.changeMode
                        }, {
                            default: e.withCtx(() => [ ne ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]) ]),
                        _: 1
                    }), e.createVNode(i, {
                        label: "对齐"
                    }, {
                        default: e.withCtx(() => [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(n.alignList, ([t, a]) => (e.openBlock(), 
                        e.createBlock(l, {
                            label: t,
                            modelValue: n.align,
                            "onUpdate:modelValue": o[4] || (o[4] = e => n.align = e),
                            onChange: n.changeAlign
                        }, {
                            default: e.withCtx(() => [ e.createTextVNode(e.toDisplayString(a), 1) ]),
                            _: 2
                        }, 1032, [ "label", "modelValue", "onChange" ]))), 256)) ]),
                        _: 1
                    }), e.createCommentVNode('<form-item label="主题色">\r\n                <color/>\r\n              </form-item>\r\n              <form-item label="背景色">\r\n                <color/>\r\n              </form-item>') ]), re ], 512), [ [ e.vShow, n.visible ] ]) ]),
                    _: 1
                }) ]),
                _: 1
            }, 8, [ "onClick" ]), [ [ e.vShow, n.visible ] ]) ]),
            _: 1
        }) ])) ], 64);
    }, te.__file = "src/components/side-bar.vue";
    var se = {
        name: "all-search",
        components: {
            logo: M,
            asMenu: $,
            sideBar: te
        },
        setup() {
            const t = d(), o = e.computed(() => "as-" + a.value), {mode: a} = V();
            return Z(), {
                currentSite: t,
                mode: a,
                classList: o
            };
        }
    };
    se.render = function(t, o, a, n, r, s) {
        const l = e.resolveComponent("logo"), i = e.resolveComponent("as-menu"), c = e.resolveComponent("side-bar");
        return e.openBlock(), e.createBlock("div", {
            class: [ "as-container", n.classList ],
            style: {
                display: "none"
            }
        }, [ e.createVNode(l, {
            mode: n.mode
        }, null, 8, [ "mode" ]), e.createVNode(i, {
            mode: n.mode
        }, null, 8, [ "mode" ]), e.createVNode(c) ], 2);
    }, se.__file = "src/as-script/index.vue";
    let le = d();
    const ie = e.createApp(se);
    function ce() {
        le = d();
        const e = document.getElementById("all-search");
        if (e) e.style.display = le.invisible ? "none" : "unset"; else {
            const e = function() {
                let e = document.createElement("div");
                return e.id = "all-search", e;
            }(), t = document.body.parentElement.insertBefore(e, document.body);
            ie.mount(t), function() {
                const e = function() {
                    document.dispatchEvent(new CustomEvent(u, {
                        detail: {
                            version: o,
                            getSession: r,
                            setSession: s
                        }
                    }));
                };
                document.addEventListener(m, e), e();
            }();
        }
    }
    console.log("all-search running 全搜运行中(production)"), function() {
        let e = 0;
        return new Promise((t, o) => {
            if (document && document.body) t(); else {
                const a = setInterval((function() {
                    e += 1, document && document.body && (clearInterval(a), t()), 50 === e && (clearInterval(a), 
                    o(new Error("timeOut")));
                }), 200);
            }
        });
    }().then(() => {
        ce();
    }).catch(e => {
        console.error(e);
    });
}(Vue);
