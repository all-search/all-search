<script setup lang="ts">
import { ref } from 'vue'
import useMode from './useMode'
import useAlign from './useAlign'
import useSwitchShow from './useSwitchShow'
import useColor from './useColor'
import useFavicon from './useFavicon'
import useToolbar from './useToolbar'
import useSites from './useSites'
import overlay from './overlay.vue'
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
const { list: alignList, value: align } = useAlign()
const { primaryColor, primaryTextColor } = useColor()
const { show, options, scrollHide } = useSwitchShow()
const { favicon, clearIconCache } = useFavicon()
const { visible: toolbarVisible } = useToolbar()
const { resetSites } = useSites('tm')

import { getAsMountAnchor } from '@src/util'

const teleportTarget = getAsMountAnchor()

const hide = () => {
  show.value = 2
}

function changeScrollHide (e: any) {
  if (e.target.value === 'none') {
    show.value = 1
  } else {
    show.value = 2
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
                 href="https://all-search.github.io/all-search/config/sites"
                 target="_blank">
                菜单设置
              </a>
              <a class="link"
                 title="划词工具栏设置页"
                 href="https://all-search.github.io/all-search/config/toolbar"
                 target="_blank">
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

</style>

