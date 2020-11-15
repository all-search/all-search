// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      0.2.6
// @description  2020年11月14日更新 新增功能，支持图形界面自定义设置分类和添加链接，无需直接修改源代码。
// @author       endday
// @license      GPL-2.0
// @update       2020/11/14
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://lib.baomitu.com/vue/2.6.11/vue.js
// @resource     iconFont  https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css?v=0.2.6
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search/build/as-style.css?v=0.2.6
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
// @include      /^https?:\/\/search\.jd\.com\/Search/
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

var allSearch = function(t) {
    "use strict";
    t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
    let e = document.createElement("a");
    const s = [ {
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
            url: "http://www.acfun.cn/search/?#query=%s"
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
            url: "http://search.jd.com/Search?keyword=%s&enc=utf-8"
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
            nameZh: "1号店",
            url: "http://search.yhd.com/c0-0/k%s"
        }, {
            nameZh: "闲鱼",
            url: "https://s.2.taobao.com/list/list.htm?q=%s&search_type=item&_input_charset=utf8"
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
            nameZh: "虾米音乐",
            url: "http://www.xiami.com/search?key=%s"
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
            nameZh: "网易-谷歌",
            url: "https://www.google.com.hk/search?q=site:news.163.com+%s"
        }, {
            nameZh: "腾讯新闻",
            url: "https://www.sogou.com/sogou?site=news.qq.com&query=%s"
        }, {
            nameZh: "凤凰新闻",
            url: "http://search.ifeng.com/sofeng/search.action?q=%s"
        }, {
            nameZh: "CNN",
            url: "https://edition.cnn.com/search/?q=%s"
        }, {
            nameZh: "BBC",
            url: "https://www.bbc.co.uk/search?q=%s"
        }, {
            nameZh: "Economis",
            url: "https://www.google.com/search?q=site:www.economist.com%20%s"
        }, {
            nameZh: "今日头条",
            url: "https://www.toutiao.com/search/?keyword=%E4%B8%96%E7%95%8C%E6%9D%AF"
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
    } ].map(t => ({
        ...t,
        list: t.list.map(s => {
            const {hostname: o} = function(t) {
                let s = t;
                if (s.indexOf("//") < 0) s = `//${s}`; else {
                    if (!(s.indexOf("//") > -1)) return e;
                    {
                        const t = s.toLowerCase();
                        t.startsWith("http://") || t.startsWith("https://") || t.startsWith("ftp://") || t.startsWith("files://") || (s = s.replace(/.*\/\//, "//"));
                    }
                }
                return e.href = s, {
                    href: e.href,
                    origin: e.origin,
                    protocol: e.protocol,
                    host: e.host,
                    hostname: e.hostname,
                    port: e.port,
                    pathname: e.pathname,
                    search: e.search,
                    hash: e.hash
                };
            }(s.url);
            return {
                ...s,
                id: `${t.name}-${o}`,
                data: {
                    visible: !0
                }
            };
        }),
        data: {
            visible: !0
        }
    }));
    var o = "0.2.6";
    new t({
        data: {
            tmVersion: null
        }
    });
    const a = o;
    function n(t) {
        return t ? `__allSearch__${t}` : null;
    }
    let r = function(t) {
        const e = n(t);
        let s;
        if (s = window.GM_getValue ? window.GM_getValue(e) : window.localStorage.getItem(e), 
        s) try {
            return JSON.parse(s);
        } catch (t) {
            return s;
        }
        return null;
    }, i = function(t, e) {
        const s = n(t);
        if (window.GM_setValue) window.GM_setValue(s, e); else {
            const t = JSON.stringify(e);
            t && window.localStorage.setItem(s, t);
        }
    };
    function l(t, e) {
        let s;
        window.GM_getResourceText && (s = window.GM_getResourceText(t)), s ? h(s, t) : function(t, e) {
            if (!t) return;
            if (e) {
                const t = document.styleSheets;
                for (let s = 0; s < t.length; s++) if (t[s].ownerNode.className === e) return;
            }
            const s = document.createElement("link");
            s.href = t, s.rel = "stylesheet", s.type = "text/css", s.crossorigin = "anonymous", 
            document.getElementsByTagName("head")[0].appendChild(s);
        }(e, t);
    }
    function c(t, e, s) {
        const o = e / 1e3 * 60;
        let a = 0;
        if (!0 === s) {
            if (t()) return;
        }
        requestAnimationFrame((function e() {
            if (a < o) a++, requestAnimationFrame(e); else {
                t() || !1 || (a = 0, requestAnimationFrame(e));
            }
        }));
    }
    function h(t, e, s, o) {
        c((function() {
            let a = document.querySelector(s);
            if (void 0 === s && (a = document.body || document.head || document.documentElement || document), 
            o = o || !1, void 0 === s || void 0 !== s && null !== document.querySelector(s)) {
                if (!0 !== o) {
                    if (!1 === o && null != document.querySelector("." + e)) return !0;
                    {
                        let s = document.createElement("style");
                        null != e && (s.className = e), s.setAttribute("type", "text/css"), s.innerHTML = t;
                        try {
                            a.appendChild(s);
                        } catch (t) {
                            console.log(t.message);
                        }
                        return !0;
                    }
                }
                !function(t) {
                    try {
                        if ("string" == typeof t) {
                            let e = document.querySelectorAll(t);
                            for (let t = 0; t < e.length; t++) e[t].remove();
                        } else "function" == typeof t ? t() : console.log("未知命令：" + t);
                    } catch (t) {}
                }("." + e);
            }
        }), 20, !0);
    }
    function u(t) {
        let e = s;
        const o = r("sites"), n = r("sites-version");
        return o && (e = o, o && n && (n !== a || "tm" !== t) && (e = function(t, e) {
            const s = JSON.parse(JSON.stringify(t));
            let o = JSON.parse(JSON.stringify(e.filter(t => "personal" !== t.name)));
            return o.forEach(t => {
                const e = s.find(e => e.name === t.name);
                e && (t.list.forEach(t => {
                    const s = e.list.findIndex(e => e.id === t.id);
                    s > -1 && (Object.keys(t).forEach(o => {
                        "data" !== o && (e.list[s][o] = t[o]);
                    }), t.isAdd = !0);
                }), t.list = t.list.filter(t => !t.isAdd), t.list.length && (e.list = e.list.concat(t.list)), 
                t.isAdd = !0);
            }), o = o.filter(t => !t.isAdd), o.length && s.push(...o), s;
        }(o, s), i("sites", e), i("sites-version", a))), "tm" === t && (e = e.filter(t => t.list && t.list.length > 0 && t.data && t.data.visible).map(t => ({
            ...t,
            show: !1
        }))), e;
    }
    const m = n("script-loaded"), d = n("page-loaded");
    const p = [ {
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
        url: /^https?:\/\/www\.acfun\.cn\/search/
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
        url: /^https?:\/\/.*\.bing\.com\/images\/search/
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
        url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/
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
        url: /^https?:\/\/search\.jd\.com\/Search/
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
    } ], w = function() {
        const t = p.find(t => t.url.test(window.location.href));
        return t ? {
            url: t.url,
            invisible: t.invisible,
            disabled: t.disabled,
            style: t.style,
            keyword: t.keyword,
            create: t.create,
            mounted: t.mounted
        } : null;
    };
    function f(t, e, s, o, a, n, r, i, l, c) {
        "boolean" != typeof r && (l = i, i = r, r = !1);
        const h = "function" == typeof s ? s.options : s;
        let u;
        if (t && t.render && (h.render = t.render, h.staticRenderFns = t.staticRenderFns, 
        h._compiled = !0, a && (h.functional = !0)), o && (h._scopeId = o), n ? (u = function(t) {
            (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), 
            e && e.call(this, l(t)), t && t._registeredComponents && t._registeredComponents.add(n);
        }, h._ssrRegister = u) : e && (u = r ? function(t) {
            e.call(this, c(t, this.$root.$options.shadowRoot));
        } : function(t) {
            e.call(this, i(t));
        }), u) if (h.functional) {
            const t = h.render;
            h.render = function(e, s) {
                return u.call(s), t(e, s);
            };
        } else {
            const t = h.beforeCreate;
            h.beforeCreate = t ? [].concat(t, u) : [ u ];
        }
        return s;
    }
    const y = {
        name: "logo",
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: t => [ "horizontal", "vertical" ].includes(t)
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
    var g = function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("a", {
            staticClass: "as-title",
            class: "as-title-" + this.mode,
            attrs: {
                href: "https://endday.github.io/all-search/",
                target: "_blank"
            }
        }, [ e("p", {
            staticClass: "as-title-inner"
        }, [ this._v("\n    All Search\n  ") ]) ]);
    };
    g._withStripped = !0;
    const v = f({
        render: g,
        staticRenderFns: []
    }, void 0, y, void 0, !1, void 0, !1, void 0, void 0, void 0);
    const b = {
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
        data: () => ({
            timeout: null
        }),
        methods: {
            clear() {
                this.timeout && clearTimeout(this.timeout);
            },
            handleMenuClick(t) {
                this.clear(), this.$emit("show", !0);
            },
            handleMouseEnter(t) {
                this.disabled || (this.clear(), this.timeout = setTimeout(() => {
                    this.$emit("show", !0);
                }, this.showTimeout));
            },
            handleMouseLeave(t) {
                this.disabled || (this.clear(), this.timeout = setTimeout(() => {
                    this.$emit("show", !1);
                }, this.hideTimeout));
            }
        }
    };
    var _ = function() {
        var t = this, e = t.$createElement;
        return (t._self._c || e)("li", {
            on: {
                click: function(e) {
                    return t.handleMenuClick(e);
                },
                mouseenter: function(e) {
                    return t.handleMouseEnter(e);
                },
                mouseleave: function(e) {
                    return t.handleMouseLeave(e);
                }
            }
        }, [ t._t("default") ], 2);
    };
    _._withStripped = !0;
    const Z = f({
        render: _,
        staticRenderFns: []
    }, void 0, b, void 0, !1, void 0, !1, void 0, void 0, void 0);
    const x = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    var k = function() {
        var t = this.$createElement;
        return (this._self._c || t)("i", {
            staticClass: "as-menu-item-icon",
            class: "icon-" + this.name
        });
    };
    k._withStripped = !0;
    const q = {
        name: "as-menu",
        components: {
            menuItem: Z,
            icon: f({
                render: k,
                staticRenderFns: []
            }, void 0, x, void 0, !1, void 0, !1, void 0, void 0, void 0)
        },
        props: {
            sites: {
                type: Array,
                default: () => []
            },
            mode: {
                type: String,
                default: "horizontal",
                validator: t => [ "horizontal", "vertical" ].includes(t)
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
            }
        },
        data: () => ({
            show: !1
        }),
        methods: {
            handleChange(t) {
                this.$emit("change", t);
            },
            getKeyword() {
                return this.$root.currentSite.keyword ? this.$root.currentSite.keyword() : function() {
                    const t = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                    return t ? "INPUT" === t.nodeName || "textarea" === t.localName ? t.value : t.textContent : "";
                }();
            },
            handleClick(t) {
                const e = this.getKeyword();
                window.location.href = t.url.replace("%s", e);
            },
            handleMouseWheelClick(t) {
                const e = this.getKeyword();
                window.open(t.url.replace("%s", e));
            },
            handleMenuShow(t, e) {
                e.show = t;
            }
        }
    };
    var C = function() {
        var t = this, e = t.$createElement, s = t._self._c || e;
        return s("ul", {
            staticClass: "as-menu",
            class: t.menuClass
        }, t._l(t.sites, (function(e) {
            return s("menu-item", {
                key: e.index,
                staticClass: "as-menu-item",
                on: {
                    show: function(s) {
                        return t.handleMenuShow(s, e);
                    }
                }
            }, [ s("div", {
                staticClass: "as-menu-item-title"
            }, [ s("icon", {
                attrs: {
                    name: e.name
                }
            }), t._v(" "), s("span", {
                domProps: {
                    textContent: t._s(e.nameZh)
                },
                on: {
                    click: function(s) {
                        return t.handleClick(e.list[0]);
                    },
                    mouseup: function(s) {
                        return "button" in s && 1 !== s.button ? null : t.handleMouseWheelClick(e.list[0]);
                    }
                }
            }) ], 1), t._v(" "), s("transition", {
                attrs: {
                    name: t.transition
                }
            }, [ e.list && e.list.length ? s("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: e.show,
                    expression: "item.show"
                } ],
                staticClass: "as-subMenu-container"
            }, [ s("ul", {
                staticClass: "as-subMenu"
            }, t._l(e.list, (function(e, o) {
                return s("li", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: e.data.visible,
                        expression: "child.data.visible"
                    } ],
                    key: o,
                    domProps: {
                        textContent: t._s(e.nameZh)
                    },
                    on: {
                        click: function(s) {
                            return t.handleClick(e);
                        },
                        mouseup: function(s) {
                            return "button" in s && 1 !== s.button ? null : t.handleMouseWheelClick(e);
                        }
                    }
                });
            })), 0) ]) : t._e() ]) ], 1);
        })), 1);
    };
    C._withStripped = !0;
    const S = f({
        render: C,
        staticRenderFns: []
    }, void 0, q, void 0, !1, void 0, !1, void 0, void 0, void 0);
    const z = {
        name: "x-dialog",
        model: {
            prop: "visible",
            event: "change"
        },
        props: {
            visible: {
                type: Boolean,
                default: !1
            },
            title: {
                type: String,
                default: ""
            },
            width: {
                type: String,
                default: ""
            }
        },
        computed: {
            style() {
                const t = {};
                return this.width && (t.width = this.width), t;
            }
        },
        methods: {
            handleClose() {
                this.$emit("change", !1);
            }
        }
    };
    var E = function() {
        var t = this, e = t.$createElement, s = t._self._c || e;
        return s("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: t.visible,
                expression: "visible"
            } ],
            staticClass: "as-dialog"
        }, [ s("div", {
            staticClass: "as-dialog-container",
            style: t.style
        }, [ s("div", {
            staticClass: "as-dialog__header"
        }, [ s("p", {
            domProps: {
                textContent: t._s(t.title)
            }
        }), t._v(" "), s("span", {
            staticClass: "as-dialog__close",
            on: {
                click: t.handleClose
            }
        }) ]), t._v(" "), s("div", {
            staticClass: "as-dialog__body"
        }, [ t._t("default") ], 2), t._v(" "), s("div", {
            staticClass: "as-dialog__footer"
        }) ]), t._v(" "), s("div", {
            staticClass: "as-dialog__mask",
            on: {
                click: t.handleClose
            }
        }) ]);
    };
    E._withStripped = !0;
    const N = {
        name: "all-search",
        components: {
            logo: v,
            asMenu: S,
            asDialog: f({
                render: E,
                staticRenderFns: []
            }, void 0, z, void 0, !1, void 0, !1, void 0, void 0, void 0)
        },
        data: () => ({
            currentSite: w(),
            sites: [],
            categoryName: "search",
            mode: "horizontal",
            dialog: !1
        }),
        watch: {
            mode: {
                handler(t, e) {
                    this.currentSite.invisible || (document.body.classList.remove(`body-${e}`), document.body.classList.add(`body-${t}`));
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
            this.initSites();
        },
        methods: {
            initSites() {
                this.sites = u("tm");
            },
            openSet() {
                window.open("https://endday.github.io/all-search/");
            },
            showDialog() {
                this.dialog = !this.dialog;
            },
            listenKey() {
                document.onkeydown = t => (t.altKey && "a" === t.key && this.showDialog(), t.preventDefault(), 
                !1), this.$once("hook:beforeDestroy", (function() {
                    document.onkeypress = null;
                }));
            }
        }
    };
    var $ = function() {
        var t = this, e = t.$createElement, s = t._self._c || e;
        return s("div", {
            class: t.asClass,
            staticStyle: {
                display: "none"
            },
            attrs: {
                id: "all-search"
            }
        }, [ s("logo", {
            attrs: {
                mode: t.mode
            }
        }), t._v(" "), s("as-menu", {
            attrs: {
                sites: t.sites,
                mode: t.mode
            }
        }), t._v(" "), s("div", {
            staticClass: "as-setting",
            on: {
                click: t.openSet
            }
        }, [ t._v("\n    设置\n  ") ]), t._v(" "), s("as-dialog", {
            model: {
                value: t.dialog,
                callback: function(e) {
                    t.dialog = e;
                },
                expression: "dialog"
            }
        }, [ t._v("\n    123\n  ") ]) ], 1);
    };
    $._withStripped = !0;
    const M = f({
        render: $,
        staticRenderFns: []
    }, void 0, N, void 0, !1, void 0, !1, void 0, void 0, void 0);
    t.config.productionTip = !1;
    const T = w(), A = new t({
        data: () => ({
            currentSite: T
        }),
        render: t => t(M)
    });
    console.log("all-search running 全搜运行中");
    const F = r("mode") || "horizontal";
    function I() {
        const t = w();
        if (!t.disabled && (t.invisible || (l("iconFont", "https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css"), 
        l("as-style", `https://cdn.jsdelivr.net/npm/all-search/build/as-style.css?v=${a}`)), 
        !document.getElementById("all-search"))) {
            const t = function() {
                let t = null;
                const e = document.getElementById("all-search");
                return e ? t = e : (t = document.createElement("div"), t.id = "all-search"), t.style.display = "none", 
                t;
            }(), e = document.body.parentElement.insertBefore(t, document.body);
            A.$mount(e), function() {
                const t = function() {
                    document.dispatchEvent(new CustomEvent(m, {
                        detail: {
                            version: a,
                            getSession: r,
                            setSession: i
                        }
                    }));
                };
                document.addEventListener(d, t), t();
            }();
        }
    }
    return T && T.style && (T.style[1] && "horizontal" === F && h(T.style[1], "as-special"), 
    T.style[2] && "vertical" === F && h(T.style[2], "as-special")), function() {
        let t = 0;
        return new Promise((e, s) => {
            if (document && document.body) e(); else {
                const o = setInterval((function() {
                    t += 1, document && document.body && (clearInterval(o), e()), 50 === t && (clearInterval(o), 
                    s(new Error("timeOut")));
                }), 200);
            }
        });
    }().then(() => {
        "www.baidu.com" === window.location.hostname ? c(() => I(), 800, !0) : I();
    }).catch(t => {
        console.error(t);
    }), A;
}(Vue);
