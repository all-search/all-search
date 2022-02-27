// ==UserScript==
// @name         all-search 全搜v1.1.10，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      1.1.10
// @description  2022年2月27日更新 竖向横向布局随意切换，支持图形界面自定义设置分类和添加链接，个人配置自动保存到谷歌插件。
// @author       endday
// @license      GPL-2.0
// @update       2022/2/27
// @homepageURL  https://github.com/endday/all-search
// @updateURL    https://cdn.jsdelivr.net/npm/all-search@latest/build/index.user.js
// @downloadURL  https://cdn.jsdelivr.net/npm/all-search@latest/build/index.user.js
// @noframes
// @require      https://cdn.bootcdn.net/ajax/libs/vue/3.1.2/vue.global.prod.min.js
// @resource     as-icon  https://cdn.jsdelivr.net/npm/all-search@1.1.10/src/assets/iconfont.css
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search@1.1.10/build/as-style.css
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText

// @include      /\/\/www\.google\.com(.hk)?\/search/
// @include      /\/\/www\.baidu\.com\/$/
// @include      /\/\/www\.baidu\.com\/s\?/
// @include      /\/\/www\.baidu\.com\/baidu\?/
// @include      /\/\/[^.]*\.bing\.com\/search/
// @include      /\/\/duckduckgo\.com\/*/
// @include      /\/\/search\.yahoo\.com\/search/
// @include      /\/\/tw\.search\.yahoo\.com\/search/
// @include      /\/\/searx\.me\/\?q/
// @include      /\/\/www\.sogou\.com\/(?:web|s)/
// @include      /\/\/yandex\.com\/search/
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
// @include      /\/\/www\.startpage\.com\/sp\/search/
// @include      /\/\/endday\.github\.io/
// @include      /\/\/endday\.gitee\.io/

// ==/UserScript==
/* eslint-disable */

