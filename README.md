![all-search](https://socialify.git.ci/all-search/all-search/image?description=1&font=Inter&forks=1&issues=1&language=1&owner=1&pattern=Plus&stargazers=1&theme=Light)

[English](./README.md) | [简体中文](./README.zh-CN.md)
## all-search, a search engine jump menu

A top fixed menu that allows you to easily jump between search engines, based on vue3 and built using rollup.

Thanks to searchEngineJump for the idea and URL source.
Similar tools recommended.
[searchJumper Most powerful, Swiss army knife](https://greasyfork.org/zh-CN/scripts/445274-searchjumper)
[searchEngineJump Search engine quick jump Most users](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump)

#### Any needs, suggestions, question directly to Issues.<br>Doing this script is purely a personal interest, using love to generate electricity.<br>It's not easy to open source, so please encourage me, if you think it's good, go to GitHub and give it a ⭐ Star, or share it with people around you.

## Script URL
The difference between Tampermonkey's and ScriptCat's scripts has been smoothed out
* [GitHub URL](https://raw.github.com/all-search/all-search/release/index.user.js)
* [iQDNS/iQZone URL](https://raw.iqiq.io/all-search/all-search/release/index.user.js)
* [KGitHub URL](https://raw.kgithub.com/all-search/all-search/release/index.user.js)

### greasyFork
* [greasyfork URL](https://greasyfork.org/zh-CN/scripts/397993-all-search)

### ScriptCat
* [ScriptCat ScriptCat URL](https://scriptcat.org/script-show-page/477)

## Set page
* [code cloud](https://endday.gitee.io/all-search/)
* [github](https://all-search.github.io/script/)

## Features
* [GUI Add URL](https://all-search.github.io/script/)
* Drag to change category sorting
* Support vertical and horizontal layout
* Click on a category to use the first URL of the category to open it
* Middle mouse button click on the URL to open a new window (you can also use ctrl+right click)
* Provide mobile support
  * Scrolling is possible if the page width is insufficient
  * Mobile for click-triggered menu
* Auto-hide function, triggered by button, can also be changed to scroll up or down to trigger hide
* Auto-loading support for newly added URLs (i.e., those added by the user, can be displayed automatically)
* Adaptive style, no additional adaptations required
* Text selection toolbar
* Global pop-up search

## Todo list
* English support
* Shortcut open global pop-up search (TBD)
* Google Pluginization (TBD)

## Compatibility and Performance
* For Baidu style issues, instead of using performance-depleting timers, use hijacked Node.prototype.removeChild to achieve
* Listening for route switching for youtube's spf.js
* no compatibility issues with AC-baidu and other mainstream Tampermonkey scripts

## Contribute

#### Local development
Setup page
```
npm run serve
```

script
```
npm run tmDev
```
After running, copy the index.dev.js from the build directory to Tampermonkey or another script manager.

tmDev uses watch and will automatically rebuild every time it is modified. There is no code inside the index.dev.js file, but rather require references the local file index.user.js, so remember to enable Tampermonkey's file access rights

#### build scripts
The version number of the script references the version number in package.json, remember to modify
```
npm run tmBuild
```
will package out the index.user.js used by Tampermonkey

#### Feedback and communication
[Tencent Channel](https://pd.qq.com/s/2bmefcl98)

Channel No. pd15449687
