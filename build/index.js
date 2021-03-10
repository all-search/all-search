// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      1.0.2
// @description  2021年3月11日更新 新增功能，支持图形界面自定义设置分类和添加链接，无需直接修改源代码。
// @author       endday
// @license      GPL-2.0
// @update       2021/3/11
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.prod.js
// @resource     iconFont  https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search@1.0.2/build/as-style.css
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
// @include      /^http:\/\/localhost:8080\/all-search\//

// ==/UserScript==
/* eslint-disable */

!function(e) {
    "use strict";
    let t = document.createElement("a");
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
    } ].map(e => ({
        ...e,
        list: e.list.map(s => {
            const {hostname: o} = function(e) {
                let s = e;
                if (s.indexOf("//") < 0) s = "//" + s; else {
                    if (!(s.indexOf("//") > -1)) return t;
                    {
                        const e = s.toLowerCase();
                        e.startsWith("http://") || e.startsWith("https://") || e.startsWith("ftp://") || e.startsWith("files://") || (s = s.replace(/.*\/\//, "//"));
                    }
                }
                return t.href = s, {
                    href: t.href,
                    origin: t.origin,
                    protocol: t.protocol,
                    host: t.host,
                    hostname: t.hostname,
                    port: t.port,
                    pathname: t.pathname,
                    search: t.search,
                    hash: t.hash
                };
            }(s.url);
            return {
                ...s,
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
    var o = "1.0.2";
    e.reactive({
        tmVersion: ""
    });
    const a = o;
    function r(e) {
        return e ? "__allSearch__" + e : null;
    }
    let n = function(e) {
        const t = r(e);
        let s;
        if (s = window.GM_getValue ? window.GM_getValue(t) : window.localStorage.getItem(t), 
        s) try {
            return JSON.parse(s);
        } catch (e) {
            return s;
        }
        return null;
    }, l = function(e, t) {
        const s = r(e);
        if (window.GM_setValue) window.GM_setValue(s, t); else {
            const e = JSON.stringify(t);
            e && window.localStorage.setItem(s, e);
        }
    };
    function c(e, t) {
        let s;
        window.GM_getResourceText && (s = window.GM_getResourceText(e)), s ? h(s, e) : function(e, t) {
            if (!e) return;
            if (t) {
                const e = document.styleSheets;
                for (let s = 0; s < e.length; s++) if (e[s].ownerNode.className === t) return;
            }
            const s = document.createElement("link");
            s.href = e, s.rel = "stylesheet", s.type = "text/css", s.crossorigin = "anonymous", 
            document.getElementsByTagName("head")[0].appendChild(s);
        }(t, e);
    }
    function i(e, t, s) {
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
    }
    function h(e, t, s, o) {
        i((function() {
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
    function u(e) {
        let t = s;
        const o = n("sites"), r = n("sites-version");
        return o && (t = o, o && r && (r !== a || "tm" !== e) && (t = function(e, t) {
            const s = JSON.parse(JSON.stringify(e));
            let o = JSON.parse(JSON.stringify(t.filter(e => "personal" !== e.name)));
            return o.forEach(e => {
                const t = s.find(t => t.name === e.name);
                t && (e.list.forEach(e => {
                    const s = t.list.findIndex(t => t.id === e.id);
                    s > -1 && (Object.keys(e).forEach(o => {
                        "data" !== o && (t.list[s][o] = e[o]);
                    }), e.isAdd = !0);
                }), e.list = e.list.filter(e => !e.isAdd), e.list.length && (t.list = t.list.concat(e.list)), 
                e.isAdd = !0);
            }), o = o.filter(e => !e.isAdd), o.length && s.push(...o), s;
        }(o, s), l("sites", t), l("sites-version", a))), "tm" === e && (t = t.filter(e => e.list && e.list.length > 0 && e.data && e.data.visible).map(e => ({
            ...e,
            show: !1
        }))), t;
    }
    const m = r("script-loaded"), p = r("page-loaded");
    const d = [ {
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
    }, {
        url: /^http:\/\/localhost:8080\/all-search\//,
        invisible: !0
    } ], w = function() {
        const e = d.find(e => e.url.test(window.location.href));
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
    var g = {
        name: "logo",
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].includes(e)
            }
        }
    };
    const y = e.createVNode("p", {
        class: "as-title-inner"
    }, " All Search ", -1);
    g.render = function(t, s, o, a, r, n) {
        return e.openBlock(), e.createBlock("a", {
            class: [ "as-title", "as-title-" + o.mode ],
            href: "https://endday.github.io/all-search/",
            target: "_blank"
        }, [ y ], 2);
    }, g.__file = "src/as-script/components/logo.vue";
    var f = {
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
            let s = null;
            const o = () => {
                s && clearTimeout(s);
            };
            return {
                handleMouseEnter: a => {
                    e.disabled || (o(), s = setTimeout(() => {
                        t.emit("show", !0);
                    }, e.showTimeout));
                },
                handleMouseLeave: a => {
                    e.disabled || (o(), s = setTimeout(() => {
                        t.emit("show", !1);
                    }, e.hideTimeout));
                }
            };
        }
    };
    f.render = function(t, s, o, a, r, n) {
        return e.openBlock(), e.createBlock("li", {
            onMouseenter: s[1] || (s[1] = e => a.handleMouseEnter(e)),
            onMouseleave: s[2] || (s[2] = e => a.handleMouseLeave(e))
        }, [ e.renderSlot(t.$slots, "default") ], 32);
    }, f.__file = "src/as-script/components/menuItem.vue";
    var b = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    b.render = function(t, s, o, a, r, n) {
        return e.openBlock(), e.createBlock("i", {
            class: [ "as-menu-item-icon", "icon-" + o.name ]
        }, null, 2);
    }, b.__file = "src/as-script/components/icon.vue";
    var v = {
        name: "as-menu",
        components: {
            menuItem: f,
            icon: b
        },
        props: {
            sites: {
                type: Array,
                default: () => []
            },
            mode: {
                type: String,
                default: "horizontal",
                validator: e => [ "horizontal", "vertical" ].includes(e)
            }
        },
        setup(t) {
            const s = w(), o = e.reactive({
                showTimeout: 50,
                hideTimeout: 200
            }), a = e.computed(() => "horizontal" === t.mode ? "drop" : "fade"), r = () => s.keyword ? s.keyword() : function() {
                const e = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
                return e ? "INPUT" === e.nodeName || "textarea" === e.localName ? e.value : e.textContent : "";
            }();
            return {
                data: o,
                transition: a,
                handleClick: (e, t) => {
                    const s = r();
                    t ? window.open(e.url.replace("%s", s)) : window.location.href = e.url.replace("%s", s);
                },
                handleMenuShow: (e, t) => {
                    t.show = e;
                }
            };
        }
    };
    const k = {
        class: "as-menu"
    }, Z = {
        class: "as-menu-item-title"
    }, x = {
        key: 0,
        class: "as-subMenu-container"
    }, q = {
        class: "as-subMenu"
    };
    v.render = function(t, s, o, a, r, n) {
        const l = e.resolveComponent("icon"), c = e.resolveComponent("menu-item");
        return e.openBlock(), e.createBlock("ul", k, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(o.sites, t => (e.openBlock(), 
        e.createBlock(c, {
            class: "as-menu-item",
            key: t.index,
            showTimeout: a.data.showTimeout,
            hideTimeout: a.data.hideTimeout,
            onShow: e => a.handleMenuShow(e, t)
        }, {
            default: e.withCtx(() => [ e.createVNode("div", Z, [ e.createVNode(l, {
                name: t.name
            }, null, 8, [ "name" ]), e.createVNode("span", {
                textContent: e.toDisplayString(t.nameZh),
                onClick: e => a.handleClick(t.list[0]),
                onMouseup: e.withModifiers(e => a.handleClick(t.list[0], !0), [ "middle" ])
            }, null, 40, [ "textContent", "onClick", "onMouseup" ]) ]), e.createVNode(e.Transition, {
                name: a.transition
            }, {
                default: e.withCtx(() => [ t.list && t.list.length ? e.withDirectives((e.openBlock(), 
                e.createBlock("div", x, [ e.createVNode("ul", q, [ (e.openBlock(!0), e.createBlock(e.Fragment, null, e.renderList(t.list, (t, s) => e.withDirectives((e.openBlock(), 
                e.createBlock("li", {
                    key: s,
                    textContent: e.toDisplayString(t.nameZh),
                    onClick: e => a.handleClick(t),
                    onMouseup: e.withModifiers(e => a.handleClick(t, !0), [ "middle" ])
                }, null, 40, [ "textContent", "onClick", "onMouseup" ])), [ [ e.vShow, t.data.visible ] ])), 128)) ]) ], 512)), [ [ e.vShow, t.show ] ]) : e.createCommentVNode("v-if", !0) ]),
                _: 2
            }, 1032, [ "name" ]) ]),
            _: 2
        }, 1032, [ "showTimeout", "hideTimeout", "onShow" ]))), 128)) ]);
    }, v.__file = "src/as-script/components/menu.vue";
    var _ = {
        name: "as-dialog",
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
        setup: (t, s) => ({
            style: e.computed(() => {
                const e = {};
                return t.width && (e.width = t.width), e;
            }),
            handleClose: () => {
                s.emit("change", !1);
            }
        })
    };
    const C = {
        class: "as-dialog"
    }, S = {
        class: "as-dialog__header"
    }, N = {
        class: "as-dialog__body"
    }, B = e.createVNode("div", {
        class: "as-dialog__footer"
    }, null, -1);
    _.render = function(t, s, o, a, r, n) {
        return e.withDirectives((e.openBlock(), e.createBlock("div", C, [ e.createVNode("div", {
            class: "as-dialog-container",
            style: a.style
        }, [ e.createVNode("div", S, [ e.createVNode("p", {
            textContent: e.toDisplayString(o.title)
        }, null, 8, [ "textContent" ]), e.createVNode("span", {
            class: "as-dialog__close",
            onClick: s[1] || (s[1] = (...e) => a.handleClose && a.handleClose(...e))
        }) ]), e.createVNode("div", N, [ e.renderSlot(t.$slots, "default") ]), B ], 4), e.createVNode("div", {
            class: "as-dialog__mask",
            onClick: s[2] || (s[2] = (...e) => a.handleClose && a.handleClose(...e))
        }) ], 512)), [ [ e.vShow, o.visible ] ]);
    }, _.__file = "src/as-script/components/dialog.vue";
    var z = {
        name: "search-dialog",
        components: {
            asDialog: _
        },
        setup() {
            const {visible: t} = function() {
                const t = e.ref(!1);
                return e.onMounted(() => {
                    document.onkeydown = e => {
                        e.altKey && "a" === e.key && (t.value = !t.value);
                    };
                }), e.onUnmounted(() => {
                    document.onkeydown = null;
                }), {
                    visible: t
                };
            }();
            return {
                visible: t
            };
        }
    };
    const M = e.withScopeId("data-v-5c8ba7d4")((t, s, o, a, r, n) => {
        const l = e.resolveComponent("asDialog");
        return e.openBlock(), e.createBlock(l, {
            visible: a.visible
        }, null, 8, [ "visible" ]);
    });
    z.render = M, z.__scopeId = "data-v-5c8ba7d4", z.__file = "src/as-script/components/search-dialog.vue";
    var E = {
        name: "all-search",
        components: {
            logo: g,
            asMenu: v,
            searchDialog: z
        },
        setup() {
            const t = w(), s = e.ref("horizontal"), o = e.reactive(u("tm")), a = document.body, r = document.getElementById("all-search");
            return e.watch(s, e => {
                t.invisible || (a.classList.remove("body-horizontal", "body-vertical"), a.classList.add("body-" + e), 
                r.classList.remove("as-vertical", "as-horizontal"), r.classList.add("as-" + e));
            }), a.classList.add("body-horizontal"), {
                currentSite: t,
                sites: o,
                mode: s,
                openSet: () => {
                    window.open("https://endday.gitee.io/all-search/");
                }
            };
        }
    };
    E.render = function(t, s, o, a, r, n) {
        const l = e.resolveComponent("logo"), c = e.resolveComponent("as-menu"), i = e.resolveComponent("searchDialog");
        return e.openBlock(), e.createBlock(e.Fragment, null, [ e.createVNode(l, {
            mode: a.mode
        }, null, 8, [ "mode" ]), e.createVNode(c, {
            sites: a.sites,
            mode: a.mode
        }, null, 8, [ "sites", "mode" ]), e.createVNode("div", {
            class: "as-setting",
            onClick: s[1] || (s[1] = (...e) => a.openSet && a.openSet(...e))
        }, " 设置 "), e.createVNode(i) ], 64);
    }, E.__file = "src/as-script/index.vue";
    const V = w(), T = e.createApp(E);
    console.log("all-search running 全搜运行中(production)");
    const D = n("mode") || "horizontal";
    function I() {
        if (V.disabled) return;
        V.invisible || (c("iconFont", "https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css"), 
        c("as-style", `https://cdn.jsdelivr.net/npm/all-search@${a}/build/as-style.css`));
        if (!document.getElementById("all-search")) {
            const e = function() {
                let e = null;
                const t = document.getElementById("all-search");
                return t ? e = t : (e = document.createElement("div"), e.id = "all-search"), e.style.display = "none", 
                e.classList.add("as-horizontal"), e;
            }();
            document.body.parentElement.insertBefore(e, document.body), T.mount("#all-search"), 
            function() {
                const e = function() {
                    document.dispatchEvent(new CustomEvent(m, {
                        detail: {
                            version: a,
                            getSession: n,
                            setSession: l
                        }
                    }));
                };
                document.addEventListener(p, e), e();
            }();
        }
    }
    V && V.style && (V.style[1] && "horizontal" === D && h(V.style[1], "as-special"), 
    V.style[2] && "vertical" === D && h(V.style[2], "as-special")), function() {
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
        "www.baidu.com" === window.location.hostname ? i(() => I(), 800, !0) : I();
    }).catch(e => {
        console.error(e);
    });
}(Vue);