!function(e) {
    "use strict";
    var t = "default" in e ? e.default : e, n = "1.1.10";
    e.reactive({
        tmVersion: ""
    });
    const o = n;
    function r(e, t) {
        t = t || window.location.href;
        const n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)"), o = t.match(n);
        return decodeURIComponent(o ? o[2] : "");
    }
    function a(e) {
        return e ? "__allSearch__" + e : null;
    }
    let i = function(e) {
        const t = a(e);
        let n;
        if (n = window.GM_getValue ? window.GM_getValue(t) : window.localStorage.getItem(t), 
        n) try {
            return JSON.parse(n);
        } catch (e) {
            return n;
        }
        return null;
    }, s = function(e, t) {
        const n = a(e);
        if (window.GM_setValue) window.GM_setValue(n, t); else {
            const e = JSON.stringify(t);
            e && window.localStorage.setItem(n, e);
        }
    };
    function l(e, t) {
        let n;
        window.GM_getResourceText && (n = window.GM_getResourceText(e)), n ? u(n, e) : function(e, t) {
            if (!e) return;
            if (t) {
                const e = document.styleSheets;
                for (let n = 0; n < e.length; n++) if (e[n].ownerNode.className === t) return;
            }
            const n = document.createElement("link");
            n.href = e, n.rel = "stylesheet", n.type = "text/css", n.crossorigin = "anonymous", 
            document.getElementsByTagName("head")[0].appendChild(n);
        }(t, e);
    }
    function c(e) {
        try {
            if ("string" == typeof e) {
                let t = document.querySelectorAll(e);
                for (let e = 0; e < t.length; e++) t[e].remove();
            } else "function" == typeof e ? e() : console.log("未知命令：" + e);
        } catch (e) {
            console.log(e);
        }
    }
    function u(e, t, n, o = !1) {
        !function(e, t, n) {
            const o = t / 1e3 * 60;
            let r = 0;
            if (!0 === n) {
                if (e()) return;
            }
            requestAnimationFrame((function t() {
                if (r < o) r++, requestAnimationFrame(t); else {
                    e() || !1 || (r = 0, requestAnimationFrame(t));
                }
            }));
        }((function() {
            let r = document.querySelector(n);
            if (void 0 === n && (r = document.body || document.head || document.documentElement || document), 
            void 0 === n || void 0 !== n && null !== document.querySelector(n)) {
                if (o) c("." + t); else if (!o && null !== document.querySelector("." + t)) return !0;
                let n = document.createElement("style");
                t && (n.className = t), n.setAttribute("type", "text/css"), n.innerHTML = e;
                try {
                    r.appendChild(n);
                } catch (e) {
                    console.log(e.message);
                }
                return !0;
            }
        }), 20, !0);
    }
    const d = a("script-loaded"), p = a("page-loaded");
    const f = [ {
        url: /\/\/www\.google\.com(.hk)?\/search/,
        style: {
            1: ".srp #searchform:not(.minidiv){top: 50px !important;}#searchform.minidiv{top: 30px !important;}"
        }
    }, {
        url: /\/\/www\.baidu\.com\/$/,
        invisible: !0
    }, {
        url: /\/\/www\.baidu\.com\/s\?/,
        style: {
            1: ".fix-head { top: 30px !important; }",
            2: ".fix-head #u { right: 100px; }"
        }
    }, {
        url: /\/\/www\.baidu\.com\/baidu\?/,
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
        keyword: () => document.getElementById("upquery").value
    }, {
        url: /\/\/yandex\.com\/search/,
        style: {
            1: "body { margin: 30px!important; }"
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
        url: /\/\/www\.so\.com\/s/,
        style: {
            2: ".body-vertical #header { z-index: 2000!important; }"
        }
    }, {
        url: /\/\/so\.baike\.com\/doc/
    }, {
        url: /\/\/www\.baike\.com\/wiki/
    }, {
        url: /\/\/www\.docin\.com\/search\.do/
    }, {
        url: /\/\/zhihu\.sogou\.com\/zhihu/,
        keyword: () => document.getElementById("upquery").value,
        style: {
            1: ".header { top:30px }"
        }
    }, {
        url: /\/\/weixin\.sogou\.com\/weixin\?/,
        style: {
            2: ".headsearch#scroll-header { left:unset; }"
        }
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
            1: "#masthead-container.ytd-app {top:30px !important;}\n          html:not(.style-scope) {--ytd-toolbar-height:86px !important;}\n          ytd-mini-guide-renderer.ytd-app {padding-top: 30px;}",
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
        url: /\/\/huaban\.com\/search\/\?/,
        style: {
            1: "#header  { top: 30px; }"
        }
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
        keyword: () => r("text") || r("q")
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
        url: /\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
        style: {
            1: "#head_wr.gj #head.gj, #left_menu_content { top: 30px !important;}",
            2: "#left_menu_content { left: 100px !important;}"
        }
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
        url: /\/\/www\.startpage\.com\/sp\/search/,
        style: {
            1: ".layout-web__header {top: 30px !important;}"
        }
    }, {
        url: /\/\/endday\.github\.io/,
        invisible: !0
    }, {
        url: /\/\/endday\.gitee\.io/,
        invisible: !0
    } ], m = function() {
        const e = f.find(e => e.url.test(window.location.href.toLowerCase()));
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
    function h(e, t) {
        return function() {
            const n = e.apply(this, arguments);
            return t.apply(this, arguments), n;
        };
    }
    let g = m();
    const y = i("mode"), w = "vertical" !== (b = y) && "horizontal" !== b ? "horizontal" : b;
    var b;
    const v = (e = w) => {
        g = m();
        const t = document.body;
        if (t.classList.remove("body-vertical", "body-horizontal"), e) {
            const n = "body-" + e;
            t.classList.add(n);
        }
    }, x = (e = w) => {
        if (g = m(), c(".as-custom-style"), g.style) {
            let t = "";
            g.style[1] && "horizontal" === e ? t = g.style[1] : g.style[2] && "vertical" === e && (t = g.style[2]), 
            t && u(t, "as-custom-style");
        }
    }, k = function() {
        g = m(), g.invisible || g.disabled ? c(".as-style") : l("as-style", `https://cdn.jsdelivr.net/npm/all-search@${o}/build/as-style.css`);
    }, O = function() {
        var e, t, n;
        Node.prototype.removeChild = (e = Node.prototype.removeChild, t = e => !e || "STYLE" !== e.tagName || !(e.classList.contains("as-icon") || e.classList.contains("as-style")), 
        function() {
            if (!1 !== t.apply(this, arguments)) return e.apply(this, arguments);
        }), x(), v(), l("as-icon", `https://cdn.jsdelivr.net/npm/all-search@${o}/src/assets/iconfont.css`), 
        k(), n = () => {
            g = m(), x(), v(), k();
        }, history.pushState = h(history.pushState, n), history.replaceState = h(history.replaceState, n), 
        window.addEventListener("yt-navigate-finish", n);
    }, E = i("mode"), C = e => "vertical" !== e && "horizontal" !== e ? "horizontal" : e, S = e.ref(C(E)), M = (e = "horizontal") => {
        v(e), x(e);
    };
    !function(e) {
        const t = function() {
            document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || e();
        };
        document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), 
        document.addEventListener("mozfullscreenchange", e), document.addEventListener("MSFullscreenChange", e), 
        document.addEventListener("resize", t);
    }(() => {
        M(S.value);
    }), e.watch(S, e => {
        const t = C(e);
        M(t), s("mode", t);
    });
    const N = function(e, t = 500) {
        let n = null;
        return function() {
            clearTimeout(n), n = setTimeout(() => {
                e.apply(this, arguments);
            }, t);
        };
    }(() => M(S.value));
    function T() {
        return e.onMounted(() => {
            M(S.value), window.addEventListener("resize", N, !1);
        }), e.onUnmounted(() => {
            window.removeEventListener("resize", N, !1);
        }), {
            mode: S
        };
    }
    var P = {
        name: "logo",
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].indexOf(e) > -1
            }
        }
    };
    const _ = e.createVNode("p", {
        class: "as-title-inner"
    }, " All Search ", -1);
    P.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("a", {
            class: [ "as-title", "as-title-" + o.mode ],
            href: "https://github.com/endday/all-search",
            target: "_blank"
        }, [ _ ], 2);
    }, P.__file = "src/components/logo.vue";
    let A = document.createElement("a");
    function j(e) {
        let t = e;
        if (t.indexOf("//") < 0) t = "//" + t; else {
            if (!(t.indexOf("//") > -1)) return A;
            t = function(e) {
                const t = e.toLowerCase(), n = [ "http://", "https://", "ftp://", "files://" ];
                for (let o = 0; o < n.length; o++) if (0 === t.indexOf(n[o])) return e.replace(/.*\/\//, "//");
                return e;
            }(t);
        }
        return A.href = t, {
            href: A.href,
            origin: A.origin,
            protocol: A.protocol,
            host: A.host,
            hostname: A.hostname,
            port: A.port,
            pathname: A.pathname,
            search: A.search,
            hash: A.hash
        };
    }
    const B = [ {
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
            nameZh: "Yandex",
            url: "https://yandex.com/search/?text=%s"
        }, {
            nameZh: "startpage",
            url: "https://www.startpage.com/sp/search?query=%s",
            icon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
        } ]
    }, {
        nameZh: "翻译",
        name: "translate",
        list: [ {
            nameZh: "百度翻译",
            url: "http://fanyi.baidu.com/#auto/zh/%s"
        }, {
            nameZh: "DeepL",
            url: "https://www.deepl.com/translator#zh/en/%s",
            icon: "https://www.deepl.com/img/favicon/favicon_96.png"
        }, {
            nameZh: "谷歌翻译",
            url: "https://translate.google.com/?q=%s"
        }, {
            nameZh: "有道词典",
            url: "http://dict.youdao.com/search?q=%s",
            icon: "https://shared.ydstatic.com/images/favicon.ico"
        }, {
            nameZh: "必应翻译",
            url: "http://cn.bing.com/dict/search?q=%s"
        } ]
    }, {
        nameZh: "视频",
        name: "video",
        list: [ {
            nameZh: "bilibili",
            url: "http://search.bilibili.com/all?keyword=%s"
        }, {
            nameZh: "腾讯视频",
            url: "https://v.qq.com/x/search/?q=%s"
        }, {
            nameZh: "爱奇艺",
            url: "http://so.iqiyi.com/so/q_%s",
            icon: "https://www.iqiyi.com/favicon.ico"
        }, {
            nameZh: "youtube",
            url: "https://www.youtube.com/results?search_query=%s"
        }, {
            nameZh: "优酷",
            url: "http://www.soku.com/search_video/q_%s",
            icon: "https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png"
        }, {
            nameZh: "AcFun",
            url: "https://www.acfun.cn/search?keyword=%s"
        }, {
            nameZh: "搜狐",
            url: "http://so.tv.sohu.com/mts?wd=%s"
        }, {
            nameZh: "niconico",
            url: "http://www.nicovideo.jp/search/%s"
        } ]
    }, {
        nameZh: "购物",
        name: "shopping",
        list: [ {
            nameZh: "淘宝",
            url: "http://s.taobao.com/search?q=%s",
            icon: "https://www.taobao.com/favicon.ico"
        }, {
            nameZh: "京东",
            url: "http://search.jd.com/search?keyword=%s&enc=utf-8",
            icon: "https://www.jd.com/favicon.ico"
        }, {
            nameZh: "苏宁",
            url: "https://search.suning.com/%s/"
        }, {
            nameZh: "亚马逊",
            url: "http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s",
            icon: "https://www.amazon.cn/favicon.ico"
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
            url: "http://music.163.com/#/search/m/?s=%s",
            icon: "https://s1.music.126.net/style/favicon.ico"
        }, {
            nameZh: "一听",
            url: "http://so.1ting.com/all.do?q=%s"
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
            url: "http://caniuse.com/#search=%s",
            icon: "https://caniuse.com/img/favicon-128.png"
        }, {
            nameZh: "GitHub",
            url: "https://github.com/search?utf8=✓&q=%s"
        }, {
            nameZh: "w3c",
            url: "http://www.runoob.com/?s=%s"
        }, {
            nameZh: "GreasyFork",
            url: "https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓",
            icon: "https://greasyfork.org/packs/media/images/blacklogo96-b2384000fca45aa17e45eb417cbcbb59.png"
        } ]
    }, {
        nameZh: "新闻",
        name: "news",
        list: [ {
            nameZh: "谷歌中文",
            url: "https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
            icon: "https://www.google.com/favicon.ico"
        }, {
            nameZh: "百度新闻",
            url: "http://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1",
            icon: "https://www.baidu.com/favicon.ico"
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
            url: "https://zh.moegirl.org/%s",
            icon: "https://zh.moegirl.org.cn/favicon.ico"
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
            nameZh: "Pinterest",
            url: "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta"
        }, {
            nameZh: "yandex",
            url: "https://yandex.com/images/search?text=%s"
        }, {
            nameZh: "pixabay",
            url: "https://pixabay.com/images/search/%s/",
            icon: "https://pixabay.com/favicon-32x32.png"
        }, {
            nameZh: "unsplash",
            url: "https://unsplash.com/s/photos/%s"
        } ]
    }, {
        nameZh: "网盘",
        name: "disk",
        list: [ {
            nameZh: "百度网盘",
            url: "https://pan.baidu.com/disk/home?#/search?key=%s"
        }, {
            nameZh: "大力盘",
            url: "https://www.dalipan.com/search?keyword=%s"
        }, {
            nameZh: "大圣盘",
            url: "https://www.dashengpan.com/search?keyword=%s"
        }, {
            nameZh: "罗马盘",
            url: "https://www.luomapan.com/search?keyword=%s"
        }, {
            nameZh: "小白盘",
            url: "https://www.xiaobaipan.com/list-%s.html?from=1"
        }, {
            nameZh: "56网盘",
            url: "https://www.56wangpan.com/search/kw%s"
        } ]
    }, {
        nameZh: "常用",
        name: "personal",
        list: []
    } ].map(e => ({
        ...e,
        list: e.list.map(t => {
            const {hostname: n} = j(t.url);
            return {
                ...t,
                id: `${e.name}-${n}`,
                data: {
                    visible: !0
                }
            };
        }),
        data: {
            visible: !0
        }
    }));
    function L(e) {
        let t = B;
        const n = i("sites"), r = i("sites-version");
        return n && (t = n, n && r && (r !== o || "tm" !== e) && (t = function(e, t) {
            const n = JSON.parse(JSON.stringify(e));
            let o = JSON.parse(JSON.stringify(t.filter(e => "personal" !== e.name)));
            return o.forEach(e => {
                const t = n.find(t => t.name === e.name);
                t && (e.list.forEach(e => {
                    const n = t.list.findIndex(t => t.id === e.id);
                    n > -1 && (Object.keys(e).forEach(o => {
                        "data" !== o && (t.list[n][o] = e[o]);
                    }), e.isAdd = !0);
                }), e.list = e.list.filter(e => !e.isAdd), e.list.length && (t.list = t.list.concat(e.list)), 
                e.isAdd = !0);
            }), o = o.filter(e => !e.isAdd), o.length && n.push(...o), n;
        }(n, B), s("sites", t), s("sites-version", o))), "tm" === e && (t = t.filter(e => e.list && e.list.length > 0 && e.data && e.data.visible).map(e => ({
            ...e,
            show: !1
        }))), t;
    }
    function D(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    }
    function V(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports;
    }
    var I = V((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        class n extends Error {
            constructor(e) {
                super(e), this.name = "ElementPlusError";
            }
        }
        t.default = (e, t) => {
            throw new n(`[${e}] ${t}`);
        }, t.warn = function(e, t) {
            console.warn(new n(`[${e}] ${t}`));
        };
    }));
    D(I);
    I.warn;
    var F = "top", Z = "bottom", q = "right", z = "left", R = [ F, Z, q, z ], U = R.reduce((function(e, t) {
        return e.concat([ t + "-start", t + "-end" ]);
    }), []), H = [].concat(R, [ "auto" ]).reduce((function(e, t) {
        return e.concat([ t, t + "-start", t + "-end" ]);
    }), []), $ = [ "beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite" ];
    function W(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
    }
    function G(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window;
        }
        return e;
    }
    function Y(e) {
        return e instanceof G(e).Element || e instanceof Element;
    }
    function X(e) {
        return e instanceof G(e).HTMLElement || e instanceof HTMLElement;
    }
    function K(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof G(e).ShadowRoot || e instanceof ShadowRoot);
    }
    var J = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var t = e.state;
            Object.keys(t.elements).forEach((function(e) {
                var n = t.styles[e] || {}, o = t.attributes[e] || {}, r = t.elements[e];
                X(r) && W(r) && (Object.assign(r.style, n), Object.keys(o).forEach((function(e) {
                    var t = o[e];
                    !1 === t ? r.removeAttribute(e) : r.setAttribute(e, !0 === t ? "" : t);
                })));
            }));
        },
        effect: function(e) {
            var t = e.state, n = {
                popper: {
                    position: t.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
            return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), 
            function() {
                Object.keys(t.elements).forEach((function(e) {
                    var o = t.elements[e], r = t.attributes[e] || {}, a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                        return e[t] = "", e;
                    }), {});
                    X(o) && W(o) && (Object.assign(o.style, a), Object.keys(r).forEach((function(e) {
                        o.removeAttribute(e);
                    })));
                }));
            };
        },
        requires: [ "computeStyles" ]
    };
    function Q(e) {
        return e.split("-")[0];
    }
    function ee(e) {
        var t = e.getBoundingClientRect();
        return {
            width: t.width,
            height: t.height,
            top: t.top,
            right: t.right,
            bottom: t.bottom,
            left: t.left,
            x: t.left,
            y: t.top
        };
    }
    function te(e) {
        var t = ee(e), n = e.offsetWidth, o = e.offsetHeight;
        return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), 
        {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: n,
            height: o
        };
    }
    function ne(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && K(n)) {
            var o = t;
            do {
                if (o && e.isSameNode(o)) return !0;
                o = o.parentNode || o.host;
            } while (o);
        }
        return !1;
    }
    function oe(e) {
        return G(e).getComputedStyle(e);
    }
    function re(e) {
        return [ "table", "td", "th" ].indexOf(W(e)) >= 0;
    }
    function ae(e) {
        return ((Y(e) ? e.ownerDocument : e.document) || window.document).documentElement;
    }
    function ie(e) {
        return "html" === W(e) ? e : e.assignedSlot || e.parentNode || (K(e) ? e.host : null) || ae(e);
    }
    function se(e) {
        return X(e) && "fixed" !== oe(e).position ? e.offsetParent : null;
    }
    function le(e) {
        for (var t = G(e), n = se(e); n && re(n) && "static" === oe(n).position; ) n = se(n);
        return n && ("html" === W(n) || "body" === W(n) && "static" === oe(n).position) ? t : n || function(e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && X(e) && "fixed" === oe(e).position) return null;
            for (var n = ie(e); X(n) && [ "html", "body" ].indexOf(W(n)) < 0; ) {
                var o = oe(n);
                if ("none" !== o.transform || "none" !== o.perspective || "paint" === o.contain || -1 !== [ "transform", "perspective" ].indexOf(o.willChange) || t && "filter" === o.willChange || t && o.filter && "none" !== o.filter) return n;
                n = n.parentNode;
            }
            return null;
        }(e) || t;
    }
    function ce(e) {
        return [ "top", "bottom" ].indexOf(e) >= 0 ? "x" : "y";
    }
    var ue = Math.max, de = Math.min, pe = Math.round;
    function fe(e, t, n) {
        return ue(e, de(t, n));
    }
    function me(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e);
    }
    function he(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e, t;
        }), {});
    }
    var ge = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t, n = e.state, o = e.name, r = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, s = Q(n.placement), l = ce(s), c = [ z, q ].indexOf(s) >= 0 ? "height" : "width";
            if (a && i) {
                var u = function(e, t) {
                    return me("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                        placement: t.placement
                    })) : e) ? e : he(e, R));
                }(r.padding, n), d = te(a), p = "y" === l ? F : z, f = "y" === l ? Z : q, m = n.rects.reference[c] + n.rects.reference[l] - i[l] - n.rects.popper[c], h = i[l] - n.rects.reference[l], g = le(a), y = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0, w = m / 2 - h / 2, b = u[p], v = y - d[c] - u[f], x = y / 2 - d[c] / 2 + w, k = fe(b, x, v), O = l;
                n.modifiersData[o] = ((t = {})[O] = k, t.centerOffset = k - x, t);
            }
        },
        effect: function(e) {
            var t = e.state, n = e.options.element, o = void 0 === n ? "[data-popper-arrow]" : n;
            null != o && ("string" != typeof o || (o = t.elements.popper.querySelector(o))) && ne(t.elements.popper, o) && (t.elements.arrow = o);
        },
        requires: [ "popperOffsets" ],
        requiresIfExists: [ "preventOverflow" ]
    }, ye = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };
    function we(e) {
        var t, n = e.popper, o = e.popperRect, r = e.placement, a = e.offsets, i = e.position, s = e.gpuAcceleration, l = e.adaptive, c = e.roundOffsets, u = !0 === c ? function(e) {
            var t = e.x, n = e.y, o = window.devicePixelRatio || 1;
            return {
                x: pe(pe(t * o) / o) || 0,
                y: pe(pe(n * o) / o) || 0
            };
        }(a) : "function" == typeof c ? c(a) : a, d = u.x, p = void 0 === d ? 0 : d, f = u.y, m = void 0 === f ? 0 : f, h = a.hasOwnProperty("x"), g = a.hasOwnProperty("y"), y = z, w = F, b = window;
        if (l) {
            var v = le(n), x = "clientHeight", k = "clientWidth";
            v === G(n) && "static" !== oe(v = ae(n)).position && (x = "scrollHeight", k = "scrollWidth"), 
            v = v, r === F && (w = Z, m -= v[x] - o.height, m *= s ? 1 : -1), r === z && (y = q, 
            p -= v[k] - o.width, p *= s ? 1 : -1);
        }
        var O, E = Object.assign({
            position: i
        }, l && ye);
        return s ? Object.assign({}, E, ((O = {})[w] = g ? "0" : "", O[y] = h ? "0" : "", 
        O.transform = (b.devicePixelRatio || 1) < 2 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", 
        O)) : Object.assign({}, E, ((t = {})[w] = g ? m + "px" : "", t[y] = h ? p + "px" : "", 
        t.transform = "", t));
    }
    var be = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(e) {
            var t = e.state, n = e.options, o = n.gpuAcceleration, r = void 0 === o || o, a = n.adaptive, i = void 0 === a || a, s = n.roundOffsets, l = void 0 === s || s, c = {
                placement: Q(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r
            };
            null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, we(Object.assign({}, c, {
                offsets: t.modifiersData.popperOffsets,
                position: t.options.strategy,
                adaptive: i,
                roundOffsets: l
            })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, we(Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l
            })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement
            });
        },
        data: {}
    }, ve = {
        passive: !0
    };
    var xe = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(e) {
            var t = e.state, n = e.instance, o = e.options, r = o.scroll, a = void 0 === r || r, i = o.resize, s = void 0 === i || i, l = G(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return a && c.forEach((function(e) {
                e.addEventListener("scroll", n.update, ve);
            })), s && l.addEventListener("resize", n.update, ve), function() {
                a && c.forEach((function(e) {
                    e.removeEventListener("scroll", n.update, ve);
                })), s && l.removeEventListener("resize", n.update, ve);
            };
        },
        data: {}
    }, ke = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    function Oe(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return ke[e];
        }));
    }
    var Ee = {
        start: "end",
        end: "start"
    };
    function Ce(e) {
        return e.replace(/start|end/g, (function(e) {
            return Ee[e];
        }));
    }
    function Se(e) {
        var t = G(e);
        return {
            scrollLeft: t.pageXOffset,
            scrollTop: t.pageYOffset
        };
    }
    function Me(e) {
        return ee(ae(e)).left + Se(e).scrollLeft;
    }
    function Ne(e) {
        var t = oe(e), n = t.overflow, o = t.overflowX, r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + o);
    }
    function Te(e, t) {
        var n;
        void 0 === t && (t = []);
        var o = function e(t) {
            return [ "html", "body", "#document" ].indexOf(W(t)) >= 0 ? t.ownerDocument.body : X(t) && Ne(t) ? t : e(ie(t));
        }(e), r = o === (null == (n = e.ownerDocument) ? void 0 : n.body), a = G(o), i = r ? [ a ].concat(a.visualViewport || [], Ne(o) ? o : []) : o, s = t.concat(i);
        return r ? s : s.concat(Te(ie(i)));
    }
    function Pe(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        });
    }
    function _e(e, t) {
        return "viewport" === t ? Pe(function(e) {
            var t = G(e), n = ae(e), o = t.visualViewport, r = n.clientWidth, a = n.clientHeight, i = 0, s = 0;
            return o && (r = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (i = o.offsetLeft, 
            s = o.offsetTop)), {
                width: r,
                height: a,
                x: i + Me(e),
                y: s
            };
        }(e)) : X(t) ? function(e) {
            var t = ee(e);
            return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, 
            t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, 
            t.x = t.left, t.y = t.top, t;
        }(t) : Pe(function(e) {
            var t, n = ae(e), o = Se(e), r = null == (t = e.ownerDocument) ? void 0 : t.body, a = ue(n.scrollWidth, n.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), i = ue(n.scrollHeight, n.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), s = -o.scrollLeft + Me(e), l = -o.scrollTop;
            return "rtl" === oe(r || n).direction && (s += ue(n.clientWidth, r ? r.clientWidth : 0) - a), 
            {
                width: a,
                height: i,
                x: s,
                y: l
            };
        }(ae(e)));
    }
    function Ae(e, t, n) {
        var o = "clippingParents" === t ? function(e) {
            var t = Te(ie(e)), n = [ "absolute", "fixed" ].indexOf(oe(e).position) >= 0 && X(e) ? le(e) : e;
            return Y(n) ? t.filter((function(e) {
                return Y(e) && ne(e, n) && "body" !== W(e);
            })) : [];
        }(e) : [].concat(t), r = [].concat(o, [ n ]), a = r[0], i = r.reduce((function(t, n) {
            var o = _e(e, n);
            return t.top = ue(o.top, t.top), t.right = de(o.right, t.right), t.bottom = de(o.bottom, t.bottom), 
            t.left = ue(o.left, t.left), t;
        }), _e(e, a));
        return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, 
        i;
    }
    function je(e) {
        return e.split("-")[1];
    }
    function Be(e) {
        var t, n = e.reference, o = e.element, r = e.placement, a = r ? Q(r) : null, i = r ? je(r) : null, s = n.x + n.width / 2 - o.width / 2, l = n.y + n.height / 2 - o.height / 2;
        switch (a) {
          case F:
            t = {
                x: s,
                y: n.y - o.height
            };
            break;

          case Z:
            t = {
                x: s,
                y: n.y + n.height
            };
            break;

          case q:
            t = {
                x: n.x + n.width,
                y: l
            };
            break;

          case z:
            t = {
                x: n.x - o.width,
                y: l
            };
            break;

          default:
            t = {
                x: n.x,
                y: n.y
            };
        }
        var c = a ? ce(a) : null;
        if (null != c) {
            var u = "y" === c ? "height" : "width";
            switch (i) {
              case "start":
                t[c] = t[c] - (n[u] / 2 - o[u] / 2);
                break;

              case "end":
                t[c] = t[c] + (n[u] / 2 - o[u] / 2);
            }
        }
        return t;
    }
    function Le(e, t) {
        void 0 === t && (t = {});
        var n = t, o = n.placement, r = void 0 === o ? e.placement : o, a = n.boundary, i = void 0 === a ? "clippingParents" : a, s = n.rootBoundary, l = void 0 === s ? "viewport" : s, c = n.elementContext, u = void 0 === c ? "popper" : c, d = n.altBoundary, p = void 0 !== d && d, f = n.padding, m = void 0 === f ? 0 : f, h = me("number" != typeof m ? m : he(m, R)), g = "popper" === u ? "reference" : "popper", y = e.elements.reference, w = e.rects.popper, b = e.elements[p ? g : u], v = Ae(Y(b) ? b : b.contextElement || ae(e.elements.popper), i, l), x = ee(y), k = Be({
            reference: x,
            element: w,
            strategy: "absolute",
            placement: r
        }), O = Pe(Object.assign({}, w, k)), E = "popper" === u ? O : x, C = {
            top: v.top - E.top + h.top,
            bottom: E.bottom - v.bottom + h.bottom,
            left: v.left - E.left + h.left,
            right: E.right - v.right + h.right
        }, S = e.modifiersData.offset;
        if ("popper" === u && S) {
            var M = S[r];
            Object.keys(C).forEach((function(e) {
                var t = [ q, Z ].indexOf(e) >= 0 ? 1 : -1, n = [ F, Z ].indexOf(e) >= 0 ? "y" : "x";
                C[e] += M[n] * t;
            }));
        }
        return C;
    }
    function De(e, t) {
        void 0 === t && (t = {});
        var n = t, o = n.placement, r = n.boundary, a = n.rootBoundary, i = n.padding, s = n.flipVariations, l = n.allowedAutoPlacements, c = void 0 === l ? H : l, u = je(o), d = u ? s ? U : U.filter((function(e) {
            return je(e) === u;
        })) : R, p = d.filter((function(e) {
            return c.indexOf(e) >= 0;
        }));
        0 === p.length && (p = d);
        var f = p.reduce((function(t, n) {
            return t[n] = Le(e, {
                placement: n,
                boundary: r,
                rootBoundary: a,
                padding: i
            })[Q(n)], t;
        }), {});
        return Object.keys(f).sort((function(e, t) {
            return f[e] - f[t];
        }));
    }
    var Ve = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name;
            if (!t.modifiersData[o]._skip) {
                for (var r = n.mainAxis, a = void 0 === r || r, i = n.altAxis, s = void 0 === i || i, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.flipVariations, m = void 0 === f || f, h = n.allowedAutoPlacements, g = t.options.placement, y = Q(g), w = l || (y === g || !m ? [ Oe(g) ] : function(e) {
                    if ("auto" === Q(e)) return [];
                    var t = Oe(e);
                    return [ Ce(e), t, Ce(t) ];
                }(g)), b = [ g ].concat(w).reduce((function(e, n) {
                    return e.concat("auto" === Q(n) ? De(t, {
                        placement: n,
                        boundary: u,
                        rootBoundary: d,
                        padding: c,
                        flipVariations: m,
                        allowedAutoPlacements: h
                    }) : n);
                }), []), v = t.rects.reference, x = t.rects.popper, k = new Map, O = !0, E = b[0], C = 0; C < b.length; C++) {
                    var S = b[C], M = Q(S), N = "start" === je(S), T = [ F, Z ].indexOf(M) >= 0, P = T ? "width" : "height", _ = Le(t, {
                        placement: S,
                        boundary: u,
                        rootBoundary: d,
                        altBoundary: p,
                        padding: c
                    }), A = T ? N ? q : z : N ? Z : F;
                    v[P] > x[P] && (A = Oe(A));
                    var j = Oe(A), B = [];
                    if (a && B.push(_[M] <= 0), s && B.push(_[A] <= 0, _[j] <= 0), B.every((function(e) {
                        return e;
                    }))) {
                        E = S, O = !1;
                        break;
                    }
                    k.set(S, B);
                }
                if (O) for (var L = function(e) {
                    var t = b.find((function(t) {
                        var n = k.get(t);
                        if (n) return n.slice(0, e).every((function(e) {
                            return e;
                        }));
                    }));
                    if (t) return E = t, "break";
                }, D = m ? 3 : 1; D > 0; D--) {
                    if ("break" === L(D)) break;
                }
                t.placement !== E && (t.modifiersData[o]._skip = !0, t.placement = E, t.reset = !0);
            }
        },
        requiresIfExists: [ "offset" ],
        data: {
            _skip: !1
        }
    };
    function Ie(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        };
    }
    function Fe(e) {
        return [ F, q, Z, z ].some((function(t) {
            return e[t] >= 0;
        }));
    }
    var Ze = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: [ "preventOverflow" ],
        fn: function(e) {
            var t = e.state, n = e.name, o = t.rects.reference, r = t.rects.popper, a = t.modifiersData.preventOverflow, i = Le(t, {
                elementContext: "reference"
            }), s = Le(t, {
                altBoundary: !0
            }), l = Ie(i, o), c = Ie(s, r, a), u = Fe(l), d = Fe(c);
            t.modifiersData[n] = {
                referenceClippingOffsets: l,
                popperEscapeOffsets: c,
                isReferenceHidden: u,
                hasPopperEscaped: d
            }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": u,
                "data-popper-escaped": d
            });
        }
    };
    var qe = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: [ "popperOffsets" ],
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name, r = n.offset, a = void 0 === r ? [ 0, 0 ] : r, i = H.reduce((function(e, n) {
                return e[n] = function(e, t, n) {
                    var o = Q(e), r = [ z, F ].indexOf(o) >= 0 ? -1 : 1, a = "function" == typeof n ? n(Object.assign({}, t, {
                        placement: e
                    })) : n, i = a[0], s = a[1];
                    return i = i || 0, s = (s || 0) * r, [ z, q ].indexOf(o) >= 0 ? {
                        x: s,
                        y: i
                    } : {
                        x: i,
                        y: s
                    };
                }(n, t.rects, a), e;
            }), {}), s = i[t.placement], l = s.x, c = s.y;
            null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, 
            t.modifiersData.popperOffsets.y += c), t.modifiersData[o] = i;
        }
    };
    var ze = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function(e) {
            var t = e.state, n = e.name;
            t.modifiersData[n] = Be({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement
            });
        },
        data: {}
    };
    var Re = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name, r = n.mainAxis, a = void 0 === r || r, i = n.altAxis, s = void 0 !== i && i, l = n.boundary, c = n.rootBoundary, u = n.altBoundary, d = n.padding, p = n.tether, f = void 0 === p || p, m = n.tetherOffset, h = void 0 === m ? 0 : m, g = Le(t, {
                boundary: l,
                rootBoundary: c,
                padding: d,
                altBoundary: u
            }), y = Q(t.placement), w = je(t.placement), b = !w, v = ce(y), x = "x" === v ? "y" : "x", k = t.modifiersData.popperOffsets, O = t.rects.reference, E = t.rects.popper, C = "function" == typeof h ? h(Object.assign({}, t.rects, {
                placement: t.placement
            })) : h, S = {
                x: 0,
                y: 0
            };
            if (k) {
                if (a || s) {
                    var M = "y" === v ? F : z, N = "y" === v ? Z : q, T = "y" === v ? "height" : "width", P = k[v], _ = k[v] + g[M], A = k[v] - g[N], j = f ? -E[T] / 2 : 0, B = "start" === w ? O[T] : E[T], L = "start" === w ? -E[T] : -O[T], D = t.elements.arrow, V = f && D ? te(D) : {
                        width: 0,
                        height: 0
                    }, I = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }, R = I[M], U = I[N], H = fe(0, O[T], V[T]), $ = b ? O[T] / 2 - j - H - R - C : B - H - R - C, W = b ? -O[T] / 2 + j + H + U + C : L + H + U + C, G = t.elements.arrow && le(t.elements.arrow), Y = G ? "y" === v ? G.clientTop || 0 : G.clientLeft || 0 : 0, X = t.modifiersData.offset ? t.modifiersData.offset[t.placement][v] : 0, K = k[v] + $ - X - Y, J = k[v] + W - X;
                    if (a) {
                        var ee = fe(f ? de(_, K) : _, P, f ? ue(A, J) : A);
                        k[v] = ee, S[v] = ee - P;
                    }
                    if (s) {
                        var ne = "x" === v ? F : z, oe = "x" === v ? Z : q, re = k[x], ae = re + g[ne], ie = re - g[oe], se = fe(f ? de(ae, K) : ae, re, f ? ue(ie, J) : ie);
                        k[x] = se, S[x] = se - re;
                    }
                }
                t.modifiersData[o] = S;
            }
        },
        requiresIfExists: [ "offset" ]
    };
    function Ue(e, t, n) {
        void 0 === n && (n = !1);
        var o, r, a = ae(t), i = ee(e), s = X(t), l = {
            scrollLeft: 0,
            scrollTop: 0
        }, c = {
            x: 0,
            y: 0
        };
        return (s || !s && !n) && (("body" !== W(t) || Ne(a)) && (l = (o = t) !== G(o) && X(o) ? {
            scrollLeft: (r = o).scrollLeft,
            scrollTop: r.scrollTop
        } : Se(o)), X(t) ? ((c = ee(t)).x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Me(a))), 
        {
            x: i.left + l.scrollLeft - c.x,
            y: i.top + l.scrollTop - c.y,
            width: i.width,
            height: i.height
        };
    }
    function He(e) {
        var t = new Map, n = new Set, o = [];
        return e.forEach((function(e) {
            t.set(e.name, e);
        })), e.forEach((function(e) {
            n.has(e.name) || function e(r) {
                n.add(r.name), [].concat(r.requires || [], r.requiresIfExists || []).forEach((function(o) {
                    if (!n.has(o)) {
                        var r = t.get(o);
                        r && e(r);
                    }
                })), o.push(r);
            }(e);
        })), o;
    }
    var $e = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };
    function We() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect);
        }));
    }
    function Ge(e) {
        void 0 === e && (e = {});
        var t = e, n = t.defaultModifiers, o = void 0 === n ? [] : n, r = t.defaultOptions, a = void 0 === r ? $e : r;
        return function(e, t, n) {
            void 0 === n && (n = a);
            var r, i, s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, $e, a),
                modifiersData: {},
                elements: {
                    reference: e,
                    popper: t
                },
                attributes: {},
                styles: {}
            }, l = [], c = !1, u = {
                state: s,
                setOptions: function(n) {
                    d(), s.options = Object.assign({}, a, s.options, n), s.scrollParents = {
                        reference: Y(e) ? Te(e) : e.contextElement ? Te(e.contextElement) : [],
                        popper: Te(t)
                    };
                    var r, i, c = function(e) {
                        var t = He(e);
                        return $.reduce((function(e, n) {
                            return e.concat(t.filter((function(e) {
                                return e.phase === n;
                            })));
                        }), []);
                    }((r = [].concat(o, s.options.modifiers), i = r.reduce((function(e, t) {
                        var n = e[t.name];
                        return e[t.name] = n ? Object.assign({}, n, t, {
                            options: Object.assign({}, n.options, t.options),
                            data: Object.assign({}, n.data, t.data)
                        }) : t, e;
                    }), {}), Object.keys(i).map((function(e) {
                        return i[e];
                    }))));
                    return s.orderedModifiers = c.filter((function(e) {
                        return e.enabled;
                    })), s.orderedModifiers.forEach((function(e) {
                        var t = e.name, n = e.options, o = void 0 === n ? {} : n, r = e.effect;
                        if ("function" == typeof r) {
                            var a = r({
                                state: s,
                                name: t,
                                instance: u,
                                options: o
                            });
                            l.push(a || function() {});
                        }
                    })), u.update();
                },
                forceUpdate: function() {
                    if (!c) {
                        var e = s.elements, t = e.reference, n = e.popper;
                        if (We(t, n)) {
                            s.rects = {
                                reference: Ue(t, le(n), "fixed" === s.options.strategy),
                                popper: te(n)
                            }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                                return s.modifiersData[e.name] = Object.assign({}, e.data);
                            }));
                            for (var o = 0; o < s.orderedModifiers.length; o++) if (!0 !== s.reset) {
                                var r = s.orderedModifiers[o], a = r.fn, i = r.options, l = void 0 === i ? {} : i, d = r.name;
                                "function" == typeof a && (s = a({
                                    state: s,
                                    options: l,
                                    name: d,
                                    instance: u
                                }) || s);
                            } else s.reset = !1, o = -1;
                        }
                    }
                },
                update: (r = function() {
                    return new Promise((function(e) {
                        u.forceUpdate(), e(s);
                    }));
                }, function() {
                    return i || (i = new Promise((function(e) {
                        Promise.resolve().then((function() {
                            i = void 0, e(r());
                        }));
                    }))), i;
                }),
                destroy: function() {
                    d(), c = !0;
                }
            };
            if (!We(e, t)) return u;
            function d() {
                l.forEach((function(e) {
                    return e();
                })), l = [];
            }
            return u.setOptions(n).then((function(e) {
                !c && n.onFirstUpdate && n.onFirstUpdate(e);
            })), u;
        };
    }
    var Ye = Ge(), Xe = Ge({
        defaultModifiers: [ xe, ze, be, J ]
    }), Ke = Ge({
        defaultModifiers: [ xe, ze, be, J, qe, Ve, Re, ge, Ze ]
    }), Je = Object.freeze({
        __proto__: null,
        popperGenerator: Ge,
        detectOverflow: Le,
        createPopperBase: Ye,
        createPopper: Ke,
        createPopperLite: Xe,
        top: F,
        bottom: Z,
        right: q,
        left: z,
        auto: "auto",
        basePlacements: R,
        start: "start",
        end: "end",
        clippingParents: "clippingParents",
        viewport: "viewport",
        popper: "popper",
        reference: "reference",
        variationPlacements: U,
        placements: H,
        beforeRead: "beforeRead",
        read: "read",
        afterRead: "afterRead",
        beforeMain: "beforeMain",
        main: "main",
        afterMain: "afterMain",
        beforeWrite: "beforeWrite",
        write: "write",
        afterWrite: "afterWrite",
        modifierPhases: $,
        applyStyles: J,
        arrow: ge,
        computeStyles: be,
        eventListeners: xe,
        flip: Ve,
        hide: Ze,
        offset: qe,
        popperOffsets: ze,
        preventOverflow: Re
    });
    function Qe(e, t) {
        const n = Object.create(null), o = e.split(",");
        for (let e = 0; e < o.length; e++) n[o[e]] = !0;
        return t ? e => !!n[e.toLowerCase()] : e => !!n[e];
    }
    const et = {
        1: "TEXT",
        2: "CLASS",
        4: "STYLE",
        8: "PROPS",
        16: "FULL_PROPS",
        32: "HYDRATE_EVENTS",
        64: "STABLE_FRAGMENT",
        128: "KEYED_FRAGMENT",
        256: "UNKEYED_FRAGMENT",
        512: "NEED_PATCH",
        1024: "DYNAMIC_SLOTS",
        2048: "DEV_ROOT_FRAGMENT",
        [-1]: "HOISTED",
        [-2]: "BAIL"
    }, tt = {
        1: "STABLE",
        2: "DYNAMIC",
        3: "FORWARDED"
    }, nt = Qe("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt");
    const ot = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", rt = Qe(ot), at = Qe(ot + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"), it = /[>/="'\u0009\u000a\u000c\u0020]/, st = {};
    const lt = Qe("animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width"), ct = Qe("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");
    const ut = /;(?![^(]*\))/g, dt = /:(.+)/;
    function pt(e) {
        const t = {};
        return e.split(ut).forEach(e => {
            if (e) {
                const n = e.split(dt);
                n.length > 1 && (t[n[0].trim()] = n[1].trim());
            }
        }), t;
    }
    const ft = Qe("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), mt = Qe("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), ht = Qe("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), gt = /["'&<>]/;
    const yt = /^-?>|<!--|-->|--!>|<!-$/g;
    function wt(e, t) {
        if (e === t) return !0;
        let n = St(e), o = St(t);
        if (n || o) return !(!n || !o) && e.getTime() === t.getTime();
        if (n = Ot(e), o = Ot(t), n || o) return !(!n || !o) && function(e, t) {
            if (e.length !== t.length) return !1;
            let n = !0;
            for (let o = 0; n && o < e.length; o++) n = wt(e[o], t[o]);
            return n;
        }(e, t);
        if (n = Tt(e), o = Tt(t), n || o) {
            if (!n || !o) return !1;
            if (Object.keys(e).length !== Object.keys(t).length) return !1;
            for (const n in e) {
                const o = e.hasOwnProperty(n), r = t.hasOwnProperty(n);
                if (o && !r || !o && r || !wt(e[n], t[n])) return !1;
            }
        }
        return String(e) === String(t);
    }
    const bt = (e, t) => Et(t) ? {
        [`Map(${t.size})`]: [ ...t.entries() ].reduce((e, [t, n]) => (e[t + " =>"] = n, 
        e), {})
    } : Ct(t) ? {
        [`Set(${t.size})`]: [ ...t.values() ]
    } : !Tt(t) || Ot(t) || At(t) ? t : String(t), vt = /^on[^a-z]/, xt = Object.assign, kt = Object.prototype.hasOwnProperty, Ot = Array.isArray, Et = e => "[object Map]" === _t(e), Ct = e => "[object Set]" === _t(e), St = e => e instanceof Date, Mt = e => "function" == typeof e, Nt = e => "string" == typeof e, Tt = e => null !== e && "object" == typeof e, Pt = Object.prototype.toString, _t = e => Pt.call(e), At = e => "[object Object]" === _t(e), jt = Qe(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Bt = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n));
    }, Lt = /-(\w)/g, Dt = Bt(e => e.replace(Lt, (e, t) => t ? t.toUpperCase() : "")), Vt = /\B([A-Z])/g, It = Bt(e => e.replace(Vt, "-$1").toLowerCase()), Ft = Bt(e => e.charAt(0).toUpperCase() + e.slice(1)), Zt = Bt(e => e ? "on" + Ft(e) : "");
    let qt;
    var zt = Object.freeze({
        __proto__: null,
        EMPTY_ARR: [],
        EMPTY_OBJ: {},
        NO: () => !1,
        NOOP: () => {},
        PatchFlagNames: et,
        babelParserDefaultPlugins: [ "bigInt", "optionalChaining", "nullishCoalescingOperator" ],
        camelize: Dt,
        capitalize: Ft,
        def: (e, t, n) => {
            Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !1,
                value: n
            });
        },
        escapeHtml: function(e) {
            const t = "" + e, n = gt.exec(t);
            if (!n) return t;
            let o, r, a = "", i = 0;
            for (r = n.index; r < t.length; r++) {
                switch (t.charCodeAt(r)) {
                  case 34:
                    o = "&quot;";
                    break;

                  case 38:
                    o = "&amp;";
                    break;

                  case 39:
                    o = "&#39;";
                    break;

                  case 60:
                    o = "&lt;";
                    break;

                  case 62:
                    o = "&gt;";
                    break;

                  default:
                    continue;
                }
                i !== r && (a += t.substring(i, r)), i = r + 1, a += o;
            }
            return i !== r ? a + t.substring(i, r) : a;
        },
        escapeHtmlComment: function(e) {
            return e.replace(yt, "");
        },
        extend: xt,
        generateCodeFrame: function(e, t = 0, n = e.length) {
            const o = e.split(/\r?\n/);
            let r = 0;
            const a = [];
            for (let e = 0; e < o.length; e++) if (r += o[e].length + 1, r >= t) {
                for (let i = e - 2; i <= e + 2 || n > r; i++) {
                    if (i < 0 || i >= o.length) continue;
                    const s = i + 1;
                    a.push(`${s}${" ".repeat(Math.max(3 - String(s).length, 0))}|  ${o[i]}`);
                    const l = o[i].length;
                    if (i === e) {
                        const e = t - (r - l) + 1, o = Math.max(1, n > r ? l - e : n - t);
                        a.push("   |  " + " ".repeat(e) + "^".repeat(o));
                    } else if (i > e) {
                        if (n > r) {
                            const e = Math.max(Math.min(n - r, l), 1);
                            a.push("   |  " + "^".repeat(e));
                        }
                        r += l + 1;
                    }
                }
                break;
            }
            return a.join("\n");
        },
        getGlobalThis: () => qt || (qt = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}),
        hasChanged: (e, t) => e !== t && (e == e || t == t),
        hasOwn: (e, t) => kt.call(e, t),
        hyphenate: It,
        invokeArrayFns: (e, t) => {
            for (let n = 0; n < e.length; n++) e[n](t);
        },
        isArray: Ot,
        isBooleanAttr: at,
        isDate: St,
        isFunction: Mt,
        isGloballyWhitelisted: nt,
        isHTMLTag: ft,
        isIntegerKey: e => Nt(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
        isKnownAttr: ct,
        isMap: Et,
        isModelListener: e => e.startsWith("onUpdate:"),
        isNoUnitNumericStyleProp: lt,
        isObject: Tt,
        isOn: e => vt.test(e),
        isPlainObject: At,
        isPromise: e => Tt(e) && Mt(e.then) && Mt(e.catch),
        isReservedProp: jt,
        isSSRSafeAttrName: function(e) {
            if (st.hasOwnProperty(e)) return st[e];
            const t = it.test(e);
            return t && console.error("unsafe attribute name: " + e), st[e] = !t;
        },
        isSVGTag: mt,
        isSet: Ct,
        isSpecialBooleanAttr: rt,
        isString: Nt,
        isSymbol: e => "symbol" == typeof e,
        isVoidTag: ht,
        looseEqual: wt,
        looseIndexOf: function(e, t) {
            return e.findIndex(e => wt(e, t));
        },
        makeMap: Qe,
        normalizeClass: function e(t) {
            let n = "";
            if (Nt(t)) n = t; else if (Ot(t)) for (let o = 0; o < t.length; o++) {
                const r = e(t[o]);
                r && (n += r + " ");
            } else if (Tt(t)) for (const e in t) t[e] && (n += e + " ");
            return n.trim();
        },
        normalizeStyle: function e(t) {
            if (Ot(t)) {
                const n = {};
                for (let o = 0; o < t.length; o++) {
                    const r = t[o], a = e(Nt(r) ? pt(r) : r);
                    if (a) for (const e in a) n[e] = a[e];
                }
                return n;
            }
            if (Tt(t)) return t;
        },
        objectToString: Pt,
        parseStringStyle: pt,
        propsToAttrMap: {
            acceptCharset: "accept-charset",
            className: "class",
            htmlFor: "for",
            httpEquiv: "http-equiv"
        },
        remove: (e, t) => {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1);
        },
        slotFlagsText: tt,
        stringifyStyle: function(e) {
            let t = "";
            if (!e) return t;
            for (const n in e) {
                const o = e[n], r = n.startsWith("--") ? n : It(n);
                (Nt(o) || "number" == typeof o && lt(r)) && (t += `${r}:${o};`);
            }
            return t;
        },
        toDisplayString: e => null == e ? "" : Tt(e) ? JSON.stringify(e, bt, 2) : String(e),
        toHandlerKey: Zt,
        toNumber: e => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t;
        },
        toRawType: e => _t(e).slice(8, -1),
        toTypeString: _t
    }), Rt = V((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = "undefined" == typeof window;
        t.default = n;
    }));
    D(Rt);
    var Ut = V((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(Rt);
        const a = zt.hyphenate, i = e => "number" == typeof e;
        Object.defineProperty(n, "isVNode", {
            enumerable: !0,
            get: function() {
                return t.isVNode;
            }
        }), Object.defineProperty(n, "camelize", {
            enumerable: !0,
            get: function() {
                return zt.camelize;
            }
        }), Object.defineProperty(n, "capitalize", {
            enumerable: !0,
            get: function() {
                return zt.capitalize;
            }
        }), Object.defineProperty(n, "extend", {
            enumerable: !0,
            get: function() {
                return zt.extend;
            }
        }), Object.defineProperty(n, "hasOwn", {
            enumerable: !0,
            get: function() {
                return zt.hasOwn;
            }
        }), Object.defineProperty(n, "isArray", {
            enumerable: !0,
            get: function() {
                return zt.isArray;
            }
        }), Object.defineProperty(n, "isObject", {
            enumerable: !0,
            get: function() {
                return zt.isObject;
            }
        }), Object.defineProperty(n, "isString", {
            enumerable: !0,
            get: function() {
                return zt.isString;
            }
        }), Object.defineProperty(n, "looseEqual", {
            enumerable: !0,
            get: function() {
                return zt.looseEqual;
            }
        }), n.$ = function(e) {
            return e.value;
        }, n.SCOPE = "Util", n.addUnit = function(e) {
            return zt.isString(e) ? e : i(e) ? e + "px" : "";
        }, n.arrayFind = function(e, t) {
            return e.find(t);
        }, n.arrayFindIndex = function(e, t) {
            return e.findIndex(t);
        }, n.arrayFlat = function e(t) {
            return t.reduce((t, n) => {
                const o = Array.isArray(n) ? e(n) : n;
                return t.concat(o);
            }, []);
        }, n.autoprefixer = function(e) {
            const t = [ "ms-", "webkit-" ];
            return [ "transform", "transition", "animation" ].forEach(n => {
                const o = e[n];
                n && o && t.forEach(t => {
                    e[t + n] = o;
                });
            }), e;
        }, n.clearTimer = e => {
            clearTimeout(e.value), e.value = null;
        }, n.coerceTruthyValueToArray = e => e || 0 === e ? Array.isArray(e) ? e : [ e ] : [], 
        n.deduplicate = function(e) {
            return Array.from(new Set(e));
        }, n.entries = function(e) {
            return Object.keys(e).map(t => [ t, e[t] ]);
        }, n.escapeRegexpString = (e = "") => String(e).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"), 
        n.generateId = () => Math.floor(1e4 * Math.random()), n.getPropByPath = function(e, t, n) {
            let o = e;
            const r = (t = (t = t.replace(/\[(\w+)\]/g, ".$1")).replace(/^\./, "")).split(".");
            let a = 0;
            for (;a < r.length - 1 && (o || n); a++) {
                const e = r[a];
                if (!(e in o)) {
                    if (n) throw new Error("please transfer a valid prop path to form item!");
                    break;
                }
                o = o[e];
            }
            return {
                o: o,
                k: r[a],
                v: null == o ? void 0 : o[r[a]]
            };
        }, n.getRandomInt = function(e) {
            return Math.floor(Math.random() * Math.floor(e));
        }, n.getValueByPath = (e, t = "") => {
            let n = e;
            return t.split(".").map(e => {
                n = null == n ? void 0 : n[e];
            }), n;
        }, n.isBool = e => "boolean" == typeof e, n.isEdge = function() {
            return !r.default && navigator.userAgent.indexOf("Edge") > -1;
        }, n.isEmpty = function(e) {
            return !!(!e && 0 !== e || zt.isArray(e) && !e.length || zt.isObject(e) && !Object.keys(e).length);
        }, n.isFirefox = function() {
            return !r.default && !!window.navigator.userAgent.match(/firefox/i);
        }, n.isHTMLElement = e => zt.toRawType(e).startsWith("HTML"), n.isIE = function() {
            return !r.default && !isNaN(Number(document.documentMode));
        }, n.isNumber = i, n.isUndefined = function(e) {
            return void 0 === e;
        }, n.kebabCase = a, n.rafThrottle = function(e) {
            let t = !1;
            return function(...n) {
                t || (t = !0, window.requestAnimationFrame(() => {
                    e.apply(this, n), t = !1;
                }));
            };
        }, n.toObject = function(e) {
            const t = {};
            for (let n = 0; n < e.length; n++) e[n] && zt.extend(t, e[n]);
            return t;
        }, n.useGlobalConfig = function() {
            const e = t.getCurrentInstance();
            return "$ELEMENT" in e.proxy ? e.proxy.$ELEMENT : {};
        };
    }));
    D(Ut);
    Ut.$, Ut.SCOPE, Ut.addUnit, Ut.arrayFind, Ut.arrayFindIndex, Ut.arrayFlat, Ut.autoprefixer, 
    Ut.clearTimer, Ut.coerceTruthyValueToArray, Ut.deduplicate, Ut.entries, Ut.escapeRegexpString, 
    Ut.generateId, Ut.getPropByPath, Ut.getRandomInt, Ut.getValueByPath, Ut.isBool, 
    Ut.isEdge, Ut.isEmpty, Ut.isFirefox, Ut.isHTMLElement, Ut.isIE, Ut.isNumber, Ut.isUndefined, 
    Ut.kebabCase, Ut.rafThrottle, Ut.toObject, Ut.useGlobalConfig;
    var Ht = V((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        let n = {};
        t.getConfig = e => n[e], t.setConfig = e => {
            n = e;
        };
    }));
    D(Ht);
    Ht.getConfig, Ht.setConfig;
    var $t = V((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(Rt);
        const r = function(e, t, n, o = !1) {
            e && t && n && e.addEventListener(t, n, o);
        }, a = function(e, t, n, o = !1) {
            e && t && n && e.removeEventListener(t, n, o);
        };
        function i(e, t) {
            if (!e || !t) return !1;
            if (-1 !== t.indexOf(" ")) throw new Error("className should not contain space.");
            return e.classList ? e.classList.contains(t) : (" " + e.className + " ").indexOf(" " + t + " ") > -1;
        }
        const s = function(e, t) {
            if (!o.default) {
                if (!e || !t) return null;
                "float" === (t = Ut.camelize(t)) && (t = "cssFloat");
                try {
                    const n = e.style[t];
                    if (n) return n;
                    const o = document.defaultView.getComputedStyle(e, "");
                    return o ? o[t] : "";
                } catch (n) {
                    return e.style[t];
                }
            }
        };
        function l(e, t, n) {
            e && t && (Ut.isObject(t) ? Object.keys(t).forEach(n => {
                l(e, n, t[n]);
            }) : (t = Ut.camelize(t), e.style[t] = n));
        }
        const c = (e, t) => {
            if (o.default) return;
            return s(e, null == t ? "overflow" : t ? "overflow-y" : "overflow-x").match(/(scroll|auto)/);
        }, u = e => {
            let t = 0, n = e;
            for (;n; ) t += n.offsetTop, n = n.offsetParent;
            return t;
        };
        t.addClass = function(e, t) {
            if (!e) return;
            let n = e.className;
            const o = (t || "").split(" ");
            for (let t = 0, r = o.length; t < r; t++) {
                const r = o[t];
                r && (e.classList ? e.classList.add(r) : i(e, r) || (n += " " + r));
            }
            e.classList || (e.className = n);
        }, t.getOffsetTop = u, t.getOffsetTopDistance = (e, t) => Math.abs(u(e) - u(t)), 
        t.getScrollContainer = (e, t) => {
            if (o.default) return;
            let n = e;
            for (;n; ) {
                if ([ window, document, document.documentElement ].includes(n)) return window;
                if (c(n, t)) return n;
                n = n.parentNode;
            }
            return n;
        }, t.getStyle = s, t.hasClass = i, t.isInContainer = (e, t) => {
            if (o.default || !e || !t) return !1;
            const n = e.getBoundingClientRect();
            let r;
            return r = [ window, document, document.documentElement, null, void 0 ].includes(t) ? {
                top: 0,
                right: window.innerWidth,
                bottom: window.innerHeight,
                left: 0
            } : t.getBoundingClientRect(), n.top < r.bottom && n.bottom > r.top && n.right > r.left && n.left < r.right;
        }, t.isScroll = c, t.off = a, t.on = r, t.once = function(e, t, n) {
            const o = function(...r) {
                n && n.apply(this, r), a(e, t, o);
            };
            r(e, t, o);
        }, t.removeClass = function(e, t) {
            if (!e || !t) return;
            const n = t.split(" ");
            let o = " " + e.className + " ";
            for (let t = 0, r = n.length; t < r; t++) {
                const r = n[t];
                r && (e.classList ? e.classList.remove(r) : i(e, r) && (o = o.replace(" " + r + " ", " ")));
            }
            e.classList || (e.className = (o || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ""));
        }, t.removeStyle = function(e, t) {
            e && t && (Ut.isObject(t) ? Object.keys(t).forEach(t => {
                l(e, t, "");
            }) : l(e, t, ""));
        }, t.setStyle = l, t.stop = e => e.stopPropagation();
    }));
    D($t);
    $t.addClass, $t.getOffsetTop, $t.getOffsetTopDistance, $t.getScrollContainer, $t.getStyle, 
    $t.hasClass, $t.isInContainer, $t.isScroll, $t.off, $t.on, $t.once, $t.removeClass, 
    $t.removeStyle, $t.setStyle, $t.stop;
    var Wt = V((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const n = e => "fixed" !== getComputedStyle(e).position && null !== e.offsetParent, o = e => {
            if (e.tabIndex > 0 || 0 === e.tabIndex && null !== e.getAttribute("tabIndex")) return !0;
            if (e.disabled) return !1;
            switch (e.nodeName) {
              case "A":
                return !!e.href && "ignore" !== e.rel;

              case "INPUT":
                return !("hidden" === e.type || "file" === e.type);

              case "BUTTON":
              case "SELECT":
              case "TEXTAREA":
                return !0;

              default:
                return !1;
            }
        }, r = e => {
            var t;
            return !!o(e) && (a.IgnoreUtilFocusChanges = !0, null === (t = e.focus) || void 0 === t || t.call(e), 
            a.IgnoreUtilFocusChanges = !1, document.activeElement === e);
        }, a = {
            IgnoreUtilFocusChanges: !1,
            focusFirstDescendant: function(e) {
                for (let t = 0; t < e.childNodes.length; t++) {
                    const n = e.childNodes[t];
                    if (r(n) || this.focusFirstDescendant(n)) return !0;
                }
                return !1;
            },
            focusLastDescendant: function(e) {
                for (let t = e.childNodes.length - 1; t >= 0; t--) {
                    const n = e.childNodes[t];
                    if (r(n) || this.focusLastDescendant(n)) return !0;
                }
                return !1;
            }
        };
        t.EVENT_CODE = {
            tab: "Tab",
            enter: "Enter",
            space: "Space",
            left: "ArrowLeft",
            up: "ArrowUp",
            right: "ArrowRight",
            down: "ArrowDown",
            esc: "Escape",
            delete: "Delete",
            backspace: "Backspace"
        }, t.attemptFocus = r, t.default = a, t.isFocusable = o, t.isVisible = n, t.obtainAllFocusableElements = e => Array.from(e.querySelectorAll('a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])')).filter(o).filter(n), 
        t.triggerEvent = function(e, t, ...n) {
            let o;
            o = t.includes("mouse") || t.includes("click") ? "MouseEvents" : t.includes("key") ? "KeyboardEvent" : "HTMLEvents";
            const r = document.createEvent(o);
            return r.initEvent(t, ...n), e.dispatchEvent(r), e;
        };
    }));
    D(Wt);
    Wt.EVENT_CODE, Wt.attemptFocus, Wt.isFocusable, Wt.isVisible, Wt.obtainAllFocusableElements, 
    Wt.triggerEvent;
    var Gt = V((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(Rt);
        const r = e => {
            e.preventDefault(), e.stopPropagation();
        }, a = () => {
            null == u || u.doOnModalClick();
        };
        let i, s = !1;
        const l = function() {
            if (o.default) return;
            let e = u.modalDom;
            return e ? s = !0 : (s = !1, e = document.createElement("div"), u.modalDom = e, 
            $t.on(e, "touchmove", r), $t.on(e, "click", a)), e;
        }, c = {}, u = {
            modalFade: !0,
            modalDom: void 0,
            zIndex: i,
            getInstance: function(e) {
                return c[e];
            },
            register: function(e, t) {
                e && t && (c[e] = t);
            },
            deregister: function(e) {
                e && (c[e] = null, delete c[e]);
            },
            nextZIndex: function() {
                return ++u.zIndex;
            },
            modalStack: [],
            doOnModalClick: function() {
                const e = u.modalStack[u.modalStack.length - 1];
                if (!e) return;
                const t = u.getInstance(e.id);
                t && t.closeOnClickModal.value && t.close();
            },
            openModal: function(e, t, n, r, a) {
                if (o.default) return;
                if (!e || void 0 === t) return;
                this.modalFade = a;
                const i = this.modalStack;
                for (let t = 0, n = i.length; t < n; t++) {
                    if (i[t].id === e) return;
                }
                const c = l();
                if ($t.addClass(c, "v-modal"), this.modalFade && !s && $t.addClass(c, "v-modal-enter"), 
                r) {
                    r.trim().split(/\s+/).forEach(e => $t.addClass(c, e));
                }
                setTimeout(() => {
                    $t.removeClass(c, "v-modal-enter");
                }, 200), n && n.parentNode && 11 !== n.parentNode.nodeType ? n.parentNode.appendChild(c) : document.body.appendChild(c), 
                t && (c.style.zIndex = String(t)), c.tabIndex = 0, c.style.display = "", this.modalStack.push({
                    id: e,
                    zIndex: t,
                    modalClass: r
                });
            },
            closeModal: function(e) {
                const t = this.modalStack, n = l();
                if (t.length > 0) {
                    const o = t[t.length - 1];
                    if (o.id === e) {
                        if (o.modalClass) {
                            o.modalClass.trim().split(/\s+/).forEach(e => $t.removeClass(n, e));
                        }
                        t.pop(), t.length > 0 && (n.style.zIndex = t[t.length - 1].zIndex);
                    } else for (let n = t.length - 1; n >= 0; n--) if (t[n].id === e) {
                        t.splice(n, 1);
                        break;
                    }
                }
                0 === t.length && (this.modalFade && $t.addClass(n, "v-modal-leave"), setTimeout(() => {
                    0 === t.length && (n.parentNode && n.parentNode.removeChild(n), n.style.display = "none", 
                    u.modalDom = void 0), $t.removeClass(n, "v-modal-leave");
                }, 200));
            }
        };
        Object.defineProperty(u, "zIndex", {
            configurable: !0,
            get: () => (void 0 === i && (i = Ht.getConfig("zIndex") || 2e3), i),
            set(e) {
                i = e;
            }
        });
        o.default || $t.on(window, "keydown", (function(e) {
            if (e.code === Wt.EVENT_CODE.esc) {
                const e = function() {
                    if (!o.default && u.modalStack.length > 0) {
                        const e = u.modalStack[u.modalStack.length - 1];
                        if (!e) return;
                        return u.getInstance(e.id);
                    }
                }();
                e && e.closeOnPressEscape.value && (e.handleClose ? e.handleClose() : e.handleAction ? e.handleAction("cancel") : e.close());
            }
        })), t.default = u;
    }));
    D(Gt);
    var Yt = V((function(e, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o;
        (o = n.PatchFlags || (n.PatchFlags = {}))[o.TEXT = 1] = "TEXT", o[o.CLASS = 2] = "CLASS", 
        o[o.STYLE = 4] = "STYLE", o[o.PROPS = 8] = "PROPS", o[o.FULL_PROPS = 16] = "FULL_PROPS", 
        o[o.HYDRATE_EVENTS = 32] = "HYDRATE_EVENTS", o[o.STABLE_FRAGMENT = 64] = "STABLE_FRAGMENT", 
        o[o.KEYED_FRAGMENT = 128] = "KEYED_FRAGMENT", o[o.UNKEYED_FRAGMENT = 256] = "UNKEYED_FRAGMENT", 
        o[o.NEED_PATCH = 512] = "NEED_PATCH", o[o.DYNAMIC_SLOTS = 1024] = "DYNAMIC_SLOTS", 
        o[o.HOISTED = -1] = "HOISTED", o[o.BAIL = -2] = "BAIL";
        const r = e => e.type === t.Fragment, a = e => e.type === t.Comment, i = e => "template" === e.type;
        function s(e, t) {
            if (!a(e)) return r(e) || i(e) ? t > 0 ? l(e.children, t - 1) : void 0 : e;
        }
        const l = (e, t = 3) => Array.isArray(e) ? s(e[0], t) : s(e, t);
        function c(e, n, o, r, a) {
            return t.openBlock(), t.createBlock(e, n, o, r, a);
        }
        n.getFirstValidNode = l, n.isComment = a, n.isFragment = r, n.isTemplate = i, n.isText = e => e.type === t.Text, 
        n.isValidElementNode = e => !(r(e) || a(e)), n.renderBlock = c, n.renderIf = function(e, n, o, r, a, i) {
            return e ? c(n, o, r, a, i) : t.createCommentVNode("v-if", !0);
        };
    }));
    D(Yt);
    Yt.PatchFlags, Yt.getFirstValidNode, Yt.isComment, Yt.isFragment, Yt.isTemplate, 
    Yt.isText, Yt.isValidElementNode, Yt.renderBlock, Yt.renderIf;
    var Xt, Kt, Jt, Qt, en, tn, nn, on, rn, an, sn, ln, cn, un, dn, pn = !1;
    function fn() {
        if (!pn) {
            pn = !0;
            var e = navigator.userAgent, t = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e), n = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
            if (ln = /\b(iPhone|iP[ao]d)/.exec(e), cn = /\b(iP[ao]d)/.exec(e), an = /Android/i.exec(e), 
            un = /FBAN\/\w+;/i.exec(e), dn = /Mobile/i.exec(e), sn = !!/Win64/.exec(e), t) {
                (Xt = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN) && document && document.documentMode && (Xt = document.documentMode);
                var o = /(?:Trident\/(\d+.\d+))/.exec(e);
                tn = o ? parseFloat(o[1]) + 4 : Xt, Kt = t[2] ? parseFloat(t[2]) : NaN, Jt = t[3] ? parseFloat(t[3]) : NaN, 
                (Qt = t[4] ? parseFloat(t[4]) : NaN) ? (t = /(?:Chrome\/(\d+\.\d+))/.exec(e), en = t && t[1] ? parseFloat(t[1]) : NaN) : en = NaN;
            } else Xt = Kt = Jt = en = Qt = NaN;
            if (n) {
                if (n[1]) {
                    var r = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
                    nn = !r || parseFloat(r[1].replace("_", "."));
                } else nn = !1;
                on = !!n[2], rn = !!n[3];
            } else nn = on = rn = !1;
        }
    }
    var mn, hn = {
        ie: function() {
            return fn() || Xt;
        },
        ieCompatibilityMode: function() {
            return fn() || tn > Xt;
        },
        ie64: function() {
            return hn.ie() && sn;
        },
        firefox: function() {
            return fn() || Kt;
        },
        opera: function() {
            return fn() || Jt;
        },
        webkit: function() {
            return fn() || Qt;
        },
        safari: function() {
            return hn.webkit();
        },
        chrome: function() {
            return fn() || en;
        },
        windows: function() {
            return fn() || on;
        },
        osx: function() {
            return fn() || nn;
        },
        linux: function() {
            return fn() || rn;
        },
        iphone: function() {
            return fn() || ln;
        },
        mobile: function() {
            return fn() || ln || cn || an || dn;
        },
        nativeApp: function() {
            return fn() || un;
        },
        android: function() {
            return fn() || an;
        },
        ipad: function() {
            return fn() || cn;
        }
    }, gn = hn, yn = !("undefined" == typeof window || !window.document || !window.document.createElement), wn = {
        canUseDOM: yn,
        canUseWorkers: "undefined" != typeof Worker,
        canUseEventListeners: yn && !(!window.addEventListener && !window.attachEvent),
        canUseViewport: yn && !!window.screen,
        isInWorker: !yn
    };
    wn.canUseDOM && (mn = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""))
    /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */;
    var bn = function(e, t) {
        if (!wn.canUseDOM || t && !("addEventListener" in document)) return !1;
        var n = "on" + e, o = n in document;
        if (!o) {
            var r = document.createElement("div");
            r.setAttribute(n, "return;"), o = "function" == typeof r[n];
        }
        return !o && mn && "wheel" === e && (o = document.implementation.hasFeature("Events.wheel", "3.0")), 
        o;
    };
    function vn(e) {
        var t = 0, n = 0, o = 0, r = 0;
        return "detail" in e && (n = e.detail), "wheelDelta" in e && (n = -e.wheelDelta / 120), 
        "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), 
        "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = n, n = 0), o = 10 * t, r = 10 * n, 
        "deltaY" in e && (r = e.deltaY), "deltaX" in e && (o = e.deltaX), (o || r) && e.deltaMode && (1 == e.deltaMode ? (o *= 40, 
        r *= 40) : (o *= 800, r *= 800)), o && !t && (t = o < 1 ? -1 : 1), r && !n && (n = r < 1 ? -1 : 1), 
        {
            spinX: t,
            spinY: n,
            pixelX: o,
            pixelY: r
        };
    }
    vn.getEventType = function() {
        return gn.firefox() ? "DOMMouseScroll" : bn("wheel") ? "wheel" : "mousewheel";
    };
    var xn = vn, kn = V((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(Rt), a = o(xn);
        const i = new Map;
        let s;
        function l(e, t) {
            let n = [];
            return Array.isArray(t.arg) ? n = t.arg : n.push(t.arg), function(o, r) {
                const a = t.instance.popperRef, i = o.target, s = null == r ? void 0 : r.target, l = !t || !t.instance, c = !i || !s, u = e.contains(i) || e.contains(s), d = e === i, p = n.length && n.some(e => null == e ? void 0 : e.contains(i)) || n.length && n.includes(s), f = a && (a.contains(i) || a.contains(s));
                l || c || u || d || p || f || t.value(o, r);
            };
        }
        r.default || ($t.on(document, "mousedown", e => s = e), $t.on(document, "mouseup", e => {
            for (const {documentHandler: t} of i.values()) t(e, s);
        }));
        const c = {
            beforeMount(e, t) {
                i.set(e, {
                    documentHandler: l(e, t),
                    bindingFn: t.value
                });
            },
            updated(e, t) {
                i.set(e, {
                    documentHandler: l(e, t),
                    bindingFn: t.value
                });
            },
            unmounted(e) {
                i.delete(e);
            }
        };
        var u = {
            beforeMount(e, t) {
                let n, o = null;
                const r = () => t.value && t.value(), a = () => {
                    Date.now() - n < 100 && r(), clearInterval(o), o = null;
                };
                $t.on(e, "mousedown", e => {
                    0 === e.button && (n = Date.now(), $t.once(document, "mouseup", a), clearInterval(o), 
                    o = setInterval(r, 100));
                });
            }
        };
        const d = [], p = e => {
            if (0 === d.length) return;
            const t = d[d.length - 1]["_trap-focus-children"];
            if (t.length > 0 && e.code === Wt.EVENT_CODE.tab) {
                if (1 === t.length) return e.preventDefault(), void (document.activeElement !== t[0] && t[0].focus());
                const n = e.shiftKey, o = e.target === t[0], r = e.target === t[t.length - 1];
                o && n && (e.preventDefault(), t[t.length - 1].focus()), r && !n && (e.preventDefault(), 
                t[0].focus());
            }
        }, f = {
            beforeMount(e) {
                e["_trap-focus-children"] = Wt.obtainAllFocusableElements(e), d.push(e), d.length <= 1 && $t.on(document, "keydown", p);
            },
            updated(e) {
                t.nextTick(() => {
                    e["_trap-focus-children"] = Wt.obtainAllFocusableElements(e);
                });
            },
            unmounted() {
                d.shift(), 0 === d.length && $t.off(document, "keydown", p);
            }
        }, m = "undefined" != typeof navigator && navigator.userAgent.toLowerCase().indexOf("firefox") > -1, h = {
            beforeMount(e, t) {
                !function(e, t) {
                    if (e && e.addEventListener) {
                        const n = function(e) {
                            const n = a.default(e);
                            t && t.apply(this, [ e, n ]);
                        };
                        m ? e.addEventListener("DOMMouseScroll", n) : e.onmousewheel = n;
                    }
                }(e, t.value);
            }
        };
        n.ClickOutside = c, n.Mousewheel = h, n.RepeatClick = u, n.TrapFocus = f;
    }));
    D(kn);
    kn.ClickOutside, kn.Mousewheel, kn.RepeatClick, kn.TrapFocus;
    var On = V((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(I), a = o(Gt);
        function i(e, t = []) {
            const {arrow: n, arrowOffset: o, offset: r, gpuAcceleration: a, fallbackPlacements: i} = e, s = [ {
                name: "offset",
                options: {
                    offset: [ 0, null != r ? r : 12 ]
                }
            }, {
                name: "preventOverflow",
                options: {
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5
                    }
                }
            }, {
                name: "flip",
                options: {
                    padding: 5,
                    fallbackPlacements: null != i ? i : []
                }
            }, {
                name: "computeStyles",
                options: {
                    gpuAcceleration: a,
                    adaptive: a
                }
            } ];
            return n && s.push({
                name: "arrow",
                options: {
                    element: n,
                    padding: null != o ? o : 5
                }
            }), s.push(...t), s;
        }
        var s, l = Object.defineProperty, c = Object.defineProperties, u = Object.getOwnPropertyDescriptors, d = Object.getOwnPropertySymbols, p = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable, m = (e, t, n) => t in e ? l(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        function h(e, n) {
            return t.computed(() => {
                var t;
                return ((e, t) => c(e, u(t)))(((e, t) => {
                    for (var n in t || (t = {})) p.call(t, n) && m(e, n, t[n]);
                    if (d) for (var n of d(t)) f.call(t, n) && m(e, n, t[n]);
                    return e;
                })({
                    placement: e.placement
                }, e.popperOptions), {
                    modifiers: i({
                        arrow: n.arrow.value,
                        arrowOffset: e.arrowOffset,
                        offset: e.offset,
                        gpuAcceleration: e.gpuAcceleration,
                        fallbackPlacements: e.fallbackPlacements
                    }, null == (t = e.popperOptions) ? void 0 : t.modifiers)
                });
            });
        }
        (s = n.Effect || (n.Effect = {})).DARK = "dark", s.LIGHT = "light";
        var g = {
            arrowOffset: {
                type: Number,
                default: 5
            },
            appendToBody: {
                type: Boolean,
                default: !0
            },
            autoClose: {
                type: Number,
                default: 0
            },
            boundariesPadding: {
                type: Number,
                default: 0
            },
            content: {
                type: String,
                default: ""
            },
            class: {
                type: String,
                default: ""
            },
            style: Object,
            hideAfter: {
                type: Number,
                default: 200
            },
            cutoff: {
                type: Boolean,
                default: !1
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            effect: {
                type: String,
                default: n.Effect.DARK
            },
            enterable: {
                type: Boolean,
                default: !0
            },
            manualMode: {
                type: Boolean,
                default: !1
            },
            showAfter: {
                type: Number,
                default: 0
            },
            offset: {
                type: Number,
                default: 12
            },
            placement: {
                type: String,
                default: "bottom"
            },
            popperClass: {
                type: String,
                default: ""
            },
            pure: {
                type: Boolean,
                default: !1
            },
            popperOptions: {
                type: Object,
                default: () => null
            },
            showArrow: {
                type: Boolean,
                default: !0
            },
            strategy: {
                type: String,
                default: "fixed"
            },
            transition: {
                type: String,
                default: "el-fade-in-linear"
            },
            trigger: {
                type: [ String, Array ],
                default: "hover"
            },
            visible: {
                type: Boolean,
                default: void 0
            },
            stopPopperMouseEvent: {
                type: Boolean,
                default: !0
            },
            gpuAcceleration: {
                type: Boolean,
                default: !0
            },
            fallbackPlacements: {
                type: Array,
                default: []
            }
        };
        function y(e, {emit: n}) {
            const o = t.ref(null), r = t.ref(null), i = t.ref(null), s = "el-popper-" + Ut.generateId();
            let l = null, c = null, u = null, d = !1;
            const p = () => e.manualMode || "manual" === e.trigger, f = t.ref({
                zIndex: a.default.nextZIndex()
            }), m = h(e, {
                arrow: o
            }), g = t.reactive({
                visible: !!e.visible
            }), y = t.computed({
                get: () => !e.disabled && (Ut.isBool(e.visible) ? e.visible : g.visible),
                set(t) {
                    p() || (Ut.isBool(e.visible) ? n("update:visible", t) : g.visible = t);
                }
            });
            function w() {
                e.autoClose > 0 && (u = window.setTimeout(() => {
                    b();
                }, e.autoClose)), y.value = !0;
            }
            function b() {
                y.value = !1;
            }
            function v() {
                clearTimeout(c), clearTimeout(u);
            }
            const x = () => {
                p() || e.disabled || (v(), 0 === e.showAfter ? w() : c = window.setTimeout(() => {
                    w();
                }, e.showAfter));
            }, k = () => {
                p() || (v(), e.hideAfter > 0 ? u = window.setTimeout(() => {
                    O();
                }, e.hideAfter) : O());
            }, O = () => {
                b(), e.disabled && C(!0);
            };
            function E() {
                if (!Ut.$(y)) return;
                const e = Ut.$(r), t = Ut.isHTMLElement(e) ? e : e.$el;
                l = Je.createPopper(t, Ut.$(i), Ut.$(m)), l.update();
            }
            function C(e) {
                !l || Ut.$(y) && !e || S();
            }
            function S() {
                var e;
                null == (e = null == l ? void 0 : l.destroy) || e.call(l), l = null;
            }
            const M = {};
            if (!p()) {
                const t = () => {
                    Ut.$(y) ? k() : x();
                }, n = e => {
                    switch (e.stopPropagation(), e.type) {
                      case "click":
                        d ? d = !1 : t();
                        break;

                      case "mouseenter":
                        x();
                        break;

                      case "mouseleave":
                        k();
                        break;

                      case "focus":
                        d = !0, x();
                        break;

                      case "blur":
                        d = !1, k();
                    }
                }, o = {
                    click: [ "onClick" ],
                    hover: [ "onMouseenter", "onMouseleave" ],
                    focus: [ "onFocus", "onBlur" ]
                }, r = e => {
                    o[e].forEach(e => {
                        M[e] = n;
                    });
                };
                Ut.isArray(e.trigger) ? Object.values(e.trigger).forEach(r) : r(e.trigger);
            }
            return t.watch(m, e => {
                l && (l.setOptions(e), l.update());
            }), t.watch(y, (function(e) {
                e && (f.value.zIndex = a.default.nextZIndex(), E());
            })), {
                update: function() {
                    Ut.$(y) && (l ? l.update() : E());
                },
                doDestroy: C,
                show: x,
                hide: k,
                onPopperMouseEnter: function() {
                    e.enterable && "click" !== e.trigger && clearTimeout(u);
                },
                onPopperMouseLeave: function() {
                    const {trigger: t} = e;
                    Ut.isString(t) && ("click" === t || "focus" === t) || 1 === t.length && ("click" === t[0] || "focus" === t[0]) || k();
                },
                onAfterEnter: () => {
                    n("after-enter");
                },
                onAfterLeave: () => {
                    S(), n("after-leave");
                },
                onBeforeEnter: () => {
                    n("before-enter");
                },
                onBeforeLeave: () => {
                    n("before-leave");
                },
                initializePopper: E,
                isManualMode: p,
                arrowRef: o,
                events: M,
                popperId: s,
                popperInstance: l,
                popperRef: i,
                popperStyle: f,
                triggerRef: r,
                visibility: y
            };
        }
        const w = () => {};
        function b(e, n) {
            const {effect: o, name: r, stopPopperMouseEvent: a, popperClass: i, popperStyle: s, popperRef: l, pure: c, popperId: u, visibility: d, onMouseenter: p, onMouseleave: f, onAfterEnter: m, onAfterLeave: h, onBeforeEnter: g, onBeforeLeave: y} = e, b = [ i, "el-popper", "is-" + o, c ? "is-pure" : "" ], v = a ? $t.stop : w;
            return t.h(t.Transition, {
                name: r,
                onAfterEnter: m,
                onAfterLeave: h,
                onBeforeEnter: g,
                onBeforeLeave: y
            }, {
                default: t.withCtx(() => [ t.withDirectives(t.h("div", {
                    "aria-hidden": String(!d),
                    class: b,
                    style: null != s ? s : {},
                    id: u,
                    ref: null != l ? l : "popperRef",
                    role: "tooltip",
                    onMouseenter: p,
                    onMouseleave: f,
                    onClick: $t.stop,
                    onMousedown: v,
                    onMouseup: v
                }, n), [ [ t.vShow, d ] ]) ])
            });
        }
        function v(e, n) {
            const o = Yt.getFirstValidNode(e, 1);
            return o || r.default("renderTrigger", "trigger expects single rooted node"), t.cloneVNode(o, n, !0);
        }
        function x(e) {
            return e ? t.h("div", {
                ref: "arrowRef",
                class: "el-popper__arrow",
                "data-popper-arrow": ""
            }, null) : t.h(t.Comment, null, "");
        }
        var k = Object.defineProperty, O = Object.getOwnPropertySymbols, E = Object.prototype.hasOwnProperty, C = Object.prototype.propertyIsEnumerable, S = (e, t, n) => t in e ? k(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        var M = t.defineComponent({
            name: "ElPopper",
            props: g,
            emits: [ "update:visible", "after-enter", "after-leave", "before-enter", "before-leave" ],
            setup(e, n) {
                n.slots.trigger || r.default("ElPopper", "Trigger must be provided");
                const o = y(e, n), a = () => o.doDestroy(!0);
                return t.onMounted(o.initializePopper), t.onBeforeUnmount(a), t.onActivated(o.initializePopper), 
                t.onDeactivated(a), o;
            },
            render() {
                var e;
                const {$slots: n, appendToBody: o, class: r, style: a, effect: i, hide: s, onPopperMouseEnter: l, onPopperMouseLeave: c, onAfterEnter: u, onAfterLeave: d, onBeforeEnter: p, onBeforeLeave: f, popperClass: m, popperId: h, popperStyle: g, pure: y, showArrow: w, transition: k, visibility: M, stopPopperMouseEvent: N} = this, T = this.isManualMode(), P = x(w), _ = b({
                    effect: i,
                    name: k,
                    popperClass: m,
                    popperId: h,
                    popperStyle: g,
                    pure: y,
                    stopPopperMouseEvent: N,
                    onMouseenter: l,
                    onMouseleave: c,
                    onAfterEnter: u,
                    onAfterLeave: d,
                    onBeforeEnter: p,
                    onBeforeLeave: f,
                    visibility: M
                }, [ t.renderSlot(n, "default", {}, () => [ t.toDisplayString(this.content) ]), P ]), A = null == (e = n.trigger) ? void 0 : e.call(n), j = ((e, t) => {
                    for (var n in t || (t = {})) E.call(t, n) && S(e, n, t[n]);
                    if (O) for (var n of O(t)) C.call(t, n) && S(e, n, t[n]);
                    return e;
                })({
                    "aria-describedby": h,
                    class: r,
                    style: a,
                    ref: "triggerRef"
                }, this.events), B = T ? v(A, j) : t.withDirectives(v(A, j), [ [ kn.ClickOutside, s ] ]);
                return t.h(t.Fragment, null, [ B, t.h(t.Teleport, {
                    to: "body",
                    disabled: !o
                }, [ _ ]) ]);
            }
        });
        M.__file = "packages/popper/src/index.vue", M.install = e => {
            e.component(M.name, M);
        };
        const N = M;
        n.default = N, n.defaultProps = g, n.renderArrow = x, n.renderPopper = b, n.renderTrigger = v, 
        n.usePopper = y;
    }));
    D(On);
    On.Effect, On.defaultProps, On.renderArrow, On.renderPopper, On.renderTrigger, On.usePopper;
    var En = D(V((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(On), a = o(Gt), i = Object.defineProperty, s = Object.defineProperties, l = Object.getOwnPropertyDescriptors, c = Object.getOwnPropertySymbols, u = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable, p = (e, t, n) => t in e ? i(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        function f(e, n) {
            const o = t.ref(a.default.nextZIndex()), r = t.computed(() => Ut.isString(e.width) ? e.width : e.width + "px"), i = t.computed(() => ({
                width: r.value,
                zIndex: o.value
            })), f = On.usePopper(e, n);
            return t.watch(f.visibility, e => {
                e && (o.value = a.default.nextZIndex()), n.emit(e ? "show" : "hide");
            }), ((e, t) => s(e, l(t)))(((e, t) => {
                for (var n in t || (t = {})) u.call(t, n) && p(e, n, t[n]);
                if (c) for (var n of c(t)) d.call(t, n) && p(e, n, t[n]);
                return e;
            })({}, f), {
                popperStyle: i
            });
        }
        var m = Object.defineProperty, h = Object.defineProperties, g = Object.getOwnPropertyDescriptors, y = Object.getOwnPropertySymbols, w = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable, v = (e, t, n) => t in e ? m(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n, x = (e, t) => {
            for (var n in t || (t = {})) w.call(t, n) && v(e, n, t[n]);
            if (y) for (var n of y(t)) b.call(t, n) && v(e, n, t[n]);
            return e;
        };
        const k = [ "update:visible", "after-enter", "after-leave", "show", "hide" ], O = {
            key: 0,
            class: "el-popover__title",
            role: "title"
        };
        var E, C, S = t.defineComponent({
            name: "ElPopover",
            components: {
                ElPopper: r.default
            },
            props: (E = x({}, On.defaultProps), C = {
                content: {
                    type: String
                },
                trigger: {
                    type: String,
                    default: "click"
                },
                title: {
                    type: String
                },
                transition: {
                    type: String,
                    default: "fade-in-linear"
                },
                width: {
                    type: [ String, Number ],
                    default: 150
                },
                appendToBody: {
                    type: Boolean,
                    default: !0
                },
                tabindex: [ String, Number ]
            }, h(E, g(C))),
            emits: k,
            setup: (e, t) => f(e, t),
            render() {
                const {$slots: e} = this, n = e.reference ? e.reference() : null, o = Yt.renderIf(this.title, "div", O, t.toDisplayString(this.title), Yt.PatchFlags.TEXT), r = t.renderSlot(e, "default", {}, () => [ t.createTextVNode(t.toDisplayString(this.content), Yt.PatchFlags.TEXT) ]), {events: a, onAfterEnter: i, onAfterLeave: s, onPopperMouseEnter: l, onPopperMouseLeave: c, popperStyle: u, popperId: d, popperClass: p, showArrow: f, transition: m, visibility: h, tabindex: g} = this, y = [ this.content ? "el-popover--plain" : "", "el-popover", p ].join(" ");
                let w = On.renderPopper({
                    effect: On.Effect.LIGHT,
                    name: m,
                    popperClass: y,
                    popperStyle: u,
                    popperId: d,
                    visibility: h,
                    onMouseenter: l,
                    onMouseleave: c,
                    onAfterEnter: i,
                    onAfterLeave: s,
                    stopPopperMouseEvent: !1
                }, [ o, r, On.renderArrow(f) ]);
                const b = n ? On.renderTrigger(n, x({
                    ariaDescribedby: d,
                    ref: "triggerRef",
                    tabindex: g
                }, a)) : t.createCommentVNode("v-if", !0);
                return t.h(t.Fragment, null, [ "click" === this.trigger ? t.withDirectives(b, [ [ kn.ClickOutside, this.hide ] ]) : b, t.h(t.Teleport, {
                    disabled: !this.appendToBody,
                    to: "body"
                }, [ w ]) ]);
            }
        });
        S.__file = "packages/popover/src/index.vue";
        const M = (e, t, n) => {
            const o = t.arg || t.value, r = n.dirs[0].instance.$refs[o];
            r && (r.triggerRef = e, e.setAttribute("tabindex", r.tabindex), Object.entries(r.events).forEach(([t, n]) => {
                $t.on(e, t.toLowerCase().slice(2), n);
            }));
        };
        var N = {
            mounted(e, t, n) {
                M(e, t, n);
            },
            updated(e, t, n) {
                M(e, t, n);
            }
        };
        S.install = e => {
            e.component(S.name, S), e.directive("popover", N);
        }, S.directive = N;
        const T = S;
        n.default = T;
    }))), Cn = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    Cn.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("i", {
            class: [ "as-menu-item-icon", "icon-" + o.name ]
        }, null, 2);
    }, Cn.__file = "src/components/icon.vue";
    var Sn = {
        name: "menuItem",
        components: {
            popover: En,
            icon: Cn
        },
        props: {
            item: {
                type: Object
            },
            mode: {
                type: String,
                default: "horizontal"
            }
        },
        setup(t) {
            const n = e.ref(/Android|webOS|iPhone|iPod|BlackBerry|iphone os|ipad/.test(navigator.userAgent.toLowerCase())), o = m(), r = e.computed(() => "horizontal" === t.mode ? "horizontal" : "vertical"), a = e.computed(() => "horizontal" === t.mode ? "bottom-start" : "right-start");
            const i = () => {
                let e = function() {
                    const e = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                    return e ? "INPUT" === e.nodeName || "textarea" === e.localName ? e.value : e.textContent : "";
                }();
                return o && o.keyword && (e = o.keyword()), encodeURIComponent(e);
            };
            return {
                placement: a,
                classList: r,
                getFavicon: function(e) {
                    return e.icon ? e.icon : j(e.url).origin + "/favicon.ico";
                },
                handleMenuShow: (e, t) => {
                    t.show = e;
                },
                handleClick: (t, n, o) => {
                    if (e.unref(o)) return;
                    const r = i();
                    n ? window.open(t.url.replace("%s", r)) : window.location.href = t.url.replace("%s", r);
                },
                isMobileRef: n
            };
        }
    };
    const Mn = {
        class: "as-subMenu"
    }, Nn = {
        class: "as-url-icon"
    };
    Sn.render = function(t, n, o, r, a, i) {
        const s = e.resolveComponent("icon"), l = e.resolveComponent("popover");
        return e.openBlock(), e.createBlock(l, {
            "append-to-body": !1,
            placement: r.placement,
            trigger: r.isMobileRef ? "click" : "hover",
            "popper-class": "as-subMenu-container"
        }, {
            reference: e.withCtx(() => [ e.createVNode("div", {
                class: [ "as-menu-item", r.classList ]
            }, [ e.createVNode(s, {
                name: o.item.name
            }, null, 8, [ "name" ]), e.createVNode("span", {
                class: "as-menu-item-title",
                textContent: e.toDisplayString(o.item.nameZh),
                onClick: n[1] || (n[1] = e => r.handleClick(o.item.list[0], !1, r.isMobileRef)),
                onMouseup: n[2] || (n[2] = e.withModifiers(e => r.handleClick(o.item.list[0], !0), [ "middle" ]))
            }, null, 40, [ "textContent" ]) ], 2) ]),
            default: e.withCtx(() => [ e.createVNode("ul", Mn, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(o.item.list, (t, n) => e.withDirectives((e.openBlock(), 
            e.createBlock("li", {
                key: `${o.item.name}_${n}`,
                onClick: e => r.handleClick(t),
                onMouseup: e.withModifiers(e => r.handleClick(t, !0), [ "middle" ])
            }, [ e.createVNode("div", Nn, [ e.createVNode("img", {
                src: r.getFavicon(t),
                onerror: "this.classList.add('error')"
            }, null, 8, [ "src" ]) ]), e.createVNode("p", {
                class: "as-subMenu-text",
                textContent: e.toDisplayString(t.nameZh)
            }, null, 8, [ "textContent" ]) ], 40, [ "onClick", "onMouseup" ])), [ [ e.vShow, t.data.visible ] ])), 128)) ]) ]),
            _: 1
        }, 8, [ "placement", "trigger" ]);
    }, Sn.__file = "src/components/menuItem.vue";
    const Tn = i("align"), Pn = new Map([ [ "flex-start", "开始" ], [ "center", "居中" ], [ "flex-end", "末尾" ] ]), _n = e => Pn.has(e) ? e : "flex-start", An = e.ref(_n(Tn)), jn = e.reactive(Pn);
    function Bn() {
        return {
            alignList: jn,
            align: An
        };
    }
    e.watch(An, e => {
        s("align", _n(e));
    });
    var Ln = {
        name: "as-menu",
        components: {
            menuItem: Sn
        },
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].indexOf(e) > -1
            }
        },
        setup(t) {
            const n = e.reactive(L("tm")), {align: o} = Bn();
            return {
                sites: n,
                data: e.reactive({
                    showTimeout: 50,
                    hideTimeout: 200
                }),
                align: o,
                transition: e.computed(() => "horizontal" === t.mode ? "drop" : "fade"),
                menuClass: e.computed(() => ({
                    "as-horizontal-menu": "horizontal" === t.mode,
                    "as-vertical-menu": "vertical" === t.mode
                }))
            };
        }
    };
    const Dn = {
        class: "as-menu-container"
    };
    Ln.render = function(t, n, o, r, a, i) {
        const s = e.resolveComponent("menu-item");
        return e.openBlock(), e.createBlock("div", Dn, [ e.createVNode("ul", {
            class: [ "as-menu", r.menuClass ],
            style: {
                justifyContent: r.align
            }
        }, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(r.sites, t => (e.openBlock(), 
        e.createBlock(s, {
            key: t.name,
            item: t,
            mode: o.mode
        }, null, 8, [ "item", "mode" ]))), 128)) ], 6) ]);
    }, Ln.__file = "src/components/menu.vue";
    const Vn = e.ref(""), In = e.ref(""), Fn = e.ref("");
    e.watch(Vn, e => {
        Zn("primary-color", e), s("primary-color", e);
    }), e.watch(In, e => {
        Zn("bg-color", e), s("bg-color", e);
    }), e.watch(Fn, e => {
        Zn("primary-text-color", e), s("primary-text-color", e);
    });
    const Zn = (e, t) => {
        document.getElementById("all-search").style.setProperty("--as-" + e, t), document.body.style.setProperty("--as-" + e, t);
    }, qn = {
        "primary-color": Vn,
        "bg-color": In,
        "primary-text-color": Fn
    }, zn = e => {
        const t = (e => {
            const t = document.getElementById("all-search");
            return getComputedStyle(t).getPropertyValue("--as-" + e).trim();
        })(e), n = i(e) || t;
        qn[e].value = n;
    };
    function Rn() {
        return e.onMounted(() => {
            zn("primary-color"), zn("bg-color"), zn("primary-text-color");
        }), {
            primaryColor: Vn,
            bgColor: In,
            primaryTextColor: Fn
        };
    }
    var Un = {
        name: "overlay",
        setup(e, {emit: t}) {
            let n = !1, o = !1;
            return {
                onMouseDown: e => {
                    n = e.target === e.currentTarget;
                },
                onMouseUp: e => {
                    o = e.target === e.currentTarget;
                },
                onMaskClick: e => {
                    n && o && t("click", e), n = o = !1;
                }
            };
        }
    };
    Un.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("div", {
            class: "as-overlay",
            onMousedown: n[1] || (n[1] = (...e) => r.onMouseDown && r.onMouseDown(...e)),
            onMouseup: n[2] || (n[2] = (...e) => r.onMouseUp && r.onMouseUp(...e)),
            onClick: n[3] || (n[3] = (...e) => r.onMaskClick && r.onMaskClick(...e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, Un.__file = "src/components/overlay.vue";
    var Hn = {
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
        setup: (t, n) => ({
            model: e.computed({
                get: () => t.modelValue,
                set(e) {
                    n.emit("update:modelValue", e);
                }
            })
        })
    };
    const $n = {
        class: "as-radio as-radio-animate"
    }, Wn = e.createVNode("i", {
        class: "as-radio-icon"
    }, null, -1), Gn = {
        class: "as-radio-label"
    };
    Hn.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("label", $n, [ e.withDirectives(e.createVNode("input", {
            type: "radio",
            value: o.label,
            "onUpdate:modelValue": n[1] || (n[1] = e => r.model = e)
        }, null, 8, [ "value" ]), [ [ e.vModelRadio, r.model ] ]), Wn, e.createVNode("span", Gn, [ e.renderSlot(t.$slots, "default") ]) ]);
    }, Hn.__file = "src/components/radio.vue";
    var Yn = {
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
    Yn.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("div", null, [ e.createVNode("label", {
            class: "as-label",
            style: r.labelStyle,
            textContent: e.toDisplayString(o.label)
        }, null, 12, [ "textContent" ]), e.createVNode("div", {
            class: "as-content",
            style: r.contentStyle
        }, [ e.renderSlot(t.$slots, "default") ], 4) ]);
    }, Yn.__file = "src/components/form-item.vue";
    var Xn = {
        name: "xButton",
        props: {
            type: {
                type: String,
                default: "primary"
            }
        }
    };
    Xn.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("button", {
            class: [ "as-button", "as-button__" + o.type ]
        }, [ e.renderSlot(t.$slots, "default") ], 2);
    }, Xn.__file = "src/components/button.vue";
    var Kn = {
        name: "color",
        components: {
            asButton: Xn
        },
        props: {
            modelValue: {
                type: [ String, Number ]
            },
            defaultValue: {
                type: [ String, Number ]
            }
        },
        setup(t, n) {
            const o = e.computed({
                get: () => t.modelValue,
                set(e) {
                    n.emit("update:modelValue", e);
                }
            });
            return {
                model: o,
                reset: () => {
                    o.value = t.defaultValue;
                }
            };
        }
    };
    const Jn = e.withScopeId("data-v-2532dbfa");
    e.pushScopeId("data-v-2532dbfa");
    const Qn = {
        class: "color-set"
    }, eo = {
        class: "label"
    }, to = e.createTextVNode(" 重置 ");
    e.popScopeId();
    const no = Jn((t, n, o, r, a, i) => {
        const s = e.resolveComponent("asButton");
        return e.openBlock(), e.createBlock("div", Qn, [ e.createVNode("label", eo, [ e.withDirectives(e.createVNode("input", {
            class: "input—color",
            type: "color",
            "onUpdate:modelValue": n[1] || (n[1] = e => r.model = e)
        }, null, 512), [ [ e.vModelText, r.model ] ]) ]), e.createVNode(s, {
            class: "reset-btn",
            type: "text",
            onClick: r.reset
        }, {
            default: Jn(() => [ to ]),
            _: 1
        }, 8, [ "onClick" ]) ]);
    });
    Kn.render = no, Kn.__scopeId = "data-v-2532dbfa", Kn.__file = "src/components/color.vue";
    var oo = {
        name: "side-bar",
        components: {
            overlay: Un,
            asRadio: Hn,
            formItem: Yn,
            color: Kn
        },
        setup() {
            const t = e.ref(!1), {mode: n} = T(), {alignList: o, align: r} = Bn(), {primaryColor: a, bgColor: i, primaryTextColor: s} = Rn();
            return {
                mode: n,
                visible: t,
                open: () => {
                    t.value = !0;
                },
                onMaskClick: () => {
                    t.value = !1;
                },
                changeMode: e => {
                    n.value = e.target.value;
                },
                alignList: o,
                align: r,
                changeAlign: e => {
                    r.value = e.target.value;
                },
                primaryColor: a,
                bgColor: i,
                primaryTextColor: s
            };
        }
    };
    const ro = e.createVNode("header", {
        class: "header"
    }, " 设置 ", -1), ao = e.createTextVNode("横向 "), io = e.createTextVNode("竖向 "), so = e.createVNode("footer", null, [ e.createVNode("a", {
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
    oo.render = function(t, n, o, r, a, i) {
        const s = e.resolveComponent("as-radio"), l = e.resolveComponent("form-item"), c = e.resolveComponent("color"), u = e.resolveComponent("overlay");
        return e.openBlock(), e.createBlock(e.Fragment, null, [ e.createVNode("div", {
            class: "as-setting",
            onClick: n[1] || (n[1] = (...e) => r.open && r.open(...e))
        }, " 设置 "), (e.openBlock(), e.createBlock(e.Teleport, {
            to: "#all-search"
        }, [ e.createVNode(e.Transition, {
            name: "overlay",
            appear: ""
        }, {
            default: e.withCtx(() => [ e.withDirectives(e.createVNode(u, {
                onClick: r.onMaskClick
            }, {
                default: e.withCtx(() => [ e.createVNode(e.Transition, {
                    name: "drawer",
                    appear: ""
                }, {
                    default: e.withCtx(() => [ e.withDirectives(e.createVNode("div", {
                        "aria-modal": "true",
                        role: "dialog",
                        class: "as-side-bar",
                        onClick: n[8] || (n[8] = e.withModifiers(() => {}, [ "stop" ]))
                    }, [ ro, e.createVNode("section", null, [ e.createVNode(l, {
                        label: "方向"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(s, {
                            label: "horizontal",
                            modelValue: r.mode,
                            "onUpdate:modelValue": n[2] || (n[2] = e => r.mode = e),
                            onChange: r.changeMode
                        }, {
                            default: e.withCtx(() => [ ao ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]), e.createVNode(s, {
                            label: "vertical",
                            modelValue: r.mode,
                            "onUpdate:modelValue": n[3] || (n[3] = e => r.mode = e),
                            onChange: r.changeMode
                        }, {
                            default: e.withCtx(() => [ io ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]) ]),
                        _: 1
                    }), e.createVNode(l, {
                        label: "对齐"
                    }, {
                        default: e.withCtx(() => [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(r.alignList, ([t, o]) => (e.openBlock(), 
                        e.createBlock(s, {
                            key: t,
                            label: t,
                            modelValue: r.align,
                            "onUpdate:modelValue": n[4] || (n[4] = e => r.align = e),
                            onChange: r.changeAlign
                        }, {
                            default: e.withCtx(() => [ e.createTextVNode(e.toDisplayString(o), 1) ]),
                            _: 2
                        }, 1032, [ "label", "modelValue", "onChange" ]))), 128)) ]),
                        _: 1
                    }), e.createVNode(l, {
                        label: "主题色"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(c, {
                            "default-value": "#1890ff",
                            modelValue: r.primaryColor,
                            "onUpdate:modelValue": n[5] || (n[5] = e => r.primaryColor = e)
                        }, null, 8, [ "modelValue" ]) ]),
                        _: 1
                    }), e.createVNode(l, {
                        label: "背景色"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(c, {
                            "default-value": "#ffffff",
                            modelValue: r.bgColor,
                            "onUpdate:modelValue": n[6] || (n[6] = e => r.bgColor = e)
                        }, null, 8, [ "modelValue" ]) ]),
                        _: 1
                    }), e.createVNode(l, {
                        label: "文字色"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(c, {
                            "default-value": "#606266",
                            modelValue: r.primaryTextColor,
                            "onUpdate:modelValue": n[7] || (n[7] = e => r.primaryTextColor = e)
                        }, null, 8, [ "modelValue" ]) ]),
                        _: 1
                    }) ]), so ], 512), [ [ e.vShow, r.visible ] ]) ]),
                    _: 1
                }) ]),
                _: 1
            }, 8, [ "onClick" ]), [ [ e.vShow, r.visible ] ]) ]),
            _: 1
        }) ])) ], 64);
    }, oo.__file = "src/components/side-bar.vue";
    var lo = {
        name: "all-search",
        components: {
            logo: P,
            asMenu: Ln,
            sideBar: oo
        },
        setup() {
            const t = m(), n = e.computed(() => [ "as-" + o.value ]), {mode: o} = T();
            return O(), {
                currentSite: t,
                mode: o,
                classList: n
            };
        }
    };
    lo.render = function(t, n, o, r, a, i) {
        const s = e.resolveComponent("logo"), l = e.resolveComponent("as-menu"), c = e.resolveComponent("side-bar");
        return e.openBlock(), e.createBlock("div", {
            class: [ "as-container", r.classList ],
            style: {
                display: "none"
            }
        }, [ e.createVNode(s, {
            mode: r.mode
        }, null, 8, [ "mode" ]), e.createVNode(l, {
            mode: r.mode
        }, null, 8, [ "mode" ]), e.createVNode(c) ], 2);
    }, lo.__file = "src/as-script/index.vue";
    let co = m();
    const uo = e.createApp(lo);
    function po() {
        co = m();
        const e = document.getElementById("all-search");
        if (e) e.style.display = co.invisible ? "none" : "unset"; else {
            const e = function() {
                let e = document.createElement("div");
                return e.id = "all-search", e;
            }(), t = document.body.parentElement.insertBefore(e, document.body);
            uo.mount(t), function() {
                const e = function() {
                    document.dispatchEvent(new CustomEvent(d, {
                        detail: {
                            version: o,
                            getSession: i,
                            setSession: s
                        }
                    }));
                };
                document.addEventListener(p, e), e();
            }();
        }
    }
    console.log("all-search running 全搜运行中(production)"), function() {
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
        po();
    }).catch(e => {
        console.error(e);
    });
}(Vue);
