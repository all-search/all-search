// ==UserScript==
// @name         all-search 全搜，搜索引擎快捷跳转，支持任意网站展示
// @namespace    all-search
// @version      1.5.9
// @author       endday
// @description  2024-6-4更新 搜索辅助增强，任意跳转，无需代码适配，支持任意网站展示
// @license      GPL-3.0-only
// @homepage     https://github.com/all-search/all-search
// @homepageURL  https://github.com/all-search/all-search
// @downloadURL  https://raw.github.com/all-search/all-search/release/index.user.js
// @updateURL    https://raw.github.com/all-search/all-search/release/index.user.js
// @match        *://*/*
// @require      https://registry.npmmirror.com/vue/3.4.15/files/dist/vue.global.prod.js
// @require      https://registry.npmmirror.com/@popperjs/core/2.11.8/files/dist/umd/popper-lite.min.js
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// @noframes
// ==/UserScript==

(e=>{if(typeof window.GM_addStyle=="function"){window.GM_addStyle(e);return}const a=document.querySelector("#as-style-common");if(a)a.styleSheet.cssText+=e;else{const o=document.createElement("style");o.classList.add("as-style"),o.id="as-style-common",o.textContent=e,document.head.append(o)}})(' @charset "UTF-8";@media screen and (max-width: 750px){.as-title-horizontal{display:none}}.as-title-horizontal{min-width:90px;margin:0 10px}.as-title-vertical{width:100%}.as-title{text-decoration:none!important;padding:0;margin:0;color:var(--as-primary-color)}.as-title-inner{padding:0;font-size:17px;height:30px;line-height:30px;font-weight:600;color:var(--as-primary-color);margin:0 auto;text-align:center;cursor:pointer}:root{--as-text-color-secondary: #909399}.as-scrollbar{--as-scrollbar-opacity: .3;--as-scrollbar-background-color: var(--as-text-color-secondary);--as-scrollbar-hover-opacity: .5;--as-scrollbar-hover-background-color: var(--as-text-color-secondary);overflow:hidden;position:relative;height:100%}.as-scrollbar__wrap{overflow:auto;height:100%}.as-scrollbar__wrap--hidden-default{scrollbar-width:none}.as-scrollbar__wrap--hidden-default::-webkit-scrollbar{display:none}.as-scrollbar__thumb{position:relative;display:block;width:0;height:0;cursor:pointer;border-radius:inherit;background-color:var(--as-scrollbar-background-color, var(--as-text-color-secondary));transition:var(--as-transition-duration) background-color;opacity:var(--as-scrollbar-opacity, .3)}.as-scrollbar__thumb:hover{background-color:var(--as-scrollbar-hover-background-color, var(--as-text-color-secondary));opacity:var(--as-scrollbar-hover-opacity, .5)}.as-scrollbar__bar{position:absolute;right:2px;bottom:2px;z-index:1;border-radius:4px}.as-scrollbar__bar.is-vertical{width:6px;top:2px}.as-scrollbar__bar.is-vertical>div{width:100%}.as-scrollbar__bar.is-horizontal{height:6px;left:2px}.as-scrollbar__bar.is-horizontal>div{height:100%}.as-scrollbar-fade-enter-active{transition:opacity .34s ease-out}.as-scrollbar-fade-leave-active{transition:opacity .12s ease-out}.as-scrollbar-fade-enter-from,.as-scrollbar-fade-leave-active{opacity:0}.as-popover-content{--background-color: white;--border-color: lightgray;display:none;pointer-events:none;opacity:0;z-index:99999;position:relative}.as-popover-content .arrow,.as-popover-content .arrow:before{width:0;height:0;border-style:solid}.as-popover-content .arrow:before{content:"";position:absolute}.as-popover-content[data-show=true]{opacity:1;pointer-events:initial}.as-popover-content[data-initialized=true]{display:block}.slide-fade-enter-active{transition:all .3s ease-out}.slide-fade-leave-active{transition:all .8s cubic-bezier(1,.5,.8,1)}.slide-fade-enter-from,.slide-fade-leave-to{transform:translate(20px);opacity:0}.as-icon{font-size:20px;width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden;margin:.25px 4px 0 0;display:inline-block}.as-img-icon{border:none;position:relative;font-size:0}.as-img-icon img{width:100%;height:100%;border:none;vertical-align:top}.as-img-icon img.error{display:inline-block;transform:scale(1);content:"";color:transparent}.as-img-icon img.error:before{content:"";position:absolute;left:0;top:0;width:100%;height:100%;background:#f5f5f5 no-repeat center/50% 50%}.as-img-icon img.error:after{content:attr(alt);position:absolute;left:0;bottom:0;width:100%;line-height:2;background-color:#00000080;color:#fff;font-size:12px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.as-menu-item.horizontal{position:relative;padding:0 16px}.as-menu-item.horizontal:after{content:"";transform:scaleX(0);opacity:0;transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);position:absolute;right:0;left:0;bottom:0;border-bottom:2px solid var(--as-primary-color)}.as-menu-item.horizontal:hover:after{transform:scaleX(1);opacity:1}@media screen and (max-width: 750px){.as-menu-item.horizontal{padding:0 10px}}.as-menu-item.vertical{margin:5px 0;position:relative}.as-menu-item.vertical:after{content:"";transform:scaleY(0);opacity:0;transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);position:absolute;top:0;bottom:0;right:0;border-right:2.5px solid var(--as-primary-color)}.as-menu-item.vertical:hover:after{transform:scaleY(1);opacity:1}.as-menu-item.vertical .as-menu-item-title{margin-right:6px}.as-menu-item.no-underline{text-decoration:none}.as-menu-item:visited{color:var(--as-primary-text-color)}a.as-menu-item{height:30px;line-height:30px;list-style:none;position:relative;color:var(--as-primary-text-color);transition:color .3s cubic-bezier(.645,.045,.355,1),border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1);box-sizing:border-box;margin:0;white-space:nowrap;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}a.as-menu-item:hover{border-color:var(--as-primary-color)}a.as-menu-item:hover .as-menu-item-icon,a.as-menu-item:hover .as-menu-item-title{color:var(--as-primary-color)}.as-menu-item-icon{color:var(--as-primary-text-color)}.as-url-icon{width:16px;height:16px;margin-right:10px}.as-subMenu-container{background:var(--as-bg-color);border:1px solid #e4e7ed;box-shadow:0 0 12px #0000001f;border-radius:4px}.as-subMenu{list-style:none;padding:0;min-width:90px;box-sizing:border-box;margin:4px 0}.as-subMenu li{overflow:hidden;box-sizing:border-box}.as-subMenu li a{display:flex;align-items:center;height:34px;padding:0 16px;text-decoration:none}.as-subMenu li:hover{background-color:var(--as-secondary-background-color);color:var(--as-primary-color)}.as-subMenu .as-subMenu-text{flex:1;font-size:14px;text-overflow:ellipsis;color:var(--as-primary-text-color);white-space:nowrap;margin:0;line-height:34px;font-weight:400;text-align:left}.as-menu-container{flex:1;display:flex}.as-menu{padding:0;margin:0;white-space:nowrap;border:0;box-shadow:none;background-color:var(--as-bg-color);display:flex}.as-horizontal .as-menu{flex-direction:row}.as-vertical .as-menu{flex-direction:column}.as-vertical .as-scrollbar__wrap{height:auto}.as-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:999991;height:100%;background-color:#0000004d;overflow:auto}label.as-radio{color:var(--as-primary-text-color);font-weight:500;line-height:1;position:relative;cursor:pointer;display:inline-block;white-space:nowrap;outline:none;font-size:14px;-webkit-user-select:none;-moz-user-select:none;user-select:none}label.as-radio+label.as-radio{margin-left:14px}label.as-radio input{position:absolute;opacity:0;visibility:hidden}label.as-radio .as-radio-icon{display:inline-block;position:relative;width:12px;height:12px;background:var(--as-bg-color);border:1px solid #979797;border-radius:50%;vertical-align:-2px}label.as-radio input:checked+.as-radio-icon:after{position:absolute;content:"";width:6px;height:6px;background-color:var(--as-bg-color);border-radius:50%;top:3px;left:3px}label.as-radio input:checked+.as-radio-icon{background:var(--as-primary-color);border:1px solid var(--as-primary-color)}label.as-radio input:disabled+.as-radio-icon{background-color:#e8e8e8;border:solid 1px #979797}label.as-radio input:disabled:checked+.as-radio-icon:after{background-color:#c1c1c1}label.as-radio.as-radio-animate .as-radio-icon{transition:background-color ease-out .3s}label.as-radio .as-radio-label{margin-left:6px;font-size:14px}.as-label{vertical-align:middle;float:left;font-size:14px;color:var(--as-primary-text-color);line-height:40px;padding:0 12px 0 0;box-sizing:border-box}.as-content{line-height:40px;position:relative;font-size:14px}.as-button{display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:var(--as-primary-text-color);text-align:center;box-sizing:border-box;outline:none;margin:0;transition:.1s;font-weight:500;-webkit-user-select:none;-moz-user-select:none;user-select:none;padding:12px 20px;font-size:14px;border-radius:4px}.as-button.as-button__text{border-color:transparent;color:var(--as-primary-color);background:transparent;padding-left:0;padding-right:0}.as-button.as-button__primary{color:#fff;background-color:var(--as-primary-color);border-color:var(--as-primary-color)}.as-color-set .as-color-label{line-height:1;position:relative;cursor:pointer;display:inline-block;white-space:nowrap;outline:none;vertical-align:middle}.as-color-set .input\u2014color{width:30px;height:30px;padding:4px;border:1px solid #e6e6e6;border-radius:4px;background-color:var(--as-secondary-background-color);box-sizing:border-box}.as-color-set .input\u2014color::-webkit-color-swatch{border:0}.as-color-set .input\u2014color::-webkit-color-swatch-wrapper{padding:0}.as-color-set .reset-btn{margin-left:20px}.as-setting{position:relative}.as-setting.horizontal{box-shadow:-4px 0 10px #0000001f;display:flex}.as-setting-btn{line-height:30px;padding:0 14px;position:relative;margin:0;white-space:nowrap;cursor:pointer;font-size:14px;color:var(--as-primary-text-color);text-align:center}.as-setting-btn:hover{color:var(--as-primary-color);background-color:#0000000a}.as-side-bar{width:20vw;min-width:300px;right:0;height:100%;top:0;bottom:0;position:absolute;box-sizing:border-box;background:var(--as-bg-color) radial-gradient(#eff4f9 75%,#f3f3f3 100%) no-repeat fixed;display:flex;flex-direction:column;box-shadow:0 8px 10px -5px #0003,0 16px 24px 2px #00000024,0 6px 30px 5px #0000001f;overflow:hidden}.as-side-bar>header{font-size:16px;align-items:center;color:var(--as-primary-text-color);display:flex;padding:32px 24px}.as-side-bar>section{padding:10px 24px;margin:0 12px;height:100%;flex:1;border-radius:4px;border:1px solid rgba(0,0,0,.1);background:rgba(255,255,255,.67)}.as-side-bar>footer{padding:10px 24px 30px}.as-side-bar>footer .link{font-size:14px;text-decoration:none}.as-side-bar>footer .link:visited{color:var(--as-primary-text-color)}.as-side-bar>footer .link+.link{margin-left:20px}.overlay-enter-active,.overlay-leave-active{transition:opacity .3s}.overlay-enter-from,.overlay-leave-to{opacity:0}.overlay-enter-active .as-side-bar{animation:rtl-drawer-animation .3s linear reverse}.overlay-leave-active .as-side-bar{animation:rtl-drawer-animation .3s linear}@keyframes rtl-drawer-animation{0%{transform:translate(0)}to{transform:translate(100%)}}.as-hover-btn[data-v-7c1bb101]{position:fixed;z-index:99999;font-weight:600;font-size:17px;color:var(--as-primary-color);background:#fff;box-shadow:0 1px 4px #00152914;border:1px var(--as-border-color) solid;opacity:.6;cursor:pointer}.as-hover-btn-horizontal[data-v-7c1bb101]{top:0;left:50%;transform:translateY(0) translate(-50%);padding:0 16px;height:28px;line-height:28px}.as-hover-btn-vertical[data-v-7c1bb101]{left:0;top:50%;transform:translateY(-200%) translate(0) rotate(90deg);transform-origin:0 100%;padding:0 16px;height:28px;line-height:28px}.hover-btn.as-hide[data-v-7c1bb101]{transition:transform .2s;transform:translateY(-100%) translate(-50%)}.bar-container[data-v-7c91e3b8]{display:flex;padding:2px;max-width:300px;position:absolute;z-index:99999;background-color:#fff;color:#444;box-shadow:0 0 0 1px #0000000d,0 2px 3px #0000001a;border-radius:2px;cursor:pointer;white-space:nowrap}.tool-bar-item[data-v-7c91e3b8]{margin:0;padding:2px;width:20px;height:20px;border:1px solid #FFF;cursor:pointer;box-sizing:content-box}.tool-bar-item[data-v-7c91e3b8]:hover{border-color:var(--as-border-color)}.as-more-icon[data-v-7c91e3b8]{display:block;font-size:20px}.as-dialog{position:fixed;top:0;right:0;bottom:0;left:0;margin:0;z-index:99999}.as-dialog__mask{position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.5);-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.as-dialog-container{position:relative;background:rgba(243,243,243,.85);border-radius:10px;box-shadow:0 1px 3px #0000004d;box-sizing:border-box;min-width:50%;max-width:80%;z-index:99;margin:40vh auto 50px;transform:translateY(-40%);overflow:hidden;-webkit-backdrop-filter:saturate(3) blur(20px);backdrop-filter:saturate(3) blur(20px)}.as-dialog__header{position:relative}.as-dialog__body{color:#666;font-size:14px;word-break:break-all}.as-dialog__footer{padding:10px 20px 20px;text-align:right;box-sizing:border-box}.as-dialog__close{display:inline-block;position:absolute;top:16px;right:24px;padding:0;background:transparent;cursor:pointer;font-size:16px;color:#909399}.as-dialog__close:before{content:"\u2716"}.se-header{padding:15px 20px;box-shadow:0 1px 6px #20212447;background:#f3f3f3 radial-gradient(#eff4f9 75%,#f3f3f3 100%) no-repeat fixed}.se-input-box{border:1px solid #ccc;background-color:#ffffffab;overflow:hidden;display:flex;border-radius:6px;height:40px;align-items:center;transition:.2s;color:#222}.se-input-box:hover{border-color:#fff;box-shadow:0 1px 6px #20212447}.se-input-box:active{border-color:#fff}.se-input-box .se-input{color:var(--as-primary-text-color);background-color:transparent;font-size:16px;height:100%;width:100%;line-height:20px;margin:0 20px;outline:none;border:none}.se-scrollbar-container{height:50vh;padding:0 20px 20px;background:#f3f3f3 radial-gradient(#eff4f9 75%,#f3f3f3 100%) no-repeat fixed}.se-container{margin-top:10px;display:flex;border-radius:6px;flex-wrap:wrap}.cate-container{flex:0 0 150px;margin:0 10px 10px 0;border:1px solid rgba(0,0,0,.1);background:rgba(255,255,255,.67);padding:6px}.cate-name{padding:0 10px;height:36px;line-height:36px;font-size:16px;display:flex;align-items:center}.cate-list{list-style:none;min-width:110px;box-sizing:border-box;padding:0}.cate-list .cate-item{box-sizing:border-box;padding:0 10px}.cate-list .cate-item .as-subMenu-text{margin:0}.cate-list .cate-item a{display:flex;align-items:center;height:34px;text-decoration:none;color:var(--as-primary-text-color)}.cate-list .cate-item:hover{background-color:#fff;color:var(--as-primary-color)}#all-search .row,.all-search-config .row{display:flex}#all-search .column,.all-search-config .column{display:flex;flex-direction:column}#all-search .col,.all-search-config .col{flex:1}#all-search .row.items-center,#all-search .column.items-center,.all-search-config .row.items-center,.all-search-config .column.items-center{align-items:center}#all-search .row.items-end,#all-search .column.items-end,.all-search-config .row.items-end,.all-search-config .column.items-end{align-items:flex-end}#all-search .row.items-stretch,#all-search .column.items-stretch,.all-search-config .row.items-stretch,.all-search-config .column.items-stretch{align-items:stretch}#all-search .row.justify-center,#all-search .column.justify-center,.all-search-config .row.justify-center,.all-search-config .column.justify-center{justify-content:center}#all-search .row.justify-end,#all-search .column.justify-end,.all-search-config .row.justify-end,.all-search-config .column.justify-end{justify-content:flex-end}#all-search .row.justify-between,#all-search .column.justify-between,.all-search-config .row.justify-between,.all-search-config .column.justify-between{justify-content:space-between}#all-search .row.flex-wrap,.all-search-config .row.flex-wrap{flex-wrap:wrap}#all-search .row.content-center,.all-search-config .row.content-center{align-content:center}#all-search .row.content-end,.all-search-config .row.content-end{align-content:end}#all-search p,.all-search-config p{margin:0}.body-horizontal{height:30px;width:100%}.body-horizontal+body [data-as-margin-top]{margin-top:30px!important}.body-horizontal+body [data-as-transform]{transform:translateY(30px)}.body-horizontal+body [data-as-border-top]{border-top:rgba(0,0,0,0) 30px solid;box-sizing:content-box}.body-horizontal+body [data-as-has-set]{transition-duration:0s}.body-vertical{height:100%;width:90px;position:fixed;z-index:999999}.body-vertical+body{margin-left:90px!important}body,#all-search{--as-horizontal-height: $height;--as-primary-color: #1890ff;--as-bg-color: #ffffff;--as-primary-text-color: #606266;--as-secondary-background-color: #f5f7fa;--as-border-color: #e8e8e8}#all-search{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}.as-horizontal{height:30px;width:100%;top:0;border-bottom:1px var(--as-border-color) solid;flex-direction:row;transition:transform .1s}.as-horizontal.as-hide{transform:translateY(-100%)}.as-horizontal.as-show{transform:translateY(0)}.as-vertical{height:100%;width:90px;top:0;left:0;border-right:1px var(--as-border-color) solid;flex-direction:column;transition:transform .1s}.as-vertical.as-hide{transform:translate(-100%)}.as-vertical.as-show{transform:translate(0)}.as-container{opacity:1!important;position:fixed;display:flex;background-color:var(--as-bg-color);z-index:999990} ');

