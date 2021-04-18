<template>
  <div
    class="as-setting"
    @click="open">
    设置
  </div>
  <teleport to="html">
    <transition name="overlay-fade" appear>
      <overlay
        v-show="visible"
        @click="onMaskClick">
        <transition name="drawer" appear>
          <div
            v-show="visible"
            aria-modal="true"
            role="dialog"
            class="as-side-bar"
            :class="{open: visible}"
            @click.stop>
            <header></header>
            <section></section>
          </div>
        </transition>
      </overlay>
    </transition>
  </teleport>
</template>

<script>
import { ref } from 'vue'
import overlay from '../components/overlay'

export default {
  name: 'side-bar',
  components: {
    overlay
  },
  setup () {
    const visible = ref(false)
    const open = () => {
      visible.value = true
    }
    const onMaskClick = () => {
      visible.value = false
    }
    return {
      visible,
      open,
      onMaskClick
    }
  }
}

</script>

<style lang="scss">
  @import "../../assets/common.scss";

  .as-side-bar {
    width: 30%;
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
  }

  .as-side-bar.open {
    /*animation: rtl-drawer-in .9s;*/
  }

  .overlay-fade-enter-active, .overlay-fade-leave-active {
    transition: opacity .5s;
    > .as-side-bar {
      opacity: 1;
    }
  }

  .overlay-fade-enter-from, .overlay-fade-leave-to {
    opacity: 0;
  }

  .drawer-enter-active, .drawer-leave-active {
    transition: transform .5s;
  }

  .drawer-enter-from, .drawer-leave-to {
    transform: translate(100%);
  }
</style>
