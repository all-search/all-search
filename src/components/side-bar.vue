<template>
  <div class="as-setting" :class="mode">
    <div
      class="as-setting-btn"
      @click="show = false">
      收起
    </div>
    <div
      class="as-setting-btn"
      @click="open">
      设置
    </div>
  </div>
  <teleport to="#all-search">
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
              <form-item label="工具栏">
                <as-radio
                  :label="1"
                  v-model="toolbar">显示
                </as-radio>
                <as-radio
                  :label="2"
                  v-model="toolbar">隐藏
                </as-radio>
              </form-item>
              <form-item label="方向">
                <as-radio
                  label="horizontal"
                  v-model="mode">横向
                </as-radio>
                <as-radio
                  label="vertical"
                  v-model="mode">竖向
                </as-radio>
              </form-item>
              <form-item label="对齐">
                <as-radio
                  v-for="[key, value] in alignList"
                  :key="key"
                  :label="key"
                  v-model="align">
                  {{ value }}
                </as-radio>
              </form-item>
              <form-item label="滚动隐藏">
                <as-radio
                  v-for="[key, value] in options"
                  :key="key"
                  :label="key"
                  v-model="scrollHide">
                  {{ value }}
                </as-radio>
              </form-item>
              <form-item label="图标">
                <as-radio
                  :label="1"
                  v-model="favicon">显示
                </as-radio>
                <as-radio
                  :label="2"
                  v-model="favicon">隐藏
                </as-radio>
              </form-item>
              <form-item label="主题色">
                <color
                  name="primaryColor"
                  v-model="primaryColor"/>
              </form-item>
              <form-item label="文字色">
                <color
                  name="primaryTextColor"
                  v-model="primaryTextColor"/>
              </form-item>
              <form-item label="图标缓存">
                <as-button
                  type="text"
                  @click="clearIconCache">
                  清除
                </as-button>
              </form-item>
              <form-item label="重置网址">
                <as-button
                  type="text"
                  @click="resetSites">
                  重置
                </as-button>
              </form-item>
            </section>
            <footer>
              <a class="link"
                 title="菜单设置页"
                 href="https://all-search.github.io/all-search/config/sites"
                 target="_blank">
                菜单设置
              </a>
              <a class="link"
                 title="工具栏设置页"
                 href="https://all-search.github.io/all-search/config/toolbar"
                 target="_blank">
                工具栏设置
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

<script>
import { ref } from 'vue'
import { delSession } from '../util'
import useMode from '../components/useMode'
import useAlign from './useAlign'
import useSwitchShow from '../components/useSwitchShow'
import useColor from '../components/useColor'
import useFavicon from './useFavicon'
import useToolbar from './useToolbar'
import overlay from '../components/overlay'
import radio from '../components/radio'
import formItem from '../components/form-item'
import color from '../components/color'
import button from '../components/button'

export default {
  name: 'side-bar',
  components: {
    overlay,
    asRadio: radio,
    formItem,
    color,
    asButton: button
  },
  setup () {
    const visible = ref(false)
    const open = () => {
      visible.value = true
    }
    const onMaskClick = () => {
      visible.value = false
    }

    const { mode } = useMode()
    const { alignList, align } = useAlign()
    const { primaryColor, primaryTextColor } = useColor()
    const { show, options, scrollHide } = useSwitchShow()
    const { favicon } = useFavicon()
    const { toolbar } = useToolbar()
    function clearIconCache () {
      if (window.confirm('确认要清除图标的缓存吗', )) {
        delSession('iconCache')
      }
    }

    function resetSites () {
      if (window.confirm('确认要重置所有网址吗', )) {
        delSession('sites')
      }
    }

    return {
      mode,
      visible,
      open,
      onMaskClick,
      alignList,
      align,
      favicon,
      toolbar,
      primaryColor,
      primaryTextColor,
      show,
      options,
      scrollHide,
      clearIconCache,
      resetSites
    }
  }
}

</script>

<style lang="scss">
@import "../assets/common.scss";

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
    border: 1px solid rgba(0,0,0,.1);
    background: rgba(255,255,255,.67);
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