(function (vue, core) {
  'use strict';

  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const name = "all-search";
  const version$1 = "1.5.9";
  const keywords = [
    "tamperMonkey",
    "user-script",
    "tool",
    "web",
    "javascript",
    "vue3"
  ];
  const description = "A top fixed menu that allows you to jump between various search engines, build based on Vue, and use rollup.";
  const author = "endday";
  const homepage = "https://github.com/all-search/all-search";
  const license = "GPL-3.0-only";
  const repository = {
    type: "git",
    url: "git@github.com:all-search/all-search.git"
  };
  const files = [
    "dist",
    "lib"
  ];
  const unpkg = "dist/index.user.js";
  const jsdelivr = "dist/index.user.js";
  const packageManager = "pnpm@8.15.1";
  const scripts = {
    lint: "vue-cli-service lint",
    prepare: "husky install",
    "dev:script": "vite --mode script",
    "build:script": "vite build --mode script",
    "dev:site": "vite dev --mode site",
    "build:site": "vite build --mode site"
  };
  const dependencies = {
    "@element-plus/icons-vue": "^2.0.4",
    "@popperjs/core": "^2.9.2",
    "core-js": "^3.9.1",
    "element-plus": "^2.2.22",
    jsoneditor: "^9.9.0",
    "resize-observer-polyfill": "^1.5.1",
    vue: "^3.3.4",
    "vue-draggable-next": "^2.0.1",
    "vue-router": "^4.0.5"
  };
  const devDependencies = {
    "@babel/eslint-parser": "^7.19.1",
    "@commitlint/cli": "^17.1.2",
    "@commitlint/config-conventional": "^17.1.0",
    "@vitejs/plugin-vue": "^4.3.4",
    "@vue/compiler-sfc": "^3.0.7",
    autoprefixer: "^10.4.7",
    "babel-plugin-import": "^1.13.3",
    "cross-env": "^7.0.3",
    eslint: "^7.32.0",
    "eslint-plugin-vue": "^7.7.0",
    husky: "^8.0.1",
    "lint-staged": "^13.1.0",
    minimist: "^1.2.7",
    postcss: "^8.4.13",
    "rollup-plugin-external-globals": "^0.6.1",
    sass: "^1.32.8",
    "sass-loader": "^10.1.1",
    vite: "^4.4.9",
    "vite-plugin-crx-mv3": "^0.1.5",
    "vite-plugin-monkey": "^3.5.0"
  };
  const pkg = {
    name,
    version: version$1,
    keywords,
    description,
    author,
    homepage,
    license,
    repository,
    files,
    unpkg,
    jsdelivr,
    packageManager,
    scripts,
    dependencies,
    devDependencies
  };
  const version = pkg.version;
  function getQueryString(name2, url) {
    url = url || window.location.href;
    const r = new RegExp("(\\?|#|&)" + name2 + "=([^&#]*)(&|#|$)");
    const m = url.match(r);
    return decodeURIComponent(!m ? "" : m[2]);
  }
  function checkBody() {
    let time = 0;
    return new Promise((resolve, reject) => {
      if (document && document.body) {
        resolve();
      } else {
        const id = setInterval(function() {
          time += 1;
          if (document && document.body) {
            clearInterval(id);
            resolve();
          }
          if (time === 50) {
            clearInterval(id);
            reject(new Error("timeOut"));
          }
        }, 200);
        if (["complete", "loaded", "interactive"].includes(document.readyState)) {
          if (document && document.body) {
            clearInterval(id);
            resolve();
          }
        } else {
          document.addEventListener("DOMContentLoaded", function() {
            if (document && document.body) {
              clearInterval(id);
              resolve();
            }
          });
        }
      }
    });
  }
  function getName(name2) {
    if (name2) {
      return `__allSearch__${name2}`;
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
  function parseJson(val) {
    if (isJson(val)) {
      try {
        return JSON.parse(val);
      } catch (e) {
        return val;
      }
    }
    return val;
  }
  function RAFInterval(callback, period, runNow) {
    const needCount = period / 1e3 * 60;
    let times = 0;
    if (runNow === true) {
      const shouldFinish = callback();
      if (shouldFinish) {
        return;
      }
    }
    function step() {
      if (times < needCount) {
        times++;
        requestAnimationFrame(step);
      } else {
        const shouldFinish = callback() || false;
        if (!shouldFinish) {
          times = 0;
          requestAnimationFrame(step);
        }
      }
    }
    requestAnimationFrame(step);
  }
  function removeNode(cssSelectorOrFunction) {
    try {
      if (typeof cssSelectorOrFunction === "string") {
        let removeNodes = document.querySelectorAll(cssSelectorOrFunction);
        for (let i = 0; i < removeNodes.length; i++) {
          removeNodes[i].remove();
        }
      } else if (typeof cssSelectorOrFunction === "function") {
        cssSelectorOrFunction();
      } else {
        console.log("未知命令：" + cssSelectorOrFunction);
      }
    } catch (e) {
      console.log(e);
    }
  }
  function addStyleContent(css, className, addToTarget, isReload = false) {
    RAFInterval(function() {
      let addTo = document.querySelector(addToTarget);
      if (typeof addToTarget === "undefined") {
        addTo = document.body || document.head || document.documentElement || document;
      }
      if (typeof addToTarget === "undefined" || typeof addToTarget !== "undefined" && document.querySelector(addToTarget) !== null) {
        if (isReload) {
          removeNode("." + className);
        } else if (!isReload && document.querySelector("." + className) !== null) {
          return true;
        }
        let cssNode = document.createElement("style");
        if (className) {
          cssNode.className = className;
        }
        cssNode.setAttribute("type", "text/css");
        cssNode.innerHTML = css;
        try {
          addTo.appendChild(cssNode);
        } catch (e) {
          console.log(e.message);
        }
        return true;
      }
    }, 20, true);
  }
  function getAsRoot() {
    return document.getElementById("all-search");
  }
  function createAsRoot() {
    const el2 = document.createElement("div");
    el2.id = "all-search";
    return el2;
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
  function getParent(el2) {
    let current = el2;
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
    return obj && obj instanceof Element && obj.nodeType === 1 && obj.tagName !== void 0;
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
  function getFixedNodeList(list2, deep = false) {
    const weakSet = /* @__PURE__ */ new WeakSet();
    const newList = [];
    const nodes = list2.filter((item) => item).map((item) => {
      delAsDataSet(item);
      if (deep) {
        Array.from(item.querySelectorAll("*")).map((item2) => {
          delAsDataSet(item2);
          return getRealFixedNode(item2);
        }).filter((item2) => item2).forEach((item2) => {
          if (!weakSet.has(item2)) {
            newList.push(item2);
            weakSet.add(item2);
          }
        });
      }
      return getRealFixedNode(item);
    }).filter((item) => item);
    nodes.forEach((item) => {
      if (!weakSet.has(item)) {
        newList.push(item);
        weakSet.add(item);
      }
    });
    return newList;
  }
  function fixedDomPosition() {
    checkBody().then(() => {
      const nodes = Array.from(document.body.querySelectorAll("*")).filter((item) => item.tagName !== "STYLE");
      getFixedNodeList(nodes).forEach((item) => {
        changeStyle(item);
      });
    });
  }
  function mutationObserver() {
    const targetNode = document.body;
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["style", "class"]
    };
    const callback = function(mutationsList) {
      const root = getAsRoot();
      const filterNodes = mutationsList.filter((mutation) => {
        if (["BODY", "STYLE"].includes(mutation.target.tagName) || root.contains(mutation.target)) {
          return false;
        } else if (mutation.type === "attributes") {
          return ["style", "class", "id"].includes(mutation.attributeName);
        } else if (mutation.type === "childList") {
          return mutation.addedNodes.length > 0;
        }
        return false;
      }).map((mutation) => mutation.target);
      getFixedNodeList(filterNodes, true).forEach((item) => {
        changeStyle(item);
      });
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
  const addCustomStyle = (mode, currentSite, remove) => {
    removeNode(".as-custom-style");
    if (currentSite.invisible || remove) {
      return;
    }
    if (currentSite.style) {
      let styleContent = "";
      if (currentSite.style[1] && mode === "horizontal") {
        styleContent = currentSite.style[1];
      } else if (currentSite.style[2] && mode === "vertical") {
        styleContent = currentSite.style[2];
      }
      if (styleContent) {
        addStyleContent(styleContent, "as-custom-style");
      }
    }
  };
  const protectStyle = function() {
    if (Node.prototype.__as_hooks__) {
      return;
    }
    Node.prototype.removeChild = withHookBefore(Node.prototype.removeChild, (e) => {
      if (e && e.tagName === "STYLE") {
        return !(e.classList.contains("as-icon") || e.classList.contains("as-style") || e.classList.contains("elPopover") || e.classList.contains("elScrollbar"));
      }
      return true;
    });
    Node.prototype.__as_hooks__ = true;
  };
  const changeBodyStyle = function(mode, remove = true) {
    const el2 = getAsRoot();
    el2.classList.remove("body-vertical", "body-horizontal");
    if (!remove) {
      el2.classList.add(`body-${mode}`);
    }
  };
  const search = [
    {
      nameZh: "百度",
      url: "https://www.baidu.com/s?wd=%s&ie=utf-8"
    },
    {
      nameZh: "谷歌",
      url: "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8"
    },
    {
      nameZh: "必应",
      url: "https://cn.bing.com/search?q=%s"
    },
    {
      nameZh: "DDG",
      url: "https://duckduckgo.com/?q=%s"
    },
    {
      nameZh: "头条搜索",
      url: "https://so.toutiao.com/search?dvpf=pc&keyword=%s"
    },
    {
      nameZh: "360",
      url: "https://www.so.com/s?ie=utf-8&q=%s"
    },
    {
      nameZh: "搜狗",
      url: "https://www.sogou.com/web?query=%s"
    },
    {
      nameZh: "Yandex",
      url: "https://yandex.com/search/?text=%s"
    }
  ];
  const translate = [
    {
      nameZh: "百度翻译",
      url: "http://fanyi.baidu.com/#auto/zh/%s"
    },
    {
      nameZh: "火山翻译",
      url: "https://translate.volcengine.com/translate?source_language=detect&target_language=en&text=%s"
    },
    {
      nameZh: "DeepL",
      url: "https://www.deepl.com/translator#zh/en/%s",
      icon: "https://www.deepl.com/img/favicon/favicon_96.png"
    },
    {
      nameZh: "谷歌翻译",
      url: "https://translate.google.com/?q=%s"
    },
    {
      nameZh: "有道词典",
      url: "http://dict.youdao.com/search?q=%s",
      icon: "https://shared.ydstatic.com/images/favicon.ico"
    },
    {
      nameZh: "必应翻译",
      url: "http://cn.bing.com/dict/search?q=%s"
    }
  ];
  const developer = [
    {
      nameZh: "开发者搜索",
      url: "https://kaifa.baidu.com/searchPage?wd=%s&module=SEARCH"
    },
    {
      nameZh: "MDN",
      url: "https://developer.mozilla.org/zh-CN/search?q=%s"
    },
    {
      nameZh: "stackoverflow",
      url: "https://stackoverflow.com/search?q=%s"
    },
    {
      nameZh: "掘金",
      url: "https://juejin.cn/search?query=%s"
    },
    {
      nameZh: "Can I Use",
      url: "http://caniuse.com/#search=%s",
      icon: "https://caniuse.com/img/favicon-128.png"
    },
    {
      nameZh: "GitHub",
      url: "https://github.com/search?utf8=✓&q=%s"
    },
    {
      nameZh: "w3c",
      url: "http://www.runoob.com/?s=%s"
    },
    {
      nameZh: "GreasyFork",
      url: "https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓",
      icon: "https://greasyfork.org/packs/media/images/blacklogo96-b2384000fca45aa17e45eb417cbcbb59.png"
    }
  ];
  const video = [
    {
      nameZh: "bilibili",
      url: "http://search.bilibili.com/all?keyword=%s"
    },
    {
      nameZh: "腾讯视频",
      url: "https://v.qq.com/x/search/?q=%s"
    },
    {
      nameZh: "爱奇艺",
      url: "http://so.iqiyi.com/so/q_%s",
      icon: "https://www.iqiyi.com/favicon.ico"
    },
    {
      nameZh: "youtube",
      url: "https://www.youtube.com/results?search_query=%s"
    },
    {
      nameZh: "优酷",
      url: "http://www.soku.com/search_video/q_%s",
      icon: "https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png"
    },
    {
      nameZh: "AcFun",
      url: "https://www.acfun.cn/search?keyword=%s"
    },
    {
      nameZh: "搜狐",
      url: "http://so.tv.sohu.com/mts?wd=%s"
    },
    {
      nameZh: "niconico",
      url: "http://www.nicovideo.jp/search/%s"
    }
  ];
  const music = [
    {
      nameZh: "网易音乐",
      url: "http://music.163.com/#/search/m/?s=%s",
      icon: "https://s1.music.126.net/style/favicon.ico"
    },
    {
      nameZh: "一听",
      url: "http://so.1ting.com/all.do?q=%s"
    },
    {
      nameZh: "QQ音乐",
      url: "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s"
    },
    {
      nameZh: "百度音乐",
      url: "http://music.baidu.com/search?ie=utf-8&oe=utf-8&key=%s"
    },
    {
      nameZh: "酷我音乐",
      url: "https://kuwo.cn/search/list?key=%s"
    },
    {
      nameZh: "酷狗",
      url: "http://search.5sing.kugou.com/?keyword=%s"
    }
  ];
  const news = [
    {
      nameZh: "谷歌中文",
      url: "https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
      icon: "https://www.google.com/favicon.ico"
    },
    {
      nameZh: "百度新闻",
      url: "http://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1",
      icon: "https://www.baidu.com/favicon.ico"
    },
    {
      nameZh: "网易-百度",
      url: "https://www.baidu.com/s?wd=%s%20site%3Anews.163.com"
    },
    {
      nameZh: "腾讯新闻",
      url: "https://www.sogou.com/sogou?site=news.qq.com&query=%s"
    },
    {
      nameZh: "凤凰新闻",
      url: "https://so.ifeng.com/?q=%s&c=1"
    },
    {
      nameZh: "CNN",
      url: "https://edition.cnn.com/search/?q=%s"
    },
    {
      nameZh: "BBC",
      url: "https://www.bbc.co.uk/search?q=%s"
    },
    {
      nameZh: "今日头条",
      url: "https://www.toutiao.com/search/?keyword=%s"
    }
  ];
  const social = [
    {
      nameZh: "知乎",
      url: "https://www.zhihu.com/search?q=%s&type=content"
    },
    {
      nameZh: "推特",
      url: "https://twitter.com/search/%s"
    },
    {
      nameZh: "豆瓣",
      url: "https://www.douban.com/search?source=suggest&q=%s"
    },
    {
      nameZh: "百度贴吧",
      url: "https://tieba.baidu.com/f?kw=%s&ie=utf-8"
    },
    {
      nameZh: "新浪微博",
      url: "https://s.weibo.com/weibo?q=%s"
    },
    {
      nameZh: "脸书",
      url: "https://www.facebook.com/search/results.php?q=%s"
    },
    {
      nameZh: "微信搜索",
      url: "http://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s"
    }
  ];
  const knowledge = [
    {
      nameZh: "维基",
      url: "http://zh.wikipedia.org/wiki/%s"
    },
    {
      nameZh: "百度百科",
      url: "http://baike.baidu.com/search/word?pic=1&sug=1&word=%s"
    },
    {
      nameZh: "百度文库",
      url: "http://wenku.baidu.com/search?word=%s&ie=utf-8"
    },
    {
      nameZh: "豆丁文档",
      url: "http://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s"
    },
    {
      nameZh: "爱问知识",
      url: "http://iask.sina.com.cn/search?searchWord=%s"
    },
    {
      nameZh: "萌娘百科",
      url: "https://zh.moegirl.org.cn/index.php?search=%s",
      icon: "https://zh.moegirl.org.cn/favicon.ico"
    },
    {
      nameZh: "果壳",
      url: "http://www.guokr.com/search/all/?wd=%s"
    },
    {
      nameZh: "Quora",
      url: "https://www.quora.com/search?q=%s"
    }
  ];
  const image = [
    {
      nameZh: "谷歌图片",
      url: "https://www.google.com/search?q=%s&tbm=isch"
    },
    {
      nameZh: "百度图片",
      url: "http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=%s"
    },
    {
      nameZh: "必应图片",
      url: "https://www.bing.com/images/search?q=%s"
    },
    {
      nameZh: "搜狗图片",
      url: "https://pic.sogou.com/pics?query=%s"
    },
    {
      nameZh: "pixiv",
      url: "http://www.pixiv.net/search.php?word=%s"
    },
    {
      nameZh: "flickr",
      url: "http://www.flickr.com/search/?q=%s"
    },
    {
      nameZh: "花瓣",
      url: "http://huaban.com/search/?q=%s"
    },
    {
      nameZh: "Pinterest",
      url: "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta"
    },
    {
      nameZh: "yandex",
      url: "https://yandex.com/images/search?text=%s"
    },
    {
      nameZh: "pixabay",
      url: "https://pixabay.com/images/search/%s/",
      icon: "https://pixabay.com/favicon-32x32.png"
    },
    {
      nameZh: "unsplash",
      url: "https://unsplash.com/s/photos/%s"
    }
  ];
  const shopping = [
    {
      nameZh: "淘宝",
      url: "http://s.taobao.com/search?q=%s",
      icon: "https://www.taobao.com/favicon.ico"
    },
    {
      nameZh: "京东",
      url: "http://search.jd.com/search?keyword=%s&enc=utf-8",
      icon: "https://www.jd.com/favicon.ico"
    },
    {
      nameZh: "苏宁",
      url: "https://search.suning.com/%s/"
    },
    {
      nameZh: "亚马逊",
      url: "http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s",
      icon: "https://www.amazon.cn/favicon.ico"
    },
    {
      nameZh: "天猫",
      url: "http://list.tmall.com/search_product.htm?q=%s"
    },
    {
      nameZh: "值得买",
      url: "http://search.smzdm.com/?c=home&s=%s"
    },
    {
      nameZh: "当当网",
      url: "http://search.dangdang.com/?key=%s"
    },
    {
      nameZh: "1688",
      url: "https://s.1688.com/selloffer/offer_search.htm?keywords=%s"
    }
  ];
  const disk = [
    {
      nameZh: "百度网盘",
      url: "https://pan.baidu.com/disk/main#/index?category=all&search=%s"
    },
    {
      nameZh: "大力盘",
      url: "https://www.dalipan.com/search?keyword=%s"
    },
    {
      nameZh: "大圣盘",
      url: "https://www.dashengpan.com/search?keyword=%s"
    },
    {
      nameZh: "罗马盘",
      url: "https://www.luomapan.com/search?keyword=%s"
    },
    {
      nameZh: "小白盘",
      url: "https://www.xiaobaipan.com/list-%s.html?from=1"
    },
    {
      nameZh: "56网盘",
      url: "https://www.56wangpan.com/search/kw%s"
    }
  ];
  const scholar = [
    {
      nameZh: "谷歌学术",
      url: "https://scholar.google.com/scholar?hl=zh-CN&q=%s",
      favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVQ4jYWT2UtUURzHL/QH1LMP9hKVNUKFWpP7TDrjU9uEo4WPWlERUbSoueSMaTWjTBCRGV3HiCsSWrTQApVSZBtZWEZSUWZkC3PPne3OzKeHK1NKy4Hfyzl8P+d3vt/fkSRJmpWSVbU9vbxbMZXJSnqZrMx3yErqmrN/r7V+Zf76jjNz5mYXSilZldtKfGBrA5sXcg7Dpg5wX/lzNV+FlmuwsRNy6r9HJFO5v9feBlaXILNWxenT+Pgtzr/W2Oc4azwalqMgLXZ29di9JMXj/xH3P4pybjDKhvYg1qMgpZfKyko3lPk0xr9PF7/4EOfTjwQAiQRcfqpjrlMZeBVjc2eI/FaQ5jlkZWs3qKHENPH7yTg5DYKKExp6DGJxcLRprHILAJr7w5hdIC1wyMquHmNj3/kQN57rALz9Eie/SZBRo/JwLAZAtRLC4jIA7r4pQHqprBS0QkaNysLdAXbKIQAiOjh9Gml7VOS7kaSooGkGwFQqKzYvWFyCgiZBbqPg3mvjRv9ABNPeANeHdSbVBOu8GvYWA9ByMcyKmQCLS5DToFLSKlDuR/kmEox+Moyt6w2TtidAUbPgyKUwZceDWI7MAFhdRgdL9quk7ghw8bGeNPXdZJzKjiCZNSpZtSp5jQKb9zeA1SUw16ms9WqcvBlhcDTG4KsYoxO/ohXhBFWng5jrVCwuQbHnN0B2vaDiRJCJqdzvvtRZfUyQ3SA4dSuCbtjC0JsY5npBYRLg9PfaPEYK14f15NA4fRpLD6jkHxKY9ga4PWKcvRyPk9toGF7sBWmR45S/pN0Y5a6BaLLdroEoGTUqy6oNc99NGk85dCHM8oMCqzuIvQ2k2XPzLAWNX9UiD9i90D0EE8Yo8GQc/A/g2QSMfIHaPsg9DMUe4/dmbrnz8CdxKwtDTtdexQAAAABJRU5ErkJggg=="
    },
    {
      nameZh: "百度学术",
      url: "http://xueshu.baidu.com/s?wd=%s"
    },
    {
      nameZh: "知网",
      url: "https://kns.cnki.net/kns8s/defaultresult/index?kw=%s"
    },
    {
      nameZh: "JSTOR",
      url: "http://www.jstor.org/action/doAdvancedSearch?q0=%s"
    },
    {
      nameZh: "Springer",
      url: "http://rd.springer.com/search?query=%s"
    },
    {
      nameZh: "国家图书馆",
      url: "http://find.nlc.cn/search/doSearch?query=%s&secQuery=&actualQuery=%s&searchType=2&docType=%E5%85%A8%E9%83%A8&isGroup=isGroup&targetFieldLog=%E5%85%A8%E9%83%A8%E5%AD%97%E6%AE%B5&orderBy=RELATIVE"
    }
  ];
  const list$2 = [
    {
      nameZh: "搜索",
      name: "search",
      list: search
    },
    {
      nameZh: "翻译",
      name: "translate",
      list: translate
    },
    {
      nameZh: "视频",
      name: "video",
      list: video
    },
    {
      nameZh: "购物",
      name: "shopping",
      list: shopping
    },
    {
      nameZh: "音乐",
      name: "music",
      list: music
    },
    {
      nameZh: "开发",
      name: "developer",
      list: developer
    },
    {
      nameZh: "新闻",
      name: "news",
      list: news
    },
    {
      nameZh: "社交",
      name: "social",
      list: social
    },
    {
      nameZh: "百科",
      name: "knowledge",
      list: knowledge
    },
    {
      nameZh: "图片",
      name: "image",
      list: image
    },
    {
      nameZh: "网盘",
      name: "disk",
      list: disk
    },
    {
      nameZh: "学术",
      name: "scholar",
      list: scholar
    },
    {
      nameZh: "常用",
      name: "personal",
      list: []
    }
  ].map((item) => ({
    ...item,
    data: {
      visible: true
    },
    list: item.list.map((child) => ({
      ...child,
      data: {
        visible: true
      }
    }))
  }));
  vue.reactive({
    tmVersion: ""
  });
  function getStorageFn(name2) {
    const formatName = getName(name2);
    return new Promise((resolve, reject) => {
      if (!_GM_getValue) {
        return reject(Error("没有找到GM_getValue"));
      }
      const item = _GM_getValue(formatName);
      if (item === void 0) {
        return reject(`GM_getValue没有获取到key:${name2}的变量`);
      }
      return resolve(parseJson(item));
    });
  }
  function setStorageFn(name2, value2) {
    const formatName = getName(name2);
    return new Promise((resolve, reject) => {
      if (value2 === void 0) {
        reject(Error("setStorage"));
      } else if (!_GM_setValue) {
        reject(Error("没有找到GM_setValue"));
      } else {
        _GM_setValue(formatName, value2);
        resolve(value2);
      }
    });
  }
  function delStorageFn(name2) {
    const formatName = getName(name2);
    return new Promise((resolve, reject) => {
      if (!_GM_deleteValue) {
        return reject(Error("没有找到GM_deleteValue"));
      }
      _GM_deleteValue(formatName);
      return resolve(true);
    });
  }
  let getStorage = getStorageFn;
  let setStorage = setStorageFn;
  let delStorage = delStorageFn;
  const scriptLoaded = getName("script-loaded");
  const pageLoaded = getName("page-loaded");
  function initTmMethods() {
    const emit = function() {
      document.dispatchEvent(new CustomEvent(scriptLoaded, {
        detail: {
          version,
          getStorage: getStorageFn,
          setStorage: setStorageFn,
          delStorage: delStorageFn
        }
      }));
    };
    document.addEventListener(pageLoaded, emit);
    emit();
  }
  const sitesData = vue.ref([]);
  function getSites(val) {
    if (Array.isArray(val) && val.length > 0) {
      return val;
    } else {
      return list$2;
    }
  }
  function initSites(sites2, type) {
    if (type === "tm") {
      return sites2.filter((item) => Array.isArray(item.list) && item.list.length > 0 && item.data && item.data.visible).map((item) => ({
        ...item,
        show: false
      }));
    }
    return sites2;
  }
  getStorage("sites").then((val) => {
    sitesData.value = getSites(val);
  }).catch(() => {
    sitesData.value = list$2;
  });
  function resetSites() {
    if (window.confirm("确认要重置所有网址吗")) {
      delStorage("sites");
    }
  }
  function useSites(type) {
    return {
      sites: vue.computed(() => initSites(sitesData.value, type)),
      resetSites
    };
  }
  const width = 100;
  const list$1 = [
    {
      url: /\/\/www\.google\.com(.hk)?\/search/
    },
    {
      url: /\/\/www\.baidu\.com\/(s|baidu)\?/,
      style: {
        1: ".selected-search-box { transform: translateY(-30px);}"
      }
    },
    {
      url: /\/\/[^.]*\.bing\.com\/search/
    },
    {
      url: /\/\/duckduckgo\.com\/*/
    },
    {
      url: /\/\/searx\.me\/\?q/
    },
    {
      url: /\/\/www\.sogou\.com\/(?:web|s)/,
      selectors: "#upquery"
    },
    {
      url: /\/\/yandex\.com\/search/
    },
    {
      url: /\/\/google\.infinitynewtab\.com\/\?q/
    },
    {
      url: /\/\/baike\.baidu\.com\/item/
    },
    {
      url: /\/\/baike\.baidu\.com\/search/
    },
    {
      url: /\/\/wenku\.baidu\.com\/search/
    },
    {
      url: /\/\/zhidao\.baidu\.com\/search/
    },
    {
      url: /\/\/\D{2,5}\.wikipedia\.org\/wiki/
    },
    {
      url: /\/\/www\.zhihu\.com\/search\?/
    },
    {
      url: /\/\/www\.so\.com\/s/
    },
    {
      url: /\/\/so\.baike\.com\/doc/
    },
    {
      url: /\/\/www\.baike\.com\/wiki/
    },
    {
      url: /\/\/www\.docin\.com\/search\.do/
    },
    {
      url: /\/\/zhihu\.sogou\.com\/zhihu/,
      selectors: "#upquery"
    },
    {
      url: /\/\/weixin\.sogou\.com\/weixin\?/,
      style: {
        2: `.headsearch#scroll-header { left:unset; }`
      }
    },
    {
      url: /\/\/www\.quora\.com\/search\?/
    },
    {
      url: /\/\/stackoverflow\.com\/search\?/,
      style: {
        2: `.top-bar._fixed { right: ${width}px }`
      }
    },
    {
      url: /\/\/search\.bilibili\.com\/all/,
      selectors: ".search-input-el"
    },
    {
      url: /\/\/www\.acfun\.cn\/search/,
      selectors: ".search-text--standalone"
    },
    {
      url: /\/\/www\.youtube\.com\/results/,
      style: {
        2: `ytd-app {margin-left:${width}px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:${width}px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}`
      }
    },
    {
      url: /\/\/www\.nicovideo\.jp\/search\//
    },
    {
      url: /\/\/so\.iqiyi\.com\/so\/q/
    },
    {
      url: /\/\/v\.qq\.com\/x\/search/
    },
    {
      url: /\/\/music\.baidu\.com\/search/
    },
    {
      url: /\/\/so\.1ting\.com\/all\.do/
    },
    {
      url: /\/\/s\.music\.qq\.com/
    },
    {
      url: /\/\/music\.163\.com\/.*?#\/search/
    },
    {
      url: /\/\/image\.baidu\.com\/search/
    },
    {
      url: /\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
    },
    {
      url: /\/\/.*\.bing\.com\/images\/search/
    },
    {
      url: /\/\/www\.flickr\.com\/search\//
    },
    {
      url: /^http:\/\/www\.pixiv\.net\/search\.php/
    },
    {
      url: /\/\/huaban\.com\/search\?/
    },
    {
      url: /\/\/www\.pinterest\.com\/search\//
    },
    {
      url: /\/\/thepiratebay\.org\/search/
    },
    {
      url: /\/\/subhd\.tv\/search/
    },
    {
      url: /\/\/translate\.google(?:\.\D{1,4}){1,2}/
    },
    {
      url: /\/\/fanyi\.baidu\.com/
    },
    {
      url: /\/\/.*\.bing\.com\/dict\/search\?q=/
    },
    {
      url: /\/\/dict\.youdao\.com\/search/
    },
    {
      url: /\/\/dict\.youdao\.com\/w/
    },
    {
      url: /\/\/dict\.cn\/./
    },
    {
      url: /\/\/s\.taobao\.com\/search/
    },
    {
      url: /\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/
    },
    {
      url: /\/\/list\.tmall\.com\/search_product\.htm/
    },
    {
      url: /\/\/search\.jd\.com\/search/
    },
    {
      url: /\/\/search\.suning\.com/
    },
    {
      url: /\/\/search\.smzdm\.com\/\?/
    },
    {
      url: /\/\/s\.weibo\.com\/weibo\?q=/
    },
    {
      url: /\/\/tieba\.baidu\.com\/f\/search/
    },
    {
      url: /\/\/(movie|music|book)\.douban\.com\/subject_search?/
    },
    {
      url: /\/\/www\.douban\.com\/search/
    },
    {
      url: /\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
      style: {
        2: `#left_menu_content { left: ${width}px !important;}`
      }
    },
    {
      url: /\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
    },
    {
      url: /\/\/github\.com\/search/
    },
    {
      url: /\/\/www\.startpage\.com\/sp\/search/
    },
    {
      url: /\/\/all-search\.github\.io/,
      invisible: true
    },
    {
      url: /\/\/endday\.gitee\.io/,
      invisible: true
    }
  ];
  const routerChange = (cb) => {
    history.pushState = withHookAfter(history.pushState, cb);
    history.replaceState = withHookAfter(history.replaceState, cb);
    window.addEventListener("popstate", cb);
    window.addEventListener("yt-navigate-finish", cb);
    window.addEventListener("hashchange", cb);
  };
  const { sites: sites$1 } = useSites("tm");
  function getMenuItem() {
    let targetItem = null;
    let urlObj = null;
    const curItem = new URL(window.location.href);
    sites$1.value.some((category) => {
      category.list.find((item) => {
        const menuItem2 = new URL(item.url);
        if (menuItem2.hostname === curItem.hostname && menuItem2.pathname === curItem.pathname) {
          targetItem = item;
          urlObj = menuItem2;
          return true;
        }
        return false;
      });
    });
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
    const target = list$1.find((item) => item.url.test(window.location.href.toLowerCase()));
    const menuItem2 = getMenuItem();
    if (target) {
      return {
        url: target.url,
        invisible: !!target.invisible,
        disabled: !!target.disabled,
        style: target.style,
        selectors: target.selectors,
        query: target.query
      };
    } else if (menuItem2) {
      return {
        url: menuItem2.url,
        invisible: false,
        disabled: false,
        style: menuItem2.style,
        selectors: menuItem2.selectors,
        query: menuItem2.query
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
  vue.watch(sites$1, () => {
    updateCurrentSite();
  });
  function updateCurrentSite() {
    const newSite = getSite();
    Object.keys(site).forEach((key) => {
      site[key] = newSite[key] || "";
    });
  }
  routerChange(() => {
    updateCurrentSite();
  });
  let site = vue.reactive(getSite());
  const isFullScreenRef = vue.ref(false);
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
    const removeListener = onFullScreenChange(() => {
      isFullScreenRef.value = isFullScreen();
    });
    vue.onUnmounted(() => {
      removeListener();
    });
    return {
      isFullScreen: isFullScreenRef
    };
  }
  const isDef = (val) => val !== void 0 && val !== null;
  async function init(name2, defaultVal, reg2 = "") {
    try {
      const session = await getStorage(name2);
      if (reg2 && reg2.test(session)) {
        return session;
      } else if (isDef(session)) {
        return session;
      } else {
        return defaultVal;
      }
    } catch (e) {
      return defaultVal;
    }
  }
  function useConfig(params) {
    const { name: name2, initVal, defaultVal, reg: reg2 } = params;
    let val = "";
    if (isDef(initVal)) {
      val = initVal;
    } else if (isDef(defaultVal)) {
      val = defaultVal;
    }
    const valRef = vue.ref(val);
    init(name2, defaultVal, reg2).then((val2) => {
      valRef.value = val2;
    });
    return vue.computed({
      get: () => valRef.value,
      set: (val2) => {
        valRef.value = val2;
        setStorage(name2, isDef(val2) ? val2 : defaultVal);
      }
    });
  }
  const value$1 = useConfig({
    name: "mode",
    defaultVal: "horizontal",
    reg: /[vertical|horizontal]/
  });
  function useMode() {
    return {
      value: value$1
    };
  }
  function throttle$1(fn, delay = 500) {
    let canRun = true;
    return function() {
      if (!canRun)
        return;
      canRun = false;
      setTimeout(() => {
        fn.apply(this, arguments);
        canRun = true;
      }, delay);
    };
  }
  const y = vue.ref(0);
  const direction$1 = vue.ref("");
  function getDirection(newVal, oldVal, limit) {
    if (newVal < oldVal - limit) {
      return "top";
    } else if (newVal > oldVal + limit) {
      return "bottom";
    } else {
      return "mid";
    }
  }
  function useScroll(triggerLimit = 0) {
    const scrollHandler = throttle$1(function(e) {
      const eventTarget = e.target === document ? e.target.documentElement : e.target;
      const scrollTop2 = eventTarget.scrollTop;
      const distance = getDirection(scrollTop2, y.value, triggerLimit);
      vue.nextTick().then(() => {
        direction$1.value = distance;
      });
      y.value = scrollTop2;
    }, 200);
    if (window) {
      window.addEventListener("scroll", scrollHandler);
    }
    vue.onBeforeUnmount(() => {
      if (window) {
        window.removeEventListener("scroll", scrollHandler);
      }
    });
    return {
      y,
      direction: direction$1
    };
  }
  const options = vue.reactive(/* @__PURE__ */ new Map([
    ["none", "关闭"],
    ["top", "向上"],
    ["bottom", "向下"],
    ["all", "滚动"]
  ]));
  const show = useConfig({
    name: "switchShow",
    defaultVal: 1,
    initVal: 2,
    reg: /[1|2]/
  });
  const scrollHide = useConfig({
    name: "scrollHide",
    defaultVal: "none",
    reg: /[none|top|bottom|all]/
  });
  const { direction } = useScroll(100);
  vue.watch([direction, scrollHide], ([newDirection, newScrollHide]) => {
    if (show.value && newScrollHide !== "none" && (newDirection === newScrollHide || newScrollHide === "all")) {
      show.value = 2;
    }
  });
  function useSwitchShow() {
    return {
      show,
      scrollHide,
      options
    };
  }
  const _export_sfc = (sfc, props) => {
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
        validator: (val) => ["horizontal", "vertical"].indexOf(val) > -1
      }
    },
    setup() {
      return {
        isMobile: isMobile()
      };
    }
  };
  const _hoisted_1$d = /* @__PURE__ */ vue.createElementVNode("p", { class: "as-title-inner" }, " All Search ", -1);
  const _hoisted_2$9 = [
    _hoisted_1$d
  ];
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return !$setup.isMobile ? (vue.openBlock(), vue.createElementBlock("a", {
      key: 0,
      class: vue.normalizeClass(["as-title", `as-title-${$props.mode}`]),
      href: "https://github.com/all-search/all-search",
      target: "_blank"
    }, _hoisted_2$9, 2)) : vue.createCommentVNode("", true);
  }
  const logo = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
  var MapShim = function() {
    if (typeof Map !== "undefined") {
      return Map;
    }
    function getIndex(arr, key) {
      var result = -1;
      arr.some(function(entry, index2) {
        if (entry[0] === key) {
          result = index2;
          return true;
        }
        return false;
      });
      return result;
    }
    return (
      /** @class */
      function() {
        function class_1() {
          this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
          /**
           * @returns {boolean}
           */
          get: function() {
            return this.__entries__.length;
          },
          enumerable: true,
          configurable: true
        });
        class_1.prototype.get = function(key) {
          var index2 = getIndex(this.__entries__, key);
          var entry = this.__entries__[index2];
          return entry && entry[1];
        };
        class_1.prototype.set = function(key, value2) {
          var index2 = getIndex(this.__entries__, key);
          if (~index2) {
            this.__entries__[index2][1] = value2;
          } else {
            this.__entries__.push([key, value2]);
          }
        };
        class_1.prototype.delete = function(key) {
          var entries = this.__entries__;
          var index2 = getIndex(entries, key);
          if (~index2) {
            entries.splice(index2, 1);
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
      }()
    );
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
      return setTimeout(function() {
        return callback(Date.now());
      }, 1e3 / 60);
    };
  }();
  var trailingTimeout = 2;
  function throttle(callback, delay) {
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
  var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  var ResizeObserverController = (
    /** @class */
    function() {
      function ResizeObserverController2() {
        this.connected_ = false;
        this.mutationEventsAdded_ = false;
        this.mutationsObserver_ = null;
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
      }
      ResizeObserverController2.prototype.addObserver = function(observer) {
        if (!~this.observers_.indexOf(observer)) {
          this.observers_.push(observer);
        }
        if (!this.connected_) {
          this.connect_();
        }
      };
      ResizeObserverController2.prototype.removeObserver = function(observer) {
        var observers2 = this.observers_;
        var index2 = observers2.indexOf(observer);
        if (~index2) {
          observers2.splice(index2, 1);
        }
        if (!observers2.length && this.connected_) {
          this.disconnect_();
        }
      };
      ResizeObserverController2.prototype.refresh = function() {
        var changesDetected = this.updateObservers_();
        if (changesDetected) {
          this.refresh();
        }
      };
      ResizeObserverController2.prototype.updateObservers_ = function() {
        var activeObservers = this.observers_.filter(function(observer) {
          return observer.gatherActive(), observer.hasActive();
        });
        activeObservers.forEach(function(observer) {
          return observer.broadcastActive();
        });
        return activeObservers.length > 0;
      };
      ResizeObserverController2.prototype.connect_ = function() {
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
      ResizeObserverController2.prototype.disconnect_ = function() {
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
      ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
        var isReflowProperty = transitionKeys.some(function(key) {
          return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
          this.refresh();
        }
      };
      ResizeObserverController2.getInstance = function() {
        if (!this.instance_) {
          this.instance_ = new ResizeObserverController2();
        }
        return this.instance_;
      };
      ResizeObserverController2.instance_ = null;
      return ResizeObserverController2;
    }()
  );
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
  function toFloat(value2) {
    return parseFloat(value2) || 0;
  }
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function(size, position) {
      var value2 = styles["border-" + position + "-width"];
      return size + toFloat(value2);
    }, 0);
  }
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value2 = styles["padding-" + position];
      paddings[position] = toFloat(value2);
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
    var width2 = toFloat(styles.width), height = toFloat(styles.height);
    if (styles.boxSizing === "border-box") {
      if (Math.round(width2 + horizPad) !== clientWidth) {
        width2 -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    if (!isDocumentElement(target)) {
      var vertScrollbar = Math.round(width2 + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight;
      if (Math.abs(vertScrollbar) !== 1) {
        width2 -= vertScrollbar;
      }
      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }
    return createRectInit(paddings.left, paddings.top, width2, height);
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
    var x = _a.x, y2 = _a.y, width2 = _a.width, height = _a.height;
    var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
      x,
      y: y2,
      width: width2,
      height,
      top: y2,
      right: x + width2,
      bottom: height + y2,
      left: x
    });
    return rect;
  }
  function createRectInit(x, y2, width2, height) {
    return { x, y: y2, width: width2, height };
  }
  var ResizeObservation = (
    /** @class */
    function() {
      function ResizeObservation2(target) {
        this.broadcastWidth = 0;
        this.broadcastHeight = 0;
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
      }
      ResizeObservation2.prototype.isActive = function() {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
      };
      ResizeObservation2.prototype.broadcastRect = function() {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
      };
      return ResizeObservation2;
    }()
  );
  var ResizeObserverEntry = (
    /** @class */
    function() {
      function ResizeObserverEntry2(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        defineConfigurable(this, { target, contentRect });
      }
      return ResizeObserverEntry2;
    }()
  );
  var ResizeObserverSPI = (
    /** @class */
    function() {
      function ResizeObserverSPI2(callback, controller, callbackCtx) {
        this.activeObservations_ = [];
        this.observations_ = new MapShim();
        if (typeof callback !== "function") {
          throw new TypeError("The callback provided as parameter 1 is not a function.");
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
      }
      ResizeObserverSPI2.prototype.observe = function(target) {
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
      ResizeObserverSPI2.prototype.unobserve = function(target) {
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
      ResizeObserverSPI2.prototype.disconnect = function() {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
      };
      ResizeObserverSPI2.prototype.gatherActive = function() {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function(observation) {
          if (observation.isActive()) {
            _this.activeObservations_.push(observation);
          }
        });
      };
      ResizeObserverSPI2.prototype.broadcastActive = function() {
        if (!this.hasActive()) {
          return;
        }
        var ctx = this.callbackCtx_;
        var entries = this.activeObservations_.map(function(observation) {
          return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
      };
      ResizeObserverSPI2.prototype.clearActive = function() {
        this.activeObservations_.splice(0);
      };
      ResizeObserverSPI2.prototype.hasActive = function() {
        return this.activeObservations_.length > 0;
      };
      return ResizeObserverSPI2;
    }()
  );
  var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
  var ResizeObserver = (
    /** @class */
    function() {
      function ResizeObserver2(callback) {
        if (!(this instanceof ResizeObserver2)) {
          throw new TypeError("Cannot call a class as a function.");
        }
        if (!arguments.length) {
          throw new TypeError("1 argument required, but only 0 present.");
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
      }
      return ResizeObserver2;
    }()
  );
  [
    "observe",
    "unobserve",
    "disconnect"
  ].forEach(function(method) {
    ResizeObserver.prototype[method] = function() {
      var _a;
      return (_a = observers.get(this))[method].apply(_a, arguments);
    };
  });
  var index$1 = function() {
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver;
  }();
  const isArray = Array.isArray;
  const isString = (val) => typeof val === "string";
  const toObject = (arr) => {
    let obj = {};
    arr.map((item) => {
      obj[item.key] = item.value;
    });
    return obj;
  };
  const SCOPE = "MElScrollbar";
  const isNumber = (val) => {
    return typeof val === "number" && !isNaN(val);
  };
  const debugWarn = (...args) => {
    console.error(...args);
  };
  const resizeHandler = (entries) => {
    for (const entry of entries) {
      const listeners = entry.target.__resizeListeners__ || [];
      if (listeners.length) {
        listeners.forEach((fn) => {
          fn();
        });
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
    if (!element || !element.__resizeListeners__)
      return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.__ro__.disconnect();
    }
  };
  const addUnit = (value2) => {
    if (isString(value2)) {
      return value2;
    } else if (isNumber(value2)) {
      return value2 + "px";
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
  const renderThumbStyle = ({ move, size, bar }) => {
    const style = {};
    const translate2 = `translate${bar.axis}(${move}%)`;
    style[bar.size] = size;
    style.transform = translate2;
    style.msTransform = translate2;
    style.webkitTransform = translate2;
    return style;
  };
  const _sfc_main$i = vue.defineComponent({
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
      const visible2 = vue.ref(false);
      const barStore = vue.reactive({});
      let cursorDown = false;
      let cursorLeave = false;
      const thumb = vue.ref(null);
      const instance = vue.ref(null);
      let onselectstartStore = null;
      const { proxy } = vue.getCurrentInstance();
      const scrollbar2 = proxy.$parent;
      const bar = vue.computed(() => {
        return BAR_MAP[props.vertical ? "vertical" : "horizontal"];
      });
      const offsetRatio = vue.computed(() => {
        return instance.value[bar.value.offset] ** 2 / scrollbar2.wrap[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset];
      });
      const thumbStyle = vue.computed(() => {
        return renderThumbStyle({
          size: props.size,
          move: props.move,
          bar: bar.value
        });
      });
      const mouseMoveDocumentHandler = (e) => {
        if (cursorDown === false)
          return;
        const prevPage = barStore[bar.value.axis];
        if (!prevPage)
          return;
        const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
        const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
        const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
        scrollbar2.wrap[bar.value.scroll] = thumbPositionPercentage * scrollbar2.wrap[bar.value.scrollSize] / 100;
      };
      const mouseUpDocumentHandler = () => {
        cursorDown = false;
        barStore[bar.value.axis] = 0;
        off(document, "mousemove", mouseMoveDocumentHandler);
        off(document, "mouseup", mouseUpDocumentHandler);
        document.onselectstart = onselectstartStore;
        if (cursorLeave) {
          visible2.value = false;
        }
      };
      const startDrag = (e) => {
        e.stopImmediatePropagation();
        cursorDown = true;
        on(document, "mousemove", mouseMoveDocumentHandler);
        on(document, "mouseup", mouseUpDocumentHandler);
        onselectstartStore = document.onselectstart;
        document.onselectstart = () => false;
      };
      const clickThumbHandler = (e) => {
        e.stopPropagation();
        if (e.ctrlKey || [1, 2].includes(e.button)) {
          return;
        }
        window.getSelection().removeAllRanges();
        startDrag(e);
        barStore[bar.value.axis] = e.currentTarget[bar.value.offset] - (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]);
      };
      const clickTrackHandler = (e) => {
        const offset = Math.abs(
          e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
        );
        const thumbHalf = thumb[bar.value.offset] / 2;
        const thumbPositionPercentage = (offset - thumbHalf) * 100 * offsetRatio.value / instance[bar.value.offset];
        scrollbar2.wrap[bar.value.scroll] = thumbPositionPercentage * scrollbar2.wrap[bar.value.scrollSize] / 100;
      };
      const mouseMoveScrollbarHandler = () => {
        cursorLeave = false;
        visible2.value = !!props.size;
      };
      const mouseLeaveScrollbarHandler = () => {
        cursorLeave = true;
        visible2.value = cursorDown;
      };
      vue.onMounted(() => {
        vue.nextTick(() => {
          on(scrollbar2.scrollbar, "mousemove", mouseMoveScrollbarHandler);
          on(scrollbar2.scrollbar, "mouseleave", mouseLeaveScrollbarHandler);
        });
      });
      vue.onBeforeUnmount(() => {
        off(document, "mouseup", mouseUpDocumentHandler);
        off(scrollbar2.scrollbar, "mousemove", mouseMoveScrollbarHandler);
        off(scrollbar2.scrollbar, "mouseleave", mouseLeaveScrollbarHandler);
      });
      return {
        clickThumbHandler,
        clickTrackHandler,
        thumbStyle,
        bar,
        visible: visible2,
        instance,
        thumb
      };
    }
  });
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock(vue.Transition, { name: "as-scrollbar-fade" }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createElementVNode("div", {
          ref: "instance",
          class: vue.normalizeClass(["as-scrollbar__bar", "is-" + _ctx.bar.key]),
          onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.clickTrackHandler && _ctx.clickTrackHandler(...args))
        }, [
          vue.createElementVNode("div", {
            ref: "thumb",
            class: "as-scrollbar__thumb",
            style: vue.normalizeStyle(_ctx.thumbStyle),
            onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.clickThumbHandler && _ctx.clickThumbHandler(...args))
          }, null, 36)
        ], 34), [
          [vue.vShow, _ctx.always || _ctx.visible]
        ])
      ]),
      _: 1
    });
  }
  const Bar = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
  const _sfc_main$h = vue.defineComponent({
    components: { Bar },
    props: {
      height: { type: [String, Number], default: "" },
      maxHeight: {
        type: [String, Number],
        default: ""
      },
      native: { type: Boolean, default: false },
      wrapStyle: { type: [String, Array], default: "" },
      wrapClass: { type: [String, Array], default: "" },
      viewClass: { type: [String, Array], default: "" },
      viewStyle: { type: [String, Array], default: "" },
      noresize: Boolean,
      // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
      tag: { type: String, default: "div" },
      always: { type: Boolean, default: false },
      minSize: { type: Number, default: 20 }
    },
    emits: ["scroll"],
    setup(props, { emit }) {
      const sizeWidth = vue.ref("0");
      const sizeHeight = vue.ref("0");
      const moveX = vue.ref(0);
      const moveY = vue.ref(0);
      const scrollbar2 = vue.ref(null);
      const wrap = vue.ref(null);
      const resize = vue.ref(null);
      const ratioY = vue.ref(1);
      const ratioX = vue.ref(1);
      const SCOPE2 = "AScrollbar";
      const GAP = 4;
      const renderWrapStyle = vue.computed(() => {
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
      });
      const update = () => {
        if (!wrap.value)
          return;
        const offsetHeight = wrap.value.offsetHeight - GAP;
        const offsetWidth = wrap.value.offsetWidth - GAP;
        const originalHeight = offsetHeight ** 2 / wrap.value.scrollHeight;
        const originalWidth = offsetWidth ** 2 / wrap.value.scrollWidth;
        const height = Math.max(originalHeight, props.minSize);
        const width2 = Math.max(originalWidth, props.minSize);
        ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
        ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width2 / (offsetWidth - width2));
        sizeHeight.value = height + GAP < offsetHeight ? height + "px" : "";
        sizeWidth.value = width2 + GAP < offsetWidth ? width2 + "px" : "";
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
      const setScrollTop = (value2) => {
        if (!isNumber(value2)) {
          debugWarn(SCOPE2, "value must be a number");
          return;
        }
        wrap.value.scrollTop = value2;
      };
      const setScrollLeft = (value2) => {
        if (!isNumber(value2)) {
          debugWarn(SCOPE2, "value must be a number");
          return;
        }
        wrap.value.scrollLeft = value2;
      };
      vue.onMounted(() => {
        if (!props.native) {
          vue.nextTick(update);
        }
        if (!props.noresize) {
          addResizeListener(resize.value, update);
          addEventListener("resize", update);
        }
      });
      vue.onBeforeUnmount(() => {
        if (!props.noresize) {
          removeResizeListener(resize.value, update);
          removeEventListener("resize", this.update);
        }
      });
      vue.onUpdated(() => update());
      return {
        scrollbar: scrollbar2,
        wrap,
        resize,
        moveX,
        moveY,
        ratioX,
        ratioY,
        sizeWidth,
        sizeHeight,
        update,
        handleScroll,
        scrollTo,
        setScrollTop,
        setScrollLeft,
        renderWrapStyle
      };
    }
  });
  const _hoisted_1$c = {
    ref: "scrollbar",
    class: "as-scrollbar"
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_bar = vue.resolveComponent("bar");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$c, [
      vue.createElementVNode("div", {
        ref: "wrap",
        class: vue.normalizeClass([
          _ctx.wrapClass,
          "as-scrollbar__wrap",
          _ctx.native ? "" : "as-scrollbar__wrap--hidden-default"
        ]),
        style: vue.normalizeStyle(_ctx.renderWrapStyle),
        onScroll: _cache[0] || (_cache[0] = (...args) => _ctx.handleScroll && _ctx.handleScroll(...args))
      }, [
        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
          ref: "resize",
          class: vue.normalizeClass(["as-scrollbar__view", _ctx.viewClass]),
          style: vue.normalizeStyle(_ctx.viewStyle)
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      !_ctx.native ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
        vue.createVNode(_component_bar, {
          move: _ctx.moveX,
          ratio: _ctx.ratioX,
          size: _ctx.sizeWidth,
          always: _ctx.always
        }, null, 8, ["move", "ratio", "size", "always"]),
        vue.createVNode(_component_bar, {
          move: _ctx.moveY,
          ratio: _ctx.ratioY,
          size: _ctx.sizeHeight,
          vertical: "",
          always: _ctx.always
        }, null, 8, ["move", "ratio", "size", "always"])
      ], 64)) : vue.createCommentVNode("", true)
    ], 512);
  }
  const scrollbar = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
  function useTimeout() {
    let timeoutHandle;
    const registerTimeout = (fn, delay) => {
      cancelTimeout();
      timeoutHandle = window.setTimeout(fn, delay);
    };
    const cancelTimeout = () => window.clearTimeout(timeoutHandle);
    return {
      registerTimeout,
      cancelTimeout
    };
  }
  function onClickOutside(target, handler, options2) {
    const { ignore, capture = true } = options2;
    if (!window)
      return;
    const shouldListen = vue.ref(true);
    let fallback;
    const listener = (event) => {
      window.clearTimeout(fallback);
      const el2 = target;
      const composedPath = event.composedPath();
      if (!el2 || el2 === event.target || composedPath.includes(el2) || !shouldListen.value)
        return;
      if (ignore && ignore.length > 0) {
        if (ignore.some((target2) => {
          const el3 = target2;
          return el3 && (event.target === el3 || composedPath.includes(el3));
        }))
          return;
      }
      handler(event);
    };
    window.addEventListener("click", listener, {
      passive: true,
      capture
    });
    window.addEventListener("pointerdown", listener, { passive: true });
    return () => {
      window.removeEventListener("click", listener);
      window.removeEventListener("pointerdown", listener);
    };
  }
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
      const visible2 = vue.ref(false);
      const loaded = vue.ref(false);
      const trigger = vue.ref(null);
      const popover = vue.ref(null);
      const popperInstance = vue.ref(null);
      const { registerTimeout, cancelTimeout } = useTimeout();
      function createPopover(target) {
        if (popperInstance.value) {
          visible2.value = true;
          return;
        }
        popperInstance.value = core.createPopper(
          target,
          popover.value,
          {
            strategy: props.strategy,
            placement: props.placement
          }
        );
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
            ignore: [
              popover.value
            ]
          });
        }
      }
      vue.onUnmounted(() => {
        stopFn && stopFn();
      });
      function show2(target) {
        loaded.value = true;
        visible2.value = true;
        createPopover(target);
        cancelTimeout();
        handleClickOutside(target);
      }
      function hide() {
        registerTimeout(() => {
          visible2.value = false;
          destroyPopover();
        }, 50);
      }
      return {
        visible: visible2,
        loaded,
        trigger,
        popover,
        popperInstance,
        show: show2,
        hide
      };
    }
  };
  const _hoisted_1$b = ["data-show", "data-initialized"];
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.renderSlot(_ctx.$slots, "trigger", vue.mergeProps({ ref: "trigger" }, { show: $setup.show, hide: $setup.hide })),
      vue.createVNode(vue.Transition, { name: "slide-fade" }, {
        default: vue.withCtx(() => [
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "#all-search" }, [
            vue.withDirectives(vue.createElementVNode("div", {
              class: vue.normalizeClass([$props.popperClass, "as-popover-content"]),
              ref: "popover",
              "data-show": $setup.visible,
              "data-initialized": $setup.popperInstance !== null,
              style: { "display": "none" },
              onMouseenter: _cache[0] || (_cache[0] = (...args) => $setup.show && $setup.show(...args)),
              onMouseleave: _cache[1] || (_cache[1] = (...args) => $setup.hide && $setup.hide(...args))
            }, [
              $setup.loaded ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.createCommentVNode("", true)
            ], 42, _hoisted_1$b), [
              [vue.vShow, $setup.visible]
            ])
          ]))
        ]),
        _: 3
      })
    ], 64);
  }
  const popperComp = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
  function findInNodeList(list2) {
    return [].find.call(list2, (item) => isValidate(item));
  }
  function isValidate(el2) {
    return isInput(el2) && isVisible(el2);
  }
  function isInput(el2) {
    if (["input", "textarea"].includes(el2.nodeName.toLowerCase())) {
      return ["text", "search", "textarea"].includes(el2.type);
    }
    return true;
  }
  function isVisible(el2) {
    const style = getComputedStyle(el2);
    return !!el2.getClientRects().length && style.visibility !== "hidden" && style.width !== 0 && style.height !== 0 && style.opacity !== 0;
  }
  function getSearchDom() {
    const el2 = document.querySelector("input[type=search],input[type=text][autocomplete=off],input[autocomplete=off]:not([type])") || document.querySelector("input[type=text][name][value],input[name][value]:not([type])");
    if (el2 && isValidate(el2)) {
      return el2;
    }
    const autofocusOrSearch = document.querySelector("input[autofocus],input[type=search]");
    if (autofocusOrSearch && isValidate(autofocusOrSearch)) {
      return autofocusOrSearch;
    }
    const idOrClassContainSearch = document.querySelectorAll("input[id*=search],input[class*=search]");
    if (idOrClassContainSearch.length) {
      const el3 = findInNodeList(idOrClassContainSearch);
      if (el3 && isValidate(el3)) {
        return el3;
      }
    }
    const placeholderContainSearch = document.querySelectorAll("input[placeholder*=search],input[placeholder*=搜索]");
    if (placeholderContainSearch.length) {
      const el3 = findInNodeList(placeholderContainSearch);
      if (el3 && isValidate(el3)) {
        return el3;
      }
    }
    const textInputTypes = ["hidden", "button", "checkbox", "color", "file", "image", "radio", "range", "reset", "submit"];
    const selector = textInputTypes.map((t) => `[type=${t}]`).join(",");
    const firstInput = document.querySelector(`input:not(${selector}), textarea`);
    if (firstInput && isValidate(firstInput)) {
      return firstInput;
    }
    const inputSearch = document.getElementsByTagName("input");
    const sameKeywordInput = [].find.call(inputSearch, (item) => {
      if (item.value && decodeURI(window.location.pathname + window.location.search).includes(item.value)) {
        return item;
      }
    });
    if (sameKeywordInput) {
      return sameKeywordInput;
    }
  }
  function getKeyword() {
    const el2 = getSearchDom();
    if (el2) {
      let val = "";
      if (["INPUT", "TEXTAREA"].includes(el2.nodeName)) {
        val = el2.value;
      } else {
        val = el2.textContent;
      }
      return encodeURIComponent(val);
    }
    console.log("没有找到搜索关键字");
  }
  const _sfc_main$f = {
    name: "icon",
    props: {
      name: {
        type: String,
        default: ""
      }
    }
  };
  const _hoisted_1$a = {
    class: "as-icon as-menu-item-icon",
    "aria-hidden": "true"
  };
  const _hoisted_2$8 = ["xlink:href"];
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$a, [
      vue.createElementVNode("use", {
        "xlink:href": `#icon-${$props.name}`
      }, null, 8, _hoisted_2$8)
    ]);
  }
  const icon = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
  let el$1 = document.createElement("a");
  const replaceUrl = function(val) {
    const lowerCaseVal = val.toLowerCase();
    const list2 = ["http://", "https://", "ftp://", "files://"];
    for (let i = 0; i < list2.length; i++) {
      if (lowerCaseVal.indexOf(list2[i]) === 0) {
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
      // '包含完整的url'
      origin: el$1.origin,
      // '包含协议到pathname之前的内容'
      protocol: el$1.protocol,
      //  'url使用的协议，包含末尾的:'
      host: el$1.host,
      //  '完整主机名，包含:和端口'
      hostname: el$1.hostname,
      //  '主机名，不包含端口'
      port: el$1.port,
      //  '端口号'
      pathname: el$1.pathname,
      //  '服务器上访问资源的路径/开头'
      search: el$1.search,
      //  'query string，?开头'
      hash: el$1.hash
      //  '#开头的fragment identifier'
    };
  }
  const favicon$1 = useConfig({
    name: "favicon",
    defaultVal: 1,
    reg: /[1|2]/
  });
  function clearIconCache() {
    if (window.confirm("确认要清除图标的缓存吗")) {
      delStorage("iconCache").then(() => {
        console.log("清除成功");
      });
    }
  }
  function useFavicon() {
    return {
      favicon: favicon$1,
      clearIconCache
    };
  }
  let iconCache = vue.reactive({});
  getStorage("iconCache").then((iconData) => {
    iconCache = iconData;
  });
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
      const isError = vue.ref(false);
      const { hostname, origin } = parseUrl(props.url);
      const img = vue.computed(() => {
        if (iconCache[hostname]) {
          return iconCache[hostname];
        } else if (!isError.value) {
          return faviconApi.value;
        } else {
          return "";
        }
      });
      const i = vue.ref(0);
      const faviconApis = vue.ref([
        props.icon,
        `https://favicon.yandex.net/favicon/v2/${encodeURI(hostname)}?size=32`,
        `https://invisible-scarlet-centipede.faviconkit.com/${encodeURI(hostname)}`,
        `${origin}/favicon.ico`
      ]);
      const faviconApi = vue.computed(() => faviconApis.value.filter((j) => j)[i.value]);
      const { favicon: favicon2 } = useFavicon();
      function getBase64Image(image2) {
        const canvas = document.createElement("canvas");
        canvas.width = image2.width;
        canvas.height = image2.height;
        let context = canvas.getContext("2d");
        context.drawImage(image2, 0, 0, image2.width, image2.height);
        return canvas.toDataURL("image/png", 1);
      }
      function handleLoad(e) {
        if (!isError.value && !img.value.startsWith("data:image")) {
          const base64 = getBase64Image(e.target);
          if (base64) {
            iconCache[hostname] = base64;
            setStorage("iconCache", iconCache);
          }
        }
      }
      function handleError(e) {
        const src = e.currentTarget.src;
        if (src === faviconApi.value) {
          if (i.value === faviconApis.value.length - 1) {
            isError.value = true;
          }
          i.value++;
        }
      }
      return {
        img,
        favicon: favicon2,
        handleLoad,
        handleError,
        isError
      };
    }
  };
  const _hoisted_1$9 = {
    key: 0,
    class: "as-img-icon"
  };
  const _hoisted_2$7 = ["src"];
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return $setup.favicon === 1 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$9, [
      vue.createElementVNode("img", {
        class: vue.normalizeClass({ error: $setup.isError }),
        src: $setup.img,
        crossOrigin: "",
        onError: _cache[0] || (_cache[0] = (...args) => $setup.handleError && $setup.handleError(...args)),
        onLoad: _cache[1] || (_cache[1] = (...args) => $setup.handleLoad && $setup.handleLoad(...args))
      }, null, 42, _hoisted_2$7)
    ])) : vue.createCommentVNode("", true);
  }
  const favicon = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
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
    vue.watch(target, (el2) => {
      if (el2 && !hasListener) {
        el2.addEventListener("touchstart", handleTouchStart);
        el2.addEventListener("touchmove", handleTouchMove);
        el2.addEventListener("touchend", handleTouchEnd);
        hasListener = true;
      }
    });
    vue.onUnmounted(() => {
      const el2 = vue.unref(target);
      if (el2) {
        el2.removeEventListener("touchstart", handleTouchStart);
        el2.removeEventListener("touchmove", handleTouchMove);
        el2.removeEventListener("touchend", handleTouchEnd);
      }
    });
  };
  const selection = vue.ref("");
  let isTap = false;
  const _sfc_main$d = {
    name: "menuItem",
    components: {
      popperComp,
      icon,
      favicon
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
      const categoryRef = vue.ref(null);
      const currentSite = site;
      const classList = vue.computed(
        () => props.mode === "horizontal" ? "horizontal" : "vertical"
      );
      const placement = vue.computed(
        () => props.mode === "horizontal" ? "bottom-start" : "right-start"
      );
      const handleMenuShow = (value2, item) => {
        item.show = value2;
      };
      const defaultKeyword = () => {
        if (selection && selection.value) {
          return selection.value;
        }
        let keyword = getKeyword();
        const selectors = currentSite.selectors;
        const query = currentSite.query;
        if (keyword === void 0) {
          if (selectors) {
            const el2 = document.querySelector(selectors);
            keyword = el2 ? el2.value : "";
          } else if (query) {
            query.some((name2) => {
              const word = getQueryString(name2);
              keyword = word;
              return !!word;
            });
          }
        }
        return keyword;
      };
      const handleCateClick = (cate, newWin) => {
        if (isTap) {
          return;
        }
        const urlItem = cate.list.filter((item) => item.data.visible).find((item) => item.url.indexOf(window.location.hostname) === -1);
        return handleClick(urlItem, newWin);
      };
      const handleClick = (item, newWin) => {
        const keyword = defaultKeyword();
        if (newWin) {
          window.open(item.url.replace("%s", keyword));
        } else {
          window.location.href = item.url.replace("%s", keyword);
        }
        return false;
      };
      onTap(categoryRef, () => {
        isTap = true;
      });
      return {
        placement,
        classList,
        handleMenuShow,
        handleClick,
        handleCateClick,
        categoryRef
      };
    }
  };
  const _hoisted_1$8 = ["onMouseenter", "onMouseleave"];
  const _hoisted_2$6 = ["textContent"];
  const _hoisted_3$3 = { class: "as-subMenu" };
  const _hoisted_4$2 = ["onClick", "onMouseup"];
  const _hoisted_5$1 = ["textContent"];
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_icon = vue.resolveComponent("icon");
    const _component_favicon = vue.resolveComponent("favicon");
    const _component_popper_comp = vue.resolveComponent("popper-comp");
    return vue.openBlock(), vue.createBlock(_component_popper_comp, {
      placement: $setup.placement,
      "popper-class": "as-subMenu-container"
    }, {
      trigger: vue.withCtx(({ show: show2, hide }) => [
        vue.createElementVNode("a", {
          class: vue.normalizeClass(["as-menu-item no-underline", $setup.classList]),
          ref: "categoryRef",
          onMouseenter: ($event) => show2($event.target),
          onMouseleave: hide,
          href: "javascript:void 0",
          onClick: [
            _cache[0] || (_cache[0] = vue.withModifiers(($event) => $setup.handleCateClick($props.item, false), ["exact"])),
            _cache[1] || (_cache[1] = vue.withModifiers(($event) => $setup.handleCateClick($props.item, true), ["ctrl", "exact"]))
          ],
          onMouseup: _cache[2] || (_cache[2] = vue.withModifiers(($event) => $setup.handleCateClick($props.item, true), ["middle", "exact"]))
        }, [
          vue.createVNode(_component_icon, {
            name: $props.item.name
          }, null, 8, ["name"]),
          vue.createElementVNode("span", {
            class: "as-menu-item-title",
            textContent: vue.toDisplayString($props.item.nameZh)
          }, null, 8, _hoisted_2$6)
        ], 42, _hoisted_1$8)
      ]),
      default: vue.withCtx(() => [
        vue.createElementVNode("ul", _hoisted_3$3, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.item.list, (child, i) => {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
              key: `${$props.item.name}_${i}`
            }, [
              vue.createElementVNode("a", {
                href: "javascript:void 0",
                onClick: [
                  vue.withModifiers(($event) => $setup.handleClick(child), ["exact"]),
                  vue.withModifiers(($event) => $setup.handleClick(child, true), ["ctrl", "exact"])
                ],
                onMouseup: vue.withModifiers(($event) => $setup.handleClick(child, true), ["middle", "exact"])
              }, [
                vue.createVNode(_component_favicon, {
                  class: "as-url-icon",
                  url: child.url,
                  icon: child.icon
                }, null, 8, ["url", "icon"]),
                vue.createElementVNode("p", {
                  class: "as-subMenu-text",
                  textContent: vue.toDisplayString(child.nameZh)
                }, null, 8, _hoisted_5$1)
              ], 40, _hoisted_4$2)
            ])), [
              [vue.vShow, child.data.visible]
            ]);
          }), 128))
        ])
      ]),
      _: 1
    }, 8, ["placement"]);
  }
  const menuItem = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
  const value = useConfig({
    name: "align",
    defaultVal: "flex-start",
    reg: /[flex\-start|center|flex\-end]/
  });
  const list = /* @__PURE__ */ new Map([
    ["flex-start", "开始"],
    ["center", "居中"],
    ["flex-end", "末尾"]
  ]);
  function useAlign() {
    return {
      list,
      value
    };
  }
  const _sfc_main$c = {
    name: "as-menu",
    components: {
      scrollbar,
      menuItem
    },
    props: {
      mode: {
        type: String,
        default: "horizontal",
        validator: (val) => ["horizontal", "vertical"].indexOf(val) > -1
      }
    },
    setup(props) {
      const { sites: sites2 } = useSites("tm");
      const { value: align } = useAlign();
      const data = vue.reactive({
        showTimeout: 50,
        hideTimeout: 200
      });
      const menuClass = vue.computed(() => ({
        "as-horizontal": props.mode === "horizontal",
        "as-vertical": props.mode === "vertical"
      }));
      return {
        sites: sites2,
        data,
        align,
        menuClass
      };
    }
  };
  const _hoisted_1$7 = { class: "as-menu" };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_menu_item = vue.resolveComponent("menu-item");
    const _component_scrollbar = vue.resolveComponent("scrollbar");
    return vue.openBlock(), vue.createBlock(_component_scrollbar, {
      class: vue.normalizeClass(["as-menu-container", $setup.menuClass]),
      style: vue.normalizeStyle({ justifyContent: $setup.align }),
      noresize: ""
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("ul", _hoisted_1$7, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.sites, (item) => {
            return vue.openBlock(), vue.createBlock(_component_menu_item, {
              key: item.name,
              item,
              mode: $props.mode
            }, null, 8, ["item", "mode"]);
          }), 128))
        ])
      ]),
      _: 1
    }, 8, ["class", "style"]);
  }
  const asMenu = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
  const reg = /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/;
  function setCssValue(name2, value2, defaultVal) {
    const el2 = document.getElementById("all-search");
    const formatVal = reg.test(value2) ? value2 : defaultVal;
    el2.style.setProperty(`--as-${name2}`, formatVal);
  }
  const primaryColor = useConfig({
    name: "primaryColor",
    defaultVal: "#1890ff",
    reg
  });
  const bgColor = useConfig({
    name: "bgColor",
    defaultVal: "#ffffff",
    reg
  });
  const primaryTextColor = useConfig({
    name: "primaryTextColor",
    defaultVal: "#606266",
    reg
  });
  function useColor() {
    vue.watchEffect(() => {
      setCssValue("primary-color", primaryColor.value, "#1890ff");
    });
    vue.watchEffect(() => {
      setCssValue("bg-color", bgColor.value, "#ffffff");
    });
    vue.watchEffect(() => {
      setCssValue("primary-text-color", primaryTextColor.value, "#606266");
    });
    return {
      primaryColor,
      bgColor,
      primaryTextColor
    };
  }
  const toolbar = [
    {
      nameZh: "百度",
      url: "https://www.baidu.com/s?wd=%s&ie=utf-8"
    },
    {
      nameZh: "百度翻译",
      url: "https://fanyi.baidu.com/#auto/zh/%s"
    }
  ].map((item) => ({
    ...item,
    data: {
      visible: true
    }
  }));
  const sites = vue.ref([]);
  function getList(val) {
    if (Array.isArray(val) && val.length > 0) {
      return val;
    } else {
      return toolbar;
    }
  }
  getStorage("toolbar").then((val) => {
    sites.value = getList(val);
  }).catch(() => {
    sites.value = toolbar;
  });
  function initToolBar(list2, type) {
    if (type === "tm") {
      return list2.filter((item) => item.data && item.data.visible).map((item) => ({
        nameZh: item.nameZh,
        url: item.url
      }));
    }
    return list2;
  }
  const visible = useConfig({
    name: "showToolbar",
    defaultVal: 1,
    reg: /[1|2]/
  });
  function useToolbar(type) {
    return {
      visible,
      list: vue.computed(() => initToolBar(sites.value, type))
    };
  }
  const _sfc_main$b = {
    name: "overlay",
    setup(props, { emit }) {
      let mouseDownTarget = false;
      let mouseUpTarget = false;
      const onMaskClick = (e) => {
        if (mouseDownTarget && mouseUpTarget) {
          emit("click", e);
        }
        mouseDownTarget = mouseUpTarget = false;
      };
      const onMouseDown = (e) => {
        mouseDownTarget = e.target === e.currentTarget;
      };
      const onMouseUp = (e) => {
        mouseUpTarget = e.target === e.currentTarget;
      };
      return {
        onMouseDown,
        onMouseUp,
        onMaskClick
      };
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "as-overlay",
      onMousedown: _cache[0] || (_cache[0] = (...args) => $setup.onMouseDown && $setup.onMouseDown(...args)),
      onMouseup: _cache[1] || (_cache[1] = (...args) => $setup.onMouseUp && $setup.onMouseUp(...args)),
      onClick: _cache[2] || (_cache[2] = (...args) => $setup.onMaskClick && $setup.onMaskClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 32);
  }
  const overlay = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
  const _sfc_main$a = {
    name: "as-radio",
    props: {
      modelValue: {
        type: [String, Number, Boolean]
      },
      label: {
        type: [String, Number, Boolean],
        default: ""
      }
    },
    setup(props, ctx) {
      const model = vue.computed({
        get() {
          return props.modelValue;
        },
        set(value2) {
          ctx.emit("update:modelValue", value2);
        }
      });
      return {
        model
      };
    }
  };
  const _hoisted_1$6 = { class: "as-radio as-radio-animate" };
  const _hoisted_2$5 = ["value"];
  const _hoisted_3$2 = /* @__PURE__ */ vue.createElementVNode("i", { class: "as-radio-icon" }, null, -1);
  const _hoisted_4$1 = { class: "as-radio-label" };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("label", _hoisted_1$6, [
      vue.withDirectives(vue.createElementVNode("input", {
        type: "radio",
        value: $props.label,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.model = $event)
      }, null, 8, _hoisted_2$5), [
        [vue.vModelRadio, $setup.model]
      ]),
      _hoisted_3$2,
      vue.createElementVNode("span", _hoisted_4$1, [
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ]);
  }
  const radio = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
  const _sfc_main$9 = {
    name: "form-item",
    props: {
      labelWidth: {
        type: [String, Number],
        default: 80
      },
      label: {
        type: [String, Number],
        default: ""
      }
    },
    setup(props) {
      const labelStyle = vue.computed(() => ({
        width: `${props.labelWidth}px`
      }));
      const contentStyle = vue.computed(() => ({
        marginLeft: `${props.labelWidth}px`
      }));
      return {
        labelStyle,
        contentStyle
      };
    }
  };
  const _hoisted_1$5 = ["textContent"];
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", null, [
      vue.createElementVNode("label", {
        class: "as-label",
        style: vue.normalizeStyle($setup.labelStyle),
        textContent: vue.toDisplayString($props.label)
      }, null, 12, _hoisted_1$5),
      vue.createElementVNode("div", {
        class: "as-content",
        style: vue.normalizeStyle($setup.contentStyle)
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 4)
    ]);
  }
  const formItem = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
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
    return vue.openBlock(), vue.createElementBlock("button", {
      class: vue.normalizeClass(["as-button", `as-button__${$props.type}`])
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2);
  }
  const button = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
  const _sfc_main$7 = {
    name: "color",
    components: {
      asButton: button
    },
    props: {
      modelValue: {
        type: [String, Number]
      }
    },
    setup(props, ctx) {
      const model = vue.computed({
        get() {
          return props.modelValue;
        },
        set(value2) {
          ctx.emit("update:modelValue", value2);
        }
      });
      const reset = () => {
        model.value = "";
      };
      return {
        model,
        reset
      };
    }
  };
  const _hoisted_1$4 = { class: "as-color-set" };
  const _hoisted_2$4 = { class: "as-color-label" };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_asButton = vue.resolveComponent("asButton");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
      vue.createElementVNode("label", _hoisted_2$4, [
        vue.withDirectives(vue.createElementVNode("input", {
          class: "input—color",
          type: "color",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.model = $event)
        }, null, 512), [
          [vue.vModelText, $setup.model]
        ])
      ]),
      vue.createVNode(_component_asButton, {
        class: "reset-btn",
        type: "text",
        onClick: $setup.reset
      }, {
        default: vue.withCtx(() => [
          vue.createTextVNode(" 重置 ")
        ]),
        _: 1
      }, 8, ["onClick"])
    ]);
  }
  const color = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
  const _sfc_main$6 = {
    name: "side-bar",
    components: {
      overlay,
      asRadio: radio,
      formItem,
      color,
      asButton: button
    },
    setup() {
      const visible2 = vue.ref(false);
      const open = () => {
        visible2.value = true;
      };
      const onMaskClick = () => {
        visible2.value = false;
      };
      const { value: mode } = useMode();
      const { list: alignList, value: align } = useAlign();
      const { primaryColor: primaryColor2, primaryTextColor: primaryTextColor2 } = useColor();
      const { show: show2, options: options2, scrollHide: scrollHide2 } = useSwitchShow();
      const { favicon: favicon2, clearIconCache: clearIconCache2 } = useFavicon();
      const { visible: toolbarVisible } = useToolbar();
      const { resetSites: resetSites2 } = useSites("tm");
      const hide = () => {
        show2.value = 2;
      };
      function changeScrollHide(e) {
        if (e.target.value === "none") {
          show2.value = 1;
        } else {
          show2.value = 2;
        }
      }
      return {
        mode,
        visible: visible2,
        open,
        onMaskClick,
        alignList,
        align,
        favicon: favicon2,
        toolbarVisible,
        primaryColor: primaryColor2,
        primaryTextColor: primaryTextColor2,
        show: show2,
        options: options2,
        scrollHide: scrollHide2,
        clearIconCache: clearIconCache2,
        resetSites: resetSites2,
        hide,
        changeScrollHide
      };
    }
  };
  const _hoisted_1$3 = /* @__PURE__ */ vue.createElementVNode("header", { class: "header" }, " 全搜 all-search ", -1);
  const _hoisted_2$3 = /* @__PURE__ */ vue.createElementVNode("footer", null, [
    /* @__PURE__ */ vue.createElementVNode("a", {
      class: "link",
      title: "菜单设置页",
      href: "https://all-search.github.io/all-search/config/sites",
      target: "_blank"
    }, " 菜单设置 "),
    /* @__PURE__ */ vue.createElementVNode("a", {
      class: "link",
      title: "滑词工具栏设置页",
      href: "https://all-search.github.io/all-search/config/toolbar",
      target: "_blank"
    }, " 滑词工具栏设置 "),
    /* @__PURE__ */ vue.createElementVNode("a", {
      class: "link",
      title: "github",
      href: "https://github.com/all-search/all-search/issues",
      target: "_blank"
    }, " 反馈 ")
  ], -1);
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_as_radio = vue.resolveComponent("as-radio");
    const _component_form_item = vue.resolveComponent("form-item");
    const _component_color = vue.resolveComponent("color");
    const _component_as_button = vue.resolveComponent("as-button");
    const _component_overlay = vue.resolveComponent("overlay");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(["as-setting", $setup.mode])
      }, [
        vue.createElementVNode("div", {
          class: "as-setting-btn",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.hide && $setup.hide(...args))
        }, " 收起 "),
        vue.createElementVNode("div", {
          class: "as-setting-btn",
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.open && $setup.open(...args))
        }, " 设置 ")
      ], 2),
      (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "#all-search" }, [
        vue.createVNode(vue.Transition, {
          name: "overlay",
          appear: ""
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createVNode(_component_overlay, { onClick: $setup.onMaskClick }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.Transition, {
                  name: "drawer",
                  appear: ""
                }, {
                  default: vue.withCtx(() => [
                    vue.withDirectives(vue.createElementVNode("div", {
                      "aria-modal": "true",
                      role: "dialog",
                      class: "as-side-bar",
                      onClick: _cache[12] || (_cache[12] = vue.withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      _hoisted_1$3,
                      vue.createElementVNode("section", null, [
                        vue.createVNode(_component_form_item, {
                          "label-width": "84",
                          label: "滑词工具栏"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_as_radio, {
                              label: 1,
                              modelValue: $setup.toolbarVisible,
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.toolbarVisible = $event)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode("显示 ")
                              ]),
                              _: 1
                            }, 8, ["modelValue"]),
                            vue.createVNode(_component_as_radio, {
                              label: 2,
                              modelValue: $setup.toolbarVisible,
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.toolbarVisible = $event)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode("隐藏 ")
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_form_item, { label: "方向" }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_as_radio, {
                              label: "horizontal",
                              modelValue: $setup.mode,
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.mode = $event)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode("横向 ")
                              ]),
                              _: 1
                            }, 8, ["modelValue"]),
                            vue.createVNode(_component_as_radio, {
                              label: "vertical",
                              modelValue: $setup.mode,
                              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.mode = $event)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode("竖向 ")
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_form_item, { label: "对齐" }, {
                          default: vue.withCtx(() => [
                            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.alignList, ([key, value2]) => {
                              return vue.openBlock(), vue.createBlock(_component_as_radio, {
                                key,
                                label: key,
                                modelValue: $setup.align,
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.align = $event)
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(vue.toDisplayString(value2), 1)
                                ]),
                                _: 2
                              }, 1032, ["label", "modelValue"]);
                            }), 128))
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_form_item, { label: "滚动隐藏" }, {
                          default: vue.withCtx(() => [
                            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.options, ([key, value2]) => {
                              return vue.openBlock(), vue.createBlock(_component_as_radio, {
                                key,
                                label: key,
                                modelValue: $setup.scrollHide,
                                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.scrollHide = $event),
                                onChange: $setup.changeScrollHide
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(vue.toDisplayString(value2), 1)
                                ]),
                                _: 2
                              }, 1032, ["label", "modelValue", "onChange"]);
                            }), 128))
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_form_item, { label: "图标" }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_as_radio, {
                              label: 1,
                              modelValue: $setup.favicon,
                              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.favicon = $event)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode("显示 ")
                              ]),
                              _: 1
                            }, 8, ["modelValue"]),
                            vue.createVNode(_component_as_radio, {
                              label: 2,
                              modelValue: $setup.favicon,
                              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.favicon = $event)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode("隐藏 ")
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_form_item, { label: "主题色" }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_color, {
                              name: "primaryColor",
                              modelValue: $setup.primaryColor,
                              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.primaryColor = $event)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_form_item, { label: "文字色" }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_color, {
                              name: "primaryTextColor",
                              modelValue: $setup.primaryTextColor,
                              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.primaryTextColor = $event)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_form_item, { label: "图标缓存" }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_as_button, {
                              type: "text",
                              onClick: $setup.clearIconCache
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(" 清除 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_form_item, { label: "重置网址" }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_as_button, {
                              type: "text",
                              onClick: $setup.resetSites
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(" 重置 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _hoisted_2$3
                    ], 512), [
                      [vue.vShow, $setup.visible]
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["onClick"]), [
              [vue.vShow, $setup.visible]
            ])
          ]),
          _: 1
        })
      ]))
    ], 64);
  }
  const sideBar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
  const _sfc_main$5 = {
    name: "hover-btn",
    setup() {
      const { show: show2 } = useSwitchShow();
      const isMobileVal = isMobile();
      const handleMouseEnter = () => {
        if (!isMobileVal) {
          show2.value = 1;
        }
      };
      const handleClick = () => {
        if (isMobileVal) {
          show2.value = 1;
        }
      };
      const { value: mode } = useMode();
      const className = vue.computed(() => ({
        "as-hide": show2.value === 2,
        [`as-hover-btn-${vue.toValue(mode)}`]: true
      }));
      return {
        handleMouseEnter,
        handleClick,
        className
      };
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["as-hover-btn", $setup.className]),
      onMouseenter: _cache[0] || (_cache[0] = (...args) => $setup.handleMouseEnter && $setup.handleMouseEnter(...args)),
      onClick: _cache[1] || (_cache[1] = (...args) => $setup.handleClick && $setup.handleClick(...args))
    }, " All Search ", 34);
  }
  const hoverBtn = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-7c1bb101"]]);
  const _sfc_main$4 = {
    name: "iconfont"
  };
  const _hoisted_1$2 = { style: { "display": "none" } };
  const _hoisted_2$2 = /* @__PURE__ */ vue.createStaticVNode('<symbol id="icon-disk" viewBox="0 0 1024 1024"><path d="M722.858667 234.666667a64 64 0 0 1 56.533333 33.984L874.666667 448v256a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V448l95.274667-179.349333A64 64 0 0 1 301.141333 234.666667h421.717334zM810.666667 501.333333H213.333333V704h597.333334v-202.666667zM618.666667 576v64H384v-64h234.666667z m128 0v64h-64v-64h64z m-23.808-277.333333H301.141333l-73.685333 138.666666h569.066667L722.858667 298.666667z"></path></symbol><symbol id="icon-personal" viewBox="0 0 1024 1024"><path d="M490.261333 173.44a49.066667 49.066667 0 0 1 64.064 19.178667l1.664 3.093333 87.850667 177.813333 196.352 28.501334a49.066667 49.066667 0 0 1 29.717333 81.066666l-2.538666 2.645334L725.333333 624l33.536 195.349333a49.066667 49.066667 0 0 1-68.010666 53.269334l-3.157334-1.514667L512 778.858667l-175.701333 92.266666a49.066667 49.066667 0 0 1-71.637334-48.426666l0.469334-3.328L298.666667 624.021333 156.629333 485.76a49.066667 49.066667 0 0 1 23.893334-83.114667l3.285333-0.597333 196.352-28.501333 87.850667-177.813334a49.066667 49.066667 0 0 1 22.250666-22.272z m-67.626666 258.581333l-199.658667 28.992 144.469333 140.650667-34.133333 198.741333L512 706.56l178.688 93.845333-34.133333-198.741333 144.469333-140.650667-199.658667-28.992L512 251.157333l-89.386667 180.864z"></path></symbol><symbol id="icon-shopping" viewBox="0 0 1024 1024"><path d="M330.667 768a53.333 53.333 0 1 1 0 106.667 53.333 53.333 0 0 1 0-106.667z m384 0a53.333 53.333 0 1 1 0 106.667 53.333 53.333 0 0 1 0-106.667zM94.763 160h54.741a96 96 0 0 1 92.907 71.787l1.024 4.394 13.205 62.486h0.213L299.733 504l32.491 157.333h402.219l61.653-298.666H313.813l-13.376-64h495.68a64 64 0 0 1 62.678 76.949L797.14 674.283a64 64 0 0 1-62.698 51.05H332.224a64 64 0 0 1-62.677-51.05L208.96 380.864l-0.405 0.085-27.734-131.562a32 32 0 0 0-28.309-25.238l-2.987-0.149H94.741v-64h54.742z"></path></symbol><symbol id="icon-developer" viewBox="0 0 1024 1024"><path d="M541.141333 268.864l61.717334 16.938667-132.394667 482.474666-61.717333-16.938666 132.394666-482.474667zM329.002667 298.666667l44.885333 45.610666-175.36 172.586667 175.04 167.573333-44.266667 46.229334L106.666667 517.504 329.002667 298.666667z m355.882666 0l222.336 218.837333L684.586667 730.666667l-44.266667-46.229334 175.018667-167.573333L640 344.277333 684.885333 298.666667z"></path></symbol><symbol id="icon-image" viewBox="0 0 1024 1024"><path d="M817.365333 213.333333a64 64 0 0 1 64 64v469.333334a64 64 0 0 1-64 64h-597.333333a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64h597.333333z m0 64h-597.333333v469.333334h597.333333V277.333333zM746.666667 371.114667v63.957333c-100.608-1.450667-163.306667 30.293333-193.493334 94.229333l-2.304 5.12-2.858666 6.357334c-44.010667 95.146667-129.088 142.464-249.322667 140.842666v-64c96.234667 1.6 157.930667-32.384 190.933333-103.04l2.538667-5.632 2.624-5.845333c41.664-89.664 127.488-133.333333 251.882667-131.989333z m-397.696-17.237334a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z"></path></symbol><symbol id="icon-social" viewBox="0 0 1024 1024"><path d="M617.216 170.666667c114.24 0 206.869333 92.608 206.869333 206.869333 0 72.533333-37.333333 136.32-93.802666 173.269333l168.746666 196.885334A64 64 0 0 1 850.432 853.333333l-101.888 0.021334c11.221333-19.413333 14.293333-42.496 8.746667-64L850.432 789.333333 634.24 537.109333l60.992-39.872a142.869333 142.869333 0 0 0-75.584-262.549333 251.264 251.264 0 0 0-55.424-57.173333A206.976 206.976 0 0 1 617.216 170.666667z m-61.162667 412.757333l140.8 164.266667A64 64 0 0 1 648.213333 853.333333H181.824a64 64 0 0 1-48.597333-105.642666l140.8-164.266667c18.026667 12.373333 37.76 22.442667 58.773333 29.781333L181.824 789.333333h466.410667l-150.997334-176.128c21.034667-7.338667 40.768-17.386667 58.816-29.781333zM415.04 170.666667c114.24 0 206.869333 92.608 206.869333 206.869333 0 114.24-92.629333 206.869333-206.869333 206.869333-114.261333 0-206.869333-92.629333-206.869333-206.869333C208.170667 263.274667 300.778667 170.666667 415.04 170.666667z m0 64a142.869333 142.869333 0 1 0 0 285.738666 142.869333 142.869333 0 0 0 0-285.738666z"></path></symbol><symbol id="icon-news" viewBox="0 0 1024 1024"><path d="M640 170.666667a64 64 0 0 1 64 64v490.666666h-64V234.666667H213.333333v554.666666h597.333334V362.666667h-64v-64h64a64 64 0 0 1 64 64v426.666666a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V234.666667a64 64 0 0 1 64-64h426.666667z m-192 320v64h-170.666667v-64h170.666667z m128-128v64H277.333333v-64h298.666667z"></path></symbol><symbol id="icon-knowledge" viewBox="0 0 1024 1024"><path d="M168.106667 621.44l120.746666 57.962667 223.274667 108.138666 215.317333-104.32 128.768-61.674666a64 64 0 0 1-29.952 84.970666l-286.229333 138.624a64 64 0 0 1-55.808 0L197.994667 706.517333A64 64 0 0 1 168.106667 621.44z m687.829333-133.930667a64 64 0 0 1-29.674667 85.546667L540.010667 711.68a64 64 0 0 1-55.808 0L197.994667 573.056A64 64 0 0 1 166.826667 490.88l317.013333 149.525333 28.288 13.696 286.229333-138.624-0.149333-0.064 57.728-27.882666zM540.032 185.792l286.208 138.602667a64 64 0 0 1 0 115.2l-286.208 138.624a64 64 0 0 1-55.808 0L197.994667 439.594667a64 64 0 0 1 0-115.2L484.224 185.813333a64 64 0 0 1 55.808 0z m-27.904 57.6l-286.229333 138.602667 286.229333 138.624 286.229333-138.624-286.229333-138.602667z"></path></symbol><symbol id="icon-music" viewBox="0 0 1024 1024"><path d="M515.562667 232.91733299c159.061333 0 288 128.938667 288 288v22.250667A85.354667 85.354667 0 0 1 874.666667 627.30666699v93.994666a85.333333 85.333333 0 0 1-85.333334 85.333334h-116.138666V541.97333299h66.346666v-21.056c0-121.685333-97.002667-220.693333-217.92-223.914666l-6.058666-0.085334h-7.125334c-123.712 0-224 100.288-224 224v21.056h66.368v264.661334H234.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-93.994666a85.354667 85.354667 0 0 1 71.104-84.138667v-22.250667c0-159.061333 128.938667-288 288-288z m27.52 313.813334v256h-62.165334v-256h62.165334z m103.616 42.666666v192H584.533333v-192h62.165334z m-207.232 0v192h-62.165334v-192H439.466667z m-152.661334 16.576H234.666667a21.333333 21.333333 0 0 0-21.333334 21.333334v93.994666a21.333333 21.333333 0 0 0 21.333334 21.333334h52.138666v-136.661334z m502.528 0h-52.138666v136.661334H789.333333a21.333333 21.333333 0 0 0 21.333334-21.333334v-93.994666a21.333333 21.333333 0 0 0-21.333334-21.333334z"></path></symbol><symbol id="icon-translate" viewBox="0 0 1024 1024"><path d="M874.666667 192.00000033v64h-42.666667v426.666666c0 35.349333-30.72 64-68.565333 64h-149.354667l113.749333 128h-85.632l-113.770666-128h-11.562667l-113.749333 128h-85.610667l113.728-128h-170.666667C222.72 746.66666633 192 718.01600033 192 682.66666633V256.00000033H149.333333V192.00000033h725.333334z m-106.666667 64H256v426.666666h512V256.00000033zM405.333333 490.66666633v64h-64v-64h64z m277.333334 0v64H448v-64h234.666667z m0-106.666666v64H448v-64h234.666667z m-277.333334 0v64h-64v-64h64z"></path></symbol><symbol id="icon-video" viewBox="0 0 1024 1024"><path d="M658.069333 234.66666667a64 64 0 0 1 64 64l-0.021333 33.664 49.28-38.4A64 64 0 0 1 874.666667 344.44799967v338.368a64 64 0 0 1-103.338667 50.474667l-49.28-38.4v26.496a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V298.66666667a64 64 0 0 1 64-64h444.736z m0 64H213.333333v422.698667h444.736l-0.128-157.589334L810.666667 682.79466667V344.42666667l-152.704 118.933333 0.106666-164.693333zM384 375.97866667a42.666667 42.666667 0 0 1 22.741333 6.570667l133.866667 84.330666a42.666667 42.666667 0 0 1 0.32 72l-133.866667 86.016A42.666667 42.666667 0 0 1 341.333333 588.99199967v-170.346666a42.666667 42.666667 0 0 1 42.666667-42.666667z m21.333333 81.322667v92.629333l72.789334-46.762667L405.333333 457.30133367z"></path></symbol><symbol id="icon-search" viewBox="0 0 1024 1024"><path d="M469.333 192c153.174 0 277.334 124.16 277.334 277.333 0 68.054-24.534 130.411-65.216 178.688L846.336 818.24l-48.341 49.877L630.4 695.125a276.053 276.053 0 0 1-161.067 51.542C316.16 746.667 192 622.507 192 469.333S316.16 192 469.333 192z m0 64C351.51 256 256 351.51 256 469.333s95.51 213.334 213.333 213.334 213.334-95.51 213.334-213.334S587.157 256 469.333 256z"></path></symbol><symbol id="icon-more" viewBox="0 0 1024 1024"><path d="M437.333333 224C437.333333 183.466667 471.466667 149.333333 512 149.333333s74.666667 34.133333 74.666667 74.666667S552.533333 298.666667 512 298.666667s-74.666667-34.133333-74.666667-74.666667zM439.466667 512c0-40.533333 34.133333-74.666667 74.666666-74.666667s74.666667 34.133333 74.666667 74.666667-34.133333 74.666667-74.666667 74.666667-74.666667-34.133333-74.666666-74.666667zM437.333333 800c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667S552.533333 874.666667 512 874.666667s-74.666667-34.133333-74.666667-74.666667z"></path></symbol><symbol id="icon-scholar" viewBox="0 0 1024 1024"><path d="M306.28571469 698.19428562l205.71428531 102.85714313 205.71428531-102.85714312v-194.97142875l68.57142938-32.61714282v227.58857157a68.57142844 68.57142844 0 0 1-37.89714281 61.32571406l-205.71428625 102.85714312a68.57142844 68.57142844 0 0 1-61.34857125 0l-205.71428626-102.85714312A68.57142844 68.57142844 0 0 1 237.71428531 698.19428562v-225.64571437l64.45714313 30.62857125-147.47428594-70.08a68.57142844 68.57142844 0 0 1-2.35428563-122.6971425L478.17142812 139.95428562a68.57142844 68.57142844 0 0 1 63.56571469 0l325.80571406 170.44571438A68.57142844 68.57142844 0 0 1 900.57142812 393.41714281L900.57142812 626.28571437h-68.57142843v-177.43999968l-292.6171425 139.15428562a68.57142844 68.57142844 0 0 1-58.90285688 0L306.28571469 505.14285687 306.28571469 698.19428562z m203.65714218-497.46285749L184.11428563 371.15428531l325.78285687 154.90285781 325.805715-154.90285781-325.805715-170.42285719z"></path></symbol>', 14);
  const _hoisted_16 = [
    _hoisted_2$2
  ];
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_16);
  }
  const iconfont = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
  function getSelection() {
    return window.getSelection().toString().trim();
  }
  function getSelectionRect() {
    const selection2 = window.getSelection();
    if (selection2.rangeCount) {
      return selection2.getRangeAt(0).getBoundingClientRect();
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
      favicon,
      icon
    },
    setup(props, ctx) {
      const {
        visible: toolbarVisible,
        list: list2
      } = useToolbar("tm");
      const visible2 = vue.ref(false);
      const toolbarEle = vue.ref(null);
      const styleObj = vue.reactive({
        top: 0,
        left: 0
      });
      const style = vue.computed(() => ({
        top: `${styleObj.top - 20}px`,
        left: `${styleObj.left}px`
      }));
      const selectionShort = vue.computed(() => {
        if (selection.value.length > 12) {
          return `${selection.value.substr(0, 12)}...`;
        } else {
          return selection.value;
        }
      });
      let selectStart = false;
      function changeVisible(val) {
        visible2.value = Boolean(val);
        vue.nextTick(() => {
          if (!val) {
            return;
          }
          if (!vue.unref(toolbarEle)) {
            return;
          }
          const toolbarClientRect = vue.unref(toolbarEle).getBoundingClientRect();
          const height = toolbarClientRect.bottom - toolbarClientRect.top;
          const selectionRect = getSelectionRect();
          if (selectionRect) {
            const { x, right, left, top } = selectionRect;
            styleObj.top = scrollTop() + top - height;
            styleObj.left = scrollLeft() + x + (right - left) / 2 - toolbarClientRect.width / 2;
          }
        });
      }
      function isToolbarContains(el2) {
        const toolbarEleValue = vue.unref(toolbarEle);
        if (toolbarEleValue) {
          return toolbarEleValue.contains(el2);
        } else {
          return false;
        }
      }
      window.addEventListener("mousedown", function(e) {
        const include = e.target && getAsRoot().contains(e.target);
        if (!include) {
          changeVisible(false);
        }
      }, true);
      window.addEventListener("mouseup", function(e) {
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
      }, true);
      document.addEventListener("selectionchange", function() {
      }, true);
      document.addEventListener("selectstart", function() {
        selectStart = true;
      }, false);
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
        toolbarVisible,
        list: list2,
        visible: visible2,
        toolbarEle,
        style,
        selectionShort,
        handleClick,
        openMainDialog
      };
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_favicon = vue.resolveComponent("favicon");
    const _component_icon = vue.resolveComponent("icon");
    return $setup.toolbarVisible === 1 ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      class: "bar-container",
      ref: "toolbarEle",
      style: vue.normalizeStyle($setup.style)
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.list, (item, i) => {
        return vue.openBlock(), vue.createBlock(_component_favicon, {
          class: "tool-bar-item",
          key: i,
          url: item.url,
          title: item.nameZh,
          onClick: [
            vue.withModifiers(($event) => $setup.handleClick(item, true), ["exact"]),
            vue.withModifiers(($event) => $setup.handleClick(item, false), ["ctrl", "exact"])
          ],
          onMouseup: vue.withModifiers(($event) => $setup.handleClick(item, false), ["middle", "exact"])
        }, null, 8, ["url", "title", "onClick", "onMouseup"]);
      }), 128)),
      vue.createElementVNode("div", {
        class: "tool-bar-item",
        onClick: _cache[0] || (_cache[0] = (...args) => $setup.openMainDialog && $setup.openMainDialog(...args))
      }, [
        vue.createVNode(_component_icon, {
          class: "as-more-icon",
          name: "more"
        })
      ])
    ], 4)), [
      [vue.vShow, $setup.visible]
    ]) : vue.createCommentVNode("", true);
  }
  const selectionBar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-7c91e3b8"]]);
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
      const style = vue.computed(() => {
        const obj = {};
        if (props.width) {
          obj.width = props.width;
        }
        return obj;
      });
      const localVisible = vue.computed({
        get: () => props.visible,
        set: (value2) => {
          ctx.emit("update:visible", value2);
        }
      });
      const handleClose = () => {
        localVisible.value = false;
      };
      return {
        style,
        handleClose,
        localVisible
      };
    }
  };
  const _hoisted_1$1 = { class: "as-dialog" };
  const _hoisted_2$1 = { class: "as-dialog__header" };
  const _hoisted_3$1 = { class: "as-dialog__body" };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
      vue.createElementVNode("div", {
        class: "as-dialog-container",
        style: vue.normalizeStyle($setup.style)
      }, [
        vue.createElementVNode("div", _hoisted_2$1, [
          vue.renderSlot(_ctx.$slots, "header")
        ]),
        vue.createElementVNode("div", _hoisted_3$1, [
          vue.renderSlot(_ctx.$slots, "default")
        ])
      ], 4),
      vue.createElementVNode("div", {
        class: "as-dialog__mask",
        onClick: _cache[0] || (_cache[0] = (...args) => $setup.handleClose && $setup.handleClose(...args))
      })
    ], 512)), [
      [vue.vShow, $setup.localVisible]
    ]);
  }
  const asDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
  const _sfc_main$1 = {
    name: "search-dialog",
    components: {
      asDialog,
      icon,
      favicon,
      scrollbar
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      keyword: {
        type: [String, Number],
        default: ""
      }
    },
    emits: ["update:visible"],
    setup(props, ctx) {
      const localVisible = vue.computed({
        get: () => props.visible,
        set: (value2) => {
          ctx.emit("update:visible", value2);
        }
      });
      vue.watch(() => props.visible, (val) => {
        inputValue.value = val ? props.keyword : "";
      });
      const inputValue = vue.ref("");
      const { sites: sites2 } = useSites("tm");
      const handleClick = (item, newWin) => {
        const keyword = inputValue.value;
        if (newWin) {
          window.open(item.url.replace("%s", keyword));
        } else {
          window.location.href = item.url.replace("%s", keyword);
        }
      };
      return {
        localVisible,
        sites: sites2,
        inputValue,
        handleClick
      };
    }
  };
  const _hoisted_1 = { class: "se-header" };
  const _hoisted_2 = { class: "se-input-box" };
  const _hoisted_3 = { class: "se-container" };
  const _hoisted_4 = { class: "cate-name" };
  const _hoisted_5 = ["textContent"];
  const _hoisted_6 = { class: "cate-list" };
  const _hoisted_7 = ["onClick", "onMouseup"];
  const _hoisted_8 = ["textContent"];
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_icon = vue.resolveComponent("icon");
    const _component_favicon = vue.resolveComponent("favicon");
    const _component_scrollbar = vue.resolveComponent("scrollbar");
    const _component_as_dialog = vue.resolveComponent("as-dialog");
    return vue.openBlock(), vue.createBlock(_component_as_dialog, {
      visible: $setup.localVisible,
      "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => $setup.localVisible = $event)
    }, {
      header: vue.withCtx(() => [
        vue.createElementVNode("div", _hoisted_1, [
          vue.createElementVNode("div", _hoisted_2, [
            $setup.localVisible ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
              key: 0,
              autofocus: "",
              autocomplete: "off",
              class: "se-input",
              placeholder: "输入并搜索",
              type: "text",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.inputValue = $event)
            }, null, 512)), [
              [vue.vModelText, $setup.inputValue]
            ]) : vue.createCommentVNode("", true)
          ])
        ])
      ]),
      default: vue.withCtx(() => [
        vue.createVNode(_component_scrollbar, {
          class: "se-scrollbar-container",
          noresize: ""
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("div", _hoisted_3, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($setup.sites, (item) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  key: item.name,
                  class: "cate-container"
                }, [
                  vue.createElementVNode("p", _hoisted_4, [
                    vue.createVNode(_component_icon, {
                      name: item.name
                    }, null, 8, ["name"]),
                    vue.createElementVNode("span", {
                      textContent: vue.toDisplayString(item.nameZh)
                    }, null, 8, _hoisted_5)
                  ]),
                  vue.createElementVNode("ul", _hoisted_6, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.list, (child, i) => {
                      return vue.openBlock(), vue.createElementBlock("li", {
                        key: `${item.name}_${i}`,
                        class: "cate-item"
                      }, [
                        vue.createElementVNode("a", {
                          href: "javascript:void 0",
                          onClick: [
                            vue.withModifiers(($event) => $setup.handleClick(child), ["exact"]),
                            vue.withModifiers(($event) => $setup.handleClick(child, true), ["ctrl", "exact"])
                          ],
                          onMouseup: vue.withModifiers(($event) => $setup.handleClick(child, true), ["middle", "exact"])
                        }, [
                          vue.createVNode(_component_favicon, {
                            class: "as-url-icon",
                            url: child.url,
                            icon: child.icon
                          }, null, 8, ["url", "icon"]),
                          vue.createElementVNode("p", {
                            class: "as-subMenu-text",
                            textContent: vue.toDisplayString(child.nameZh)
                          }, null, 8, _hoisted_8)
                        ], 40, _hoisted_7)
                      ]);
                    }), 128))
                  ])
                ]);
              }), 128))
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["visible"]);
  }
  const searchDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
  const _sfc_main = {
    name: "all-search",
    components: {
      logo,
      asMenu,
      sideBar,
      hoverBtn,
      iconfont,
      selectionBar,
      searchDialog
    },
    setup() {
      const { isFullScreen: isFullScreen2 } = useFullScreen();
      const { value: mode } = useMode();
      const { show: show2 } = useSwitchShow();
      const { visible: toolbarVisible } = useToolbar("tm");
      const classList = vue.computed(() => [
        `as-${vue.toValue(mode)}`,
        vue.toValue(show2) === 1 ? "as-show" : "as-hide"
      ]);
      const visible2 = vue.computed(() => {
        return !site.invisible && !vue.unref(isFullScreen2);
      });
      vue.watchEffect(() => {
        const remove = site.invisible || site.disabled || vue.toValue(show2) === 2;
        changeBodyStyle(vue.toValue(mode), remove);
      });
      let isInit = false;
      function init2(site2) {
        if (isInit || site2.disabled) {
          return;
        }
        protectStyle();
        initSpecialStyle();
        addCustomStyle(vue.toValue(mode), site2);
        isInit = true;
      }
      vue.watch(site, (newSite) => {
        init2(newSite);
      }, {
        immediate: true
      });
      const dialogVisible = vue.ref(false);
      const keyword = vue.ref("");
      function openDialog(text) {
        keyword.value = text;
        dialogVisible.value = true;
      }
      const { disabled } = vue.toRefs(site);
      return {
        disabled,
        mode,
        classList,
        visible: visible2,
        dialogVisible,
        openDialog,
        keyword,
        toolbarVisible
      };
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_logo = vue.resolveComponent("logo");
    const _component_as_menu = vue.resolveComponent("as-menu");
    const _component_side_bar = vue.resolveComponent("side-bar");
    const _component_hoverBtn = vue.resolveComponent("hoverBtn");
    const _component_selection_bar = vue.resolveComponent("selection-bar");
    const _component_search_dialog = vue.resolveComponent("search-dialog");
    const _component_iconfont = vue.resolveComponent("iconfont");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      !$setup.disabled ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
        vue.withDirectives(vue.createElementVNode("div", {
          style: { "opacity": "0" },
          class: vue.normalizeClass(["as-container", $setup.classList])
        }, [
          vue.createVNode(_component_logo, { mode: $setup.mode }, null, 8, ["mode"]),
          vue.createVNode(_component_as_menu, { mode: $setup.mode }, null, 8, ["mode"]),
          vue.createVNode(_component_side_bar)
        ], 2), [
          [vue.vShow, $setup.visible]
        ]),
        vue.withDirectives(vue.createVNode(_component_hoverBtn, null, null, 512), [
          [vue.vShow, $setup.visible]
        ])
      ], 64)) : vue.createCommentVNode("", true),
      $setup.toolbarVisible === 1 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
        vue.createVNode(_component_selection_bar, { onOpenDialog: $setup.openDialog }, null, 8, ["onOpenDialog"]),
        vue.createVNode(_component_search_dialog, {
          keyword: $setup.keyword,
          visible: $setup.dialogVisible,
          "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => $setup.dialogVisible = $event)
        }, null, 8, ["keyword", "visible"])
      ], 64)) : vue.createCommentVNode("", true),
      !$setup.disabled || $setup.toolbarVisible === 1 ? (vue.openBlock(), vue.createBlock(_component_iconfont, { key: 2 })) : vue.createCommentVNode("", true)
    ], 64);
  }
  const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  initTmMethods();
  const el = getAsRoot();
  if (!el) {
    const app = vue.createApp(index);
    const el2 = createAsRoot();
    const mountEL = document.documentElement.insertBefore(el2, document.body);
    app.mount(mountEL);
  }

})(Vue, Popper);