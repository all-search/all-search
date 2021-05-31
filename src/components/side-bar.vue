<template>
  <div
    class="as-setting"
    @click="open">
    设置
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
              设置
            </header>
            <section>
              <form-item label="方向">
                <as-radio
                  label="horizontal"
                  v-model="mode"
                  @change="changeMode">横向
                </as-radio>
                <as-radio
                  label="vertical"
                  v-model="mode"
                  @change="changeMode">竖向
                </as-radio>
              </form-item>
              <form-item label="对齐">
                <as-radio
                  v-for="[key, value] in alignList"
                  :key="key"
                  :label="key"
                  v-model="align"
                  @change="changeAlign">
                  {{ value }}
                </as-radio>
              </form-item>
              <form-item label="主题色">
                <color
                  v-model="primaryColor"
                  @change="changePrimaryColor"/>
              </form-item>
              <form-item label="背景色">
                <color
                  v-model="bgColor"
                  @change="changeBgColor"/>
              </form-item>
            </section>
            <footer>
              <a class="link"
                 title="all-search"
                 href="https://endday.github.io/all-search/"
                 target="_blank">
                设置页
              </a>
              <a class="link"
                 title="github"
                 href="https://github.com/endday/all-search"
                 target="_blank">
                GitHub地址
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
import useMode from '../components/useMode.js'
import useAlign from '../components/align.js'
import useColor from '../components/useColor.js'
import overlay from '../components/overlay.vue'
import radio from '../components/radio.vue'
import formItem from '../components/form-item.vue'
import color from '../components/color.vue'

export default {
  name: 'side-bar',
  components: {
    overlay,
    asRadio: radio,
    formItem,
    color
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
    const {
      primaryColor,
      bgColor,
      changeBgColor,
      changePrimaryColor
    } = useColor()

    const changeMode = (e) => {
      mode.value = e.target.value
    }

    const changeAlign = e => {
      align.value = e.target.value
    }

    return {
      mode,
      visible,
      open,
      onMaskClick,
      changeMode,
      alignList,
      align,
      changeAlign,
      primaryColor,
      bgColor,
      changePrimaryColor,
      changeBgColor,
    }
  }
}

</script>

<style lang="scss">
  @import "../assets/common.scss";

  .as-side-bar {
    width: 20vw;
    min-width: 300px;
    right: 0;
    height: 100%;
    top: 0;
    bottom: 0;
    position: absolute;
    box-sizing: border-box;
    background-color: var(--as-bg-color);
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
    overflow: hidden;
    > header {
      font-size: 16px;
      align-items: center;
      color: var(--as-primary-text-color);
      display: flex;
      margin-bottom: 32px;
      padding: 20px 24px 0;
    }
    > section {
      padding: 10px 24px;
      height: 100%;
      flex: 1;
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
