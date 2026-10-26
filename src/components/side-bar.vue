<script setup lang="ts">
import { ref } from 'vue'
import useMode from './useMode'
import useAlign from './useAlign'
import useOpenMode from './useOpenMode'
import useSwitchShow, { SHOW_STATUS } from './useSwitchShow'
import useColor from './useColor'
import useFavicon from './useFavicon'
import useToolbar from './useToolbar'
import useSites from './useSites'
import overlay from './overlay.vue'
import openModeTip from './open-mode-tip.vue'
import asRadio from './radio.vue'
import formItem from './form-item.vue'
import color from './color.vue'
import asButton from './button.vue'

const visible = ref(false)
const open = () => {
  visible.value = true
}
const onMaskClick = () => {
  visible.value = false
}

const { value: mode, direction } = useMode()
const { menuOpenMode, selectionOpenMode, openAllInCategory } = useOpenMode()
const { list: alignList, value: align } = useAlign()
const { primaryColor, primaryTextColor } = useColor()
const { show, options, scrollHide } = useSwitchShow()
const { favicon, clearIconCache } = useFavicon()
const { visible: toolbarVisible } = useToolbar()
const { resetSites } = useSites('tm')

import { getAsMountAnchor } from '@src/util'
import { isPlugin } from '@src/env'

const teleportTarget = getAsMountAnchor()

/**
 * 设置页地址：
 * - 浏览器插件：请求后台打开扩展自己的 options 页（hash 路由，刷新不会 404）
 * - 油猴/网页版：仍指向在线配置站
 */
function settingsUrl (route: string): string {
  return `https://all-search.github.io/all-search${route}`
}

function openSettingsPage (event: MouseEvent, route: string): void {
  if (!isPlugin) return
  const runtime = (globalThis as any).chrome?.runtime
  if (!runtime || typeof runtime.sendMessage !== 'function') return
  // 网页直接跳 chrome-extension:// 会被浏览器拦截，交给后台 tabs.create
  event.preventDefault()
  runtime.sendMessage({ type: 'all-search:open-options', route })
}

const menuSettingsUrl = settingsUrl('/config/sites')
const toolbarSettingsUrl = settingsUrl('/config/toolbar')

const hide = () => {
  show.value = SHOW_STATUS.COLLAPSED
}

function changeScrollHide (e: any) {
  if (e.target.value === 'none') {
    show.value = SHOW_STATUS.VISIBLE
  } else {
    show.value = SHOW_STATUS.COLLAPSED
  }
}
</script>

<template>
  <div
    class="as-setting"
    :class="direction">
    <div
      class="as-setting-btn"
      @click="hide">
      收起
    </div>
    <div
      class="as-setting-btn"
      @click="open">
      设置
    </div>
  </div>
  <teleport v-if="teleportTarget" :to="teleportTarget">
    <transition name="overlay" appear>
      <overlay
        v-show="visible"
        @click="onMaskClick">
        <transition name="drawer" appear>
          <div
            v-show="visible"
            aria-modal="true"
            role="dialog"
            class="as-side-bar"
            @click.stop>
            <header class="header">
              全搜 all-search
            </header>
            <section>
              <formItem
                label-width="84"
                label="划词工具栏">
                <asRadio
                  :label="1"
                  v-model="toolbarVisible">显示
                </asRadio>
                <asRadio
                  :label="2"
                  v-model="toolbarVisible">隐藏
                </asRadio>
              </formItem>
              <formItem label="方向">
                <asRadio
                  label="top"
                  v-model="mode">居顶
                </asRadio>
                <asRadio
                  label="bottom"
                  v-model="mode">居底
                </asRadio>
                <asRadio
                  label="left"
                  v-model="mode">居左
                </asRadio>
                <asRadio
                  label="right"
                  v-model="mode">居右
                </asRadio>
              </formItem>
              <p class="as-group-title">点击打开方式</p>
              <formItem label="主菜单" label-width="64">
                <asRadio
                  label="same"
                  v-model="menuOpenMode">当前页
                </asRadio>
                <asRadio
                  label="new"
                  v-model="menuOpenMode">新标签页
                </asRadio>
              </formItem>
              <formItem label="划词" label-width="64">
                <asRadio
                  label="same"
                  v-model="selectionOpenMode">当前页
                </asRadio>
                <asRadio
                  label="new"
                  v-model="selectionOpenMode">新标签页
                </asRadio>
              </formItem>
              <formItem label="分类全开" label-width="64">
                <asRadio
                  :label="false"
                  v-model="openAllInCategory">关闭
                </asRadio>
                <asRadio
                  :label="true"
                  v-model="openAllInCategory">开启
                </asRadio>
              </formItem>
              <openModeTip/>
              <formItem label="对齐">
                <asRadio
                  v-for="[key, value] in alignList"
                  :key="key"
                  :label="key"
                  v-model="align">
                  {{ value }}
                </asRadio>
              </formItem>
              <formItem label="滚动隐藏">
                <asRadio
                  v-for="[key, value] in options"
                  :key="key"
                  :label="key"
                  v-model="scrollHide"
                  @change="changeScrollHide">
                  {{ value }}
                </asRadio>
              </formItem>
              <formItem label="图标">
                <asRadio
                  :label="1"
                  v-model="favicon">显示
                </asRadio>
                <asRadio
                  :label="2"
                  v-model="favicon">隐藏
                </asRadio>
              </formItem>
              <formItem label="主题色">
                <color
                  name="primaryColor"
                  v-model="primaryColor"/>
              </formItem>
              <formItem label="文字色">
                <color
                  name="primaryTextColor"
                  v-model="primaryTextColor"/>
              </formItem>
              <formItem label="图标缓存">
                <asButton
                  type="text"
                  @click="clearIconCache">
                  清除
                </asButton>
              </formItem>
              <formItem label="重置网址">
                <asButton
                  type="text"
                  @click="resetSites">
                  重置
                </asButton>
              </formItem>
            </section>
            <footer>
              <a class="link"
                 title="菜单设置页"
                 :href="menuSettingsUrl"
                 target="_blank"
                 @click="openSettingsPage($event, '/config/sites')">
                菜单设置
              </a>
              <a class="link"
                 title="划词工具栏设置页"
                 :href="toolbarSettingsUrl"
                 target="_blank"
                 @click="openSettingsPage($event, '/config/toolbar')">
                划词工具栏设置
              </a>
              <a class="link"
                 title="github"
                 href="https://github.com/all-search/all-search/issues"
                 target="_blank">
                反馈
              </a>
            </footer>
          </div>
        </transition>
      </overlay>
    </transition>
  </teleport>
