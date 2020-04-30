// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单
// @version      0.1.7f
// @description  在各个引擎之间跳转的顶部固定菜单，借鉴自searchEngineJump
// @author       endday
// @license      GPL-2.0
// @update       2020/5/1
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

!function(t) {
    "use strict";
    t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
    function e(t, e, o, s, r, n, i, a, c, l) {
        "boolean" != typeof i && (c = a, a = i, i = !1);
        const d = "function" == typeof o ? o.options : o;
        let h;
        if (t && t.render && (d.render = t.render, d.staticRenderFns = t.staticRenderFns, 
        d._compiled = !0, r && (d.functional = !0)), s && (d._scopeId = s), n ? (h = function(t) {
            (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), 
            e && e.call(this, c(t)), t && t._registeredComponents && t._registeredComponents.add(n);
        }, d._ssrRegister = h) : e && (h = i ? function(t) {
            e.call(this, l(t, this.$root.$options.shadowRoot));
        } : function(t) {
            e.call(this, a(t));
        }), h) if (d.functional) {
            const t = d.render;
            d.render = function(e, o) {
                return h.call(o), t(e, o);
            };
        } else {
            const t = d.beforeCreate;
            d.beforeCreate = t ? [].concat(t, h) : [ h ];
        }
        return o;
    }
    const o = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function s(t) {
        return (t, e) => function(t, e) {
            const s = o ? e.media || "default" : t, i = n[s] || (n[s] = {
                ids: new Set,
                styles: []
            });
            if (!i.ids.has(t)) {
                i.ids.add(t);
                let o = e.source;
                if (e.map && (o += "\n/*# sourceURL=" + e.map.sources[0] + " */", o += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e.map)))) + " */"), 
                i.element || (i.element = document.createElement("style"), i.element.type = "text/css", 
                e.media && i.element.setAttribute("media", e.media), void 0 === r && (r = document.head || document.getElementsByTagName("head")[0]), 
                r.appendChild(i.element)), "styleSheet" in i.element) i.styles.push(o), i.element.styleSheet.cssText = i.styles.filter(Boolean).join("\n"); else {
                    const t = i.ids.size - 1, e = document.createTextNode(o), s = i.element.childNodes;
                    s[t] && i.element.removeChild(s[t]), s.length ? i.element.insertBefore(e, s[t]) : i.element.appendChild(e);
                }
            }
        }(t, e);
    }
    let r;
    const n = {};
    const i = {
        name: "logo"
    };
    var a = function() {
        var t = this.$createElement;
        this._self._c;
        return this._m(0);
    };
    a._withStripped = !0;
    const c = {
        name: "as-sidebar",
        components: {
            logo: e({
                render: a,
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
            }, (function(t) {
                t && t("data-v-3a91cfd6_0", {
                    source: "@media screen and (max-width: 768px) {\n.as-title {\n    display: none;\n}\n}\n.as-title {\n  text-decoration: none;\n  padding: 0;\n  margin: 0;\n}\n.as-title .as-title-inner {\n  font-size: 18px;\n  width: 90px;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 600;\n  color: #1990fc;\n  margin: 0 15px;\n  text-align: center;\n  cursor: pointer;\n}",
                    map: void 0,
                    media: void 0
                });
            }), i, void 0, !1, void 0, !1, s, void 0, void 0)
        }
    };
    var l = function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("aside", [ e("logo") ], 1);
    };
    l._withStripped = !0;
    const d = {
        name: "all-search",
        components: {
            sidebar: e({
                render: l,
                staticRenderFns: []
            }, (function(t) {
                t && t("data-v-2ab48984_0", {
                    source: "\nbody {\n  margin-right: 150px;\n}\n",
                    map: void 0,
                    media: void 0
                });
            }), c, void 0, !1, void 0, !1, s, void 0, void 0)
        }
    };
    var h = function() {
        var t = this.$createElement;
        return (this._self._c || t)("sidebar");
    };
    h._withStripped = !0;
    const u = e({
        render: h,
        staticRenderFns: []
    }, (function(t) {
        t && t("data-v-0a0df4c0_0", {
            source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
            map: void 0,
            media: void 0
        });
    }), d, void 0, !1, void 0, !1, s, void 0, void 0);
    document.createElement("a");
    function p(t) {
        window.GM_addStyle && window.GM_addStyle(t);
    }
    let m = {};
    const w = [ {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
        style: {
            1: ".srp #searchform:not(.minidiv){top: 50px !important;} .srp .minidiv{top: 30px !important;}"
        }
    }, {
        url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/
    }, {
        url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/
    }, {
        url: /^https?:\/\/[^.]*\.bing\.com\/search/,
        style: {
            1: "body { padding-top: 30px }"
        }
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
            1: ".header { top: 30px }"
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
            1: ".search-page{top: 30px} .searx-navbar{top: 42px!important;}"
        }
    }, {
        url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/i
    }, {
        url: /^https?:\/\/www\.dogedoge\.com\/results\?q/i,
        style: {
            1: "#header_wrapper{ top: 30px!important }"
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
            1: ".AppHeader.is-fixed { top: 30px!important; }"
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
            1: ".top-bar._fixed { top: 30px }"
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
    } ].find(t => t.url.test(window.location.href));
    w && !w.disabled ? (m.url = w.url, m.disabled = w.disabled, m.style = w.style, m.keyword = w.keyword, 
    m.create = w.create, m.mounted = w.mounted) : m = null;
    var b = m;
    t.config.productionTip = !1;
    const f = b;
    if (b) {
        let e = null;
        const o = document.getElementById("all-search");
        o ? e = o : (e = document.createElement("div"), e.id = "all-search"), e.style.display = "none";
        const s = new t({
            data: () => ({
                currentSite: f
            }),
            render: t => t(u)
        });
        !function() {
            const t = document.getElementsByTagName("head")[0], e = {
                childList: !0
            };
            let o;
            MutationObserver && (o = new MutationObserver((function(t) {
                for (const e of t) e.removedNodes.length && "STYLE" === e.removedNodes[0].nodeName && p(e.removedNodes[0].innerText);
            })), o.observe(t, e));
        }(), function() {
            let t = 0;
            return new Promise((e, o) => {
                if (document && document.body) e(); else {
                    const s = setInterval((function() {
                        t += 1, document && document.body && (clearInterval(s), e()), 50 === t && (clearInterval(s), 
                        o(new Error("timeOut")));
                    }), 200);
                }
            });
        }().then(() => {
            const t = document.body.parentElement.insertBefore(e, document.body);
            s.$mount(t), b && b.style && p(b.style);
        }).catch(t => {
            console.error(t);
        });
    }
}(Vue);
