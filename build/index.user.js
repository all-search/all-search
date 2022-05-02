// ==UserScript==
// @name         all-search 全搜v1.1.12，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      1.1.12
// @description  2022年5月2日更新 竖向横向布局随意切换，支持图形界面自定义设置分类和添加链接，个人配置自动保存到谷歌插件。
// @author       endday
// @license      GPL-2.0
// @update       2022/5/2
// @homepageURL  https://github.com/endday/all-search
// @updateURL    https://cdn.jsdelivr.net/npm/all-search@latest/build/index.user.js
// @downloadURL  https://cdn.jsdelivr.net/npm/all-search@latest/build/index.user.js
// @noframes
// @require      https://cdn.bootcdn.net/ajax/libs/vue/3.1.2/vue.global.prod.min.js
// @resource     as-icon  https://cdn.jsdelivr.net/npm/all-search@1.1.12/src/assets/iconfont.css
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search@1.1.12/build/as-style.css
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
// @include      /\/\/so\.toutiao\.com\/search/
// @include      /\/\/endday\.github\.io/
// @include      /\/\/endday\.gitee\.io/

// ==/UserScript==
/* eslint-disable */

!function(e) {
    "use strict";
    var t = "default" in e ? e.default : e, n = "1.1.12";
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
        url: /\/\/so\.toutiao\.com\/search/,
        style: {}
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
    let v = m();
    const g = i("mode"), b = "vertical" !== (y = g) && "horizontal" !== y ? "horizontal" : y;
    var y;
    const w = (e = b) => {
        v = m();
        const t = document.body;
        if (t.classList.remove("body-vertical", "body-horizontal"), e) {
            const n = "body-" + e;
            t.classList.add(n);
        }
    }, x = (e = b) => {
        if (v = m(), c(".as-custom-style"), v.style) {
            let t = "";
            v.style[1] && "horizontal" === e ? t = v.style[1] : v.style[2] && "vertical" === e && (t = v.style[2]), 
            t && u(t, "as-custom-style");
        }
    }, _ = function() {
        v = m(), v.invisible || v.disabled ? c(".as-style") : l("as-style", `https://cdn.jsdelivr.net/npm/all-search@${o}/build/as-style.css`);
    }, k = function() {
        var e, t, n;
        Node.prototype.removeChild = (e = Node.prototype.removeChild, t = e => !e || "STYLE" !== e.tagName || !(e.classList.contains("as-icon") || e.classList.contains("as-style")), 
        function() {
            if (!1 !== t.apply(this, arguments)) return e.apply(this, arguments);
        }), x(), w(), l("as-icon", `https://cdn.jsdelivr.net/npm/all-search@${o}/src/assets/iconfont.css`), 
        _(), n = () => {
            v = m(), x(), w(), _();
        }, history.pushState = h(history.pushState, n), history.replaceState = h(history.replaceState, n), 
        window.addEventListener("yt-navigate-finish", n);
    }, O = i("mode"), E = e => "vertical" !== e && "horizontal" !== e ? "horizontal" : e, S = e.ref(E(O)), C = (e = "horizontal") => {
        w(e), x(e);
    };
    !function(e) {
        const t = function() {
            document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || e();
        };
        document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), 
        document.addEventListener("mozfullscreenchange", e), document.addEventListener("MSFullscreenChange", e), 
        document.addEventListener("resize", t);
    }(() => {
        C(S.value);
    }), e.watch(S, e => {
        const t = E(e);
        C(t), s("mode", t);
    });
    const M = function(e, t = 500) {
        let n = null;
        return function() {
            clearTimeout(n), n = setTimeout(() => {
                e.apply(this, arguments);
            }, t);
        };
    }(() => C(S.value));
    function T() {
        return e.onMounted(() => {
            C(S.value), window.addEventListener("resize", M, !1);
        }), e.onUnmounted(() => {
            window.removeEventListener("resize", M, !1);
        }), {
            mode: S
        };
    }
    function N() {
        return {
            isMobile: e.ref(/Android|webOS|iPhone|iPod|BlackBerry|iphone os|ipad/.test(navigator.userAgent.toLowerCase()))
        };
    }
    var A = {
        name: "logo",
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].indexOf(e) > -1
            }
        },
        setup() {
            const {isMobile: e} = N();
            return {
                isMobile: e
            };
        }
    };
    const P = e.createVNode("p", {
        class: "as-title-inner"
    }, " All Search ", -1);
    function L(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    }
    function B(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports;
    }
    A.render = function(t, n, o, r, a, i) {
        return r.isMobile ? e.createCommentVNode("v-if", !0) : (e.openBlock(), e.createBlock("a", {
            key: 0,
            class: [ "as-title", "as-title-" + o.mode ],
            href: "https://github.com/endday/all-search",
            target: "_blank"
        }, [ P ], 2));
    }, A.__file = "src/components/logo.vue";
    var j = function() {
        if ("undefined" != typeof Map) return Map;
        function e(e, t) {
            var n = -1;
            return e.some((function(e, o) {
                return e[0] === t && (n = o, !0);
            })), n;
        }
        return function() {
            function t() {
                this.__entries__ = [];
            }
            return Object.defineProperty(t.prototype, "size", {
                get: function() {
                    return this.__entries__.length;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.get = function(t) {
                var n = e(this.__entries__, t), o = this.__entries__[n];
                return o && o[1];
            }, t.prototype.set = function(t, n) {
                var o = e(this.__entries__, t);
                ~o ? this.__entries__[o][1] = n : this.__entries__.push([ t, n ]);
            }, t.prototype.delete = function(t) {
                var n = this.__entries__, o = e(n, t);
                ~o && n.splice(o, 1);
            }, t.prototype.has = function(t) {
                return !!~e(this.__entries__, t);
            }, t.prototype.clear = function() {
                this.__entries__.splice(0);
            }, t.prototype.forEach = function(e, t) {
                void 0 === t && (t = null);
                for (var n = 0, o = this.__entries__; n < o.length; n++) {
                    var r = o[n];
                    e.call(t, r[1], r[0]);
                }
            }, t;
        }();
    }(), D = "undefined" != typeof window && "undefined" != typeof document && window.document === document, z = "undefined" != typeof global && global.Math === Math ? global : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(), V = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(z) : function(e) {
        return setTimeout((function() {
            return e(Date.now());
        }), 1e3 / 60);
    };
    var I = [ "top", "right", "bottom", "left", "width", "height", "size", "weight" ], F = "undefined" != typeof MutationObserver, Z = function() {
        function e() {
            this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, 
            this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), 
            this.refresh = function(e, t) {
                var n = !1, o = !1, r = 0;
                function a() {
                    n && (n = !1, e()), o && s();
                }
                function i() {
                    V(a);
                }
                function s() {
                    var e = Date.now();
                    if (n) {
                        if (e - r < 2) return;
                        o = !0;
                    } else n = !0, o = !1, setTimeout(i, t);
                    r = e;
                }
                return s;
            }(this.refresh.bind(this), 20);
        }
        return e.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_();
        }, e.prototype.removeObserver = function(e) {
            var t = this.observers_, n = t.indexOf(e);
            ~n && t.splice(n, 1), !t.length && this.connected_ && this.disconnect_();
        }, e.prototype.refresh = function() {
            this.updateObservers_() && this.refresh();
        }, e.prototype.updateObservers_ = function() {
            var e = this.observers_.filter((function(e) {
                return e.gatherActive(), e.hasActive();
            }));
            return e.forEach((function(e) {
                return e.broadcastActive();
            })), e.length > 0;
        }, e.prototype.connect_ = function() {
            D && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), 
            window.addEventListener("resize", this.refresh), F ? (this.mutationsObserver_ = new MutationObserver(this.refresh), 
            this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), 
            this.connected_ = !0);
        }, e.prototype.disconnect_ = function() {
            D && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), 
            window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), 
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), 
            this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
        }, e.prototype.onTransitionEnd_ = function(e) {
            var t = e.propertyName, n = void 0 === t ? "" : t;
            I.some((function(e) {
                return !!~n.indexOf(e);
            })) && this.refresh();
        }, e.getInstance = function() {
            return this.instance_ || (this.instance_ = new e), this.instance_;
        }, e.instance_ = null, e;
    }(), q = function(e, t) {
        for (var n = 0, o = Object.keys(t); n < o.length; n++) {
            var r = o[n];
            Object.defineProperty(e, r, {
                value: t[r],
                enumerable: !1,
                writable: !1,
                configurable: !0
            });
        }
        return e;
    }, R = function(e) {
        return e && e.ownerDocument && e.ownerDocument.defaultView || z;
    }, H = X(0, 0, 0, 0);
    function U(e) {
        return parseFloat(e) || 0;
    }
    function W(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        return t.reduce((function(t, n) {
            return t + U(e["border-" + n + "-width"]);
        }), 0);
    }
    function $(e) {
        var t = e.clientWidth, n = e.clientHeight;
        if (!t && !n) return H;
        var o = R(e).getComputedStyle(e), r = function(e) {
            for (var t = {}, n = 0, o = [ "top", "right", "bottom", "left" ]; n < o.length; n++) {
                var r = o[n], a = e["padding-" + r];
                t[r] = U(a);
            }
            return t;
        }(o), a = r.left + r.right, i = r.top + r.bottom, s = U(o.width), l = U(o.height);
        if ("border-box" === o.boxSizing && (Math.round(s + a) !== t && (s -= W(o, "left", "right") + a), 
        Math.round(l + i) !== n && (l -= W(o, "top", "bottom") + i)), !function(e) {
            return e === R(e).document.documentElement;
        }(e)) {
            var c = Math.round(s + a) - t, u = Math.round(l + i) - n;
            1 !== Math.abs(c) && (s -= c), 1 !== Math.abs(u) && (l -= u);
        }
        return X(r.left, r.top, s, l);
    }
    var G = "undefined" != typeof SVGGraphicsElement ? function(e) {
        return e instanceof R(e).SVGGraphicsElement;
    } : function(e) {
        return e instanceof R(e).SVGElement && "function" == typeof e.getBBox;
    };
    function Y(e) {
        return D ? G(e) ? function(e) {
            var t = e.getBBox();
            return X(0, 0, t.width, t.height);
        }(e) : $(e) : H;
    }
    function X(e, t, n, o) {
        return {
            x: e,
            y: t,
            width: n,
            height: o
        };
    }
    var K = function() {
        function e(e) {
            this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = X(0, 0, 0, 0), 
            this.target = e;
        }
        return e.prototype.isActive = function() {
            var e = Y(this.target);
            return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
        }, e.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
        }, e;
    }(), J = function(e, t) {
        var n = function(e) {
            var t = e.x, n = e.y, o = e.width, r = e.height, a = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, i = Object.create(a.prototype);
            return q(i, {
                x: t,
                y: n,
                width: o,
                height: r,
                top: n,
                right: t + o,
                bottom: r + n,
                left: t
            }), i;
        }(t);
        q(this, {
            target: e,
            contentRect: n
        });
    }, Q = function() {
        function e(e, t, n) {
            if (this.activeObservations_ = [], this.observations_ = new j, "function" != typeof e) throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e, this.controller_ = t, this.callbackCtx_ = n;
        }
        return e.prototype.observe = function(e) {
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof R(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new K(e)), this.controller_.addObserver(this), this.controller_.refresh());
            }
        }, e.prototype.unobserve = function(e) {
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof R(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this));
            }
        }, e.prototype.disconnect = function() {
            this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
        }, e.prototype.gatherActive = function() {
            var e = this;
            this.clearActive(), this.observations_.forEach((function(t) {
                t.isActive() && e.activeObservations_.push(t);
            }));
        }, e.prototype.broadcastActive = function() {
            if (this.hasActive()) {
                var e = this.callbackCtx_, t = this.activeObservations_.map((function(e) {
                    return new J(e.target, e.broadcastRect());
                }));
                this.callback_.call(e, t, e), this.clearActive();
            }
        }, e.prototype.clearActive = function() {
            this.activeObservations_.splice(0);
        }, e.prototype.hasActive = function() {
            return this.activeObservations_.length > 0;
        }, e;
    }(), ee = "undefined" != typeof WeakMap ? new WeakMap : new j, te = function e(t) {
        if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        var n = Z.getInstance(), o = new Q(t, n, this);
        ee.set(this, o);
    };
    [ "observe", "unobserve", "disconnect" ].forEach((function(e) {
        te.prototype[e] = function() {
            var t;
            return (t = ee.get(this))[e].apply(t, arguments);
        };
    }));
    var ne = void 0 !== z.ResizeObserver ? z.ResizeObserver : te, oe = B((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = "undefined" == typeof window;
        t.default = n;
    }));
    L(oe);
    var re = B((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(ne), r = n(oe);
        const a = function(e) {
            for (const t of e) {
                const e = t.target.__resizeListeners__ || [];
                e.length && e.forEach(e => {
                    e();
                });
            }
        };
        t.addResizeListener = function(e, t) {
            !r.default && e && (e.__resizeListeners__ || (e.__resizeListeners__ = [], e.__ro__ = new o.default(a), 
            e.__ro__.observe(e)), e.__resizeListeners__.push(t));
        }, t.removeResizeListener = function(e, t) {
            e && e.__resizeListeners__ && (e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t), 1), 
            e.__resizeListeners__.length || e.__ro__.disconnect());
        };
    }));
    L(re);
    re.addResizeListener, re.removeResizeListener;
    function ae(e, t) {
        const n = Object.create(null), o = e.split(",");
        for (let e = 0; e < o.length; e++) n[o[e]] = !0;
        return t ? e => !!n[e.toLowerCase()] : e => !!n[e];
    }
    const ie = {
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
    }, se = {
        1: "STABLE",
        2: "DYNAMIC",
        3: "FORWARDED"
    }, le = ae("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt");
    const ce = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ue = ae(ce), de = ae(ce + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"), pe = /[>/="'\u0009\u000a\u000c\u0020]/, fe = {};
    const me = ae("animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width"), he = ae("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");
    const ve = /;(?![^(]*\))/g, ge = /:(.+)/;
    function be(e) {
        const t = {};
        return e.split(ve).forEach(e => {
            if (e) {
                const n = e.split(ge);
                n.length > 1 && (t[n[0].trim()] = n[1].trim());
            }
        }), t;
    }
    const ye = ae("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), we = ae("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), xe = ae("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), _e = /["'&<>]/;
    const ke = /^-?>|<!--|-->|--!>|<!-$/g;
    function Oe(e, t) {
        if (e === t) return !0;
        let n = Pe(e), o = Pe(t);
        if (n || o) return !(!n || !o) && e.getTime() === t.getTime();
        if (n = Te(e), o = Te(t), n || o) return !(!n || !o) && function(e, t) {
            if (e.length !== t.length) return !1;
            let n = !0;
            for (let o = 0; n && o < e.length; o++) n = Oe(e[o], t[o]);
            return n;
        }(e, t);
        if (n = je(e), o = je(t), n || o) {
            if (!n || !o) return !1;
            if (Object.keys(e).length !== Object.keys(t).length) return !1;
            for (const n in e) {
                const o = e.hasOwnProperty(n), r = t.hasOwnProperty(n);
                if (o && !r || !o && r || !Oe(e[n], t[n])) return !1;
            }
        }
        return String(e) === String(t);
    }
    const Ee = (e, t) => Ne(t) ? {
        [`Map(${t.size})`]: [ ...t.entries() ].reduce((e, [t, n]) => (e[t + " =>"] = n, 
        e), {})
    } : Ae(t) ? {
        [`Set(${t.size})`]: [ ...t.values() ]
    } : !je(t) || Te(t) || Ve(t) ? t : String(t), Se = /^on[^a-z]/, Ce = Object.assign, Me = Object.prototype.hasOwnProperty, Te = Array.isArray, Ne = e => "[object Map]" === ze(e), Ae = e => "[object Set]" === ze(e), Pe = e => e instanceof Date, Le = e => "function" == typeof e, Be = e => "string" == typeof e, je = e => null !== e && "object" == typeof e, De = Object.prototype.toString, ze = e => De.call(e), Ve = e => "[object Object]" === ze(e), Ie = ae(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Fe = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n));
    }, Ze = /-(\w)/g, qe = Fe(e => e.replace(Ze, (e, t) => t ? t.toUpperCase() : "")), Re = /\B([A-Z])/g, He = Fe(e => e.replace(Re, "-$1").toLowerCase()), Ue = Fe(e => e.charAt(0).toUpperCase() + e.slice(1)), We = Fe(e => e ? "on" + Ue(e) : "");
    let $e;
    var Ge = Object.freeze({
        __proto__: null,
        EMPTY_ARR: [],
        EMPTY_OBJ: {},
        NO: () => !1,
        NOOP: () => {},
        PatchFlagNames: ie,
        babelParserDefaultPlugins: [ "bigInt", "optionalChaining", "nullishCoalescingOperator" ],
        camelize: qe,
        capitalize: Ue,
        def: (e, t, n) => {
            Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !1,
                value: n
            });
        },
        escapeHtml: function(e) {
            const t = "" + e, n = _e.exec(t);
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
            return e.replace(ke, "");
        },
        extend: Ce,
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
        getGlobalThis: () => $e || ($e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}),
        hasChanged: (e, t) => e !== t && (e == e || t == t),
        hasOwn: (e, t) => Me.call(e, t),
        hyphenate: He,
        invokeArrayFns: (e, t) => {
            for (let n = 0; n < e.length; n++) e[n](t);
        },
        isArray: Te,
        isBooleanAttr: de,
        isDate: Pe,
        isFunction: Le,
        isGloballyWhitelisted: le,
        isHTMLTag: ye,
        isIntegerKey: e => Be(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
        isKnownAttr: he,
        isMap: Ne,
        isModelListener: e => e.startsWith("onUpdate:"),
        isNoUnitNumericStyleProp: me,
        isObject: je,
        isOn: e => Se.test(e),
        isPlainObject: Ve,
        isPromise: e => je(e) && Le(e.then) && Le(e.catch),
        isReservedProp: Ie,
        isSSRSafeAttrName: function(e) {
            if (fe.hasOwnProperty(e)) return fe[e];
            const t = pe.test(e);
            return t && console.error("unsafe attribute name: " + e), fe[e] = !t;
        },
        isSVGTag: we,
        isSet: Ae,
        isSpecialBooleanAttr: ue,
        isString: Be,
        isSymbol: e => "symbol" == typeof e,
        isVoidTag: xe,
        looseEqual: Oe,
        looseIndexOf: function(e, t) {
            return e.findIndex(e => Oe(e, t));
        },
        makeMap: ae,
        normalizeClass: function e(t) {
            let n = "";
            if (Be(t)) n = t; else if (Te(t)) for (let o = 0; o < t.length; o++) {
                const r = e(t[o]);
                r && (n += r + " ");
            } else if (je(t)) for (const e in t) t[e] && (n += e + " ");
            return n.trim();
        },
        normalizeStyle: function e(t) {
            if (Te(t)) {
                const n = {};
                for (let o = 0; o < t.length; o++) {
                    const r = t[o], a = e(Be(r) ? be(r) : r);
                    if (a) for (const e in a) n[e] = a[e];
                }
                return n;
            }
            if (je(t)) return t;
        },
        objectToString: De,
        parseStringStyle: be,
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
        slotFlagsText: se,
        stringifyStyle: function(e) {
            let t = "";
            if (!e) return t;
            for (const n in e) {
                const o = e[n], r = n.startsWith("--") ? n : He(n);
                (Be(o) || "number" == typeof o && me(r)) && (t += `${r}:${o};`);
            }
            return t;
        },
        toDisplayString: e => null == e ? "" : je(e) ? JSON.stringify(e, Ee, 2) : String(e),
        toHandlerKey: We,
        toNumber: e => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t;
        },
        toRawType: e => ze(e).slice(8, -1),
        toTypeString: ze
    }), Ye = B((function(e, t) {
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
    L(Ye);
    Ye.warn;
    var Xe = B((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(oe);
        const a = Ge.hyphenate, i = e => "number" == typeof e;
        Object.defineProperty(n, "isVNode", {
            enumerable: !0,
            get: function() {
                return t.isVNode;
            }
        }), Object.defineProperty(n, "camelize", {
            enumerable: !0,
            get: function() {
                return Ge.camelize;
            }
        }), Object.defineProperty(n, "capitalize", {
            enumerable: !0,
            get: function() {
                return Ge.capitalize;
            }
        }), Object.defineProperty(n, "extend", {
            enumerable: !0,
            get: function() {
                return Ge.extend;
            }
        }), Object.defineProperty(n, "hasOwn", {
            enumerable: !0,
            get: function() {
                return Ge.hasOwn;
            }
        }), Object.defineProperty(n, "isArray", {
            enumerable: !0,
            get: function() {
                return Ge.isArray;
            }
        }), Object.defineProperty(n, "isObject", {
            enumerable: !0,
            get: function() {
                return Ge.isObject;
            }
        }), Object.defineProperty(n, "isString", {
            enumerable: !0,
            get: function() {
                return Ge.isString;
            }
        }), Object.defineProperty(n, "looseEqual", {
            enumerable: !0,
            get: function() {
                return Ge.looseEqual;
            }
        }), n.$ = function(e) {
            return e.value;
        }, n.SCOPE = "Util", n.addUnit = function(e) {
            return Ge.isString(e) ? e : i(e) ? e + "px" : "";
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
            return !!(!e && 0 !== e || Ge.isArray(e) && !e.length || Ge.isObject(e) && !Object.keys(e).length);
        }, n.isFirefox = function() {
            return !r.default && !!window.navigator.userAgent.match(/firefox/i);
        }, n.isHTMLElement = e => Ge.toRawType(e).startsWith("HTML"), n.isIE = function() {
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
            for (let n = 0; n < e.length; n++) e[n] && Ge.extend(t, e[n]);
            return t;
        }, n.useGlobalConfig = function() {
            const e = t.getCurrentInstance();
            return "$ELEMENT" in e.proxy ? e.proxy.$ELEMENT : {};
        };
    }));
    L(Xe);
    Xe.$, Xe.SCOPE, Xe.addUnit, Xe.arrayFind, Xe.arrayFindIndex, Xe.arrayFlat, Xe.autoprefixer, 
    Xe.clearTimer, Xe.coerceTruthyValueToArray, Xe.deduplicate, Xe.entries, Xe.escapeRegexpString, 
    Xe.generateId, Xe.getPropByPath, Xe.getRandomInt, Xe.getValueByPath, Xe.isBool, 
    Xe.isEdge, Xe.isEmpty, Xe.isFirefox, Xe.isHTMLElement, Xe.isIE, Xe.isNumber, Xe.isUndefined, 
    Xe.kebabCase, Xe.rafThrottle, Xe.toObject, Xe.useGlobalConfig;
    var Ke = B((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(oe);
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
                "float" === (t = Xe.camelize(t)) && (t = "cssFloat");
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
            e && t && (Xe.isObject(t) ? Object.keys(t).forEach(n => {
                l(e, n, t[n]);
            }) : (t = Xe.camelize(t), e.style[t] = n));
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
            e && t && (Xe.isObject(t) ? Object.keys(t).forEach(t => {
                l(e, t, "");
            }) : l(e, t, ""));
        }, t.setStyle = l, t.stop = e => e.stopPropagation();
    }));
    L(Ke);
    Ke.addClass, Ke.getOffsetTop, Ke.getOffsetTopDistance, Ke.getScrollContainer, Ke.getStyle, 
    Ke.hasClass, Ke.isInContainer, Ke.isScroll, Ke.off, Ke.on, Ke.once, Ke.removeClass, 
    Ke.removeStyle, Ke.setStyle, Ke.stop;
    var Je = L(B((function(e, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        const o = {
            vertical: {
                offset: "offsetHeight",
                scroll: "scrollTop",
                scrollSize: "scrollHeight",
                size: "height",
                key: "vertical",
                axis: "Y",
                client: "clientY",
                direction: "top"
            },
            horizontal: {
                offset: "offsetWidth",
                scroll: "scrollLeft",
                scrollSize: "scrollWidth",
                size: "width",
                key: "horizontal",
                axis: "X",
                client: "clientX",
                direction: "left"
            }
        };
        var r = t.defineComponent({
            name: "Bar",
            props: {
                vertical: Boolean,
                size: String,
                move: Number
            },
            setup(e) {
                const n = t.ref(null), r = t.ref(null), a = t.inject("scrollbar", {}), i = t.inject("scrollbar-wrap", {}), s = t.computed(() => o[e.vertical ? "vertical" : "horizontal"]), l = t.ref({}), c = t.ref(null), u = t.ref(null), d = t.ref(!1);
                let p = null;
                const f = e => {
                    e.stopImmediatePropagation(), c.value = !0, Ke.on(document, "mousemove", m), Ke.on(document, "mouseup", h), 
                    p = document.onselectstart, document.onselectstart = () => !1;
                }, m = e => {
                    if (!1 === c.value) return;
                    const t = l.value[s.value.axis];
                    if (!t) return;
                    const o = 100 * (-1 * (n.value.getBoundingClientRect()[s.value.direction] - e[s.value.client]) - (r.value[s.value.offset] - t)) / n.value[s.value.offset];
                    i.value[s.value.scroll] = o * i.value[s.value.scrollSize] / 100;
                }, h = () => {
                    c.value = !1, l.value[s.value.axis] = 0, Ke.off(document, "mousemove", m), document.onselectstart = p, 
                    u.value && (d.value = !1);
                }, v = t.computed(() => function({move: e, size: t, bar: n}) {
                    const o = {}, r = `translate${n.axis}(${e}%)`;
                    return o[n.size] = t, o.transform = r, o.msTransform = r, o.webkitTransform = r, 
                    o;
                }({
                    size: e.size,
                    move: e.move,
                    bar: s.value
                })), g = () => {
                    u.value = !1, d.value = !!e.size;
                }, b = () => {
                    u.value = !0, d.value = c.value;
                };
                return t.onMounted(() => {
                    Ke.on(a.value, "mousemove", g), Ke.on(a.value, "mouseleave", b);
                }), t.onBeforeUnmount(() => {
                    Ke.off(document, "mouseup", h), Ke.off(a.value, "mousemove", g), Ke.off(a.value, "mouseleave", b);
                }), {
                    instance: n,
                    thumb: r,
                    bar: s,
                    clickTrackHandler: e => {
                        const t = 100 * (Math.abs(e.target.getBoundingClientRect()[s.value.direction] - e[s.value.client]) - r.value[s.value.offset] / 2) / n.value[s.value.offset];
                        i.value[s.value.scroll] = t * i.value[s.value.scrollSize] / 100;
                    },
                    clickThumbHandler: e => {
                        e.stopPropagation(), e.ctrlKey || [ 1, 2 ].includes(e.button) || (window.getSelection().removeAllRanges(), 
                        f(e), l.value[s.value.axis] = e.currentTarget[s.value.offset] - (e[s.value.client] - e.currentTarget.getBoundingClientRect()[s.value.direction]));
                    },
                    thumbStyle: v,
                    visible: d
                };
            }
        });
        r.render = function(e, n, o, r, a, i) {
            return t.openBlock(), t.createBlock(t.Transition, {
                name: "el-scrollbar-fade"
            }, {
                default: t.withCtx(() => [ t.withDirectives(t.createVNode("div", {
                    ref: "instance",
                    class: [ "el-scrollbar__bar", "is-" + e.bar.key ],
                    onMousedown: n[2] || (n[2] = (...t) => e.clickTrackHandler && e.clickTrackHandler(...t))
                }, [ t.createVNode("div", {
                    ref: "thumb",
                    class: "el-scrollbar__thumb",
                    style: e.thumbStyle,
                    onMousedown: n[1] || (n[1] = (...t) => e.clickThumbHandler && e.clickThumbHandler(...t))
                }, null, 36) ], 34), [ [ t.vShow, e.visible ] ]) ]),
                _: 1
            });
        }, r.__file = "packages/scrollbar/src/bar.vue";
        var a = t.defineComponent({
            name: "ElScrollbar",
            components: {
                Bar: r
            },
            props: {
                height: {
                    type: [ String, Number ],
                    default: ""
                },
                maxHeight: {
                    type: [ String, Number ],
                    default: ""
                },
                native: {
                    type: Boolean,
                    default: !1
                },
                wrapStyle: {
                    type: [ String, Array ],
                    default: ""
                },
                wrapClass: {
                    type: [ String, Array ],
                    default: ""
                },
                viewClass: {
                    type: [ String, Array ],
                    default: ""
                },
                viewStyle: {
                    type: [ String, Array ],
                    default: ""
                },
                noresize: Boolean,
                tag: {
                    type: String,
                    default: "div"
                }
            },
            emits: [ "scroll" ],
            setup(e, {emit: n}) {
                const o = t.ref("0"), r = t.ref("0"), a = t.ref(0), i = t.ref(0), s = t.ref(null), l = t.ref(null), c = t.ref(null);
                t.provide("scrollbar", s), t.provide("scrollbar-wrap", l);
                const u = () => {
                    if (!l.value) return;
                    const e = 100 * l.value.clientHeight / l.value.scrollHeight, t = 100 * l.value.clientWidth / l.value.scrollWidth;
                    r.value = e < 100 ? e + "%" : "", o.value = t < 100 ? t + "%" : "";
                }, d = t.computed(() => {
                    let t = e.wrapStyle;
                    return Xe.isArray(t) ? (t = Xe.toObject(t), t.height = Xe.addUnit(e.height), t.maxHeight = Xe.addUnit(e.maxHeight)) : Xe.isString(t) && (t += Xe.addUnit(e.height) ? `height: ${Xe.addUnit(e.height)};` : "", 
                    t += Xe.addUnit(e.maxHeight) ? `max-height: ${Xe.addUnit(e.maxHeight)};` : ""), 
                    t;
                });
                return t.onMounted(() => {
                    e.native || t.nextTick(u), e.noresize || (re.addResizeListener(c.value, u), addEventListener("resize", u));
                }), t.onBeforeUnmount(() => {
                    e.noresize || (re.removeResizeListener(c.value, u), removeEventListener("resize", u));
                }), {
                    moveX: a,
                    moveY: i,
                    sizeWidth: o,
                    sizeHeight: r,
                    style: d,
                    scrollbar: s,
                    wrap: l,
                    resize: c,
                    update: u,
                    handleScroll: () => {
                        l.value && (i.value = 100 * l.value.scrollTop / l.value.clientHeight, a.value = 100 * l.value.scrollLeft / l.value.clientWidth, 
                        n("scroll", {
                            scrollLeft: a.value,
                            scrollTop: i.value
                        }));
                    }
                };
            }
        });
        const i = {
            ref: "scrollbar",
            class: "el-scrollbar"
        };
        a.render = function(e, n, o, r, a, s) {
            const l = t.resolveComponent("bar");
            return t.openBlock(), t.createBlock("div", i, [ t.createVNode("div", {
                ref: "wrap",
                class: [ e.wrapClass, "el-scrollbar__wrap", e.native ? "" : "el-scrollbar__wrap--hidden-default" ],
                style: e.style,
                onScroll: n[1] || (n[1] = (...t) => e.handleScroll && e.handleScroll(...t))
            }, [ (t.openBlock(), t.createBlock(t.resolveDynamicComponent(e.tag), {
                ref: "resize",
                class: [ "el-scrollbar__view", e.viewClass ],
                style: e.viewStyle
            }, {
                default: t.withCtx(() => [ t.renderSlot(e.$slots, "default") ]),
                _: 3
            }, 8, [ "class", "style" ])) ], 38), e.native ? t.createCommentVNode("v-if", !0) : (t.openBlock(), 
            t.createBlock(t.Fragment, {
                key: 0
            }, [ t.createVNode(l, {
                move: e.moveX,
                size: e.sizeWidth
            }, null, 8, [ "move", "size" ]), t.createVNode(l, {
                vertical: "",
                move: e.moveY,
                size: e.sizeHeight
            }, null, 8, [ "move", "size" ]) ], 64)) ], 512);
        }, a.__file = "packages/scrollbar/src/index.vue", a.install = e => {
            e.component(a.name, a);
        };
        const s = a;
        n.default = s;
    })));
    let Qe = document.createElement("a");
    function et(e) {
        let t = e;
        if (t.indexOf("//") < 0) t = "//" + t; else {
            if (!(t.indexOf("//") > -1)) return Qe;
            t = function(e) {
                const t = e.toLowerCase(), n = [ "http://", "https://", "ftp://", "files://" ];
                for (let o = 0; o < n.length; o++) if (0 === t.indexOf(n[o])) return e.replace(/.*\/\//, "//");
                return e;
            }(t);
        }
        return Qe.href = t, {
            href: Qe.href,
            origin: Qe.origin,
            protocol: Qe.protocol,
            host: Qe.host,
            hostname: Qe.hostname,
            port: Qe.port,
            pathname: Qe.pathname,
            search: Qe.search,
            hash: Qe.hash
        };
    }
    const tt = [ {
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
            nameZh: "头条搜索",
            url: "https://so.toutiao.com/search?dvpf=pc&keyword=%s"
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
            const {hostname: n} = et(t.url);
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
    function nt(e) {
        let t = tt;
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
        }(n, tt), s("sites", t), s("sites-version", o))), "tm" === e && (t = t.filter(e => e.list && e.list.length > 0 && e.data && e.data.visible).map(e => ({
            ...e,
            show: !1
        }))), t;
    }
    var ot = "top", rt = "bottom", at = "right", it = "left", st = [ ot, rt, at, it ], lt = st.reduce((function(e, t) {
        return e.concat([ t + "-start", t + "-end" ]);
    }), []), ct = [].concat(st, [ "auto" ]).reduce((function(e, t) {
        return e.concat([ t, t + "-start", t + "-end" ]);
    }), []), ut = [ "beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite" ];
    function dt(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
    }
    function pt(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window;
        }
        return e;
    }
    function ft(e) {
        return e instanceof pt(e).Element || e instanceof Element;
    }
    function mt(e) {
        return e instanceof pt(e).HTMLElement || e instanceof HTMLElement;
    }
    function ht(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof pt(e).ShadowRoot || e instanceof ShadowRoot);
    }
    var vt = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var t = e.state;
            Object.keys(t.elements).forEach((function(e) {
                var n = t.styles[e] || {}, o = t.attributes[e] || {}, r = t.elements[e];
                mt(r) && dt(r) && (Object.assign(r.style, n), Object.keys(o).forEach((function(e) {
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
                    mt(o) && dt(o) && (Object.assign(o.style, a), Object.keys(r).forEach((function(e) {
                        o.removeAttribute(e);
                    })));
                }));
            };
        },
        requires: [ "computeStyles" ]
    };
    function gt(e) {
        return e.split("-")[0];
    }
    function bt(e) {
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
    function yt(e) {
        var t = bt(e), n = e.offsetWidth, o = e.offsetHeight;
        return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), 
        {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: n,
            height: o
        };
    }
    function wt(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && ht(n)) {
            var o = t;
            do {
                if (o && e.isSameNode(o)) return !0;
                o = o.parentNode || o.host;
            } while (o);
        }
        return !1;
    }
    function xt(e) {
        return pt(e).getComputedStyle(e);
    }
    function _t(e) {
        return [ "table", "td", "th" ].indexOf(dt(e)) >= 0;
    }
    function kt(e) {
        return ((ft(e) ? e.ownerDocument : e.document) || window.document).documentElement;
    }
    function Ot(e) {
        return "html" === dt(e) ? e : e.assignedSlot || e.parentNode || (ht(e) ? e.host : null) || kt(e);
    }
    function Et(e) {
        return mt(e) && "fixed" !== xt(e).position ? e.offsetParent : null;
    }
    function St(e) {
        for (var t = pt(e), n = Et(e); n && _t(n) && "static" === xt(n).position; ) n = Et(n);
        return n && ("html" === dt(n) || "body" === dt(n) && "static" === xt(n).position) ? t : n || function(e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && mt(e) && "fixed" === xt(e).position) return null;
            for (var n = Ot(e); mt(n) && [ "html", "body" ].indexOf(dt(n)) < 0; ) {
                var o = xt(n);
                if ("none" !== o.transform || "none" !== o.perspective || "paint" === o.contain || -1 !== [ "transform", "perspective" ].indexOf(o.willChange) || t && "filter" === o.willChange || t && o.filter && "none" !== o.filter) return n;
                n = n.parentNode;
            }
            return null;
        }(e) || t;
    }
    function Ct(e) {
        return [ "top", "bottom" ].indexOf(e) >= 0 ? "x" : "y";
    }
    var Mt = Math.max, Tt = Math.min, Nt = Math.round;
    function At(e, t, n) {
        return Mt(e, Tt(t, n));
    }
    function Pt(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e);
    }
    function Lt(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e, t;
        }), {});
    }
    var Bt = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t, n = e.state, o = e.name, r = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, s = gt(n.placement), l = Ct(s), c = [ it, at ].indexOf(s) >= 0 ? "height" : "width";
            if (a && i) {
                var u = function(e, t) {
                    return Pt("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                        placement: t.placement
                    })) : e) ? e : Lt(e, st));
                }(r.padding, n), d = yt(a), p = "y" === l ? ot : it, f = "y" === l ? rt : at, m = n.rects.reference[c] + n.rects.reference[l] - i[l] - n.rects.popper[c], h = i[l] - n.rects.reference[l], v = St(a), g = v ? "y" === l ? v.clientHeight || 0 : v.clientWidth || 0 : 0, b = m / 2 - h / 2, y = u[p], w = g - d[c] - u[f], x = g / 2 - d[c] / 2 + b, _ = At(y, x, w), k = l;
                n.modifiersData[o] = ((t = {})[k] = _, t.centerOffset = _ - x, t);
            }
        },
        effect: function(e) {
            var t = e.state, n = e.options.element, o = void 0 === n ? "[data-popper-arrow]" : n;
            null != o && ("string" != typeof o || (o = t.elements.popper.querySelector(o))) && wt(t.elements.popper, o) && (t.elements.arrow = o);
        },
        requires: [ "popperOffsets" ],
        requiresIfExists: [ "preventOverflow" ]
    }, jt = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };
    function Dt(e) {
        var t, n = e.popper, o = e.popperRect, r = e.placement, a = e.offsets, i = e.position, s = e.gpuAcceleration, l = e.adaptive, c = e.roundOffsets, u = !0 === c ? function(e) {
            var t = e.x, n = e.y, o = window.devicePixelRatio || 1;
            return {
                x: Nt(Nt(t * o) / o) || 0,
                y: Nt(Nt(n * o) / o) || 0
            };
        }(a) : "function" == typeof c ? c(a) : a, d = u.x, p = void 0 === d ? 0 : d, f = u.y, m = void 0 === f ? 0 : f, h = a.hasOwnProperty("x"), v = a.hasOwnProperty("y"), g = it, b = ot, y = window;
        if (l) {
            var w = St(n), x = "clientHeight", _ = "clientWidth";
            w === pt(n) && "static" !== xt(w = kt(n)).position && (x = "scrollHeight", _ = "scrollWidth"), 
            w = w, r === ot && (b = rt, m -= w[x] - o.height, m *= s ? 1 : -1), r === it && (g = at, 
            p -= w[_] - o.width, p *= s ? 1 : -1);
        }
        var k, O = Object.assign({
            position: i
        }, l && jt);
        return s ? Object.assign({}, O, ((k = {})[b] = v ? "0" : "", k[g] = h ? "0" : "", 
        k.transform = (y.devicePixelRatio || 1) < 2 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", 
        k)) : Object.assign({}, O, ((t = {})[b] = v ? m + "px" : "", t[g] = h ? p + "px" : "", 
        t.transform = "", t));
    }
    var zt = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(e) {
            var t = e.state, n = e.options, o = n.gpuAcceleration, r = void 0 === o || o, a = n.adaptive, i = void 0 === a || a, s = n.roundOffsets, l = void 0 === s || s, c = {
                placement: gt(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r
            };
            null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, Dt(Object.assign({}, c, {
                offsets: t.modifiersData.popperOffsets,
                position: t.options.strategy,
                adaptive: i,
                roundOffsets: l
            })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, Dt(Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l
            })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement
            });
        },
        data: {}
    }, Vt = {
        passive: !0
    };
    var It = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(e) {
            var t = e.state, n = e.instance, o = e.options, r = o.scroll, a = void 0 === r || r, i = o.resize, s = void 0 === i || i, l = pt(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return a && c.forEach((function(e) {
                e.addEventListener("scroll", n.update, Vt);
            })), s && l.addEventListener("resize", n.update, Vt), function() {
                a && c.forEach((function(e) {
                    e.removeEventListener("scroll", n.update, Vt);
                })), s && l.removeEventListener("resize", n.update, Vt);
            };
        },
        data: {}
    }, Ft = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    function Zt(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return Ft[e];
        }));
    }
    var qt = {
        start: "end",
        end: "start"
    };
    function Rt(e) {
        return e.replace(/start|end/g, (function(e) {
            return qt[e];
        }));
    }
    function Ht(e) {
        var t = pt(e);
        return {
            scrollLeft: t.pageXOffset,
            scrollTop: t.pageYOffset
        };
    }
    function Ut(e) {
        return bt(kt(e)).left + Ht(e).scrollLeft;
    }
    function Wt(e) {
        var t = xt(e), n = t.overflow, o = t.overflowX, r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + o);
    }
    function $t(e, t) {
        var n;
        void 0 === t && (t = []);
        var o = function e(t) {
            return [ "html", "body", "#document" ].indexOf(dt(t)) >= 0 ? t.ownerDocument.body : mt(t) && Wt(t) ? t : e(Ot(t));
        }(e), r = o === (null == (n = e.ownerDocument) ? void 0 : n.body), a = pt(o), i = r ? [ a ].concat(a.visualViewport || [], Wt(o) ? o : []) : o, s = t.concat(i);
        return r ? s : s.concat($t(Ot(i)));
    }
    function Gt(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        });
    }
    function Yt(e, t) {
        return "viewport" === t ? Gt(function(e) {
            var t = pt(e), n = kt(e), o = t.visualViewport, r = n.clientWidth, a = n.clientHeight, i = 0, s = 0;
            return o && (r = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (i = o.offsetLeft, 
            s = o.offsetTop)), {
                width: r,
                height: a,
                x: i + Ut(e),
                y: s
            };
        }(e)) : mt(t) ? function(e) {
            var t = bt(e);
            return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, 
            t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, 
            t.x = t.left, t.y = t.top, t;
        }(t) : Gt(function(e) {
            var t, n = kt(e), o = Ht(e), r = null == (t = e.ownerDocument) ? void 0 : t.body, a = Mt(n.scrollWidth, n.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), i = Mt(n.scrollHeight, n.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), s = -o.scrollLeft + Ut(e), l = -o.scrollTop;
            return "rtl" === xt(r || n).direction && (s += Mt(n.clientWidth, r ? r.clientWidth : 0) - a), 
            {
                width: a,
                height: i,
                x: s,
                y: l
            };
        }(kt(e)));
    }
    function Xt(e, t, n) {
        var o = "clippingParents" === t ? function(e) {
            var t = $t(Ot(e)), n = [ "absolute", "fixed" ].indexOf(xt(e).position) >= 0 && mt(e) ? St(e) : e;
            return ft(n) ? t.filter((function(e) {
                return ft(e) && wt(e, n) && "body" !== dt(e);
            })) : [];
        }(e) : [].concat(t), r = [].concat(o, [ n ]), a = r[0], i = r.reduce((function(t, n) {
            var o = Yt(e, n);
            return t.top = Mt(o.top, t.top), t.right = Tt(o.right, t.right), t.bottom = Tt(o.bottom, t.bottom), 
            t.left = Mt(o.left, t.left), t;
        }), Yt(e, a));
        return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, 
        i;
    }
    function Kt(e) {
        return e.split("-")[1];
    }
    function Jt(e) {
        var t, n = e.reference, o = e.element, r = e.placement, a = r ? gt(r) : null, i = r ? Kt(r) : null, s = n.x + n.width / 2 - o.width / 2, l = n.y + n.height / 2 - o.height / 2;
        switch (a) {
          case ot:
            t = {
                x: s,
                y: n.y - o.height
            };
            break;

          case rt:
            t = {
                x: s,
                y: n.y + n.height
            };
            break;

          case at:
            t = {
                x: n.x + n.width,
                y: l
            };
            break;

          case it:
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
        var c = a ? Ct(a) : null;
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
    function Qt(e, t) {
        void 0 === t && (t = {});
        var n = t, o = n.placement, r = void 0 === o ? e.placement : o, a = n.boundary, i = void 0 === a ? "clippingParents" : a, s = n.rootBoundary, l = void 0 === s ? "viewport" : s, c = n.elementContext, u = void 0 === c ? "popper" : c, d = n.altBoundary, p = void 0 !== d && d, f = n.padding, m = void 0 === f ? 0 : f, h = Pt("number" != typeof m ? m : Lt(m, st)), v = "popper" === u ? "reference" : "popper", g = e.elements.reference, b = e.rects.popper, y = e.elements[p ? v : u], w = Xt(ft(y) ? y : y.contextElement || kt(e.elements.popper), i, l), x = bt(g), _ = Jt({
            reference: x,
            element: b,
            strategy: "absolute",
            placement: r
        }), k = Gt(Object.assign({}, b, _)), O = "popper" === u ? k : x, E = {
            top: w.top - O.top + h.top,
            bottom: O.bottom - w.bottom + h.bottom,
            left: w.left - O.left + h.left,
            right: O.right - w.right + h.right
        }, S = e.modifiersData.offset;
        if ("popper" === u && S) {
            var C = S[r];
            Object.keys(E).forEach((function(e) {
                var t = [ at, rt ].indexOf(e) >= 0 ? 1 : -1, n = [ ot, rt ].indexOf(e) >= 0 ? "y" : "x";
                E[e] += C[n] * t;
            }));
        }
        return E;
    }
    function en(e, t) {
        void 0 === t && (t = {});
        var n = t, o = n.placement, r = n.boundary, a = n.rootBoundary, i = n.padding, s = n.flipVariations, l = n.allowedAutoPlacements, c = void 0 === l ? ct : l, u = Kt(o), d = u ? s ? lt : lt.filter((function(e) {
            return Kt(e) === u;
        })) : st, p = d.filter((function(e) {
            return c.indexOf(e) >= 0;
        }));
        0 === p.length && (p = d);
        var f = p.reduce((function(t, n) {
            return t[n] = Qt(e, {
                placement: n,
                boundary: r,
                rootBoundary: a,
                padding: i
            })[gt(n)], t;
        }), {});
        return Object.keys(f).sort((function(e, t) {
            return f[e] - f[t];
        }));
    }
    var tn = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name;
            if (!t.modifiersData[o]._skip) {
                for (var r = n.mainAxis, a = void 0 === r || r, i = n.altAxis, s = void 0 === i || i, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.flipVariations, m = void 0 === f || f, h = n.allowedAutoPlacements, v = t.options.placement, g = gt(v), b = l || (g === v || !m ? [ Zt(v) ] : function(e) {
                    if ("auto" === gt(e)) return [];
                    var t = Zt(e);
                    return [ Rt(e), t, Rt(t) ];
                }(v)), y = [ v ].concat(b).reduce((function(e, n) {
                    return e.concat("auto" === gt(n) ? en(t, {
                        placement: n,
                        boundary: u,
                        rootBoundary: d,
                        padding: c,
                        flipVariations: m,
                        allowedAutoPlacements: h
                    }) : n);
                }), []), w = t.rects.reference, x = t.rects.popper, _ = new Map, k = !0, O = y[0], E = 0; E < y.length; E++) {
                    var S = y[E], C = gt(S), M = "start" === Kt(S), T = [ ot, rt ].indexOf(C) >= 0, N = T ? "width" : "height", A = Qt(t, {
                        placement: S,
                        boundary: u,
                        rootBoundary: d,
                        altBoundary: p,
                        padding: c
                    }), P = T ? M ? at : it : M ? rt : ot;
                    w[N] > x[N] && (P = Zt(P));
                    var L = Zt(P), B = [];
                    if (a && B.push(A[C] <= 0), s && B.push(A[P] <= 0, A[L] <= 0), B.every((function(e) {
                        return e;
                    }))) {
                        O = S, k = !1;
                        break;
                    }
                    _.set(S, B);
                }
                if (k) for (var j = function(e) {
                    var t = y.find((function(t) {
                        var n = _.get(t);
                        if (n) return n.slice(0, e).every((function(e) {
                            return e;
                        }));
                    }));
                    if (t) return O = t, "break";
                }, D = m ? 3 : 1; D > 0; D--) {
                    if ("break" === j(D)) break;
                }
                t.placement !== O && (t.modifiersData[o]._skip = !0, t.placement = O, t.reset = !0);
            }
        },
        requiresIfExists: [ "offset" ],
        data: {
            _skip: !1
        }
    };
    function nn(e, t, n) {
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
    function on(e) {
        return [ ot, at, rt, it ].some((function(t) {
            return e[t] >= 0;
        }));
    }
    var rn = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: [ "preventOverflow" ],
        fn: function(e) {
            var t = e.state, n = e.name, o = t.rects.reference, r = t.rects.popper, a = t.modifiersData.preventOverflow, i = Qt(t, {
                elementContext: "reference"
            }), s = Qt(t, {
                altBoundary: !0
            }), l = nn(i, o), c = nn(s, r, a), u = on(l), d = on(c);
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
    var an = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: [ "popperOffsets" ],
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name, r = n.offset, a = void 0 === r ? [ 0, 0 ] : r, i = ct.reduce((function(e, n) {
                return e[n] = function(e, t, n) {
                    var o = gt(e), r = [ it, ot ].indexOf(o) >= 0 ? -1 : 1, a = "function" == typeof n ? n(Object.assign({}, t, {
                        placement: e
                    })) : n, i = a[0], s = a[1];
                    return i = i || 0, s = (s || 0) * r, [ it, at ].indexOf(o) >= 0 ? {
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
    var sn = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function(e) {
            var t = e.state, n = e.name;
            t.modifiersData[n] = Jt({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement
            });
        },
        data: {}
    };
    var ln = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name, r = n.mainAxis, a = void 0 === r || r, i = n.altAxis, s = void 0 !== i && i, l = n.boundary, c = n.rootBoundary, u = n.altBoundary, d = n.padding, p = n.tether, f = void 0 === p || p, m = n.tetherOffset, h = void 0 === m ? 0 : m, v = Qt(t, {
                boundary: l,
                rootBoundary: c,
                padding: d,
                altBoundary: u
            }), g = gt(t.placement), b = Kt(t.placement), y = !b, w = Ct(g), x = "x" === w ? "y" : "x", _ = t.modifiersData.popperOffsets, k = t.rects.reference, O = t.rects.popper, E = "function" == typeof h ? h(Object.assign({}, t.rects, {
                placement: t.placement
            })) : h, S = {
                x: 0,
                y: 0
            };
            if (_) {
                if (a || s) {
                    var C = "y" === w ? ot : it, M = "y" === w ? rt : at, T = "y" === w ? "height" : "width", N = _[w], A = _[w] + v[C], P = _[w] - v[M], L = f ? -O[T] / 2 : 0, B = "start" === b ? k[T] : O[T], j = "start" === b ? -O[T] : -k[T], D = t.elements.arrow, z = f && D ? yt(D) : {
                        width: 0,
                        height: 0
                    }, V = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }, I = V[C], F = V[M], Z = At(0, k[T], z[T]), q = y ? k[T] / 2 - L - Z - I - E : B - Z - I - E, R = y ? -k[T] / 2 + L + Z + F + E : j + Z + F + E, H = t.elements.arrow && St(t.elements.arrow), U = H ? "y" === w ? H.clientTop || 0 : H.clientLeft || 0 : 0, W = t.modifiersData.offset ? t.modifiersData.offset[t.placement][w] : 0, $ = _[w] + q - W - U, G = _[w] + R - W;
                    if (a) {
                        var Y = At(f ? Tt(A, $) : A, N, f ? Mt(P, G) : P);
                        _[w] = Y, S[w] = Y - N;
                    }
                    if (s) {
                        var X = "x" === w ? ot : it, K = "x" === w ? rt : at, J = _[x], Q = J + v[X], ee = J - v[K], te = At(f ? Tt(Q, $) : Q, J, f ? Mt(ee, G) : ee);
                        _[x] = te, S[x] = te - J;
                    }
                }
                t.modifiersData[o] = S;
            }
        },
        requiresIfExists: [ "offset" ]
    };
    function cn(e, t, n) {
        void 0 === n && (n = !1);
        var o, r, a = kt(t), i = bt(e), s = mt(t), l = {
            scrollLeft: 0,
            scrollTop: 0
        }, c = {
            x: 0,
            y: 0
        };
        return (s || !s && !n) && (("body" !== dt(t) || Wt(a)) && (l = (o = t) !== pt(o) && mt(o) ? {
            scrollLeft: (r = o).scrollLeft,
            scrollTop: r.scrollTop
        } : Ht(o)), mt(t) ? ((c = bt(t)).x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Ut(a))), 
        {
            x: i.left + l.scrollLeft - c.x,
            y: i.top + l.scrollTop - c.y,
            width: i.width,
            height: i.height
        };
    }
    function un(e) {
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
    var dn = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };
    function pn() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect);
        }));
    }
    function fn(e) {
        void 0 === e && (e = {});
        var t = e, n = t.defaultModifiers, o = void 0 === n ? [] : n, r = t.defaultOptions, a = void 0 === r ? dn : r;
        return function(e, t, n) {
            void 0 === n && (n = a);
            var r, i, s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, dn, a),
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
                        reference: ft(e) ? $t(e) : e.contextElement ? $t(e.contextElement) : [],
                        popper: $t(t)
                    };
                    var r, i, c = function(e) {
                        var t = un(e);
                        return ut.reduce((function(e, n) {
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
                        if (pn(t, n)) {
                            s.rects = {
                                reference: cn(t, St(n), "fixed" === s.options.strategy),
                                popper: yt(n)
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
            if (!pn(e, t)) return u;
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
    var mn = fn(), hn = fn({
        defaultModifiers: [ It, sn, zt, vt ]
    }), vn = fn({
        defaultModifiers: [ It, sn, zt, vt, an, tn, ln, Bt, rn ]
    }), gn = Object.freeze({
        __proto__: null,
        popperGenerator: fn,
        detectOverflow: Qt,
        createPopperBase: mn,
        createPopper: vn,
        createPopperLite: hn,
        top: ot,
        bottom: rt,
        right: at,
        left: it,
        auto: "auto",
        basePlacements: st,
        start: "start",
        end: "end",
        clippingParents: "clippingParents",
        viewport: "viewport",
        popper: "popper",
        reference: "reference",
        variationPlacements: lt,
        placements: ct,
        beforeRead: "beforeRead",
        read: "read",
        afterRead: "afterRead",
        beforeMain: "beforeMain",
        main: "main",
        afterMain: "afterMain",
        beforeWrite: "beforeWrite",
        write: "write",
        afterWrite: "afterWrite",
        modifierPhases: ut,
        applyStyles: vt,
        arrow: Bt,
        computeStyles: zt,
        eventListeners: It,
        flip: tn,
        hide: rn,
        offset: an,
        popperOffsets: sn,
        preventOverflow: ln
    }), bn = B((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        let n = {};
        t.getConfig = e => n[e], t.setConfig = e => {
            n = e;
        };
    }));
    L(bn);
    bn.getConfig, bn.setConfig;
    var yn = B((function(e, t) {
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
    L(yn);
    yn.EVENT_CODE, yn.attemptFocus, yn.isFocusable, yn.isVisible, yn.obtainAllFocusableElements, 
    yn.triggerEvent;
    var wn = B((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(oe);
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
            Ke.on(e, "touchmove", r), Ke.on(e, "click", a)), e;
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
                if (Ke.addClass(c, "v-modal"), this.modalFade && !s && Ke.addClass(c, "v-modal-enter"), 
                r) {
                    r.trim().split(/\s+/).forEach(e => Ke.addClass(c, e));
                }
                setTimeout(() => {
                    Ke.removeClass(c, "v-modal-enter");
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
                            o.modalClass.trim().split(/\s+/).forEach(e => Ke.removeClass(n, e));
                        }
                        t.pop(), t.length > 0 && (n.style.zIndex = t[t.length - 1].zIndex);
                    } else for (let n = t.length - 1; n >= 0; n--) if (t[n].id === e) {
                        t.splice(n, 1);
                        break;
                    }
                }
                0 === t.length && (this.modalFade && Ke.addClass(n, "v-modal-leave"), setTimeout(() => {
                    0 === t.length && (n.parentNode && n.parentNode.removeChild(n), n.style.display = "none", 
                    u.modalDom = void 0), Ke.removeClass(n, "v-modal-leave");
                }, 200));
            }
        };
        Object.defineProperty(u, "zIndex", {
            configurable: !0,
            get: () => (void 0 === i && (i = bn.getConfig("zIndex") || 2e3), i),
            set(e) {
                i = e;
            }
        });
        o.default || Ke.on(window, "keydown", (function(e) {
            if (e.code === yn.EVENT_CODE.esc) {
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
    L(wn);
    var xn = B((function(e, n) {
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
    L(xn);
    xn.PatchFlags, xn.getFirstValidNode, xn.isComment, xn.isFragment, xn.isTemplate, 
    xn.isText, xn.isValidElementNode, xn.renderBlock, xn.renderIf;
    var _n, kn, On, En, Sn, Cn, Mn, Tn, Nn, An, Pn, Ln, Bn, jn, Dn, zn = !1;
    function Vn() {
        if (!zn) {
            zn = !0;
            var e = navigator.userAgent, t = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e), n = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
            if (Ln = /\b(iPhone|iP[ao]d)/.exec(e), Bn = /\b(iP[ao]d)/.exec(e), An = /Android/i.exec(e), 
            jn = /FBAN\/\w+;/i.exec(e), Dn = /Mobile/i.exec(e), Pn = !!/Win64/.exec(e), t) {
                (_n = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN) && document && document.documentMode && (_n = document.documentMode);
                var o = /(?:Trident\/(\d+.\d+))/.exec(e);
                Cn = o ? parseFloat(o[1]) + 4 : _n, kn = t[2] ? parseFloat(t[2]) : NaN, On = t[3] ? parseFloat(t[3]) : NaN, 
                (En = t[4] ? parseFloat(t[4]) : NaN) ? (t = /(?:Chrome\/(\d+\.\d+))/.exec(e), Sn = t && t[1] ? parseFloat(t[1]) : NaN) : Sn = NaN;
            } else _n = kn = On = Sn = En = NaN;
            if (n) {
                if (n[1]) {
                    var r = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
                    Mn = !r || parseFloat(r[1].replace("_", "."));
                } else Mn = !1;
                Tn = !!n[2], Nn = !!n[3];
            } else Mn = Tn = Nn = !1;
        }
    }
    var In, Fn = {
        ie: function() {
            return Vn() || _n;
        },
        ieCompatibilityMode: function() {
            return Vn() || Cn > _n;
        },
        ie64: function() {
            return Fn.ie() && Pn;
        },
        firefox: function() {
            return Vn() || kn;
        },
        opera: function() {
            return Vn() || On;
        },
        webkit: function() {
            return Vn() || En;
        },
        safari: function() {
            return Fn.webkit();
        },
        chrome: function() {
            return Vn() || Sn;
        },
        windows: function() {
            return Vn() || Tn;
        },
        osx: function() {
            return Vn() || Mn;
        },
        linux: function() {
            return Vn() || Nn;
        },
        iphone: function() {
            return Vn() || Ln;
        },
        mobile: function() {
            return Vn() || Ln || Bn || An || Dn;
        },
        nativeApp: function() {
            return Vn() || jn;
        },
        android: function() {
            return Vn() || An;
        },
        ipad: function() {
            return Vn() || Bn;
        }
    }, Zn = Fn, qn = !("undefined" == typeof window || !window.document || !window.document.createElement), Rn = {
        canUseDOM: qn,
        canUseWorkers: "undefined" != typeof Worker,
        canUseEventListeners: qn && !(!window.addEventListener && !window.attachEvent),
        canUseViewport: qn && !!window.screen,
        isInWorker: !qn
    };
    Rn.canUseDOM && (In = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""))
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
    var Hn = function(e, t) {
        if (!Rn.canUseDOM || t && !("addEventListener" in document)) return !1;
        var n = "on" + e, o = n in document;
        if (!o) {
            var r = document.createElement("div");
            r.setAttribute(n, "return;"), o = "function" == typeof r[n];
        }
        return !o && In && "wheel" === e && (o = document.implementation.hasFeature("Events.wheel", "3.0")), 
        o;
    };
    function Un(e) {
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
    Un.getEventType = function() {
        return Zn.firefox() ? "DOMMouseScroll" : Hn("wheel") ? "wheel" : "mousewheel";
    };
    var Wn = Un, $n = B((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(oe), a = o(Wn);
        const i = new Map;
        let s;
        function l(e, t) {
            let n = [];
            return Array.isArray(t.arg) ? n = t.arg : n.push(t.arg), function(o, r) {
                const a = t.instance.popperRef, i = o.target, s = null == r ? void 0 : r.target, l = !t || !t.instance, c = !i || !s, u = e.contains(i) || e.contains(s), d = e === i, p = n.length && n.some(e => null == e ? void 0 : e.contains(i)) || n.length && n.includes(s), f = a && (a.contains(i) || a.contains(s));
                l || c || u || d || p || f || t.value(o, r);
            };
        }
        r.default || (Ke.on(document, "mousedown", e => s = e), Ke.on(document, "mouseup", e => {
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
                Ke.on(e, "mousedown", e => {
                    0 === e.button && (n = Date.now(), Ke.once(document, "mouseup", a), clearInterval(o), 
                    o = setInterval(r, 100));
                });
            }
        };
        const d = [], p = e => {
            if (0 === d.length) return;
            const t = d[d.length - 1]["_trap-focus-children"];
            if (t.length > 0 && e.code === yn.EVENT_CODE.tab) {
                if (1 === t.length) return e.preventDefault(), void (document.activeElement !== t[0] && t[0].focus());
                const n = e.shiftKey, o = e.target === t[0], r = e.target === t[t.length - 1];
                o && n && (e.preventDefault(), t[t.length - 1].focus()), r && !n && (e.preventDefault(), 
                t[0].focus());
            }
        }, f = {
            beforeMount(e) {
                e["_trap-focus-children"] = yn.obtainAllFocusableElements(e), d.push(e), d.length <= 1 && Ke.on(document, "keydown", p);
            },
            updated(e) {
                t.nextTick(() => {
                    e["_trap-focus-children"] = yn.obtainAllFocusableElements(e);
                });
            },
            unmounted() {
                d.shift(), 0 === d.length && Ke.off(document, "keydown", p);
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
    L($n);
    $n.ClickOutside, $n.Mousewheel, $n.RepeatClick, $n.TrapFocus;
    var Gn = B((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(Ye), a = o(wn);
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
        var v = {
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
        function g(e, {emit: n}) {
            const o = t.ref(null), r = t.ref(null), i = t.ref(null), s = "el-popper-" + Xe.generateId();
            let l = null, c = null, u = null, d = !1;
            const p = () => e.manualMode || "manual" === e.trigger, f = t.ref({
                zIndex: a.default.nextZIndex()
            }), m = h(e, {
                arrow: o
            }), v = t.reactive({
                visible: !!e.visible
            }), g = t.computed({
                get: () => !e.disabled && (Xe.isBool(e.visible) ? e.visible : v.visible),
                set(t) {
                    p() || (Xe.isBool(e.visible) ? n("update:visible", t) : v.visible = t);
                }
            });
            function b() {
                e.autoClose > 0 && (u = window.setTimeout(() => {
                    y();
                }, e.autoClose)), g.value = !0;
            }
            function y() {
                g.value = !1;
            }
            function w() {
                clearTimeout(c), clearTimeout(u);
            }
            const x = () => {
                p() || e.disabled || (w(), 0 === e.showAfter ? b() : c = window.setTimeout(() => {
                    b();
                }, e.showAfter));
            }, _ = () => {
                p() || (w(), e.hideAfter > 0 ? u = window.setTimeout(() => {
                    k();
                }, e.hideAfter) : k());
            }, k = () => {
                y(), e.disabled && E(!0);
            };
            function O() {
                if (!Xe.$(g)) return;
                const e = Xe.$(r), t = Xe.isHTMLElement(e) ? e : e.$el;
                l = gn.createPopper(t, Xe.$(i), Xe.$(m)), l.update();
            }
            function E(e) {
                !l || Xe.$(g) && !e || S();
            }
            function S() {
                var e;
                null == (e = null == l ? void 0 : l.destroy) || e.call(l), l = null;
            }
            const C = {};
            if (!p()) {
                const t = () => {
                    Xe.$(g) ? _() : x();
                }, n = e => {
                    switch (e.stopPropagation(), e.type) {
                      case "click":
                        d ? d = !1 : t();
                        break;

                      case "mouseenter":
                        x();
                        break;

                      case "mouseleave":
                        _();
                        break;

                      case "focus":
                        d = !0, x();
                        break;

                      case "blur":
                        d = !1, _();
                    }
                }, o = {
                    click: [ "onClick" ],
                    hover: [ "onMouseenter", "onMouseleave" ],
                    focus: [ "onFocus", "onBlur" ]
                }, r = e => {
                    o[e].forEach(e => {
                        C[e] = n;
                    });
                };
                Xe.isArray(e.trigger) ? Object.values(e.trigger).forEach(r) : r(e.trigger);
            }
            return t.watch(m, e => {
                l && (l.setOptions(e), l.update());
            }), t.watch(g, (function(e) {
                e && (f.value.zIndex = a.default.nextZIndex(), O());
            })), {
                update: function() {
                    Xe.$(g) && (l ? l.update() : O());
                },
                doDestroy: E,
                show: x,
                hide: _,
                onPopperMouseEnter: function() {
                    e.enterable && "click" !== e.trigger && clearTimeout(u);
                },
                onPopperMouseLeave: function() {
                    const {trigger: t} = e;
                    Xe.isString(t) && ("click" === t || "focus" === t) || 1 === t.length && ("click" === t[0] || "focus" === t[0]) || _();
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
                initializePopper: O,
                isManualMode: p,
                arrowRef: o,
                events: C,
                popperId: s,
                popperInstance: l,
                popperRef: i,
                popperStyle: f,
                triggerRef: r,
                visibility: g
            };
        }
        const b = () => {};
        function y(e, n) {
            const {effect: o, name: r, stopPopperMouseEvent: a, popperClass: i, popperStyle: s, popperRef: l, pure: c, popperId: u, visibility: d, onMouseenter: p, onMouseleave: f, onAfterEnter: m, onAfterLeave: h, onBeforeEnter: v, onBeforeLeave: g} = e, y = [ i, "el-popper", "is-" + o, c ? "is-pure" : "" ], w = a ? Ke.stop : b;
            return t.h(t.Transition, {
                name: r,
                onAfterEnter: m,
                onAfterLeave: h,
                onBeforeEnter: v,
                onBeforeLeave: g
            }, {
                default: t.withCtx(() => [ t.withDirectives(t.h("div", {
                    "aria-hidden": String(!d),
                    class: y,
                    style: null != s ? s : {},
                    id: u,
                    ref: null != l ? l : "popperRef",
                    role: "tooltip",
                    onMouseenter: p,
                    onMouseleave: f,
                    onClick: Ke.stop,
                    onMousedown: w,
                    onMouseup: w
                }, n), [ [ t.vShow, d ] ]) ])
            });
        }
        function w(e, n) {
            const o = xn.getFirstValidNode(e, 1);
            return o || r.default("renderTrigger", "trigger expects single rooted node"), t.cloneVNode(o, n, !0);
        }
        function x(e) {
            return e ? t.h("div", {
                ref: "arrowRef",
                class: "el-popper__arrow",
                "data-popper-arrow": ""
            }, null) : t.h(t.Comment, null, "");
        }
        var _ = Object.defineProperty, k = Object.getOwnPropertySymbols, O = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable, S = (e, t, n) => t in e ? _(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        var C = t.defineComponent({
            name: "ElPopper",
            props: v,
            emits: [ "update:visible", "after-enter", "after-leave", "before-enter", "before-leave" ],
            setup(e, n) {
                n.slots.trigger || r.default("ElPopper", "Trigger must be provided");
                const o = g(e, n), a = () => o.doDestroy(!0);
                return t.onMounted(o.initializePopper), t.onBeforeUnmount(a), t.onActivated(o.initializePopper), 
                t.onDeactivated(a), o;
            },
            render() {
                var e;
                const {$slots: n, appendToBody: o, class: r, style: a, effect: i, hide: s, onPopperMouseEnter: l, onPopperMouseLeave: c, onAfterEnter: u, onAfterLeave: d, onBeforeEnter: p, onBeforeLeave: f, popperClass: m, popperId: h, popperStyle: v, pure: g, showArrow: b, transition: _, visibility: C, stopPopperMouseEvent: M} = this, T = this.isManualMode(), N = x(b), A = y({
                    effect: i,
                    name: _,
                    popperClass: m,
                    popperId: h,
                    popperStyle: v,
                    pure: g,
                    stopPopperMouseEvent: M,
                    onMouseenter: l,
                    onMouseleave: c,
                    onAfterEnter: u,
                    onAfterLeave: d,
                    onBeforeEnter: p,
                    onBeforeLeave: f,
                    visibility: C
                }, [ t.renderSlot(n, "default", {}, () => [ t.toDisplayString(this.content) ]), N ]), P = null == (e = n.trigger) ? void 0 : e.call(n), L = ((e, t) => {
                    for (var n in t || (t = {})) O.call(t, n) && S(e, n, t[n]);
                    if (k) for (var n of k(t)) E.call(t, n) && S(e, n, t[n]);
                    return e;
                })({
                    "aria-describedby": h,
                    class: r,
                    style: a,
                    ref: "triggerRef"
                }, this.events), B = T ? w(P, L) : t.withDirectives(w(P, L), [ [ $n.ClickOutside, s ] ]);
                return t.h(t.Fragment, null, [ B, t.h(t.Teleport, {
                    to: "body",
                    disabled: !o
                }, [ A ]) ]);
            }
        });
        C.__file = "packages/popper/src/index.vue", C.install = e => {
            e.component(C.name, C);
        };
        const M = C;
        n.default = M, n.defaultProps = v, n.renderArrow = x, n.renderPopper = y, n.renderTrigger = w, 
        n.usePopper = g;
    }));
    L(Gn);
    Gn.Effect, Gn.defaultProps, Gn.renderArrow, Gn.renderPopper, Gn.renderTrigger, Gn.usePopper;
    var Yn = L(B((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(Gn), a = o(wn), i = Object.defineProperty, s = Object.defineProperties, l = Object.getOwnPropertyDescriptors, c = Object.getOwnPropertySymbols, u = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable, p = (e, t, n) => t in e ? i(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        function f(e, n) {
            const o = t.ref(a.default.nextZIndex()), r = t.computed(() => Xe.isString(e.width) ? e.width : e.width + "px"), i = t.computed(() => ({
                width: r.value,
                zIndex: o.value
            })), f = Gn.usePopper(e, n);
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
        var m = Object.defineProperty, h = Object.defineProperties, v = Object.getOwnPropertyDescriptors, g = Object.getOwnPropertySymbols, b = Object.prototype.hasOwnProperty, y = Object.prototype.propertyIsEnumerable, w = (e, t, n) => t in e ? m(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n, x = (e, t) => {
            for (var n in t || (t = {})) b.call(t, n) && w(e, n, t[n]);
            if (g) for (var n of g(t)) y.call(t, n) && w(e, n, t[n]);
            return e;
        };
        const _ = [ "update:visible", "after-enter", "after-leave", "show", "hide" ], k = {
            key: 0,
            class: "el-popover__title",
            role: "title"
        };
        var O, E, S = t.defineComponent({
            name: "ElPopover",
            components: {
                ElPopper: r.default
            },
            props: (O = x({}, Gn.defaultProps), E = {
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
            }, h(O, v(E))),
            emits: _,
            setup: (e, t) => f(e, t),
            render() {
                const {$slots: e} = this, n = e.reference ? e.reference() : null, o = xn.renderIf(this.title, "div", k, t.toDisplayString(this.title), xn.PatchFlags.TEXT), r = t.renderSlot(e, "default", {}, () => [ t.createTextVNode(t.toDisplayString(this.content), xn.PatchFlags.TEXT) ]), {events: a, onAfterEnter: i, onAfterLeave: s, onPopperMouseEnter: l, onPopperMouseLeave: c, popperStyle: u, popperId: d, popperClass: p, showArrow: f, transition: m, visibility: h, tabindex: v} = this, g = [ this.content ? "el-popover--plain" : "", "el-popover", p ].join(" ");
                let b = Gn.renderPopper({
                    effect: Gn.Effect.LIGHT,
                    name: m,
                    popperClass: g,
                    popperStyle: u,
                    popperId: d,
                    visibility: h,
                    onMouseenter: l,
                    onMouseleave: c,
                    onAfterEnter: i,
                    onAfterLeave: s,
                    stopPopperMouseEvent: !1
                }, [ o, r, Gn.renderArrow(f) ]);
                const y = n ? Gn.renderTrigger(n, x({
                    ariaDescribedby: d,
                    ref: "triggerRef",
                    tabindex: v
                }, a)) : t.createCommentVNode("v-if", !0);
                return t.h(t.Fragment, null, [ "click" === this.trigger ? t.withDirectives(y, [ [ $n.ClickOutside, this.hide ] ]) : y, t.h(t.Teleport, {
                    disabled: !this.appendToBody,
                    to: "body"
                }, [ b ]) ]);
            }
        });
        S.__file = "packages/popover/src/index.vue";
        const C = (e, t, n) => {
            const o = t.arg || t.value, r = n.dirs[0].instance.$refs[o];
            r && (r.triggerRef = e, e.setAttribute("tabindex", r.tabindex), Object.entries(r.events).forEach(([t, n]) => {
                Ke.on(e, t.toLowerCase().slice(2), n);
            }));
        };
        var M = {
            mounted(e, t, n) {
                C(e, t, n);
            },
            updated(e, t, n) {
                C(e, t, n);
            }
        };
        S.install = e => {
            e.component(S.name, S), e.directive("popover", M);
        }, S.directive = M;
        const T = S;
        n.default = T;
    }))), Xn = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    Xn.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("i", {
            class: [ "as-menu-item-icon", "icon-" + o.name ]
        }, null, 2);
    }, Xn.__file = "src/components/icon.vue";
    var Kn = {
        name: "menuItem",
        components: {
            popover: Yn,
            icon: Xn
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
            const {isMobile: n} = N(), o = m(), r = e.computed(() => "horizontal" === t.mode ? "horizontal" : "vertical"), a = e.computed(() => "horizontal" === t.mode ? "bottom-start" : "right-start");
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
                    return e.icon ? e.icon : et(e.url).origin + "/favicon.ico";
                },
                handleMenuShow: (e, t) => {
                    t.show = e;
                },
                handleClick: (t, n, o) => {
                    if (e.unref(o)) return;
                    const r = i();
                    n ? window.open(t.url.replace("%s", r)) : window.location.href = t.url.replace("%s", r);
                },
                isMobile: n
            };
        }
    };
    const Jn = {
        class: "as-subMenu"
    }, Qn = {
        class: "as-url-icon"
    };
    Kn.render = function(t, n, o, r, a, i) {
        const s = e.resolveComponent("icon"), l = e.resolveComponent("popover");
        return e.openBlock(), e.createBlock(l, {
            placement: r.placement,
            trigger: r.isMobile ? "click" : "hover",
            "popper-class": "as-subMenu-container"
        }, {
            reference: e.withCtx(() => [ e.createVNode("div", {
                class: [ "as-menu-item", r.classList ]
            }, [ e.createVNode(s, {
                name: o.item.name
            }, null, 8, [ "name" ]), e.createVNode("span", {
                class: "as-menu-item-title",
                textContent: e.toDisplayString(o.item.nameZh),
                onClick: n[1] || (n[1] = e => r.handleClick(o.item.list[0], !1, r.isMobile)),
                onMouseup: n[2] || (n[2] = e.withModifiers(e => r.handleClick(o.item.list[0], !0), [ "middle" ]))
            }, null, 40, [ "textContent" ]) ], 2) ]),
            default: e.withCtx(() => [ e.createVNode("ul", Jn, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(o.item.list, (t, n) => e.withDirectives((e.openBlock(), 
            e.createBlock("li", {
                key: `${o.item.name}_${n}`,
                onClick: e => r.handleClick(t),
                onMouseup: e.withModifiers(e => r.handleClick(t, !0), [ "middle" ])
            }, [ e.createVNode("div", Qn, [ e.createVNode("img", {
                src: r.getFavicon(t),
                onerror: "this.classList.add('error')"
            }, null, 8, [ "src" ]) ]), e.createVNode("p", {
                class: "as-subMenu-text",
                textContent: e.toDisplayString(t.nameZh)
            }, null, 8, [ "textContent" ]) ], 40, [ "onClick", "onMouseup" ])), [ [ e.vShow, t.data.visible ] ])), 128)) ]) ]),
            _: 1
        }, 8, [ "placement", "trigger" ]);
    }, Kn.__file = "src/components/menuItem.vue";
    const eo = i("align"), to = new Map([ [ "flex-start", "开始" ], [ "center", "居中" ], [ "flex-end", "末尾" ] ]), no = e => to.has(e) ? e : "flex-start", oo = e.ref(no(eo)), ro = e.reactive(to);
    function ao() {
        return {
            alignList: ro,
            align: oo
        };
    }
    e.watch(oo, e => {
        s("align", no(e));
    });
    var io = {
        name: "as-menu",
        components: {
            scrollbar: Je,
            menuItem: Kn
        },
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].indexOf(e) > -1
            }
        },
        setup(t) {
            const n = e.reactive(nt("tm")), {align: o} = ao();
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
    io.render = function(t, n, o, r, a, i) {
        const s = e.resolveComponent("menu-item"), l = e.resolveComponent("scrollbar");
        return e.openBlock(), e.createBlock(l, {
            class: "as-menu-container"
        }, {
            default: e.withCtx(() => [ e.createVNode("ul", {
                class: [ "as-menu", r.menuClass ],
                style: {
                    justifyContent: r.align
                }
            }, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(r.sites, t => (e.openBlock(), 
            e.createBlock(s, {
                key: t.name,
                item: t,
                mode: o.mode
            }, null, 8, [ "item", "mode" ]))), 128)) ], 6) ]),
            _: 1
        });
    }, io.__file = "src/components/menu.vue";
    const so = e.ref(""), lo = e.ref(""), co = e.ref("");
    e.watch(so, e => {
        uo("primary-color", e), s("primary-color", e);
    }), e.watch(lo, e => {
        uo("bg-color", e), s("bg-color", e);
    }), e.watch(co, e => {
        uo("primary-text-color", e), s("primary-text-color", e);
    });
    const uo = (e, t) => {
        document.getElementById("all-search").style.setProperty("--as-" + e, t), document.body.style.setProperty("--as-" + e, t);
    }, po = {
        "primary-color": so,
        "bg-color": lo,
        "primary-text-color": co
    }, fo = e => {
        const t = (e => {
            const t = document.getElementById("all-search");
            return getComputedStyle(t).getPropertyValue("--as-" + e).trim();
        })(e), n = i(e) || t;
        po[e].value = n;
    };
    function mo() {
        return e.onMounted(() => {
            fo("primary-color"), fo("bg-color"), fo("primary-text-color");
        }), {
            primaryColor: so,
            bgColor: lo,
            primaryTextColor: co
        };
    }
    var ho = {
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
    ho.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("div", {
            class: "as-overlay",
            onMousedown: n[1] || (n[1] = (...e) => r.onMouseDown && r.onMouseDown(...e)),
            onMouseup: n[2] || (n[2] = (...e) => r.onMouseUp && r.onMouseUp(...e)),
            onClick: n[3] || (n[3] = (...e) => r.onMaskClick && r.onMaskClick(...e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, ho.__file = "src/components/overlay.vue";
    var vo = {
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
    const go = {
        class: "as-radio as-radio-animate"
    }, bo = e.createVNode("i", {
        class: "as-radio-icon"
    }, null, -1), yo = {
        class: "as-radio-label"
    };
    vo.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("label", go, [ e.withDirectives(e.createVNode("input", {
            type: "radio",
            value: o.label,
            "onUpdate:modelValue": n[1] || (n[1] = e => r.model = e)
        }, null, 8, [ "value" ]), [ [ e.vModelRadio, r.model ] ]), bo, e.createVNode("span", yo, [ e.renderSlot(t.$slots, "default") ]) ]);
    }, vo.__file = "src/components/radio.vue";
    var wo = {
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
    wo.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("div", null, [ e.createVNode("label", {
            class: "as-label",
            style: r.labelStyle,
            textContent: e.toDisplayString(o.label)
        }, null, 12, [ "textContent" ]), e.createVNode("div", {
            class: "as-content",
            style: r.contentStyle
        }, [ e.renderSlot(t.$slots, "default") ], 4) ]);
    }, wo.__file = "src/components/form-item.vue";
    var xo = {
        name: "xButton",
        props: {
            type: {
                type: String,
                default: "primary"
            }
        }
    };
    xo.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("button", {
            class: [ "as-button", "as-button__" + o.type ]
        }, [ e.renderSlot(t.$slots, "default") ], 2);
    }, xo.__file = "src/components/button.vue";
    var _o = {
        name: "color",
        components: {
            asButton: xo
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
    const ko = e.withScopeId("data-v-2532dbfa");
    e.pushScopeId("data-v-2532dbfa");
    const Oo = {
        class: "color-set"
    }, Eo = {
        class: "label"
    }, So = e.createTextVNode(" 重置 ");
    e.popScopeId();
    const Co = ko((t, n, o, r, a, i) => {
        const s = e.resolveComponent("asButton");
        return e.openBlock(), e.createBlock("div", Oo, [ e.createVNode("label", Eo, [ e.withDirectives(e.createVNode("input", {
            class: "input—color",
            type: "color",
            "onUpdate:modelValue": n[1] || (n[1] = e => r.model = e)
        }, null, 512), [ [ e.vModelText, r.model ] ]) ]), e.createVNode(s, {
            class: "reset-btn",
            type: "text",
            onClick: r.reset
        }, {
            default: ko(() => [ So ]),
            _: 1
        }, 8, [ "onClick" ]) ]);
    });
    _o.render = Co, _o.__scopeId = "data-v-2532dbfa", _o.__file = "src/components/color.vue";
    var Mo = {
        name: "side-bar",
        components: {
            overlay: ho,
            asRadio: vo,
            formItem: wo,
            color: _o
        },
        setup() {
            const t = e.ref(!1), {mode: n} = T(), {alignList: o, align: r} = ao(), {primaryColor: a, bgColor: i, primaryTextColor: s} = mo();
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
    const To = e.createVNode("header", {
        class: "header"
    }, " 设置 ", -1), No = e.createTextVNode("横向 "), Ao = e.createTextVNode("竖向 "), Po = e.createVNode("footer", null, [ e.createVNode("a", {
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
    Mo.render = function(t, n, o, r, a, i) {
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
                    }, [ To, e.createVNode("section", null, [ e.createVNode(l, {
                        label: "方向"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(s, {
                            label: "horizontal",
                            modelValue: r.mode,
                            "onUpdate:modelValue": n[2] || (n[2] = e => r.mode = e),
                            onChange: r.changeMode
                        }, {
                            default: e.withCtx(() => [ No ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]), e.createVNode(s, {
                            label: "vertical",
                            modelValue: r.mode,
                            "onUpdate:modelValue": n[3] || (n[3] = e => r.mode = e),
                            onChange: r.changeMode
                        }, {
                            default: e.withCtx(() => [ Ao ]),
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
                    }) ]), Po ], 512), [ [ e.vShow, r.visible ] ]) ]),
                    _: 1
                }) ]),
                _: 1
            }, 8, [ "onClick" ]), [ [ e.vShow, r.visible ] ]) ]),
            _: 1
        }) ])) ], 64);
    }, Mo.__file = "src/components/side-bar.vue";
    var Lo = {
        name: "all-search",
        components: {
            logo: A,
            asMenu: io,
            sideBar: Mo
        },
        setup() {
            const t = m(), n = e.computed(() => [ "as-" + o.value ]), {mode: o} = T();
            return k(), {
                currentSite: t,
                mode: o,
                classList: n
            };
        }
    };
    Lo.render = function(t, n, o, r, a, i) {
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
    }, Lo.__file = "src/as-script/index.vue";
    let Bo = m();
    const jo = e.createApp(Lo);
    function Do() {
        Bo = m();
        const e = document.getElementById("all-search");
        if (e) e.style.display = Bo.invisible ? "none" : "unset"; else {
            const e = function() {
                let e = document.createElement("div");
                return e.id = "all-search", e;
            }(), t = document.body.parentElement.insertBefore(e, document.body);
            jo.mount(t), function() {
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
        Do();
    }).catch(e => {
        console.error(e);
    });
}(Vue);
