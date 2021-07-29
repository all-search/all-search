// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      1.1.0
// @description  2021年7月30日更新 竖向横向布局随意切换，支持图形界面自定义设置分类和添加链接，个人配置自动保存到谷歌插件。
// @author       endday
// @license      GPL-2.0
// @update       2021/7/30
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://cdn.bootcdn.net/ajax/libs/vue/3.1.2/vue.global.prod.min.js
// @resource     as-icon  https://cdn.jsdelivr.net/npm/all-search@1.1.0/src/assets/iconfont.css
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search@1.1.0/build/as-style.css
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
    var t = "default" in e ? e.default : e, n = "1.1.0";
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
        style: {}
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
        style: {}
    }, {
        url: /\/\/www\.startpage\.com\/do\/asearch/
    }, {
        url: /\/\/google\.infinitynewtab\.com\/\?q/
    }, {
        url: /\/\/www\.dogedoge\.com\/results\?q/,
        style: {
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
        style: {}
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
        style: {}
    }, {
        url: /\/\/weixin\.sogou\.com\/weixin\?/
    }, {
        url: /\/\/www\.quora\.com\/search\?/
    }, {
        url: /\/\/stackoverflow\.com\/search\?/,
        style: {
            2: ".top-bar._fixed { right: 100px }"
        }
    }, {
        url: /\/\/search\.bilibili\.com\/all/,
        keyword: () => document.getElementById("search-keyword").value,
        style: {}
    }, {
        url: /\/\/www\.acfun\.cn\/search/,
        keyword: () => document.getElementById("search-text--standalone").value,
        style: {
            1: "#header {top: 30px;}"
        }
    }, {
        url: /\/\/www\.youtube\.com\/results/,
        style: {
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
        style: {}
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
        style: {}
    }, {
        url: /\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
    }, {
        url: /\/\/.*\.bing\.com\/images\/search/,
        style: {}
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
        style: {}
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
        style: {}
    }, {
        url: /\/\/tieba\.baidu\.com\/f\/search/
    }, {
        url: /\/\/(movie|music|book)\.douban\.com\/subject_search?/
    }, {
        url: /\/\/www\.douban\.com\/search/
    }, {
        url: /\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
        style: {
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
            if (!1 !== t.apply(this, arguments)) return e.apply(this, arguments);
        };
    }
    function g(e, t) {
        return function() {
            const n = e.apply(this, arguments);
            return t.apply(this, arguments), n;
        };
    }
    const v = document.createElement("style");
    v.class = "as-custom-style";
    function b() {
        c(".as-custom-style");
        for (var e = document.body.getElementsByTagName("div"), t = e.length, n = 0; n < t; n++) {
            let t = window.getComputedStyle(e[n], null), o = t.getPropertyValue("position"), r = t.getPropertyValue("display"), a = t.getPropertyValue("visible"), i = t.getPropertyValue("width"), s = t.getPropertyValue("height");
            t.getPropertyValue("top");
            "fixed" !== o && "absolute" !== o || "none" === r || "hidden" === a || "0px" === i || "0px" === s || !e[n].offsetParent || "BODY" !== e[n].offsetParent.tagName || e[n].classList.add("as-fix-top");
        }
        let o = [];
        for (let e = 0; e < document.styleSheets.length; e++) try {
            if (document.styleSheets[e] && document.styleSheets[e].cssRules) {
                let t = document.styleSheets[e].cssRules;
                if (t.length) for (let e = 0; e < t.length; e++) t[e] && t[e].style && "fixed" === t[e].style.position && o.push(t[e].selectorText);
            }
        } catch (e) {}
        o = [ ...new Set(o) ].filter(e => e && e.indexOf("as-container") < 0), o = o.filter(e => -1 === e.indexOf(".as-")).map(e => ({
            el: document.querySelector(e),
            selectorText: e
        })).filter(e => (console.log(e.el), e.el && e.el.classList.contains("as-fix-top"))), 
        console.log(o), o.forEach(e => {
            const t = window.getComputedStyle(e.el).getPropertyValue("top"), n = window.getComputedStyle(e.el).getPropertyValue("position");
            console.log(e.el, e.selectorText, n, t), t && t.indexOf("px") > -1 && v.sheet.addRule(e.selectorText, "top: " + (parseFloat(t.replace("px", "")) + 30 + "px"));
        });
    }
    document.getElementsByTagName("head")[0].appendChild(v);
    let y = m();
    const w = i("mode"), x = "vertical" !== (_ = w) && "horizontal" !== _ ? "horizontal" : _;
    var _;
    const k = (e = x) => {
        y = m();
        const t = document.body;
        if (t.classList.remove("body-vertical", "body-horizontal"), e) {
            const n = "body-" + e;
            t.classList.add(n);
        }
    }, O = function() {
        y = m(), y.invisible || y.disabled ? c(".as-style") : l("as-style", `https://cdn.jsdelivr.net/npm/all-search@${o}/build/as-style.css`);
    }, E = function() {
        var e;
        Node.prototype.removeChild = h(Node.prototype.removeChild, e => !e || "STYLE" !== e.tagName || !(e.classList.contains("as-icon") || e.classList.contains("as-style"))), 
        Node.prototype.appendChild = h(Node.prototype.appendChild, e => (!e || "STYLE" !== e.tagName && "LINK" !== e.tagName || console.log(Object.getOwnPropertyNames(e)), 
        !0)), b(), k(), l("as-icon", `https://cdn.jsdelivr.net/npm/all-search@${o}/src/assets/iconfont.css`), 
        O(), e = () => {
            y = m(), b(), k(), O();
        }, history.pushState = g(history.pushState, e), history.replaceState = g(history.replaceState, e), 
        window.addEventListener("yt-navigate-finish", e);
    }, S = i("mode"), C = e => "vertical" !== e && "horizontal" !== e ? "horizontal" : e, M = e.ref(C(S)), T = (e = "horizontal") => {
        k(e), ((e = x) => {
            if (y = m(), c(".as-custom-style"), y.style) {
                let t = "";
                y.style[1] && "horizontal" === e ? t = y.style[1] : y.style[2] && "vertical" === e && (t = y.style[2]), 
                t && u(t, "as-custom-style");
            }
        })(e);
    };
    !function(e) {
        const t = function() {
            document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || e();
        };
        document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), 
        document.addEventListener("mozfullscreenchange", e), document.addEventListener("MSFullscreenChange", e), 
        document.addEventListener("resize", t);
    }(() => {
        T(M.value);
    }), e.watch(M, e => {
        const t = C(e);
        T(t), s("mode", t);
    });
    const N = function(e, t = 500) {
        let n = null;
        return function() {
            clearTimeout(n), n = setTimeout(() => {
                e.apply(this, arguments);
            }, t);
        };
    }(() => T(M.value));
    function A() {
        return e.onMounted(() => {
            T(M.value), window.addEventListener("resize", N, !1);
        }), e.onUnmounted(() => {
            window.removeEventListener("resize", N, !1);
        }), {
            mode: M
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
    const L = e.createVNode("p", {
        class: "as-title-inner"
    }, " All Search ", -1);
    function B(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    }
    function j(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports;
    }
    P.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("a", {
            class: [ "as-title", "as-title-" + o.mode ],
            href: "https://github.com/endday/all-search",
            target: "_blank"
        }, [ L ], 2);
    }, P.__file = "src/components/logo.vue";
    var D = function() {
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
    }(), V = "undefined" != typeof window && "undefined" != typeof document && window.document === document, z = "undefined" != typeof global && global.Math === Math ? global : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(), I = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(z) : function(e) {
        return setTimeout((function() {
            return e(Date.now());
        }), 1e3 / 60);
    };
    var F = [ "top", "right", "bottom", "left", "width", "height", "size", "weight" ], R = "undefined" != typeof MutationObserver, Z = function() {
        function e() {
            this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, 
            this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), 
            this.refresh = function(e, t) {
                var n = !1, o = !1, r = 0;
                function a() {
                    n && (n = !1, e()), o && s();
                }
                function i() {
                    I(a);
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
            V && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), 
            window.addEventListener("resize", this.refresh), R ? (this.mutationsObserver_ = new MutationObserver(this.refresh), 
            this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), 
            this.connected_ = !0);
        }, e.prototype.disconnect_ = function() {
            V && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), 
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
    }, H = function(e) {
        return e && e.ownerDocument && e.ownerDocument.defaultView || z;
    }, U = K(0, 0, 0, 0);
    function W(e) {
        return parseFloat(e) || 0;
    }
    function $(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        return t.reduce((function(t, n) {
            return t + W(e["border-" + n + "-width"]);
        }), 0);
    }
    function G(e) {
        var t = e.clientWidth, n = e.clientHeight;
        if (!t && !n) return U;
        var o = H(e).getComputedStyle(e), r = function(e) {
            for (var t = {}, n = 0, o = [ "top", "right", "bottom", "left" ]; n < o.length; n++) {
                var r = o[n], a = e["padding-" + r];
                t[r] = W(a);
            }
            return t;
        }(o), a = r.left + r.right, i = r.top + r.bottom, s = W(o.width), l = W(o.height);
        if ("border-box" === o.boxSizing && (Math.round(s + a) !== t && (s -= $(o, "left", "right") + a), 
        Math.round(l + i) !== n && (l -= $(o, "top", "bottom") + i)), !function(e) {
            return e === H(e).document.documentElement;
        }(e)) {
            var c = Math.round(s + a) - t, u = Math.round(l + i) - n;
            1 !== Math.abs(c) && (s -= c), 1 !== Math.abs(u) && (l -= u);
        }
        return K(r.left, r.top, s, l);
    }
    var Y = "undefined" != typeof SVGGraphicsElement ? function(e) {
        return e instanceof H(e).SVGGraphicsElement;
    } : function(e) {
        return e instanceof H(e).SVGElement && "function" == typeof e.getBBox;
    };
    function X(e) {
        return V ? Y(e) ? function(e) {
            var t = e.getBBox();
            return K(0, 0, t.width, t.height);
        }(e) : G(e) : U;
    }
    function K(e, t, n, o) {
        return {
            x: e,
            y: t,
            width: n,
            height: o
        };
    }
    var J = function() {
        function e(e) {
            this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = K(0, 0, 0, 0), 
            this.target = e;
        }
        return e.prototype.isActive = function() {
            var e = X(this.target);
            return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
        }, e.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
        }, e;
    }(), Q = function(e, t) {
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
    }, ee = function() {
        function e(e, t, n) {
            if (this.activeObservations_ = [], this.observations_ = new D, "function" != typeof e) throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e, this.controller_ = t, this.callbackCtx_ = n;
        }
        return e.prototype.observe = function(e) {
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof H(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new J(e)), this.controller_.addObserver(this), this.controller_.refresh());
            }
        }, e.prototype.unobserve = function(e) {
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof H(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
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
                    return new Q(e.target, e.broadcastRect());
                }));
                this.callback_.call(e, t, e), this.clearActive();
            }
        }, e.prototype.clearActive = function() {
            this.activeObservations_.splice(0);
        }, e.prototype.hasActive = function() {
            return this.activeObservations_.length > 0;
        }, e;
    }(), te = "undefined" != typeof WeakMap ? new WeakMap : new D, ne = function e(t) {
        if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        var n = Z.getInstance(), o = new ee(t, n, this);
        te.set(this, o);
    };
    [ "observe", "unobserve", "disconnect" ].forEach((function(e) {
        ne.prototype[e] = function() {
            var t;
            return (t = te.get(this))[e].apply(t, arguments);
        };
    }));
    var oe = void 0 !== z.ResizeObserver ? z.ResizeObserver : ne, re = j((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = "undefined" == typeof window;
        t.default = n;
    }));
    B(re);
    var ae = j((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(oe), r = n(re);
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
    B(ae);
    ae.addResizeListener, ae.removeResizeListener;
    function ie(e, t) {
        const n = Object.create(null), o = e.split(",");
        for (let e = 0; e < o.length; e++) n[o[e]] = !0;
        return t ? e => !!n[e.toLowerCase()] : e => !!n[e];
    }
    const se = {
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
    }, le = {
        1: "STABLE",
        2: "DYNAMIC",
        3: "FORWARDED"
    }, ce = ie("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt");
    const ue = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", de = ie(ue), pe = ie(ue + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"), fe = /[>/="'\u0009\u000a\u000c\u0020]/, me = {};
    const he = ie("animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width"), ge = ie("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");
    const ve = /;(?![^(]*\))/g, be = /:(.+)/;
    function ye(e) {
        const t = {};
        return e.split(ve).forEach(e => {
            if (e) {
                const n = e.split(be);
                n.length > 1 && (t[n[0].trim()] = n[1].trim());
            }
        }), t;
    }
    const we = ie("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), xe = ie("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), _e = ie("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), ke = /["'&<>]/;
    const Oe = /^-?>|<!--|-->|--!>|<!-$/g;
    function Ee(e, t) {
        if (e === t) return !0;
        let n = Le(e), o = Le(t);
        if (n || o) return !(!n || !o) && e.getTime() === t.getTime();
        if (n = Ne(e), o = Ne(t), n || o) return !(!n || !o) && function(e, t) {
            if (e.length !== t.length) return !1;
            let n = !0;
            for (let o = 0; n && o < e.length; o++) n = Ee(e[o], t[o]);
            return n;
        }(e, t);
        if (n = De(e), o = De(t), n || o) {
            if (!n || !o) return !1;
            if (Object.keys(e).length !== Object.keys(t).length) return !1;
            for (const n in e) {
                const o = e.hasOwnProperty(n), r = t.hasOwnProperty(n);
                if (o && !r || !o && r || !Ee(e[n], t[n])) return !1;
            }
        }
        return String(e) === String(t);
    }
    const Se = (e, t) => Ae(t) ? {
        [`Map(${t.size})`]: [ ...t.entries() ].reduce((e, [t, n]) => (e[t + " =>"] = n, 
        e), {})
    } : Pe(t) ? {
        [`Set(${t.size})`]: [ ...t.values() ]
    } : !De(t) || Ne(t) || Ie(t) ? t : String(t), Ce = /^on[^a-z]/, Me = Object.assign, Te = Object.prototype.hasOwnProperty, Ne = Array.isArray, Ae = e => "[object Map]" === ze(e), Pe = e => "[object Set]" === ze(e), Le = e => e instanceof Date, Be = e => "function" == typeof e, je = e => "string" == typeof e, De = e => null !== e && "object" == typeof e, Ve = Object.prototype.toString, ze = e => Ve.call(e), Ie = e => "[object Object]" === ze(e), Fe = ie(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Re = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n));
    }, Ze = /-(\w)/g, qe = Re(e => e.replace(Ze, (e, t) => t ? t.toUpperCase() : "")), He = /\B([A-Z])/g, Ue = Re(e => e.replace(He, "-$1").toLowerCase()), We = Re(e => e.charAt(0).toUpperCase() + e.slice(1)), $e = Re(e => e ? "on" + We(e) : "");
    let Ge;
    var Ye = Object.freeze({
        __proto__: null,
        EMPTY_ARR: [],
        EMPTY_OBJ: {},
        NO: () => !1,
        NOOP: () => {},
        PatchFlagNames: se,
        babelParserDefaultPlugins: [ "bigInt", "optionalChaining", "nullishCoalescingOperator" ],
        camelize: qe,
        capitalize: We,
        def: (e, t, n) => {
            Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !1,
                value: n
            });
        },
        escapeHtml: function(e) {
            const t = "" + e, n = ke.exec(t);
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
            return e.replace(Oe, "");
        },
        extend: Me,
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
        getGlobalThis: () => Ge || (Ge = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}),
        hasChanged: (e, t) => e !== t && (e == e || t == t),
        hasOwn: (e, t) => Te.call(e, t),
        hyphenate: Ue,
        invokeArrayFns: (e, t) => {
            for (let n = 0; n < e.length; n++) e[n](t);
        },
        isArray: Ne,
        isBooleanAttr: pe,
        isDate: Le,
        isFunction: Be,
        isGloballyWhitelisted: ce,
        isHTMLTag: we,
        isIntegerKey: e => je(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
        isKnownAttr: ge,
        isMap: Ae,
        isModelListener: e => e.startsWith("onUpdate:"),
        isNoUnitNumericStyleProp: he,
        isObject: De,
        isOn: e => Ce.test(e),
        isPlainObject: Ie,
        isPromise: e => De(e) && Be(e.then) && Be(e.catch),
        isReservedProp: Fe,
        isSSRSafeAttrName: function(e) {
            if (me.hasOwnProperty(e)) return me[e];
            const t = fe.test(e);
            return t && console.error("unsafe attribute name: " + e), me[e] = !t;
        },
        isSVGTag: xe,
        isSet: Pe,
        isSpecialBooleanAttr: de,
        isString: je,
        isSymbol: e => "symbol" == typeof e,
        isVoidTag: _e,
        looseEqual: Ee,
        looseIndexOf: function(e, t) {
            return e.findIndex(e => Ee(e, t));
        },
        makeMap: ie,
        normalizeClass: function e(t) {
            let n = "";
            if (je(t)) n = t; else if (Ne(t)) for (let o = 0; o < t.length; o++) {
                const r = e(t[o]);
                r && (n += r + " ");
            } else if (De(t)) for (const e in t) t[e] && (n += e + " ");
            return n.trim();
        },
        normalizeStyle: function e(t) {
            if (Ne(t)) {
                const n = {};
                for (let o = 0; o < t.length; o++) {
                    const r = t[o], a = e(je(r) ? ye(r) : r);
                    if (a) for (const e in a) n[e] = a[e];
                }
                return n;
            }
            if (De(t)) return t;
        },
        objectToString: Ve,
        parseStringStyle: ye,
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
        slotFlagsText: le,
        stringifyStyle: function(e) {
            let t = "";
            if (!e) return t;
            for (const n in e) {
                const o = e[n], r = n.startsWith("--") ? n : Ue(n);
                (je(o) || "number" == typeof o && he(r)) && (t += `${r}:${o};`);
            }
            return t;
        },
        toDisplayString: e => null == e ? "" : De(e) ? JSON.stringify(e, Se, 2) : String(e),
        toHandlerKey: $e,
        toNumber: e => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t;
        },
        toRawType: e => ze(e).slice(8, -1),
        toTypeString: ze
    }), Xe = j((function(e, t) {
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
    B(Xe);
    Xe.warn;
    var Ke = j((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(re);
        const a = Ye.hyphenate, i = e => "number" == typeof e;
        Object.defineProperty(n, "isVNode", {
            enumerable: !0,
            get: function() {
                return t.isVNode;
            }
        }), Object.defineProperty(n, "camelize", {
            enumerable: !0,
            get: function() {
                return Ye.camelize;
            }
        }), Object.defineProperty(n, "capitalize", {
            enumerable: !0,
            get: function() {
                return Ye.capitalize;
            }
        }), Object.defineProperty(n, "extend", {
            enumerable: !0,
            get: function() {
                return Ye.extend;
            }
        }), Object.defineProperty(n, "hasOwn", {
            enumerable: !0,
            get: function() {
                return Ye.hasOwn;
            }
        }), Object.defineProperty(n, "isArray", {
            enumerable: !0,
            get: function() {
                return Ye.isArray;
            }
        }), Object.defineProperty(n, "isObject", {
            enumerable: !0,
            get: function() {
                return Ye.isObject;
            }
        }), Object.defineProperty(n, "isString", {
            enumerable: !0,
            get: function() {
                return Ye.isString;
            }
        }), Object.defineProperty(n, "looseEqual", {
            enumerable: !0,
            get: function() {
                return Ye.looseEqual;
            }
        }), n.$ = function(e) {
            return e.value;
        }, n.SCOPE = "Util", n.addUnit = function(e) {
            return Ye.isString(e) ? e : i(e) ? e + "px" : "";
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
            return !!(!e && 0 !== e || Ye.isArray(e) && !e.length || Ye.isObject(e) && !Object.keys(e).length);
        }, n.isFirefox = function() {
            return !r.default && !!window.navigator.userAgent.match(/firefox/i);
        }, n.isHTMLElement = e => Ye.toRawType(e).startsWith("HTML"), n.isIE = function() {
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
            for (let n = 0; n < e.length; n++) e[n] && Ye.extend(t, e[n]);
            return t;
        }, n.useGlobalConfig = function() {
            const e = t.getCurrentInstance();
            return "$ELEMENT" in e.proxy ? e.proxy.$ELEMENT : {};
        };
    }));
    B(Ke);
    Ke.$, Ke.SCOPE, Ke.addUnit, Ke.arrayFind, Ke.arrayFindIndex, Ke.arrayFlat, Ke.autoprefixer, 
    Ke.clearTimer, Ke.coerceTruthyValueToArray, Ke.deduplicate, Ke.entries, Ke.escapeRegexpString, 
    Ke.generateId, Ke.getPropByPath, Ke.getRandomInt, Ke.getValueByPath, Ke.isBool, 
    Ke.isEdge, Ke.isEmpty, Ke.isFirefox, Ke.isHTMLElement, Ke.isIE, Ke.isNumber, Ke.isUndefined, 
    Ke.kebabCase, Ke.rafThrottle, Ke.toObject, Ke.useGlobalConfig;
    var Je = j((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(re);
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
                "float" === (t = Ke.camelize(t)) && (t = "cssFloat");
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
            e && t && (Ke.isObject(t) ? Object.keys(t).forEach(n => {
                l(e, n, t[n]);
            }) : (t = Ke.camelize(t), e.style[t] = n));
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
            e && t && (Ke.isObject(t) ? Object.keys(t).forEach(t => {
                l(e, t, "");
            }) : l(e, t, ""));
        }, t.setStyle = l, t.stop = e => e.stopPropagation();
    }));
    B(Je);
    Je.addClass, Je.getOffsetTop, Je.getOffsetTopDistance, Je.getScrollContainer, Je.getStyle, 
    Je.hasClass, Je.isInContainer, Je.isScroll, Je.off, Je.on, Je.once, Je.removeClass, 
    Je.removeStyle, Je.setStyle, Je.stop;
    var Qe = B(j((function(e, n) {
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
                    e.stopImmediatePropagation(), c.value = !0, Je.on(document, "mousemove", m), Je.on(document, "mouseup", h), 
                    p = document.onselectstart, document.onselectstart = () => !1;
                }, m = e => {
                    if (!1 === c.value) return;
                    const t = l.value[s.value.axis];
                    if (!t) return;
                    const o = 100 * (-1 * (n.value.getBoundingClientRect()[s.value.direction] - e[s.value.client]) - (r.value[s.value.offset] - t)) / n.value[s.value.offset];
                    i.value[s.value.scroll] = o * i.value[s.value.scrollSize] / 100;
                }, h = () => {
                    c.value = !1, l.value[s.value.axis] = 0, Je.off(document, "mousemove", m), document.onselectstart = p, 
                    u.value && (d.value = !1);
                }, g = t.computed(() => function({move: e, size: t, bar: n}) {
                    const o = {}, r = `translate${n.axis}(${e}%)`;
                    return o[n.size] = t, o.transform = r, o.msTransform = r, o.webkitTransform = r, 
                    o;
                }({
                    size: e.size,
                    move: e.move,
                    bar: s.value
                })), v = () => {
                    u.value = !1, d.value = !!e.size;
                }, b = () => {
                    u.value = !0, d.value = c.value;
                };
                return t.onMounted(() => {
                    Je.on(a.value, "mousemove", v), Je.on(a.value, "mouseleave", b);
                }), t.onBeforeUnmount(() => {
                    Je.off(document, "mouseup", h), Je.off(a.value, "mousemove", v), Je.off(a.value, "mouseleave", b);
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
                    thumbStyle: g,
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
                    return Ke.isArray(t) ? (t = Ke.toObject(t), t.height = Ke.addUnit(e.height), t.maxHeight = Ke.addUnit(e.maxHeight)) : Ke.isString(t) && (t += Ke.addUnit(e.height) ? `height: ${Ke.addUnit(e.height)};` : "", 
                    t += Ke.addUnit(e.maxHeight) ? `max-height: ${Ke.addUnit(e.maxHeight)};` : ""), 
                    t;
                });
                return t.onMounted(() => {
                    e.native || t.nextTick(u), e.noresize || (ae.addResizeListener(c.value, u), addEventListener("resize", u));
                }), t.onBeforeUnmount(() => {
                    e.noresize || (ae.removeResizeListener(c.value, u), removeEventListener("resize", u));
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
    let et = document.createElement("a");
    function tt(e) {
        let t = e;
        if (t.indexOf("//") < 0) t = "//" + t; else {
            if (!(t.indexOf("//") > -1)) return et;
            t = function(e) {
                const t = e.toLowerCase(), n = [ "http://", "https://", "ftp://", "files://" ];
                for (let o = 0; o < n.length; o++) if (0 === t.indexOf(n[o])) return e.replace(/.*\/\//, "//");
                return e;
            }(t);
        }
        return et.href = t, {
            href: et.href,
            origin: et.origin,
            protocol: et.protocol,
            host: et.host,
            hostname: et.hostname,
            port: et.port,
            pathname: et.pathname,
            search: et.search,
            hash: et.hash
        };
    }
    const nt = [ {
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
            const {hostname: n} = tt(t.url);
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
    function ot(e) {
        let t = nt;
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
        }(n, nt), s("sites", t), s("sites-version", o))), "tm" === e && (t = t.filter(e => e.list && e.list.length > 0 && e.data && e.data.visible).map(e => ({
            ...e,
            show: !1
        }))), t;
    }
    var rt = "top", at = "bottom", it = "right", st = "left", lt = [ rt, at, it, st ], ct = lt.reduce((function(e, t) {
        return e.concat([ t + "-start", t + "-end" ]);
    }), []), ut = [].concat(lt, [ "auto" ]).reduce((function(e, t) {
        return e.concat([ t, t + "-start", t + "-end" ]);
    }), []), dt = [ "beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite" ];
    function pt(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
    }
    function ft(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window;
        }
        return e;
    }
    function mt(e) {
        return e instanceof ft(e).Element || e instanceof Element;
    }
    function ht(e) {
        return e instanceof ft(e).HTMLElement || e instanceof HTMLElement;
    }
    function gt(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof ft(e).ShadowRoot || e instanceof ShadowRoot);
    }
    var vt = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var t = e.state;
            Object.keys(t.elements).forEach((function(e) {
                var n = t.styles[e] || {}, o = t.attributes[e] || {}, r = t.elements[e];
                ht(r) && pt(r) && (Object.assign(r.style, n), Object.keys(o).forEach((function(e) {
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
                    ht(o) && pt(o) && (Object.assign(o.style, a), Object.keys(r).forEach((function(e) {
                        o.removeAttribute(e);
                    })));
                }));
            };
        },
        requires: [ "computeStyles" ]
    };
    function bt(e) {
        return e.split("-")[0];
    }
    function yt(e) {
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
    function wt(e) {
        var t = yt(e), n = e.offsetWidth, o = e.offsetHeight;
        return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), 
        {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: n,
            height: o
        };
    }
    function xt(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && gt(n)) {
            var o = t;
            do {
                if (o && e.isSameNode(o)) return !0;
                o = o.parentNode || o.host;
            } while (o);
        }
        return !1;
    }
    function _t(e) {
        return ft(e).getComputedStyle(e);
    }
    function kt(e) {
        return [ "table", "td", "th" ].indexOf(pt(e)) >= 0;
    }
    function Ot(e) {
        return ((mt(e) ? e.ownerDocument : e.document) || window.document).documentElement;
    }
    function Et(e) {
        return "html" === pt(e) ? e : e.assignedSlot || e.parentNode || (gt(e) ? e.host : null) || Ot(e);
    }
    function St(e) {
        return ht(e) && "fixed" !== _t(e).position ? e.offsetParent : null;
    }
    function Ct(e) {
        for (var t = ft(e), n = St(e); n && kt(n) && "static" === _t(n).position; ) n = St(n);
        return n && ("html" === pt(n) || "body" === pt(n) && "static" === _t(n).position) ? t : n || function(e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && ht(e) && "fixed" === _t(e).position) return null;
            for (var n = Et(e); ht(n) && [ "html", "body" ].indexOf(pt(n)) < 0; ) {
                var o = _t(n);
                if ("none" !== o.transform || "none" !== o.perspective || "paint" === o.contain || -1 !== [ "transform", "perspective" ].indexOf(o.willChange) || t && "filter" === o.willChange || t && o.filter && "none" !== o.filter) return n;
                n = n.parentNode;
            }
            return null;
        }(e) || t;
    }
    function Mt(e) {
        return [ "top", "bottom" ].indexOf(e) >= 0 ? "x" : "y";
    }
    var Tt = Math.max, Nt = Math.min, At = Math.round;
    function Pt(e, t, n) {
        return Tt(e, Nt(t, n));
    }
    function Lt(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e);
    }
    function Bt(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e, t;
        }), {});
    }
    var jt = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t, n = e.state, o = e.name, r = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, s = bt(n.placement), l = Mt(s), c = [ st, it ].indexOf(s) >= 0 ? "height" : "width";
            if (a && i) {
                var u = function(e, t) {
                    return Lt("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                        placement: t.placement
                    })) : e) ? e : Bt(e, lt));
                }(r.padding, n), d = wt(a), p = "y" === l ? rt : st, f = "y" === l ? at : it, m = n.rects.reference[c] + n.rects.reference[l] - i[l] - n.rects.popper[c], h = i[l] - n.rects.reference[l], g = Ct(a), v = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0, b = m / 2 - h / 2, y = u[p], w = v - d[c] - u[f], x = v / 2 - d[c] / 2 + b, _ = Pt(y, x, w), k = l;
                n.modifiersData[o] = ((t = {})[k] = _, t.centerOffset = _ - x, t);
            }
        },
        effect: function(e) {
            var t = e.state, n = e.options.element, o = void 0 === n ? "[data-popper-arrow]" : n;
            null != o && ("string" != typeof o || (o = t.elements.popper.querySelector(o))) && xt(t.elements.popper, o) && (t.elements.arrow = o);
        },
        requires: [ "popperOffsets" ],
        requiresIfExists: [ "preventOverflow" ]
    }, Dt = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };
    function Vt(e) {
        var t, n = e.popper, o = e.popperRect, r = e.placement, a = e.offsets, i = e.position, s = e.gpuAcceleration, l = e.adaptive, c = e.roundOffsets, u = !0 === c ? function(e) {
            var t = e.x, n = e.y, o = window.devicePixelRatio || 1;
            return {
                x: At(At(t * o) / o) || 0,
                y: At(At(n * o) / o) || 0
            };
        }(a) : "function" == typeof c ? c(a) : a, d = u.x, p = void 0 === d ? 0 : d, f = u.y, m = void 0 === f ? 0 : f, h = a.hasOwnProperty("x"), g = a.hasOwnProperty("y"), v = st, b = rt, y = window;
        if (l) {
            var w = Ct(n), x = "clientHeight", _ = "clientWidth";
            w === ft(n) && "static" !== _t(w = Ot(n)).position && (x = "scrollHeight", _ = "scrollWidth"), 
            w = w, r === rt && (b = at, m -= w[x] - o.height, m *= s ? 1 : -1), r === st && (v = it, 
            p -= w[_] - o.width, p *= s ? 1 : -1);
        }
        var k, O = Object.assign({
            position: i
        }, l && Dt);
        return s ? Object.assign({}, O, ((k = {})[b] = g ? "0" : "", k[v] = h ? "0" : "", 
        k.transform = (y.devicePixelRatio || 1) < 2 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", 
        k)) : Object.assign({}, O, ((t = {})[b] = g ? m + "px" : "", t[v] = h ? p + "px" : "", 
        t.transform = "", t));
    }
    var zt = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(e) {
            var t = e.state, n = e.options, o = n.gpuAcceleration, r = void 0 === o || o, a = n.adaptive, i = void 0 === a || a, s = n.roundOffsets, l = void 0 === s || s, c = {
                placement: bt(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r
            };
            null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, Vt(Object.assign({}, c, {
                offsets: t.modifiersData.popperOffsets,
                position: t.options.strategy,
                adaptive: i,
                roundOffsets: l
            })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, Vt(Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l
            })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement
            });
        },
        data: {}
    }, It = {
        passive: !0
    };
    var Ft = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(e) {
            var t = e.state, n = e.instance, o = e.options, r = o.scroll, a = void 0 === r || r, i = o.resize, s = void 0 === i || i, l = ft(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return a && c.forEach((function(e) {
                e.addEventListener("scroll", n.update, It);
            })), s && l.addEventListener("resize", n.update, It), function() {
                a && c.forEach((function(e) {
                    e.removeEventListener("scroll", n.update, It);
                })), s && l.removeEventListener("resize", n.update, It);
            };
        },
        data: {}
    }, Rt = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    function Zt(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return Rt[e];
        }));
    }
    var qt = {
        start: "end",
        end: "start"
    };
    function Ht(e) {
        return e.replace(/start|end/g, (function(e) {
            return qt[e];
        }));
    }
    function Ut(e) {
        var t = ft(e);
        return {
            scrollLeft: t.pageXOffset,
            scrollTop: t.pageYOffset
        };
    }
    function Wt(e) {
        return yt(Ot(e)).left + Ut(e).scrollLeft;
    }
    function $t(e) {
        var t = _t(e), n = t.overflow, o = t.overflowX, r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + o);
    }
    function Gt(e, t) {
        var n;
        void 0 === t && (t = []);
        var o = function e(t) {
            return [ "html", "body", "#document" ].indexOf(pt(t)) >= 0 ? t.ownerDocument.body : ht(t) && $t(t) ? t : e(Et(t));
        }(e), r = o === (null == (n = e.ownerDocument) ? void 0 : n.body), a = ft(o), i = r ? [ a ].concat(a.visualViewport || [], $t(o) ? o : []) : o, s = t.concat(i);
        return r ? s : s.concat(Gt(Et(i)));
    }
    function Yt(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        });
    }
    function Xt(e, t) {
        return "viewport" === t ? Yt(function(e) {
            var t = ft(e), n = Ot(e), o = t.visualViewport, r = n.clientWidth, a = n.clientHeight, i = 0, s = 0;
            return o && (r = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (i = o.offsetLeft, 
            s = o.offsetTop)), {
                width: r,
                height: a,
                x: i + Wt(e),
                y: s
            };
        }(e)) : ht(t) ? function(e) {
            var t = yt(e);
            return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, 
            t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, 
            t.x = t.left, t.y = t.top, t;
        }(t) : Yt(function(e) {
            var t, n = Ot(e), o = Ut(e), r = null == (t = e.ownerDocument) ? void 0 : t.body, a = Tt(n.scrollWidth, n.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), i = Tt(n.scrollHeight, n.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), s = -o.scrollLeft + Wt(e), l = -o.scrollTop;
            return "rtl" === _t(r || n).direction && (s += Tt(n.clientWidth, r ? r.clientWidth : 0) - a), 
            {
                width: a,
                height: i,
                x: s,
                y: l
            };
        }(Ot(e)));
    }
    function Kt(e, t, n) {
        var o = "clippingParents" === t ? function(e) {
            var t = Gt(Et(e)), n = [ "absolute", "fixed" ].indexOf(_t(e).position) >= 0 && ht(e) ? Ct(e) : e;
            return mt(n) ? t.filter((function(e) {
                return mt(e) && xt(e, n) && "body" !== pt(e);
            })) : [];
        }(e) : [].concat(t), r = [].concat(o, [ n ]), a = r[0], i = r.reduce((function(t, n) {
            var o = Xt(e, n);
            return t.top = Tt(o.top, t.top), t.right = Nt(o.right, t.right), t.bottom = Nt(o.bottom, t.bottom), 
            t.left = Tt(o.left, t.left), t;
        }), Xt(e, a));
        return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, 
        i;
    }
    function Jt(e) {
        return e.split("-")[1];
    }
    function Qt(e) {
        var t, n = e.reference, o = e.element, r = e.placement, a = r ? bt(r) : null, i = r ? Jt(r) : null, s = n.x + n.width / 2 - o.width / 2, l = n.y + n.height / 2 - o.height / 2;
        switch (a) {
          case rt:
            t = {
                x: s,
                y: n.y - o.height
            };
            break;

          case at:
            t = {
                x: s,
                y: n.y + n.height
            };
            break;

          case it:
            t = {
                x: n.x + n.width,
                y: l
            };
            break;

          case st:
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
        var c = a ? Mt(a) : null;
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
    function en(e, t) {
        void 0 === t && (t = {});
        var n = t, o = n.placement, r = void 0 === o ? e.placement : o, a = n.boundary, i = void 0 === a ? "clippingParents" : a, s = n.rootBoundary, l = void 0 === s ? "viewport" : s, c = n.elementContext, u = void 0 === c ? "popper" : c, d = n.altBoundary, p = void 0 !== d && d, f = n.padding, m = void 0 === f ? 0 : f, h = Lt("number" != typeof m ? m : Bt(m, lt)), g = "popper" === u ? "reference" : "popper", v = e.elements.reference, b = e.rects.popper, y = e.elements[p ? g : u], w = Kt(mt(y) ? y : y.contextElement || Ot(e.elements.popper), i, l), x = yt(v), _ = Qt({
            reference: x,
            element: b,
            strategy: "absolute",
            placement: r
        }), k = Yt(Object.assign({}, b, _)), O = "popper" === u ? k : x, E = {
            top: w.top - O.top + h.top,
            bottom: O.bottom - w.bottom + h.bottom,
            left: w.left - O.left + h.left,
            right: O.right - w.right + h.right
        }, S = e.modifiersData.offset;
        if ("popper" === u && S) {
            var C = S[r];
            Object.keys(E).forEach((function(e) {
                var t = [ it, at ].indexOf(e) >= 0 ? 1 : -1, n = [ rt, at ].indexOf(e) >= 0 ? "y" : "x";
                E[e] += C[n] * t;
            }));
        }
        return E;
    }
    function tn(e, t) {
        void 0 === t && (t = {});
        var n = t, o = n.placement, r = n.boundary, a = n.rootBoundary, i = n.padding, s = n.flipVariations, l = n.allowedAutoPlacements, c = void 0 === l ? ut : l, u = Jt(o), d = u ? s ? ct : ct.filter((function(e) {
            return Jt(e) === u;
        })) : lt, p = d.filter((function(e) {
            return c.indexOf(e) >= 0;
        }));
        0 === p.length && (p = d);
        var f = p.reduce((function(t, n) {
            return t[n] = en(e, {
                placement: n,
                boundary: r,
                rootBoundary: a,
                padding: i
            })[bt(n)], t;
        }), {});
        return Object.keys(f).sort((function(e, t) {
            return f[e] - f[t];
        }));
    }
    var nn = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name;
            if (!t.modifiersData[o]._skip) {
                for (var r = n.mainAxis, a = void 0 === r || r, i = n.altAxis, s = void 0 === i || i, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.flipVariations, m = void 0 === f || f, h = n.allowedAutoPlacements, g = t.options.placement, v = bt(g), b = l || (v === g || !m ? [ Zt(g) ] : function(e) {
                    if ("auto" === bt(e)) return [];
                    var t = Zt(e);
                    return [ Ht(e), t, Ht(t) ];
                }(g)), y = [ g ].concat(b).reduce((function(e, n) {
                    return e.concat("auto" === bt(n) ? tn(t, {
                        placement: n,
                        boundary: u,
                        rootBoundary: d,
                        padding: c,
                        flipVariations: m,
                        allowedAutoPlacements: h
                    }) : n);
                }), []), w = t.rects.reference, x = t.rects.popper, _ = new Map, k = !0, O = y[0], E = 0; E < y.length; E++) {
                    var S = y[E], C = bt(S), M = "start" === Jt(S), T = [ rt, at ].indexOf(C) >= 0, N = T ? "width" : "height", A = en(t, {
                        placement: S,
                        boundary: u,
                        rootBoundary: d,
                        altBoundary: p,
                        padding: c
                    }), P = T ? M ? it : st : M ? at : rt;
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
    function on(e, t, n) {
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
    function rn(e) {
        return [ rt, it, at, st ].some((function(t) {
            return e[t] >= 0;
        }));
    }
    var an = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: [ "preventOverflow" ],
        fn: function(e) {
            var t = e.state, n = e.name, o = t.rects.reference, r = t.rects.popper, a = t.modifiersData.preventOverflow, i = en(t, {
                elementContext: "reference"
            }), s = en(t, {
                altBoundary: !0
            }), l = on(i, o), c = on(s, r, a), u = rn(l), d = rn(c);
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
    var sn = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: [ "popperOffsets" ],
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name, r = n.offset, a = void 0 === r ? [ 0, 0 ] : r, i = ut.reduce((function(e, n) {
                return e[n] = function(e, t, n) {
                    var o = bt(e), r = [ st, rt ].indexOf(o) >= 0 ? -1 : 1, a = "function" == typeof n ? n(Object.assign({}, t, {
                        placement: e
                    })) : n, i = a[0], s = a[1];
                    return i = i || 0, s = (s || 0) * r, [ st, it ].indexOf(o) >= 0 ? {
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
    var ln = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function(e) {
            var t = e.state, n = e.name;
            t.modifiersData[n] = Qt({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement
            });
        },
        data: {}
    };
    var cn = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options, o = e.name, r = n.mainAxis, a = void 0 === r || r, i = n.altAxis, s = void 0 !== i && i, l = n.boundary, c = n.rootBoundary, u = n.altBoundary, d = n.padding, p = n.tether, f = void 0 === p || p, m = n.tetherOffset, h = void 0 === m ? 0 : m, g = en(t, {
                boundary: l,
                rootBoundary: c,
                padding: d,
                altBoundary: u
            }), v = bt(t.placement), b = Jt(t.placement), y = !b, w = Mt(v), x = "x" === w ? "y" : "x", _ = t.modifiersData.popperOffsets, k = t.rects.reference, O = t.rects.popper, E = "function" == typeof h ? h(Object.assign({}, t.rects, {
                placement: t.placement
            })) : h, S = {
                x: 0,
                y: 0
            };
            if (_) {
                if (a || s) {
                    var C = "y" === w ? rt : st, M = "y" === w ? at : it, T = "y" === w ? "height" : "width", N = _[w], A = _[w] + g[C], P = _[w] - g[M], L = f ? -O[T] / 2 : 0, B = "start" === b ? k[T] : O[T], j = "start" === b ? -O[T] : -k[T], D = t.elements.arrow, V = f && D ? wt(D) : {
                        width: 0,
                        height: 0
                    }, z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }, I = z[C], F = z[M], R = Pt(0, k[T], V[T]), Z = y ? k[T] / 2 - L - R - I - E : B - R - I - E, q = y ? -k[T] / 2 + L + R + F + E : j + R + F + E, H = t.elements.arrow && Ct(t.elements.arrow), U = H ? "y" === w ? H.clientTop || 0 : H.clientLeft || 0 : 0, W = t.modifiersData.offset ? t.modifiersData.offset[t.placement][w] : 0, $ = _[w] + Z - W - U, G = _[w] + q - W;
                    if (a) {
                        var Y = Pt(f ? Nt(A, $) : A, N, f ? Tt(P, G) : P);
                        _[w] = Y, S[w] = Y - N;
                    }
                    if (s) {
                        var X = "x" === w ? rt : st, K = "x" === w ? at : it, J = _[x], Q = J + g[X], ee = J - g[K], te = Pt(f ? Nt(Q, $) : Q, J, f ? Tt(ee, G) : ee);
                        _[x] = te, S[x] = te - J;
                    }
                }
                t.modifiersData[o] = S;
            }
        },
        requiresIfExists: [ "offset" ]
    };
    function un(e, t, n) {
        void 0 === n && (n = !1);
        var o, r, a = Ot(t), i = yt(e), s = ht(t), l = {
            scrollLeft: 0,
            scrollTop: 0
        }, c = {
            x: 0,
            y: 0
        };
        return (s || !s && !n) && (("body" !== pt(t) || $t(a)) && (l = (o = t) !== ft(o) && ht(o) ? {
            scrollLeft: (r = o).scrollLeft,
            scrollTop: r.scrollTop
        } : Ut(o)), ht(t) ? ((c = yt(t)).x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Wt(a))), 
        {
            x: i.left + l.scrollLeft - c.x,
            y: i.top + l.scrollTop - c.y,
            width: i.width,
            height: i.height
        };
    }
    function dn(e) {
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
    var pn = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };
    function fn() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect);
        }));
    }
    function mn(e) {
        void 0 === e && (e = {});
        var t = e, n = t.defaultModifiers, o = void 0 === n ? [] : n, r = t.defaultOptions, a = void 0 === r ? pn : r;
        return function(e, t, n) {
            void 0 === n && (n = a);
            var r, i, s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, pn, a),
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
                        reference: mt(e) ? Gt(e) : e.contextElement ? Gt(e.contextElement) : [],
                        popper: Gt(t)
                    };
                    var r, i, c = function(e) {
                        var t = dn(e);
                        return dt.reduce((function(e, n) {
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
                        if (fn(t, n)) {
                            s.rects = {
                                reference: un(t, Ct(n), "fixed" === s.options.strategy),
                                popper: wt(n)
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
            if (!fn(e, t)) return u;
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
    var hn = mn(), gn = mn({
        defaultModifiers: [ Ft, ln, zt, vt ]
    }), vn = mn({
        defaultModifiers: [ Ft, ln, zt, vt, sn, nn, cn, jt, an ]
    }), bn = Object.freeze({
        __proto__: null,
        popperGenerator: mn,
        detectOverflow: en,
        createPopperBase: hn,
        createPopper: vn,
        createPopperLite: gn,
        top: rt,
        bottom: at,
        right: it,
        left: st,
        auto: "auto",
        basePlacements: lt,
        start: "start",
        end: "end",
        clippingParents: "clippingParents",
        viewport: "viewport",
        popper: "popper",
        reference: "reference",
        variationPlacements: ct,
        placements: ut,
        beforeRead: "beforeRead",
        read: "read",
        afterRead: "afterRead",
        beforeMain: "beforeMain",
        main: "main",
        afterMain: "afterMain",
        beforeWrite: "beforeWrite",
        write: "write",
        afterWrite: "afterWrite",
        modifierPhases: dt,
        applyStyles: vt,
        arrow: jt,
        computeStyles: zt,
        eventListeners: Ft,
        flip: nn,
        hide: an,
        offset: sn,
        popperOffsets: ln,
        preventOverflow: cn
    }), yn = j((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        let n = {};
        t.getConfig = e => n[e], t.setConfig = e => {
            n = e;
        };
    }));
    B(yn);
    yn.getConfig, yn.setConfig;
    var wn = j((function(e, t) {
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
    B(wn);
    wn.EVENT_CODE, wn.attemptFocus, wn.isFocusable, wn.isVisible, wn.obtainAllFocusableElements, 
    wn.triggerEvent;
    var xn = j((function(e, t) {
        function n(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(re);
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
            Je.on(e, "touchmove", r), Je.on(e, "click", a)), e;
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
                if (Je.addClass(c, "v-modal"), this.modalFade && !s && Je.addClass(c, "v-modal-enter"), 
                r) {
                    r.trim().split(/\s+/).forEach(e => Je.addClass(c, e));
                }
                setTimeout(() => {
                    Je.removeClass(c, "v-modal-enter");
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
                            o.modalClass.trim().split(/\s+/).forEach(e => Je.removeClass(n, e));
                        }
                        t.pop(), t.length > 0 && (n.style.zIndex = t[t.length - 1].zIndex);
                    } else for (let n = t.length - 1; n >= 0; n--) if (t[n].id === e) {
                        t.splice(n, 1);
                        break;
                    }
                }
                0 === t.length && (this.modalFade && Je.addClass(n, "v-modal-leave"), setTimeout(() => {
                    0 === t.length && (n.parentNode && n.parentNode.removeChild(n), n.style.display = "none", 
                    u.modalDom = void 0), Je.removeClass(n, "v-modal-leave");
                }, 200));
            }
        };
        Object.defineProperty(u, "zIndex", {
            configurable: !0,
            get: () => (void 0 === i && (i = yn.getConfig("zIndex") || 2e3), i),
            set(e) {
                i = e;
            }
        });
        o.default || Je.on(window, "keydown", (function(e) {
            if (e.code === wn.EVENT_CODE.esc) {
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
    B(xn);
    var _n = j((function(e, n) {
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
    B(_n);
    _n.PatchFlags, _n.getFirstValidNode, _n.isComment, _n.isFragment, _n.isTemplate, 
    _n.isText, _n.isValidElementNode, _n.renderBlock, _n.renderIf;
    var kn, On, En, Sn, Cn, Mn, Tn, Nn, An, Pn, Ln, Bn, jn, Dn, Vn, zn = !1;
    function In() {
        if (!zn) {
            zn = !0;
            var e = navigator.userAgent, t = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e), n = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
            if (Bn = /\b(iPhone|iP[ao]d)/.exec(e), jn = /\b(iP[ao]d)/.exec(e), Pn = /Android/i.exec(e), 
            Dn = /FBAN\/\w+;/i.exec(e), Vn = /Mobile/i.exec(e), Ln = !!/Win64/.exec(e), t) {
                (kn = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN) && document && document.documentMode && (kn = document.documentMode);
                var o = /(?:Trident\/(\d+.\d+))/.exec(e);
                Mn = o ? parseFloat(o[1]) + 4 : kn, On = t[2] ? parseFloat(t[2]) : NaN, En = t[3] ? parseFloat(t[3]) : NaN, 
                (Sn = t[4] ? parseFloat(t[4]) : NaN) ? (t = /(?:Chrome\/(\d+\.\d+))/.exec(e), Cn = t && t[1] ? parseFloat(t[1]) : NaN) : Cn = NaN;
            } else kn = On = En = Cn = Sn = NaN;
            if (n) {
                if (n[1]) {
                    var r = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
                    Tn = !r || parseFloat(r[1].replace("_", "."));
                } else Tn = !1;
                Nn = !!n[2], An = !!n[3];
            } else Tn = Nn = An = !1;
        }
    }
    var Fn, Rn = {
        ie: function() {
            return In() || kn;
        },
        ieCompatibilityMode: function() {
            return In() || Mn > kn;
        },
        ie64: function() {
            return Rn.ie() && Ln;
        },
        firefox: function() {
            return In() || On;
        },
        opera: function() {
            return In() || En;
        },
        webkit: function() {
            return In() || Sn;
        },
        safari: function() {
            return Rn.webkit();
        },
        chrome: function() {
            return In() || Cn;
        },
        windows: function() {
            return In() || Nn;
        },
        osx: function() {
            return In() || Tn;
        },
        linux: function() {
            return In() || An;
        },
        iphone: function() {
            return In() || Bn;
        },
        mobile: function() {
            return In() || Bn || jn || Pn || Vn;
        },
        nativeApp: function() {
            return In() || Dn;
        },
        android: function() {
            return In() || Pn;
        },
        ipad: function() {
            return In() || jn;
        }
    }, Zn = Rn, qn = !("undefined" == typeof window || !window.document || !window.document.createElement), Hn = {
        canUseDOM: qn,
        canUseWorkers: "undefined" != typeof Worker,
        canUseEventListeners: qn && !(!window.addEventListener && !window.attachEvent),
        canUseViewport: qn && !!window.screen,
        isInWorker: !qn
    };
    Hn.canUseDOM && (Fn = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""))
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
    var Un = function(e, t) {
        if (!Hn.canUseDOM || t && !("addEventListener" in document)) return !1;
        var n = "on" + e, o = n in document;
        if (!o) {
            var r = document.createElement("div");
            r.setAttribute(n, "return;"), o = "function" == typeof r[n];
        }
        return !o && Fn && "wheel" === e && (o = document.implementation.hasFeature("Events.wheel", "3.0")), 
        o;
    };
    function Wn(e) {
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
    Wn.getEventType = function() {
        return Zn.firefox() ? "DOMMouseScroll" : Un("wheel") ? "wheel" : "mousewheel";
    };
    var $n = Wn, Gn = j((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(re), a = o($n);
        const i = new Map;
        let s;
        function l(e, t) {
            let n = [];
            return Array.isArray(t.arg) ? n = t.arg : n.push(t.arg), function(o, r) {
                const a = t.instance.popperRef, i = o.target, s = null == r ? void 0 : r.target, l = !t || !t.instance, c = !i || !s, u = e.contains(i) || e.contains(s), d = e === i, p = n.length && n.some(e => null == e ? void 0 : e.contains(i)) || n.length && n.includes(s), f = a && (a.contains(i) || a.contains(s));
                l || c || u || d || p || f || t.value(o, r);
            };
        }
        r.default || (Je.on(document, "mousedown", e => s = e), Je.on(document, "mouseup", e => {
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
                Je.on(e, "mousedown", e => {
                    0 === e.button && (n = Date.now(), Je.once(document, "mouseup", a), clearInterval(o), 
                    o = setInterval(r, 100));
                });
            }
        };
        const d = [], p = e => {
            if (0 === d.length) return;
            const t = d[d.length - 1]["_trap-focus-children"];
            if (t.length > 0 && e.code === wn.EVENT_CODE.tab) {
                if (1 === t.length) return e.preventDefault(), void (document.activeElement !== t[0] && t[0].focus());
                const n = e.shiftKey, o = e.target === t[0], r = e.target === t[t.length - 1];
                o && n && (e.preventDefault(), t[t.length - 1].focus()), r && !n && (e.preventDefault(), 
                t[0].focus());
            }
        }, f = {
            beforeMount(e) {
                e["_trap-focus-children"] = wn.obtainAllFocusableElements(e), d.push(e), d.length <= 1 && Je.on(document, "keydown", p);
            },
            updated(e) {
                t.nextTick(() => {
                    e["_trap-focus-children"] = wn.obtainAllFocusableElements(e);
                });
            },
            unmounted() {
                d.shift(), 0 === d.length && Je.off(document, "keydown", p);
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
    B(Gn);
    Gn.ClickOutside, Gn.Mousewheel, Gn.RepeatClick, Gn.TrapFocus;
    var Yn = j((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(Xe), a = o(xn);
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
        function v(e, {emit: n}) {
            const o = t.ref(null), r = t.ref(null), i = t.ref(null), s = "el-popper-" + Ke.generateId();
            let l = null, c = null, u = null, d = !1;
            const p = () => e.manualMode || "manual" === e.trigger, f = t.ref({
                zIndex: a.default.nextZIndex()
            }), m = h(e, {
                arrow: o
            }), g = t.reactive({
                visible: !!e.visible
            }), v = t.computed({
                get: () => !e.disabled && (Ke.isBool(e.visible) ? e.visible : g.visible),
                set(t) {
                    p() || (Ke.isBool(e.visible) ? n("update:visible", t) : g.visible = t);
                }
            });
            function b() {
                e.autoClose > 0 && (u = window.setTimeout(() => {
                    y();
                }, e.autoClose)), v.value = !0;
            }
            function y() {
                v.value = !1;
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
                if (!Ke.$(v)) return;
                const e = Ke.$(r), t = Ke.isHTMLElement(e) ? e : e.$el;
                l = bn.createPopper(t, Ke.$(i), Ke.$(m)), l.update();
            }
            function E(e) {
                !l || Ke.$(v) && !e || S();
            }
            function S() {
                var e;
                null == (e = null == l ? void 0 : l.destroy) || e.call(l), l = null;
            }
            const C = {};
            if (!p()) {
                const t = () => {
                    Ke.$(v) ? _() : x();
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
                Ke.isArray(e.trigger) ? Object.values(e.trigger).forEach(r) : r(e.trigger);
            }
            return t.watch(m, e => {
                l && (l.setOptions(e), l.update());
            }), t.watch(v, (function(e) {
                e && (f.value.zIndex = a.default.nextZIndex(), O());
            })), {
                update: function() {
                    Ke.$(v) && (l ? l.update() : O());
                },
                doDestroy: E,
                show: x,
                hide: _,
                onPopperMouseEnter: function() {
                    e.enterable && "click" !== e.trigger && clearTimeout(u);
                },
                onPopperMouseLeave: function() {
                    const {trigger: t} = e;
                    Ke.isString(t) && ("click" === t || "focus" === t) || 1 === t.length && ("click" === t[0] || "focus" === t[0]) || _();
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
                visibility: v
            };
        }
        const b = () => {};
        function y(e, n) {
            const {effect: o, name: r, stopPopperMouseEvent: a, popperClass: i, popperStyle: s, popperRef: l, pure: c, popperId: u, visibility: d, onMouseenter: p, onMouseleave: f, onAfterEnter: m, onAfterLeave: h, onBeforeEnter: g, onBeforeLeave: v} = e, y = [ i, "el-popper", "is-" + o, c ? "is-pure" : "" ], w = a ? Je.stop : b;
            return t.h(t.Transition, {
                name: r,
                onAfterEnter: m,
                onAfterLeave: h,
                onBeforeEnter: g,
                onBeforeLeave: v
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
                    onClick: Je.stop,
                    onMousedown: w,
                    onMouseup: w
                }, n), [ [ t.vShow, d ] ]) ])
            });
        }
        function w(e, n) {
            const o = _n.getFirstValidNode(e, 1);
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
            props: g,
            emits: [ "update:visible", "after-enter", "after-leave", "before-enter", "before-leave" ],
            setup(e, n) {
                n.slots.trigger || r.default("ElPopper", "Trigger must be provided");
                const o = v(e, n), a = () => o.doDestroy(!0);
                return t.onMounted(o.initializePopper), t.onBeforeUnmount(a), t.onActivated(o.initializePopper), 
                t.onDeactivated(a), o;
            },
            render() {
                var e;
                const {$slots: n, appendToBody: o, class: r, style: a, effect: i, hide: s, onPopperMouseEnter: l, onPopperMouseLeave: c, onAfterEnter: u, onAfterLeave: d, onBeforeEnter: p, onBeforeLeave: f, popperClass: m, popperId: h, popperStyle: g, pure: v, showArrow: b, transition: _, visibility: C, stopPopperMouseEvent: M} = this, T = this.isManualMode(), N = x(b), A = y({
                    effect: i,
                    name: _,
                    popperClass: m,
                    popperId: h,
                    popperStyle: g,
                    pure: v,
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
                }, this.events), B = T ? w(P, L) : t.withDirectives(w(P, L), [ [ Gn.ClickOutside, s ] ]);
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
        n.default = M, n.defaultProps = g, n.renderArrow = x, n.renderPopper = y, n.renderTrigger = w, 
        n.usePopper = v;
    }));
    B(Yn);
    Yn.Effect, Yn.defaultProps, Yn.renderArrow, Yn.renderPopper, Yn.renderTrigger, Yn.usePopper;
    var Xn = B(j((function(e, n) {
        function o(e) {
            return e && "object" == typeof e && "default" in e ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(Yn), a = o(xn), i = Object.defineProperty, s = Object.defineProperties, l = Object.getOwnPropertyDescriptors, c = Object.getOwnPropertySymbols, u = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable, p = (e, t, n) => t in e ? i(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
        function f(e, n) {
            const o = t.ref(a.default.nextZIndex()), r = t.computed(() => Ke.isString(e.width) ? e.width : e.width + "px"), i = t.computed(() => ({
                width: r.value,
                zIndex: o.value
            })), f = Yn.usePopper(e, n);
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
        var m = Object.defineProperty, h = Object.defineProperties, g = Object.getOwnPropertyDescriptors, v = Object.getOwnPropertySymbols, b = Object.prototype.hasOwnProperty, y = Object.prototype.propertyIsEnumerable, w = (e, t, n) => t in e ? m(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n, x = (e, t) => {
            for (var n in t || (t = {})) b.call(t, n) && w(e, n, t[n]);
            if (v) for (var n of v(t)) y.call(t, n) && w(e, n, t[n]);
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
            props: (O = x({}, Yn.defaultProps), E = {
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
            }, h(O, g(E))),
            emits: _,
            setup: (e, t) => f(e, t),
            render() {
                const {$slots: e} = this, n = e.reference ? e.reference() : null, o = _n.renderIf(this.title, "div", k, t.toDisplayString(this.title), _n.PatchFlags.TEXT), r = t.renderSlot(e, "default", {}, () => [ t.createTextVNode(t.toDisplayString(this.content), _n.PatchFlags.TEXT) ]), {events: a, onAfterEnter: i, onAfterLeave: s, onPopperMouseEnter: l, onPopperMouseLeave: c, popperStyle: u, popperId: d, popperClass: p, showArrow: f, transition: m, visibility: h, tabindex: g} = this, v = [ this.content ? "el-popover--plain" : "", "el-popover", p ].join(" ");
                let b = Yn.renderPopper({
                    effect: Yn.Effect.LIGHT,
                    name: m,
                    popperClass: v,
                    popperStyle: u,
                    popperId: d,
                    visibility: h,
                    onMouseenter: l,
                    onMouseleave: c,
                    onAfterEnter: i,
                    onAfterLeave: s,
                    stopPopperMouseEvent: !1
                }, [ o, r, Yn.renderArrow(f) ]);
                const y = n ? Yn.renderTrigger(n, x({
                    ariaDescribedby: d,
                    ref: "triggerRef",
                    tabindex: g
                }, a)) : t.createCommentVNode("v-if", !0);
                return t.h(t.Fragment, null, [ "click" === this.trigger ? t.withDirectives(y, [ [ Gn.ClickOutside, this.hide ] ]) : y, t.h(t.Teleport, {
                    disabled: !this.appendToBody,
                    to: "body"
                }, [ b ]) ]);
            }
        });
        S.__file = "packages/popover/src/index.vue";
        const C = (e, t, n) => {
            const o = t.arg || t.value, r = n.dirs[0].instance.$refs[o];
            r && (r.triggerRef = e, e.setAttribute("tabindex", r.tabindex), Object.entries(r.events).forEach(([t, n]) => {
                Je.on(e, t.toLowerCase().slice(2), n);
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
    }))), Kn = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    Kn.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("i", {
            class: [ "as-menu-item-icon", "icon-" + o.name ]
        }, null, 2);
    }, Kn.__file = "src/components/icon.vue";
    var Jn = {
        name: "menuItem",
        components: {
            popover: Xn,
            icon: Kn
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
                    if (e.icon) return e.icon;
                    const t = tt(e.url);
                    return t.host.split("."), t.origin + "/favicon.ico";
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
    const Qn = {
        class: "as-subMenu"
    }, eo = {
        class: "as-url-icon"
    };
    Jn.render = function(t, n, o, r, a, i) {
        const s = e.resolveComponent("icon"), l = e.resolveComponent("popover");
        return e.openBlock(), e.createBlock(l, {
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
            default: e.withCtx(() => [ e.createVNode("ul", Qn, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(o.item.list, (t, n) => e.withDirectives((e.openBlock(), 
            e.createBlock("li", {
                key: `${o.item.name}_${n}`,
                onClick: e => r.handleClick(t),
                onMouseup: e.withModifiers(e => r.handleClick(t, !0), [ "middle" ])
            }, [ e.createVNode("div", eo, [ e.createVNode("img", {
                src: r.getFavicon(t),
                onerror: "this.classList.add('error')"
            }, null, 8, [ "src" ]) ]), e.createVNode("p", {
                class: "as-subMenu-text",
                textContent: e.toDisplayString(t.nameZh)
            }, null, 8, [ "textContent" ]) ], 40, [ "onClick", "onMouseup" ])), [ [ e.vShow, t.data.visible ] ])), 128)) ]) ]),
            _: 1
        }, 8, [ "placement", "trigger" ]);
    }, Jn.__file = "src/components/menuItem.vue";
    const to = i("align"), no = new Map([ [ "flex-start", "开始" ], [ "center", "居中" ], [ "flex-end", "末尾" ] ]), oo = e => no.has(e) ? e : "flex-start", ro = e.ref(oo(to)), ao = e.reactive(no);
    function io() {
        return {
            alignList: ao,
            align: ro
        };
    }
    e.watch(ro, e => {
        s("align", oo(e));
    });
    var so = {
        name: "as-menu",
        components: {
            scrollbar: Qe,
            menuItem: Jn,
            icon: Kn
        },
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].indexOf(e) > -1
            }
        },
        setup(t) {
            const n = e.reactive(ot("tm")), {align: o} = io();
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
    so.render = function(t, n, o, r, a, i) {
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
    }, so.__file = "src/components/menu.vue";
    const lo = e.ref(""), co = e.ref(""), uo = e.ref("");
    e.watch(lo, e => {
        po("primary-color", e), s("primary-color", e);
    }), e.watch(co, e => {
        po("bg-color", e), s("bg-color", e);
    }), e.watch(uo, e => {
        po("primary-text-color", e), s("primary-text-color", e);
    });
    const po = (e, t) => {
        document.getElementById("all-search").style.setProperty("--as-" + e, t), document.body.style.setProperty("--as-" + e, t);
    }, fo = {
        "primary-color": lo,
        "bg-color": co,
        "primary-text-color": uo
    }, mo = e => {
        const t = (e => {
            const t = document.getElementById("all-search");
            return getComputedStyle(t).getPropertyValue("--as-" + e).trim();
        })(e), n = i(e) || t;
        fo[e].value = n;
    };
    function ho() {
        return e.onMounted(() => {
            mo("primary-color"), mo("bg-color"), mo("primary-text-color");
        }), {
            primaryColor: lo,
            bgColor: co,
            primaryTextColor: uo
        };
    }
    var go = {
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
    go.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("div", {
            class: "as-overlay",
            onMousedown: n[1] || (n[1] = (...e) => r.onMouseDown && r.onMouseDown(...e)),
            onMouseup: n[2] || (n[2] = (...e) => r.onMouseUp && r.onMouseUp(...e)),
            onClick: n[3] || (n[3] = (...e) => r.onMaskClick && r.onMaskClick(...e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, go.__file = "src/components/overlay.vue";
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
    const bo = {
        class: "as-radio as-radio-animate"
    }, yo = e.createVNode("i", {
        class: "as-radio-icon"
    }, null, -1), wo = {
        class: "as-radio-label"
    };
    vo.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("label", bo, [ e.withDirectives(e.createVNode("input", {
            type: "radio",
            value: o.label,
            "onUpdate:modelValue": n[1] || (n[1] = e => r.model = e)
        }, null, 8, [ "value" ]), [ [ e.vModelRadio, r.model ] ]), yo, e.createVNode("span", wo, [ e.renderSlot(t.$slots, "default") ]) ]);
    }, vo.__file = "src/components/radio.vue";
    var xo = {
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
    xo.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("div", null, [ e.createVNode("label", {
            class: "as-label",
            style: r.labelStyle,
            textContent: e.toDisplayString(o.label)
        }, null, 12, [ "textContent" ]), e.createVNode("div", {
            class: "as-content",
            style: r.contentStyle
        }, [ e.renderSlot(t.$slots, "default") ], 4) ]);
    }, xo.__file = "src/components/form-item.vue";
    var _o = {
        name: "xButton",
        props: {
            type: {
                type: String,
                default: "primary"
            }
        }
    };
    _o.render = function(t, n, o, r, a, i) {
        return e.openBlock(), e.createBlock("button", {
            class: [ "as-button", "as-button__" + o.type ]
        }, [ e.renderSlot(t.$slots, "default") ], 2);
    }, _o.__file = "src/components/button.vue";
    var ko = {
        name: "color",
        components: {
            asButton: _o
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
    const Oo = e.withScopeId("data-v-2532dbfa");
    e.pushScopeId("data-v-2532dbfa");
    const Eo = {
        class: "color-set"
    }, So = {
        class: "label"
    }, Co = e.createTextVNode(" 重置 ");
    e.popScopeId();
    const Mo = Oo((t, n, o, r, a, i) => {
        const s = e.resolveComponent("asButton");
        return e.openBlock(), e.createBlock("div", Eo, [ e.createVNode("label", So, [ e.withDirectives(e.createVNode("input", {
            class: "input—color",
            type: "color",
            "onUpdate:modelValue": n[1] || (n[1] = e => r.model = e)
        }, null, 512), [ [ e.vModelText, r.model ] ]) ]), e.createVNode(s, {
            class: "reset-btn",
            type: "text",
            onClick: r.reset
        }, {
            default: Oo(() => [ Co ]),
            _: 1
        }, 8, [ "onClick" ]) ]);
    });
    ko.render = Mo, ko.__scopeId = "data-v-2532dbfa", ko.__file = "src/components/color.vue";
    var To = {
        name: "side-bar",
        components: {
            overlay: go,
            asRadio: vo,
            formItem: xo,
            color: ko
        },
        setup() {
            const t = e.ref(!1), {mode: n} = A(), {alignList: o, align: r} = io(), {primaryColor: a, bgColor: i, primaryTextColor: s} = ho();
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
    const No = e.createVNode("header", {
        class: "header"
    }, " 设置 ", -1), Ao = e.createTextVNode("横向 "), Po = e.createTextVNode("竖向 "), Lo = e.createVNode("footer", null, [ e.createVNode("a", {
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
    To.render = function(t, n, o, r, a, i) {
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
                    }, [ No, e.createVNode("section", null, [ e.createVNode(l, {
                        label: "方向"
                    }, {
                        default: e.withCtx(() => [ e.createVNode(s, {
                            label: "horizontal",
                            modelValue: r.mode,
                            "onUpdate:modelValue": n[2] || (n[2] = e => r.mode = e),
                            onChange: r.changeMode
                        }, {
                            default: e.withCtx(() => [ Ao ]),
                            _: 1
                        }, 8, [ "modelValue", "onChange" ]), e.createVNode(s, {
                            label: "vertical",
                            modelValue: r.mode,
                            "onUpdate:modelValue": n[3] || (n[3] = e => r.mode = e),
                            onChange: r.changeMode
                        }, {
                            default: e.withCtx(() => [ Po ]),
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
                    }) ]), Lo ], 512), [ [ e.vShow, r.visible ] ]) ]),
                    _: 1
                }) ]),
                _: 1
            }, 8, [ "onClick" ]), [ [ e.vShow, r.visible ] ]) ]),
            _: 1
        }) ])) ], 64);
    }, To.__file = "src/components/side-bar.vue";
    var Bo = {
        name: "all-search",
        components: {
            logo: P,
            asMenu: so,
            sideBar: To
        },
        setup() {
            const t = m(), n = e.computed(() => [ "as-" + o.value ]), {mode: o} = A();
            return E(), {
                currentSite: t,
                mode: o,
                classList: n
            };
        }
    };
    Bo.render = function(t, n, o, r, a, i) {
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
    }, Bo.__file = "src/as-script/index.vue";
    let jo = m();
    const Do = e.createApp(Bo);
    function Vo() {
        jo = m();
        const e = document.getElementById("all-search");
        if (e) e.style.display = jo.invisible ? "none" : "unset"; else {
            const e = function() {
                let e = document.createElement("div");
                return e.id = "all-search", e;
            }(), t = document.body.parentElement.insertBefore(e, document.body);
            Do.mount(t), function() {
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
        Vo();
    }).catch(e => {
        console.error(e);
    });
}(Vue);