</template>

<style lang="scss">
@use "../assets/common" as *;

.as-setting {
  position: relative;

  &.horizontal {
    box-shadow: -4px 0 10px 0 rgb(0 0 0 / 12%);
    display: flex;
  }
}


.as-setting-btn {
  line-height: $height;
  padding: 0 14px;
  position: relative;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  font-size: 14px;
  color: var(--as-primary-text-color);
  text-align: center;

  &:hover {
    color: var(--as-primary-color);
    background-color: rgba(0, 0, 0, .04);
  }
}

/* 交互说明文案（主菜单 / 划词 打开方式） */
.as-group-title {
  margin: 8px 0 2px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .3px;
  color: var(--as-primary-text-color);
  opacity: .6;
}

.as-side-bar {
  width: 20vw;
  min-width: 300px;
  right: 0;
  height: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  background: var(--as-bg-color) radial-gradient(#eff4f9 75%, #f3f3f3 100%) no-repeat fixed;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
  overflow: hidden;

  > header {
    font-size: 16px;
    align-items: center;
    color: var(--as-primary-text-color);
    display: flex;
    padding: 32px 24px;
  }

  > section {
    padding: 10px 24px;
    margin: 0 12px;
    height: 100%;
    flex: 1;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: rgba(255, 255, 255, .67);
  }

  > footer {
    padding: 10px 24px 30px;

    .link {
      font-size: 14px;
      text-decoration: none;

      &:visited {
        color: var(--as-primary-text-color);
      }
    }

    .link + .link {
      margin-left: 20px;
    }
  }
}

.overlay-enter-active, .overlay-leave-active {
  transition: opacity .3s;
}

.overlay-enter-from, .overlay-leave-to {
  opacity: 0;
}

.overlay-enter-active .as-side-bar {
  animation: rtl-drawer-animation .3s linear reverse
}

.overlay-leave-active .as-side-bar {
  animation: rtl-drawer-animation .3s linear
}

@keyframes rtl-drawer-animation {
  0% {
    transform: translate(0)
  }

  to {
    transform: translate(100%)
  }
}

/* ------------------------------------------------------------------ *
 * 移动端：抽屉占满宽度、表单改成「标签在上、控件在下」、内容可滚动
 *
 * 原来 300px 宽的抽屉里再套 24px 内边距 + 80px 标签，控件只剩 ~150px：
 * 「划词工具栏」这种 5 字标签会折行，单选组被挤成 2×2，底部内容还会被裁掉。
 * ------------------------------------------------------------------ */
@media (max-width: 480px) {
  .as-side-bar {
    width: 100vw;
    min-width: 0;
    box-shadow: none;

    > header {
      padding: 14px 16px 6px;
      font-size: 15px;
    }

    > section {
      height: auto;
      margin: 0;
      padding: 4px 16px 16px;
      border: 0;
      background: transparent;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    > footer {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
      padding: 10px 16px 18px;
      border-top: 1px solid rgba(0, 0, 0, .06);

      .link + .link {
        margin-left: 0;
      }
    }
  }

  /* form-item 的标签宽度/内容缩进是内联样式，只能 !important 覆盖 */
  .as-side-bar .as-label {
    float: none;
    display: block;
    width: auto !important;
    padding: 10px 0 2px;
    line-height: 1.5;
    font-size: 13px;
    opacity: .72;
  }

  .as-side-bar .as-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 18px;
    margin-left: 0 !important;
    line-height: 1.9;
  }

  /* 单选 / 按钮给够手指可点高度 */
  .as-side-bar .as-radio {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
  }

  .as-side-bar .as-open-mode-tip {
    margin: 12px 0 4px;
    padding: 8px 10px;
    font-size: 11.5px;
    line-height: 1.7;
  }
}

</style>

