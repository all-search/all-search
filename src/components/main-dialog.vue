<template>
  <as-dialog
    v-model:visible="localVisible">
    <div class="se-input-box">
      <input
        autofocus
        autocomplete="off"
        class="se-input"
        placeholder="输入并搜索"
        type="text"
        v-model="inputValue"
      />
    </div>
    <div class="se-container">
      <div
        v-for="item in sites"
        :key="item.name"
        class="cate-container">
        <p class="cate-name">
          <icon :name="item.name"/>
          <span
            v-text="item.nameZh">
              </span>
        </p>
        <ul class="cate-list">
          <li v-for="(child, i) in item.list"
              :key="`${item.name}_${i}`"
              class="cate-item">
            <a href="javascript:void 0"
               @click.exact="handleClick(child)"
               @click.ctrl.exact="handleClick(child, true)"
               @click.middle.exact="handleClick(child, true)">
              <favicon
                class="as-url-icon"
                :url="child.url"
                :icon="child.icon"
              />
              <p class="as-subMenu-text"
                 v-text="child.nameZh">
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </as-dialog>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import asDialog from './dialog'
import icon from './icon'
import favicon from './favicon'
import { initSites } from '../util/sites'
import { selection } from './selection'

export default {
  name: 'main-dialog',
  components: {
    asDialog,
    icon,
    favicon
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup (props, ctx) {
    const localVisible = computed({
      get: () => props.visible,
      set: value => {
        ctx.emit('update:visible', value)
      }
    })

    watch(selection, val => {
      inputValue.value = val
    })

    const inputValue = ref('')

    const sites = reactive(initSites('tm'))

    const handleClick = (item, newWin) => {
      const keyword = inputValue.value
      if (newWin) {
        window.open(item.url.replace('%s', keyword))
      } else {
        window.location.href = item.url.replace('%s', keyword)
      }
    }

    return {
      localVisible,
      sites,
      inputValue,
      handleClick
    }
  }
}
</script>

<style lang="scss">
.se-input-box {
  box-shadow: 0 0 10px 3px #0000001a;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(8px);
  overflow: hidden;
  display: flex;
  border-radius: 23px;
  height: 46px;
  width: 50%;
  background-color: #fff;
  align-items: center;
  transition: .2s;
  color: #222;
  margin: 0 auto;
}

.se-input {
  color: var(--as-primary-text-color);
  background-color: transparent;
  font-size: 16px;
  height: 100%;
  width: 100%;
  line-height: 20px;
  margin: 0 20px;
  outline: none;
  border: none;
}

.se-container {
  background: #fff;
  display: flex;
  border-radius: 6px;
  box-shadow: 0 0 10px 3px #0000001a;
  padding: 20px;
  margin-top: 20px;
  overflow: auto;
  flex-wrap: wrap;
  height: 75vh;
}

.cate-container {
  flex: 0 0 150px;
  margin-bottom: 20px;
}

.cate-name {
  padding: 0 16px;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
}

.cate-list {
  list-style: none;
  min-width: 110px;
  box-sizing: border-box;

  .cate-item {
    box-sizing: border-box;
    padding: 0 16px;

    a {
      display: flex;
      align-items: center;
      height: 34px;
      text-decoration: none;
    }

    &:hover {
      background-color: var(--as-secondary-background-color);
      color: var(--as-primary-color);
    }
  }


}
</style>
