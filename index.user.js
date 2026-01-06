// ==UserScript==
// @name         all-search 全搜，搜索引擎快捷跳转，支持任意网站展示
// @namespace    all-search
// @version      1.5.10
// @author       endday
// @description  2026-1-6更新 搜索辅助增强，任意跳转，无需代码适配，支持任意网站展示
// @license      GPL-3.0-only
// @homepageURL  https://github.com/all-search/all-search
// @downloadURL  https://raw.github.com/all-search/all-search/release/index.user.js
// @updateURL    https://raw.github.com/all-search/all-search/release/index.user.js
// @match        *://*/*
// @require      https://registry.npmmirror.com/vue/3.4.15/files/dist/vue.global.prod.js
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_setValue
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function (vue) {
  'use strict';

  const a=new Set;const o = async e=>{a.has(e)||(a.add(e),(n=>{const d="as-style-common";let s=document.getElementById(d);if(s)s.textContent=n;else {const t=document.createElement("style");t.id=d,t.classList.add("as-style"),t.setAttribute("data-as-protected","true"),t.textContent=n,document.head.append(t);}})(e));};

  o(' @charset "UTF-8";@media screen and (max-width:750px){.as-title-horizontal{display:none}}.as-title-horizontal{min-width:90px;margin:0 10px}.as-title-vertical{width:100%}.as-title{text-decoration:none!important;padding:0;margin:0;color:var(--as-primary-color)}.as-title-inner{padding:0;font-size:17px;height:30px;line-height:30px;font-weight:600;color:var(--as-primary-color);margin:0 auto;text-align:center;cursor:pointer}:root{--as-text-color-secondary: #909399}.as-scrollbar{--as-scrollbar-opacity: .3;--as-scrollbar-background-color: var(--as-text-color-secondary);--as-scrollbar-hover-opacity: .5;--as-scrollbar-hover-background-color: var(--as-text-color-secondary);overflow:hidden;position:relative;height:100%}.as-scrollbar__wrap{overflow:auto;height:100%}.as-scrollbar__wrap--hidden-default{scrollbar-width:none}.as-scrollbar__wrap--hidden-default::-webkit-scrollbar{display:none}.as-scrollbar__thumb{position:relative;display:block;width:0;height:0;cursor:pointer;border-radius:inherit;background-color:var(--as-scrollbar-background-color, var(--as-text-color-secondary));transition:var(--as-transition-duration) background-color;opacity:var(--as-scrollbar-opacity, .3)}.as-scrollbar__thumb:hover{background-color:var(--as-scrollbar-hover-background-color, var(--as-text-color-secondary));opacity:var(--as-scrollbar-hover-opacity, .5)}.as-scrollbar__bar{position:absolute;right:2px;bottom:2px;z-index:1;border-radius:4px}.as-scrollbar__bar.is-vertical{width:6px;top:2px}.as-scrollbar__bar.is-vertical>div{width:100%}.as-scrollbar__bar.is-horizontal{height:6px;left:2px}.as-scrollbar__bar.is-horizontal>div{height:100%}.as-scrollbar-fade-enter-active{transition:opacity .34s ease-out}.as-scrollbar-fade-leave-active{transition:opacity .12s ease-out}.as-scrollbar-fade-enter-from,.as-scrollbar-fade-leave-active{opacity:0}.as-popover-content{z-index:999991;position:relative;will-change:transform,opacity;backface-visibility:hidden;-webkit-font-smoothing:antialiased}.as-popover-content .arrow,.as-popover-content .arrow:before{width:0;height:0;border-style:solid}.as-popover-content .arrow:before{content:"";position:absolute}.slide-fade-enter-active{transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1)}.slide-fade-leave-active{transition:transform .1s cubic-bezier(.645,.045,.355,1),opacity .1s cubic-bezier(.645,.045,.355,1)}.slide-fade-enter-from,.slide-fade-leave-to{opacity:0}.slide-fade-enter-from[data-placement=bottom-start],.slide-fade-leave-to[data-placement=bottom-start]{transform:translateY(-100%);transform-origin:top center}.slide-fade-enter-from[data-placement=top-start],.slide-fade-leave-to[data-placement=top-start]{transform:translateY(100%);transform-origin:bottom center}.slide-fade-enter-from[data-placement=left-start],.slide-fade-leave-to[data-placement=left-start]{transform:translate(100%);transform-origin:center right}.slide-fade-enter-from[data-placement=right-start],.slide-fade-leave-to[data-placement=right-start]{transform:translate(-100%);transform-origin:center left}.as-icon{font-size:20px;width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden;margin:.25px 4px 0 0;display:inline-block}.as-img-icon{border:none;position:relative;font-size:0}.as-img-icon img{width:100%;height:100%;border:none;vertical-align:top}.as-img-icon img.error{display:inline-block;transform:scale(1);content:"";color:transparent}.as-img-icon img.error:before{content:"";position:absolute;left:0;top:0;width:100%;height:100%;background:#f5f5f5 no-repeat center/50% 50%}.as-img-icon img.error:after{content:attr(alt);position:absolute;left:0;bottom:0;width:100%;line-height:2;background-color:#00000080;color:#fff;font-size:12px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.as-menu-item.horizontal{position:relative;padding:0 16px}.as-menu-item.horizontal:after{content:"";transform:scaleX(0);opacity:0;transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);position:absolute;right:0;left:0;bottom:0;border-bottom:2px solid var(--as-primary-color)}.as-menu-item.horizontal:hover:after{transform:scaleX(1);opacity:1}@media screen and (max-width:750px){.as-menu-item.horizontal{padding:0 10px}}.as-menu-item.vertical{margin:5px 0;position:relative}.as-menu-item.vertical:after{content:"";transform:scaleY(0);opacity:0;transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);position:absolute;top:0;bottom:0;right:0;border-right:2.5px solid var(--as-primary-color)}.as-menu-item.vertical:hover:after{transform:scaleY(1);opacity:1}.as-menu-item.vertical .as-menu-item-title{margin-right:6px}.as-menu-item.no-underline{text-decoration:none}.as-menu-item:visited{color:var(--as-primary-text-color)}a.as-menu-item{height:30px;line-height:30px;list-style:none;position:relative;color:var(--as-primary-text-color);transition:color .3s cubic-bezier(.645,.045,.355,1),border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1);box-sizing:border-box;margin:0;white-space:nowrap;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}a.as-menu-item:hover{border-color:var(--as-primary-color)}a.as-menu-item:hover .as-menu-item-icon,a.as-menu-item:hover .as-menu-item-title{color:var(--as-primary-color)}.as-menu-item-icon{color:var(--as-primary-text-color)}.as-url-icon{width:16px;height:16px;margin-right:10px}.as-subMenu-container{background:var(--as-bg-color);border:1px solid #e4e7ed;box-shadow:0 0 12px #0000001f;border-radius:4px}.as-subMenu{list-style:none;padding:0;min-width:90px;box-sizing:border-box;margin:4px 0}.as-subMenu li{overflow:hidden;box-sizing:border-box}.as-subMenu li a{display:flex;align-items:center;height:34px;padding:0 16px;text-decoration:none}.as-subMenu li:hover{background-color:var(--as-secondary-background-color);color:var(--as-primary-color)}.as-subMenu .as-subMenu-text{flex:1;font-size:14px;text-overflow:ellipsis;color:var(--as-primary-text-color);white-space:nowrap;margin:0;line-height:34px;font-weight:400;text-align:left}.as-menu-container{flex:1;display:flex}.as-menu{padding:0;margin:0;white-space:nowrap;border:0;box-shadow:none;background-color:var(--as-bg-color);display:flex;list-style:none}.as-horizontal .as-menu{flex-direction:row}.as-vertical .as-menu{flex-direction:column}.as-vertical .as-scrollbar__wrap{height:auto;width:100%}.as-overlay{position:fixed;inset:0;z-index:999991;height:100%;background-color:#0000004d;overflow:auto}label.as-radio{color:var(--as-primary-text-color);font-weight:500;line-height:1;position:relative;cursor:pointer;display:inline-block;white-space:nowrap;outline:none;font-size:14px;-webkit-user-select:none;-moz-user-select:none;user-select:none}label.as-radio+label.as-radio{margin-left:14px}label.as-radio input{position:absolute;opacity:0;visibility:hidden}label.as-radio .as-radio-icon{display:inline-block;position:relative;width:12px;height:12px;background:var(--as-bg-color);border:1px solid #979797;border-radius:50%;vertical-align:-2px}label.as-radio input:checked+.as-radio-icon:after{position:absolute;content:"";width:6px;height:6px;background-color:var(--as-bg-color);border-radius:50%;top:3px;left:3px}label.as-radio input:checked+.as-radio-icon{background:var(--as-primary-color);border:1px solid var(--as-primary-color)}label.as-radio input:disabled+.as-radio-icon{background-color:#e8e8e8;border:solid 1px #979797}label.as-radio input:disabled:checked+.as-radio-icon:after{background-color:#c1c1c1}label.as-radio.as-radio-animate .as-radio-icon{transition:background-color ease-out .3s}label.as-radio .as-radio-label{margin-left:6px;font-size:14px}.as-label{vertical-align:middle;float:left;font-size:14px;color:var(--as-primary-text-color);line-height:40px;padding:0 12px 0 0;box-sizing:border-box}.as-content{line-height:40px;position:relative;font-size:14px}.as-button{display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:var(--as-primary-text-color);text-align:center;box-sizing:border-box;outline:none;margin:0;transition:.1s;font-weight:500;-webkit-user-select:none;-moz-user-select:none;user-select:none;padding:12px 20px;font-size:14px;border-radius:4px}.as-button.as-button__text{border-color:transparent;color:var(--as-primary-color);background:transparent;padding-left:0;padding-right:0}.as-button.as-button__primary{color:#fff;background-color:var(--as-primary-color);border-color:var(--as-primary-color)}.as-color-set .as-color-label{line-height:1;position:relative;cursor:pointer;display:inline-block;white-space:nowrap;outline:none;vertical-align:middle}.as-color-set .input\u2014color{width:30px;height:30px;padding:4px;border:1px solid #e6e6e6;border-radius:4px;background-color:var(--as-secondary-background-color);box-sizing:border-box}.as-color-set .input\u2014color::-webkit-color-swatch{border:0}.as-color-set .input\u2014color::-webkit-color-swatch-wrapper{padding:0}.as-color-set .reset-btn{margin-left:20px}.as-setting{position:relative}.as-setting.horizontal{box-shadow:-4px 0 10px #0000001f;display:flex}.as-setting-btn{line-height:30px;padding:0 14px;position:relative;margin:0;white-space:nowrap;cursor:pointer;font-size:14px;color:var(--as-primary-text-color);text-align:center}.as-setting-btn:hover{color:var(--as-primary-color);background-color:#0000000a}.as-side-bar{width:20vw;min-width:300px;right:0;height:100%;top:0;bottom:0;position:absolute;box-sizing:border-box;background:var(--as-bg-color) radial-gradient(#eff4f9 75%,#f3f3f3) no-repeat fixed;display:flex;flex-direction:column;box-shadow:0 8px 10px -5px #0003,0 16px 24px 2px #00000024,0 6px 30px 5px #0000001f;overflow:hidden}.as-side-bar>header{font-size:16px;align-items:center;color:var(--as-primary-text-color);display:flex;padding:32px 24px}.as-side-bar>section{padding:10px 24px;margin:0 12px;height:100%;flex:1;border-radius:4px;border:1px solid rgba(0,0,0,.1);background:#ffffffab}.as-side-bar>footer{padding:10px 24px 30px}.as-side-bar>footer .link{font-size:14px;text-decoration:none}.as-side-bar>footer .link:visited{color:var(--as-primary-text-color)}.as-side-bar>footer .link+.link{margin-left:20px}.overlay-enter-active,.overlay-leave-active{transition:opacity .3s}.overlay-enter-from,.overlay-leave-to{opacity:0}.overlay-enter-active .as-side-bar{animation:rtl-drawer-animation .3s linear reverse}.overlay-leave-active .as-side-bar{animation:rtl-drawer-animation .3s linear}@keyframes rtl-drawer-animation{0%{transform:translate(0)}to{transform:translate(100%)}}.as-hover-btn[data-v-2c29f8a0]{position:fixed;z-index:99999;font-weight:600;font-size:17px;color:var(--as-primary-color);background:#fff;box-shadow:0 1px 4px #00152914;border:1px var(--as-border-color) solid;opacity:.6;cursor:pointer}.as-hover-btn-horizontal[data-v-2c29f8a0]{left:50%;transform:translateY(0) translate(-50%);padding:0 16px;height:28px;line-height:28px}.as-hover-btn-top[data-v-2c29f8a0]{top:0}.as-hover-btn-bottom[data-v-2c29f8a0]{bottom:0}.as-hover-btn-vertical[data-v-2c29f8a0]{top:50%;padding:0 16px;height:28px;line-height:28px}.as-hover-btn-left[data-v-2c29f8a0]{left:0;right:unset;transform:translateY(-200%) translate(0) rotate(90deg);transform-origin:0 100%}.as-hover-btn-right[data-v-2c29f8a0]{right:0;left:unset;transform-origin:top right;transform:translateY(0) translate(0) rotate(90deg)}.hover-btn.as-hide[data-v-2c29f8a0]{transition:transform .2s;transform:translateY(-100%) translate(-50%)}.bar-container[data-v-a121b06b]{display:flex;padding:2px;max-width:300px;position:absolute;z-index:99999;background-color:#fff;color:#444;box-shadow:0 0 0 1px #0000000d,0 2px 3px #0000001a;border-radius:2px;cursor:pointer;white-space:nowrap}.tool-bar-item[data-v-a121b06b]{margin:0;padding:2px;width:20px;height:20px;border:1px solid #FFF;cursor:pointer;box-sizing:content-box}.tool-bar-item[data-v-a121b06b]:hover{border-color:var(--as-border-color)}.as-more-icon[data-v-a121b06b]{display:block;font-size:20px}.as-dialog{position:fixed;inset:0;margin:0;z-index:99999}.as-dialog__mask{position:fixed;left:0;top:0;width:100%;height:100%;background:#00000080;backdrop-filter:blur(5px)}.as-dialog-container{position:relative;background:#f3f3f3d9;border-radius:10px;box-shadow:0 1px 3px #0000004d;box-sizing:border-box;min-width:50%;max-width:80%;z-index:99;margin:40vh auto 50px;transform:translateY(-40%);overflow:hidden;backdrop-filter:saturate(3) blur(20px)}.as-dialog__header{position:relative}.as-dialog__body{color:#666;font-size:14px;word-break:break-all}.as-dialog__footer{padding:10px 20px 20px;text-align:right;box-sizing:border-box}.as-dialog__close{display:inline-block;position:absolute;top:16px;right:24px;padding:0;background:transparent;cursor:pointer;font-size:16px;color:#909399}.as-dialog__close:before{content:"\u2716"}.se-header{padding:15px 20px;box-shadow:0 1px 6px #20212447;background:#f3f3f3 radial-gradient(#eff4f9 75%,#f3f3f3) no-repeat fixed}.se-input-box{border:1px solid #ccc;background-color:#ffffffab;overflow:hidden;display:flex;border-radius:6px;height:40px;align-items:center;transition:.2s;color:#222}.se-input-box:hover{border-color:#fff;box-shadow:0 1px 6px #20212447}.se-input-box:active{border-color:#fff}.se-input-box .se-input{color:var(--as-primary-text-color);background-color:transparent;font-size:16px;height:100%;width:100%;line-height:20px;margin:0 20px;outline:none;border:none}.se-scrollbar-container{height:50vh;padding:0 20px 20px;background:#f3f3f3 radial-gradient(#eff4f9 75%,#f3f3f3) no-repeat fixed}.se-container{margin-top:10px;display:flex;border-radius:6px;flex-wrap:wrap}.cate-container{flex:0 0 150px;margin:0 10px 10px 0;border:1px solid rgba(0,0,0,.1);background:#ffffffab;padding:6px}.cate-name{padding:0 10px;height:36px;line-height:36px;font-size:16px;display:flex;align-items:center}.cate-list{list-style:none;min-width:110px;box-sizing:border-box;padding:0}.cate-list .cate-item{box-sizing:border-box;padding:0 10px}.cate-list .cate-item .as-subMenu-text{margin:0}.cate-list .cate-item a{display:flex;align-items:center;height:34px;text-decoration:none;color:var(--as-primary-text-color)}.cate-list .cate-item:hover{background-color:#fff;color:var(--as-primary-color)}#all-search .row,.all-search-config .row{display:flex}#all-search .column,.all-search-config .column{display:flex;flex-direction:column}#all-search .col,.all-search-config .col{flex:1}#all-search .row.items-center,#all-search .column.items-center,.all-search-config .row.items-center,.all-search-config .column.items-center{align-items:center}#all-search .row.items-end,#all-search .column.items-end,.all-search-config .row.items-end,.all-search-config .column.items-end{align-items:flex-end}#all-search .row.items-stretch,#all-search .column.items-stretch,.all-search-config .row.items-stretch,.all-search-config .column.items-stretch{align-items:stretch}#all-search .row.justify-center,#all-search .column.justify-center,.all-search-config .row.justify-center,.all-search-config .column.justify-center{justify-content:center}#all-search .row.justify-end,#all-search .column.justify-end,.all-search-config .row.justify-end,.all-search-config .column.justify-end{justify-content:flex-end}#all-search .row.justify-between,#all-search .column.justify-between,.all-search-config .row.justify-between,.all-search-config .column.justify-between{justify-content:space-between}#all-search .row.flex-wrap,.all-search-config .row.flex-wrap{flex-wrap:wrap}#all-search .row.content-center,.all-search-config .row.content-center{align-content:center}#all-search .row.content-end,.all-search-config .row.content-end{align-content:end}.body-horizontal{height:30px;width:100%}.body-horizontal+body [data-as-has-set]{transition-duration:0s}.body-top+body [data-as-margin-top]{margin-top:30px!important}.body-top+body [data-as-transform]{transform:translateY(30px)}.body-top+body [data-as-border-top]{border-top:rgba(0,0,0,0) 30px solid;box-sizing:content-box}.body-bottom+body [data-as-margin-bottom]{margin-bottom:30px!important}.body-bottom+body [data-as-transform]{transform:translateY(-30px)}.body-bottom+body [data-as-border-top]{border-bottom:rgba(0,0,0,0) 30px solid;box-sizing:content-box}.body-vertical{height:100%;width:90px;position:fixed;z-index:99990}.body-left+body{margin-left:90px!important}.body-right+body{margin-right:90px!important}body,#all-search{--as-horizontal-height: $height;--as-primary-color: #1890ff;--as-bg-color: #ffffff;--as-primary-text-color: #606266;--as-secondary-background-color: #f5f7fa;--as-border-color: #e8e8e8}#all-search{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";position:relative}.as-horizontal{height:30px;width:100%;flex-direction:row;transition:transform .1s}.as-horizontal.as-show{transform:translateY(0)}.as-top{top:0;border-bottom:1px var(--as-border-color) solid}.as-top.as-hide{transform:translateY(-100%)}.as-bottom{bottom:0;border-top:1px var(--as-border-color) solid}.as-bottom.as-hide{transform:translateY(100%)}.as-vertical{height:100%;width:90px;top:0;flex-direction:column;transition:transform .1s}.as-vertical.as-show{transform:translate(0)}.as-left{left:0;border-right:1px var(--as-border-color) solid}.as-left.as-hide{transform:translate(-100%)}.as-right{right:0;border-left:1px var(--as-border-color) solid}.as-right.as-hide{transform:translate(100%)}.as-container{opacity:1!important;position:fixed;display:flex;background-color:var(--as-bg-color);z-index:999990} ');

  var __defProp$1 = Object.defineProperty;
  var __defProps$1 = Object.defineProperties;
  var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
  var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
  var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$1 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    if (__getOwnPropSymbols$1)
      for (var prop of __getOwnPropSymbols$1(b)) {
        if (__propIsEnum$1.call(b, prop))
          __defNormalProp$1(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$1)
      for (var prop of __getOwnPropSymbols$1(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$1 = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var _a, _b;
  ((_b = (_a = globalThis.browser) == null ? void 0 : _a.runtime) == null ? void 0 : _b.id) ? globalThis.browser : globalThis.chrome;
  var MapShim = (function() {
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
(function() {
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
          var index2 = getIndex(this.__entries__, key);
          var entry = this.__entries__[index2];
          return entry && entry[1];
        };
        class_1.prototype.set = function(key, value) {
          var index2 = getIndex(this.__entries__, key);
          if (~index2) {
            this.__entries__[index2][1] = value;
          } else {
            this.__entries__.push([key, value]);
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
          for (var _i = 0, _a2 = this.__entries__; _i < _a2.length; _i++) {
            var entry = _a2[_i];
            callback.call(ctx, entry[1], entry[0]);
          }
        };
        return class_1;
      })()
    );
  })();
  var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
  var global$1 = (function() {
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
  })();
  var requestAnimationFrame$1 = (function() {
    if (typeof requestAnimationFrame === "function") {
      return requestAnimationFrame.bind(global$1);
    }
    return function(callback) {
      return setTimeout(function() {
        return callback(Date.now());
      }, 1e3 / 60);
    };
  })();
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
  var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  var ResizeObserverController = (
(function() {
      function ResizeObserverController2() {
        this.connected_ = false;
        this.mutationEventsAdded_ = false;
        this.mutationsObserver_ = null;
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle$1(this.refresh.bind(this), REFRESH_DELAY);
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
      ResizeObserverController2.prototype.onTransitionEnd_ = function(_a2) {
        var _b2 = _a2.propertyName, propertyName = _b2 === void 0 ? "" : _b2;
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
    })()
  );
  var defineConfigurable = (function(target, props) {
    for (var _i = 0, _a2 = Object.keys(props); _i < _a2.length; _i++) {
      var key = _a2[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
    return target;
  });
  var getWindowOf = (function(target) {
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    return ownerGlobal || global$1;
  });
  var emptyRect = createRectInit(0, 0, 0, 0);
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function(size, position) {
      var value = styles["border-" + position + "-width"];
      return size + toFloat(value);
    }, 0);
  }
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
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
  var isSVGGraphicsElement = (function() {
    if (typeof SVGGraphicsElement !== "undefined") {
      return function(target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    return function(target) {
      return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
    };
  })();
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
  function createReadOnlyRect(_a2) {
    var x = _a2.x, y = _a2.y, width = _a2.width, height = _a2.height;
    var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
      x,
      y,
      width,
      height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x
    });
    return rect;
  }
  function createRectInit(x, y, width, height) {
    return { x, y, width, height };
  }
  var ResizeObservation = (
(function() {
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
    })()
  );
  var ResizeObserverEntry = (

(function() {
      function ResizeObserverEntry2(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        defineConfigurable(this, { target, contentRect });
      }
      return ResizeObserverEntry2;
    })()
  );
  var ResizeObserverSPI = (
(function() {
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
    })()
  );
  var observers = typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
  var ResizeObserver$1 = (

(function() {
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
    })()
  );
  [
    "observe",
    "unobserve",
    "disconnect"
  ].forEach(function(method) {
    ResizeObserver$1.prototype[method] = function() {
      var _a2;
      return (_a2 = observers.get(this))[method].apply(_a2, arguments);
    };
  });
  var index = (function() {
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver$1;
  })();
  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createCoords = (v) => ({
    x: v,
    y: v
  });
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  const oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  const yAxisSides = new Set(["top", "bottom"]);
  function getSideAxis(placement) {
    return yAxisSides.has(getSide(placement)) ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
  }
  const lrPlacement = ["left", "right"];
  const rlPlacement = ["right", "left"];
  const tbPlacement = ["top", "bottom"];
  const btPlacement = ["bottom", "top"];
  function getSideList(side, isStart, rtl) {
    switch (side) {
      case "top":
      case "bottom":
        if (rtl) return isStart ? rlPlacement : lrPlacement;
        return isStart ? lrPlacement : rlPlacement;
      case "left":
      case "right":
        return isStart ? tbPlacement : btPlacement;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return __spreadValues$1({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, padding);
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case "start":
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case "end":
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }
  const computePosition$1 = (reference, floating, config) => __async$1(null, null, function* () {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(floating);
    let rects = yield platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = yield fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platform2,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = __spreadProps$1(__spreadValues$1({}, middlewareData), {
        [name]: __spreadValues$1(__spreadValues$1({}, middlewareData[name]), data)
      });
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? yield platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  });
  function detectOverflow(state, options) {
    return __async$1(this, null, function* () {
      var _await$platform$isEle;
      if (options === void 0) {
        options = {};
      }
      const {
        x,
        y,
        platform: platform2,
        rects,
        elements,
        strategy
      } = state;
      const {
        boundary = "clippingAncestors",
        rootBoundary = "viewport",
        elementContext = "floating",
        altBoundary = false,
        padding = 0
      } = evaluate(options, state);
      const paddingObject = getPaddingObject(padding);
      const altContext = elementContext === "floating" ? "reference" : "floating";
      const element = elements[altBoundary ? altContext : elementContext];
      const clippingClientRect = rectToClientRect(yield platform2.getClippingRect({
        element: ((_await$platform$isEle = yield platform2.isElement == null ? void 0 : platform2.isElement(element)) != null ? _await$platform$isEle : true) ? element : element.contextElement || (yield platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
        boundary,
        rootBoundary,
        strategy
      }));
      const rect = elementContext === "floating" ? {
        x,
        y,
        width: rects.floating.width,
        height: rects.floating.height
      } : rects.reference;
      const offsetParent = yield platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating);
      const offsetScale = (yield platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? (yield platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
        x: 1,
        y: 1
      } : {
        x: 1,
        y: 1
      };
      const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? yield platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements,
        rect,
        offsetParent,
        strategy
      }) : rect);
      return {
        top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
        bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
        left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
        right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
      };
    });
  }
  const flip$1 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      fn(state) {
        return __async$1(this, null, function* () {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const _a3 = evaluate(options, state), {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true
          } = _a3, detectOverflowOptions = __objRest(_a3, [
            "mainAxis",
            "crossAxis",
            "fallbackPlacements",
            "fallbackStrategy",
            "fallbackAxisSideDirection",
            "flipAlignment"
          ]);
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const initialSideAxis = getSideAxis(initialPlacement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating);
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements = [initialPlacement, ...fallbackPlacements];
          const overflow = yield detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides[0]], overflow[sides[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements[nextIndex];
            if (nextPlacement) {
              const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
              if (!ignoreCrossAxisOverflow ||

overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
                return {
                  data: {
                    index: nextIndex,
                    overflows: overflowsData
                  },
                  reset: {
                    placement: nextPlacement
                  }
                };
              }
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$filter2;
                  const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement);
                      return currentSideAxis === initialSideAxis ||

currentSideAxis === "y";
                    }
                    return true;
                  }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        });
      }
    };
  };
  const originSides = new Set(["left", "top"]);
  function convertValueToCoords(state, options) {
    return __async$1(this, null, function* () {
      const {
        placement,
        platform: platform2,
        elements
      } = state;
      const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isVertical = getSideAxis(placement) === "y";
      const mainAxisMulti = originSides.has(side) ? -1 : 1;
      const crossAxisMulti = rtl && isVertical ? -1 : 1;
      const rawValue = evaluate(options, state);
      let {
        mainAxis,
        crossAxis,
        alignmentAxis
      } = typeof rawValue === "number" ? {
        mainAxis: rawValue,
        crossAxis: 0,
        alignmentAxis: null
      } : {
        mainAxis: rawValue.mainAxis || 0,
        crossAxis: rawValue.crossAxis || 0,
        alignmentAxis: rawValue.alignmentAxis
      };
      if (alignment && typeof alignmentAxis === "number") {
        crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
      }
      return isVertical ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti
      } : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti
      };
    });
  }
  const offset$1 = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      fn(state) {
        return __async$1(this, null, function* () {
          var _middlewareData$offse, _middlewareData$arrow;
          const {
            x,
            y,
            placement,
            middlewareData
          } = state;
          const diffCoords = yield convertValueToCoords(state, options);
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: __spreadProps$1(__spreadValues$1({}, diffCoords), {
              placement
            })
          };
        });
      }
    };
  };
  const shift$1 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      fn(state) {
        return __async$1(this, null, function* () {
          const {
            x,
            y,
            placement
          } = state;
          const _a3 = evaluate(options, state), {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x2,
                  y: y2
                } = _ref;
                return {
                  x: x2,
                  y: y2
                };
              }
            }
          } = _a3, detectOverflowOptions = __objRest(_a3, [
            "mainAxis",
            "crossAxis",
            "limiter"
          ]);
          const coords = {
            x,
            y
          };
          const overflow = yield detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min2 = mainAxisCoord + overflow[minSide];
            const max2 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min2, mainAxisCoord, max2);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min2 = crossAxisCoord + overflow[minSide];
            const max2 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min2, crossAxisCoord, max2);
          }
          const limitedCoords = limiter.fn(__spreadProps$1(__spreadValues$1({}, state), {
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          }));
          return __spreadProps$1(__spreadValues$1({}, limitedCoords), {
            data: {
              x: limitedCoords.x - x,
              y: limitedCoords.y - y,
              enabled: {
                [mainAxis]: checkMainAxis,
                [crossAxis]: checkCrossAxis
              }
            }
          });
        });
      }
    };
  };
  function hasWindow() {
    return typeof window !== "undefined";
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement$1(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  const invalidOverflowDisplayValues = new Set(["inline", "contents"]);
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
  }
  const tableElements = new Set(["table", "td", "th"]);
  function isTableElement(element) {
    return tableElements.has(getNodeName(element));
  }
  const topLayerSelectors = [":popover-open", ":modal"];
  function isTopLayer(element) {
    return topLayerSelectors.some((selector) => {
      try {
        return element.matches(selector);
      } catch (_e) {
        return false;
      }
    });
  }
  const transformProperties = ["transform", "translate", "scale", "rotate", "perspective"];
  const willChangeValues = ["transform", "translate", "scale", "rotate", "perspective", "filter"];
  const containValues = ["paint", "layout", "strict", "content"];
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css = isElement$1(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
    return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === "undefined" || !CSS.supports) return false;
    return CSS.supports("-webkit-backdrop-filter", "none");
  }
  const lastTraversableNodeNames = new Set(["html", "body", "#document"]);
  function isLastTraversableNode(node) {
    return lastTraversableNodeNames.has(getNodeName(node));
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement$1(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = (
node.assignedSlot ||
node.parentNode ||
isShadowRoot(node) && node.host ||
getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }
  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement$1(element) {
    return !isElement$1(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement$1(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;
    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }
  const noOffsets = createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement$1(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement$1(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement$1(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle$1(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }
  function getHTMLOffset(documentElement, scroll) {
    const htmlRect = documentElement.getBoundingClientRect();
    const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
    const y = htmlRect.top + scroll.scrollTop;
    return {
      x,
      y
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }
  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === "rtl") {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  const SCROLLBAR_MAX = 25;
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    const windowScrollbarX = getWindowScrollBarX(html);
    if (windowScrollbarX <= 0) {
      const doc = html.ownerDocument;
      const body = doc.body;
      const bodyStyles = getComputedStyle(body);
      const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
      const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
      if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
        width -= clippingStableScrollbarWidth;
      }
    } else if (windowScrollbarX <= SCROLLBAR_MAX) {
      width += windowScrollbarX;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  const absoluteOrFixed = new Set(["absolute", "fixed"]);
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport") {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement$1(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement$1(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el) => isElement$1(el) && getNodeName(el) !== "body");
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement$1(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === "fixed") {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    function setLeftRTLScrollbarOffset() {
      offsets.x = getWindowScrollBarX(documentElement);
    }
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        setLeftRTLScrollbarOffset();
      }
    }
    if (isFixed && !isOffsetParentAnElement && documentElement) {
      setLeftRTLScrollbarOffset();
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element) {
    return getComputedStyle$1(element).position === "static";
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement$1(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }
  const getElementRects = function(data) {
    return __async$1(this, null, function* () {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = yield getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, yield getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
        }
      };
    });
  };
  function isRTL(element) {
    return getComputedStyle$1(element).direction === "rtl";
  }
  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement: isElement$1,
    isRTL
  };
  function rectsAreEqual(a, b) {
    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
  }
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const elementRectForRootMargin = element.getBoundingClientRect();
      const {
        left,
        top,
        width,
        height
      } = elementRectForRootMargin;
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 1e3);
          } else {
            refresh(false, ratio);
          }
        }
        if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
          refresh();
        }
        isFirstUpdate = false;
      }
      try {
        io = new IntersectionObserver(handleObserve, __spreadProps$1(__spreadValues$1({}, options), {
root: root.ownerDocument
        }));
      } catch (_e) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === "function",
      layoutShift = typeof IntersectionObserver === "function",
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement$1(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener("resize", update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver((_ref) => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      var _resizeObserver2;
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update);
        ancestorResize && ancestor.removeEventListener("resize", update);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  const offset = offset$1;
  const shift = shift$1;
  const flip = flip$1;
  const computePosition = (reference, floating, options) => {
    const cache = new Map();
    const mergedOptions = __spreadValues$1({
      platform
    }, options);
    const platformWithCache = __spreadProps$1(__spreadValues$1({}, mergedOptions.platform), {
      _c: cache
    });
    return computePosition$1(reference, floating, __spreadProps$1(__spreadValues$1({}, mergedOptions), {
      platform: platformWithCache
    }));
  };
  function isComponentPublicInstance(target) {
    return target != null && typeof target === "object" && "$el" in target;
  }
  function unwrapElement(target) {
    if (isComponentPublicInstance(target)) {
      const element = target.$el;
      return isNode(element) && getNodeName(element) === "#comment" ? null : element;
    }
    return target;
  }
  function toValue(source) {
    return typeof source === "function" ? source() : vue.unref(source);
  }
  function getDPR(element) {
    if (typeof window === "undefined") {
      return 1;
    }
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }
  function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
  }
  function useFloating(reference, floating, options) {
    if (options === void 0) {
      options = {};
    }
    const whileElementsMountedOption = options.whileElementsMounted;
    const openOption = vue.computed(() => {
      var _toValue;
      return (_toValue = toValue(options.open)) != null ? _toValue : true;
    });
    const middlewareOption = vue.computed(() => toValue(options.middleware));
    const placementOption = vue.computed(() => {
      var _toValue2;
      return (_toValue2 = toValue(options.placement)) != null ? _toValue2 : "bottom";
    });
    const strategyOption = vue.computed(() => {
      var _toValue3;
      return (_toValue3 = toValue(options.strategy)) != null ? _toValue3 : "absolute";
    });
    const transformOption = vue.computed(() => {
      var _toValue4;
      return (_toValue4 = toValue(options.transform)) != null ? _toValue4 : true;
    });
    const referenceElement = vue.computed(() => unwrapElement(reference.value));
    const floatingElement = vue.computed(() => unwrapElement(floating.value));
    const x = vue.ref(0);
    const y = vue.ref(0);
    const strategy = vue.ref(strategyOption.value);
    const placement = vue.ref(placementOption.value);
    const middlewareData = vue.shallowRef({});
    const isPositioned = vue.ref(false);
    const floatingStyles = vue.computed(() => {
      const initialStyles = {
        position: strategy.value,
        left: "0",
        top: "0"
      };
      if (!floatingElement.value) {
        return initialStyles;
      }
      const xVal = roundByDPR(floatingElement.value, x.value);
      const yVal = roundByDPR(floatingElement.value, y.value);
      if (transformOption.value) {
        return __spreadValues$1(__spreadProps$1(__spreadValues$1({}, initialStyles), {
          transform: "translate(" + xVal + "px, " + yVal + "px)"
        }), getDPR(floatingElement.value) >= 1.5 && {
          willChange: "transform"
        });
      }
      return {
        position: strategy.value,
        left: xVal + "px",
        top: yVal + "px"
      };
    });
    let whileElementsMountedCleanup;
    function update() {
      if (referenceElement.value == null || floatingElement.value == null) {
        return;
      }
      const open = openOption.value;
      computePosition(referenceElement.value, floatingElement.value, {
        middleware: middlewareOption.value,
        placement: placementOption.value,
        strategy: strategyOption.value
      }).then((position) => {
        x.value = position.x;
        y.value = position.y;
        strategy.value = position.strategy;
        placement.value = position.placement;
        middlewareData.value = position.middlewareData;
        isPositioned.value = open !== false;
      });
    }
    function cleanup() {
      if (typeof whileElementsMountedCleanup === "function") {
        whileElementsMountedCleanup();
        whileElementsMountedCleanup = void 0;
      }
    }
    function attach() {
      cleanup();
      if (whileElementsMountedOption === void 0) {
        update();
        return;
      }
      if (referenceElement.value != null && floatingElement.value != null) {
        whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
        return;
      }
    }
    function reset() {
      if (!openOption.value) {
        isPositioned.value = false;
      }
    }
    vue.watch([middlewareOption, placementOption, strategyOption, openOption], update, {
      flush: "sync"
    });
    vue.watch([referenceElement, floatingElement], attach, {
      flush: "sync"
    });
    vue.watch(openOption, reset, {
      flush: "sync"
    });
    if (vue.getCurrentScope()) {
      vue.onScopeDispose(cleanup);
    }
    return {
      x: vue.shallowReadonly(x),
      y: vue.shallowReadonly(y),
      strategy: vue.shallowReadonly(strategy),
      placement: vue.shallowReadonly(placement),
      middlewareData: vue.shallowReadonly(middlewareData),
      isPositioned: vue.shallowReadonly(isPositioned),
      floatingStyles,
      update
    };
  }

  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __pow = Math.pow;
  var __defNormalProp = (obj2, key, value2) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj2[key] = value2;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __publicField = (obj2, key, value2) => __defNormalProp(obj2, typeof key !== "symbol" ? key + "" : key, value2);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value2) => {
        try {
          step(generator.next(value2));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value2) => {
        try {
          step(generator.throw(value2));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  const version$1 = "1.5.10";
  const pkg = {
    version: version$1
  };
  function debounce(fn, delay = 500) {
    let timeout = null;
    return function(...args) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  function throttle(fn, delay = 500) {
    let canRun = true;
    return function(...args) {
      if (!canRun) return;
      canRun = false;
      setTimeout(() => {
        fn.apply(this, args);
        canRun = true;
      }, delay);
    };
  }
  const version = pkg.version;
  function getQueryString(name, url) {
    const targetUrl = window.location.href;
    const r = new RegExp("[?#&]" + name + "=([^&#]*)(&|#|$)");
    const m = targetUrl.match(r);
    return decodeURIComponent(!m ? "" : m[1]);
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
  const isMobile = function() {
    return /mobile|android|webos|iphone|ipod|blackberry|iphone os|ipad/i.test(navigator.userAgent);
  };
  var _GM_deleteValue = (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  class TmAdapter {
    get(name) {
      return __async(this, null, function* () {
        if (!_GM_getValue) throw new Error("GM_getValue not found");
        const key = getName(name);
        if (!key) return null;
        return parseJson(_GM_getValue(key));
      });
    }
    set(name, value2) {
      return __async(this, null, function* () {
        if (!_GM_setValue) throw new Error("GM_setValue not found");
        const key = getName(name);
        if (!key) throw new Error("Invalid storage key");
        const val = vue.toValue(value2);
        _GM_setValue(key, val);
        return val;
      });
    }
    remove(name) {
      return __async(this, null, function* () {
        if (!_GM_deleteValue) throw new Error("GM_deleteValue not found");
        const key = getName(name);
        if (!key) return false;
        _GM_deleteValue(key);
        return true;
      });
    }
  }
  class WebBridgeAdapter {
    constructor() {
      __publicField(this, "methods", null);
      __publicField(this, "ready");
      this.ready = new Promise((resolve) => {
        const scriptLoaded = getName("script-loaded");
        const pageLoaded = getName("page-loaded");
        if (!scriptLoaded || !pageLoaded) return;
        const onScriptLoaded = (event) => {
          this.methods = event.detail;
          resolve();
        };
        document.addEventListener(scriptLoaded, onScriptLoaded);
        document.dispatchEvent(new Event(pageLoaded));
      });
    }
    get(name) {
      return __async(this, null, function* () {
        yield this.ready;
        return this.methods.getStorage(name);
      });
    }
    set(name, value2) {
      return __async(this, null, function* () {
        yield this.ready;
        return this.methods.setStorage(name, value2);
      });
    }
    remove(name) {
      return __async(this, null, function* () {
        yield this.ready;
        return this.methods.delStorage(name);
      });
    }
  }
  function initTmMethods() {
    const tm = new TmAdapter();
    const scriptLoaded = getName("script-loaded");
    const pageLoaded = getName("page-loaded");
    if (!scriptLoaded || !pageLoaded) return;
    const emit = function() {
      document.dispatchEvent(new CustomEvent(scriptLoaded, {
        detail: {
          version,
          getStorage: (n) => tm.get(n),
          setStorage: (n, v) => tm.set(n, v),
          delStorage: (n) => tm.remove(n)
        }
      }));
    };
    document.addEventListener(pageLoaded, emit);
    emit();
  }
  let activeAdapter = new TmAdapter();
  const isOptionsPage = typeof window !== "undefined" && (window.location.pathname.includes("options") || window.location.hostname.includes("github.io") || window.location.hostname.includes("gitee.io"));
  if (isOptionsPage) {
    activeAdapter = new WebBridgeAdapter();
  }
  const getStorage = (name) => activeAdapter.get(name);
  const setStorage = (name, value2) => activeAdapter.set(name, value2);
  const delStorage = (name) => activeAdapter.remove(name);
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
  function RAFInterval(callback, period, runNow) {
    const needCount = period / 1e3 * 60;
    let times = 0;
    {
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
        const removeNodes = document.querySelectorAll(cssSelectorOrFunction);
        removeNodes.forEach((node) => node.remove());
      }
    } catch (e) {
    }
  }
  function addStyleContent(css, className, addToTarget, isReload = false) {
    RAFInterval(() => {
      let addTo = null;
      {
        addTo = document.body || document.head || document.documentElement || document;
      }
      {
        if (isReload && className) {
          removeNode("." + className);
        } else if (!isReload && className && document.querySelector("." + className) !== null) {
          return true;
        }
        const cssNode = document.createElement("style");
        {
          cssNode.className = className;
        }
        cssNode.setAttribute("type", "text/css");
        cssNode.innerHTML = css;
        try {
          if (addTo) {
            addTo.appendChild(cssNode);
          }
        } catch (e) {
        }
        return true;
      }
    }, 20);
  }
  function initAppAnchor() {
    return __async(this, null, function* () {
      const mode = (yield getStorage("mode")) || "top";
      let anchor = document.getElementById("all-search");
      if (!anchor) {
        anchor = document.createElement("div");
        anchor.id = "all-search";
        if (mode === "bottom") {
          document.documentElement.appendChild(anchor);
        } else {
          document.documentElement.insertBefore(anchor, document.body);
        }
      }
      return anchor;
    });
  }
  function getAsRoot() {
    return document.getElementById("all-search");
  }
  const isFullScreenRef = vue.ref(false);
  function isFullScreen() {
    const doc = document;
    return doc.fullscreen || doc.webkitIsFullScreen || doc.mozFullScreen || doc.msFullscreenElement;
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
  function findInNodeList(list2) {
    return Array.from(list2).find((item) => isValidate(item));
  }
  function isValidate(el2) {
    return isInput(el2) && isVisible(el2);
  }
  function isInput(el2) {
    const nodeName = el2.nodeName.toLowerCase();
    if (["input", "textarea"].includes(nodeName)) {
      const inputEl = el2;
      return ["text", "search", "textarea"].includes(inputEl.type);
    }
    return true;
  }
  function isVisible(el2) {
    const style = getComputedStyle(el2);
    return !!el2.getClientRects().length && style.visibility !== "hidden" && style.width !== "0px" && style.height !== "0px" && style.opacity !== "0";
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
      const found = findInNodeList(idOrClassContainSearch);
      if (found) return found;
    }
    const placeholderContainSearch = document.querySelectorAll("input[placeholder*=search],input[placeholder*=搜索]");
    if (placeholderContainSearch.length) {
      const found = findInNodeList(placeholderContainSearch);
      if (found) return found;
    }
    const textInputTypes = ["hidden", "button", "checkbox", "color", "file", "image", "radio", "range", "reset", "submit"];
    const selector = textInputTypes.map((t) => `[type=${t}]`).join(",");
    const firstInput = document.querySelector(`input:not(${selector}), textarea`);
    if (firstInput && isValidate(firstInput)) {
      return firstInput;
    }
    const inputSearch = document.getElementsByTagName("input");
    const sameKeywordInput = Array.from(inputSearch).find((item) => {
      if (item.value && decodeURI(window.location.pathname + window.location.search).includes(item.value)) {
        return item;
      }
    });
    if (sameKeywordInput) {
      return sameKeywordInput;
    }
    return void 0;
  }
  function getKeyword() {
    const el2 = getSearchDom();
    if (el2) {
      let val = "";
      if (["INPUT", "TEXTAREA"].includes(el2.nodeName)) {
        val = el2.value;
      } else {
        val = el2.textContent || "";
      }
      return encodeURIComponent(val);
    }
    console.log("没有找到搜索关键字");
    return void 0;
  }
  function withHookBefore(originalFn, hookFn) {
    return function(...args) {
      if (hookFn.apply(this, args) === false) {
        return;
      }
      return originalFn.apply(this, args);
    };
  }
  function withHookAfter(originalFn, hookFn) {
    return function(...args) {
      const output = originalFn.apply(this, args);
      hookFn.apply(this, args);
      return output;
    };
  }
  function onClickOutside(target, handler, options2 = {}) {
    const { ignore, capture = true } = options2;
    if (typeof window === "undefined") return;
    const shouldListen = vue.ref(true);
    const listener = (event) => {
      const el2 = target;
      const composedPath = event.composedPath();
      if (!el2 || el2 === event.target || composedPath.includes(el2) || !shouldListen.value) {
        return;
      }
      if (ignore && ignore.length > 0) {
        if (ignore.some((targetEl) => {
          return targetEl && (event.target === targetEl || composedPath.includes(targetEl));
        })) {
          return;
        }
      }
      handler(event);
    };
    window.addEventListener("click", listener, { passive: true, capture });
    window.addEventListener("pointerdown", listener, { passive: true });
    return () => {
      window.removeEventListener("click", listener);
      window.removeEventListener("pointerdown", listener);
    };
  }
  const el = document.createElement("a");
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
    }
    el.href = val;
    return {
      href: el.href,
      origin: el.origin,
      protocol: el.protocol,
      host: el.host,
      hostname: el.hostname,
      port: el.port,
      pathname: el.pathname,
      search: el.search,
      hash: el.hash
    };
  }
  const routerChange = (cb) => {
    history.pushState = withHookAfter(history.pushState.bind(history), cb);
    history.replaceState = withHookAfter(history.replaceState.bind(history), cb);
    window.addEventListener("popstate", cb);
    window.addEventListener("yt-navigate-finish", cb);
    window.addEventListener("hashchange", cb);
  };
  const sites$d = [
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
  const sites$c = [
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
  const sites$b = [
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
  const sites$a = [
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
  const sites$9 = [
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
  const sites$8 = [
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
  const sites$7 = [
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
  const sites$6 = [
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
  const sites$5 = [
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
  const sites$4 = [
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
  const sites$3 = [
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
  const sites$2 = [
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
  const siteGroups = [
    {
      nameZh: "搜索",
      name: "search",
      list: sites$d
    },
    {
      nameZh: "翻译",
      name: "translate",
      list: sites$c
    },
    {
      nameZh: "视频",
      name: "video",
      list: sites$a
    },
    {
      nameZh: "购物",
      name: "shopping",
      list: sites$4
    },
    {
      nameZh: "音乐",
      name: "music",
      list: sites$9
    },
    {
      nameZh: "开发",
      name: "developer",
      list: sites$b
    },
    {
      nameZh: "新闻",
      name: "news",
      list: sites$8
    },
    {
      nameZh: "社交",
      name: "social",
      list: sites$7
    },
    {
      nameZh: "百科",
      name: "knowledge",
      list: sites$6
    },
    {
      nameZh: "图片",
      name: "image",
      list: sites$5
    },
    {
      nameZh: "网盘",
      name: "disk",
      list: sites$3
    },
    {
      nameZh: "学术",
      name: "scholar",
      list: sites$2
    },
    {
      nameZh: "常用",
      name: "personal",
      list: []
    }
  ];
  const list$2 = siteGroups.map((item) => __spreadProps(__spreadValues({}, item), {
    data: {
      visible: true
    },
    list: item.list.map((child) => __spreadProps(__spreadValues({}, child), {
      data: {
        visible: true
      }
    }))
  }));
  const toolbar = [
    {
      nameZh: "百度",
      url: "https://www.baidu.com/s?wd=%s&ie=utf-8"
    },
    {
      nameZh: "百度翻译",
      url: "https://fanyi.baidu.com/#auto/zh/%s"
    }
  ].map((item) => __spreadProps(__spreadValues({}, item), {
    data: {
      visible: true
    }
  }));
  function getSites$1(val) {
    if (Array.isArray(val) && val.length > 0) {
      return val;
    } else {
      return list$2;
    }
  }
  getStorage("sites").then((val) => {
    getSites$1(val || []);
  }).catch(() => {
  });
  getStorage("toolbar").then((val) => {
  }).catch(() => {
  });
  vue.reactive({
    tmVersion: ""
  });
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
    vue.watch(() => vue.unref(target), (el2) => {
      if (el2 && !hasListener) {
        el2.addEventListener("touchstart", handleTouchStart);
        el2.addEventListener("touchmove", handleTouchMove);
        el2.addEventListener("touchend", handleTouchEnd);
        hasListener = true;
      }
    }, { immediate: true });
    vue.onUnmounted(() => {
      const el2 = vue.unref(target);
      if (el2) {
        el2.removeEventListener("touchstart", handleTouchStart);
        el2.removeEventListener("touchmove", handleTouchMove);
        el2.removeEventListener("touchend", handleTouchEnd);
      }
    });
  };
  const y = vue.ref(0);
  const direction = vue.ref("");
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
    const scrollHandler = throttle(function(e) {
      const eventTarget = e.target === document ? e.target.documentElement : e.target;
      const scrollTop = eventTarget.scrollTop;
      const distance = getDirection(scrollTop, y.value, triggerLimit);
      vue.nextTick().then(() => {
        direction.value = distance;
      });
      y.value = scrollTop;
    }, 200);
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollHandler);
    }
    vue.onBeforeUnmount(() => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", scrollHandler);
      }
    });
    return {
      y,
      direction
    };
  }
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
    const nodeProto = Node.prototype;
    if (nodeProto.__as_hooks__) {
      return;
    }
    const originalRemoveChild = nodeProto.removeChild;
    nodeProto.removeChild = withHookBefore(originalRemoveChild, (e) => {
      if (e && e.tagName === "STYLE") {
        const el2 = e;
        return !(el2.classList.contains("as-icon") || el2.classList.contains("as-style") || el2.classList.contains("elPopover") || el2.classList.contains("elScrollbar"));
      }
      return true;
    });
    nodeProto.__as_hooks__ = true;
  };
  const changeBodyStyle = function(mode, direction2, remove = true) {
    const el2 = getAsRoot();
    if (!el2) return;
    el2.classList.remove("body-top", "body-bottom", "body-left", "body-right");
    el2.classList.remove("body-vertical", "body-horizontal");
    if (!remove) {
      el2.classList.add(`body-${mode}`, `body-${direction2}`);
    }
  };
  function delAsDataSet(item) {
    if (item && item.dataset) {
      delete item.dataset.asMarginTop;
      delete item.dataset.asTransform;
      delete item.dataset.asBorderTop;
    }
  }
  function getParent(el2) {
    let current = el2;
    let go = true;
    while (go && current && current.offsetParent) {
      if (current.offsetParent.tagName === "BODY") {
        go = false;
      } else {
        current = current.offsetParent;
      }
    }
    if (!current) return null;
    const style = window.getComputedStyle(current);
    if (style.position !== "fixed") {
      return null;
    }
    return current;
  }
  function getRealFixedNode(item) {
    if (!item || !(item instanceof HTMLElement)) {
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
  function isElement(obj2) {
    return obj2 && obj2 instanceof Element && obj2.nodeType === 1 && obj2.tagName !== void 0;
  }
  function changeStyle(item) {
    var _a;
    if (!item || !isElement(item)) {
      return;
    }
    const style = window.getComputedStyle(item);
    const el2 = item;
    const styleMap = el2.computedStyleMap && el2.computedStyleMap();
    const top = styleMap ? (_a = styleMap.get("top")) == null ? void 0 : _a.value : null;
    if (top === "auto") {
      return;
    } else if (style.top === "0px") {
      item.style.top = "0px";
    }
    const ds = item.dataset;
    if (ds.asMarginTop || ds.asTransform || ds.asBorderTop) {
      return;
    }
    const marginTop = style.marginTop;
    const transform = style.transform;
    const transition = style.transition;
    if (marginTop === "0px" && !transition.includes("margin")) {
      ds.asHasSet = "asMarginTop";
      ds.asMarginTop = "1";
    } else if (transform === "none") {
      ds.asHasSet = "asTransform";
      ds.asTransform = "1";
    } else {
      ds.asHasSet = "asBorderTop";
      ds.asBorderTop = "1";
    }
  }
  function getFixedNodeList(list2, deep = false) {
    const weakSet = new WeakSet();
    const newList = [];
    const nodes = list2.filter((item) => !!item).map((item) => {
      delAsDataSet(item);
      if (deep) {
        Array.from(item.querySelectorAll("*")).map((child) => {
          delAsDataSet(child);
          return getRealFixedNode(child);
        }).filter((child) => !!child).forEach((child) => {
          if (!weakSet.has(child)) {
            newList.push(child);
            weakSet.add(child);
          }
        });
      }
      return getRealFixedNode(item);
    }).filter((item) => !!item);
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
      if (!document.body) return;
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
      if (!root) return;
      const filterNodes = mutationsList.filter((mutation) => {
        const target = mutation.target;
        if (["BODY", "STYLE"].includes(target.tagName) || root.contains(target)) {
          return false;
        } else if (mutation.type === "attributes") {
          return ["style", "class", "id"].includes(mutation.attributeName || "");
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
  const sitesData = vue.ref([]);
  function getSites(val) {
    if (Array.isArray(val) && val.length > 0) {
      return val;
    } else {
      return list$2;
    }
  }
  function initSites(sites2, type) {
    {
      return sites2.filter((item) => Array.isArray(item.list) && item.list.length > 0 && item.data && item.data.visible).map((item) => __spreadProps(__spreadValues({}, item), {
        show: false
      }));
    }
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
      sites: vue.computed(() => initSites(sitesData.value)),
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
  const { sites: sites$1 } = useSites();
  function getMenuItem() {
    let targetItem = null;
    let urlObj = null;
    const curItem = new URL(window.location.href);
    sites$1.value.some((category) => {
      const found = category.list.find((item) => {
        if (typeof item.url !== "string" || !item.url.includes("//")) {
          return false;
        }
        try {
          const processedUrl = item.url.replace("%s", "placeholder");
          const menuItem = new URL(processedUrl);
          if (menuItem.hostname === curItem.hostname && menuItem.pathname === curItem.pathname) {
            urlObj = menuItem;
            return true;
          }
        } catch (e) {
        }
        return false;
      });
      if (found) {
        targetItem = found;
        return true;
      }
      return false;
    });
    if (urlObj && targetItem) {
      const obj2 = urlObj;
      for (const key of obj2.searchParams.keys()) {
        if (!curItem.searchParams.has(key)) {
          targetItem = null;
        }
      }
    }
    return targetItem;
  }
  function getSite() {
    const target = list$1.find((item) => item.url.test(window.location.href.toLowerCase()));
    const menuItem = getMenuItem();
    if (target) {
      return {
        url: target.url,
        invisible: !!target.invisible,
        disabled: !!target.disabled,
        style: target.style || {},
        selectors: target.selectors || null,
        query: target.query || null
      };
    } else if (menuItem) {
      const item = menuItem;
      return {
        url: item.url,
        invisible: false,
        disabled: false,
        style: item.style || {},
        selectors: item.selectors || null,
        query: item.query || null
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
  function updateCurrentSite() {
    const newSite = getSite();
    Object.keys(newSite).forEach((key) => {
      site[key] = newSite[key];
    });
  }
  vue.watch(sites$1, () => {
    updateCurrentSite();
  });
  routerChange(() => {
    updateCurrentSite();
  });
  const site = vue.reactive(getSite());
  const isDef = (val) => val !== void 0 && val !== null;
  function init$1(name, defaultVal, reg2) {
    return __async(this, null, function* () {
      try {
        const session = yield getStorage(name);
        if (isDef(session) && reg2 && reg2.test(String(session))) {
          return session;
        } else {
          return isDef(session) && !reg2 ? session : defaultVal;
        }
      } catch (e) {
        return defaultVal;
      }
    });
  }
  function useConfig(params) {
    const { name, initVal, defaultVal, reg: reg2 } = params;
    const val = isDef(initVal) ? initVal : defaultVal;
    const valRef = vue.ref(val);
    init$1(name, defaultVal, reg2).then((val2) => {
      valRef.value = val2;
    }).catch(() => {
      if (isDef(defaultVal)) {
        valRef.value = defaultVal;
      }
    });
    return vue.computed({
      get: () => valRef.value,
      set: (val2) => {
        valRef.value = val2;
        setStorage(name, isDef(val2) ? val2 : defaultVal);
      }
    });
  }
  const value$1 = useConfig({
    name: "mode",
    defaultVal: "top",
    reg: /^(top|bottom|right|left)$/
  });
  const obj = {
    "top": "horizontal",
    "bottom": "horizontal",
    "left": "vertical",
    "right": "vertical"
  };
  function useMode() {
    return {
      value: value$1,
      direction: vue.computed(() => obj[value$1.value] || "horizontal")
    };
  }
  const options = vue.reactive( new Map([
    ["none", "关闭"],
    ["top", "向上"],
    ["bottom", "向下"],
    ["all", "滚动"]
  ]));
  const show = useConfig({
    name: "switchShow",
    defaultVal: 1,
    initVal: 2,
    reg: /^[12]$/
  });
  const scrollHide = useConfig({
    name: "scrollHide",
    defaultVal: "none",
    reg: /^(none|top|bottom|all)$/
  });
  function useSwitchShow() {
    return {
      show,
      scrollHide,
      options
    };
  }
  function useAutoHide() {
    const { direction: direction2 } = useScroll(100);
    const { show: show2, scrollHide: scrollHide2 } = useSwitchShow();
    vue.watch([direction2, scrollHide2], ([newDirection, newScrollHide]) => {
      if (show2.value && newScrollHide !== "none" && (newDirection === newScrollHide || newScrollHide === "all")) {
        show2.value = 2;
      }
    });
  }
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
    reg: /^[12]$/
  });
  function useToolbar(type) {
    return {
      visible,
      list: vue.computed(() => initToolBar(sites.value, type))
    };
  }
  function useApp() {
    const { isFullScreen: isFullScreen2 } = useFullScreen();
    const { value: mode, direction: direction2 } = useMode();
    const { show: show2 } = useSwitchShow();
    useAutoHide();
    const { visible: toolbarVisible } = useToolbar("tm");
    const classList = vue.computed(() => [
      `as-${vue.toValue(direction2)}`,
      `as-${vue.toValue(mode)}`,
      vue.toValue(show2) === 1 ? "as-show" : "as-hide"
    ]);
    const visible2 = vue.computed(() => {
      return !site.invisible && !vue.unref(isFullScreen2);
    });
    vue.watchEffect(() => {
      const remove = site.invisible || site.disabled || vue.toValue(show2) === 2;
      changeBodyStyle(vue.toValue(mode), vue.toValue(direction2), remove);
    });
    let isInit = false;
    function init2(currentSite) {
      if (isInit || currentSite.disabled) {
        return;
      }
      protectStyle();
      initSpecialStyle();
      addCustomStyle(vue.toValue(mode), currentSite);
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
    const disabled = vue.computed(() => site.disabled);
    return {
      disabled,
      mode,
      classList,
      visible: visible2,
      dialogVisible,
      openDialog,
      keyword,
      toolbarVisible,
      direction: direction2
    };
  }
  const _sfc_main$j = vue.defineComponent({
    __name: "logo",
    props: {
      direction: {}
    },
    setup(__props) {
      const mobile = isMobile();
      return (_ctx, _cache) => {
        return !vue.unref(mobile) ? (vue.openBlock(), vue.createElementBlock("a", {
          key: 0,
          class: vue.normalizeClass(["as-title", `as-title-${__props.direction}`]),
          href: "https://github.com/all-search/all-search",
          target: "_blank"
        }, [..._cache[0] || (_cache[0] = [
          vue.createElementVNode("p", { class: "as-title-inner" }, " All Search ", -1)
        ])], 2)) : vue.createCommentVNode("", true);
      };
    }
  });
  const isArray = Array.isArray;
  const isString = (val) => typeof val === "string";
  const toObject = (arr) => {
    const obj2 = {};
    arr.forEach((item) => {
      obj2[item.key] = item.value;
    });
    return obj2;
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
      const target = entry.target;
      const listeners = target.__resizeListeners__ || [];
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
      element.__ro__ = new index(resizeHandler);
      element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
  };
  const removeResizeListener = (element, fn) => {
    if (!element || !element.__resizeListeners__) return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length && element.__ro__) {
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
    const translate = `translate${bar.axis}(${move}%)`;
    style[bar.size] = size;
    style.transform = translate;
    style.msTransform = translate;
    style.webkitTransform = translate;
    return style;
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
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
        return __pow(instance.value[bar.value.offset], 2) / scrollbar2.wrap[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset];
      });
      const thumbStyle = vue.computed(() => {
        return renderThumbStyle({
          size: props.size,
          move: props.move,
          bar: bar.value
        });
      });
      const mouseMoveDocumentHandler = (e) => {
        if (cursorDown === false) return;
        const prevPage = barStore[bar.value.axis];
        if (!prevPage) return;
        const offset2 = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
        const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
        const thumbPositionPercentage = (offset2 - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
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
        const offset2 = Math.abs(
          e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
        );
        const thumbHalf = thumb[bar.value.offset] / 2;
        const thumbPositionPercentage = (offset2 - thumbHalf) * 100 * offsetRatio.value / instance[bar.value.offset];
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
  const Bar = _export_sfc(_sfc_main$i, [["render", _sfc_render$2]]);
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
        if (!wrap.value) return;
        const offsetHeight = wrap.value.offsetHeight - GAP;
        const offsetWidth = wrap.value.offsetWidth - GAP;
        const originalHeight = __pow(offsetHeight, 2) / wrap.value.scrollHeight;
        const originalWidth = __pow(offsetWidth, 2) / wrap.value.scrollWidth;
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
  const _hoisted_1$b = {
    ref: "scrollbar",
    class: "as-scrollbar"
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_bar = vue.resolveComponent("bar");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$b, [
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
  const scrollbar = _export_sfc(_sfc_main$h, [["render", _sfc_render$1]]);
  const _hoisted_1$a = ["data-placement"];
  const _sfc_main$g = vue.defineComponent({
    __name: "popper",
    props: {
      tag: { default: "div" },
      placement: { default: "auto" },
      strategy: { default: "fixed" },
      popperClass: { default: "" }
    },
    setup(__props) {
      const props = __props;
      const visible2 = vue.ref(false);
      const loaded = vue.ref(false);
      const triggerRef = vue.ref(null);
      const popoverRef = vue.ref(null);
      const { registerTimeout, cancelTimeout } = useTimeout();
      function show2() {
        loaded.value = true;
        cancelTimeout();
        if (triggerRef.value) {
          handleClickOutside(triggerRef.value);
        }
        visible2.value = true;
      }
      function hide() {
        registerTimeout(() => {
          visible2.value = false;
        }, 50);
      }
      let stopFn;
      function handleClickOutside(target) {
        if (stopFn) {
          stopFn();
        }
        stopFn = onClickOutside(target, hide, {
          ignore: [
            popoverRef.value
          ]
        });
      }
      const {
        placement,
        isPositioned,
        update,
        floatingStyles
      } = useFloating(triggerRef, popoverRef, {
        transform: false,
        placement: props.placement,
        strategy: props.strategy,
        whileElementsMounted: autoUpdate,
        middleware: [
          offset(5),
          flip(),
          shift({ padding: 5 })
        ]
      });
      vue.watch(() => props.placement, (newVal) => {
        update({
          placement: newVal
        });
      });
      vue.onUnmounted(() => {
        stopFn && stopFn();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.tag), {
            ref_key: "triggerRef",
            ref: triggerRef
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "trigger", vue.normalizeProps(vue.guardReactiveProps({ show: show2, hide })))
            ]),
            _: 3
          }, 512)),
          vue.createVNode(vue.Transition, { name: "slide-fade" }, {
            default: vue.withCtx(() => [
              visible2.value ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: vue.normalizeClass([__props.popperClass, "as-popover-content"]),
                ref_key: "popoverRef",
                ref: popoverRef,
                style: vue.normalizeStyle(vue.unref(floatingStyles)),
                "data-placement": vue.unref(placement),
                onMouseenter: show2,
                onMouseleave: hide
              }, [
                loaded.value ? vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.mergeProps({ key: 0 }, { isPositioned: vue.unref(isPositioned) }))) : vue.createCommentVNode("", true)
              ], 46, _hoisted_1$a)) : vue.createCommentVNode("", true)
            ]),
            _: 3
          })
        ], 64);
      };
    }
  });
  const _hoisted_1$9 = {
    class: "as-icon as-menu-item-icon",
    "aria-hidden": "true"
  };
  const _hoisted_2$6 = ["xlink:href"];
  const _sfc_main$f = vue.defineComponent({
    __name: "icon",
    props: {
      name: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$9, [
          vue.createElementVNode("use", {
            "xlink:href": `#icon-${__props.name}`
          }, null, 8, _hoisted_2$6)
        ]);
      };
    }
  });
  const favicon = useConfig({
    name: "favicon",
    defaultVal: 1,
    reg: /^[12]$/
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
      favicon,
      clearIconCache
    };
  }
  const _hoisted_1$8 = {
    key: 0,
    class: "as-img-icon"
  };
  const _hoisted_2$5 = ["src"];
  const iconCache = vue.ref({});
  const isLoaded = vue.ref(false);
  getStorage("iconCache").then((iconData) => {
    iconCache.value = iconData || {};
  }).finally(() => {
    isLoaded.value = true;
  });
  const setStorageDebounce = debounce(() => {
    setStorage("iconCache", iconCache.value);
  }, 1e3);
  const _sfc_main$e = vue.defineComponent({
    __name: "favicon",
    props: {
      url: {},
      icon: {}
    },
    setup(__props) {
      const props = __props;
      const isError = vue.ref(false);
      const { hostname, origin } = parseUrl(props.url || "");
      const img = vue.computed(() => {
        if (!isLoaded.value) {
          return "";
        }
        if (iconCache.value[hostname]) {
          return iconCache.value[hostname];
        } else if (!isError.value) {
          return faviconApi.value;
        } else {
          return `${origin}/favicon.ico`;
        }
      });
      const index2 = vue.ref(0);
      const faviconApis = vue.computed(() => [
        props.icon,
        `https://favicon.yandex.net/favicon/v2/${encodeURI(hostname)}?size=32`,
        `https://invisible-scarlet-centipede.faviconkit.com/${encodeURI(hostname)}`,
        `${origin}/favicon.ico`
      ].filter((j) => !!j));
      const faviconApi = vue.computed(() => faviconApis.value[index2.value]);
      const { favicon: favicon2 } = useFavicon();
      function getBase64Image(image) {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        if (!context) return "";
        context.drawImage(image, 0, 0, image.width, image.height);
        return canvas.toDataURL("image/png", 1);
      }
      function handleLoad(e) {
        if (!isError.value && !img.value.startsWith("data:image")) {
          const base64 = getBase64Image(e.target);
          if (base64) {
            iconCache.value[hostname] = base64;
            setStorageDebounce();
          }
        }
      }
      function handleError(e) {
        const target = e.currentTarget;
        if (target.src === faviconApi.value) {
          if (index2.value === faviconApis.value.length - 1) {
            isError.value = true;
          }
          index2.value++;
        }
      }
      return (_ctx, _cache) => {
        return vue.unref(favicon2) === 1 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
          isLoaded.value ? (vue.openBlock(), vue.createElementBlock("img", {
            key: 0,
            class: vue.normalizeClass({ error: isError.value }),
            src: img.value,
            crossOrigin: "",
            onError: handleError,
            onLoad: handleLoad
          }, null, 42, _hoisted_2$5)) : vue.createCommentVNode("", true)
        ])) : vue.createCommentVNode("", true);
      };
    }
  });
  const selection = vue.ref("");
  const _hoisted_1$7 = ["onMouseenter", "onMouseleave"];
  const _hoisted_2$4 = ["textContent"];
  const _hoisted_3$3 = { class: "as-subMenu-container" };
  const _hoisted_4$1 = {
    key: 0,
    class: "as-subMenu"
  };
  const _hoisted_5$1 = ["onClick", "onMouseup"];
  const _hoisted_6$1 = ["textContent"];
  const _sfc_main$d = vue.defineComponent({
    __name: "menu-item",
    props: {
      item: {},
      direction: { default: "horizontal" },
      mode: { default: "top" }
    },
    setup(__props) {
      const props = __props;
      const categoryRef = vue.ref(null);
      const currentSite = site;
      const classList = vue.computed(
        () => props.direction === "horizontal" ? "horizontal" : "vertical"
      );
      const placementMap = {
        top: "bottom-start",
        bottom: "top-start",
        left: "right-start",
        right: "left-start"
      };
      const placement = vue.computed(() => {
        return placementMap[props.mode || ""] || "bottom-start";
      });
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
            const queryList = Array.isArray(query) ? query : [query];
            queryList.some((name) => {
              const word = getQueryString(name);
              keyword = word;
              return !!word;
            });
          }
        }
        return keyword || "";
      };
      const handleClick = (item, newWin) => {
        const keyword = defaultKeyword();
        const url = item.url.replace("%s", keyword);
        if (newWin) {
          window.open(url);
        } else {
          window.location.href = url;
        }
        return false;
      };
      let isTap = false;
      const handleCateClick = (cate, newWin) => {
        if (isTap) {
          return;
        }
        const urlItem = cate.list.filter((item) => {
          var _a;
          return (_a = item.data) == null ? void 0 : _a.visible;
        }).find((item) => item.url.indexOf(window.location.hostname) === -1);
        if (urlItem) {
          return handleClick(urlItem, newWin);
        }
      };
      onTap(categoryRef, () => {
        isTap = true;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(_sfc_main$g, {
          tag: "li",
          placement: placement.value
        }, {
          trigger: vue.withCtx(({ show: show2, hide }) => [
            vue.createElementVNode("a", {
              class: vue.normalizeClass(["as-menu-item no-underline", classList.value]),
              ref_key: "categoryRef",
              ref: categoryRef,
              onMouseenter: ($event) => show2($event.target),
              onMouseleave: hide,
              href: "javascript:void 0",
              onClick: [
                _cache[0] || (_cache[0] = vue.withModifiers(($event) => handleCateClick(__props.item, false), ["exact"])),
                _cache[1] || (_cache[1] = vue.withModifiers(($event) => handleCateClick(__props.item, true), ["ctrl", "exact"]))
              ],
              onMouseup: _cache[2] || (_cache[2] = vue.withModifiers(($event) => handleCateClick(__props.item, true), ["middle", "exact"]))
            }, [
              vue.createVNode(_sfc_main$f, {
                name: __props.item.name
              }, null, 8, ["name"]),
              vue.createElementVNode("span", {
                class: "as-menu-item-title",
                textContent: vue.toDisplayString(__props.item.nameZh)
              }, null, 8, _hoisted_2$4)
            ], 42, _hoisted_1$7)
          ]),
          default: vue.withCtx(({}) => [
            vue.createElementVNode("div", _hoisted_3$3, [
              __props.item.list && __props.item.list.length ? (vue.openBlock(), vue.createElementBlock("ul", _hoisted_4$1, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.item.list, (child, i) => {
                  var _a;
                  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
                    key: `${__props.item.name}_${i}`
                  }, [
                    vue.createElementVNode("a", {
                      href: "javascript:void 0",
                      onClick: [
                        vue.withModifiers(($event) => handleClick(child), ["exact"]),
                        vue.withModifiers(($event) => handleClick(child, true), ["ctrl", "exact"])
                      ],
                      onMouseup: vue.withModifiers(($event) => handleClick(child, true), ["middle", "exact"])
                    }, [
                      vue.createVNode(_sfc_main$e, {
                        class: "as-url-icon",
                        url: child.url,
                        icon: child.icon
                      }, null, 8, ["url", "icon"]),
                      vue.createElementVNode("p", {
                        class: "as-subMenu-text",
                        textContent: vue.toDisplayString(child.nameZh)
                      }, null, 8, _hoisted_6$1)
                    ], 40, _hoisted_5$1)
                  ])), [
                    [vue.vShow, (_a = child.data) == null ? void 0 : _a.visible]
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["placement"]);
      };
    }
  });
  const value = useConfig({
    name: "align",
    defaultVal: "flex-start",
    reg: /^(flex-start|center|flex-end)$/
  });
  const list = new Map([
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
  const _hoisted_1$6 = { class: "as-menu" };
  const _sfc_main$c = vue.defineComponent({
    __name: "menu",
    props: {
      direction: { default: "horizontal" },
      mode: { default: "top" }
    },
    setup(__props) {
      const props = __props;
      const { sites: sites2 } = useSites();
      const { value: align } = useAlign();
      vue.reactive({
        showTimeout: 50,
        hideTimeout: 200
      });
      const menuClass = vue.computed(() => ({
        "as-horizontal": props.mode === "horizontal",
        "as-vertical": props.mode === "vertical"
      }));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(scrollbar), {
          class: vue.normalizeClass(["as-menu-container", menuClass.value]),
          style: vue.normalizeStyle({ justifyContent: vue.unref(align) }),
          noresize: ""
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("ul", _hoisted_1$6, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(sites2), (item) => {
                return vue.openBlock(), vue.createBlock(_sfc_main$d, {
                  key: item.name,
                  item,
                  direction: __props.direction,
                  mode: __props.mode
                }, null, 8, ["item", "direction", "mode"]);
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["class", "style"]);
      };
    }
  });
  const reg = /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/;
  function setCssValue(name, value2, defaultVal) {
    const el2 = document.getElementById("all-search");
    if (!el2) return;
    const formatVal = reg.test(value2) ? value2 : defaultVal;
    el2.style.setProperty(`--as-${name}`, formatVal);
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
  const _sfc_main$b = vue.defineComponent({
    __name: "overlay",
    emits: ["click"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
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
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: "as-overlay",
          onMousedown: onMouseDown,
          onMouseup: onMouseUp,
          onClick: onMaskClick
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 32);
      };
    }
  });
  const _hoisted_1$5 = { class: "as-radio as-radio-animate" };
  const _hoisted_2$3 = ["value"];
  const _hoisted_3$2 = { class: "as-radio-label" };
  const _sfc_main$a = vue.defineComponent({
    __name: "radio",
    props: {
      modelValue: { type: [String, Number, Boolean] },
      label: { type: [String, Number, Boolean] }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const model = vue.computed({
        get() {
          return props.modelValue;
        },
        set(value2) {
          emit("update:modelValue", value2);
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("label", _hoisted_1$5, [
          vue.withDirectives(vue.createElementVNode("input", {
            type: "radio",
            value: __props.label,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event)
          }, null, 8, _hoisted_2$3), [
            [vue.vModelRadio, model.value]
          ]),
          _cache[1] || (_cache[1] = vue.createElementVNode("i", { class: "as-radio-icon" }, null, -1)),
          vue.createElementVNode("span", _hoisted_3$2, [
            vue.renderSlot(_ctx.$slots, "default")
          ])
        ]);
      };
    }
  });
  const _hoisted_1$4 = ["textContent"];
  const _sfc_main$9 = vue.defineComponent({
    __name: "form-item",
    props: {
      labelWidth: { default: 80 },
      label: { default: "" }
    },
    setup(__props) {
      const props = __props;
      const labelStyle = vue.computed(() => ({
        width: `${props.labelWidth}px`
      }));
      const contentStyle = vue.computed(() => ({
        marginLeft: `${props.labelWidth}px`
      }));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createElementVNode("label", {
            class: "as-label",
            style: vue.normalizeStyle(labelStyle.value),
            textContent: vue.toDisplayString(__props.label)
          }, null, 12, _hoisted_1$4),
          vue.createElementVNode("div", {
            class: "as-content",
            style: vue.normalizeStyle(contentStyle.value)
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 4)
        ]);
      };
    }
  });
  const _sfc_main$8 = vue.defineComponent({
    __name: "button",
    props: {
      type: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          class: vue.normalizeClass(["as-button", __props.type ? `as-button__${__props.type}` : ""])
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  const _hoisted_1$3 = { class: "as-color-set" };
  const _hoisted_2$2 = { class: "as-color-label" };
  const _sfc_main$7 = vue.defineComponent({
    __name: "color",
    props: {
      modelValue: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const model = vue.computed({
        get() {
          return props.modelValue || "";
        },
        set(value2) {
          emit("update:modelValue", value2);
        }
      });
      const reset = () => {
        model.value = "";
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
          vue.createElementVNode("label", _hoisted_2$2, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "input—color",
              type: "color",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event)
            }, null, 512), [
              [vue.vModelText, model.value]
            ])
          ]),
          vue.createVNode(_sfc_main$8, {
            class: "reset-btn",
            type: "text",
            onClick: reset
          }, {
            default: vue.withCtx(() => [..._cache[1] || (_cache[1] = [
              vue.createTextVNode(" 重置 ", -1)
            ])]),
            _: 1
          })
        ]);
      };
    }
  });
  const _sfc_main$6 = vue.defineComponent({
    __name: "side-bar",
    setup(__props) {
      const visible2 = vue.ref(false);
      const open = () => {
        visible2.value = true;
      };
      const onMaskClick = () => {
        visible2.value = false;
      };
      const { value: mode, direction: direction2 } = useMode();
      const { list: alignList, value: align } = useAlign();
      const { primaryColor: primaryColor2, primaryTextColor: primaryTextColor2 } = useColor();
      const { show: show2, options: options2, scrollHide: scrollHide2 } = useSwitchShow();
      const { favicon: favicon2, clearIconCache: clearIconCache2 } = useFavicon();
      const { visible: toolbarVisible } = useToolbar();
      const { resetSites: resetSites2 } = useSites();
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
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(["as-setting", vue.unref(direction2)])
          }, [
            vue.createElementVNode("div", {
              class: "as-setting-btn",
              onClick: hide
            }, " 收起 "),
            vue.createElementVNode("div", {
              class: "as-setting-btn",
              onClick: open
            }, " 设置 ")
          ], 2),
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "#all-search" }, [
            vue.createVNode(vue.Transition, {
              name: "overlay",
              appear: ""
            }, {
              default: vue.withCtx(() => [
                vue.withDirectives(vue.createVNode(_sfc_main$b, { onClick: onMaskClick }, {
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
                          _cache[23] || (_cache[23] = vue.createElementVNode("header", { class: "header" }, " 全搜 all-search ", -1)),
                          vue.createElementVNode("section", null, [
                            vue.createVNode(_sfc_main$9, {
                              "label-width": "84",
                              label: "划词工具栏"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_sfc_main$a, {
                                  label: 1,
                                  modelValue: vue.unref(toolbarVisible),
                                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(toolbarVisible) ? toolbarVisible.value = $event : null)
                                }, {
                                  default: vue.withCtx(() => [..._cache[13] || (_cache[13] = [
                                    vue.createTextVNode("显示 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["modelValue"]),
                                vue.createVNode(_sfc_main$a, {
                                  label: 2,
                                  modelValue: vue.unref(toolbarVisible),
                                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(toolbarVisible) ? toolbarVisible.value = $event : null)
                                }, {
                                  default: vue.withCtx(() => [..._cache[14] || (_cache[14] = [
                                    vue.createTextVNode("隐藏 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_sfc_main$9, { label: "方向" }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_sfc_main$a, {
                                  label: "top",
                                  modelValue: vue.unref(mode),
                                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.isRef(mode) ? mode.value = $event : null)
                                }, {
                                  default: vue.withCtx(() => [..._cache[15] || (_cache[15] = [
                                    vue.createTextVNode("居顶 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["modelValue"]),
                                vue.createVNode(_sfc_main$a, {
                                  label: "bottom",
                                  modelValue: vue.unref(mode),
                                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.isRef(mode) ? mode.value = $event : null)
                                }, {
                                  default: vue.withCtx(() => [..._cache[16] || (_cache[16] = [
                                    vue.createTextVNode("居底 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["modelValue"]),
                                vue.createVNode(_sfc_main$a, {
                                  label: "left",
                                  modelValue: vue.unref(mode),
                                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.isRef(mode) ? mode.value = $event : null)
                                }, {
                                  default: vue.withCtx(() => [..._cache[17] || (_cache[17] = [
                                    vue.createTextVNode("居左 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["modelValue"]),
                                vue.createVNode(_sfc_main$a, {
                                  label: "right",
                                  modelValue: vue.unref(mode),
                                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.isRef(mode) ? mode.value = $event : null)
                                }, {
                                  default: vue.withCtx(() => [..._cache[18] || (_cache[18] = [
                                    vue.createTextVNode("居右 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_sfc_main$9, { label: "对齐" }, {
                              default: vue.withCtx(() => [
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(alignList), ([key, value2]) => {
                                  return vue.openBlock(), vue.createBlock(_sfc_main$a, {
                                    key,
                                    label: key,
                                    modelValue: vue.unref(align),
                                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.isRef(align) ? align.value = $event : null)
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
                            vue.createVNode(_sfc_main$9, { label: "滚动隐藏" }, {
                              default: vue.withCtx(() => [
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(options2), ([key, value2]) => {
                                  return vue.openBlock(), vue.createBlock(_sfc_main$a, {
                                    key,
                                    label: key,
                                    modelValue: vue.unref(scrollHide2),
                                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.isRef(scrollHide2) ? scrollHide2.value = $event : null),
                                    onChange: changeScrollHide
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
                            vue.createVNode(_sfc_main$9, { label: "图标" }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_sfc_main$a, {
                                  label: 1,
                                  modelValue: vue.unref(favicon2),
                                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.isRef(favicon2) ? favicon2.value = $event : null)
                                }, {
                                  default: vue.withCtx(() => [..._cache[19] || (_cache[19] = [
                                    vue.createTextVNode("显示 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["modelValue"]),
                                vue.createVNode(_sfc_main$a, {
                                  label: 2,
                                  modelValue: vue.unref(favicon2),
                                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => vue.isRef(favicon2) ? favicon2.value = $event : null)
                                }, {
                                  default: vue.withCtx(() => [..._cache[20] || (_cache[20] = [
                                    vue.createTextVNode("隐藏 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_sfc_main$9, { label: "主题色" }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_sfc_main$7, {
                                  name: "primaryColor",
                                  modelValue: vue.unref(primaryColor2),
                                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.isRef(primaryColor2) ? primaryColor2.value = $event : null)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_sfc_main$9, { label: "文字色" }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_sfc_main$7, {
                                  name: "primaryTextColor",
                                  modelValue: vue.unref(primaryTextColor2),
                                  "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => vue.isRef(primaryTextColor2) ? primaryTextColor2.value = $event : null)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_sfc_main$9, { label: "图标缓存" }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_sfc_main$8, {
                                  type: "text",
                                  onClick: vue.unref(clearIconCache2)
                                }, {
                                  default: vue.withCtx(() => [..._cache[21] || (_cache[21] = [
                                    vue.createTextVNode(" 清除 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(_sfc_main$9, { label: "重置网址" }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_sfc_main$8, {
                                  type: "text",
                                  onClick: vue.unref(resetSites2)
                                }, {
                                  default: vue.withCtx(() => [..._cache[22] || (_cache[22] = [
                                    vue.createTextVNode(" 重置 ", -1)
                                  ])]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _cache[24] || (_cache[24] = vue.createElementVNode("footer", null, [
                            vue.createElementVNode("a", {
                              class: "link",
                              title: "菜单设置页",
                              href: "https://all-search.github.io/all-search/config/sites",
                              target: "_blank"
                            }, " 菜单设置 "),
                            vue.createElementVNode("a", {
                              class: "link",
                              title: "划词工具栏设置页",
                              href: "https://all-search.github.io/all-search/config/toolbar",
                              target: "_blank"
                            }, " 划词工具栏设置 "),
                            vue.createElementVNode("a", {
                              class: "link",
                              title: "github",
                              href: "https://github.com/all-search/all-search/issues",
                              target: "_blank"
                            }, " 反馈 ")
                          ], -1))
                        ], 512), [
                          [vue.vShow, visible2.value]
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 512), [
                  [vue.vShow, visible2.value]
                ])
              ]),
              _: 1
            })
          ]))
        ], 64);
      };
    }
  });
  const _sfc_main$5 = vue.defineComponent({
    __name: "hover-btn",
    setup(__props) {
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
      const { value: mode, direction: direction2 } = useMode();
      const className = vue.computed(() => {
        return {
          "as-hide": show2.value === 2,
          [`as-hover-btn-${vue.toValue(mode)}`]: true,
          [`as-hover-btn-${vue.toValue(direction2)}`]: true
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["as-hover-btn", className.value]),
          onMouseenter: handleMouseEnter,
          onClick: handleClick
        }, " All Search ", 34);
      };
    }
  });
  const hoverBtn = _export_sfc(_sfc_main$5, [["__scopeId", "data-v-2c29f8a0"]]);
  const _sfc_main$4 = {};
  const _hoisted_1$2 = { style: { "display": "none" } };
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
      vue.createStaticVNode('<symbol id="icon-disk" viewBox="0 0 1024 1024"><path d="M722.858667 234.666667a64 64 0 0 1 56.533333 33.984L874.666667 448v256a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V448l95.274667-179.349333A64 64 0 0 1 301.141333 234.666667h421.717334zM810.666667 501.333333H213.333333V704h597.333334v-202.666667zM618.666667 576v64H384v-64h234.666667z m128 0v64h-64v-64h64z m-23.808-277.333333H301.141333l-73.685333 138.666666h569.066667L722.858667 298.666667z"></path></symbol><symbol id="icon-personal" viewBox="0 0 1024 1024"><path d="M490.261333 173.44a49.066667 49.066667 0 0 1 64.064 19.178667l1.664 3.093333 87.850667 177.813333 196.352 28.501334a49.066667 49.066667 0 0 1 29.717333 81.066666l-2.538666 2.645334L725.333333 624l33.536 195.349333a49.066667 49.066667 0 0 1-68.010666 53.269334l-3.157334-1.514667L512 778.858667l-175.701333 92.266666a49.066667 49.066667 0 0 1-71.637334-48.426666l0.469334-3.328L298.666667 624.021333 156.629333 485.76a49.066667 49.066667 0 0 1 23.893334-83.114667l3.285333-0.597333 196.352-28.501333 87.850667-177.813334a49.066667 49.066667 0 0 1 22.250666-22.272z m-67.626666 258.581333l-199.658667 28.992 144.469333 140.650667-34.133333 198.741333L512 706.56l178.688 93.845333-34.133333-198.741333 144.469333-140.650667-199.658667-28.992L512 251.157333l-89.386667 180.864z"></path></symbol><symbol id="icon-shopping" viewBox="0 0 1024 1024"><path d="M330.667 768a53.333 53.333 0 1 1 0 106.667 53.333 53.333 0 0 1 0-106.667z m384 0a53.333 53.333 0 1 1 0 106.667 53.333 53.333 0 0 1 0-106.667zM94.763 160h54.741a96 96 0 0 1 92.907 71.787l1.024 4.394 13.205 62.486h0.213L299.733 504l32.491 157.333h402.219l61.653-298.666H313.813l-13.376-64h495.68a64 64 0 0 1 62.678 76.949L797.14 674.283a64 64 0 0 1-62.698 51.05H332.224a64 64 0 0 1-62.677-51.05L208.96 380.864l-0.405 0.085-27.734-131.562a32 32 0 0 0-28.309-25.238l-2.987-0.149H94.741v-64h54.742z"></path></symbol><symbol id="icon-developer" viewBox="0 0 1024 1024"><path d="M541.141333 268.864l61.717334 16.938667-132.394667 482.474666-61.717333-16.938666 132.394666-482.474667zM329.002667 298.666667l44.885333 45.610666-175.36 172.586667 175.04 167.573333-44.266667 46.229334L106.666667 517.504 329.002667 298.666667z m355.882666 0l222.336 218.837333L684.586667 730.666667l-44.266667-46.229334 175.018667-167.573333L640 344.277333 684.885333 298.666667z"></path></symbol><symbol id="icon-image" viewBox="0 0 1024 1024"><path d="M817.365333 213.333333a64 64 0 0 1 64 64v469.333334a64 64 0 0 1-64 64h-597.333333a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64h597.333333z m0 64h-597.333333v469.333334h597.333333V277.333333zM746.666667 371.114667v63.957333c-100.608-1.450667-163.306667 30.293333-193.493334 94.229333l-2.304 5.12-2.858666 6.357334c-44.010667 95.146667-129.088 142.464-249.322667 140.842666v-64c96.234667 1.6 157.930667-32.384 190.933333-103.04l2.538667-5.632 2.624-5.845333c41.664-89.664 127.488-133.333333 251.882667-131.989333z m-397.696-17.237334a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z"></path></symbol><symbol id="icon-social" viewBox="0 0 1024 1024"><path d="M617.216 170.666667c114.24 0 206.869333 92.608 206.869333 206.869333 0 72.533333-37.333333 136.32-93.802666 173.269333l168.746666 196.885334A64 64 0 0 1 850.432 853.333333l-101.888 0.021334c11.221333-19.413333 14.293333-42.496 8.746667-64L850.432 789.333333 634.24 537.109333l60.992-39.872a142.869333 142.869333 0 0 0-75.584-262.549333 251.264 251.264 0 0 0-55.424-57.173333A206.976 206.976 0 0 1 617.216 170.666667z m-61.162667 412.757333l140.8 164.266667A64 64 0 0 1 648.213333 853.333333H181.824a64 64 0 0 1-48.597333-105.642666l140.8-164.266667c18.026667 12.373333 37.76 22.442667 58.773333 29.781333L181.824 789.333333h466.410667l-150.997334-176.128c21.034667-7.338667 40.768-17.386667 58.816-29.781333zM415.04 170.666667c114.24 0 206.869333 92.608 206.869333 206.869333 0 114.24-92.629333 206.869333-206.869333 206.869333-114.261333 0-206.869333-92.629333-206.869333-206.869333C208.170667 263.274667 300.778667 170.666667 415.04 170.666667z m0 64a142.869333 142.869333 0 1 0 0 285.738666 142.869333 142.869333 0 0 0 0-285.738666z"></path></symbol><symbol id="icon-news" viewBox="0 0 1024 1024"><path d="M640 170.666667a64 64 0 0 1 64 64v490.666666h-64V234.666667H213.333333v554.666666h597.333334V362.666667h-64v-64h64a64 64 0 0 1 64 64v426.666666a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V234.666667a64 64 0 0 1 64-64h426.666667z m-192 320v64h-170.666667v-64h170.666667z m128-128v64H277.333333v-64h298.666667z"></path></symbol><symbol id="icon-knowledge" viewBox="0 0 1024 1024"><path d="M168.106667 621.44l120.746666 57.962667 223.274667 108.138666 215.317333-104.32 128.768-61.674666a64 64 0 0 1-29.952 84.970666l-286.229333 138.624a64 64 0 0 1-55.808 0L197.994667 706.517333A64 64 0 0 1 168.106667 621.44z m687.829333-133.930667a64 64 0 0 1-29.674667 85.546667L540.010667 711.68a64 64 0 0 1-55.808 0L197.994667 573.056A64 64 0 0 1 166.826667 490.88l317.013333 149.525333 28.288 13.696 286.229333-138.624-0.149333-0.064 57.728-27.882666zM540.032 185.792l286.208 138.602667a64 64 0 0 1 0 115.2l-286.208 138.624a64 64 0 0 1-55.808 0L197.994667 439.594667a64 64 0 0 1 0-115.2L484.224 185.813333a64 64 0 0 1 55.808 0z m-27.904 57.6l-286.229333 138.602667 286.229333 138.624 286.229333-138.624-286.229333-138.602667z"></path></symbol><symbol id="icon-music" viewBox="0 0 1024 1024"><path d="M515.562667 232.91733299c159.061333 0 288 128.938667 288 288v22.250667A85.354667 85.354667 0 0 1 874.666667 627.30666699v93.994666a85.333333 85.333333 0 0 1-85.333334 85.333334h-116.138666V541.97333299h66.346666v-21.056c0-121.685333-97.002667-220.693333-217.92-223.914666l-6.058666-0.085334h-7.125334c-123.712 0-224 100.288-224 224v21.056h66.368v264.661334H234.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-93.994666a85.354667 85.354667 0 0 1 71.104-84.138667v-22.250667c0-159.061333 128.938667-288 288-288z m27.52 313.813334v256h-62.165334v-256h62.165334z m103.616 42.666666v192H584.533333v-192h62.165334z m-207.232 0v192h-62.165334v-192H439.466667z m-152.661334 16.576H234.666667a21.333333 21.333333 0 0 0-21.333334 21.333334v93.994666a21.333333 21.333333 0 0 0 21.333334 21.333334h52.138666v-136.661334z m502.528 0h-52.138666v136.661334H789.333333a21.333333 21.333333 0 0 0 21.333334-21.333334v-93.994666a21.333333 21.333333 0 0 0-21.333334-21.333334z"></path></symbol><symbol id="icon-translate" viewBox="0 0 1024 1024"><path d="M874.666667 192.00000033v64h-42.666667v426.666666c0 35.349333-30.72 64-68.565333 64h-149.354667l113.749333 128h-85.632l-113.770666-128h-11.562667l-113.749333 128h-85.610667l113.728-128h-170.666667C222.72 746.66666633 192 718.01600033 192 682.66666633V256.00000033H149.333333V192.00000033h725.333334z m-106.666667 64H256v426.666666h512V256.00000033zM405.333333 490.66666633v64h-64v-64h64z m277.333334 0v64H448v-64h234.666667z m0-106.666666v64H448v-64h234.666667z m-277.333334 0v64h-64v-64h64z"></path></symbol><symbol id="icon-video" viewBox="0 0 1024 1024"><path d="M658.069333 234.66666667a64 64 0 0 1 64 64l-0.021333 33.664 49.28-38.4A64 64 0 0 1 874.666667 344.44799967v338.368a64 64 0 0 1-103.338667 50.474667l-49.28-38.4v26.496a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V298.66666667a64 64 0 0 1 64-64h444.736z m0 64H213.333333v422.698667h444.736l-0.128-157.589334L810.666667 682.79466667V344.42666667l-152.704 118.933333 0.106666-164.693333zM384 375.97866667a42.666667 42.666667 0 0 1 22.741333 6.570667l133.866667 84.330666a42.666667 42.666667 0 0 1 0.32 72l-133.866667 86.016A42.666667 42.666667 0 0 1 341.333333 588.99199967v-170.346666a42.666667 42.666667 0 0 1 42.666667-42.666667z m21.333333 81.322667v92.629333l72.789334-46.762667L405.333333 457.30133367z"></path></symbol><symbol id="icon-search" viewBox="0 0 1024 1024"><path d="M469.333 192c153.174 0 277.334 124.16 277.334 277.333 0 68.054-24.534 130.411-65.216 178.688L846.336 818.24l-48.341 49.877L630.4 695.125a276.053 276.053 0 0 1-161.067 51.542C316.16 746.667 192 622.507 192 469.333S316.16 192 469.333 192z m0 64C351.51 256 256 351.51 256 469.333s95.51 213.334 213.333 213.334 213.334-95.51 213.334-213.334S587.157 256 469.333 256z"></path></symbol><symbol id="icon-more" viewBox="0 0 1024 1024"><path d="M437.333333 224C437.333333 183.466667 471.466667 149.333333 512 149.333333s74.666667 34.133333 74.666667 74.666667S552.533333 298.666667 512 298.666667s-74.666667-34.133333-74.666667-74.666667zM439.466667 512c0-40.533333 34.133333-74.666667 74.666666-74.666667s74.666667 34.133333 74.666667 74.666667-34.133333 74.666667-74.666667 74.666667-74.666667-34.133333-74.666666-74.666667zM437.333333 800c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667S552.533333 874.666667 512 874.666667s-74.666667-34.133333-74.666667-74.666667z"></path></symbol><symbol id="icon-scholar" viewBox="0 0 1024 1024"><path d="M306.28571469 698.19428562l205.71428531 102.85714313 205.71428531-102.85714312v-194.97142875l68.57142938-32.61714282v227.58857157a68.57142844 68.57142844 0 0 1-37.89714281 61.32571406l-205.71428625 102.85714312a68.57142844 68.57142844 0 0 1-61.34857125 0l-205.71428626-102.85714312A68.57142844 68.57142844 0 0 1 237.71428531 698.19428562v-225.64571437l64.45714313 30.62857125-147.47428594-70.08a68.57142844 68.57142844 0 0 1-2.35428563-122.6971425L478.17142812 139.95428562a68.57142844 68.57142844 0 0 1 63.56571469 0l325.80571406 170.44571438A68.57142844 68.57142844 0 0 1 900.57142812 393.41714281L900.57142812 626.28571437h-68.57142843v-177.43999968l-292.6171425 139.15428562a68.57142844 68.57142844 0 0 1-58.90285688 0L306.28571469 505.14285687 306.28571469 698.19428562z m203.65714218-497.46285749L184.11428563 371.15428531l325.78285687 154.90285781 325.805715-154.90285781-325.805715-170.42285719z"></path></symbol>', 14)
    ])]);
  }
  const iconfont = _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
  const _sfc_main$3 = vue.defineComponent({
    __name: "selection-bar",
    emits: ["open-dialog"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
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
      vue.computed(() => {
        if (selection.value.length > 12) {
          return `${selection.value.substr(0, 12)}...`;
        } else {
          return selection.value;
        }
      });
      function getSelectionText() {
        var _a;
        return ((_a = window.getSelection()) == null ? void 0 : _a.toString().trim()) || "";
      }
      function getSelectionRect() {
        const selection2 = window.getSelection();
        if (selection2 && selection2.rangeCount) {
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
      let selectStart = false;
      function changeVisible(val) {
        visible2.value = val;
        vue.nextTick(() => {
          if (!val) {
            return;
          }
          const toolbarEleValue = vue.unref(toolbarEle);
          if (!toolbarEleValue) {
            return;
          }
          const toolbarClientRect = toolbarEleValue.getBoundingClientRect();
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
          selection.value = getSelectionText();
          changeVisible(!!selection.value && selectStart);
        } else if (!isToolbar) {
          selection.value = "";
        } else if (isToolbar) {
          changeVisible(false);
        }
        selectStart = false;
      }, true);
      document.addEventListener("selectstart", function() {
        selectStart = true;
      }, false);
      function handleClick(item, newWin) {
        const keyword = selection.value;
        const url = item.url.replace("%s", keyword);
        if (newWin) {
          window.open(url);
        } else {
          window.location.href = url;
        }
      }
      function openMainDialog() {
        emit("open-dialog", selection.value);
      }
      return (_ctx, _cache) => {
        return vue.unref(toolbarVisible) === 1 ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "bar-container",
          ref_key: "toolbarEle",
          ref: toolbarEle,
          style: vue.normalizeStyle(style.value)
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(list2), (item, i) => {
            return vue.openBlock(), vue.createBlock(_sfc_main$e, {
              class: "tool-bar-item",
              key: i,
              url: item.url,
              title: item.nameZh,
              onClick: [
                vue.withModifiers(($event) => handleClick(item, true), ["exact"]),
                vue.withModifiers(($event) => handleClick(item, false), ["ctrl", "exact"])
              ],
              onMouseup: vue.withModifiers(($event) => handleClick(item, false), ["middle", "exact"])
            }, null, 8, ["url", "title", "onClick", "onMouseup"]);
          }), 128)),
          vue.createElementVNode("div", {
            class: "tool-bar-item",
            onClick: openMainDialog
          }, [
            vue.createVNode(_sfc_main$f, {
              class: "as-more-icon",
              name: "more"
            })
          ])
        ], 4)), [
          [vue.vShow, visible2.value]
        ]) : vue.createCommentVNode("", true);
      };
    }
  });
  const selectionBar = _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a121b06b"]]);
  const _hoisted_1$1 = { class: "as-dialog" };
  const _hoisted_2$1 = { class: "as-dialog__header" };
  const _hoisted_3$1 = { class: "as-dialog__body" };
  const _sfc_main$2 = vue.defineComponent({
    __name: "dialog",
    props: {
      visible: { type: Boolean },
      title: {},
      width: {}
    },
    emits: ["update:visible"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const style = vue.computed(() => {
        const obj2 = {};
        if (props.width) {
          obj2.width = props.width;
        }
        return obj2;
      });
      const localVisible = vue.computed({
        get: () => !!props.visible,
        set: (value2) => {
          emit("update:visible", value2);
        }
      });
      const handleClose = () => {
        localVisible.value = false;
      };
      return (_ctx, _cache) => {
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
          vue.createElementVNode("div", {
            class: "as-dialog-container",
            style: vue.normalizeStyle(style.value)
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
            onClick: handleClose
          })
        ], 512)), [
          [vue.vShow, localVisible.value]
        ]);
      };
    }
  });
  const _hoisted_1 = { class: "se-header" };
  const _hoisted_2 = { class: "se-input-box" };
  const _hoisted_3 = { class: "se-container" };
  const _hoisted_4 = { class: "cate-name" };
  const _hoisted_5 = ["textContent"];
  const _hoisted_6 = { class: "cate-list" };
  const _hoisted_7 = ["onClick", "onMouseup"];
  const _hoisted_8 = ["textContent"];
  const _sfc_main$1 = vue.defineComponent({
    __name: "search-dialog",
    props: {
      visible: { type: Boolean, default: false },
      keyword: { default: "" }
    },
    emits: ["update:visible"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const localVisible = vue.computed({
        get: () => !!props.visible,
        set: (value2) => {
          emit("update:visible", value2);
        }
      });
      vue.watch(() => props.visible, (val) => {
        inputValue.value = val ? String(props.keyword) : "";
      });
      const inputValue = vue.ref("");
      const { sites: sites2 } = useSites();
      const handleClick = (item, newWin) => {
        const keyword = inputValue.value;
        const url = item.url.replace("%s", keyword);
        if (newWin) {
          window.open(url);
        } else {
          window.location.href = url;
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(_sfc_main$2, {
          visible: localVisible.value,
          "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => localVisible.value = $event)
        }, {
          header: vue.withCtx(() => [
            vue.createElementVNode("div", _hoisted_1, [
              vue.createElementVNode("div", _hoisted_2, [
                localVisible.value ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                  key: 0,
                  autofocus: "",
                  autocomplete: "off",
                  class: "se-input",
                  placeholder: "输入并搜索",
                  type: "text",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event)
                }, null, 512)), [
                  [vue.vModelText, inputValue.value]
                ]) : vue.createCommentVNode("", true)
              ])
            ])
          ]),
          default: vue.withCtx(() => [
            vue.createVNode(vue.unref(scrollbar), {
              class: "se-scrollbar-container",
              noresize: ""
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("div", _hoisted_3, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(sites2), (item) => {
                    return vue.openBlock(), vue.createElementBlock("div", {
                      key: item.name,
                      class: "cate-container"
                    }, [
                      vue.createElementVNode("p", _hoisted_4, [
                        vue.createVNode(_sfc_main$f, {
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
                                vue.withModifiers(($event) => handleClick(child, false), ["exact"]),
                                vue.withModifiers(($event) => handleClick(child, true), ["ctrl", "exact"])
                              ],
                              onMouseup: vue.withModifiers(($event) => handleClick(child, true), ["middle", "exact"])
                            }, [
                              vue.createVNode(_sfc_main$e, {
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
      };
    }
  });
  const _sfc_main = vue.defineComponent({
    __name: "index",
    setup(__props) {
      const {
        disabled,
        mode,
        classList,
        visible: visible2,
        dialogVisible,
        openDialog,
        keyword,
        toolbarVisible,
        direction: direction2
      } = useApp();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          !vue.unref(disabled) && vue.unref(mode) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.withDirectives(vue.createElementVNode("div", {
              style: { "opacity": "0" },
              class: vue.normalizeClass(["as-container", vue.unref(classList)])
            }, [
              vue.createVNode(_sfc_main$j, { direction: vue.unref(direction2) }, null, 8, ["direction"]),
              vue.createVNode(_sfc_main$c, {
                direction: vue.unref(direction2),
                mode: vue.unref(mode)
              }, null, 8, ["direction", "mode"]),
              vue.createVNode(_sfc_main$6)
            ], 2), [
              [vue.vShow, vue.unref(visible2)]
            ]),
            vue.withDirectives(vue.createVNode(hoverBtn, null, null, 512), [
              [vue.vShow, vue.unref(visible2)]
            ])
          ], 64)) : vue.createCommentVNode("", true),
          vue.unref(toolbarVisible) === 1 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createVNode(selectionBar, { onOpenDialog: vue.unref(openDialog) }, null, 8, ["onOpenDialog"]),
            vue.createVNode(_sfc_main$1, {
              keyword: vue.unref(keyword),
              visible: vue.unref(dialogVisible),
              "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => vue.isRef(dialogVisible) ? dialogVisible.value = $event : null)
            }, null, 8, ["keyword", "visible"])
          ], 64)) : vue.createCommentVNode("", true),
          !vue.unref(disabled) || vue.unref(toolbarVisible) === 1 ? (vue.openBlock(), vue.createBlock(iconfont, { key: 2 })) : vue.createCommentVNode("", true)
        ], 64);
      };
    }
  });
  function init() {
    return __async(this, null, function* () {
      initTmMethods();
      const anchor = yield initAppAnchor();
      if (!anchor.__vue_app__) {
        const app = vue.createApp(_sfc_main);
        app.mount(anchor);
      }
    });
  }
  init();

})(Vue);