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
                  @change="changeMode">
                  横向
                </as-radio>
                <as-radio
                  label="vertical"
                  v-model="mode"
                  @change="changeMode">
                  竖向
                </as-radio>
              </form-item>
            </section>
            <footer>

            </footer>
          </div>
        </transition>
      </overlay>
    </transition>
  </teleport>
</template>

<script>
import { ref } from 'vue'
import { mode } from '../components/mode.js'
import overlay from '../components/overlay'
import radio from '../components/radio'
import formItem from '../components/form-item'

export default {
  name: 'side-bar',
  components: {
    overlay,
    asRadio: radio,
    formItem
  },
  setup () {
    const visible = ref(false)
    const open = () => {
      visible.value = true
    }
    const onMaskClick = () => {
      visible.value = false
    }

    const changeMode = (e) => {
      mode.value = e.target.value
    }
    return {
      mode,
      visible,
      open,
      onMaskClick,
      changeMode
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
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
    overflow: hidden;
    > header {
      align-items: center;
      color: $color;
      display: flex;
      margin-bottom: 32px;
      padding: 20px 20px 0;
    }
    > section {
      padding: 10px 20px;
      height: 100%;
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
