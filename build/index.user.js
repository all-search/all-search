// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      1.1.6
// @description  2021年8月16日更新 竖向横向布局随意切换，支持图形界面自定义设置分类和添加链接，个人配置自动保存到谷歌插件。
// @author       endday
// @license      GPL-2.0
// @update       2021/8/16
// @homepageURL  https://github.com/endday/all-search
// @updateURL    https://cdn.jsdelivr.net/npm/all-search@latest/build/index.js
// @downloadURL  https://cdn.jsdelivr.net/npm/all-search@latest/build/index.js
// @noframes
// @require      https://cdn.bootcdn.net/ajax/libs/vue/3.1.2/vue.global.prod.min.js
// @resource     as-icon  https://cdn.jsdelivr.net/npm/all-search@1.1.6/src/assets/iconfont.css
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search@1.1.6/build/as-style.css
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
// @include      /\/\/www\.startpage\.com\/do\/search/
// @include      /\/\/endday\.github\.io/
// @include      /\/\/endday\.gitee\.io/

// ==/UserScript==
/* eslint-disable */

!function(e) {
    "use strict";
    var t = "default" in e ? e.default : e, n = "1.1.6";
    e.reactive({
        tmVersion: ""
    });
    const r = n;
    function o(e, t) {
        t = t || window.location.href;
        const n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)"), r = t.match(n);
        return decodeURIComponent(r ? r[2] : "");
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
    function u(e, t, n, r = !1) {
        !function(e, t, n) {
            const r = t / 1e3 * 60;
            let o = 0;
            if (!0 === n) {
                if (e()) return;
            }
            requestAnimationFrame((function t() {
                if (o < r) o++, requestAnimationFrame(t); else {
                    e() || !1 || (o = 0, requestAnimationFrame(t));
                }
            }));
        }((function() {
            let o = document.querySelector(n);
            if (void 0 === n && (o = document.body || document.head || document.documentElement || document), 
            void 0 === n || void 0 !== n && null !== document.querySelector(n)) {
                if (r) c("." + t); else if (!r && null !== document.querySelector("." + t)) return !0;
                let n = document.createElement("style");
                t && (n.className = t), n.setAttribute("type", "text/css"), n.innerHTML = e;
                try {
                    o.appendChild(n);
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
        keyword: () => o("text") || o("q")
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
        url: /\/\/www\.startpage\.com\/do\/search/
    }, {
        url: /\/\/endday\.github\.io/,
        invisible: !0
    }, {
        url: /\/\/endday\.gitee\.io/,
        invisible: !0
    } ], h = function() {
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
    function m(e, t) {
        return function() {
            const n = e.apply(this, arguments);
            return t.apply(this, arguments), n;
        };
    }
    let v = h();
    const g = i("mode"), b = "vertical" !== (y = g) && "horizontal" !== y ? "horizontal" : y;
    var y;
    const w = (e = b) => {
        v = h();
        const t = document.body;
        if (t.classList.remove("body-vertical", "body-horizontal"), e) {
            const n = "body-" + e;
            t.classList.add(n);
        }
    }, _ = (e = b) => {
        if (v = h(), c(".as-custom-style"), v.style) {
            let t = "";
            v.style[1] && "horizontal" === e ? t = v.style[1] : v.style[2] && "vertical" === e && (t = v.style[2]), 
            t && u(t, "as-custom-style");
        }
    }, x = function() {
        v = h(), v.invisible || v.disabled ? c(".as-style") : l("as-style", `https://cdn.jsdelivr.net/npm/all-search@${r}/build/as-style.css`);
    }, O = function() {
        var e, t, n;
        Node.prototype.removeChild = (e = Node.prototype.removeChild, t = e => !e || "STYLE" !== e.tagName || !(e.classList.contains("as-icon") || e.classList.contains("as-style")), 
        function() {
            if (!1 !== t.apply(this, arguments)) return e.apply(this, arguments);
        }), _(), w(), l("as-icon", `https://cdn.jsdelivr.net/npm/all-search@${r}/src/assets/iconfont.css`), 
        x(), n = () => {
            v = h(), _(), w(), x();
        }, history.pushState = m(history.pushState, n), history.replaceState = m(history.replaceState, n), 
        window.addEventListener("yt-navigate-finish", n);
    }, k = i("mode"), E = e => "vertical" !== e && "horizontal" !== e ? "horizontal" : e, S = e.ref(E(k)), j = (e = "horizontal") => {
        w(e), _(e);
    };
    !function(e) {
        const t = function() {
            document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || e();
        };
        document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), 
        document.addEventListener("mozfullscreenchange", e), document.addEventListener("MSFullscreenChange", e), 
        document.addEventListener("resize", t);
    }(() => {
        j(S.value);
    }), e.watch(S, e => {
        const t = E(e);
        j(t), s("mode", t);
    });
    const C = function(e, t = 500) {
        let n = null;
        return function() {
            clearTimeout(n), n = setTimeout(() => {
                e.apply(this, arguments);
            }, t);
        };
    }(() => j(S.value));
    function M() {
        return e.onMounted(() => {
            j(S.value), window.addEventListener("resize", C, !1);
        }), e.onUnmounted(() => {
            window.removeEventListener("resize", C, !1);
        }), {
            mode: S
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
        }
    };
    const T = e.createVNode("p", {
        class: "as-title-inner"
    }, " All Search ", -1);
    A.render = function(t, n, r, o, a, i) {
        return e.openBlock(), e.createBlock("a", {
            class: [ "as-title", "as-title-" + r.mode ],
            href: "https://github.com/endday/all-search",
            target: "_blank"
        }, [ T ], 2);
    }, A.__file = "src/components/logo.vue";
    var N = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function P(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    }
    function z(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports;
    }
    var L = function() {
        if ("undefined" != typeof Map) return Map;
        function e(e, t) {
            var n = -1;
            return e.some((function(e, r) {
                return e[0] === t && (n = r, !0);
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
                var n = e(this.__entries__, t), r = this.__entries__[n];
                return r && r[1];
            }, t.prototype.set = function(t, n) {
                var r = e(this.__entries__, t);
                ~r ? this.__entries__[r][1] = n : this.__entries__.push([ t, n ]);
            }, t.prototype.delete = function(t) {
                var n = this.__entries__, r = e(n, t);
                ~r && n.splice(r, 1);
            }, t.prototype.has = function(t) {
                return !!~e(this.__entries__, t);
            }, t.prototype.clear = function() {
                this.__entries__.splice(0);
            }, t.prototype.forEach = function(e, t) {
                void 0 === t && (t = null);
                for (var n = 0, r = this.__entries__; n < r.length; n++) {
                    var o = r[n];
                    e.call(t, o[1], o[0]);
                }
            }, t;
        }();
    }(), B = "undefined" != typeof window && "undefined" != typeof document && window.document === document, D = "undefined" != typeof global && global.Math === Math ? global : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(), V = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(D) : function(e) {
        return setTimeout((function() {
            return e(Date.now());
        }), 1e3 / 60);
    };
    var F = [ "top", "right", "bottom", "left", "width", "height", "size", "weight" ], I = "undefined" != typeof MutationObserver, R = function() {
        function e() {
            this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, 
            this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), 
            this.refresh = function(e, t) {
                var n = !1, r = !1, o = 0;
                function a() {
                    n && (n = !1, e()), r && s();
                }
                function i() {
                    V(a);
                }
                function s() {
                    var e = Date.now();
                    if (n) {
                        if (e - o < 2) return;
                        r = !0;
                    } else n = !0, r = !1, setTimeout(i, t);
                    o = e;
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
            B && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), 
            window.addEventListener("resize", this.refresh), I ? (this.mutationsObserver_ = new MutationObserver(this.refresh), 
            this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), 
            this.connected_ = !0);
        }, e.prototype.disconnect_ = function() {
            B && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), 
            window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), 
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), 
            this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
        }, e.prototype.onTransitionEnd_ = function(e) {
            var t = e.propertyName, n = void 0 === t ? "" : t;
            F.some((function(e) {
                return !!~n.indexOf(e);
            })) && this.refresh();
        }, e.getInstance = function() {
            return this.instance_ || (this.instance_ = new e), this.instance_;
        }, e.instance_ = null, e;
    }(), q = function(e, t) {
        for (var n = 0, r = Object.keys(t); n < r.length; n++) {
            var o = r[n];
            Object.defineProperty(e, o, {
                value: t[o],
                enumerable: !1,
                writable: !1,
                configurable: !0
            });
        }
        return e;
    }, Z = function(e) {
        return e && e.ownerDocument && e.ownerDocument.defaultView || D;
    }, U = X(0, 0, 0, 0);
    function H(e) {
        return parseFloat(e) || 0;
    }
    function W(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        return t.reduce((function(t, n) {
            return t + H(e["border-" + n + "-width"]);
        }), 0);
    }
    function $(e) {
        var t = e.clientWidth, n = e.clientHeight;
        if (!t && !n) return U;
        var r = Z(e).getComputedStyle(e), o = function(e) {
            for (var t = {}, n = 0, r = [ "top", "right", "bottom", "left" ]; n < r.length; n++) {
                var o = r[n], a = e["padding-" + o];
                t[o] = H(a);
            }
            return t;
        }(r), a = o.left + o.right, i = o.top + o.bottom, s = H(r.width), l = H(r.height);
        if ("border-box" === r.boxSizing && (Math.round(s + a) !== t && (s -= W(r, "left", "right") + a), 
        Math.round(l + i) !== n && (l -= W(r, "top", "bottom") + i)), !function(e) {
            return e === Z(e).document.documentElement;
        }(e)) {
            var c = Math.round(s + a) - t, u = Math.round(l + i) - n;
            1 !== Math.abs(c) && (s -= c), 1 !== Math.abs(u) && (l -= u);
        }
        return X(o.left, o.top, s, l);
    }
    var G = "undefined" != typeof SVGGraphicsElement ? function(e) {
        return e instanceof Z(e).SVGGraphicsElement;
    } : function(e) {
        return e instanceof Z(e).SVGElement && "function" == typeof e.getBBox;
    };
    function Y(e) {
        return B ? G(e) ? function(e) {
            var t = e.getBBox();
            return X(0, 0, t.width, t.height);
        }(e) : $(e) : U;
    }
    function X(e, t, n, r) {
        return {
            x: e,
            y: t,
            width: n,
            height: r
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
            var t = e.x, n = e.y, r = e.width, o = e.height, a = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, i = Object.create(a.prototype);
            return q(i, {
                x: t,
                y: n,
                width: r,
                height: o,
                top: n,
                right: t + r,
                bottom: o + n,
                left: t
            }), i;
        }(t);
        q(this, {
            target: e,
            contentRect: n
        });
    }, Q = function() {
        function e(e, t, n) {
            if (this.activeObservations_ = [], this.observations_ = new L, "function" != typeof e) throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e, this.controller_ = t, this.callbackCtx_ = n;
        }
        return e.prototype.observe = function(e) {
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Z(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new K(e)), this.controller_.addObserver(this), this.controller_.refresh());
            }
        }, e.prototype.unobserve = function(e) {
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Z(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
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
    }(), ee = "undefined" != typeof WeakMap ? new WeakMap : new L, te = function e(t) {
        if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        var n = R.getInstance(), r = new Q(t, n, this);
        ee.set(this, r);
    };
    [ "observe", "unobserve", "disconnect" ].forEach((function(e) {
        te.prototype[e] = function() {
            var t;
            return (t = ee.get(this))[e].apply(t, arguments);
        };
    }));
    var ne = void 0 !== D.ResizeObserver ? D.ResizeObserver : te, re = z((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = "undefined" == typeof window;
        t.default = n;
    }));
    P(re);
    var oe = z((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(ne), o = n(re);
        const a = function(e) {
            for (const t of e) {
                const e = t.target.__resizeListeners__ || [];
                e.length && e.forEach(e => {
                    e();
                });
            }
        };
        t.addResizeListener = function(e, t) {
            !o.default && e && (e.__resizeListeners__ || (e.__resizeListeners__ = [], e.__ro__ = new r.default(a), 
            e.__ro__.observe(e)), e.__resizeListeners__.push(t));
        }, t.removeResizeListener = function(e, t) {
            e && e.__resizeListeners__ && (e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t), 1), 
            e.__resizeListeners__.length || e.__ro__.disconnect());
        };
    }));
    P(oe);
    oe.addResizeListener, oe.removeResizeListener;
    function ae(e, t) {
        const n = Object.create(null), r = e.split(",");
        for (let e = 0; e < r.length; e++) n[r[e]] = !0;
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
    const he = ae("animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width"), me = ae("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");
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
    const ye = ae("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), we = ae("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), _e = ae("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), xe = /["'&<>]/;
    const Oe = /^-?>|<!--|-->|--!>|<!-$/g;
    function ke(e, t) {
        if (e === t) return !0;
        let n = Ne(e), r = Ne(t);
        if (n || r) return !(!n || !r) && e.getTime() === t.getTime();
        if (n = Me(e), r = Me(t), n || r) return !(!n || !r) && function(e, t) {
            if (e.length !== t.length) return !1;
            let n = !0;
            for (let r = 0; n && r < e.length; r++) n = ke(e[r], t[r]);
            return n;
        }(e, t);
        if (n = Le(e), r = Le(t), n || r) {
            if (!n || !r) return !1;
            if (Object.keys(e).length !== Object.keys(t).length) return !1;
            for (const n in e) {
                const r = e.hasOwnProperty(n), o = t.hasOwnProperty(n);
                if (r && !o || !r && o || !ke(e[n], t[n])) return !1;
            }
        }
        return String(e) === String(t);
    }
    const Ee = (e, t) => Ae(t) ? {
        [`Map(${t.size})`]: [ ...t.entries() ].reduce((e, [t, n]) => (e[t + " =>"] = n, 
        e), {})
    } : Te(t) ? {
        [`Set(${t.size})`]: [ ...t.values() ]
    } : !Le(t) || Me(t) || Ve(t) ? t : String(t), Se = /^on[^a-z]/, je = Object.assign, Ce = Object.prototype.hasOwnProperty, Me = Array.isArray, Ae = e => "[object Map]" === De(e), Te = e => "[object Set]" === De(e), Ne = e => e instanceof Date, Pe = e => "function" == typeof e, ze = e => "string" == typeof e, Le = e => null !== e && "object" == typeof e, Be = Object.prototype.toString, De = e => Be.call(e), Ve = e => "[object Object]" === De(e), Fe = ae(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Ie = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n));
    }, Re = /-(\w)/g, qe = Ie(e => e.replace(Re, (e, t) => t ? t.toUpperCase() : "")), Ze = /\B([A-Z])/g, Ue = Ie(e => e.replace(Ze, "-$1").toLowerCase()), He = Ie(e => e.charAt(0).toUpperCase() + e.slice(1)), We = Ie(e => e ? "on" + He(e) : "");
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
        capitalize: He,
        def: (e, t, n) => {
            Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !1,
                value: n
            });
        },
        escapeHtml: function(e) {
            const t = "" + e, n = xe.exec(t);
            if (!n) return t;
            let r, o, a = "", i = 0;
            for (o = n.index; o < t.length; o++) {
                switch (t.charCodeAt(o)) {
                  case 34:
                    r = "&quot;";
                    break;

                  case 38:
                    r = "&amp;";
                    break;

                  case 39:
                    r = "&#39;";
                    break;

                  case 60:
                    r = "&lt;";
                    break;

                  case 62:
                    r = "&gt;";
                    break;

                  default:
                    continue;
                }
                i !== o && (a += t.substring(i, o)), i = o + 1, a += r;
            }
            return i !== o ? a + t.substring(i, o) : a;
        },
        escapeHtmlComment: function(e) {
            return e.replace(Oe, "");
        },
        extend: je,
        generateCodeFrame: function(e, t = 0, n = e.length) {
            let r = e.split(/(\r?\n)/);
            const o = r.filter((e, t) => t % 2 == 1);
            r = r.filter((e, t) => t % 2 == 0);
            let a = 0;
            const i = [];
            for (let e = 0; e < r.length; e++) if (a += r[e].length + (o[e] && o[e].length || 0), 
            a >= t) {
                for (let s = e - 2; s <= e + 2 || n > a; s++) {
                    if (s < 0 || s >= r.length) continue;
                    const l = s + 1;
                    i.push(`${l}${" ".repeat(Math.max(3 - String(l).length, 0))}|  ${r[s]}`);
                    const c = r[s].length, u = o[s] && o[s].length || 0;
                    if (s === e) {
                        const e = t - (a - (c + u)), r = Math.max(1, n > a ? c - e : n - t);
                        i.push("   |  " + " ".repeat(e) + "^".repeat(r));
                    } else if (s > e) {
                        if (n > a) {
                            const e = Math.max(Math.min(n - a, c), 1);
                            i.push("   |  " + "^".repeat(e));
                        }
                        a += c + u;
                    }
                }
                break;
            }
            return i.join("\n");
        },
        getGlobalThis: () => $e || ($e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}),
        hasChanged: (e, t) => e !== t && (e == e || t == t),
        hasOwn: (e, t) => Ce.call(e, t),
        hyphenate: Ue,
        invokeArrayFns: (e, t) => {
            for (let n = 0; n < e.length; n++) e[n](t);
        },
        isArray: Me,
        isBooleanAttr: de,
        isDate: Ne,
        isFunction: Pe,
        isGloballyWhitelisted: le,
        isHTMLTag: ye,
        isIntegerKey: e => ze(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
        isKnownAttr: me,
        isMap: Ae,
        isModelListener: e => e.startsWith("onUpdate:"),
        isNoUnitNumericStyleProp: he,
        isObject: Le,
        isOn: e => Se.test(e),
        isPlainObject: Ve,
        isPromise: e => Le(e) && Pe(e.then) && Pe(e.catch),
        isReservedProp: Fe,
        isSSRSafeAttrName: function(e) {
            if (fe.hasOwnProperty(e)) return fe[e];
            const t = pe.test(e);
            return t && console.error("unsafe attribute name: " + e), fe[e] = !t;
        },
        isSVGTag: we,
        isSet: Te,
        isSpecialBooleanAttr: ue,
        isString: ze,
        isSymbol: e => "symbol" == typeof e,
        isVoidTag: _e,
        looseEqual: ke,
        looseIndexOf: function(e, t) {
            return e.findIndex(e => ke(e, t));
        },
        makeMap: ae,
        normalizeClass: function e(t) {
            let n = "";
            if (ze(t)) n = t; else if (Me(t)) for (let r = 0; r < t.length; r++) {
                const o = e(t[r]);
                o && (n += o + " ");
            } else if (Le(t)) for (const e in t) t[e] && (n += e + " ");
            return n.trim();
        },
        normalizeStyle: function e(t) {
            if (Me(t)) {
                const n = {};
                for (let r = 0; r < t.length; r++) {
                    const o = t[r], a = e(ze(o) ? be(o) : o);
                    if (a) for (const e in a) n[e] = a[e];
                }
                return n;
            }
            if (Le(t)) return t;
        },
        objectToString: Be,
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
                const r = e[n], o = n.startsWith("--") ? n : Ue(n);
                (ze(r) || "number" == typeof r && he(o)) && (t += `${o}:${r};`);
            }
            return t;
        },
        toDisplayString: e => null == e ? "" : Le(e) ? JSON.stringify(e, Ee, 2) : String(e),
        toHandlerKey: We,
        toNumber: e => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t;
        },
        toRawType: e => De(e).slice(8, -1),
        toTypeString: De
    });
    var Ye = function() {
        this.__data__ = [], this.size = 0;
    };
    var Xe = function(e, t) {
        return e === t || e != e && t != t;
    };
    var Ke = function(e, t) {
        for (var n = e.length; n--; ) if (Xe(e[n][0], t)) return n;
        return -1;
    }, Je = Array.prototype.splice;
    var Qe = function(e) {
        var t = this.__data__, n = Ke(t, e);
        return !(n < 0) && (n == t.length - 1 ? t.pop() : Je.call(t, n, 1), --this.size, 
        !0);
    };
    var et = function(e) {
        var t = this.__data__, n = Ke(t, e);
        return n < 0 ? void 0 : t[n][1];
    };
    var tt = function(e) {
        return Ke(this.__data__, e) > -1;
    };
    var nt = function(e, t) {
        var n = this.__data__, r = Ke(n, e);
        return r < 0 ? (++this.size, n.push([ e, t ])) : n[r][1] = t, this;
    };
    function rt(e) {
        var t = -1, n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
        }
    }
    rt.prototype.clear = Ye, rt.prototype.delete = Qe, rt.prototype.get = et, rt.prototype.has = tt, 
    rt.prototype.set = nt;
    var ot = rt;
    var at = function() {
        this.__data__ = new ot, this.size = 0;
    };
    var it = function(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
    };
    var st = function(e) {
        return this.__data__.get(e);
    };
    var lt = function(e) {
        return this.__data__.has(e);
    }, ct = "object" == typeof N && N && N.Object === Object && N, ut = "object" == typeof self && self && self.Object === Object && self, dt = ct || ut || Function("return this")(), pt = dt.Symbol, ft = Object.prototype, ht = ft.hasOwnProperty, mt = ft.toString, vt = pt ? pt.toStringTag : void 0;
    var gt = function(e) {
        var t = ht.call(e, vt), n = e[vt];
        try {
            e[vt] = void 0;
            var r = !0;
        } catch (e) {}
        var o = mt.call(e);
        return r && (t ? e[vt] = n : delete e[vt]), o;
    }, bt = Object.prototype.toString;
    var yt = function(e) {
        return bt.call(e);
    }, wt = pt ? pt.toStringTag : void 0;
    var _t = function(e) {
        return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : wt && wt in Object(e) ? gt(e) : yt(e);
    };
    var xt = function(e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t);
    };
    var Ot, kt = function(e) {
        if (!xt(e)) return !1;
        var t = _t(e);
        return "[object Function]" == t || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t;
    }, Et = dt["__core-js_shared__"], St = (Ot = /[^.]+$/.exec(Et && Et.keys && Et.keys.IE_PROTO || "")) ? "Symbol(src)_1." + Ot : "";
    var jt = function(e) {
        return !!St && St in e;
    }, Ct = Function.prototype.toString;
    var Mt = function(e) {
        if (null != e) {
            try {
                return Ct.call(e);
            } catch (e) {}
            try {
                return e + "";
            } catch (e) {}
        }
        return "";
    }, At = /^\[object .+?Constructor\]$/, Tt = Function.prototype, Nt = Object.prototype, Pt = Tt.toString, zt = Nt.hasOwnProperty, Lt = RegExp("^" + Pt.call(zt).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Bt = function(e) {
        return !(!xt(e) || jt(e)) && (kt(e) ? Lt : At).test(Mt(e));
    };
    var Dt = function(e, t) {
        return null == e ? void 0 : e[t];
    };
    var Vt = function(e, t) {
        var n = Dt(e, t);
        return Bt(n) ? n : void 0;
    }, Ft = Vt(dt, "Map"), It = Vt(Object, "create");
    var Rt = function() {
        this.__data__ = It ? It(null) : {}, this.size = 0;
    };
    var qt = function(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
    }, Zt = Object.prototype.hasOwnProperty;
    var Ut = function(e) {
        var t = this.__data__;
        if (It) {
            var n = t[e];
            return "__lodash_hash_undefined__" === n ? void 0 : n;
        }
        return Zt.call(t, e) ? t[e] : void 0;
    }, Ht = Object.prototype.hasOwnProperty;
    var Wt = function(e) {
        var t = this.__data__;
        return It ? void 0 !== t[e] : Ht.call(t, e);
    };
    var $t = function(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = It && void 0 === t ? "__lodash_hash_undefined__" : t, 
        this;
    };
    function Gt(e) {
        var t = -1, n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
        }
    }
    Gt.prototype.clear = Rt, Gt.prototype.delete = qt, Gt.prototype.get = Ut, Gt.prototype.has = Wt, 
    Gt.prototype.set = $t;
    var Yt = Gt;
    var Xt = function() {
        this.size = 0, this.__data__ = {
            hash: new Yt,
            map: new (Ft || ot),
            string: new Yt
        };
    };
    var Kt = function(e) {
        var t = typeof e;
        return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e;
    };
    var Jt = function(e, t) {
        var n = e.__data__;
        return Kt(t) ? n["string" == typeof t ? "string" : "hash"] : n.map;
    };
    var Qt = function(e) {
        var t = Jt(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
    };
    var en = function(e) {
        return Jt(this, e).get(e);
    };
    var tn = function(e) {
        return Jt(this, e).has(e);
    };
    var nn = function(e, t) {
        var n = Jt(this, e), r = n.size;
        return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
    };
    function rn(e) {
        var t = -1, n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
        }
    }
    rn.prototype.clear = Xt, rn.prototype.delete = Qt, rn.prototype.get = en, rn.prototype.has = tn, 
    rn.prototype.set = nn;
    var on = rn;
    var an = function(e, t) {
        var n = this.__data__;
        if (n instanceof ot) {
            var r = n.__data__;
            if (!Ft || r.length < 199) return r.push([ e, t ]), this.size = ++n.size, this;
            n = this.__data__ = new on(r);
        }
        return n.set(e, t), this.size = n.size, this;
    };
    function sn(e) {
        var t = this.__data__ = new ot(e);
        this.size = t.size;
    }
    sn.prototype.clear = at, sn.prototype.delete = it, sn.prototype.get = st, sn.prototype.has = lt, 
    sn.prototype.set = an;
    var ln = sn;
    var cn = function(e) {
        return this.__data__.set(e, "__lodash_hash_undefined__"), this;
    };
    var un = function(e) {
        return this.__data__.has(e);
    };
    function dn(e) {
        var t = -1, n = null == e ? 0 : e.length;
        for (this.__data__ = new on; ++t < n; ) this.add(e[t]);
    }
    dn.prototype.add = dn.prototype.push = cn, dn.prototype.has = un;
    var pn = dn;
    var fn = function(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r; ) if (t(e[n], n, e)) return !0;
        return !1;
    };
    var hn = function(e, t) {
        return e.has(t);
    };
    var mn = function(e, t, n, r, o, a) {
        var i = 1 & n, s = e.length, l = t.length;
        if (s != l && !(i && l > s)) return !1;
        var c = a.get(e), u = a.get(t);
        if (c && u) return c == t && u == e;
        var d = -1, p = !0, f = 2 & n ? new pn : void 0;
        for (a.set(e, t), a.set(t, e); ++d < s; ) {
            var h = e[d], m = t[d];
            if (r) var v = i ? r(m, h, d, t, e, a) : r(h, m, d, e, t, a);
            if (void 0 !== v) {
                if (v) continue;
                p = !1;
                break;
            }
            if (f) {
                if (!fn(t, (function(e, t) {
                    if (!hn(f, t) && (h === e || o(h, e, n, r, a))) return f.push(t);
                }))) {
                    p = !1;
                    break;
                }
            } else if (h !== m && !o(h, m, n, r, a)) {
                p = !1;
                break;
            }
        }
        return a.delete(e), a.delete(t), p;
    }, vn = dt.Uint8Array;
    var gn = function(e) {
        var t = -1, n = Array(e.size);
        return e.forEach((function(e, r) {
            n[++t] = [ r, e ];
        })), n;
    };
    var bn = function(e) {
        var t = -1, n = Array(e.size);
        return e.forEach((function(e) {
            n[++t] = e;
        })), n;
    }, yn = pt ? pt.prototype : void 0, wn = yn ? yn.valueOf : void 0;
    var _n = function(e, t, n, r, o, a, i) {
        switch (n) {
          case "[object DataView]":
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
            e = e.buffer, t = t.buffer;

          case "[object ArrayBuffer]":
            return !(e.byteLength != t.byteLength || !a(new vn(e), new vn(t)));

          case "[object Boolean]":
          case "[object Date]":
          case "[object Number]":
            return Xe(+e, +t);

          case "[object Error]":
            return e.name == t.name && e.message == t.message;

          case "[object RegExp]":
          case "[object String]":
            return e == t + "";

          case "[object Map]":
            var s = gn;

          case "[object Set]":
            var l = 1 & r;
            if (s || (s = bn), e.size != t.size && !l) return !1;
            var c = i.get(e);
            if (c) return c == t;
            r |= 2, i.set(e, t);
            var u = mn(s(e), s(t), r, o, a, i);
            return i.delete(e), u;

          case "[object Symbol]":
            if (wn) return wn.call(e) == wn.call(t);
        }
        return !1;
    };
    var xn = function(e, t) {
        for (var n = -1, r = t.length, o = e.length; ++n < r; ) e[o + n] = t[n];
        return e;
    }, On = Array.isArray;
    var kn = function(e, t, n) {
        var r = t(e);
        return On(e) ? r : xn(r, n(e));
    };
    var En = function(e, t) {
        for (var n = -1, r = null == e ? 0 : e.length, o = 0, a = []; ++n < r; ) {
            var i = e[n];
            t(i, n, e) && (a[o++] = i);
        }
        return a;
    };
    var Sn = function() {
        return [];
    }, jn = Object.prototype.propertyIsEnumerable, Cn = Object.getOwnPropertySymbols, Mn = Cn ? function(e) {
        return null == e ? [] : (e = Object(e), En(Cn(e), (function(t) {
            return jn.call(e, t);
        })));
    } : Sn;
    var An = function(e, t) {
        for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
        return r;
    };
    var Tn = function(e) {
        return null != e && "object" == typeof e;
    };
    var Nn = function(e) {
        return Tn(e) && "[object Arguments]" == _t(e);
    }, Pn = Object.prototype, zn = Pn.hasOwnProperty, Ln = Pn.propertyIsEnumerable, Bn = Nn(function() {
        return arguments;
    }()) ? Nn : function(e) {
        return Tn(e) && zn.call(e, "callee") && !Ln.call(e, "callee");
    };
    var Dn = function() {
        return !1;
    }, Vn = z((function(e, t) {
        var n = t && !t.nodeType && t, r = n && e && !e.nodeType && e, o = r && r.exports === n ? dt.Buffer : void 0, a = (o ? o.isBuffer : void 0) || Dn;
        e.exports = a;
    })), Fn = /^(?:0|[1-9]\d*)$/;
    var In = function(e, t) {
        var n = typeof e;
        return !!(t = null == t ? 9007199254740991 : t) && ("number" == n || "symbol" != n && Fn.test(e)) && e > -1 && e % 1 == 0 && e < t;
    };
    var Rn = function(e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991;
    }, qn = {};
    qn["[object Float32Array]"] = qn["[object Float64Array]"] = qn["[object Int8Array]"] = qn["[object Int16Array]"] = qn["[object Int32Array]"] = qn["[object Uint8Array]"] = qn["[object Uint8ClampedArray]"] = qn["[object Uint16Array]"] = qn["[object Uint32Array]"] = !0, 
    qn["[object Arguments]"] = qn["[object Array]"] = qn["[object ArrayBuffer]"] = qn["[object Boolean]"] = qn["[object DataView]"] = qn["[object Date]"] = qn["[object Error]"] = qn["[object Function]"] = qn["[object Map]"] = qn["[object Number]"] = qn["[object Object]"] = qn["[object RegExp]"] = qn["[object Set]"] = qn["[object String]"] = qn["[object WeakMap]"] = !1;
    var Zn = function(e) {
        return Tn(e) && Rn(e.length) && !!qn[_t(e)];
    };
    var Un = function(e) {
        return function(t) {
            return e(t);
        };
    }, Hn = z((function(e, t) {
        var n = t && !t.nodeType && t, r = n && e && !e.nodeType && e, o = r && r.exports === n && ct.process, a = function() {
            try {
                var e = r && r.require && r.require("util").types;
                return e || o && o.binding && o.binding("util");
            } catch (e) {}
        }();
        e.exports = a;
    })), Wn = Hn && Hn.isTypedArray, $n = Wn ? Un(Wn) : Zn, Gn = Object.prototype.hasOwnProperty;
    var Yn = function(e, t) {
        var n = On(e), r = !n && Bn(e), o = !n && !r && Vn(e), a = !n && !r && !o && $n(e), i = n || r || o || a, s = i ? An(e.length, String) : [], l = s.length;
        for (var c in e) !t && !Gn.call(e, c) || i && ("length" == c || o && ("offset" == c || "parent" == c) || a && ("buffer" == c || "byteLength" == c || "byteOffset" == c) || In(c, l)) || s.push(c);
        return s;
    }, Xn = Object.prototype;
    var Kn = function(e) {
        var t = e && e.constructor;
        return e === ("function" == typeof t && t.prototype || Xn);
    };
    var Jn = function(e, t) {
        return function(n) {
            return e(t(n));
        };
    }(Object.keys, Object), Qn = Object.prototype.hasOwnProperty;
    var er = function(e) {
        if (!Kn(e)) return Jn(e);
        var t = [];
        for (var n in Object(e)) Qn.call(e, n) && "constructor" != n && t.push(n);
        return t;
    };
    var tr = function(e) {
        return null != e && Rn(e.length) && !kt(e);
    };
    var nr = function(e) {
        return tr(e) ? Yn(e) : er(e);
    };
    var rr = function(e) {
        return kn(e, nr, Mn);
    }, or = Object.prototype.hasOwnProperty;
    var ar = function(e, t, n, r, o, a) {
        var i = 1 & n, s = rr(e), l = s.length;
        if (l != rr(t).length && !i) return !1;
        for (var c = l; c--; ) {
            var u = s[c];
            if (!(i ? u in t : or.call(t, u))) return !1;
        }
        var d = a.get(e), p = a.get(t);
        if (d && p) return d == t && p == e;
        var f = !0;
        a.set(e, t), a.set(t, e);
        for (var h = i; ++c < l; ) {
            var m = e[u = s[c]], v = t[u];
            if (r) var g = i ? r(v, m, u, t, e, a) : r(m, v, u, e, t, a);
            if (!(void 0 === g ? m === v || o(m, v, n, r, a) : g)) {
                f = !1;
                break;
            }
            h || (h = "constructor" == u);
        }
        if (f && !h) {
            var b = e.constructor, y = t.constructor;
            b == y || !("constructor" in e) || !("constructor" in t) || "function" == typeof b && b instanceof b && "function" == typeof y && y instanceof y || (f = !1);
        }
        return a.delete(e), a.delete(t), f;
    }, ir = Vt(dt, "DataView"), sr = Vt(dt, "Promise"), lr = Vt(dt, "Set"), cr = Vt(dt, "WeakMap"), ur = Mt(ir), dr = Mt(Ft), pr = Mt(sr), fr = Mt(lr), hr = Mt(cr), mr = _t;
    (ir && "[object DataView]" != mr(new ir(new ArrayBuffer(1))) || Ft && "[object Map]" != mr(new Ft) || sr && "[object Promise]" != mr(sr.resolve()) || lr && "[object Set]" != mr(new lr) || cr && "[object WeakMap]" != mr(new cr)) && (mr = function(e) {
        var t = _t(e), n = "[object Object]" == t ? e.constructor : void 0, r = n ? Mt(n) : "";
        if (r) switch (r) {
          case ur:
            return "[object DataView]";

          case dr:
            return "[object Map]";

          case pr:
            return "[object Promise]";

          case fr:
            return "[object Set]";

          case hr:
            return "[object WeakMap]";
        }
        return t;
    });
    var vr = mr, gr = Object.prototype.hasOwnProperty;
    var br = function(e, t, n, r, o, a) {
        var i = On(e), s = On(t), l = i ? "[object Array]" : vr(e), c = s ? "[object Array]" : vr(t), u = "[object Object]" == (l = "[object Arguments]" == l ? "[object Object]" : l), d = "[object Object]" == (c = "[object Arguments]" == c ? "[object Object]" : c), p = l == c;
        if (p && Vn(e)) {
            if (!Vn(t)) return !1;
            i = !0, u = !1;
        }
        if (p && !u) return a || (a = new ln), i || $n(e) ? mn(e, t, n, r, o, a) : _n(e, t, l, n, r, o, a);
        if (!(1 & n)) {
            var f = u && gr.call(e, "__wrapped__"), h = d && gr.call(t, "__wrapped__");
            if (f || h) {
                var m = f ? e.value() : e, v = h ? t.value() : t;
                return a || (a = new ln), o(m, v, n, r, a);
            }
        }
        return !!p && (a || (a = new ln), ar(e, t, n, r, o, a));
    };
    var yr = function e(t, n, r, o, a) {
        return t === n || (null == t || null == n || !Tn(t) && !Tn(n) ? t != t && n != n : br(t, n, r, o, e, a));
    };
    var wr = function(e, t, n) {
        var r = (n = "function" == typeof n ? n : void 0) ? n(e, t) : void 0;
        return void 0 === r ? yr(e, t, void 0, n) : !!r;
    }, _r = z((function(e, t) {
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
    P(_r);
    _r.warn;
    var xr = z((function(e, n) {
        function r(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = r(wr), a = r(re);
        const i = Ge.hyphenate, s = e => "number" == typeof e;
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
            return Ge.isString(e) ? e : s(e) ? e + "px" : "";
        }, n.arrayFind = function(e, t) {
            return e.find(t);
        }, n.arrayFindIndex = function(e, t) {
            return e.findIndex(t);
        }, n.arrayFlat = function e(t) {
            return t.reduce((t, n) => {
                const r = Array.isArray(n) ? e(n) : n;
                return t.concat(r);
            }, []);
        }, n.autoprefixer = function(e) {
            const t = [ "ms-", "webkit-" ];
            return [ "transform", "transition", "animation" ].forEach(n => {
                const r = e[n];
                n && r && t.forEach(t => {
                    e[t + n] = r;
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
            let r = e;
            const o = (t = (t = t.replace(/\[(\w+)\]/g, ".$1")).replace(/^\./, "")).split(".");
            let a = 0;
            for (;a < o.length - 1 && (r || n); a++) {
                const e = o[a];
                if (!(e in r)) {
                    if (n) throw new Error("please transfer a valid prop path to form item!");
                    break;
                }
                r = r[e];
            }
            return {
                o: r,
                k: o[a],
                v: null == r ? void 0 : r[o[a]]
            };
        }, n.getRandomInt = function(e) {
            return Math.floor(Math.random() * Math.floor(e));
        }, n.getValueByPath = (e, t = "") => {
            let n = e;
            return t.split(".").map(e => {
                n = null == n ? void 0 : n[e];
            }), n;
        }, n.isBool = e => "boolean" == typeof e, n.isEdge = function() {
            return !a.default && navigator.userAgent.indexOf("Edge") > -1;
        }, n.isEmpty = function(e) {
            return !!(!e && 0 !== e || Ge.isArray(e) && !e.length || Ge.isObject(e) && !Object.keys(e).length);
        }, n.isEqualWithFunction = function(e, t) {
            return o.default(e, t, (e, t) => Ge.isFunction(e) && Ge.isFunction(t) ? "" + e == "" + t : void 0);
        }, n.isFirefox = function() {
            return !a.default && !!window.navigator.userAgent.match(/firefox/i);
        }, n.isHTMLElement = e => Ge.toRawType(e).startsWith("HTML"), n.isIE = function() {
            return !a.default && !isNaN(Number(document.documentMode));
        }, n.isNumber = s, n.isUndefined = function(e) {
            return void 0 === e;
        }, n.kebabCase = i, n.rafThrottle = function(e) {
            let t = !1;
            return function(...n) {
                t || (t = !0, window.requestAnimationFrame(() => {
                    e.apply(this, n), t = !1;
                }));
            };
        }, n.refAttacher = e => t => {
            e.value = t;
        }, n.toObject = function(e) {
            const t = {};
            for (let n = 0; n < e.length; n++) e[n] && Ge.extend(t, e[n]);
            return t;
        }, n.useGlobalConfig = function() {
            const e = t.getCurrentInstance();
            return "$ELEMENT" in e.proxy ? e.proxy.$ELEMENT : {};
        };
    }));
    P(xr);
    xr.$, xr.SCOPE, xr.addUnit, xr.arrayFind, xr.arrayFindIndex, xr.arrayFlat, xr.autoprefixer, 
    xr.clearTimer, xr.coerceTruthyValueToArray, xr.deduplicate, xr.entries, xr.escapeRegexpString, 
    xr.generateId, xr.getPropByPath, xr.getRandomInt, xr.getValueByPath, xr.isBool, 
    xr.isEdge, xr.isEmpty, xr.isEqualWithFunction, xr.isFirefox, xr.isHTMLElement, xr.isIE, 
    xr.isNumber, xr.isUndefined, xr.kebabCase, xr.rafThrottle, xr.refAttacher, xr.toObject, 
    xr.useGlobalConfig;
    var Or = z((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(re);
        const o = function(e, t, n, r = !1) {
            e && t && n && e.addEventListener(t, n, r);
        }, a = function(e, t, n, r = !1) {
            e && t && n && e.removeEventListener(t, n, r);
        };
        function i(e, t) {
            if (!e || !t) return !1;
            if (-1 !== t.indexOf(" ")) throw new Error("className should not contain space.");
            return e.classList ? e.classList.contains(t) : (" " + e.className + " ").indexOf(" " + t + " ") > -1;
        }
        const s = function(e, t) {
            if (!r.default) {
                if (!e || !t) return null;
                "float" === (t = xr.camelize(t)) && (t = "cssFloat");
                try {
                    const n = e.style[t];
                    if (n) return n;
                    const r = document.defaultView.getComputedStyle(e, "");
                    return r ? r[t] : "";
                } catch (n) {
                    return e.style[t];
                }
            }
        };
        function l(e, t, n) {
            e && t && (xr.isObject(t) ? Object.keys(t).forEach(n => {
                l(e, n, t[n]);
            }) : (t = xr.camelize(t), e.style[t] = n));
        }
        const c = (e, t) => {
            if (r.default) return;
            return s(e, null == t ? "overflow" : t ? "overflow-y" : "overflow-x").match(/(scroll|auto|overlay)/);
        }, u = e => {
            let t = 0, n = e;
            for (;n; ) t += n.offsetTop, n = n.offsetParent;
            return t;
        };
        t.addClass = function(e, t) {
            if (!e) return;
            let n = e.className;
            const r = (t || "").split(" ");
            for (let t = 0, o = r.length; t < o; t++) {
                const o = r[t];
                o && (e.classList ? e.classList.add(o) : i(e, o) || (n += " " + o));
            }
            e.classList || (e.className = n);
        }, t.getOffsetTop = u, t.getOffsetTopDistance = (e, t) => Math.abs(u(e) - u(t)), 
        t.getScrollContainer = (e, t) => {
            if (r.default) return;
            let n = e;
            for (;n; ) {
                if ([ window, document, document.documentElement ].includes(n)) return window;
                if (c(n, t)) return n;
                n = n.parentNode;
            }
            return n;
        }, t.getStyle = s, t.hasClass = i, t.isInContainer = (e, t) => {
            if (r.default || !e || !t) return !1;
            const n = e.getBoundingClientRect();
            let o;
            return o = [ window, document, document.documentElement, null, void 0 ].includes(t) ? {
                top: 0,
                right: window.innerWidth,
                bottom: window.innerHeight,
                left: 0
            } : t.getBoundingClientRect(), n.top < o.bottom && n.bottom > o.top && n.right > o.left && n.left < o.right;
        }, t.isScroll = c, t.off = a, t.on = o, t.once = function(e, t, n) {
            const r = function(...o) {
                n && n.apply(this, o), a(e, t, r);
            };
            o(e, t, r);
        }, t.removeClass = function(e, t) {
            if (!e || !t) return;
            const n = t.split(" ");
            let r = " " + e.className + " ";
            for (let t = 0, o = n.length; t < o; t++) {
                const o = n[t];
                o && (e.classList ? e.classList.remove(o) : i(e, o) && (r = r.replace(" " + o + " ", " ")));
            }
            e.classList || (e.className = (r || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ""));
        }, t.removeStyle = function(e, t) {
            e && t && (xr.isObject(t) ? Object.keys(t).forEach(t => {
                l(e, t, "");
            }) : l(e, t, ""));
        }, t.setStyle = l, t.stop = e => e.stopPropagation();
    }));
    P(Or);
    Or.addClass, Or.getOffsetTop, Or.getOffsetTopDistance, Or.getScrollContainer, Or.getStyle, 
    Or.hasClass, Or.isInContainer, Or.isScroll, Or.off, Or.on, Or.once, Or.removeClass, 
    Or.removeStyle, Or.setStyle, Or.stop;
    var kr = P(z((function(e, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        const r = {
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
        var o = t.defineComponent({
            name: "Bar",
            props: {
                vertical: Boolean,
                size: String,
                move: Number,
                always: Boolean
            },
            setup(e) {
                const n = t.ref(null), o = t.ref(null), a = t.inject("scrollbar", {}), i = t.inject("scrollbar-wrap", {}), s = t.computed(() => r[e.vertical ? "vertical" : "horizontal"]), l = t.ref({}), c = t.ref(null), u = t.ref(null), d = t.ref(!1);
                let p = null;
                const f = e => {
                    e.stopImmediatePropagation(), c.value = !0, Or.on(document, "mousemove", h), Or.on(document, "mouseup", m), 
                    p = document.onselectstart, document.onselectstart = () => !1;
                }, h = e => {
                    if (!1 === c.value) return;
                    const t = l.value[s.value.axis];
                    if (!t) return;
                    const r = 100 * (-1 * (n.value.getBoundingClientRect()[s.value.direction] - e[s.value.client]) - (o.value[s.value.offset] - t)) / n.value[s.value.offset];
                    i.value[s.value.scroll] = r * i.value[s.value.scrollSize] / 100;
                }, m = () => {
                    c.value = !1, l.value[s.value.axis] = 0, Or.off(document, "mousemove", h), document.onselectstart = p, 
                    u.value && (d.value = !1);
                }, v = t.computed(() => function({move: e, size: t, bar: n}) {
                    const r = {}, o = `translate${n.axis}(${e}%)`;
                    return r[n.size] = t, r.transform = o, r.msTransform = o, r.webkitTransform = o, 
                    r;
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
                    Or.on(a.value, "mousemove", g), Or.on(a.value, "mouseleave", b);
                }), t.onBeforeUnmount(() => {
                    Or.off(document, "mouseup", m), Or.off(a.value, "mousemove", g), Or.off(a.value, "mouseleave", b);
                }), {
                    instance: n,
                    thumb: o,
                    bar: s,
                    clickTrackHandler: e => {
                        const t = 100 * (Math.abs(e.target.getBoundingClientRect()[s.value.direction] - e[s.value.client]) - o.value[s.value.offset] / 2) / n.value[s.value.offset];
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
        o.render = function(e, n, r, o, a, i) {
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
                }, null, 36) ], 34), [ [ t.vShow, e.always || e.visible ] ]) ]),
                _: 1
            });
        }, o.__file = "packages/scrollbar/src/bar.vue";
        var a = t.defineComponent({
            name: "ElScrollbar",
            components: {
                Bar: o
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
                },
                always: {
                    type: Boolean,
                    default: !1
                }
            },
            emits: [ "scroll" ],
            setup(e, {emit: n}) {
                const r = t.ref("0"), o = t.ref("0"), a = t.ref(0), i = t.ref(0), s = t.ref(null), l = t.ref(null), c = t.ref(null);
                t.provide("scrollbar", s), t.provide("scrollbar-wrap", l);
                const u = () => {
                    if (!l.value) return;
                    const e = 100 * l.value.clientHeight / l.value.scrollHeight, t = 100 * l.value.clientWidth / l.value.scrollWidth;
                    o.value = e < 100 ? e + "%" : "", r.value = t < 100 ? t + "%" : "";
                }, d = t.computed(() => {
                    let t = e.wrapStyle;
                    return xr.isArray(t) ? (t = xr.toObject(t), t.height = xr.addUnit(e.height), t.maxHeight = xr.addUnit(e.maxHeight)) : xr.isString(t) && (t += xr.addUnit(e.height) ? `height: ${xr.addUnit(e.height)};` : "", 
                    t += xr.addUnit(e.maxHeight) ? `max-height: ${xr.addUnit(e.maxHeight)};` : ""), 
                    t;
                });
                return t.onMounted(() => {
                    e.native || t.nextTick(u), e.noresize || (oe.addResizeListener(c.value, u), addEventListener("resize", u));
                }), t.onBeforeUnmount(() => {
                    e.noresize || (oe.removeResizeListener(c.value, u), removeEventListener("resize", u));
                }), {
                    moveX: a,
                    moveY: i,
                    sizeWidth: r,
                    sizeHeight: o,
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
                    },
                    setScrollTop: e => {
                        xr.isNumber(e) && (l.value.scrollTop = e);
                    },
                    setScrollLeft: e => {
                        xr.isNumber(e) && (l.value.scrollLeft = e);
                    }
                };
            }
        });
        const i = {
            ref: "scrollbar",
            class: "el-scrollbar"
        };
        a.render = function(e, n, r, o, a, s) {
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
                size: e.sizeWidth,
                always: e.always
            }, null, 8, [ "move", "size", "always" ]), t.createVNode(l, {
                move: e.moveY,
                size: e.sizeHeight,
                vertical: "",
                always: e.always
            }, null, 8, [ "move", "size", "always" ]) ], 64)) ], 512);
        }, a.__file = "packages/scrollbar/src/index.vue", a.install = e => {
            e.component(a.name, a);
        };
        const s = a;
        n.default = s;
    })));
    let Er = document.createElement("a");
    function Sr(e) {
        let t = e;
        if (t.indexOf("//") < 0) t = "//" + t; else {
            if (!(t.indexOf("//") > -1)) return Er;
            t = function(e) {
                const t = e.toLowerCase(), n = [ "http://", "https://", "ftp://", "files://" ];
                for (let r = 0; r < n.length; r++) if (0 === t.indexOf(n[r])) return e.replace(/.*\/\//, "//");
                return e;
            }(t);
        }
        return Er.href = t, {
            href: Er.href,
            origin: Er.origin,
            protocol: Er.protocol,
            host: Er.host,
            hostname: Er.hostname,
            port: Er.port,
            pathname: Er.pathname,
            search: Er.search,
            hash: Er.hash
        };
    }
    const jr = [ {
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
            const {hostname: n} = Sr(t.url);
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
    function Cr(e) {
        let t = jr;
        const n = i("sites"), o = i("sites-version");
        return n && (t = n, n && o && (o !== r || "tm" !== e) && (t = function(e, t) {
            const n = JSON.parse(JSON.stringify(e));
            let r = JSON.parse(JSON.stringify(t.filter(e => "personal" !== e.name)));
            return r.forEach(e => {
                const t = n.find(t => t.name === e.name);
                t && (e.list.forEach(e => {
                    const n = t.list.findIndex(t => t.id === e.id);
                    n > -1 && (Object.keys(e).forEach(r => {
                        "data" !== r && (t.list[n][r] = e[r]);
                    }), e.isAdd = !0);
                }), e.list = e.list.filter(e => !e.isAdd), e.list.length && (t.list = t.list.concat(e.list)), 
                e.isAdd = !0);
            }), r = r.filter(e => !e.isAdd), r.length && n.push(...r), n;
        }(n, jr), s("sites", t), s("sites-version", r))), "tm" === e && (t = t.filter(e => e.list && e.list.length > 0 && e.data && e.data.visible).map(e => ({
            ...e,
            show: !1
        }))), t;
    }
    var Mr = "top", Ar = "bottom", Tr = "right", Nr = "left", Pr = [ Mr, Ar, Tr, Nr ], zr = Pr.reduce((function(e, t) {
        return e.concat([ t + "-start", t + "-end" ]);
    }), []), Lr = [].concat(Pr, [ "auto" ]).reduce((function(e, t) {
        return e.concat([ t, t + "-start", t + "-end" ]);
    }), []), Br = [ "beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite" ];
    function Dr(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
    }
    function Vr(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window;
        }
        return e;
    }
    function Fr(e) {
        return e instanceof Vr(e).Element || e instanceof Element;
    }
    function Ir(e) {
        return e instanceof Vr(e).HTMLElement || e instanceof HTMLElement;
    }
    function Rr(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof Vr(e).ShadowRoot || e instanceof ShadowRoot);
    }
    var qr = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var t = e.state;
            Object.keys(t.elements).forEach((function(e) {
                var n = t.styles[e] || {}, r = t.attributes[e] || {}, o = t.elements[e];
                Ir(o) && Dr(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function(e) {
                    var t = r[e];
                    !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t);
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
                    var r = t.elements[e], o = t.attributes[e] || {}, a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                        return e[t] = "", e;
                    }), {});
                    Ir(r) && Dr(r) && (Object.assign(r.style, a), Object.keys(o).forEach((function(e) {
                        r.removeAttribute(e);
                    })));
                }));
            };
        },
        requires: [ "computeStyles" ]
    };
    function Zr(e) {
        return e.split("-")[0];
    }
    function Ur(e) {
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
    function Hr(e) {
        var t = Ur(e), n = e.offsetWidth, r = e.offsetHeight;
        return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), 
        {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: n,
            height: r
        };
    }
    function Wr(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && Rr(n)) {
            var r = t;
            do {
                if (r && e.isSameNode(r)) return !0;
                r = r.parentNode || r.host;
            } while (r);
        }
        return !1;
    }
    function $r(e) {
        return Vr(e).getComputedStyle(e);
    }
    function Gr(e) {
        return [ "table", "td", "th" ].indexOf(Dr(e)) >= 0;
    }
    function Yr(e) {
        return ((Fr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
    }
    function Xr(e) {
        return "html" === Dr(e) ? e : e.assignedSlot || e.parentNode || (Rr(e) ? e.host : null) || Yr(e);
    }
    function Kr(e) {
        return Ir(e) && "fixed" !== $r(e).position ? e.offsetParent : null;
    }
    function Jr(e) {
        for (var t = Vr(e), n = Kr(e); n && Gr(n) && "static" === $r(n).position; ) n = Kr(n);
        return n && ("html" === Dr(n) || "body" === Dr(n) && "static" === $r(n).position) ? t : n || function(e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && Ir(e) && "fixed" === $r(e).position) return null;
            for (var n = Xr(e); Ir(n) && [ "html", "body" ].indexOf(Dr(n)) < 0; ) {
                var r = $r(n);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== [ "transform", "perspective" ].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
                n = n.parentNode;
            }
            return null;
        }(e) || t;
    }
    function Qr(e) {
        return [ "top", "bottom" ].indexOf(e) >= 0 ? "x" : "y";
    }
    var eo = Math.max, to = Math.min, no = Math.round;
    function ro(e, t, n) {
        return eo(e, to(t, n));
    }
    function oo(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e);
    }
    function ao(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e, t;
        }), {});
    }
    var io = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, s = Zr(n.placement), l = Qr(s), c = [ Nr, Tr ].indexOf(s) >= 0 ? "height" : "width";
            if (a && i) {
                var u = function(e, t) {
                    return oo("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                        placement: t.placement
                    })) : e) ? e : ao(e, Pr));
                }(o.padding, n), d = Hr(a), p = "y" === l ? Mr : Nr, f = "y" === l ? Ar : Tr, h = n.rects.reference[c] + n.rects.reference[l] - i[l] - n.rects.popper[c], m = i[l] - n.rects.reference[l], v = Jr(a), g = v ? "y" === l ? v.clientHeight || 0 : v.clientWidth || 0 : 0, b = h / 2 - m / 2, y = u[p], w = g - d[c] - u[f], _ = g / 2 - d[c] / 2 + b, x = ro(y, _, w), O = l;
                n.modifiersData[r] = ((t = {})[O] = x, t.centerOffset = x - _, t);
            }
        },
        effect: function(e) {
            var t = e.state, n = e.options.element, r = void 0 === n ? "[data-popper-arrow]" : n;
            null != r && ("string" != typeof r || (r = t.elements.popper.querySelector(r))) && Wr(t.elements.popper, r) && (t.elements.arrow = r);
        },
        requires: [ "popperOffsets" ],
        requiresIfExists: [ "preventOverflow" ]
    }, so = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };
    function lo(e) {
        var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.offsets, i = e.position, s = e.gpuAcceleration, l = e.adaptive, c = e.roundOffsets, u = !0 === c ? function(e) {
            var t = e.x, n = e.y, r = window.devicePixelRatio || 1;
            return {
                x: no(no(t * r) / r) || 0,
                y: no(no(n * r) / r) || 0
            };
        }(a) : "function" == typeof c ? c(a) : a, d = u.x, p = void 0 === d ? 0 : d, f = u.y, h = void 0 === f ? 0 : f, m = a.hasOwnProperty("x"), v = a.hasOwnProperty("y"), g = Nr, b = Mr, y = window;
        if (l) {
            var w = Jr(n), _ = "clientHeight", x = "clientWidth";
            w === Vr(n) && "static" !== $r(w = Yr(n)).position && (_ = "scrollHeight", x = "scrollWidth"), 
            w = w, o === Mr && (b = Ar, h -= w[_] - r.height, h *= s ? 1 : -1), o === Nr && (g = Tr, 
            p -= w[x] - r.width, p *= s ? 1 : -1);
        }
        var O, k = Object.assign({
            position: i
        }, l && so);
        return s ? Object.assign({}, k, ((O = {})[b] = v ? "0" : "", O[g] = m ? "0" : "", 
        O.transform = (y.devicePixelRatio || 1) < 2 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", 
        O)) : Object.assign({}, k, ((t = {})[b] = v ? h + "px" : "", t[g] = m ? p + "px" : "", 
        t.transform = "", t));
    }
    var co = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(e) {
            var t = e.state, n = e.options, r = n.gpuAcceleration, o = void 0 === r || r, a = n.adaptive, i = void 0 === a || a, s = n.roundOffsets, l = void 0 === s || s, c = {
                placement: Zr(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: o
            };
            null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, lo(Object.assign({}, c, {
                offsets: t.modifiersData.popperOffsets,
                position: t.options.strategy,
                adaptive: i,
                roundOffsets: l
            })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, lo(Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l
            })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement
            });
        },
        data: {}
    }, uo = {
        passive: !0
    };
    var po = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(e) {
            var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = void 0 === o || o, i = r.resize, s = void 0 === i || i, l = Vr(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return a && c.forEach((function(e) {
                e.addEventListener("scroll", n.update, uo);
            })), s && l.addEventListener("resize", n.update, uo), function() {
                a && c.forEach((function(e) {
                    e.removeEventListener("scroll", n.update, uo);
                })), s && l.removeEventListener("resize", n.update, uo);
            };
        },
        data: {}
    }, fo = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    function ho(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return fo[e];
        }));
    }
    var mo = {
        start: "end",
        end: "start"
    };
    function vo(e) {
        return e.replace(/start|end/g, (function(e) {
            return mo[e];
        }));
    }
    function go(e) {
        var t = Vr(e);
        return {
            scrollLeft: t.pageXOffset,
            scrollTop: t.pageYOffset
        };
    }
    function bo(e) {
        return Ur(Yr(e)).left + go(e).scrollLeft;
    }
    function yo(e) {
        var t = $r(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + o + r);
    }
    function wo(e, t) {
        var n;
        void 0 === t && (t = []);
        var r = function e(t) {
            return [ "html", "body", "#document" ].indexOf(Dr(t)) >= 0 ? t.ownerDocument.body : Ir(t) && yo(t) ? t : e(Xr(t));
        }(e), o = r === (null == (n = e.ownerDocument) ? void 0 : n.body), a = Vr(r), i = o ? [ a ].concat(a.visualViewport || [], yo(r) ? r : []) : r, s = t.concat(i);
        return o ? s : s.concat(wo(Xr(i)));
    }
    function _o(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        });
    }
    function xo(e, t) {
        return "viewport" === t ? _o(function(e) {
            var t = Vr(e), n = Yr(e), r = t.visualViewport, o = n.clientWidth, a = n.clientHeight, i = 0, s = 0;
            return r && (o = r.width, a = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (i = r.offsetLeft, 
            s = r.offsetTop)), {
                width: o,
                height: a,
                x: i + bo(e),
                y: s
            };
        }(e)) : Ir(t) ? function(e) {
            var t = Ur(e);
            return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, 
            t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, 
            t.x = t.left, t.y = t.top, t;
        }(t) : _o(function(e) {
            var t, n = Yr(e), r = go(e), o = null == (t = e.ownerDocument) ? void 0 : t.body, a = eo(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = eo(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -r.scrollLeft + bo(e), l = -r.scrollTop;
            return "rtl" === $r(o || n).direction && (s += eo(n.clientWidth, o ? o.clientWidth : 0) - a), 
            {
                width: a,
                height: i,
                x: s,
                y: l
            };
        }(Yr(e)));
    }
    function Oo(e, t, n) {
        var r = "clippingParents" === t ? function(e) {
            var t = wo(Xr(e)), n = [ "absolute", "fixed" ].indexOf($r(e).position) >= 0 && Ir(e) ? Jr(e) : e;
            return Fr(n) ? t.filter((function(e) {
                return Fr(e) && Wr(e, n) && "body" !== Dr(e);
            })) : [];
        }(e) : [].concat(t), o = [].concat(r, [ n ]), a = o[0], i = o.reduce((function(t, n) {
            var r = xo(e, n);
            return t.top = eo(r.top, t.top), t.right = to(r.right, t.right), t.bottom = to(r.bottom, t.bottom), 
            t.left = eo(r.left, t.left), t;
        }), xo(e, a));
        return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, 
        i;
    }
    function ko(e) {
        return e.split("-")[1];
    }
    function Eo(e) {
        var t, n = e.reference, r = e.element, o = e.placement, a = o ? Zr(o) : null, i = o ? ko(o) : null, s = n.x + n.width / 2 - r.width / 2, l = n.y + n.height / 2 - r.height / 2;
        switch (a) {
          case Mr:
            t = {
                x: s,
                y: n.y - r.height
            };
            break;

          case Ar:
            t = {
                x: s,
                y: n.y + n.height
            };
            break;

          case Tr:
            t = {
                x: n.x + n.width,
                y: l
            };
            break;

          case Nr:
            t = {
                x: n.x - r.width,
                y: l
            };
            break;

          default:
            t = {
                x: n.x,
                y: n.y
            };
        }
        var c = a ? Qr(a) : null;
        if (null != c) {
            var u = "y" === c ? "height" : "width";
            switch (i) {
              case "start":
                t[c] = t[c] - (n[u] / 2 - r[u] / 2);
                break;

              case "end":
                t[c] = t[c] + (n[u] / 2 - r[u] / 2);
            }
        }
        return t;
    }
    function So(e, t) {
        void 0 === t && (t = {});
        var n = t, r = n.placement, o = void 0 === r ? e.placement : r, a = n.boundary, i = void 0 === a ? "clippingParents" : a, s = n.rootBoundary, l = void 0 === s ? "viewport" : s, c = n.elementContext, u = void 0 === c ? "popper" : c, d = n.altBoundary, p = void 0 !== d && d, f = n.padding, h = void 0 === f ? 0 : f, m = oo("number" != typeof h ? h : ao(h, Pr)), v = "popper" === u ? "reference" : "popper", g = e.elements.reference, b = e.rects.popper, y = e.elements[p ? v : u], w = Oo(Fr(y) ? y : y.contextElement || Yr(e.elements.popper), i, l), _ = Ur(g), x = Eo({
            reference: _,
            element: b,
            strategy: "absolute",
            placement: o
        }), O = _o(Object.assign({}, b, x)), k = "popper" === u ? O : _, E = {
            top: w.top - k.top + m.top,
            bottom: k.bottom - w.bottom + m.bottom,
            left: w.left - k.left + m.left,
            right: k.right - w.right + m.right
        }, S = e.modifiersData.offset;
        if ("popper" === u && S) {
            var j = S[o];
            Object.keys(E).forEach((function(e) {
                var t = [ Tr, Ar ].indexOf(e) >= 0 ? 1 : -1, n = [ Mr, Ar ].indexOf(e) >= 0 ? "y" : "x";
                E[e] += j[n] * t;
            }));
        }
        return E;
    }
    function jo(e, t) {
        void 0 === t && (t = {});
        var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, s = n.flipVariations, l = n.allowedAutoPlacements, c = void 0 === l ? Lr : l, u = ko(r), d = u ? s ? zr : zr.filter((function(e) {
            return ko(e) === u;
        })) : Pr, p = d.filter((function(e) {
            return c.indexOf(e) >= 0;
        }));
        0 === p.length && (p = d);
        var f = p.reduce((function(t, n) {
            return t[n] = So(e, {
                placement: n,
                boundary: o,
                rootBoundary: a,
                padding: i
            })[Zr(n)], t;
        }), {});
        return Object.keys(f).sort((function(e, t) {
            return f[e] - f[t];
        }));
    }
    var Co = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options, r = e.name;
            if (!t.modifiersData[r]._skip) {
                for (var o = n.mainAxis, a = void 0 === o || o, i = n.altAxis, s = void 0 === i || i, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.flipVariations, h = void 0 === f || f, m = n.allowedAutoPlacements, v = t.options.placement, g = Zr(v), b = l || (g === v || !h ? [ ho(v) ] : function(e) {
                    if ("auto" === Zr(e)) return [];
                    var t = ho(e);
                    return [ vo(e), t, vo(t) ];
                }(v)), y = [ v ].concat(b).reduce((function(e, n) {
                    return e.concat("auto" === Zr(n) ? jo(t, {
                        placement: n,
                        boundary: u,
                        rootBoundary: d,
                        padding: c,
                        flipVariations: h,
                        allowedAutoPlacements: m
                    }) : n);
                }), []), w = t.rects.reference, _ = t.rects.popper, x = new Map, O = !0, k = y[0], E = 0; E < y.length; E++) {
                    var S = y[E], j = Zr(S), C = "start" === ko(S), M = [ Mr, Ar ].indexOf(j) >= 0, A = M ? "width" : "height", T = So(t, {
                        placement: S,
                        boundary: u,
                        rootBoundary: d,
                        altBoundary: p,
                        padding: c
                    }), N = M ? C ? Tr : Nr : C ? Ar : Mr;
                    w[A] > _[A] && (N = ho(N));
                    var P = ho(N), z = [];
                    if (a && z.push(T[j] <= 0), s && z.push(T[N] <= 0, T[P] <= 0), z.every((function(e) {
                        return e;
                    }))) {
                        k = S, O = !1;
                        break;
                    }
                    x.set(S, z);
                }
                if (O) for (var L = function(e) {
                    var t = y.find((function(t) {
                        var n = x.get(t);
                        if (n) return n.slice(0, e).every((function(e) {
                            return e;
                        }));
                    }));
                    if (t) return k = t, "break";
                }, B = h ? 3 : 1; B > 0; B--) {
                    if ("break" === L(B)) break;
                }
                t.placement !== k && (t.modifiersData[r]._skip = !0, t.placement = k, t.reset = !0);
            }
        },
        requiresIfExists: [ "offset" ],
        data: {
            _skip: !1
        }
    };
    function Mo(e, t, n) {
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
    function Ao(e) {
        return [ Mr, Tr, Ar, Nr ].some((function(t) {
            return e[t] >= 0;
        }));
    }
    var To = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: [ "preventOverflow" ],
        fn: function(e) {
            var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = So(t, {
                elementContext: "reference"
            }), s = So(t, {
                altBoundary: !0
            }), l = Mo(i, r), c = Mo(s, o, a), u = Ao(l), d = Ao(c);
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
    var No = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: [ "popperOffsets" ],
        fn: function(e) {
            var t = e.state, n = e.options, r = e.name, o = n.offset, a = void 0 === o ? [ 0, 0 ] : o, i = Lr.reduce((function(e, n) {
                return e[n] = function(e, t, n) {
                    var r = Zr(e), o = [ Nr, Mr ].indexOf(r) >= 0 ? -1 : 1, a = "function" == typeof n ? n(Object.assign({}, t, {
                        placement: e
                    })) : n, i = a[0], s = a[1];
                    return i = i || 0, s = (s || 0) * o, [ Nr, Tr ].indexOf(r) >= 0 ? {
                        x: s,
                        y: i
                    } : {
                        x: i,
                        y: s
                    };
                }(n, t.rects, a), e;
            }), {}), s = i[t.placement], l = s.x, c = s.y;
            null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, 
            t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = i;
        }
    };
    var Po = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function(e) {
            var t = e.state, n = e.name;
            t.modifiersData[n] = Eo({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement
            });
        },
        data: {}
    };
    var zo = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = void 0 === o || o, i = n.altAxis, s = void 0 !== i && i, l = n.boundary, c = n.rootBoundary, u = n.altBoundary, d = n.padding, p = n.tether, f = void 0 === p || p, h = n.tetherOffset, m = void 0 === h ? 0 : h, v = So(t, {
                boundary: l,
                rootBoundary: c,
                padding: d,
                altBoundary: u
            }), g = Zr(t.placement), b = ko(t.placement), y = !b, w = Qr(g), _ = "x" === w ? "y" : "x", x = t.modifiersData.popperOffsets, O = t.rects.reference, k = t.rects.popper, E = "function" == typeof m ? m(Object.assign({}, t.rects, {
                placement: t.placement
            })) : m, S = {
                x: 0,
                y: 0
            };
            if (x) {
                if (a || s) {
                    var j = "y" === w ? Mr : Nr, C = "y" === w ? Ar : Tr, M = "y" === w ? "height" : "width", A = x[w], T = x[w] + v[j], N = x[w] - v[C], P = f ? -k[M] / 2 : 0, z = "start" === b ? O[M] : k[M], L = "start" === b ? -k[M] : -O[M], B = t.elements.arrow, D = f && B ? Hr(B) : {
                        width: 0,
                        height: 0
                    }, V = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }, F = V[j], I = V[C], R = ro(0, O[M], D[M]), q = y ? O[M] / 2 - P - R - F - E : z - R - F - E, Z = y ? -O[M] / 2 + P + R + I + E : L + R + I + E, U = t.elements.arrow && Jr(t.elements.arrow), H = U ? "y" === w ? U.clientTop || 0 : U.clientLeft || 0 : 0, W = t.modifiersData.offset ? t.modifiersData.offset[t.placement][w] : 0, $ = x[w] + q - W - H, G = x[w] + Z - W;
                    if (a) {
                        var Y = ro(f ? to(T, $) : T, A, f ? eo(N, G) : N);
                        x[w] = Y, S[w] = Y - A;
                    }
                    if (s) {
                        var X = "x" === w ? Mr : Nr, K = "x" === w ? Ar : Tr, J = x[_], Q = J + v[X], ee = J - v[K], te = ro(f ? to(Q, $) : Q, J, f ? eo(ee, G) : ee);
                        x[_] = te, S[_] = te - J;
                    }
                }
                t.modifiersData[r] = S;
            }
        },
        requiresIfExists: [ "offset" ]
    };
    function Lo(e, t, n) {
        void 0 === n && (n = !1);
        var r, o, a = Yr(t), i = Ur(e), s = Ir(t), l = {
            scrollLeft: 0,
            scrollTop: 0
        }, c = {
            x: 0,
            y: 0
        };
        return (s || !s && !n) && (("body" !== Dr(t) || yo(a)) && (l = (r = t) !== Vr(r) && Ir(r) ? {
            scrollLeft: (o = r).scrollLeft,
            scrollTop: o.scrollTop
        } : go(r)), Ir(t) ? ((c = Ur(t)).x += t.clientLeft, c.y += t.clientTop) : a && (c.x = bo(a))), 
        {
            x: i.left + l.scrollLeft - c.x,
            y: i.top + l.scrollTop - c.y,
            width: i.width,
            height: i.height
        };
    }
    function Bo(e) {
        var t = new Map, n = new Set, r = [];
        return e.forEach((function(e) {
            t.set(e.name, e);
        })), e.forEach((function(e) {
            n.has(e.name) || function e(o) {
                n.add(o.name), [].concat(o.requires || [], o.requiresIfExists || []).forEach((function(r) {
                    if (!n.has(r)) {
                        var o = t.get(r);
                        o && e(o);
                    }
                })), r.push(o);
            }(e);
        })), r;
    }
    var Do = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };
    function Vo() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect);
        }));
    }
    function Fo(e) {
        void 0 === e && (e = {});
        var t = e, n = t.defaultModifiers, r = void 0 === n ? [] : n, o = t.defaultOptions, a = void 0 === o ? Do : o;
        return function(e, t, n) {
            void 0 === n && (n = a);
            var o, i, s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, Do, a),
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
                        reference: Fr(e) ? wo(e) : e.contextElement ? wo(e.contextElement) : [],
                        popper: wo(t)
                    };
                    var o, i, c = function(e) {
                        var t = Bo(e);
                        return Br.reduce((function(e, n) {
                            return e.concat(t.filter((function(e) {
                                return e.phase === n;
                            })));
                        }), []);
                    }((o = [].concat(r, s.options.modifiers), i = o.reduce((function(e, t) {
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
                        var t = e.name, n = e.options, r = void 0 === n ? {} : n, o = e.effect;
                        if ("function" == typeof o) {
                            var a = o({
                                state: s,
                                name: t,
                                instance: u,
                                options: r
                            });
                            l.push(a || function() {});
                        }
                    })), u.update();
                },
                forceUpdate: function() {
                    if (!c) {
                        var e = s.elements, t = e.reference, n = e.popper;
                        if (Vo(t, n)) {
                            s.rects = {
                                reference: Lo(t, Jr(n), "fixed" === s.options.strategy),
                                popper: Hr(n)
                            }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                                return s.modifiersData[e.name] = Object.assign({}, e.data);
                            }));
                            for (var r = 0; r < s.orderedModifiers.length; r++) if (!0 !== s.reset) {
                                var o = s.orderedModifiers[r], a = o.fn, i = o.options, l = void 0 === i ? {} : i, d = o.name;
                                "function" == typeof a && (s = a({
                                    state: s,
                                    options: l,
                                    name: d,
                                    instance: u
                                }) || s);
                            } else s.reset = !1, r = -1;
                        }
                    }
                },
                update: (o = function() {
                    return new Promise((function(e) {
                        u.forceUpdate(), e(s);
                    }));
                }, function() {
                    return i || (i = new Promise((function(e) {
                        Promise.resolve().then((function() {
                            i = void 0, e(o());
                        }));
                    }))), i;
                }),
                destroy: function() {
                    d(), c = !0;
                }
            };
            if (!Vo(e, t)) return u;
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
    var Io = Fo(), Ro = Fo({
        defaultModifiers: [ po, Po, co, qr ]
    }), qo = Fo({
        defaultModifiers: [ po, Po, co, qr, No, Co, zo, io, To ]
    }), Zo = Object.freeze({
        __proto__: null,
        popperGenerator: Fo,
        detectOverflow: So,
        createPopperBase: Io,
        createPopper: qo,
        createPopperLite: Ro,
        top: Mr,
        bottom: Ar,
        right: Tr,
        left: Nr,
        auto: "auto",
        basePlacements: Pr,
        start: "start",
        end: "end",
        clippingParents: "clippingParents",
        viewport: "viewport",
        popper: "popper",
        reference: "reference",
        variationPlacements: zr,
        placements: Lr,
        beforeRead: "beforeRead",
        read: "read",
        afterRead: "afterRead",
        beforeMain: "beforeMain",
        main: "main",
        afterMain: "afterMain",
        beforeWrite: "beforeWrite",
        write: "write",
        afterWrite: "afterWrite",
        modifierPhases: Br,
        applyStyles: qr,
        arrow: io,
        computeStyles: co,
        eventListeners: po,
        flip: Co,
        hide: To,
        offset: No,
        popperOffsets: Po,
        preventOverflow: zo
    }), Uo = z((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        let n = {};
        t.getConfig = e => n[e], t.setConfig = e => {
            n = e;
        };
    }));
    P(Uo);
    Uo.getConfig, Uo.setConfig;
    var Ho = z((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const n = e => "fixed" !== getComputedStyle(e).position && null !== e.offsetParent, r = e => {
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
        }, o = e => {
            var t;
            return !!r(e) && (a.IgnoreUtilFocusChanges = !0, null === (t = e.focus) || void 0 === t || t.call(e), 
            a.IgnoreUtilFocusChanges = !1, document.activeElement === e);
        }, a = {
            IgnoreUtilFocusChanges: !1,
            focusFirstDescendant: function(e) {
                for (let t = 0; t < e.childNodes.length; t++) {
                    const n = e.childNodes[t];
                    if (o(n) || this.focusFirstDescendant(n)) return !0;
                }
                return !1;
            },
            focusLastDescendant: function(e) {
                for (let t = e.childNodes.length - 1; t >= 0; t--) {
                    const n = e.childNodes[t];
                    if (o(n) || this.focusLastDescendant(n)) return !0;
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
        }, t.attemptFocus = o, t.default = a, t.isFocusable = r, t.isVisible = n, t.obtainAllFocusableElements = e => Array.from(e.querySelectorAll('a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])')).filter(r).filter(n), 
        t.triggerEvent = function(e, t, ...n) {
            let r;
            r = t.includes("mouse") || t.includes("click") ? "MouseEvents" : t.includes("key") ? "KeyboardEvent" : "HTMLEvents";
            const o = document.createEvent(r);
            return o.initEvent(t, ...n), e.dispatchEvent(o), e;
        };
    }));
    P(Ho);
    Ho.EVENT_CODE, Ho.attemptFocus, Ho.isFocusable, Ho.isVisible, Ho.obtainAllFocusableElements, 
    Ho.triggerEvent;
    var Wo = z((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(re);
        const o = e => {
            e.preventDefault(), e.stopPropagation();
        }, a = () => {
            null == u || u.doOnModalClick();
        };
        let i, s = !1;
        const l = function() {
            if (r.default) return;
            let e = u.modalDom;
            return e ? s = !0 : (s = !1, e = document.createElement("div"), u.modalDom = e, 
            Or.on(e, "touchmove", o), Or.on(e, "click", a)), e;
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
            openModal: function(e, t, n, o, a) {
                if (r.default) return;
                if (!e || void 0 === t) return;
                this.modalFade = a;
                const i = this.modalStack;
                for (let t = 0, n = i.length; t < n; t++) {
                    if (i[t].id === e) return;
                }
                const c = l();
                if (Or.addClass(c, "v-modal"), this.modalFade && !s && Or.addClass(c, "v-modal-enter"), 
                o) {
                    o.trim().split(/\s+/).forEach(e => Or.addClass(c, e));
                }
                setTimeout(() => {
                    Or.removeClass(c, "v-modal-enter");
                }, 200), n && n.parentNode && 11 !== n.parentNode.nodeType ? n.parentNode.appendChild(c) : document.body.appendChild(c), 
                t && (c.style.zIndex = String(t)), c.tabIndex = 0, c.style.display = "", this.modalStack.push({
                    id: e,
                    zIndex: t,
                    modalClass: o
                });
            },
            closeModal: function(e) {
                const t = this.modalStack, n = l();
                if (t.length > 0) {
                    const r = t[t.length - 1];
                    if (r.id === e) {
                        if (r.modalClass) {
                            r.modalClass.trim().split(/\s+/).forEach(e => Or.removeClass(n, e));
                        }
                        t.pop(), t.length > 0 && (n.style.zIndex = t[t.length - 1].zIndex);
                    } else for (let n = t.length - 1; n >= 0; n--) if (t[n].id === e) {
                        t.splice(n, 1);
                        break;
                    }
                }
                0 === t.length && (this.modalFade && Or.addClass(n, "v-modal-leave"), setTimeout(() => {
                    0 === t.length && (n.parentNode && n.parentNode.removeChild(n), n.style.display = "none", 
                    u.modalDom = void 0), Or.removeClass(n, "v-modal-leave");
                }, 200));
            }
        };
        Object.defineProperty(u, "zIndex", {
            configurable: !0,
            get: () => (void 0 === i && (i = Uo.getConfig("zIndex") || 2e3), i),
            set(e) {
                i = e;
            }
        });
        r.default || Or.on(window, "keydown", (function(e) {
            if (e.code === Ho.EVENT_CODE.esc) {
                const e = function() {
                    if (!r.default && u.modalStack.length > 0) {
                        const e = u.modalStack[u.modalStack.length - 1];
                        if (!e) return;
                        return u.getInstance(e.id);
                    }
                }();
                e && e.closeOnPressEscape.value && (e.handleClose ? e.handleClose() : e.handleAction ? e.handleAction("cancel") : e.close());
            }
        })), t.default = u;
    }));
    P(Wo);
    var $o = z((function(e, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r;
        (r = n.PatchFlags || (n.PatchFlags = {}))[r.TEXT = 1] = "TEXT", r[r.CLASS = 2] = "CLASS", 
        r[r.STYLE = 4] = "STYLE", r[r.PROPS = 8] = "PROPS", r[r.FULL_PROPS = 16] = "FULL_PROPS", 
        r[r.HYDRATE_EVENTS = 32] = "HYDRATE_EVENTS", r[r.STABLE_FRAGMENT = 64] = "STABLE_FRAGMENT", 
        r[r.KEYED_FRAGMENT = 128] = "KEYED_FRAGMENT", r[r.UNKEYED_FRAGMENT = 256] = "UNKEYED_FRAGMENT", 
        r[r.NEED_PATCH = 512] = "NEED_PATCH", r[r.DYNAMIC_SLOTS = 1024] = "DYNAMIC_SLOTS", 
        r[r.HOISTED = -1] = "HOISTED", r[r.BAIL = -2] = "BAIL";
        const o = e => e.type === t.Fragment, a = e => e.type === t.Comment, i = e => "template" === e.type;
        function s(e, t) {
            if (!a(e)) return o(e) || i(e) ? t > 0 ? l(e.children, t - 1) : void 0 : e;
        }
        const l = (e, t = 3) => Array.isArray(e) ? s(e[0], t) : s(e, t);
        function c(e, n, r, o, a) {
            return t.openBlock(), t.createBlock(e, n, r, o, a);
        }
        n.SCOPE = "VNode", n.getFirstValidNode = l, n.getNormalizedProps = e => {
            var n;
            if (!t.isVNode(e)) return void _r.warn("VNode", "value must be a VNode");
            const r = e.props || {}, o = (null === (n = e.type) || void 0 === n ? void 0 : n.props) || {}, a = {};
            return Object.keys(o).forEach(e => {
                Ge.hasOwn(o[e], "default") && (a[e] = o[e].default);
            }), Object.keys(r).forEach(e => {
                a[t.camelize(e)] = r[e];
            }), a;
        }, n.isComment = a, n.isFragment = o, n.isTemplate = i, n.isText = e => e.type === t.Text, 
        n.isValidElementNode = e => !(o(e) || a(e)), n.renderBlock = c, n.renderIf = function(e, n, r, o, a, i) {
            return e ? c(n, r, o, a, i) : t.createCommentVNode("v-if", !0);
        };
    }));
    P($o);
    $o.PatchFlags, $o.SCOPE, $o.getFirstValidNode, $o.getNormalizedProps, $o.isComment, 
    $o.isFragment, $o.isTemplate, $o.isText, $o.isValidElementNode, $o.renderBlock, 
    $o.renderIf;
    var Go, Yo, Xo, Ko, Jo, Qo, ea, ta, na, ra, oa, aa, ia, sa, la, ca = !1;
    function ua() {
        if (!ca) {
            ca = !0;
            var e = navigator.userAgent, t = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e), n = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
            if (aa = /\b(iPhone|iP[ao]d)/.exec(e), ia = /\b(iP[ao]d)/.exec(e), ra = /Android/i.exec(e), 
            sa = /FBAN\/\w+;/i.exec(e), la = /Mobile/i.exec(e), oa = !!/Win64/.exec(e), t) {
                (Go = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN) && document && document.documentMode && (Go = document.documentMode);
                var r = /(?:Trident\/(\d+.\d+))/.exec(e);
                Qo = r ? parseFloat(r[1]) + 4 : Go, Yo = t[2] ? parseFloat(t[2]) : NaN, Xo = t[3] ? parseFloat(t[3]) : NaN, 
                (Ko = t[4] ? parseFloat(t[4]) : NaN) ? (t = /(?:Chrome\/(\d+\.\d+))/.exec(e), Jo = t && t[1] ? parseFloat(t[1]) : NaN) : Jo = NaN;
            } else Go = Yo = Xo = Jo = Ko = NaN;
            if (n) {
                if (n[1]) {
                    var o = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
                    ea = !o || parseFloat(o[1].replace("_", "."));
                } else ea = !1;
                ta = !!n[2], na = !!n[3];
            } else ea = ta = na = !1;
        }
    }
    var da, pa = {
        ie: function() {
            return ua() || Go;
        },
        ieCompatibilityMode: function() {
            return ua() || Qo > Go;
        },
        ie64: function() {
            return pa.ie() && oa;
        },
        firefox: function() {
            return ua() || Yo;
        },
        opera: function() {
            return ua() || Xo;
        },
        webkit: function() {
            return ua() || Ko;
        },
        safari: function() {
            return pa.webkit();
        },
        chrome: function() {
            return ua() || Jo;
        },
        windows: function() {
            return ua() || ta;
        },
        osx: function() {
            return ua() || ea;
        },
        linux: function() {
            return ua() || na;
        },
        iphone: function() {
            return ua() || aa;
        },
        mobile: function() {
            return ua() || aa || ia || ra || la;
        },
        nativeApp: function() {
            return ua() || sa;
        },
        android: function() {
            return ua() || ra;
        },
        ipad: function() {
            return ua() || ia;
        }
    }, fa = pa, ha = !("undefined" == typeof window || !window.document || !window.document.createElement), ma = {
        canUseDOM: ha,
        canUseWorkers: "undefined" != typeof Worker,
        canUseEventListeners: ha && !(!window.addEventListener && !window.attachEvent),
        canUseViewport: ha && !!window.screen,
        isInWorker: !ha
    };
    ma.canUseDOM && (da = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""))
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
    var va = function(e, t) {
        if (!ma.canUseDOM || t && !("addEventListener" in document)) return !1;
        var n = "on" + e, r = n in document;
        if (!r) {
            var o = document.createElement("div");
            o.setAttribute(n, "return;"), r = "function" == typeof o[n];
        }
        return !r && da && "wheel" === e && (r = document.implementation.hasFeature("Events.wheel", "3.0")), 
        r;
    };
    function ga(e) {
        var t = 0, n = 0, r = 0, o = 0;
        return "detail" in e && (n = e.detail), "wheelDelta" in e && (n = -e.wheelDelta / 120), 
        "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), 
        "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = n, n = 0), r = 10 * t, o = 10 * n, 
        "deltaY" in e && (o = e.deltaY), "deltaX" in e && (r = e.deltaX), (r || o) && e.deltaMode && (1 == e.deltaMode ? (r *= 40, 
        o *= 40) : (r *= 800, o *= 800)), r && !t && (t = r < 1 ? -1 : 1), o && !n && (n = o < 1 ? -1 : 1), 
        {
            spinX: t,
            spinY: n,
            pixelX: r,
            pixelY: o
        };
    }
    ga.getEventType = function() {
        return fa.firefox() ? "DOMMouseScroll" : va("wheel") ? "wheel" : "mousewheel";
    };
    var ba = ga, ya = z((function(e, n) {
        function r(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = r(re), a = r(ba);
        const i = new Map;
        let s;
        function l(e, t) {
            let n = [];
            return Array.isArray(t.arg) ? n = t.arg : t.arg instanceof HTMLElement && n.push(t.arg), 
            function(r, o) {
                const a = t.instance.popperRef, i = r.target, s = null == o ? void 0 : o.target, l = !t || !t.instance, c = !i || !s, u = e.contains(i) || e.contains(s), d = e === i, p = n.length && n.some(e => null == e ? void 0 : e.contains(i)) || n.length && n.includes(s), f = a && (a.contains(i) || a.contains(s));
                l || c || u || d || p || f || t.value(r, o);
            };
        }
        o.default || (Or.on(document, "mousedown", e => s = e), Or.on(document, "mouseup", e => {
            for (const t of i.values()) for (const {documentHandler: n} of t) n(e, s);
        }));
        const c = {
            beforeMount(e, t) {
                i.has(e) || i.set(e, []), i.get(e).push({
                    documentHandler: l(e, t),
                    bindingFn: t.value
                });
            },
            updated(e, t) {
                i.has(e) || i.set(e, []);
                const n = i.get(e), r = n.findIndex(e => e.bindingFn === t.oldValue), o = {
                    documentHandler: l(e, t),
                    bindingFn: t.value
                };
                r >= 0 ? n.splice(r, 1, o) : n.push(o);
            },
            unmounted(e) {
                i.delete(e);
            }
        };
        var u = {
            beforeMount(e, t) {
                let n, r = null;
                const o = () => t.value && t.value(), a = () => {
                    Date.now() - n < 100 && o(), clearInterval(r), r = null;
                };
                Or.on(e, "mousedown", e => {
                    0 === e.button && (n = Date.now(), Or.once(document, "mouseup", a), clearInterval(r), 
                    r = setInterval(o, 100));
                });
            }
        };
        const d = [], p = e => {
            if (0 === d.length) return;
            const t = d[d.length - 1]["_trap-focus-children"];
            if (t.length > 0 && e.code === Ho.EVENT_CODE.tab) {
                if (1 === t.length) return e.preventDefault(), void (document.activeElement !== t[0] && t[0].focus());
                const n = e.shiftKey, r = e.target === t[0], o = e.target === t[t.length - 1];
                r && n && (e.preventDefault(), t[t.length - 1].focus()), o && !n && (e.preventDefault(), 
                t[0].focus());
            }
        }, f = {
            beforeMount(e) {
                e["_trap-focus-children"] = Ho.obtainAllFocusableElements(e), d.push(e), d.length <= 1 && Or.on(document, "keydown", p);
            },
            updated(e) {
                t.nextTick(() => {
                    e["_trap-focus-children"] = Ho.obtainAllFocusableElements(e);
                });
            },
            unmounted() {
                d.shift(), 0 === d.length && Or.off(document, "keydown", p);
            }
        }, h = "undefined" != typeof navigator && navigator.userAgent.toLowerCase().indexOf("firefox") > -1, m = {
            beforeMount(e, t) {
                !function(e, t) {
                    if (e && e.addEventListener) {
                        const n = function(e) {
                            const n = a.default(e);
                            t && t.apply(this, [ e, n ]);
                        };
                        h ? e.addEventListener("DOMMouseScroll", n) : e.onmousewheel = n;
                    }
                }(e, t.value);
            }
        }, v = {
            beforeMount(e, t) {
                e._handleResize = () => {
                    var n;
                    e && (null == (n = t.value) || n.call(t));
                }, oe.addResizeListener(e, e._handleResize);
            },
            beforeUnmount(e) {
                oe.removeResizeListener(e, e._handleResize);
            }
        };
        n.ClickOutside = c, n.Mousewheel = m, n.RepeatClick = u, n.Resize = v, n.TrapFocus = f;
    }));
    P(ya);
    ya.ClickOutside, ya.Mousewheel, ya.RepeatClick, ya.Resize, ya.TrapFocus;
    var wa = z((function(e, n) {
        function r(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = r(_r), a = r(Wo);
        function i(e, t = []) {
            const {arrow: n, arrowOffset: r, offset: o, gpuAcceleration: a, fallbackPlacements: i} = e, s = [ {
                name: "offset",
                options: {
                    offset: [ 0, null != o ? o : 12 ]
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
                    padding: null != r ? r : 5
                }
            }), s.push(...t), s;
        }
        var s, l = Object.defineProperty, c = Object.defineProperties, u = Object.getOwnPropertyDescriptors, d = Object.getOwnPropertySymbols, p = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable, h = (e, t, n) => t in e ? l(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        function m(e, n) {
            return t.computed(() => {
                var t;
                return ((e, t) => c(e, u(t)))(((e, t) => {
                    for (var n in t || (t = {})) p.call(t, n) && h(e, n, t[n]);
                    if (d) for (var n of d(t)) f.call(t, n) && h(e, n, t[n]);
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
            const r = t.ref(null), o = t.ref(null), i = t.ref(null), s = "el-popper-" + xr.generateId();
            let l = null, c = null, u = null, d = !1;
            const p = () => e.manualMode || "manual" === e.trigger, f = t.ref({
                zIndex: a.default.nextZIndex()
            }), h = m(e, {
                arrow: r
            }), v = t.reactive({
                visible: !!e.visible
            }), g = t.computed({
                get: () => !e.disabled && (xr.isBool(e.visible) ? e.visible : v.visible),
                set(t) {
                    p() || (xr.isBool(e.visible) ? n("update:visible", t) : v.visible = t);
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
            const _ = () => {
                p() || e.disabled || (w(), 0 === e.showAfter ? b() : c = window.setTimeout(() => {
                    b();
                }, e.showAfter));
            }, x = () => {
                p() || (w(), e.hideAfter > 0 ? u = window.setTimeout(() => {
                    O();
                }, e.hideAfter) : O());
            }, O = () => {
                y(), e.disabled && E(!0);
            };
            function k() {
                if (!xr.$(g)) return;
                const e = xr.$(o), t = xr.isHTMLElement(e) ? e : e.$el;
                l = Zo.createPopper(t, xr.$(i), xr.$(h)), l.update();
            }
            function E(e) {
                !l || xr.$(g) && !e || S();
            }
            function S() {
                var e;
                null == (e = null == l ? void 0 : l.destroy) || e.call(l), l = null;
            }
            const j = {};
            if (!p()) {
                const t = () => {
                    xr.$(g) ? x() : _();
                }, n = e => {
                    switch (e.stopPropagation(), e.type) {
                      case "click":
                        d ? d = !1 : t();
                        break;

                      case "mouseenter":
                        _();
                        break;

                      case "mouseleave":
                        x();
                        break;

                      case "focus":
                        d = !0, _();
                        break;

                      case "blur":
                        d = !1, x();
                    }
                }, r = {
                    click: [ "onClick" ],
                    hover: [ "onMouseenter", "onMouseleave" ],
                    focus: [ "onFocus", "onBlur" ]
                }, o = e => {
                    r[e].forEach(e => {
                        j[e] = n;
                    });
                };
                xr.isArray(e.trigger) ? Object.values(e.trigger).forEach(o) : o(e.trigger);
            }
            return t.watch(h, e => {
                l && (l.setOptions(e), l.update());
            }), t.watch(g, (function(e) {
                e && (f.value.zIndex = a.default.nextZIndex(), k());
            })), {
                update: function() {
                    xr.$(g) && (l ? l.update() : k());
                },
                doDestroy: E,
                show: _,
                hide: x,
                onPopperMouseEnter: function() {
                    e.enterable && "click" !== e.trigger && clearTimeout(u);
                },
                onPopperMouseLeave: function() {
                    const {trigger: t} = e;
                    xr.isString(t) && ("click" === t || "focus" === t) || 1 === t.length && ("click" === t[0] || "focus" === t[0]) || x();
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
                initializePopper: k,
                isManualMode: p,
                arrowRef: r,
                events: j,
                popperId: s,
                popperInstance: l,
                popperRef: i,
                popperStyle: f,
                triggerRef: o,
                visibility: g
            };
        }
        const b = () => {};
        function y(e, n) {
            const {effect: r, name: o, stopPopperMouseEvent: a, popperClass: i, popperStyle: s, popperRef: l, pure: c, popperId: u, visibility: d, onMouseenter: p, onMouseleave: f, onAfterEnter: h, onAfterLeave: m, onBeforeEnter: v, onBeforeLeave: g} = e, y = [ i, "el-popper", "is-" + r, c ? "is-pure" : "" ], w = a ? Or.stop : b;
            return t.h(t.Transition, {
                name: o,
                onAfterEnter: h,
                onAfterLeave: m,
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
                    onClick: Or.stop,
                    onMousedown: w,
                    onMouseup: w
                }, n), [ [ t.vShow, d ] ]) ])
            });
        }
        function w(e, n) {
            const r = $o.getFirstValidNode(e, 1);
            return r || o.default("renderTrigger", "trigger expects single rooted node"), t.cloneVNode(r, n, !0);
        }
        function _(e) {
            return e ? t.h("div", {
                ref: "arrowRef",
                class: "el-popper__arrow",
                "data-popper-arrow": ""
            }, null) : t.h(t.Comment, null, "");
        }
        var x = Object.defineProperty, O = Object.getOwnPropertySymbols, k = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable, S = (e, t, n) => t in e ? x(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        var j = t.defineComponent({
            name: "ElPopper",
            props: v,
            emits: [ "update:visible", "after-enter", "after-leave", "before-enter", "before-leave" ],
            setup(e, n) {
                n.slots.trigger || o.default("ElPopper", "Trigger must be provided");
                const r = g(e, n), a = () => r.doDestroy(!0);
                return t.onMounted(r.initializePopper), t.onBeforeUnmount(a), t.onActivated(r.initializePopper), 
                t.onDeactivated(a), r;
            },
            render() {
                var e;
                const {$slots: n, appendToBody: r, class: o, style: a, effect: i, hide: s, onPopperMouseEnter: l, onPopperMouseLeave: c, onAfterEnter: u, onAfterLeave: d, onBeforeEnter: p, onBeforeLeave: f, popperClass: h, popperId: m, popperStyle: v, pure: g, showArrow: b, transition: x, visibility: j, stopPopperMouseEvent: C} = this, M = this.isManualMode(), A = _(b), T = y({
                    effect: i,
                    name: x,
                    popperClass: h,
                    popperId: m,
                    popperStyle: v,
                    pure: g,
                    stopPopperMouseEvent: C,
                    onMouseenter: l,
                    onMouseleave: c,
                    onAfterEnter: u,
                    onAfterLeave: d,
                    onBeforeEnter: p,
                    onBeforeLeave: f,
                    visibility: j
                }, [ t.renderSlot(n, "default", {}, () => [ t.toDisplayString(this.content) ]), A ]), N = null == (e = n.trigger) ? void 0 : e.call(n), P = ((e, t) => {
                    for (var n in t || (t = {})) k.call(t, n) && S(e, n, t[n]);
                    if (O) for (var n of O(t)) E.call(t, n) && S(e, n, t[n]);
                    return e;
                })({
                    "aria-describedby": m,
                    class: o,
                    style: a,
                    ref: "triggerRef"
                }, this.events), z = M ? w(N, P) : t.withDirectives(w(N, P), [ [ ya.ClickOutside, s ] ]);
                return t.h(t.Fragment, null, [ z, t.h(t.Teleport, {
                    to: "body",
                    disabled: !r
                }, [ T ]) ]);
            }
        });
        j.__file = "packages/popper/src/index.vue", j.install = e => {
            e.component(j.name, j);
        };
        const C = j;
        n.default = C, n.defaultProps = v, n.renderArrow = _, n.renderPopper = y, n.renderTrigger = w, 
        n.usePopper = g;
    }));
    P(wa);
    wa.Effect, wa.defaultProps, wa.renderArrow, wa.renderPopper, wa.renderTrigger, wa.usePopper;
    var _a = P(z((function(e, n) {
        function r(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = r(wa), a = r(Wo), i = Object.defineProperty, s = Object.defineProperties, l = Object.getOwnPropertyDescriptors, c = Object.getOwnPropertySymbols, u = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable, p = (e, t, n) => t in e ? i(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        function f(e, n) {
            const r = t.ref(a.default.nextZIndex()), o = t.computed(() => xr.isString(e.width) ? e.width : e.width + "px"), i = t.computed(() => ({
                width: o.value,
                zIndex: r.value
            })), f = wa.usePopper(e, n);
            return t.watch(f.visibility, e => {
                e && (r.value = a.default.nextZIndex()), n.emit(e ? "show" : "hide");
            }), ((e, t) => s(e, l(t)))(((e, t) => {
                for (var n in t || (t = {})) u.call(t, n) && p(e, n, t[n]);
                if (c) for (var n of c(t)) d.call(t, n) && p(e, n, t[n]);
                return e;
            })({}, f), {
                popperStyle: i
            });
        }
        var h = Object.defineProperty, m = Object.defineProperties, v = Object.getOwnPropertyDescriptors, g = Object.getOwnPropertySymbols, b = Object.prototype.hasOwnProperty, y = Object.prototype.propertyIsEnumerable, w = (e, t, n) => t in e ? h(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n, _ = (e, t) => {
            for (var n in t || (t = {})) b.call(t, n) && w(e, n, t[n]);
            if (g) for (var n of g(t)) y.call(t, n) && w(e, n, t[n]);
            return e;
        };
        const x = [ "update:visible", "after-enter", "after-leave", "show", "hide" ], O = {
            key: 0,
            class: "el-popover__title",
            role: "title"
        };
        var k, E, S = t.defineComponent({
            name: "ElPopover",
            components: {
                ElPopper: o.default
            },
            props: (k = _({}, wa.defaultProps), E = {
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
            }, m(k, v(E))),
            emits: x,
            setup: (e, t) => f(e, t),
            render() {
                const {$slots: e} = this, n = e.reference ? e.reference() : null, r = $o.renderIf(this.title, "div", O, t.toDisplayString(this.title), $o.PatchFlags.TEXT), o = t.renderSlot(e, "default", {}, () => [ t.createTextVNode(t.toDisplayString(this.content), $o.PatchFlags.TEXT) ]), {events: a, onAfterEnter: i, onAfterLeave: s, onPopperMouseEnter: l, onPopperMouseLeave: c, popperStyle: u, popperId: d, popperClass: p, showArrow: f, transition: h, visibility: m, tabindex: v} = this, g = [ this.content ? "el-popover--plain" : "", "el-popover", p ].join(" ");
                let b = wa.renderPopper({
                    effect: wa.Effect.LIGHT,
                    name: h,
                    popperClass: g,
                    popperStyle: u,
                    popperId: d,
                    visibility: m,
                    onMouseenter: l,
                    onMouseleave: c,
                    onAfterEnter: i,
                    onAfterLeave: s,
                    stopPopperMouseEvent: !1
                }, [ r, o, wa.renderArrow(f) ]);
                const y = n ? wa.renderTrigger(n, _({
                    ariaDescribedby: d,
                    ref: "triggerRef",
                    tabindex: v
                }, a)) : t.createCommentVNode("v-if", !0);
                return t.h(t.Fragment, null, [ "click" === this.trigger ? t.withDirectives(y, [ [ ya.ClickOutside, this.hide ] ]) : y, t.h(t.Teleport, {
                    disabled: !this.appendToBody,
                    to: "body"
                }, [ b ]) ]);
            }
        });
        S.__file = "packages/popover/src/index.vue";
        const j = (e, t, n) => {
            const r = t.arg || t.value, o = n.dirs[0].instance.$refs[r];
            o && (o.triggerRef = e, e.setAttribute("tabindex", o.tabindex), Object.entries(o.events).forEach(([t, n]) => {
                Or.on(e, t.toLowerCase().slice(2), n);
            }));
        };
        var C = {
            mounted(e, t, n) {
                j(e, t, n);
            },
            updated(e, t, n) {
                j(e, t, n);
            }
        };
        S.install = e => {
            e.component(S.name, S), e.directive("popover", C);
        }, S.directive = C;
        const M = S;
        n.default = M;
    }))), xa = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    xa.render = function(t, n, r, o, a, i) {
        return e.openBlock(), e.createBlock("i", {
            class: [ "as-menu-item-icon", "icon-" + r.name ]
        }, null, 2);
    }, xa.__file = "src/components/icon.vue";
    var Oa = {
        name: "menuItem",
        components: {
            popover: _a,
            icon: xa
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
            const n = e.ref(/Android|webOS|iPhone|iPod|BlackBerry|iphone os|ipad/.test(navigator.userAgent.toLowerCase())), r = h(), o = e.computed(() => "horizontal" === t.mode ? "horizontal" : "vertical"), a = e.computed(() => "horizontal" === t.mode ? "bottom-start" : "right-start");
            const i = () => {
                let e = function() {
                    const e = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                    return e ? "INPUT" === e.nodeName || "textarea" === e.localName ? e.value : e.textContent : "";
                }();
                return r && r.keyword && (e = r.keyword()), encodeURIComponent(e);
            };
            return {
                placement: a,
                classList: o,
                getFavicon: function(e) {
                    if (e.icon) return e.icon;
                    const t = Sr(e.url);
                    return t.host.split("."), t.origin + "/favicon.ico";
                },
                handleMenuShow: (e, t) => {
                    t.show = e;
                },
                handleClick: (t, n, r) => {
                    if (e.unref(r)) return;
                    const o = i();
                    n ? window.open(t.url.replace("%s", o)) : window.location.href = t.url.replace("%s", o);
                },
                isMobileRef: n
            };
        }
    };
    const ka = {
        class: "as-subMenu"
    }, Ea = {
        class: "as-url-icon"
    };
    Oa.render = function(t, n, r, o, a, i) {
        const s = e.resolveComponent("icon"), l = e.resolveComponent("popover");
        return e.openBlock(), e.createBlock(l, {
            placement: o.placement,
            trigger: o.isMobileRef ? "click" : "hover",
            "popper-class": "as-subMenu-container"
        }, {
            reference: e.withCtx(() => [ e.createVNode("div", {
                class: [ "as-menu-item", o.classList ]
            }, [ e.createVNode(s, {
                name: r.item.name
            }, null, 8, [ "name" ]), e.createVNode("span", {
                class: "as-menu-item-title",
                textContent: e.toDisplayString(r.item.nameZh),
                onClick: n[1] || (n[1] = e => o.handleClick(r.item.list[0], !1, o.isMobileRef)),
                onMouseup: n[2] || (n[2] = e.withModifiers(e => o.handleClick(r.item.list[0], !0), [ "middle" ]))
            }, null, 40, [ "textContent" ]) ], 2) ]),
            default: e.withCtx(() => [ e.createVNode("ul", ka, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(r.item.list, (t, n) => e.withDirectives((e.openBlock(), 
            e.createBlock("li", {
                key: `${r.item.name}_${n}`,
                onClick: e => o.handleClick(t),
                onMouseup: e.withModifiers(e => o.handleClick(t, !0), [ "middle" ])
            }, [ e.createVNode("div", Ea, [ e.createVNode("img", {
                src: o.getFavicon(t),
                onerror: "this.classList.add('error')"
            }, null, 8, [ "src" ]) ]), e.createVNode("p", {
                class: "as-subMenu-text",
                textContent: e.toDisplayString(t.nameZh)
            }, null, 8, [ "textContent" ]) ], 40, [ "onClick", "onMouseup" ])), [ [ e.vShow, t.data.visible ] ])), 128)) ]) ]),
            _: 1
        }, 8, [ "placement", "trigger" ]);
    }, Oa.__file = "src/components/menuItem.vue";
    const Sa = i("align"), ja = new Map([ [ "flex-start", "开始" ], [ "center", "居中" ], [ "flex-end", "末尾" ] ]), Ca = e => ja.has(e) ? e : "flex-start", Ma = e.ref(Ca(Sa)), Aa = e.reactive(ja);
    function Ta() {
        return {
            alignList: Aa,
            align: Ma
        };
    }
    e.watch(Ma, e => {
        s("align", Ca(e));
    });
    var Na = {
        name: "as-menu",
        components: {
            scrollbar: kr,
            menuItem: Oa,
            icon: xa
        },
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].indexOf(e) > -1
            }
        },
        setup(t) {
            const n = e.reactive(Cr("tm")), {align: r} = Ta();
            return {
                sites: n,
                data: e.reactive({
                    showTimeout: 50,
                    hideTimeout: 200
                }),
                align: r,
                transition: e.computed(() => "horizontal" === t.mode ? "drop" : "fade"),
                menuClass: e.computed(() => ({
                    "as-horizontal-menu": "horizontal" === t.mode,
                    "as-vertical-menu": "vertical" === t.mode
                }))
            };
        }
    };
    Na.render = function(t, n, r, o, a, i) {
        const s = e.resolveComponent("menu-item"), l = e.resolveComponent("scrollbar");
        return e.openBlock(), e.createBlock(l, {
            class: "as-menu-container"
        }, {
            default: e.withCtx(() => [ e.createVNode("ul", {
                class: [ "as-menu", o.menuClass ],
                style: {
                    justifyContent: o.align
                }
            }, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(o.sites, t => (e.openBlock(), 
            e.createBlock(s, {
                key: t.name,
                item: t,
                mode: r.mode
            }, null, 8, [ "item", "mode" ]))), 128)) ], 6) ]),
            _: 1
        });
    }, Na.__file = "src/components/menu.vue";
    const Pa = e.ref(""), za = e.ref(""), La = e.ref("");
    e.watch(Pa, e => {
        Ba("primary-color", e), s("primary-color", e);
    }), e.watch(za, e => {
        Ba("bg-color", e), s("bg-color", e);
    }), e.watch(La, e => {
        Ba("primary-text-color", e), s("primary-text-color", e);
    });
    const Ba = (e, t) => {
        document.getElementById("all-search").style.setProperty("--as-" + e, t), document.body.style.setProperty("--as-" + e, t);
    }, Da = {
        "primary-color": Pa,
        "bg-color": za,
        "primary-text-color": La
    }, Va = e => {
        const t = (e => {
            const t = document.getElementById("all-search");
            return getComputedStyle(t).getPropertyValue("--as-" + e).trim();
        })(e), n = i(e) || t;
        Da[e].value = n;
    };
    function Fa() {
        return e.onMounted(() => {
            Va("primary-color"), Va("bg-color"), Va("primary-text-color");
        }), {
            primaryColor: Pa,
            bgColor: za,
            primaryTextColor: La
        };
    }
    var Ia = {
        name: "overlay",
        setup(e, {emit: t}) {
            let n = !1, r = !1;
            return {
                onMouseDown: e => {
                    n = e.target === e.currentTarget;
                },
                onMouseUp: e => {
                    r = e.target === e.currentTarget;
                },
                onMaskClick: e => {
                    n && r && t("click", e), n = r = !1;
                }
            };
        }
    };
    Ia.render = function(t, n, r, o, a, i) {
        return e.openBlock(), e.createBlock("div", {
            class: "as-overlay",
            onMousedown: n[1] || (n[1] = (...e) => o.onMouseDown && o.onMouseDown(...e)),
            onMouseup: n[2] || (n[2] = (...e) => o.onMouseUp && o.onMouseUp(...e)),
            onClick: n[3] || (n[3] = (...e) => o.onMaskClick && o.onMaskClick(...e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, Ia.__file = "src/components/overlay.vue";
    var Ra = {
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
    const qa = {
        class: "as-radio as-radio-animate"
    }, Za = e.createVNode("i", {
        class: "as-radio-icon"
    }, null, -1), Ua = {
        class: "as-radio-label"
    };
    Ra.render = function(t, n, r, o, a, i) {
        return e.openBlock(), e.createBlock("label", qa, [ e.withDirectives(e.createVNode("input", {
            type: "radio",
            value: r.label,
            "onUpdate:modelValue": n[1] || (n[1] = e => o.model = e)
        }, null, 8, [ "value" ]), [ [ e.vModelRadio, o.model ] ]), Za, e.createVNode("span", Ua, [ e.renderSlot(t.$slots, "default") ]) ]);
    }, Ra.__file = "src/components/radio.vue";
    var Ha = {
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
    Ha.render = function(t, n, r, o, a, i) {
        return e.openBlock(), e.createBlock("div", null, [ e.createVNode("label", {
            class: "as-label",
            style: o.labelStyle,
            textContent: e.toDisplayString(r.label)
        }, null, 12, [ "textContent" ]), e.createVNode("div", {
            class: "as-content",
            style: o.contentStyle
        }, [ e.renderSlot(t.$slots, "default") ], 4) ]);
    }, Ha.__file = "src/components/form-item.vue";
    var Wa = {
        name: "xButton",
        props: {
            type: {
                type: String,
                default: "primary"
            }
        }
    };
    Wa.render = function(t, n, r, o, a, i) {
        return e.openBlock(), e.createBlock("button", {
            class: [ "as-button", "as-button__" + r.type ]
        }, [ e.renderSlot(t.$slots, "default") ], 2);
    }, Wa.__file = "src/components/button.vue";
    var $a = {
        name: "color",
        components: {
            asButton: Wa
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
            const r = e.computed({
                get: () => t.modelValue,
                set(e) {
                    n.emit("update:modelValue", e);
                }
            });
            return {
                model: r,
                reset: () => {
                    r.value = t.defaultValue;
                }
            };
        }
    };
    const Ga = e.withScopeId("data-v-2532dbfa");
    e.pushScopeId("data-v-2532dbfa");
    const Ya = {
        class: "color-set"
    }, Xa = {
        class: "label"
    }, Ka = e.createTextVNode(" 重置 ");
    e.popScopeId();
    const Ja = Ga((t, n, r, o, a, i) => {
        const s = e.resolveComponent("asButton");
        return e.openBlock(), e.createBlock("div", Ya, [ e.createVNode("label", Xa, [ e.withDirectives(e.createVNode("input", {
            class: "input—color",
            type: "color",
            "onUpdate:modelValue": n[1] || (n[1] = e => o.model = e)
        }, null, 512), [ [ e.vModelText, o.model ] ]) ]), e.createVNode(s, {
            class: "reset-btn",
            type: "text",
            onClick: o.reset
        }, {
            default: Ga(() => [ Ka ]),
            _: 1
        }, 8, [ "onClick" ]) ]);
    });
    $a.render = Ja, $a.__scopeId = "data-v-2532dbfa", $a.__file = "src/components/color.vue";
    var Qa = {
        name: "side-bar",
        components: {
            overlay: Ia,
            asRadio: Ra,
            formItem: Ha,
            color: $a
        },
        setup() {
            const t = e.ref(!1), {mode: n} = M(), {alignList: r, align: o} = Ta(), {primaryColor: a, bgColor: i, primaryTextColor: s} = Fa();
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
                alignList: r,
                align: o,
                changeAlign: e => {
                    o.value = e.target.value;
                },
                primaryColor: a,
                bgColor: i,
                primaryTextColor: s
            };
        }
    };
    const ei = e.createVNode("header", {
        class: "header"
    }, " 设置 ", -1), ti = e.createTextVNode("横向 "), ni = e.createTextVNode("竖向 "), ri = e.createVNode("footer", null, [ e.createVNode("a", {
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
    Qa.render = function(t, n, r, o, a, i) {
        const s = e.resolveComponent("as-radio"), l = e.resolveComponent("form-item"), c = e.resolveComponent("color"), u = e.resolveComponent("overlay");
        return e.openBlock(), e.createBlock(e.Fragment, null, [ e.createVNode("div", {
            class: "as-setting",
            onClick: n[1] || (n[1] = (...e) => o.open && o.open(...e))
        }, " 设置 "), (e.openBlock(), e.createBlock(e.Teleport, {
            to: "#all-search"
        }, [ e.createVNode(e.Transition, {
            name: "overlay",
            appear: ""
        }, {
            default: e.withCtx(() => [ e.withDirectives(e.createVNode(u, {
                onClick: o.onMaskClick
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
                    }, [ ei, e.createVNode("section", null, [ e.createVNode(l, {
                        label: "方向"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(s, {
                            label: "horizontal",
                            modelValue: o.mode,
                            "onUpdate:modelValue": n[2] || (n[2] = e => o.mode = e),
                            onChange: o.changeMode
                        }, {
                            default: e.withCtx(() => [ ti ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]), e.createVNode(s, {
                            label: "vertical",
                            modelValue: o.mode,
                            "onUpdate:modelValue": n[3] || (n[3] = e => o.mode = e),
                            onChange: o.changeMode
                        }, {
                            default: e.withCtx(() => [ ni ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]) ]),
                        _: 1
                    }), e.createVNode(l, {
                        label: "对齐"
                    }, {
                        default: e.withCtx(() => [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(o.alignList, ([t, r]) => (e.openBlock(), 
                        e.createBlock(s, {
                            key: t,
                            label: t,
                            modelValue: o.align,
                            "onUpdate:modelValue": n[4] || (n[4] = e => o.align = e),
                            onChange: o.changeAlign
                        }, {
                            default: e.withCtx(() => [ e.createTextVNode(e.toDisplayString(r), 1) ]),
                            _: 2
                        }, 1032, [ "label", "modelValue", "onChange" ]))), 128)) ]),
                        _: 1
                    }), e.createVNode(l, {
                        label: "主题色"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(c, {
                            "default-value": "#1890ff",
                            modelValue: o.primaryColor,
                            "onUpdate:modelValue": n[5] || (n[5] = e => o.primaryColor = e)
                        }, null, 8, [ "modelValue" ]) ]),
                        _: 1
                    }), e.createVNode(l, {
                        label: "背景色"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(c, {
                            "default-value": "#ffffff",
                            modelValue: o.bgColor,
                            "onUpdate:modelValue": n[6] || (n[6] = e => o.bgColor = e)
                        }, null, 8, [ "modelValue" ]) ]),
                        _: 1
                    }), e.createVNode(l, {
                        label: "文字色"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(c, {
                            "default-value": "#606266",
                            modelValue: o.primaryTextColor,
                            "onUpdate:modelValue": n[7] || (n[7] = e => o.primaryTextColor = e)
                        }, null, 8, [ "modelValue" ]) ]),
                        _: 1
                    }) ]), ri ], 512), [ [ e.vShow, o.visible ] ]) ]),
                    _: 1
                }) ]),
                _: 1
            }, 8, [ "onClick" ]), [ [ e.vShow, o.visible ] ]) ]),
            _: 1
        }) ])) ], 64);
    }, Qa.__file = "src/components/side-bar.vue";
    var oi = {
        name: "all-search",
        components: {
            logo: A,
            asMenu: Na,
            sideBar: Qa
        },
        setup() {
            const t = h(), n = e.computed(() => [ "as-" + r.value ]), {mode: r} = M();
            return O(), {
                currentSite: t,
                mode: r,
                classList: n
            };
        }
    };
    oi.render = function(t, n, r, o, a, i) {
        const s = e.resolveComponent("logo"), l = e.resolveComponent("as-menu"), c = e.resolveComponent("side-bar");
        return e.openBlock(), e.createBlock("div", {
            class: [ "as-container", o.classList ],
            style: {
                display: "none"
            }
        }, [ e.createVNode(s, {
            mode: o.mode
        }, null, 8, [ "mode" ]), e.createVNode(l, {
            mode: o.mode
        }, null, 8, [ "mode" ]), e.createVNode(c) ], 2);
    }, oi.__file = "src/as-script/index.vue";
    let ai = h();
    const ii = e.createApp(oi);
    function si() {
        ai = h();
        const e = document.getElementById("all-search");
        if (e) e.style.display = ai.invisible ? "none" : "unset"; else {
            const e = function() {
                let e = document.createElement("div");
                return e.id = "all-search", e;
            }(), t = document.body.parentElement.insertBefore(e, document.body);
            ii.mount(t), function() {
                const e = function() {
                    document.dispatchEvent(new CustomEvent(d, {
                        detail: {
                            version: r,
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
                const r = setInterval((function() {
                    e += 1, document && document.body && (clearInterval(r), t()), 50 === e && (clearInterval(r), 
                    n(new Error("timeOut")));
                }), 200);
            }
        });
    }().then(() => {
        si();
    }).catch(e => {
        console.error(e);
    });
}(Vue);
