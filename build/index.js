// ==UserScript==
// @name         all-search 全搜，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      0.2.5b
// @description  2020年10月29日更新 新增功能，支持图形界面自定义设置分类和添加链接，无需直接修改源代码。
// @author       endday
// @license      GPL-2.0
// @update       2020/10/29
// @homepageURL  https://github.com/endday/all-search

// @noframes
// @require      https://lib.baomitu.com/vue/2.6.11/vue.js
// @resource     iconFont  https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css?v=0.2.5b
// @resource     as-style  https://cdn.jsdelivr.net/npm/all-search/build/as-style.css?v=0.2.5b
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

var allSearch = function(e) {
    "use strict";
    e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
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
    } ].map(e => ({
        ...e,
        list: e.list.map(s => {
            const {hostname: o} = function(e) {
                let s = e;
                if (s.indexOf("//") < 0) s = `//${s}`; else {
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
    const o = {
        name: "all-search",
        version: "0.2.5b",
        description: "新增功能，支持图形界面自定义设置分类和添加链接，无需直接修改源代码。",
        author: "endday",
        scripts: {
            serve: "vue-cli-service serve --fix",
            build: "vue-cli-service build",
            lint: "vue-cli-service lint",
            buildScript: "rollup -c",
            report: "vue-cli-service build --report",
            sourceMap: "vue-cli-service build --sourceMap"
        },
        main: "dist/index.js",
        dependencies: {
            "@babel/polyfill": "^7.4.3",
            axios: "^0.19.0",
            vue: "^2.6.12",
            "vue-router": "^3.4.6",
            vuedraggable: "^2.24.1",
            vuetify: "^2.2.11",
            "vuetify-loader": "^1.6.0",
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
            sass: "^1.19.0",
            "sass-loader": "^8.0.0",
            "vue-template-compiler": "^2.6.12",
            webpack: "^4.29.6"
        },
        homepage: "https://github.com/endday/all-search",
        license: "GPL-2.0",
        repository: {
            type: "git",
            url: "git@github.com:endday/all-search.git"
        }
    }.version.replace(/\./g, "");
    function a(e) {
        return e ? `__allSearch__${e}` : null;
    }
    function r(e) {
        const t = a(e);
        let s;
        if (s = window.GM_getValue ? window.GM_getValue(t) : window.localStorage.getItem(t), 
        s) try {
            return JSON.parse(s);
        } catch (e) {
            return s;
        }
        return null;
    }
    function n(e, t) {
        const s = a(e);
        if (window.GM_setValue) window.GM_setValue(s, t); else {
            const e = JSON.stringify(t);
            e && window.localStorage.setItem(s, e);
        }
    }
    function i(e) {
        if (!e) return;
        const t = document.createElement("style");
        t.innerHTML = e, t.class = "all-search-style", document.getElementsByTagName("head")[0].appendChild(t);
    }
    function l(e, t) {
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
    function c(e, t, s) {
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
        c((function() {
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
        const a = r("sites"), i = r("sites-version");
        return a && (t = a, a && i && (i !== o || "tm" !== e) && (t = function(e, t) {
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
        }(a, s), n("sites", t), n("sites-version", o))), console.log(typeof t), "tm" === e && (t = t.filter(e => e.list && e.list.length > 0 && e.data && e.data.visible).map(e => ({
            ...e,
            show: !1
        }))), t;
    }
    function m(e, t, s, o, a, r, n, i, l, c) {
        "boolean" != typeof n && (l = i, i = n, n = !1);
        const h = "function" == typeof s ? s.options : s;
        let u;
        if (e && e.render && (h.render = e.render, h.staticRenderFns = e.staticRenderFns, 
        h._compiled = !0, a && (h.functional = !0)), o && (h._scopeId = o), r ? (u = function(e) {
            (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), 
            t && t.call(this, l(e)), e && e._registeredComponents && e._registeredComponents.add(r);
        }, h._ssrRegister = u) : t && (u = n ? function(e) {
            t.call(this, c(e, this.$root.$options.shadowRoot));
        } : function(e) {
            t.call(this, i(e));
        }), u) if (h.functional) {
            const e = h.render;
            h.render = function(t, s) {
                return u.call(s), e(t, s);
            };
        } else {
            const e = h.beforeCreate;
            h.beforeCreate = e ? [].concat(e, u) : [ u ];
        }
        return s;
    }
    const d = {
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
    var p = function() {
        var e = this.$createElement, t = this._self._c || e;
        return t("a", {
            staticClass: "as-title",
            class: "as-title-" + this.mode,
            attrs: {
                href: "https://endday.github.io/all-search/",
                target: "_blank"
            }
        }, [ t("p", {
            staticClass: "as-title-inner"
        }, [ this._v("\n    All Search\n  ") ]) ]);
    };
    p._withStripped = !0;
    const w = m({
        render: p,
        staticRenderFns: []
    }, void 0, d, void 0, !1, void 0, !1, void 0, void 0, void 0);
    const g = {
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
    var y = function() {
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
    y._withStripped = !0;
    const f = m({
        render: y,
        staticRenderFns: []
    }, void 0, g, void 0, !1, void 0, !1, void 0, void 0, void 0);
    const v = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    var b = function() {
        var e = this.$createElement;
        return (this._self._c || e)("i", {
            staticClass: "as-menu-item-icon",
            class: "icon-" + this.name
        });
    };
    b._withStripped = !0;
    const Z = {
        name: "as-menu",
        components: {
            menuItem: f,
            icon: m({
                render: b,
                staticRenderFns: []
            }, void 0, v, void 0, !1, void 0, !1, void 0, void 0, void 0)
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
            }
        },
        data: () => ({
            show: !1
        }),
        methods: {
            handleChange(e) {
                this.$emit("change", e);
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
            }
        }
    };
    var x = function() {
        var e = this, t = e.$createElement, s = e._self._c || t;
        return s("ul", {
            staticClass: "as-menu",
            class: e.menuClass
        }, e._l(e.sites, (function(t) {
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
                },
                on: {
                    click: function(s) {
                        return e.handleClick(t.list[0]);
                    },
                    mousedown: function(s) {
                        return e.handleMouseWheelClick(s, t.list[0]);
                    }
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
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.data.visible,
                        expression: "child.data.visible"
                    } ],
                    key: o,
                    domProps: {
                        textContent: e._s(t.nameZh)
                    },
                    on: {
                        click: function(s) {
                            return e.handleClick(t);
                        },
                        mousedown: function(s) {
                            return e.handleMouseWheelClick(s, t);
                        }
                    }
                });
            })), 0) ]) ]) ], 1);
        })), 1);
    };
    x._withStripped = !0;
    const _ = {
        name: "all-search",
        components: {
            logo: w,
            asMenu: m({
                render: x,
                staticRenderFns: []
            }, void 0, Z, void 0, !1, void 0, !1, void 0, void 0, void 0)
        },
        data: () => ({
            sites: [],
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
            this.initSites(), this.categoryName = r("categoryName") || this.categoryName, this.mode = r("mode") || this.mode;
        },
        methods: {
            initSites() {
                this.sites = u("tm");
            },
            changeCategory(e) {
                n("categoryName", e), this.categoryName = e;
            },
            changeMode() {
                "horizontal" === this.mode ? this.mode = "vertical" : this.mode = "horizontal", 
                n("mode", this.mode), window.location.reload();
            },
            openSet() {
                window.open("https://endday.github.io/all-search/");
            }
        }
    };
    var k = function() {
        var e = this, t = e.$createElement, s = e._self._c || t;
        return s("div", {
            class: e.asClass,
            style: {
                display: "none"
            },
            attrs: {
                id: "all-search"
            }
        }, [ s("logo", {
            attrs: {
                mode: e.mode
            }
        }), e._v(" "), s("as-menu", {
            attrs: {
                sites: e.sites,
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
        }, [ e._v("\n    切换模式\n  ") ]), e._v(" "), s("div", {
            staticClass: "as-setting",
            on: {
                click: e.openSet
            }
        }, [ e._v("\n    设置\n  ") ]) ], 1);
    };
    k._withStripped = !0;
    const q = m({
        render: k,
        staticRenderFns: []
    }, void 0, _, void 0, !1, void 0, !1, void 0, void 0, void 0), C = [ {
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
    } ], S = function() {
        const e = C.find(e => e.url.test(window.location.href));
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
    e.config.productionTip = !1;
    const N = S(), z = new e({
        data: () => ({
            currentSite: N
        }),
        render: e => e(q)
    });
    console.log("all-search running 全搜运行中");
    const E = r("mode") || "horizontal";
    function M() {
        const e = S();
        if (!e.disabled) {
            if (e.invisible || (l("iconFont", "https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css"), 
            l("as-style", `https://cdn.jsdelivr.net/npm/all-search/build/as-style.css?v=${o}`)), 
            !document.getElementById("all-search")) {
                const e = function() {
                    let e = null;
                    const t = document.getElementById("all-search");
                    return t ? e = t : (e = document.createElement("div"), e.id = "all-search"), e.style.display = "none", 
                    e;
                }(), t = document.body.parentElement.insertBefore(e, document.body);
                z.$mount(t), [ /^https?:\/\/endday\.github\.io/, /^https?:\/\/endday\.gitee\.io/, /^http:\/\/localhost:8080\/all-search\// ].some(e => e.test(location.href)) && c(() => {
                    const e = document.getElementById("save-btn");
                    if (e) {
                        e.style.display = "unset";
                        const t = e.onclick;
                        return e.onclick = () => {
                            t && t(), n("sites", window.localStorage.getItem("__allSearch__sites")), n("sites-version", o);
                        }, !0;
                    }
                }, 800);
            }
        }
    }
    return N && N.style && (N.style[1] && "horizontal" === E && h(N.style[1], "as-special"), 
    N.style[2] && "vertical" === E && h(N.style[2], "as-special")), function() {
        const e = document.getElementsByTagName("head")[0], t = {
            childList: !0
        }, s = function(e) {
            for (const t of e) t.removedNodes.length && "STYLE" === t.removedNodes[0].nodeName && "as-style" === t.removedNodes[0].class && i(t.removedNodes[0].innerText);
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
        "www.baidu.com" === window.location.hostname ? c(() => M(), 800, !0) : M();
    }).catch(e => {
        console.error(e);
    }), z;
}(Vue);
