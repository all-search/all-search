// ==UserScript==
// @name         all-search 全搜，搜索引擎快捷跳转，支持任意网站展示
// @version      1.4.4
// @description  2023-1-18更新 搜索辅助增强，任意跳转，无需代码适配，支持任意网站展示
// @author       endday
// @license      GPL-3.0-only
// @homepageURL  https://github.com/endday/all-search
// @updateURL    https://raw.github.com/endday/all-search/release/index.user.js
// @downloadURL  https://raw.github.com/endday/all-search/release/index.user.js
// @supportURL
// @noframes
// @include      *
// @require      https://unpkg.com/vue@3.2.33/dist/vue.global.prod.js
// @require      https://unpkg.com/all-search@1.3.17/lib/popper-lite.min.js
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText

// ==/UserScript==

(function() {
    "use strict";
    var name$2 = "all-search";
    var version$1 = "1.4.4";
    var keywords = [ "searchEngineJump", "tool", "tamperMonkey", "web", "javascript", "vue3" ];
    var description = "A top fixed menu that allows you to jump between various search engines, build based on Vue, and use rollup.";
    var author = "endday";
    var homepage = "https://github.com/endday/all-search";
    var license = "GPL-3.0-only";
    var repository = {
        type: "git",
        url: "git@github.com:endday/all-search.git"
    };
    var files = [ "dist", "lib" ];
    var unpkg = "dist/index.user.js";
    var jsdelivr = "dist/index.user.js";
    var packageManager = "pnpm@7.18.0";
    var scripts = {
        serve: "vue-cli-service serve --fix",
        tmServe: "vue-cli-service serve --fix --tm",
        build: "vue-cli-service build",
        lint: "vue-cli-service lint",
        pretmBuild: "npm run lint",
        tmDev: "cross-env NODE_ENV=development rollup -c -w",
        tmBuild: "cross-env NODE_ENV=production rollup -c",
        prepare: "husky install"
    };
    var dependencies = {
        "@element-plus/icons-vue": "^2.0.4",
        "@popperjs/core": "^2.9.2",
        axios: "^0.21.4",
        "core-js": "^3.9.1",
        "element-plus": "^2.2.22",
        jsoneditor: "^9.9.0",
        "resize-observer-polyfill": "^1.5.1",
        vue: "^3.2.36",
        "vue-draggable-next": "^2.0.1",
        "vue-router": "^4.0.5"
    };
    var devDependencies = {
        "@babel/eslint-parser": "^7.19.1",
        "@commitlint/cli": "^17.1.2",
        "@commitlint/config-conventional": "^17.1.0",
        "@rollup/plugin-babel": "^5.3.1",
        "@rollup/plugin-commonjs": "^22.0.0",
        "@rollup/plugin-json": "^4.0.3",
        "@rollup/plugin-node-resolve": "^13.3.0",
        "@rollup/plugin-replace": "^4.0.0",
        "@rollup/plugin-terser": "^0.2.0",
        "@vitejs/plugin-vue": "^2.3.3",
        "@vue/cli-plugin-babel": "^5.0.0",
        "@vue/cli-plugin-eslint": "^5.0.0",
        "@vue/cli-service": "^5.0.0",
        "@vue/compiler-sfc": "^3.0.7",
        autoprefixer: "^10.4.7",
        "babel-plugin-import": "^1.13.3",
        "cross-env": "^7.0.3",
        eslint: "^7.32.0",
        "eslint-plugin-vue": "^7.7.0",
        husky: "^8.0.1",
        "lint-staged": "^13.1.0",
        postcss: "^8.4.13",
        rollup: "^2.72.1",
        "rollup-plugin-delete": "^1.2.0",
        "rollup-plugin-external-globals": "^0.6.1",
        "rollup-plugin-styles": "^4.0.0",
        sass: "^1.32.8",
        "sass-loader": "^10.1.1",
        vite: "^2.6.7"
    };
    var pkg = {
        name: name$2,
        version: version$1,
        keywords: keywords,
        description: description,
        author: author,
        homepage: homepage,
        license: license,
        repository: repository,
        files: files,
        unpkg: unpkg,
        jsdelivr: jsdelivr,
        packageManager: packageManager,
        scripts: scripts,
        dependencies: dependencies,
        devDependencies: devDependencies
    };
    Vue.reactive({
        tmVersion: ""
    });
    const version = pkg.version;
    function getQueryString(name, url) {
        url = url || window.location.href;
        const r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
        const m = url.match(r);
        return decodeURIComponent(!m ? "" : m[2]);
    }
    function checkBody() {
        let time = 0;
        return new Promise(((resolve, reject) => {
            if (document && document.body) {
                resolve();
            } else {
                const id = setInterval((function() {
                    time += 1;
                    if (document && document.body) {
                        clearInterval(id);
                        resolve();
                    }
                    if (time === 50) {
                        clearInterval(id);
                        reject(new Error("timeOut"));
                    }
                }), 200);
                if ([ "complete", "loaded", "interactive" ].includes(document.readyState)) {
                    if (document && document.body) {
                        clearInterval(id);
                        resolve();
                    }
                } else {
                    document.addEventListener("DOMContentLoaded", (function() {
                        if (document && document.body) {
                            clearInterval(id);
                            resolve();
                        }
                    }));
                }
            }
        }));
    }
    function getName(name) {
        if (name) {
            return `__allSearch__${name}`;
        }
        return null;
    }
    function isJson(str) {
        if (typeof str !== "string") {
            return false;
        }
        const char = str.charAt(0);
        if (char !== "[" && char !== "{") {
            return false;
        }
        try {
            return typeof JSON.parse(str) === "object";
        } catch (e) {
            return false;
        }
    }
    let getSession = function(name) {
        const formatName = getName(name);
        let item;
        if (window.GM_getValue) {
            item = window.GM_getValue(formatName);
        } else {
            item = window.localStorage.getItem(formatName);
        }
        if (item) {
            if (isJson(item)) {
                try {
                    return JSON.parse(item);
                } catch (e) {
                    return item;
                }
            } else {
                return item;
            }
        }
        return null;
    };
    let setSession = function(name, value) {
        const formatName = getName(name);
        if (window.GM_setValue) {
            window.GM_setValue(formatName, value);
        } else {
            const item = JSON.stringify(value);
            if (item) {
                window.localStorage.setItem(formatName, item);
            }
        }
    };
    let delSession = function(name) {
        const formatName = getName(name);
        if (window.GM_deleteValue) {
            window.GM_deleteValue(formatName);
        } else {
            window.localStorage.removeItem(formatName);
        }
    };
    function getAsRoot() {
        return document.getElementById("all-search");
    }
    function createAsRoot() {
        const el = document.createElement("div");
        el.id = "all-search";
        return el;
    }
    const scriptLoaded = getName("script-loaded");
    const pageLoaded = getName("page-loaded");
    function passTmMethods() {
        const emit = function() {
            document.dispatchEvent(new CustomEvent(scriptLoaded, {
                detail: {
                    version: version,
                    getSession: getSession,
                    setSession: setSession
                }
            }));
        };
        document.addEventListener(pageLoaded, emit);
        emit();
    }
    const isMobile = function() {
        return /mobile|android|webos|iphone|ipod|blackberry|iphone os|ipad/i.test(navigator.userAgent);
    };
    function delAsDataSet(item) {
        if (item.dataset) {
            delete item.dataset.asMarginTop;
            delete item.dataset.asTransform;
            delete item.dataset.asBorderTop;
        }
    }
    function getParent(el) {
        let current = el;
        let go = true;
        while (go && current.offsetParent) {
            if (current.offsetParent.tagName === "BODY") {
                go = false;
            } else {
                current = current.offsetParent;
            }
        }
        const style = window.getComputedStyle(current);
        if (style.position !== "fixed") {
            delAsDataSet(current);
            return null;
        }
        return current;
    }
    function getRealFixedNode(item) {
        if (!item || !isElement(item)) {
            return null;
        }
        const style = window.getComputedStyle(item);
        if (style.display === "none") {
            return null;
        } else if (style.position === "fixed") {
            return item;
        } else if (style.position === "absolute") {
            return getParent(item);
        } else {
            return null;
        }
    }
    function isElement(obj) {
        return obj && obj instanceof Element && obj.nodeType === 1 && obj.tagName !== undefined;
    }
    function changeStyle(item) {
        if (!item || !isElement(item)) {
            return;
        }
        const style = window.getComputedStyle(item);
        const styleMap = item.computedStyleMap && item.computedStyleMap();
        const top = styleMap ? styleMap.get("top").value : null;
        if (top === "auto") {
            return;
        } else if (style.top === "0px") {
            item.style.top = "0px";
        }
        if (item.dataset.asMarginTop || item.dataset.asTransform || item.dataset.asBorderTop) {
            return;
        }
        const marginTop = style.marginTop;
        const transform = style.transform;
        const transition = style.transition;
        if (marginTop === "0px" && !transition.includes("margin")) {
            item.dataset.asHasSet = "asMarginTop";
            item.dataset.asMarginTop = "1";
        } else if (transform === "none") {
            item.dataset.asHasSet = "asTransform";
            item.dataset.asTransform = "1";
        } else {
            item.dataset.asHasSet = "asBorderTop";
            item.dataset.asBorderTop = "1";
        }
    }
    let isSelfChange = false;
    function getFixedNodeList(list, deep = false) {
        const weakSet = new WeakSet;
        const newList = [];
        const nodes = list.filter((item => item)).map((item => {
            delAsDataSet(item);
            if (deep) {
                Array.from(item.querySelectorAll("*")).map((item => {
                    delAsDataSet(item);
                    return getRealFixedNode(item);
                })).filter((item => item)).forEach((item => {
                    if (!weakSet.has(item)) {
                        newList.push(item);
                        weakSet.add(item);
                    }
                }));
            }
            return getRealFixedNode(item);
        })).filter((item => item));
        nodes.forEach((item => {
            if (!weakSet.has(item)) {
                newList.push(item);
                weakSet.add(item);
            }
        }));
        return newList;
    }
    function fixedDomPosition() {
        checkBody().then((() => {
            const nodes = Array.from(document.body.querySelectorAll("*")).filter((item => item.tagName !== "STYLE"));
            getFixedNodeList(nodes).forEach((item => {
                changeStyle(item);
            }));
        }));
    }
    function mutationObserver() {
        const targetNode = document.body;
        const config = {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: [ "style", "class" ]
        };
        const callback = function(mutationsList) {
            if (isSelfChange) {
                isSelfChange = false;
            } else {
                isSelfChange = true;
                const root = getAsRoot();
                const filterNodes = mutationsList.filter((mutation => mutation.type === "attributes" && [ "style", "class", "id" ].includes(mutation.attributeName) || mutation.type === "childList" && mutation.addedNodes.length && ![ "BODY", "STYLE" ].includes(mutation.target.tagName) && !root.contains(mutation.target))).map((mutation => mutation.target));
                getFixedNodeList(filterNodes, true).forEach((item => {
                    changeStyle(item);
                }));
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
    function initSpecialStyle() {
        fixedDomPosition();
        mutationObserver();
    }
    function withHookBefore(originalFn, hookFn) {
        return function() {
            if (hookFn.apply(this, arguments) === false) {
                return;
            }
            return originalFn.apply(this, arguments);
        };
    }
    function withHookAfter(originalFn, hookFn) {
        return function() {
            const output = originalFn.apply(this, arguments);
            hookFn.apply(this, arguments);
            return output;
        };
    }
    const protectStyle = function() {
        if (Node.prototype.__as_hooks__) {
            return;
        }
        Node.prototype.removeChild = withHookBefore(Node.prototype.removeChild, (e => {
            if (e && e.tagName === "STYLE") {
                return !(e.classList.contains("as-icon") || e.classList.contains("as-style") || e.classList.contains("elPopover") || e.classList.contains("elScrollbar"));
            }
            return true;
        }));
        Node.prototype.__as_hooks__ = true;
    };
    const changeBodyStyle = function(modeRef, remove = true) {
        const mode = Vue.unref(modeRef);
        const el = getAsRoot();
        el.classList.remove("body-vertical", "body-horizontal");
        if (!remove) {
            el.classList.add(`body-${mode}`);
        }
    };
    var search = [ {
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
        nameZh: "搜狗",
        url: "https://www.sogou.com/web?query=%s"
    }, {
        nameZh: "Yandex",
        url: "https://yandex.com/search/?text=%s"
    } ];
    var translate = [ {
        nameZh: "百度翻译",
        url: "http://fanyi.baidu.com/#auto/zh/%s"
    }, {
        nameZh: "火山翻译",
        url: "https://translate.volcengine.com/translate?source_language=detect&target_language=en&text=%s"
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
    } ];
    var developer = [ {
        nameZh: "开发者搜索",
        url: "https://kaifa.baidu.com/searchPage?wd=%s&module=SEARCH"
    }, {
        nameZh: "MDN",
        url: "https://developer.mozilla.org/zh-CN/search?q=%s"
    }, {
        nameZh: "stackoverflow",
        url: "https://stackoverflow.com/search?q=%s"
    }, {
        nameZh: "掘金",
        url: "https://juejin.cn/search?query=%s"
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
    } ];
    var video = [ {
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
    } ];
    var music = [ {
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
    } ];
    var news = [ {
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
    } ];
    var social = [ {
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
    } ];
    var knowledge = [ {
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
        url: "https://zh.moegirl.org.cn/index.php?search=%s",
        icon: "https://zh.moegirl.org.cn/favicon.ico"
    }, {
        nameZh: "果壳",
        url: "http://www.guokr.com/search/all/?wd=%s"
    }, {
        nameZh: "Quora",
        url: "https://www.quora.com/search?q=%s"
    } ];
    var image = [ {
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
    } ];
    var shopping = [ {
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
    } ];
    var disk = [ {
        nameZh: "百度网盘",
        url: "https://pan.baidu.com/disk/main#/index?category=all&search=%s"
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
    } ];
    const list$2 = [ {
        nameZh: "搜索",
        name: "search",
        list: search
    }, {
        nameZh: "翻译",
        name: "translate",
        list: translate
    }, {
        nameZh: "视频",
        name: "video",
        list: video
    }, {
        nameZh: "购物",
        name: "shopping",
        list: shopping
    }, {
        nameZh: "音乐",
        name: "music",
        list: music
    }, {
        nameZh: "开发",
        name: "developer",
        list: developer
    }, {
        nameZh: "新闻",
        name: "news",
        list: news
    }, {
        nameZh: "社交",
        name: "social",
        list: social
    }, {
        nameZh: "百科",
        name: "knowledge",
        list: knowledge
    }, {
        nameZh: "图片",
        name: "image",
        list: image
    }, {
        nameZh: "网盘",
        name: "disk",
        list: disk
    }, {
        nameZh: "常用",
        name: "personal",
        list: []
    } ].map((item => ({
        ...item,
        data: {
            visible: true
        },
        list: item.list.map((child => ({
            ...child,
            data: {
                visible: true
            }
        })))
    })));
    var toolbar$1 = [ {
        nameZh: "百度",
        url: "https://www.baidu.com/s?wd=%s&ie=utf-8"
    }, {
        nameZh: "百度翻译",
        url: "https://fanyi.baidu.com/#auto/zh/%s"
    } ].map((item => ({
        ...item,
        data: {
            visible: true
        }
    })));
    function initSites(type) {
        let sitesData = getSession("sites") || list$2;
        if (type === "tm") {
            sitesData = sitesData.filter((item => Array.isArray(item.list) && item.list.length > 0 && item.data && item.data.visible)).map((item => ({
                ...item,
                show: false
            })));
        }
        return sitesData;
    }
    function initToolbar(opt = {
        type: "",
        reset: false
    }) {
        const toolbarClone = JSON.parse(JSON.stringify(toolbar$1));
        const list = opt.reset ? toolbarClone : getSession("toolbar") || toolbarClone;
        if (opt.type === "tm") {
            return list.filter((item => item.data && item.data.visible)).map((item => ({
                nameZh: item.nameZh,
                url: item.url
            })));
        }
        return list.map((item => ({
            nameZh: item.nameZh,
            url: item.url,
            data: item.data
        })));
    }
    const width = 100;
    const list$1 = [ {
        url: /\/\/www\.google\.com(.hk)?\/search/
    }, {
        url: /\/\/www\.baidu\.com\/(s|baidu)\?/
    }, {
        url: /\/\/[^.]*\.bing\.com\/search/
    }, {
        url: /\/\/duckduckgo\.com\/*/
    }, {
        url: /\/\/searx\.me\/\?q/
    }, {
        url: /\/\/www\.sogou\.com\/(?:web|s)/,
        selectors: "#upquery"
    }, {
        url: /\/\/yandex\.com\/search/
    }, {
        url: /\/\/google\.infinitynewtab\.com\/\?q/
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
        url: /\/\/www\.zhihu\.com\/search\?/
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
        selectors: "#upquery"
    }, {
        url: /\/\/weixin\.sogou\.com\/weixin\?/,
        style: {
            2: `.headsearch#scroll-header { left:unset; }`
        }
    }, {
        url: /\/\/www\.quora\.com\/search\?/
    }, {
        url: /\/\/stackoverflow\.com\/search\?/,
        style: {
            2: `.top-bar._fixed { right: ${width}px }`
        }
    }, {
        url: /\/\/search\.bilibili\.com\/all/,
        selectors: ".search-input-el"
    }, {
        url: /\/\/www\.acfun\.cn\/search/,
        selectors: ".search-text--standalone"
    }, {
        url: /\/\/www\.youtube\.com\/results/,
        style: {
            2: `ytd-app {margin-left:${width}px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:${width}px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}`
        }
    }, {
        url: /\/\/www\.nicovideo\.jp\/search\//
    }, {
        url: /\/\/so\.iqiyi\.com\/so\/q/
    }, {
        url: /\/\/v\.qq\.com\/x\/search/
    }, {
        url: /\/\/music\.baidu\.com\/search/
    }, {
        url: /\/\/so\.1ting\.com\/all\.do/
    }, {
        url: /\/\/s\.music\.qq\.com/
    }, {
        url: /\/\/music\.163\.com\/.*?#\/search/
    }, {
        url: /\/\/image\.baidu\.com\/search/
    }, {
        url: /\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
    }, {
        url: /\/\/.*\.bing\.com\/images\/search/
    }, {
        url: /\/\/www\.flickr\.com\/search\//
    }, {
        url: /^http:\/\/www\.pixiv\.net\/search\.php/
    }, {
        url: /\/\/huaban\.com\/search\?/
    }, {
        url: /\/\/www\.pinterest\.com\/search\//
    }, {
        url: /\/\/thepiratebay\.org\/search/
    }, {
        url: /\/\/subhd\.tv\/search/
    }, {
        url: /\/\/translate\.google(?:\.\D{1,4}){1,2}/
    }, {
        url: /\/\/fanyi\.baidu\.com/
    }, {
        url: /\/\/.*\.bing\.com\/dict\/search\?q=/
    }, {
        url: /\/\/dict\.youdao\.com\/search/
    }, {
        url: /\/\/dict\.youdao\.com\/w/
    }, {
        url: /\/\/dict\.cn\/./
    }, {
        url: /\/\/s\.taobao\.com\/search/
    }, {
        url: /\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/
    }, {
        url: /\/\/list\.tmall\.com\/search_product\.htm/
    }, {
        url: /\/\/search\.jd\.com\/search/
    }, {
        url: /\/\/search\.suning\.com/
    }, {
        url: /\/\/search\.smzdm\.com\/\?/
    }, {
        url: /\/\/s\.weibo\.com\/weibo\?q=/
    }, {
        url: /\/\/tieba\.baidu\.com\/f\/search/
    }, {
        url: /\/\/(movie|music|book)\.douban\.com\/subject_search?/
    }, {
        url: /\/\/www\.douban\.com\/search/
    }, {
        url: /\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
        style: {
            2: `#left_menu_content { left: ${width}px !important;}`
        }
    }, {
        url: /\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
    }, {
        url: /\/\/github\.com\/search/
    }, {
        url: /\/\/www\.startpage\.com\/sp\/search/
    }, {
        url: /\/\/endday\.github\.io/,
        invisible: true
    }, {
        url: /\/\/endday\.gitee\.io/,
        invisible: true
    } ];
    const routerChange = cb => {
        history.pushState = withHookAfter(history.pushState, cb);
        history.replaceState = withHookAfter(history.replaceState, cb);
        window.addEventListener("popstate", cb);
        window.addEventListener("yt-navigate-finish", cb);
        window.addEventListener("hashchange", cb);
    };
    let site = Vue.reactive(getSite());
    function getMenuItem() {
        let targetItem = null;
        let urlObj = null;
        const curItem = new URL(window.location.href);
        initSites("tm").some((category => {
            category.list.find((item => {
                const menuItem = new URL(item.url);
                if (menuItem.hostname === curItem.hostname && menuItem.pathname === curItem.pathname) {
                    targetItem = item;
                    urlObj = menuItem;
                    return true;
                }
                return false;
            }));
        }));
        if (urlObj) {
            for (const key of urlObj.searchParams.keys()) {
                if (!curItem.searchParams.has(key)) {
                    targetItem = null;
                }
            }
        }
        return targetItem;
    }
    function getSite() {
        const target = list$1.find((item => item.url.test(window.location.href.toLowerCase())));
        const menuItem = getMenuItem();
        if (target) {
            return {
                url: target.url,
                invisible: !!target.invisible,
                disabled: !!target.disabled,
                style: target.style,
                selectors: target.selectors,
                query: target.query
            };
        } else if (menuItem) {
            return {
                url: menuItem.url,
                invisible: false,
                disabled: false,
                style: menuItem.style,
                selectors: menuItem.selectors,
                query: menuItem.query
            };
        }
        return {
            url: "",
            invisible: true,
            disabled: true,
            style: {},
            selectors: null,
            query: null
        };
    }
    routerChange((() => {
        const newSite = getSite();
        Object.keys(site).forEach((key => {
            site[key] = newSite[key] || "";
        }));
    }));
    const isFullScreenRef = Vue.ref(false);
    function isFullScreen() {
        return document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement;
    }
    function onFullScreenChange(handler) {
        const handleResize = function() {
            if (!isFullScreen()) {
                handler();
            }
        };
        document.addEventListener("fullscreenchange", handler);
        document.addEventListener("webkitfullscreenchange", handler);
        document.addEventListener("mozfullscreenchange", handler);
        document.addEventListener("MSFullscreenChange", handler);
        document.addEventListener("resize", handleResize);
        return () => {
            document.removeEventListener("fullscreenchange", handler);
            document.removeEventListener("webkitfullscreenchange", handler);
            document.removeEventListener("mozfullscreenchange", handler);
            document.removeEventListener("MSFullscreenChange", handler);
            document.removeEventListener("resize", handleResize);
        };
    }
    function useFullScreen() {
        const removeListener = onFullScreenChange((() => {
            isFullScreenRef.value = isFullScreen();
        }));
        Vue.onUnmounted((() => {
            removeListener();
        }));
        return {
            isFullScreen: isFullScreenRef
        };
    }
    const session$4 = getSession("mode");
    const getMode = val => {
        if (![ "vertical", "horizontal" ].includes(val)) {
            return "horizontal";
        }
        return val;
    };
    const modeRef = Vue.ref(getMode(session$4));
    const mode = Vue.computed({
        get: () => modeRef.value,
        set: val => {
            modeRef.value = val;
            setSession("mode", getMode(val));
        }
    });
    function useMode() {
        return {
            mode: mode
        };
    }
    const options = new Map([ [ false, "关闭" ], [ "top", "向上" ], [ "bottom", "向下" ], [ "all", "滚动" ] ]);
    const defaultOpt = {
        show: true,
        scrollHide: false
    };
    const session$3 = getSession("switchShow") || defaultOpt;
    const getOpts = val => options.has(val) ? val : false;
    const getOpt = val => Object.assign({}, defaultOpt, {
        show: Boolean(val.show),
        scrollHide: getOpts(val.scrollHide)
    });
    let data = Vue.reactive(getOpt(session$3));
    const show = Vue.computed({
        get: () => data.show,
        set: val => {
            data.show = val;
            setSession("switchShow", data);
        }
    });
    const scrollHide = Vue.computed({
        get: () => data.scrollHide,
        set: val => {
            data.scrollHide = val;
            setSession("switchShow", data);
        }
    });
    function useSwitchShow() {
        return {
            show: show,
            scrollHide: scrollHide,
            options: options
        };
    }
    class Raf {
        constructor() {
            this.init();
        }
        init() {
            this._timerIdMap = {
                timeout: {},
                interval: {}
            };
        }
        run(type = "interval", handler, interval = 16.7) {
            const now = Date.now;
            let stime = now();
            let etime = stime;
            const timerSymbol = Symbol("timerSymbol");
            const loop = () => {
                this.setIdMap(timerSymbol, type, loop);
                etime = now();
                if (etime - stime >= interval) {
                    if (type === "interval") {
                        stime = now();
                        etime = stime;
                    }
                    handler();
                    type === "timeout" && this.clearTimeout(timerSymbol);
                }
            };
            this.setIdMap(timerSymbol, type, loop);
            return timerSymbol;
        }
        setIdMap(timerSymbol, type, loop) {
            this._timerIdMap[type][timerSymbol] = requestAnimationFrame(loop);
        }
        setTimeout(handler, timeout) {
            return this.run("timeout", handler, timeout);
        }
        clearTimeout(timer) {
            cancelAnimationFrame(this._timerIdMap.timeout[timer]);
        }
        setInterval(handler, timeout) {
            return this.run("interval", handler, timeout);
        }
        clearInterval(timer) {
            cancelAnimationFrame(this._timerIdMap.interval[timer]);
        }
    }
    var raf = new Raf;
    let id = null;
    let styles = "";
    function injectStyle(cssContent) {
        styles += cssContent;
        const styleNode = document.querySelector("#as-style-common");
        if (styleNode) {
            styleNode.styleSheet.cssText += styles;
            styles = "";
        } else if (!id) {
            id = raf.setTimeout((() => {
                const cssNode = document.createElement("style");
                cssNode.setAttribute("type", "text/css");
                cssNode.classList.add("as-style");
                cssNode.id = "as-style-common";
                cssNode.appendChild(document.createTextNode(styles));
                styles = "";
                const asRoot = document.getElementById("all-search");
                const container = asRoot || document.body || document.head || document.documentElement || document;
                container.appendChild(cssNode);
                id = null;
            }), 0);
        }
    }
    var css$i = "#all-search .row, .all-search-config .row {\n  display: flex;\n}\n#all-search .column, .all-search-config .column {\n  display: flex;\n  flex-direction: column;\n}\n#all-search .col, .all-search-config .col {\n  flex: 1;\n}\n#all-search .row.items-center, #all-search .column.items-center, .all-search-config .row.items-center, .all-search-config .column.items-center {\n  align-items: center;\n}\n#all-search .row.items-end, #all-search .column.items-end, .all-search-config .row.items-end, .all-search-config .column.items-end {\n  align-items: flex-end;\n}\n#all-search .row.items-stretch, #all-search .column.items-stretch, .all-search-config .row.items-stretch, .all-search-config .column.items-stretch {\n  align-items: stretch;\n}\n#all-search .row.justify-center, #all-search .column.justify-center, .all-search-config .row.justify-center, .all-search-config .column.justify-center {\n  justify-content: center;\n}\n#all-search .row.justify-end, #all-search .column.justify-end, .all-search-config .row.justify-end, .all-search-config .column.justify-end {\n  justify-content: flex-end;\n}\n#all-search .row.justify-between, #all-search .column.justify-between, .all-search-config .row.justify-between, .all-search-config .column.justify-between {\n  justify-content: space-between;\n}\n#all-search .row.flex-wrap, .all-search-config .row.flex-wrap {\n  flex-wrap: wrap;\n}\n#all-search .row.content-center, .all-search-config .row.content-center {\n  align-content: center;\n}\n#all-search .row.content-end, .all-search-config .row.content-end {\n  align-content: end;\n}\n#all-search p, .all-search-config p {\n  margin: 0;\n}\n\n@media screen and (max-width: 750px) {\n  .as-title-horizontal {\n    display: none;\n  }\n}\n.as-title-horizontal {\n  min-width: 90px;\n  margin: 0 10px;\n}\n\n.as-title-vertical {\n  width: 100%;\n}\n\n.as-title {\n  text-decoration: none !important;\n  padding: 0;\n  margin: 0;\n  color: var(--as-primary-color);\n}\n\n.as-title-inner {\n  padding: 0;\n  font-size: 17px;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 600;\n  color: var(--as-primary-color);\n  margin: 0 auto;\n  text-align: center;\n  cursor: pointer;\n}";
    injectStyle(css$i);
    var _export_sfc = (sfc, props) => {
        const target = sfc.__vccOpts || sfc;
        for (const [key, val] of props) {
            target[key] = val;
        }
        return target;
    };
    const _sfc_main$j = {
        name: "logo",
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: val => [ "horizontal", "vertical" ].indexOf(val) > -1
            }
        },
        setup() {
            return {
                isMobile: isMobile()
            };
        }
    };
    const _hoisted_1$c = Vue.createElementVNode("p", {
        class: "as-title-inner"
    }, " All Search ", -1);
    const _hoisted_2$9 = [ _hoisted_1$c ];
    function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
        return !$setup.isMobile ? (Vue.openBlock(), Vue.createElementBlock("a", {
            key: 0,
            class: Vue.normalizeClass([ "as-title", `as-title-${$props.mode}` ]),
            href: "https://github.com/endday/all-search",
            target: "_blank"
        }, _hoisted_2$9, 2)) : Vue.createCommentVNode("", true);
    }
    var logo = _export_sfc(_sfc_main$j, [ [ "render", _sfc_render$j ] ]);
    var MapShim = function() {
        if (typeof Map !== "undefined") {
            return Map;
        }
        function getIndex(arr, key) {
            var result = -1;
            arr.some((function(entry, index) {
                if (entry[0] === key) {
                    result = index;
                    return true;
                }
                return false;
            }));
            return result;
        }
        return function() {
            function class_1() {
                this.__entries__ = [];
            }
            Object.defineProperty(class_1.prototype, "size", {
                get: function() {
                    return this.__entries__.length;
                },
                enumerable: true,
                configurable: true
            });
            class_1.prototype.get = function(key) {
                var index = getIndex(this.__entries__, key);
                var entry = this.__entries__[index];
                return entry && entry[1];
            };
            class_1.prototype.set = function(key, value) {
                var index = getIndex(this.__entries__, key);
                if (~index) {
                    this.__entries__[index][1] = value;
                } else {
                    this.__entries__.push([ key, value ]);
                }
            };
            class_1.prototype.delete = function(key) {
                var entries = this.__entries__;
                var index = getIndex(entries, key);
                if (~index) {
                    entries.splice(index, 1);
                }
            };
            class_1.prototype.has = function(key) {
                return !!~getIndex(this.__entries__, key);
            };
            class_1.prototype.clear = function() {
                this.__entries__.splice(0);
            };
            class_1.prototype.forEach = function(callback, ctx) {
                if (ctx === void 0) {
                    ctx = null;
                }
                for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    callback.call(ctx, entry[1], entry[0]);
                }
            };
            return class_1;
        }();
    }();
    var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
    var global$1 = function() {
        if (typeof global !== "undefined" && global.Math === Math) {
            return global;
        }
        if (typeof self !== "undefined" && self.Math === Math) {
            return self;
        }
        if (typeof window !== "undefined" && window.Math === Math) {
            return window;
        }
        return Function("return this")();
    }();
    var requestAnimationFrame$1 = function() {
        if (typeof requestAnimationFrame === "function") {
            return requestAnimationFrame.bind(global$1);
        }
        return function(callback) {
            return setTimeout((function() {
                return callback(Date.now());
            }), 1e3 / 60);
        };
    }();
    var trailingTimeout = 2;
    function throttle$1(callback, delay) {
        var leadingCall = false, trailingCall = false, lastCallTime = 0;
        function resolvePending() {
            if (leadingCall) {
                leadingCall = false;
                callback();
            }
            if (trailingCall) {
                proxy();
            }
        }
        function timeoutCallback() {
            requestAnimationFrame$1(resolvePending);
        }
        function proxy() {
            var timeStamp = Date.now();
            if (leadingCall) {
                if (timeStamp - lastCallTime < trailingTimeout) {
                    return;
                }
                trailingCall = true;
            } else {
                leadingCall = true;
                trailingCall = false;
                setTimeout(timeoutCallback, delay);
            }
            lastCallTime = timeStamp;
        }
        return proxy;
    }
    var REFRESH_DELAY = 20;
    var transitionKeys = [ "top", "right", "bottom", "left", "width", "height", "size", "weight" ];
    var mutationObserverSupported = typeof MutationObserver !== "undefined";
    var ResizeObserverController = function() {
        function ResizeObserverController() {
            this.connected_ = false;
            this.mutationEventsAdded_ = false;
            this.mutationsObserver_ = null;
            this.observers_ = [];
            this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
            this.refresh = throttle$1(this.refresh.bind(this), REFRESH_DELAY);
        }
        ResizeObserverController.prototype.addObserver = function(observer) {
            if (!~this.observers_.indexOf(observer)) {
                this.observers_.push(observer);
            }
            if (!this.connected_) {
                this.connect_();
            }
        };
        ResizeObserverController.prototype.removeObserver = function(observer) {
            var observers = this.observers_;
            var index = observers.indexOf(observer);
            if (~index) {
                observers.splice(index, 1);
            }
            if (!observers.length && this.connected_) {
                this.disconnect_();
            }
        };
        ResizeObserverController.prototype.refresh = function() {
            var changesDetected = this.updateObservers_();
            if (changesDetected) {
                this.refresh();
            }
        };
        ResizeObserverController.prototype.updateObservers_ = function() {
            var activeObservers = this.observers_.filter((function(observer) {
                return observer.gatherActive(), observer.hasActive();
            }));
            activeObservers.forEach((function(observer) {
                return observer.broadcastActive();
            }));
            return activeObservers.length > 0;
        };
        ResizeObserverController.prototype.connect_ = function() {
            if (!isBrowser || this.connected_) {
                return;
            }
            document.addEventListener("transitionend", this.onTransitionEnd_);
            window.addEventListener("resize", this.refresh);
            if (mutationObserverSupported) {
                this.mutationsObserver_ = new MutationObserver(this.refresh);
                this.mutationsObserver_.observe(document, {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            } else {
                document.addEventListener("DOMSubtreeModified", this.refresh);
                this.mutationEventsAdded_ = true;
            }
            this.connected_ = true;
        };
        ResizeObserverController.prototype.disconnect_ = function() {
            if (!isBrowser || !this.connected_) {
                return;
            }
            document.removeEventListener("transitionend", this.onTransitionEnd_);
            window.removeEventListener("resize", this.refresh);
            if (this.mutationsObserver_) {
                this.mutationsObserver_.disconnect();
            }
            if (this.mutationEventsAdded_) {
                document.removeEventListener("DOMSubtreeModified", this.refresh);
            }
            this.mutationsObserver_ = null;
            this.mutationEventsAdded_ = false;
            this.connected_ = false;
        };
        ResizeObserverController.prototype.onTransitionEnd_ = function(_a) {
            var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
            var isReflowProperty = transitionKeys.some((function(key) {
                return !!~propertyName.indexOf(key);
            }));
            if (isReflowProperty) {
                this.refresh();
            }
        };
        ResizeObserverController.getInstance = function() {
            if (!this.instance_) {
                this.instance_ = new ResizeObserverController;
            }
            return this.instance_;
        };
        ResizeObserverController.instance_ = null;
        return ResizeObserverController;
    }();
    var defineConfigurable = function(target, props) {
        for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var key = _a[_i];
            Object.defineProperty(target, key, {
                value: props[key],
                enumerable: false,
                writable: false,
                configurable: true
            });
        }
        return target;
    };
    var getWindowOf = function(target) {
        var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
        return ownerGlobal || global$1;
    };
    var emptyRect = createRectInit(0, 0, 0, 0);
    function toFloat(value) {
        return parseFloat(value) || 0;
    }
    function getBordersSize(styles) {
        var positions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            positions[_i - 1] = arguments[_i];
        }
        return positions.reduce((function(size, position) {
            var value = styles["border-" + position + "-width"];
            return size + toFloat(value);
        }), 0);
    }
    function getPaddings(styles) {
        var positions = [ "top", "right", "bottom", "left" ];
        var paddings = {};
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var position = positions_1[_i];
            var value = styles["padding-" + position];
            paddings[position] = toFloat(value);
        }
        return paddings;
    }
    function getSVGContentRect(target) {
        var bbox = target.getBBox();
        return createRectInit(0, 0, bbox.width, bbox.height);
    }
    function getHTMLElementContentRect(target) {
        var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
        if (!clientWidth && !clientHeight) {
            return emptyRect;
        }
        var styles = getWindowOf(target).getComputedStyle(target);
        var paddings = getPaddings(styles);
        var horizPad = paddings.left + paddings.right;
        var vertPad = paddings.top + paddings.bottom;
        var width = toFloat(styles.width), height = toFloat(styles.height);
        if (styles.boxSizing === "border-box") {
            if (Math.round(width + horizPad) !== clientWidth) {
                width -= getBordersSize(styles, "left", "right") + horizPad;
            }
            if (Math.round(height + vertPad) !== clientHeight) {
                height -= getBordersSize(styles, "top", "bottom") + vertPad;
            }
        }
        if (!isDocumentElement(target)) {
            var vertScrollbar = Math.round(width + horizPad) - clientWidth;
            var horizScrollbar = Math.round(height + vertPad) - clientHeight;
            if (Math.abs(vertScrollbar) !== 1) {
                width -= vertScrollbar;
            }
            if (Math.abs(horizScrollbar) !== 1) {
                height -= horizScrollbar;
            }
        }
        return createRectInit(paddings.left, paddings.top, width, height);
    }
    var isSVGGraphicsElement = function() {
        if (typeof SVGGraphicsElement !== "undefined") {
            return function(target) {
                return target instanceof getWindowOf(target).SVGGraphicsElement;
            };
        }
        return function(target) {
            return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
        };
    }();
    function isDocumentElement(target) {
        return target === getWindowOf(target).document.documentElement;
    }
    function getContentRect(target) {
        if (!isBrowser) {
            return emptyRect;
        }
        if (isSVGGraphicsElement(target)) {
            return getSVGContentRect(target);
        }
        return getHTMLElementContentRect(target);
    }
    function createReadOnlyRect(_a) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
        var rect = Object.create(Constr.prototype);
        defineConfigurable(rect, {
            x: x,
            y: y,
            width: width,
            height: height,
            top: y,
            right: x + width,
            bottom: height + y,
            left: x
        });
        return rect;
    }
    function createRectInit(x, y, width, height) {
        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }
    var ResizeObservation = function() {
        function ResizeObservation(target) {
            this.broadcastWidth = 0;
            this.broadcastHeight = 0;
            this.contentRect_ = createRectInit(0, 0, 0, 0);
            this.target = target;
        }
        ResizeObservation.prototype.isActive = function() {
            var rect = getContentRect(this.target);
            this.contentRect_ = rect;
            return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
        };
        ResizeObservation.prototype.broadcastRect = function() {
            var rect = this.contentRect_;
            this.broadcastWidth = rect.width;
            this.broadcastHeight = rect.height;
            return rect;
        };
        return ResizeObservation;
    }();
    var ResizeObserverEntry = function() {
        function ResizeObserverEntry(target, rectInit) {
            var contentRect = createReadOnlyRect(rectInit);
            defineConfigurable(this, {
                target: target,
                contentRect: contentRect
            });
        }
        return ResizeObserverEntry;
    }();
    var ResizeObserverSPI = function() {
        function ResizeObserverSPI(callback, controller, callbackCtx) {
            this.activeObservations_ = [];
            this.observations_ = new MapShim;
            if (typeof callback !== "function") {
                throw new TypeError("The callback provided as parameter 1 is not a function.");
            }
            this.callback_ = callback;
            this.controller_ = controller;
            this.callbackCtx_ = callbackCtx;
        }
        ResizeObserverSPI.prototype.observe = function(target) {
            if (!arguments.length) {
                throw new TypeError("1 argument required, but only 0 present.");
            }
            if (typeof Element === "undefined" || !(Element instanceof Object)) {
                return;
            }
            if (!(target instanceof getWindowOf(target).Element)) {
                throw new TypeError('parameter 1 is not of type "Element".');
            }
            var observations = this.observations_;
            if (observations.has(target)) {
                return;
            }
            observations.set(target, new ResizeObservation(target));
            this.controller_.addObserver(this);
            this.controller_.refresh();
        };
        ResizeObserverSPI.prototype.unobserve = function(target) {
            if (!arguments.length) {
                throw new TypeError("1 argument required, but only 0 present.");
            }
            if (typeof Element === "undefined" || !(Element instanceof Object)) {
                return;
            }
            if (!(target instanceof getWindowOf(target).Element)) {
                throw new TypeError('parameter 1 is not of type "Element".');
            }
            var observations = this.observations_;
            if (!observations.has(target)) {
                return;
            }
            observations.delete(target);
            if (!observations.size) {
                this.controller_.removeObserver(this);
            }
        };
        ResizeObserverSPI.prototype.disconnect = function() {
            this.clearActive();
            this.observations_.clear();
            this.controller_.removeObserver(this);
        };
        ResizeObserverSPI.prototype.gatherActive = function() {
            var _this = this;
            this.clearActive();
            this.observations_.forEach((function(observation) {
                if (observation.isActive()) {
                    _this.activeObservations_.push(observation);
                }
            }));
        };
        ResizeObserverSPI.prototype.broadcastActive = function() {
            if (!this.hasActive()) {
                return;
            }
            var ctx = this.callbackCtx_;
            var entries = this.activeObservations_.map((function(observation) {
                return new ResizeObserverEntry(observation.target, observation.broadcastRect());
            }));
            this.callback_.call(ctx, entries, ctx);
            this.clearActive();
        };
        ResizeObserverSPI.prototype.clearActive = function() {
            this.activeObservations_.splice(0);
        };
        ResizeObserverSPI.prototype.hasActive = function() {
            return this.activeObservations_.length > 0;
        };
        return ResizeObserverSPI;
    }();
    var observers = typeof WeakMap !== "undefined" ? new WeakMap : new MapShim;
    var ResizeObserver = function() {
        function ResizeObserver(callback) {
            if (!(this instanceof ResizeObserver)) {
                throw new TypeError("Cannot call a class as a function.");
            }
            if (!arguments.length) {
                throw new TypeError("1 argument required, but only 0 present.");
            }
            var controller = ResizeObserverController.getInstance();
            var observer = new ResizeObserverSPI(callback, controller, this);
            observers.set(this, observer);
        }
        return ResizeObserver;
    }();
    [ "observe", "unobserve", "disconnect" ].forEach((function(method) {
        ResizeObserver.prototype[method] = function() {
            var _a;
            return (_a = observers.get(this))[method].apply(_a, arguments);
        };
    }));
    var index$1 = function() {
        if (typeof global$1.ResizeObserver !== "undefined") {
            return global$1.ResizeObserver;
        }
        return ResizeObserver;
    }();
    const isArray = Array.isArray;
    const isString = val => typeof val === "string";
    const toObject = arr => {
        let obj = {};
        arr.map((item => {
            obj[item.key] = item.value;
        }));
        return obj;
    };
    const SCOPE = "MElScrollbar";
    const isNumber = val => typeof val === "number" && !isNaN(val);
    const debugWarn = (...args) => {
        console.error(...args);
    };
    const resizeHandler = entries => {
        for (const entry of entries) {
            const listeners = entry.target.__resizeListeners__ || [];
            if (listeners.length) {
                listeners.forEach((fn => {
                    fn();
                }));
            }
        }
    };
    const addResizeListener = (element, fn) => {
        if (!element.__resizeListeners__) {
            element.__resizeListeners__ = [];
            element.__ro__ = new index$1(resizeHandler);
            element.__ro__.observe(element);
        }
        element.__resizeListeners__.push(fn);
    };
    const removeResizeListener = (element, fn) => {
        if (!element || !element.__resizeListeners__) return;
        element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
        if (!element.__resizeListeners__.length) {
            element.__ro__.disconnect();
        }
    };
    const addUnit = value => {
        if (isString(value)) {
            return value;
        } else if (isNumber(value)) {
            return value + "px";
        }
        debugWarn(SCOPE, "属性 value 必须是 string 或 number 类型");
        return "";
    };
    const on = (element, event, handler, useCapture = false) => {
        if (element && event && handler) {
            element.addEventListener(event, handler, useCapture);
        }
    };
    const off = (element, event, handler, useCapture = false) => {
        if (element && event && handler) {
            element.removeEventListener(event, handler, useCapture);
        }
    };
    const BAR_MAP = {
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
    const renderThumbStyle = ({move: move, size: size, bar: bar}) => {
        const style = {};
        const translate = `translate${bar.axis}(${move}%)`;
        style[bar.size] = size;
        style.transform = translate;
        style.msTransform = translate;
        style.webkitTransform = translate;
        return style;
    };
    const _sfc_main$i = Vue.defineComponent({
        props: {
            vertical: Boolean,
            size: {
                type: String,
                default: ""
            },
            move: {
                type: Number,
                default: 0
            },
            ratio: {
                type: Number,
                default: 0
            },
            always: Boolean
        },
        setup(props) {
            const visible = Vue.ref(false);
            const barStore = Vue.reactive({});
            let cursorDown = false;
            let cursorLeave = false;
            const thumb = Vue.ref(null);
            const instance = Vue.ref(null);
            let onselectstartStore = null;
            const {proxy: proxy} = Vue.getCurrentInstance();
            const scrollbar = proxy.$parent;
            const bar = Vue.computed((() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]));
            const offsetRatio = Vue.computed((() => instance.value[bar.value.offset] ** 2 / scrollbar.wrap[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]));
            const thumbStyle = Vue.computed((() => renderThumbStyle({
                size: props.size,
                move: props.move,
                bar: bar.value
            })));
            const mouseMoveDocumentHandler = e => {
                if (cursorDown === false) return;
                const prevPage = barStore[bar.value.axis];
                if (!prevPage) return;
                const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
                const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
                const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
                scrollbar.wrap[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrap[bar.value.scrollSize] / 100;
            };
            const mouseUpDocumentHandler = () => {
                cursorDown = false;
                barStore[bar.value.axis] = 0;
                off(document, "mousemove", mouseMoveDocumentHandler);
                off(document, "mouseup", mouseUpDocumentHandler);
                document.onselectstart = onselectstartStore;
                if (cursorLeave) {
                    visible.value = false;
                }
            };
            const startDrag = e => {
                e.stopImmediatePropagation();
                cursorDown = true;
                on(document, "mousemove", mouseMoveDocumentHandler);
                on(document, "mouseup", mouseUpDocumentHandler);
                onselectstartStore = document.onselectstart;
                document.onselectstart = () => false;
            };
            const clickThumbHandler = e => {
                e.stopPropagation();
                if (e.ctrlKey || [ 1, 2 ].includes(e.button)) {
                    return;
                }
                window.getSelection().removeAllRanges();
                startDrag(e);
                barStore[bar.value.axis] = e.currentTarget[bar.value.offset] - (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]);
            };
            const clickTrackHandler = e => {
                const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]);
                const thumbHalf = thumb[bar.value.offset] / 2;
                const thumbPositionPercentage = (offset - thumbHalf) * 100 * offsetRatio.value / instance[bar.value.offset];
                scrollbar.wrap[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrap[bar.value.scrollSize] / 100;
            };
            const mouseMoveScrollbarHandler = () => {
                cursorLeave = false;
                visible.value = !!props.size;
            };
            const mouseLeaveScrollbarHandler = () => {
                cursorLeave = true;
                visible.value = cursorDown;
            };
            Vue.onMounted((() => {
                Vue.nextTick((() => {
                    on(scrollbar.scrollbar, "mousemove", mouseMoveScrollbarHandler);
                    on(scrollbar.scrollbar, "mouseleave", mouseLeaveScrollbarHandler);
                }));
            }));
            Vue.onBeforeUnmount((() => {
                off(document, "mouseup", this.mouseUpDocumentHandler);
                off(scrollbar.scrollbar, "mousemove", this.mouseMoveScrollbarHandler);
                off(scrollbar.scrollbar, "mouseleave", this.mouseLeaveScrollbarHandler);
            }));
            return {
                clickThumbHandler: clickThumbHandler,
                clickTrackHandler: clickTrackHandler,
                thumbStyle: thumbStyle,
                bar: bar,
                visible: visible,
                instance: instance,
                thumb: thumb
            };
        }
    });
    function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createBlock(Vue.Transition, {
            name: "as-scrollbar-fade"
        }, {
            default: Vue.withCtx((() => [ Vue.withDirectives(Vue.createElementVNode("div", {
                ref: "instance",
                class: Vue.normalizeClass([ "as-scrollbar__bar", "is-" + _ctx.bar.key ]),
                onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.clickTrackHandler && _ctx.clickTrackHandler(...args))
            }, [ Vue.createElementVNode("div", {
                ref: "thumb",
                class: "as-scrollbar__thumb",
                style: Vue.normalizeStyle(_ctx.thumbStyle),
                onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.clickThumbHandler && _ctx.clickThumbHandler(...args))
            }, null, 36) ], 34), [ [ Vue.vShow, _ctx.always || _ctx.visible ] ]) ])),
            _: 1
        });
    }
    var Bar = _export_sfc(_sfc_main$i, [ [ "render", _sfc_render$i ] ]);
    const _sfc_main$h = Vue.defineComponent({
        components: {
            Bar: Bar
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
                default: false
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
                default: false
            },
            minSize: {
                type: Number,
                default: 20
            }
        },
        emits: [ "scroll" ],
        setup(props, {emit: emit}) {
            const sizeWidth = Vue.ref("0");
            const sizeHeight = Vue.ref("0");
            const moveX = Vue.ref(0);
            const moveY = Vue.ref(0);
            const scrollbar = Vue.ref(null);
            const wrap = Vue.ref(null);
            const resize = Vue.ref(null);
            const ratioY = Vue.ref(1);
            const ratioX = Vue.ref(1);
            const SCOPE = "AScrollbar";
            const GAP = 4;
            const renderWrapStyle = Vue.computed((() => {
                let style = props.wrapStyle;
                if (isArray(style)) {
                    style = toObject(style);
                    style.height = addUnit(props.height);
                    style.maxHeight = addUnit(props.maxHeight);
                } else if (isString(style)) {
                    style += addUnit(props.height) ? `height: ${addUnit(props.height)};` : "";
                    style += addUnit(props.maxHeight) ? `max-height: ${addUnit(props.maxHeight)};` : "";
                }
                return style;
            }));
            const update = () => {
                if (!wrap.value) return;
                const offsetHeight = wrap.value.offsetHeight - GAP;
                const offsetWidth = wrap.value.offsetWidth - GAP;
                const originalHeight = offsetHeight ** 2 / wrap.value.scrollHeight;
                const originalWidth = offsetWidth ** 2 / wrap.value.scrollWidth;
                const height = Math.max(originalHeight, props.minSize);
                const width = Math.max(originalWidth, props.minSize);
                ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
                ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
                sizeHeight.value = height + GAP < offsetHeight ? height + "px" : "";
                sizeWidth.value = width + GAP < offsetWidth ? width + "px" : "";
            };
            const handleScroll = () => {
                if (wrap.value) {
                    const offsetHeight = wrap.value.offsetHeight - GAP;
                    const offsetWidth = wrap.value.offsetWidth - GAP;
                    moveY.value = wrap.value.scrollTop * 100 / offsetHeight * ratioY.value;
                    moveX.value = wrap.value.scrollLeft * 100 / offsetWidth * ratioX.value;
                    emit("scroll", {
                        scrollTop: wrap.value.scrollTop,
                        scrollLeft: wrap.value.scrollLeft
                    });
                }
            };
            const setScrollTop = value => {
                if (!isNumber(value)) {
                    debugWarn(SCOPE, "value must be a number");
                    return;
                }
                wrap.value.scrollTop = value;
            };
            const setScrollLeft = value => {
                if (!isNumber(value)) {
                    debugWarn(SCOPE, "value must be a number");
                    return;
                }
                wrap.value.scrollLeft = value;
            };
            Vue.onMounted((() => {
                if (!props.native) {
                    Vue.nextTick(update);
                }
                if (!props.noresize) {
                    addResizeListener(resize.value, update);
                    addEventListener("resize", update);
                }
            }));
            Vue.onBeforeUnmount((() => {
                if (!props.noresize) {
                    removeResizeListener(resize.value, update);
                    removeEventListener("resize", this.update);
                }
            }));
            Vue.onUpdated((() => update()));
            return {
                scrollbar: scrollbar,
                wrap: wrap,
                resize: resize,
                moveX: moveX,
                moveY: moveY,
                ratioX: ratioX,
                ratioY: ratioY,
                sizeWidth: sizeWidth,
                sizeHeight: sizeHeight,
                update: update,
                handleScroll: handleScroll,
                scrollTo: scrollTo,
                setScrollTop: setScrollTop,
                setScrollLeft: setScrollLeft,
                renderWrapStyle: renderWrapStyle
            };
        }
    });
    const _hoisted_1$b = {
        ref: "scrollbar",
        class: "as-scrollbar"
    };
    function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_bar = Vue.resolveComponent("bar");
        return Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$b, [ Vue.createElementVNode("div", {
            ref: "wrap",
            class: Vue.normalizeClass([ _ctx.wrapClass, "as-scrollbar__wrap", _ctx.native ? "" : "as-scrollbar__wrap--hidden-default" ]),
            style: Vue.normalizeStyle(_ctx.renderWrapStyle),
            onScroll: _cache[0] || (_cache[0] = (...args) => _ctx.handleScroll && _ctx.handleScroll(...args))
        }, [ (Vue.openBlock(), Vue.createBlock(Vue.resolveDynamicComponent(_ctx.tag), {
            ref: "resize",
            class: Vue.normalizeClass([ "as-scrollbar__view", _ctx.viewClass ]),
            style: Vue.normalizeStyle(_ctx.viewStyle)
        }, {
            default: Vue.withCtx((() => [ Vue.renderSlot(_ctx.$slots, "default") ])),
            _: 3
        }, 8, [ "class", "style" ])) ], 38), !_ctx.native ? (Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, {
            key: 0
        }, [ Vue.createVNode(_component_bar, {
            move: _ctx.moveX,
            ratio: _ctx.ratioX,
            size: _ctx.sizeWidth,
            always: _ctx.always
        }, null, 8, [ "move", "ratio", "size", "always" ]), Vue.createVNode(_component_bar, {
            move: _ctx.moveY,
            ratio: _ctx.ratioY,
            size: _ctx.sizeHeight,
            vertical: "",
            always: _ctx.always
        }, null, 8, [ "move", "ratio", "size", "always" ]) ], 64)) : Vue.createCommentVNode("", true) ], 512);
    }
    var scrollbar = _export_sfc(_sfc_main$h, [ [ "render", _sfc_render$h ] ]);
    var css$h = ":root{--as-text-color-secondary:#909399}.as-scrollbar{--as-scrollbar-opacity:.3;--as-scrollbar-background-color:var(--as-text-color-secondary);--as-scrollbar-hover-opacity:.5;--as-scrollbar-hover-background-color:var(--as-text-color-secondary);overflow:hidden;position:relative;height:100%}.as-scrollbar__wrap{overflow:auto;height:100%}.as-scrollbar__wrap--hidden-default{scrollbar-width:none}.as-scrollbar__wrap--hidden-default::-webkit-scrollbar{display:none}.as-scrollbar__thumb{position:relative;display:block;width:0;height:0;cursor:pointer;border-radius:inherit;background-color:var(--as-scrollbar-background-color, var(--as-text-color-secondary));transition:var(--as-transition-duration) background-color;opacity:var(--as-scrollbar-opacity, .3)}.as-scrollbar__thumb:hover{background-color:var(--as-scrollbar-hover-background-color, var(--as-text-color-secondary));opacity:var(--as-scrollbar-hover-opacity, .5)}.as-scrollbar__bar{position:absolute;right:2px;bottom:2px;z-index:1;border-radius:4px}.as-scrollbar__bar.is-vertical{width:6px;top:2px}.as-scrollbar__bar.is-vertical>div{width:100%}.as-scrollbar__bar.is-horizontal{height:6px;left:2px}.as-scrollbar__bar.is-horizontal>div{height:100%}.as-scrollbar-fade-enter-active{transition:opacity .34s ease-out}.as-scrollbar-fade-leave-active{transition:opacity .12s ease-out}.as-scrollbar-fade-enter-from,.as-scrollbar-fade-leave-active{opacity:0}\n";
    injectStyle(css$h);
    function useTimeout() {
        let timeoutHandle;
        const registerTimeout = (fn, delay) => {
            cancelTimeout();
            timeoutHandle = window.setTimeout(fn, delay);
        };
        const cancelTimeout = () => window.clearTimeout(timeoutHandle);
        return {
            registerTimeout: registerTimeout,
            cancelTimeout: cancelTimeout
        };
    }
    function onClickOutside(target, handler, options) {
        const {ignore: ignore, capture: capture = true} = options;
        if (!window) return;
        const shouldListen = Vue.ref(true);
        let fallback;
        const listener = event => {
            window.clearTimeout(fallback);
            const el = target;
            const composedPath = event.composedPath();
            if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value) return;
            if (ignore && ignore.length > 0) {
                if (ignore.some((target => {
                    const el = target;
                    return el && (event.target === el || composedPath.includes(el));
                }))) return;
            }
            handler(event);
        };
        window.addEventListener("click", listener, {
            passive: true,
            capture: capture
        });
        window.addEventListener("pointerdown", listener, {
            passive: true
        });
        return () => {
            window.removeEventListener("click", listener);
            window.removeEventListener("pointerdown", listener);
        };
    }
    var css$g = '@charset "UTF-8";\n.popover-content {\n  --background-color: white;\n  --border-color: lightgray;\n  display: none;\n  pointer-events: none;\n  opacity: 0;\n  z-index: 99999;\n  position: relative;\n}\n.popover-content .arrow,\n.popover-content .arrow::before {\n  width: 0;\n  height: 0;\n  border-style: solid;\n}\n.popover-content .arrow::before {\n  content: "";\n  position: absolute;\n}\n\n.popover-content[data-show=true] {\n  opacity: 1;\n  pointer-events: initial;\n}\n\n.popover-content[data-initialized=true] {\n  display: block;\n}\n\n/* 可以为进入和离开动画设置不同的持续时间和动画函数 */\n.slide-fade-enter-active {\n  transition: all 0.3s ease-out;\n}\n\n.slide-fade-leave-active {\n  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);\n}\n\n.slide-fade-enter-from,\n.slide-fade-leave-to {\n  transform: translateX(20px);\n  opacity: 0;\n}';
    injectStyle(css$g);
    const _sfc_main$g = {
        props: {
            placement: {
                type: String,
                default: "auto"
            },
            strategy: {
                type: String,
                default: "fixed"
            },
            popperClass: {
                type: String,
                default: ""
            }
        },
        setup(props) {
            const visible = Vue.ref(false);
            const loaded = Vue.ref(false);
            const trigger = Vue.ref(null);
            const popover = Vue.ref(null);
            const popperInstance = Vue.ref(null);
            const {registerTimeout: registerTimeout, cancelTimeout: cancelTimeout} = useTimeout();
            function createPopover(target) {
                if (popperInstance.value) {
                    visible.value = true;
                    return;
                }
                popperInstance.value = Popper.createPopper(target, popover.value, {
                    strategy: props.strategy,
                    placement: props.placement
                });
            }
            function destroyPopover() {
                if (popperInstance.value) {
                    popperInstance.value.destroy();
                    popperInstance.value = null;
                }
            }
            let stopFn;
            function handleClickOutside(target) {
                if (!stopFn) {
                    stopFn = onClickOutside(target, hide, {
                        ignore: [ popover.value ]
                    });
                }
            }
            Vue.onUnmounted((() => {
                stopFn();
            }));
            function show(target) {
                loaded.value = true;
                visible.value = true;
                createPopover(target);
                cancelTimeout();
                handleClickOutside(target);
            }
            function hide() {
                registerTimeout((() => {
                    visible.value = false;
                    destroyPopover();
                }), 100);
            }
            return {
                visible: visible,
                loaded: loaded,
                trigger: trigger,
                popover: popover,
                popperInstance: popperInstance,
                show: show,
                hide: hide
            };
        }
    };
    const _hoisted_1$a = [ "data-show", "data-initialized" ];
    function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [ Vue.renderSlot(_ctx.$slots, "trigger", Vue.mergeProps({
            ref: "trigger"
        }, {
            show: $setup.show,
            hide: $setup.hide
        })), Vue.createVNode(Vue.Transition, {
            name: "slide-fade"
        }, {
            default: Vue.withCtx((() => [ (Vue.openBlock(), Vue.createBlock(Vue.Teleport, {
                to: "#all-search"
            }, [ Vue.withDirectives(Vue.createElementVNode("div", {
                class: Vue.normalizeClass([ $props.popperClass, "popover-content" ]),
                ref: "popover",
                "data-show": $setup.visible,
                "data-initialized": $setup.popperInstance !== null,
                style: {
                    display: "none"
                },
                onMouseenter: _cache[0] || (_cache[0] = (...args) => $setup.show && $setup.show(...args)),
                onMouseleave: _cache[1] || (_cache[1] = (...args) => $setup.hide && $setup.hide(...args))
            }, [ $setup.loaded ? Vue.renderSlot(_ctx.$slots, "default", {
                key: 0
            }) : Vue.createCommentVNode("", true) ], 42, _hoisted_1$a), [ [ Vue.vShow, $setup.visible ] ]) ])) ])),
            _: 3
        }) ], 64);
    }
    var popperComp = _export_sfc(_sfc_main$g, [ [ "render", _sfc_render$g ] ]);
    function findInNodeList(list) {
        return [].find.call(list, (item => isVisible(item)));
    }
    function isVisible(element) {
        const style = getComputedStyle(element);
        return !!element.getClientRects().length && style.visibility !== "hidden" && style.width !== 0 && style.height !== 0 && style.opacity !== 0;
    }
    function getSearchDom() {
        const el = document.querySelector("input[type=search],input[type=text][autocomplete=off],input[autocomplete=off]:not([type])") || document.querySelector("input[type=text][name][value],input[name][value]:not([type])");
        if (el && isVisible(el)) {
            return el;
        }
        const autofocusOrSearch = document.querySelector("input[autofocus],input[type=search]");
        if (autofocusOrSearch && isVisible(autofocusOrSearch)) {
            return autofocusOrSearch;
        }
        const idOrClassContainSearch = document.querySelectorAll("input[id*=search],input[class*=search]");
        if (idOrClassContainSearch.length) {
            const element = findInNodeList(idOrClassContainSearch);
            if (element) {
                return element;
            }
        }
        const placeholderContainSearch = document.querySelectorAll("input[placeholder*=search],input[placeholder*=搜索]");
        if (placeholderContainSearch.length) {
            const element = findInNodeList(placeholderContainSearch);
            if (element) {
                return element;
            }
        }
        const textInputTypes = [ "hidden", "button", "checkbox", "color", "file", "image", "radio", "range", "reset", "submit" ];
        const selector = textInputTypes.map((t => `[type=${t}]`)).join(",");
        const firstInput = document.querySelector(`input:not(${selector}),textarea`);
        if (firstInput && isVisible(firstInput)) {
            return firstInput;
        }
        const inputSearch = document.getElementsByTagName("input");
        const sameKeywordInput = [].find.call(inputSearch, (item => {
            if (item.value && decodeURI(window.location.pathname + window.location.search).includes(item.value)) {
                return item;
            }
        }));
        if (sameKeywordInput) {
            return sameKeywordInput;
        }
    }
    function getKeyword() {
        const el = getSearchDom();
        if (el) {
            if ([ "INPUT", "TEXTAREA" ].includes(el.nodeName)) {
                return el.value;
            } else {
                return el.textContent;
            }
        }
        console.log("没有找到搜索关键字");
    }
    var css$f = ".as-icon {\n  font-size: 20px;\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n  margin: 0.25px 4px 0 0;\n  display: inline-block;\n}";
    injectStyle(css$f);
    const _sfc_main$f = {
        name: "icon",
        props: {
            name: {
                type: String,
                default: ""
            }
        }
    };
    const _hoisted_1$9 = {
        class: "as-icon as-menu-item-icon",
        "aria-hidden": "true"
    };
    const _hoisted_2$8 = [ "xlink:href" ];
    function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$9, [ Vue.createElementVNode("use", {
            "xlink:href": `#icon-${$props.name}`
        }, null, 8, _hoisted_2$8) ]);
    }
    var icon = _export_sfc(_sfc_main$f, [ [ "render", _sfc_render$f ] ]);
    let el$1 = document.createElement("a");
    const replaceUrl = function(val) {
        const lowerCaseVal = val.toLowerCase();
        const list = [ "http://", "https://", "ftp://", "files://" ];
        for (let i = 0; i < list.length; i++) {
            if (lowerCaseVal.indexOf(list[i]) === 0) {
                return val.replace(/.*\/\//, "//");
            }
        }
        return val;
    };
    function parseUrl(url) {
        let val = url;
        if (val.indexOf("//") < 0) {
            val = `//${val}`;
        } else if (val.indexOf("//") > -1) {
            val = replaceUrl(val);
        } else {
            return el$1;
        }
        el$1.href = val;
        return {
            href: el$1.href,
            origin: el$1.origin,
            protocol: el$1.protocol,
            host: el$1.host,
            hostname: el$1.hostname,
            port: el$1.port,
            pathname: el$1.pathname,
            search: el$1.search,
            hash: el$1.hash
        };
    }
    const name$1 = "favicon";
    const session$2 = getSession(name$1);
    const getVal$2 = val => val || 1;
    const valRef$1 = Vue.ref(getVal$2(session$2));
    const favicon$1 = Vue.computed({
        get: () => valRef$1.value,
        set: val => {
            valRef$1.value = val;
            setSession(name$1, getVal$2(val));
        }
    });
    function useFavicon() {
        return {
            favicon: favicon$1
        };
    }
    var css$e = '.as-img-icon {\n  border: none;\n  position: relative;\n  font-size: 0;\n}\n.as-img-icon img {\n  width: 100%;\n  height: 100%;\n  border: none;\n  vertical-align: top;\n}\n.as-img-icon img.error {\n  display: inline-block;\n  transform: scale(1);\n  content: "";\n  color: transparent;\n}\n.as-img-icon img.error::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: #f5f5f5 no-repeat center/50% 50%;\n}\n.as-img-icon img.error::after {\n  content: attr(alt);\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  line-height: 2;\n  background-color: rgba(0, 0, 0, 0.5);\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}';
    injectStyle(css$e);
    const iconCache = Vue.reactive(getSession("iconCache") || {});
    const _sfc_main$e = {
        name: "favicon",
        props: {
            url: {
                type: String,
                default: ""
            },
            icon: {
                type: String,
                default: ""
            }
        },
        setup(props) {
            const isError = Vue.ref(false);
            const {hostname: hostname, origin: origin} = parseUrl(props.url);
            const img = Vue.computed((() => {
                if (isError.value) {
                    return `${origin}/favicon.ico`;
                } else if (iconCache[hostname]) {
                    return iconCache[hostname];
                } else {
                    return `https://favicon.yandex.net/favicon/v2/${encodeURI(hostname)}?size=32`;
                }
            }));
            const {favicon: favicon} = useFavicon();
            function getBase64Image(image) {
                let canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                return canvas.toDataURL("image/png", 1);
            }
            function handleLoad(e) {
                if (!isError.value && !img.value.startsWith("data:image")) {
                    const base64 = getBase64Image(e.target);
                    if (base64) {
                        iconCache[hostname] = base64;
                        setSession("iconCache", iconCache);
                    }
                }
            }
            function handleError() {
                isError.value = true;
            }
            return {
                img: img,
                favicon: favicon,
                handleLoad: handleLoad,
                handleError: handleError,
                isError: isError
            };
        }
    };
    const _hoisted_1$8 = {
        key: 0,
        class: "as-img-icon"
    };
    const _hoisted_2$7 = [ "src" ];
    function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
        return $setup.favicon === 1 ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$8, [ Vue.createElementVNode("img", {
            class: Vue.normalizeClass({
                error: $setup.isError
            }),
            src: $setup.img,
            crossOrigin: "",
            onError: _cache[0] || (_cache[0] = (...args) => $setup.handleError && $setup.handleError(...args)),
            onLoad: _cache[1] || (_cache[1] = (...args) => $setup.handleLoad && $setup.handleLoad(...args))
        }, null, 42, _hoisted_2$7) ])) : Vue.createCommentVNode("", true);
    }
    var favicon = _export_sfc(_sfc_main$e, [ [ "render", _sfc_render$e ] ]);
    const onTap = (target, callback) => {
        let tapStartTime = 0;
        let tapEndTime = 0;
        const tapTime = 200;
        let tapStartClientX = 0;
        let tapStartClientY = 0;
        let tapEndClientX = 0;
        let tapEndClientY = 0;
        const tapLimit = 15;
        let cancelClick = false;
        let hasListener = false;
        function handleTouchStart(event) {
            tapStartTime = event.timeStamp;
            const touch = event.changedTouches[0];
            tapStartClientX = touch.clientX;
            tapStartClientY = touch.clientY;
            cancelClick = false;
        }
        function handleTouchMove(event) {
            const touch = event.changedTouches[0];
            tapEndClientX = touch.clientX;
            tapEndClientY = touch.clientY;
            if (Math.abs(tapEndClientX - tapStartClientX) > tapLimit || Math.abs(tapEndClientY - tapStartClientY) > tapLimit) {
                cancelClick = true;
            }
        }
        function handleTouchEnd(event) {
            tapEndTime = event.timeStamp;
            if (!cancelClick && tapEndTime - tapStartTime <= tapTime) {
                callback(event);
            }
        }
        Vue.watch(target, (el => {
            if (el && !hasListener) {
                el.addEventListener("touchstart", handleTouchStart);
                el.addEventListener("touchmove", handleTouchMove);
                el.addEventListener("touchend", handleTouchEnd);
                hasListener = true;
            }
        }));
        Vue.onUnmounted((() => {
            const el = Vue.unref(target);
            if (el) {
                el.removeEventListener("touchstart", handleTouchStart);
                el.removeEventListener("touchmove", handleTouchMove);
                el.removeEventListener("touchend", handleTouchEnd);
            }
        }));
    };
    const selection = Vue.ref("");
    var css$d = '#all-search .row, .all-search-config .row {\n  display: flex;\n}\n#all-search .column, .all-search-config .column {\n  display: flex;\n  flex-direction: column;\n}\n#all-search .col, .all-search-config .col {\n  flex: 1;\n}\n#all-search .row.items-center, #all-search .column.items-center, .all-search-config .row.items-center, .all-search-config .column.items-center {\n  align-items: center;\n}\n#all-search .row.items-end, #all-search .column.items-end, .all-search-config .row.items-end, .all-search-config .column.items-end {\n  align-items: flex-end;\n}\n#all-search .row.items-stretch, #all-search .column.items-stretch, .all-search-config .row.items-stretch, .all-search-config .column.items-stretch {\n  align-items: stretch;\n}\n#all-search .row.justify-center, #all-search .column.justify-center, .all-search-config .row.justify-center, .all-search-config .column.justify-center {\n  justify-content: center;\n}\n#all-search .row.justify-end, #all-search .column.justify-end, .all-search-config .row.justify-end, .all-search-config .column.justify-end {\n  justify-content: flex-end;\n}\n#all-search .row.justify-between, #all-search .column.justify-between, .all-search-config .row.justify-between, .all-search-config .column.justify-between {\n  justify-content: space-between;\n}\n#all-search .row.flex-wrap, .all-search-config .row.flex-wrap {\n  flex-wrap: wrap;\n}\n#all-search .row.content-center, .all-search-config .row.content-center {\n  align-content: center;\n}\n#all-search .row.content-end, .all-search-config .row.content-end {\n  align-content: end;\n}\n#all-search p, .all-search-config p {\n  margin: 0;\n}\n\n.as-menu-item.horizontal {\n  position: relative;\n  padding: 0 16px;\n}\n.as-menu-item.horizontal::after {\n  content: "";\n  transform: scaleX(0);\n  opacity: 0;\n  transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  position: absolute;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-bottom: 2px solid var(--as-primary-color);\n}\n.as-menu-item.horizontal:hover::after {\n  transform: scaleX(1);\n  opacity: 1;\n}\n\n@media screen and (max-width: 750px) {\n  .as-menu-item.horizontal {\n    padding: 0 10px;\n  }\n}\n.as-menu-item.vertical {\n  margin: 5px 0;\n  position: relative;\n}\n.as-menu-item.vertical::after {\n  content: "";\n  transform: scaleY(0);\n  opacity: 0;\n  transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  border-right: 2.5px solid var(--as-primary-color);\n}\n.as-menu-item.vertical:hover::after {\n  transform: scaleY(1);\n  opacity: 1;\n}\n.as-menu-item.vertical .as-menu-item-title {\n  margin-right: 6px;\n}\n\n.as-menu-item.no-underline {\n  text-decoration: none;\n}\n\n.as-menu-item:visited {\n  color: var(--as-primary-text-color);\n}\n\na.as-menu-item {\n  height: 30px;\n  line-height: 30px;\n  list-style: none;\n  position: relative;\n  color: var(--as-primary-text-color);\n  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  box-sizing: border-box;\n  margin: 0;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\na.as-menu-item:hover {\n  border-color: var(--as-primary-color);\n}\na.as-menu-item:hover .as-menu-item-icon, a.as-menu-item:hover .as-menu-item-title {\n  color: var(--as-primary-color);\n}\n\n.as-menu-item-icon {\n  color: var(--as-primary-text-color);\n}\n\n.as-url-icon {\n  width: 16px;\n  height: 16px;\n  margin-right: 10px;\n}\n\n.as-subMenu-container {\n  background: var(--as-bg-color);\n  border: 1px solid #e4e7ed;\n  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);\n  border-radius: 4px;\n}\n\n.as-subMenu {\n  list-style: none;\n  padding: 0;\n  min-width: 90px;\n  box-sizing: border-box;\n  margin: 4px 0;\n}\n.as-subMenu li {\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.as-subMenu li a {\n  display: flex;\n  align-items: center;\n  height: 34px;\n  padding: 0 16px;\n  text-decoration: none;\n}\n.as-subMenu li:hover {\n  background-color: var(--as-secondary-background-color);\n  color: var(--as-primary-color);\n}\n.as-subMenu .as-subMenu-text {\n  flex: 1;\n  font-size: 14px;\n  text-overflow: ellipsis;\n  color: var(--as-primary-text-color);\n  white-space: nowrap;\n  margin: 0;\n  line-height: 34px;\n  font-weight: normal;\n  text-align: left;\n}';
    injectStyle(css$d);
    let isTap = false;
    const _sfc_main$d = {
        name: "menuItem",
        components: {
            popperComp: popperComp,
            icon: icon,
            favicon: favicon
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
        setup(props) {
            const categoryRef = Vue.ref(null);
            const currentSite = site;
            const classList = Vue.computed((() => props.mode === "horizontal" ? "horizontal" : "vertical"));
            const placement = Vue.computed((() => props.mode === "horizontal" ? "bottom-start" : "right-start"));
            const handleMenuShow = (value, item) => {
                item.show = value;
            };
            const defaultKeyword = () => {
                if (selection && selection.value) {
                    return selection.value;
                }
                let keyword = getKeyword();
                const selectors = currentSite.selectors;
                const query = currentSite.query;
                if (keyword === undefined) {
                    if (selectors) {
                        const el = document.querySelector(selectors);
                        keyword = el ? el.value : "";
                    } else if (query) {
                        query.some((name => {
                            const word = getQueryString(name);
                            keyword = word;
                            return !!word;
                        }));
                    }
                }
                return keyword;
            };
            const handleCateClick = (cate, newWin) => {
                if (isTap) {
                    return;
                }
                const urlItem = cate.list.filter((item => item.data.visible)).find((item => item.url.indexOf(window.location.hostname) === -1));
                handleClick(urlItem, newWin);
            };
            const handleClick = (item, newWin) => {
                const keyword = defaultKeyword();
                if (newWin) {
                    window.open(item.url.replace("%s", keyword));
                } else {
                    window.location.href = item.url.replace("%s", keyword);
                }
            };
            onTap(categoryRef, (() => {
                isTap = true;
            }));
            return {
                placement: placement,
                classList: classList,
                handleMenuShow: handleMenuShow,
                handleClick: handleClick,
                handleCateClick: handleCateClick,
                categoryRef: categoryRef
            };
        }
    };
    const _hoisted_1$7 = [ "onMouseenter", "onMouseleave" ];
    const _hoisted_2$6 = [ "textContent" ];
    const _hoisted_3$3 = {
        class: "as-subMenu"
    };
    const _hoisted_4$2 = [ "onClick", "onMouseup" ];
    const _hoisted_5$1 = [ "textContent" ];
    function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_icon = Vue.resolveComponent("icon");
        const _component_favicon = Vue.resolveComponent("favicon");
        const _component_popper_comp = Vue.resolveComponent("popper-comp");
        return Vue.openBlock(), Vue.createBlock(_component_popper_comp, {
            placement: $setup.placement,
            "popper-class": "as-subMenu-container"
        }, {
            trigger: Vue.withCtx((({show: show, hide: hide}) => [ Vue.createElementVNode("a", {
                class: Vue.normalizeClass([ "as-menu-item no-underline", $setup.classList ]),
                ref: "categoryRef",
                onMouseenter: $event => show($event.target),
                onMouseleave: hide,
                href: "javascript:void 0",
                onClick: [ _cache[0] || (_cache[0] = Vue.withModifiers(($event => $setup.handleCateClick($props.item, false)), [ "exact" ])), _cache[1] || (_cache[1] = Vue.withModifiers(($event => $setup.handleCateClick($props.item, true)), [ "ctrl", "exact" ])) ],
                onMouseup: _cache[2] || (_cache[2] = Vue.withModifiers(($event => $setup.handleCateClick($props.item, true)), [ "middle", "exact" ]))
            }, [ Vue.createVNode(_component_icon, {
                name: $props.item.name
            }, null, 8, [ "name" ]), Vue.createElementVNode("span", {
                class: "as-menu-item-title",
                textContent: Vue.toDisplayString($props.item.nameZh)
            }, null, 8, _hoisted_2$6) ], 42, _hoisted_1$7) ])),
            default: Vue.withCtx((() => [ Vue.createElementVNode("ul", _hoisted_3$3, [ (Vue.openBlock(true), 
            Vue.createElementBlock(Vue.Fragment, null, Vue.renderList($props.item.list, ((child, i) => Vue.withDirectives((Vue.openBlock(), 
            Vue.createElementBlock("li", {
                key: `${$props.item.name}_${i}`
            }, [ Vue.createElementVNode("a", {
                href: "javascript:void 0",
                onClick: [ Vue.withModifiers(($event => $setup.handleClick(child)), [ "exact" ]), Vue.withModifiers(($event => $setup.handleClick(child, true)), [ "ctrl", "exact" ]) ],
                onMouseup: Vue.withModifiers(($event => $setup.handleClick(child, true)), [ "middle", "exact" ])
            }, [ Vue.createVNode(_component_favicon, {
                class: "as-url-icon",
                url: child.url,
                icon: child.icon
            }, null, 8, [ "url", "icon" ]), Vue.createElementVNode("p", {
                class: "as-subMenu-text",
                textContent: Vue.toDisplayString(child.nameZh)
            }, null, 8, _hoisted_5$1) ], 40, _hoisted_4$2) ])), [ [ Vue.vShow, child.data.visible ] ]))), 128)) ]) ])),
            _: 1
        }, 8, [ "placement" ]);
    }
    var menuItem = _export_sfc(_sfc_main$d, [ [ "render", _sfc_render$d ] ]);
    const NAME = "align";
    const session$1 = getSession(NAME);
    const list = new Map([ [ "flex-start", "开始" ], [ "center", "居中" ], [ "flex-end", "末尾" ] ]);
    const getVal$1 = val => {
        if (list.has(val)) {
            return val;
        }
        return "flex-start";
    };
    const alignRef = Vue.ref(getVal$1(session$1));
    const alignList = Vue.reactive(list);
    const align = Vue.computed({
        get: () => alignRef.value,
        set: val => {
            alignRef.value = val;
            setSession(NAME, getVal$1(val));
        }
    });
    function useAlign() {
        return {
            alignList: alignList,
            align: align
        };
    }
    var css$c = "#all-search .row, .all-search-config .row {\n  display: flex;\n}\n#all-search .column, .all-search-config .column {\n  display: flex;\n  flex-direction: column;\n}\n#all-search .col, .all-search-config .col {\n  flex: 1;\n}\n#all-search .row.items-center, #all-search .column.items-center, .all-search-config .row.items-center, .all-search-config .column.items-center {\n  align-items: center;\n}\n#all-search .row.items-end, #all-search .column.items-end, .all-search-config .row.items-end, .all-search-config .column.items-end {\n  align-items: flex-end;\n}\n#all-search .row.items-stretch, #all-search .column.items-stretch, .all-search-config .row.items-stretch, .all-search-config .column.items-stretch {\n  align-items: stretch;\n}\n#all-search .row.justify-center, #all-search .column.justify-center, .all-search-config .row.justify-center, .all-search-config .column.justify-center {\n  justify-content: center;\n}\n#all-search .row.justify-end, #all-search .column.justify-end, .all-search-config .row.justify-end, .all-search-config .column.justify-end {\n  justify-content: flex-end;\n}\n#all-search .row.justify-between, #all-search .column.justify-between, .all-search-config .row.justify-between, .all-search-config .column.justify-between {\n  justify-content: space-between;\n}\n#all-search .row.flex-wrap, .all-search-config .row.flex-wrap {\n  flex-wrap: wrap;\n}\n#all-search .row.content-center, .all-search-config .row.content-center {\n  align-content: center;\n}\n#all-search .row.content-end, .all-search-config .row.content-end {\n  align-content: end;\n}\n#all-search p, .all-search-config p {\n  margin: 0;\n}\n\n.as-menu-container {\n  flex: 1;\n}\n\n.as-menu {\n  padding: 0;\n  margin: 0;\n  white-space: nowrap;\n  border: 0;\n  box-shadow: none;\n  background-color: var(--as-bg-color);\n  display: flex;\n}\n\n.as-horizontal-menu {\n  flex-direction: row;\n}\n\n.as-vertical-menu {\n  flex-direction: column;\n}";
    injectStyle(css$c);
    const _sfc_main$c = {
        name: "as-menu",
        components: {
            scrollbar: scrollbar,
            menuItem: menuItem
        },
        props: {
            mode: {
                type: String,
                default: "horizontal",
                validator: val => [ "horizontal", "vertical" ].indexOf(val) > -1
            }
        },
        setup(props) {
            const sites = Vue.reactive(initSites("tm"));
            const {align: align} = useAlign();
            const data = Vue.reactive({
                showTimeout: 50,
                hideTimeout: 200
            });
            const menuClass = Vue.computed((() => ({
                "as-horizontal-menu": props.mode === "horizontal",
                "as-vertical-menu": props.mode === "vertical"
            })));
            return {
                sites: sites,
                data: data,
                align: align,
                menuClass: menuClass
            };
        }
    };
    function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_menu_item = Vue.resolveComponent("menu-item");
        const _component_scrollbar = Vue.resolveComponent("scrollbar");
        return Vue.openBlock(), Vue.createBlock(_component_scrollbar, {
            class: "as-menu-container",
            noresize: ""
        }, {
            default: Vue.withCtx((() => [ Vue.createElementVNode("ul", {
                class: Vue.normalizeClass([ "as-menu", $setup.menuClass ]),
                style: Vue.normalizeStyle({
                    justifyContent: $setup.align
                })
            }, [ (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList($setup.sites, (item => (Vue.openBlock(), 
            Vue.createBlock(_component_menu_item, {
                key: item.name,
                item: item,
                mode: $props.mode
            }, null, 8, [ "item", "mode" ])))), 128)) ], 6) ])),
            _: 1
        });
    }
    var asMenu = _export_sfc(_sfc_main$c, [ [ "render", _sfc_render$c ] ]);
    const reg = /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/;
    const defaultVal = {
        "primary-color": "#1890ff",
        "bg-color": "#ffffff",
        "primary-text-color": "#606266"
    };
    function setCssValue(name, value) {
        const el = document.getElementById("all-search");
        el.style.setProperty(`--as-${name}`, value);
    }
    function getValue(name) {
        const session = getSession(name);
        if (reg.test(session)) {
            return session;
        } else {
            return defaultVal[name];
        }
    }
    const valMap = {
        "primary-color": Vue.ref(getValue("primary-color")),
        "bg-color": Vue.ref(getValue("bg-color")),
        "primary-text-color": Vue.ref(getValue("primary-text-color"))
    };
    function setValue(name, value) {
        const formatVal = reg.test(value) ? value : defaultVal[name];
        setCssValue(name, formatVal);
        setSession(name, formatVal);
        valMap[name].value = formatVal;
    }
    const primaryColor = Vue.computed({
        get: () => valMap["primary-color"].value,
        set: val => {
            setValue("primary-color", val);
        }
    });
    const bgColor = Vue.computed({
        get: () => valMap["bg-color"].value,
        set: val => {
            setValue("bg-color", val);
        }
    });
    const primaryTextColor = Vue.computed({
        get: () => valMap["primary-text-color"].value,
        set: val => {
            setValue("primary-text-color", val);
        }
    });
    function initColor(name) {
        const value = getSession(name);
        if (reg.test(value)) {
            const formatVal = reg.test(value) ? value : defaultVal[name];
            setCssValue(name, formatVal);
        }
    }
    function useColor() {
        Vue.onMounted((() => {
            initColor("primary-color");
            initColor("bg-color");
            initColor("primary-text-color");
        }));
        return {
            primaryColor: primaryColor,
            bgColor: bgColor,
            primaryTextColor: primaryTextColor
        };
    }
    const name = "showToolbar";
    const session = getSession(name);
    const getVal = val => val || 1;
    const valRef = Vue.ref(getVal(session));
    const toolbar = Vue.computed({
        get: () => valRef.value,
        set: val => {
            valRef.value = val;
            setSession(name, getVal(val));
        }
    });
    function useToolbar() {
        return {
            toolbar: toolbar
        };
    }
    var css$b = "#all-search .row, .all-search-config .row {\n  display: flex;\n}\n#all-search .column, .all-search-config .column {\n  display: flex;\n  flex-direction: column;\n}\n#all-search .col, .all-search-config .col {\n  flex: 1;\n}\n#all-search .row.items-center, #all-search .column.items-center, .all-search-config .row.items-center, .all-search-config .column.items-center {\n  align-items: center;\n}\n#all-search .row.items-end, #all-search .column.items-end, .all-search-config .row.items-end, .all-search-config .column.items-end {\n  align-items: flex-end;\n}\n#all-search .row.items-stretch, #all-search .column.items-stretch, .all-search-config .row.items-stretch, .all-search-config .column.items-stretch {\n  align-items: stretch;\n}\n#all-search .row.justify-center, #all-search .column.justify-center, .all-search-config .row.justify-center, .all-search-config .column.justify-center {\n  justify-content: center;\n}\n#all-search .row.justify-end, #all-search .column.justify-end, .all-search-config .row.justify-end, .all-search-config .column.justify-end {\n  justify-content: flex-end;\n}\n#all-search .row.justify-between, #all-search .column.justify-between, .all-search-config .row.justify-between, .all-search-config .column.justify-between {\n  justify-content: space-between;\n}\n#all-search .row.flex-wrap, .all-search-config .row.flex-wrap {\n  flex-wrap: wrap;\n}\n#all-search .row.content-center, .all-search-config .row.content-center {\n  align-content: center;\n}\n#all-search .row.content-end, .all-search-config .row.content-end {\n  align-content: end;\n}\n#all-search p, .all-search-config p {\n  margin: 0;\n}\n\n.as-overlay {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 999991;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n  overflow: auto;\n}";
    injectStyle(css$b);
    const _sfc_main$b = {
        name: "overlay",
        setup(props, {emit: emit}) {
            let mouseDownTarget = false;
            let mouseUpTarget = false;
            const onMaskClick = e => {
                if (mouseDownTarget && mouseUpTarget) {
                    emit("click", e);
                }
                mouseDownTarget = mouseUpTarget = false;
            };
            const onMouseDown = e => {
                mouseDownTarget = e.target === e.currentTarget;
            };
            const onMouseUp = e => {
                mouseUpTarget = e.target === e.currentTarget;
            };
            return {
                onMouseDown: onMouseDown,
                onMouseUp: onMouseUp,
                onMaskClick: onMaskClick
            };
        }
    };
    function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createElementBlock("div", {
            class: "as-overlay",
            onMousedown: _cache[0] || (_cache[0] = (...args) => $setup.onMouseDown && $setup.onMouseDown(...args)),
            onMouseup: _cache[1] || (_cache[1] = (...args) => $setup.onMouseUp && $setup.onMouseUp(...args)),
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.onMaskClick && $setup.onMaskClick(...args))
        }, [ Vue.renderSlot(_ctx.$slots, "default") ], 32);
    }
    var overlay = _export_sfc(_sfc_main$b, [ [ "render", _sfc_render$b ] ]);
    var css$a = '/* radio */\nlabel.as-radio {\n  color: var(--as-primary-text-color);\n  font-weight: 500;\n  line-height: 1;\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  white-space: nowrap;\n  outline: none;\n  font-size: 14px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\nlabel.as-radio + label.as-radio {\n  margin-left: 14px;\n}\nlabel.as-radio input {\n  position: absolute;\n  opacity: 0;\n  visibility: hidden;\n}\nlabel.as-radio .as-radio-icon {\n  display: inline-block;\n  position: relative;\n  width: 12px;\n  height: 12px;\n  background: var(--as-bg-color);\n  border: 1px solid #979797;\n  border-radius: 50%;\n  vertical-align: -2px;\n}\nlabel.as-radio input:checked + .as-radio-icon:after {\n  position: absolute;\n  content: "";\n  width: 6px;\n  height: 6px;\n  background-color: var(--as-bg-color);\n  border-radius: 50%;\n  top: 3px;\n  left: 3px;\n}\nlabel.as-radio input:checked + .as-radio-icon {\n  background: var(--as-primary-color);\n  border: 1px solid var(--as-primary-color);\n}\nlabel.as-radio input:disabled + .as-radio-icon {\n  background-color: #e8e8e8;\n  border: solid 1px #979797;\n}\nlabel.as-radio input:disabled:checked + .as-radio-icon:after {\n  background-color: #c1c1c1;\n}\nlabel.as-radio.as-radio-animate .as-radio-icon {\n  transition: background-color ease-out 0.3s;\n}\nlabel.as-radio .as-radio-label {\n  margin-left: 6px;\n  font-size: 14px;\n}';
    injectStyle(css$a);
    const _sfc_main$a = {
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
        setup(props, ctx) {
            const model = Vue.computed({
                get() {
                    return props.modelValue;
                },
                set(value) {
                    ctx.emit("update:modelValue", value);
                }
            });
            return {
                model: model
            };
        }
    };
    const _hoisted_1$6 = {
        class: "as-radio as-radio-animate"
    };
    const _hoisted_2$5 = [ "value" ];
    const _hoisted_3$2 = Vue.createElementVNode("i", {
        class: "as-radio-icon"
    }, null, -1);
    const _hoisted_4$1 = {
        class: "as-radio-label"
    };
    function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createElementBlock("label", _hoisted_1$6, [ Vue.withDirectives(Vue.createElementVNode("input", {
            type: "radio",
            value: $props.label,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.model = $event)
        }, null, 8, _hoisted_2$5), [ [ Vue.vModelRadio, $setup.model ] ]), _hoisted_3$2, Vue.createElementVNode("span", _hoisted_4$1, [ Vue.renderSlot(_ctx.$slots, "default") ]) ]);
    }
    var radio = _export_sfc(_sfc_main$a, [ [ "render", _sfc_render$a ] ]);
    var css$9 = ".as-label {\n  vertical-align: middle;\n  float: left;\n  font-size: 14px;\n  color: var(--as-primary-text-color);\n  line-height: 40px;\n  padding: 0 12px 0 0;\n  box-sizing: border-box;\n}\n\n.as-content {\n  line-height: 40px;\n  position: relative;\n  font-size: 14px;\n}";
    injectStyle(css$9);
    const _sfc_main$9 = {
        name: "form-item",
        props: {
            labelWidth: {
                type: [ String, Number ],
                default: 80
            },
            label: {
                type: [ String, Number ],
                default: ""
            }
        },
        setup(props) {
            const labelStyle = Vue.computed((() => ({
                width: `${props.labelWidth}px`
            })));
            const contentStyle = Vue.computed((() => ({
                marginLeft: `${props.labelWidth}px`
            })));
            return {
                labelStyle: labelStyle,
                contentStyle: contentStyle
            };
        }
    };
    const _hoisted_1$5 = [ "textContent" ];
    function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createElementBlock("div", null, [ Vue.createElementVNode("label", {
            class: "as-label",
            style: Vue.normalizeStyle($setup.labelStyle),
            textContent: Vue.toDisplayString($props.label)
        }, null, 12, _hoisted_1$5), Vue.createElementVNode("div", {
            class: "as-content",
            style: Vue.normalizeStyle($setup.contentStyle)
        }, [ Vue.renderSlot(_ctx.$slots, "default") ], 4) ]);
    }
    var formItem = _export_sfc(_sfc_main$9, [ [ "render", _sfc_render$9 ] ]);
    var css$8 = ".as-button {\n  display: inline-block;\n  line-height: 1;\n  white-space: nowrap;\n  cursor: pointer;\n  background: #fff;\n  border: 1px solid #dcdfe6;\n  color: var(--as-primary-text-color);\n  text-align: center;\n  box-sizing: border-box;\n  outline: none;\n  margin: 0;\n  transition: 0.1s;\n  font-weight: 500;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  padding: 12px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n\n.as-button.as-button__text {\n  border-color: transparent;\n  color: var(--as-primary-color);\n  background: transparent;\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.as-button.as-button__primary {\n  color: #fff;\n  background-color: var(--as-primary-color);\n  border-color: var(--as-primary-color);\n}";
    injectStyle(css$8);
    const _sfc_main$8 = {
        name: "xButton",
        props: {
            type: {
                type: String,
                default: "primary"
            }
        }
    };
    function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createElementBlock("button", {
            class: Vue.normalizeClass([ "as-button", `as-button__${$props.type}` ])
        }, [ Vue.renderSlot(_ctx.$slots, "default") ], 2);
    }
    var button = _export_sfc(_sfc_main$8, [ [ "render", _sfc_render$8 ] ]);
    var css$7 = '@charset "UTF-8";\n.as-color-set .as-color-label {\n  line-height: 1;\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  white-space: nowrap;\n  outline: none;\n  vertical-align: middle;\n}\n.as-color-set .input—color {\n  width: 30px;\n  height: 30px;\n  padding: 4px;\n  border: 1px solid #e6e6e6;\n  border-radius: 4px;\n  background-color: var(--as-secondary-background-color);\n  box-sizing: border-box;\n}\n.as-color-set .input—color::-webkit-color-swatch {\n  border: 0;\n}\n.as-color-set .input—color::-webkit-color-swatch-wrapper {\n  padding: 0;\n}\n.as-color-set .reset-btn {\n  margin-left: 20px;\n}';
    injectStyle(css$7);
    const _sfc_main$7 = {
        name: "color",
        components: {
            asButton: button
        },
        props: {
            modelValue: {
                type: [ String, Number ]
            }
        },
        setup(props, ctx) {
            const model = Vue.computed({
                get() {
                    return props.modelValue;
                },
                set(value) {
                    ctx.emit("update:modelValue", value);
                }
            });
            const reset = () => {
                model.value = "";
            };
            return {
                model: model,
                reset: reset
            };
        }
    };
    const _hoisted_1$4 = {
        class: "as-color-set"
    };
    const _hoisted_2$4 = {
        class: "as-color-label"
    };
    function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_asButton = Vue.resolveComponent("asButton");
        return Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$4, [ Vue.createElementVNode("label", _hoisted_2$4, [ Vue.withDirectives(Vue.createElementVNode("input", {
            class: "input—color",
            type: "color",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.model = $event)
        }, null, 512), [ [ Vue.vModelText, $setup.model ] ]) ]), Vue.createVNode(_component_asButton, {
            class: "reset-btn",
            type: "text",
            onClick: $setup.reset
        }, {
            default: Vue.withCtx((() => [ Vue.createTextVNode(" 重置 ") ])),
            _: 1
        }, 8, [ "onClick" ]) ]);
    }
    var color = _export_sfc(_sfc_main$7, [ [ "render", _sfc_render$7 ] ]);
    var css$6 = "#all-search .row, .all-search-config .row {\n  display: flex;\n}\n#all-search .column, .all-search-config .column {\n  display: flex;\n  flex-direction: column;\n}\n#all-search .col, .all-search-config .col {\n  flex: 1;\n}\n#all-search .row.items-center, #all-search .column.items-center, .all-search-config .row.items-center, .all-search-config .column.items-center {\n  align-items: center;\n}\n#all-search .row.items-end, #all-search .column.items-end, .all-search-config .row.items-end, .all-search-config .column.items-end {\n  align-items: flex-end;\n}\n#all-search .row.items-stretch, #all-search .column.items-stretch, .all-search-config .row.items-stretch, .all-search-config .column.items-stretch {\n  align-items: stretch;\n}\n#all-search .row.justify-center, #all-search .column.justify-center, .all-search-config .row.justify-center, .all-search-config .column.justify-center {\n  justify-content: center;\n}\n#all-search .row.justify-end, #all-search .column.justify-end, .all-search-config .row.justify-end, .all-search-config .column.justify-end {\n  justify-content: flex-end;\n}\n#all-search .row.justify-between, #all-search .column.justify-between, .all-search-config .row.justify-between, .all-search-config .column.justify-between {\n  justify-content: space-between;\n}\n#all-search .row.flex-wrap, .all-search-config .row.flex-wrap {\n  flex-wrap: wrap;\n}\n#all-search .row.content-center, .all-search-config .row.content-center {\n  align-content: center;\n}\n#all-search .row.content-end, .all-search-config .row.content-end {\n  align-content: end;\n}\n#all-search p, .all-search-config p {\n  margin: 0;\n}\n\n.as-setting {\n  position: relative;\n}\n.as-setting.horizontal {\n  box-shadow: -4px 0 10px 0 rgba(0, 0, 0, 0.12);\n  display: flex;\n}\n\n.as-setting-btn {\n  line-height: 30px;\n  padding: 0 14px;\n  position: relative;\n  margin: 0;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 14px;\n  color: var(--as-primary-text-color);\n  text-align: center;\n}\n.as-setting-btn:hover {\n  color: var(--as-primary-color);\n  background-color: rgba(0, 0, 0, 0.04);\n}\n\n.as-side-bar {\n  width: 20vw;\n  min-width: 300px;\n  right: 0;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  box-sizing: border-box;\n  background-color: var(--as-bg-color);\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);\n  overflow: hidden;\n}\n.as-side-bar > header {\n  font-size: 16px;\n  align-items: center;\n  color: var(--as-primary-text-color);\n  display: flex;\n  margin-bottom: 32px;\n  padding: 20px 24px 0;\n}\n.as-side-bar > section {\n  padding: 10px 24px;\n  height: 100%;\n  flex: 1;\n}\n.as-side-bar > footer {\n  padding: 10px 24px 30px;\n}\n.as-side-bar > footer .link {\n  font-size: 14px;\n  text-decoration: none;\n}\n.as-side-bar > footer .link:visited {\n  color: var(--as-primary-text-color);\n}\n.as-side-bar > footer .link + .link {\n  margin-left: 20px;\n}\n\n.overlay-enter-active, .overlay-leave-active {\n  transition: opacity 0.3s;\n}\n\n.overlay-enter-from, .overlay-leave-to {\n  opacity: 0;\n}\n\n.overlay-enter-active .as-side-bar {\n  animation: rtl-drawer-animation 0.3s linear reverse;\n}\n\n.overlay-leave-active .as-side-bar {\n  animation: rtl-drawer-animation 0.3s linear;\n}\n\n@keyframes rtl-drawer-animation {\n  0% {\n    transform: translate(0);\n  }\n  to {\n    transform: translate(100%);\n  }\n}";
    injectStyle(css$6);
    const _sfc_main$6 = {
        name: "side-bar",
        components: {
            overlay: overlay,
            asRadio: radio,
            formItem: formItem,
            color: color,
            asButton: button
        },
        setup() {
            const visible = Vue.ref(false);
            const open = () => {
                visible.value = true;
            };
            const onMaskClick = () => {
                visible.value = false;
            };
            const {mode: mode} = useMode();
            const {alignList: alignList, align: align} = useAlign();
            const {primaryColor: primaryColor, bgColor: bgColor, primaryTextColor: primaryTextColor} = useColor();
            const {show: show, options: options, scrollHide: scrollHide} = useSwitchShow();
            const {favicon: favicon} = useFavicon();
            const {toolbar: toolbar} = useToolbar();
            function clearIconCache() {
                if (window.confirm("确认要清除图标的缓存吗")) {
                    delSession("iconCache");
                }
            }
            function resetSites() {
                if (window.confirm("确认要重置所有网址吗")) {
                    delSession("sites");
                }
            }
            return {
                mode: mode,
                visible: visible,
                open: open,
                onMaskClick: onMaskClick,
                alignList: alignList,
                align: align,
                favicon: favicon,
                toolbar: toolbar,
                primaryColor: primaryColor,
                bgColor: bgColor,
                primaryTextColor: primaryTextColor,
                show: show,
                options: options,
                scrollHide: scrollHide,
                clearIconCache: clearIconCache,
                resetSites: resetSites
            };
        }
    };
    const _hoisted_1$3 = Vue.createElementVNode("header", {
        class: "header"
    }, " 设置 ", -1);
    const _hoisted_2$3 = Vue.createElementVNode("footer", null, [ Vue.createElementVNode("a", {
        class: "link",
        title: "all-search",
        href: "https://endday.github.io/all-search/",
        target: "_blank"
    }, " 设置页 "), Vue.createElementVNode("a", {
        class: "link",
        title: "github",
        href: "https://github.com/endday/all-search/issues",
        target: "_blank"
    }, " 意见反馈 ") ], -1);
    function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_as_radio = Vue.resolveComponent("as-radio");
        const _component_form_item = Vue.resolveComponent("form-item");
        const _component_color = Vue.resolveComponent("color");
        const _component_as_button = Vue.resolveComponent("as-button");
        const _component_overlay = Vue.resolveComponent("overlay");
        return Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [ Vue.createElementVNode("div", {
            class: Vue.normalizeClass([ "as-setting", $setup.mode ])
        }, [ Vue.createElementVNode("div", {
            class: "as-setting-btn",
            onClick: _cache[0] || (_cache[0] = $event => $setup.show = false)
        }, " 收起 "), Vue.createElementVNode("div", {
            class: "as-setting-btn",
            onClick: _cache[1] || (_cache[1] = (...args) => $setup.open && $setup.open(...args))
        }, " 设置 ") ], 2), (Vue.openBlock(), Vue.createBlock(Vue.Teleport, {
            to: "#all-search"
        }, [ Vue.createVNode(Vue.Transition, {
            name: "overlay",
            appear: ""
        }, {
            default: Vue.withCtx((() => [ Vue.withDirectives(Vue.createVNode(_component_overlay, {
                onClick: $setup.onMaskClick
            }, {
                default: Vue.withCtx((() => [ Vue.createVNode(Vue.Transition, {
                    name: "drawer",
                    appear: ""
                }, {
                    default: Vue.withCtx((() => [ Vue.withDirectives(Vue.createElementVNode("div", {
                        "aria-modal": "true",
                        role: "dialog",
                        class: "as-side-bar",
                        onClick: _cache[13] || (_cache[13] = Vue.withModifiers((() => {}), [ "stop" ]))
                    }, [ _hoisted_1$3, Vue.createElementVNode("section", null, [ Vue.createVNode(_component_form_item, {
                        label: "工具栏"
                    }, {
                        default: Vue.withCtx((() => [ Vue.createVNode(_component_as_radio, {
                            label: 1,
                            modelValue: $setup.toolbar,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.toolbar = $event)
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode("显示 ") ])),
                            _: 1
                        }, 8, [ "modelValue" ]), Vue.createVNode(_component_as_radio, {
                            label: 2,
                            modelValue: $setup.toolbar,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $setup.toolbar = $event)
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode("隐藏 ") ])),
                            _: 1
                        }, 8, [ "modelValue" ]) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "方向"
                    }, {
                        default: Vue.withCtx((() => [ Vue.createVNode(_component_as_radio, {
                            label: "horizontal",
                            modelValue: $setup.mode,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.mode = $event)
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode("横向 ") ])),
                            _: 1
                        }, 8, [ "modelValue" ]), Vue.createVNode(_component_as_radio, {
                            label: "vertical",
                            modelValue: $setup.mode,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $setup.mode = $event)
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode("竖向 ") ])),
                            _: 1
                        }, 8, [ "modelValue" ]) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "对齐"
                    }, {
                        default: Vue.withCtx((() => [ (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList($setup.alignList, (([key, value]) => (Vue.openBlock(), 
                        Vue.createBlock(_component_as_radio, {
                            key: key,
                            label: key,
                            modelValue: $setup.align,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $setup.align = $event)
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode(Vue.toDisplayString(value), 1) ])),
                            _: 2
                        }, 1032, [ "label", "modelValue" ])))), 128)) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "滚动隐藏"
                    }, {
                        default: Vue.withCtx((() => [ (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList($setup.options, (([key, value]) => (Vue.openBlock(), 
                        Vue.createBlock(_component_as_radio, {
                            key: key,
                            label: key,
                            modelValue: $setup.scrollHide,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $setup.scrollHide = $event)
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode(Vue.toDisplayString(value), 1) ])),
                            _: 2
                        }, 1032, [ "label", "modelValue" ])))), 128)) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "图标"
                    }, {
                        default: Vue.withCtx((() => [ Vue.createVNode(_component_as_radio, {
                            label: 1,
                            modelValue: $setup.favicon,
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $setup.favicon = $event)
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode("显示 ") ])),
                            _: 1
                        }, 8, [ "modelValue" ]), Vue.createVNode(_component_as_radio, {
                            label: 2,
                            modelValue: $setup.favicon,
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $setup.favicon = $event)
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode("隐藏 ") ])),
                            _: 1
                        }, 8, [ "modelValue" ]) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "主题色"
                    }, {
                        default: Vue.withCtx((() => [ Vue.createVNode(_component_color, {
                            name: "primaryColor",
                            modelValue: $setup.primaryColor,
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $setup.primaryColor = $event)
                        }, null, 8, [ "modelValue" ]) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "背景色"
                    }, {
                        default: Vue.withCtx((() => [ Vue.createVNode(_component_color, {
                            name: "bgColor",
                            modelValue: $setup.bgColor,
                            "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => $setup.bgColor = $event)
                        }, null, 8, [ "modelValue" ]) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "文字色"
                    }, {
                        default: Vue.withCtx((() => [ Vue.createVNode(_component_color, {
                            name: "primaryTextColor",
                            modelValue: $setup.primaryTextColor,
                            "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => $setup.primaryTextColor = $event)
                        }, null, 8, [ "modelValue" ]) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "图标缓存"
                    }, {
                        default: Vue.withCtx((() => [ Vue.createVNode(_component_as_button, {
                            type: "text",
                            onClick: $setup.clearIconCache
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode(" 清除 ") ])),
                            _: 1
                        }, 8, [ "onClick" ]) ])),
                        _: 1
                    }), Vue.createVNode(_component_form_item, {
                        label: "重置网址"
                    }, {
                        default: Vue.withCtx((() => [ Vue.createVNode(_component_as_button, {
                            type: "text",
                            onClick: $setup.resetSites
                        }, {
                            default: Vue.withCtx((() => [ Vue.createTextVNode(" 重置 ") ])),
                            _: 1
                        }, 8, [ "onClick" ]) ])),
                        _: 1
                    }) ]), _hoisted_2$3 ], 512), [ [ Vue.vShow, $setup.visible ] ]) ])),
                    _: 1
                }) ])),
                _: 1
            }, 8, [ "onClick" ]), [ [ Vue.vShow, $setup.visible ] ]) ])),
            _: 1
        }) ])) ], 64);
    }
    var sideBar = _export_sfc(_sfc_main$6, [ [ "render", _sfc_render$6 ] ]);
    function throttle(fn, delay = 500) {
        let canRun = true;
        return function() {
            if (!canRun) return;
            canRun = false;
            setTimeout((() => {
                fn.apply(this, arguments);
                canRun = true;
            }), delay);
        };
    }
    const y = Vue.ref(0);
    const direction = Vue.ref(0);
    function useScroll() {
        const scrollHandler = throttle((function(e) {
            const eventTarget = e.target === document ? e.target.documentElement : e.target;
            const scrollTop = eventTarget.scrollTop;
            if (scrollTop < y.value) {
                direction.value = "top";
            } else if (scrollTop > y.value) {
                direction.value = "bottom";
            } else {
                direction.value = "mid";
            }
            y.value = scrollTop;
        }), 50);
        if (window) {
            window.addEventListener("scroll", scrollHandler);
        }
        return {
            y: y,
            direction: direction
        };
    }
    var css$5 = "\n.as-hover-btn[data-v-ad24c1fe] {\n  position: fixed;\n  z-index: 99999;\n  font-weight: 600;\n  font-size: 17px;\n  color: var(--as-primary-color);\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);\n  border: 1px var(--as-border-color) solid;\n  opacity: 0.6;\n  cursor: pointer;\n}\n.as-hover-btn-horizontal[data-v-ad24c1fe] {\n  top: 0;\n  left: 50%;\n  transform: translateY(0) translateX(-50%);\n  padding: 0 16px;\n  height: 28px;\n  line-height: 28px;\n}\n.as-hover-btn-vertical[data-v-ad24c1fe] {\n  left: 0;\n  top: 50%;\n  transform: translateY(-200%) translateX(0) rotate(90deg);\n  transform-origin: 0 100%;\n  padding: 0 16px;\n  height: 28px;\n  line-height: 28px;\n}\n.hover-btn.as-hide[data-v-ad24c1fe] {\n  transition: transform 0.2s;\n  transform: translateY(-100%) translateX(-50%);\n}\n";
    injectStyle(css$5);
    const _sfc_main$5 = {
        name: "hover-btn",
        setup() {
            let {show: show, scrollHide: scrollHide} = useSwitchShow();
            const isMobileVal = isMobile();
            const handleMouseEnter = () => {
                if (!isMobileVal) {
                    show.value = true;
                }
            };
            const handleClick = () => {
                if (isMobileVal) {
                    show.value = true;
                }
            };
            const {direction: direction} = useScroll();
            Vue.watch(direction, (value => {
                if (show.value && scrollHide.value && (value === scrollHide.value || scrollHide.value === "all")) {
                    show.value = false;
                }
            }));
            const {mode: mode} = useMode();
            const className = Vue.computed((() => ({
                "as-hide": !show.value,
                [`as-hover-btn-${mode.value}`]: true
            })));
            return {
                handleMouseEnter: handleMouseEnter,
                handleClick: handleClick,
                className: className
            };
        }
    };
    function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createElementBlock("div", {
            class: Vue.normalizeClass([ "as-hover-btn", $setup.className ]),
            onMouseenter: _cache[0] || (_cache[0] = (...args) => $setup.handleMouseEnter && $setup.handleMouseEnter(...args)),
            onClick: _cache[1] || (_cache[1] = (...args) => $setup.handleClick && $setup.handleClick(...args))
        }, " All Search ", 34);
    }
    var hoverBtn = _export_sfc(_sfc_main$5, [ [ "render", _sfc_render$5 ], [ "__scopeId", "data-v-ad24c1fe" ] ]);
    var css$4 = "\n.svgfont[data-v-69434329] {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  fill: currentColor;\n  vertical-align: -0.1em;\n  font-size: 16px;\n}\n";
    injectStyle(css$4);
    const _sfc_main$4 = {
        name: "svg"
    };
    const _hoisted_1$2 = {
        style: {
            display: "none"
        }
    };
    const _hoisted_2$2 = Vue.createStaticVNode('<symbol id="icon-disk" viewBox="0 0 1024 1024" data-v-69434329><path d="M722.858667 234.666667a64 64 0 0 1 56.533333 33.984L874.666667 448v256a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V448l95.274667-179.349333A64 64 0 0 1 301.141333 234.666667h421.717334zM810.666667 501.333333H213.333333V704h597.333334v-202.666667zM618.666667 576v64H384v-64h234.666667z m128 0v64h-64v-64h64z m-23.808-277.333333H301.141333l-73.685333 138.666666h569.066667L722.858667 298.666667z" data-v-69434329></path></symbol><symbol id="icon-personal" viewBox="0 0 1024 1024" data-v-69434329><path d="M490.261333 173.44a49.066667 49.066667 0 0 1 64.064 19.178667l1.664 3.093333 87.850667 177.813333 196.352 28.501334a49.066667 49.066667 0 0 1 29.717333 81.066666l-2.538666 2.645334L725.333333 624l33.536 195.349333a49.066667 49.066667 0 0 1-68.010666 53.269334l-3.157334-1.514667L512 778.858667l-175.701333 92.266666a49.066667 49.066667 0 0 1-71.637334-48.426666l0.469334-3.328L298.666667 624.021333 156.629333 485.76a49.066667 49.066667 0 0 1 23.893334-83.114667l3.285333-0.597333 196.352-28.501333 87.850667-177.813334a49.066667 49.066667 0 0 1 22.250666-22.272z m-67.626666 258.581333l-199.658667 28.992 144.469333 140.650667-34.133333 198.741333L512 706.56l178.688 93.845333-34.133333-198.741333 144.469333-140.650667-199.658667-28.992L512 251.157333l-89.386667 180.864z" data-v-69434329></path></symbol><symbol id="icon-shopping" viewBox="0 0 1024 1024" data-v-69434329><path d="M330.667 768a53.333 53.333 0 1 1 0 106.667 53.333 53.333 0 0 1 0-106.667z m384 0a53.333 53.333 0 1 1 0 106.667 53.333 53.333 0 0 1 0-106.667zM94.763 160h54.741a96 96 0 0 1 92.907 71.787l1.024 4.394 13.205 62.486h0.213L299.733 504l32.491 157.333h402.219l61.653-298.666H313.813l-13.376-64h495.68a64 64 0 0 1 62.678 76.949L797.14 674.283a64 64 0 0 1-62.698 51.05H332.224a64 64 0 0 1-62.677-51.05L208.96 380.864l-0.405 0.085-27.734-131.562a32 32 0 0 0-28.309-25.238l-2.987-0.149H94.741v-64h54.742z" data-v-69434329></path></symbol><symbol id="icon-developer" viewBox="0 0 1024 1024" data-v-69434329><path d="M541.141333 268.864l61.717334 16.938667-132.394667 482.474666-61.717333-16.938666 132.394666-482.474667zM329.002667 298.666667l44.885333 45.610666-175.36 172.586667 175.04 167.573333-44.266667 46.229334L106.666667 517.504 329.002667 298.666667z m355.882666 0l222.336 218.837333L684.586667 730.666667l-44.266667-46.229334 175.018667-167.573333L640 344.277333 684.885333 298.666667z" data-v-69434329></path></symbol><symbol id="icon-image" viewBox="0 0 1024 1024" data-v-69434329><path d="M817.365333 213.333333a64 64 0 0 1 64 64v469.333334a64 64 0 0 1-64 64h-597.333333a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64h597.333333z m0 64h-597.333333v469.333334h597.333333V277.333333zM746.666667 371.114667v63.957333c-100.608-1.450667-163.306667 30.293333-193.493334 94.229333l-2.304 5.12-2.858666 6.357334c-44.010667 95.146667-129.088 142.464-249.322667 140.842666v-64c96.234667 1.6 157.930667-32.384 190.933333-103.04l2.538667-5.632 2.624-5.845333c41.664-89.664 127.488-133.333333 251.882667-131.989333z m-397.696-17.237334a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z" data-v-69434329></path></symbol><symbol id="icon-social" viewBox="0 0 1024 1024" data-v-69434329><path d="M617.216 170.666667c114.24 0 206.869333 92.608 206.869333 206.869333 0 72.533333-37.333333 136.32-93.802666 173.269333l168.746666 196.885334A64 64 0 0 1 850.432 853.333333l-101.888 0.021334c11.221333-19.413333 14.293333-42.496 8.746667-64L850.432 789.333333 634.24 537.109333l60.992-39.872a142.869333 142.869333 0 0 0-75.584-262.549333 251.264 251.264 0 0 0-55.424-57.173333A206.976 206.976 0 0 1 617.216 170.666667z m-61.162667 412.757333l140.8 164.266667A64 64 0 0 1 648.213333 853.333333H181.824a64 64 0 0 1-48.597333-105.642666l140.8-164.266667c18.026667 12.373333 37.76 22.442667 58.773333 29.781333L181.824 789.333333h466.410667l-150.997334-176.128c21.034667-7.338667 40.768-17.386667 58.816-29.781333zM415.04 170.666667c114.24 0 206.869333 92.608 206.869333 206.869333 0 114.24-92.629333 206.869333-206.869333 206.869333-114.261333 0-206.869333-92.629333-206.869333-206.869333C208.170667 263.274667 300.778667 170.666667 415.04 170.666667z m0 64a142.869333 142.869333 0 1 0 0 285.738666 142.869333 142.869333 0 0 0 0-285.738666z" data-v-69434329></path></symbol><symbol id="icon-news" viewBox="0 0 1024 1024" data-v-69434329><path d="M640 170.666667a64 64 0 0 1 64 64v490.666666h-64V234.666667H213.333333v554.666666h597.333334V362.666667h-64v-64h64a64 64 0 0 1 64 64v426.666666a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V234.666667a64 64 0 0 1 64-64h426.666667z m-192 320v64h-170.666667v-64h170.666667z m128-128v64H277.333333v-64h298.666667z" data-v-69434329></path></symbol><symbol id="icon-knowledge" viewBox="0 0 1024 1024" data-v-69434329><path d="M168.106667 621.44l120.746666 57.962667 223.274667 108.138666 215.317333-104.32 128.768-61.674666a64 64 0 0 1-29.952 84.970666l-286.229333 138.624a64 64 0 0 1-55.808 0L197.994667 706.517333A64 64 0 0 1 168.106667 621.44z m687.829333-133.930667a64 64 0 0 1-29.674667 85.546667L540.010667 711.68a64 64 0 0 1-55.808 0L197.994667 573.056A64 64 0 0 1 166.826667 490.88l317.013333 149.525333 28.288 13.696 286.229333-138.624-0.149333-0.064 57.728-27.882666zM540.032 185.792l286.208 138.602667a64 64 0 0 1 0 115.2l-286.208 138.624a64 64 0 0 1-55.808 0L197.994667 439.594667a64 64 0 0 1 0-115.2L484.224 185.813333a64 64 0 0 1 55.808 0z m-27.904 57.6l-286.229333 138.602667 286.229333 138.624 286.229333-138.624-286.229333-138.602667z" data-v-69434329></path></symbol><symbol id="icon-music" viewBox="0 0 1024 1024" data-v-69434329><path d="M515.562667 232.91733299c159.061333 0 288 128.938667 288 288v22.250667A85.354667 85.354667 0 0 1 874.666667 627.30666699v93.994666a85.333333 85.333333 0 0 1-85.333334 85.333334h-116.138666V541.97333299h66.346666v-21.056c0-121.685333-97.002667-220.693333-217.92-223.914666l-6.058666-0.085334h-7.125334c-123.712 0-224 100.288-224 224v21.056h66.368v264.661334H234.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-93.994666a85.354667 85.354667 0 0 1 71.104-84.138667v-22.250667c0-159.061333 128.938667-288 288-288z m27.52 313.813334v256h-62.165334v-256h62.165334z m103.616 42.666666v192H584.533333v-192h62.165334z m-207.232 0v192h-62.165334v-192H439.466667z m-152.661334 16.576H234.666667a21.333333 21.333333 0 0 0-21.333334 21.333334v93.994666a21.333333 21.333333 0 0 0 21.333334 21.333334h52.138666v-136.661334z m502.528 0h-52.138666v136.661334H789.333333a21.333333 21.333333 0 0 0 21.333334-21.333334v-93.994666a21.333333 21.333333 0 0 0-21.333334-21.333334z" data-v-69434329></path></symbol><symbol id="icon-translate" viewBox="0 0 1024 1024" data-v-69434329><path d="M874.666667 192.00000033v64h-42.666667v426.666666c0 35.349333-30.72 64-68.565333 64h-149.354667l113.749333 128h-85.632l-113.770666-128h-11.562667l-113.749333 128h-85.610667l113.728-128h-170.666667C222.72 746.66666633 192 718.01600033 192 682.66666633V256.00000033H149.333333V192.00000033h725.333334z m-106.666667 64H256v426.666666h512V256.00000033zM405.333333 490.66666633v64h-64v-64h64z m277.333334 0v64H448v-64h234.666667z m0-106.666666v64H448v-64h234.666667z m-277.333334 0v64h-64v-64h64z" data-v-69434329></path></symbol><symbol id="icon-video" viewBox="0 0 1024 1024" data-v-69434329><path d="M658.069333 234.66666667a64 64 0 0 1 64 64l-0.021333 33.664 49.28-38.4A64 64 0 0 1 874.666667 344.44799967v338.368a64 64 0 0 1-103.338667 50.474667l-49.28-38.4v26.496a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V298.66666667a64 64 0 0 1 64-64h444.736z m0 64H213.333333v422.698667h444.736l-0.128-157.589334L810.666667 682.79466667V344.42666667l-152.704 118.933333 0.106666-164.693333zM384 375.97866667a42.666667 42.666667 0 0 1 22.741333 6.570667l133.866667 84.330666a42.666667 42.666667 0 0 1 0.32 72l-133.866667 86.016A42.666667 42.666667 0 0 1 341.333333 588.99199967v-170.346666a42.666667 42.666667 0 0 1 42.666667-42.666667z m21.333333 81.322667v92.629333l72.789334-46.762667L405.333333 457.30133367z" data-v-69434329></path></symbol><symbol id="icon-search" viewBox="0 0 1024 1024" data-v-69434329><path d="M469.333 192c153.174 0 277.334 124.16 277.334 277.333 0 68.054-24.534 130.411-65.216 178.688L846.336 818.24l-48.341 49.877L630.4 695.125a276.053 276.053 0 0 1-161.067 51.542C316.16 746.667 192 622.507 192 469.333S316.16 192 469.333 192z m0 64C351.51 256 256 351.51 256 469.333s95.51 213.334 213.333 213.334 213.334-95.51 213.334-213.334S587.157 256 469.333 256z" data-v-69434329></path></symbol><symbol id="icon-more" viewBox="0 0 1024 1024" data-v-69434329><path d="M437.333333 224C437.333333 183.466667 471.466667 149.333333 512 149.333333s74.666667 34.133333 74.666667 74.666667S552.533333 298.666667 512 298.666667s-74.666667-34.133333-74.666667-74.666667zM439.466667 512c0-40.533333 34.133333-74.666667 74.666666-74.666667s74.666667 34.133333 74.666667 74.666667-34.133333 74.666667-74.666667 74.666667-74.666667-34.133333-74.666666-74.666667zM437.333333 800c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667S552.533333 874.666667 512 874.666667s-74.666667-34.133333-74.666667-74.666667z" data-v-69434329></path></symbol>', 13);
    const _hoisted_15 = [ _hoisted_2$2 ];
    function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$2, _hoisted_15);
    }
    var iconfont = _export_sfc(_sfc_main$4, [ [ "render", _sfc_render$4 ], [ "__scopeId", "data-v-69434329" ] ]);
    var css$3 = ".bar-container[data-v-cb45deb0] {\n  display: flex;\n  padding: 2px;\n  max-width: 300px;\n  position: absolute;\n  z-index: 99999;\n  background-color: #fff;\n  color: #444;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 3px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 2px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.tool-bar-item[data-v-cb45deb0] {\n  margin: 0;\n  padding: 2px;\n  width: 20px;\n  height: 20px;\n  border: 1px solid #FFF;\n  cursor: pointer;\n  box-sizing: content-box;\n}\n.tool-bar-item[data-v-cb45deb0][data-v-cb45deb0]:hover {\n  border-color: var(--as-border-color);\n}\n\n.as-more-icon[data-v-cb45deb0] {\n  display: block;\n  font-size: 20px;\n}";
    injectStyle(css$3);
    function getSelection() {
        return window.getSelection().toString().trim();
    }
    function getSelectionRect() {
        const selection = window.getSelection();
        if (selection.rangeCount) {
            return selection.getRangeAt(0).getBoundingClientRect();
        }
        return null;
    }
    function scrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    function scrollLeft() {
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    }
    const _sfc_main$3 = {
        name: "selection-bar",
        components: {
            favicon: favicon,
            icon: icon
        },
        setup(props, ctx) {
            const {toolbar: show} = useToolbar();
            const list = Vue.reactive(initToolbar("tm"));
            const visible = Vue.ref(false);
            const toolbarEle = Vue.ref(null);
            const styleObj = Vue.reactive({
                top: 0,
                left: 0
            });
            const style = Vue.computed((() => ({
                top: `${styleObj.top - 20}px`,
                left: `${styleObj.left}px`
            })));
            const selectionShort = Vue.computed((() => {
                if (selection.value.length > 12) {
                    return `${selection.value.substr(0, 12)}...`;
                } else {
                    return selection.value;
                }
            }));
            let selectStart = false;
            function changeVisible(val) {
                visible.value = Boolean(val);
                Vue.nextTick((() => {
                    if (val) {
                        const toolbarClientRect = Vue.unref(toolbarEle).getBoundingClientRect();
                        const height = toolbarClientRect.bottom - toolbarClientRect.top;
                        const selectionRect = getSelectionRect();
                        if (selectionRect) {
                            const {x: x, right: right, left: left, top: top} = selectionRect;
                            styleObj.top = scrollTop() + top - height;
                            styleObj.left = scrollLeft() + x + (right - left) / 2 - toolbarClientRect.width / 2;
                        }
                    }
                }));
            }
            function isToolbarContains(el) {
                return Vue.unref(toolbarEle).contains(el);
            }
            window.addEventListener("mousedown", (function(e) {
                const include = e.target && getAsRoot().contains(e.target);
                if (!include) {
                    changeVisible(false);
                }
            }), true);
            window.addEventListener("mouseup", (function(e) {
                const include = e.target && getAsRoot().contains(e.target);
                const isToolbar = e.target && isToolbarContains(e.target);
                if (!include) {
                    selection.value = getSelection();
                    changeVisible(!!selection.value && selectStart);
                } else if (!isToolbar) {
                    selection.value = "";
                } else if (isToolbar) {
                    changeVisible(false);
                }
                selectStart = false;
            }), true);
            document.addEventListener("selectionchange", (function() {}), true);
            document.addEventListener("selectstart", (function() {
                selectStart = true;
            }), false);
            function handleClick(item, newWin) {
                const keyword = selection.value;
                if (newWin) {
                    window.open(item.url.replace("%s", keyword));
                } else {
                    window.location.href = item.url.replace("%s", keyword);
                }
            }
            function openMainDialog() {
                ctx.emit("open-dialog", selection.value);
            }
            return {
                show: show,
                list: list,
                visible: visible,
                toolbarEle: toolbarEle,
                style: style,
                selectionShort: selectionShort,
                handleClick: handleClick,
                openMainDialog: openMainDialog
            };
        }
    };
    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_favicon = Vue.resolveComponent("favicon");
        const _component_icon = Vue.resolveComponent("icon");
        return $setup.show === 1 ? Vue.withDirectives((Vue.openBlock(), Vue.createElementBlock("div", {
            key: 0,
            class: "bar-container",
            ref: "toolbarEle",
            style: Vue.normalizeStyle($setup.style)
        }, [ (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList($setup.list, ((item, i) => (Vue.openBlock(), 
        Vue.createBlock(_component_favicon, {
            class: "tool-bar-item",
            key: i,
            url: item.url,
            title: item.nameZh,
            onClick: [ Vue.withModifiers(($event => $setup.handleClick(item, true)), [ "exact" ]), Vue.withModifiers(($event => $setup.handleClick(item, false)), [ "ctrl", "exact" ]) ],
            onMouseup: Vue.withModifiers(($event => $setup.handleClick(item, false)), [ "middle", "exact" ])
        }, null, 8, [ "url", "title", "onClick", "onMouseup" ])))), 128)), Vue.createElementVNode("div", {
            class: "tool-bar-item",
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.openMainDialog && $setup.openMainDialog(...args))
        }, [ Vue.createVNode(_component_icon, {
            class: "as-more-icon",
            name: "more"
        }) ]) ], 4)), [ [ Vue.vShow, $setup.visible ] ]) : Vue.createCommentVNode("", true);
    }
    var selectionBar = _export_sfc(_sfc_main$3, [ [ "render", _sfc_render$3 ], [ "__scopeId", "data-v-cb45deb0" ] ]);
    var css$2 = '@charset "UTF-8";\n.as-dialog {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: 0;\n  z-index: 99999;\n}\n.as-dialog__mask {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(5px);\n          backdrop-filter: blur(5px);\n}\n.as-dialog-container {\n  position: relative;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  box-sizing: border-box;\n  min-width: 50%;\n  max-width: 80%;\n  z-index: 99;\n  margin: 40vh auto 50px;\n  transform: translateY(-40%);\n}\n.as-dialog__header {\n  position: relative;\n}\n.as-dialog__body {\n  padding: 0 20px 20px;\n  color: #666;\n  font-size: 14px;\n  word-break: break-all;\n}\n.as-dialog__footer {\n  padding: 10px 20px 20px;\n  text-align: right;\n  box-sizing: border-box;\n}\n.as-dialog__close {\n  display: inline-block;\n  position: absolute;\n  top: 16px;\n  right: 24px;\n  padding: 0;\n  background: transparent;\n  cursor: pointer;\n  font-size: 16px;\n  color: #909399;\n}\n.as-dialog__close:before {\n  content: "✖";\n}';
    injectStyle(css$2);
    const _sfc_main$2 = {
        name: "as-dialog",
        model: {
            prop: "visible",
            event: "change"
        },
        props: {
            visible: {
                type: Boolean,
                default: false
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
        setup(props, ctx) {
            const style = Vue.computed((() => {
                const obj = {};
                if (props.width) {
                    obj.width = props.width;
                }
                return obj;
            }));
            const localVisible = Vue.computed({
                get: () => props.visible,
                set: value => {
                    ctx.emit("update:visible", value);
                }
            });
            const handleClose = () => {
                localVisible.value = false;
            };
            return {
                style: style,
                handleClose: handleClose,
                localVisible: localVisible
            };
        }
    };
    const _hoisted_1$1 = {
        class: "as-dialog"
    };
    const _hoisted_2$1 = {
        class: "as-dialog__header"
    };
    const _hoisted_3$1 = {
        class: "as-dialog__body"
    };
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
        return Vue.withDirectives((Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$1, [ Vue.createElementVNode("div", {
            class: "as-dialog-container",
            style: Vue.normalizeStyle($setup.style)
        }, [ Vue.createElementVNode("div", _hoisted_2$1, [ Vue.renderSlot(_ctx.$slots, "header") ]), Vue.createElementVNode("div", _hoisted_3$1, [ Vue.renderSlot(_ctx.$slots, "default") ]) ], 4), Vue.createElementVNode("div", {
            class: "as-dialog__mask",
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.handleClose && $setup.handleClose(...args))
        }) ], 512)), [ [ Vue.vShow, $setup.localVisible ] ]);
    }
    var asDialog = _export_sfc(_sfc_main$2, [ [ "render", _sfc_render$2 ] ]);
    var css$1 = ".se-header {\n  padding: 15px 20px;\n  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);\n}\n\n.se-input-box {\n  border: 1px solid #ccc;\n  background-color: #FFFFFF;\n  overflow: hidden;\n  display: flex;\n  border-radius: 6px;\n  height: 40px;\n  align-items: center;\n  transition: 0.2s;\n  color: #222;\n}\n.se-input-box:hover {\n  border-color: rgba(223, 225, 229, 0);\n  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);\n}\n.se-input-box .se-input {\n  color: var(--as-primary-text-color);\n  background-color: transparent;\n  font-size: 16px;\n  height: 100%;\n  width: 100%;\n  line-height: 20px;\n  margin: 0 20px;\n  outline: none;\n  border: none;\n}\n\n.se-scrollbar-container {\n  height: 50vh;\n}\n\n.se-container {\n  margin-top: 10px;\n  display: flex;\n  border-radius: 6px;\n  flex-wrap: wrap;\n}\n\n.cate-container {\n  flex: 0 0 150px;\n  margin-bottom: 20px;\n}\n\n.cate-name {\n  padding: 0 10px;\n  height: 36px;\n  line-height: 36px;\n  font-size: 16px;\n}\n\n.cate-list {\n  list-style: none;\n  min-width: 110px;\n  box-sizing: border-box;\n}\n.cate-list .cate-item {\n  box-sizing: border-box;\n  padding: 0 10px;\n}\n.cate-list .cate-item .as-subMenu-text {\n  margin: 0;\n}\n.cate-list .cate-item a {\n  display: flex;\n  align-items: center;\n  height: 34px;\n  text-decoration: none;\n}\n.cate-list .cate-item:hover {\n  background-color: var(--as-secondary-background-color);\n  color: var(--as-primary-color);\n}";
    injectStyle(css$1);
    const _sfc_main$1 = {
        name: "search-dialog",
        components: {
            asDialog: asDialog,
            icon: icon,
            favicon: favicon,
            scrollbar: scrollbar
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            keyword: {
                type: [ String, Number ],
                default: ""
            }
        },
        emits: [ "update:visible" ],
        setup(props, ctx) {
            const localVisible = Vue.computed({
                get: () => props.visible,
                set: value => {
                    ctx.emit("update:visible", value);
                }
            });
            Vue.watch((() => props.visible), (val => {
                inputValue.value = val ? props.keyword : "";
            }));
            const inputValue = Vue.ref("");
            const sites = Vue.reactive(initSites("tm"));
            const handleClick = (item, newWin) => {
                const keyword = inputValue.value;
                if (newWin) {
                    window.open(item.url.replace("%s", keyword));
                } else {
                    window.location.href = item.url.replace("%s", keyword);
                }
            };
            return {
                localVisible: localVisible,
                sites: sites,
                inputValue: inputValue,
                handleClick: handleClick
            };
        }
    };
    const _hoisted_1 = {
        class: "se-header"
    };
    const _hoisted_2 = {
        class: "se-input-box"
    };
    const _hoisted_3 = {
        class: "se-container"
    };
    const _hoisted_4 = {
        class: "cate-name"
    };
    const _hoisted_5 = [ "textContent" ];
    const _hoisted_6 = {
        class: "cate-list"
    };
    const _hoisted_7 = [ "onClick", "onMouseup" ];
    const _hoisted_8 = [ "textContent" ];
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_icon = Vue.resolveComponent("icon");
        const _component_favicon = Vue.resolveComponent("favicon");
        const _component_scrollbar = Vue.resolveComponent("scrollbar");
        const _component_as_dialog = Vue.resolveComponent("as-dialog");
        return Vue.openBlock(), Vue.createBlock(_component_as_dialog, {
            visible: $setup.localVisible,
            "onUpdate:visible": _cache[1] || (_cache[1] = $event => $setup.localVisible = $event)
        }, {
            header: Vue.withCtx((() => [ Vue.createElementVNode("div", _hoisted_1, [ Vue.createElementVNode("div", _hoisted_2, [ $setup.localVisible ? Vue.withDirectives((Vue.openBlock(), 
            Vue.createElementBlock("input", {
                key: 0,
                autofocus: "",
                autocomplete: "off",
                class: "se-input",
                placeholder: "输入并搜索",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.inputValue = $event)
            }, null, 512)), [ [ Vue.vModelText, $setup.inputValue ] ]) : Vue.createCommentVNode("", true) ]) ]) ])),
            default: Vue.withCtx((() => [ Vue.createVNode(_component_scrollbar, {
                class: "se-scrollbar-container",
                noresize: ""
            }, {
                default: Vue.withCtx((() => [ Vue.createElementVNode("div", _hoisted_3, [ (Vue.openBlock(true), 
                Vue.createElementBlock(Vue.Fragment, null, Vue.renderList($setup.sites, (item => (Vue.openBlock(), 
                Vue.createElementBlock("div", {
                    key: item.name,
                    class: "cate-container"
                }, [ Vue.createElementVNode("p", _hoisted_4, [ Vue.createVNode(_component_icon, {
                    name: item.name
                }, null, 8, [ "name" ]), Vue.createElementVNode("span", {
                    textContent: Vue.toDisplayString(item.nameZh)
                }, null, 8, _hoisted_5) ]), Vue.createElementVNode("ul", _hoisted_6, [ (Vue.openBlock(true), 
                Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(item.list, ((child, i) => (Vue.openBlock(), 
                Vue.createElementBlock("li", {
                    key: `${item.name}_${i}`,
                    class: "cate-item"
                }, [ Vue.createElementVNode("a", {
                    href: "javascript:void 0",
                    onClick: [ Vue.withModifiers(($event => $setup.handleClick(child)), [ "exact" ]), Vue.withModifiers(($event => $setup.handleClick(child, true)), [ "ctrl", "exact" ]) ],
                    onMouseup: Vue.withModifiers(($event => $setup.handleClick(child, true)), [ "middle", "exact" ])
                }, [ Vue.createVNode(_component_favicon, {
                    class: "as-url-icon",
                    url: child.url,
                    icon: child.icon
                }, null, 8, [ "url", "icon" ]), Vue.createElementVNode("p", {
                    class: "as-subMenu-text",
                    textContent: Vue.toDisplayString(child.nameZh)
                }, null, 8, _hoisted_8) ], 40, _hoisted_7) ])))), 128)) ]) ])))), 128)) ]) ])),
                _: 1
            }) ])),
            _: 1
        }, 8, [ "visible" ]);
    }
    var searchDialog = _export_sfc(_sfc_main$1, [ [ "render", _sfc_render$1 ] ]);
    var css = '#all-search .row, .all-search-config .row {\n  display: flex;\n}\n#all-search .column, .all-search-config .column {\n  display: flex;\n  flex-direction: column;\n}\n#all-search .col, .all-search-config .col {\n  flex: 1;\n}\n#all-search .row.items-center, #all-search .column.items-center, .all-search-config .row.items-center, .all-search-config .column.items-center {\n  align-items: center;\n}\n#all-search .row.items-end, #all-search .column.items-end, .all-search-config .row.items-end, .all-search-config .column.items-end {\n  align-items: flex-end;\n}\n#all-search .row.items-stretch, #all-search .column.items-stretch, .all-search-config .row.items-stretch, .all-search-config .column.items-stretch {\n  align-items: stretch;\n}\n#all-search .row.justify-center, #all-search .column.justify-center, .all-search-config .row.justify-center, .all-search-config .column.justify-center {\n  justify-content: center;\n}\n#all-search .row.justify-end, #all-search .column.justify-end, .all-search-config .row.justify-end, .all-search-config .column.justify-end {\n  justify-content: flex-end;\n}\n#all-search .row.justify-between, #all-search .column.justify-between, .all-search-config .row.justify-between, .all-search-config .column.justify-between {\n  justify-content: space-between;\n}\n#all-search .row.flex-wrap, .all-search-config .row.flex-wrap {\n  flex-wrap: wrap;\n}\n#all-search .row.content-center, .all-search-config .row.content-center {\n  align-content: center;\n}\n#all-search .row.content-end, .all-search-config .row.content-end {\n  align-content: end;\n}\n#all-search p, .all-search-config p {\n  margin: 0;\n}\n\n.body-horizontal + body {\n  margin-top: 30px !important;\n  position: relative !important;\n}\n.body-horizontal + body [data-as-margin-top] {\n  margin-top: 30px !important;\n}\n.body-horizontal + body [data-as-transform] {\n  transform: translateY(30px);\n}\n.body-horizontal + body [data-as-border-top] {\n  border-top: rgba(0, 0, 0, 0) 30px solid;\n  box-sizing: content-box;\n}\n.body-horizontal + body [data-as-has-set] {\n  transition-duration: 0s;\n}\n\n.body-vertical + body {\n  margin-left: 90px !important;\n}\n\nbody, #all-search {\n  --as-horizontal-height: $height;\n  --as-primary-color: #1890ff;\n  --as-bg-color: #ffffff;\n  --as-primary-text-color: #606266;\n  --as-secondary-background-color: #f5f7fa;\n  --as-border-color: #e8e8e8;\n}\n\n#all-search {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n}\n\n/*@media (prefers-color-scheme: dark) {\n  #all-search {\n    --as-primary-color: #3d9be9;\n    --as-bg-color: #212121;\n    --as-primary-text-color: #e0e0e0;\n    --as-secondary-background-color: #444;\n    --as-border-color: #212121;\n  }\n}*/\n.as-horizontal {\n  height: 30px;\n  width: 100%;\n  top: 0;\n  border-bottom: 1px var(--as-border-color) solid;\n  flex-direction: row;\n  transition: transform 0.1s;\n}\n.as-horizontal.as-hide {\n  transform: translateY(-100%);\n}\n.as-horizontal.as-show {\n  transform: translateY(0);\n}\n\n.as-vertical {\n  height: 100%;\n  width: 90px;\n  top: 0;\n  left: 0;\n  border-right: 1px var(--as-border-color) solid;\n  flex-direction: column;\n  transition: transform 0.1s;\n}\n.as-vertical.as-hide {\n  transform: translateX(-100%);\n}\n.as-vertical.as-show {\n  transform: translateX(0);\n}\n\n.as-container {\n  opacity: 1 !important;\n  position: fixed;\n  display: flex;\n  background-color: var(--as-bg-color);\n  z-index: 999990;\n}';
    injectStyle(css);
    const _sfc_main = {
        name: "all-search",
        components: {
            logo: logo,
            asMenu: asMenu,
            sideBar: sideBar,
            hoverBtn: hoverBtn,
            iconfont: iconfont,
            selectionBar: selectionBar,
            searchDialog: searchDialog
        },
        setup() {
            const {isFullScreen: isFullScreen} = useFullScreen();
            const {mode: mode} = useMode();
            const {show: show} = useSwitchShow();
            const classList = Vue.computed((() => [ `as-${mode.value}`, show.value ? "as-show" : "as-hide" ]));
            const visible = Vue.computed((() => !site.invisible && !Vue.unref(isFullScreen)));
            Vue.watch([ mode, () => site, show ], (([newMode, site, newShow]) => {
                const remove = site.invisible || site.disabled || !newShow;
                changeBodyStyle(newMode, remove);
            }), {
                immediate: true,
                deep: true
            });
            let isInit = false;
            function init(site) {
                if (isInit || site.disabled) {
                    return;
                }
                protectStyle();
                initSpecialStyle();
                isInit = true;
            }
            Vue.watch(site, (newSite => {
                init(newSite);
            }), {
                immediate: true
            });
            const dialogVisible = Vue.ref(false);
            const keyword = Vue.ref("");
            function openDialog(text) {
                keyword.value = text;
                dialogVisible.value = true;
            }
            const {disabled: disabled} = Vue.toRefs(site);
            return {
                disabled: disabled,
                mode: mode,
                classList: classList,
                visible: visible,
                dialogVisible: dialogVisible,
                openDialog: openDialog,
                keyword: keyword
            };
        }
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_logo = Vue.resolveComponent("logo");
        const _component_as_menu = Vue.resolveComponent("as-menu");
        const _component_side_bar = Vue.resolveComponent("side-bar");
        const _component_hoverBtn = Vue.resolveComponent("hoverBtn");
        const _component_iconfont = Vue.resolveComponent("iconfont");
        const _component_selection_bar = Vue.resolveComponent("selection-bar");
        const _component_search_dialog = Vue.resolveComponent("search-dialog");
        return Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [ !$setup.disabled ? (Vue.openBlock(), 
        Vue.createElementBlock(Vue.Fragment, {
            key: 0
        }, [ Vue.withDirectives(Vue.createElementVNode("div", {
            style: {
                opacity: "0"
            },
            class: Vue.normalizeClass([ "as-container", $setup.classList ])
        }, [ Vue.createVNode(_component_logo, {
            mode: $setup.mode
        }, null, 8, [ "mode" ]), Vue.createVNode(_component_as_menu, {
            mode: $setup.mode
        }, null, 8, [ "mode" ]), Vue.createVNode(_component_side_bar) ], 2), [ [ Vue.vShow, $setup.visible ] ]), Vue.withDirectives(Vue.createVNode(_component_hoverBtn, null, null, 512), [ [ Vue.vShow, $setup.visible ] ]) ], 64)) : Vue.createCommentVNode("", true), Vue.createVNode(_component_iconfont), Vue.createVNode(_component_selection_bar, {
            onOpenDialog: $setup.openDialog
        }, null, 8, [ "onOpenDialog" ]), Vue.createVNode(_component_search_dialog, {
            keyword: $setup.keyword,
            visible: $setup.dialogVisible,
            "onUpdate:visible": _cache[0] || (_cache[0] = $event => $setup.dialogVisible = $event)
        }, null, 8, [ "keyword", "visible" ]) ], 64);
    }
    var index = _export_sfc(_sfc_main, [ [ "render", _sfc_render ] ]);
    passTmMethods();
    const el = getAsRoot();
    if (!el) {
        const app = Vue.createApp(index);
        const el = createAsRoot();
        const mountEL = document.documentElement.insertBefore(el, document.body);
        app.mount(mountEL);
    }
})();
