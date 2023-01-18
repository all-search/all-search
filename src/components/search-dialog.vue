<template>
  <as-dialog
    v-model:visible="localVisible">
    <template v-slot:header>
      <div class="se-header">
        <div class="se-input-box">
          <!--加v-if是为了不要被获取keyword的方法获取到这个input了-->
          <input
            v-if="localVisible"
            autofocus
            autocomplete="off"
            class="se-input"
            placeholder="输入并搜索"
            type="text"
            v-model="inputValue"
          />
        </div>
      </div>
    </template>
    <scrollbar
      class="se-scrollbar-container"
      noresize>
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
    </scrollbar>
  </as-dialog>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import asDialog from './dialog'
import icon from './icon'
import favicon from './favicon'
import { initSites } from '../util/sites'
import scrollbar from './scrollbar/src/scrollbar'

export default {
  name: 'search-dialog',
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
      default: ''
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

    watch(() => props.visible, val => {
      inputValue.value = val ? props.keyword : ''
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
.se-header {
  padding: 15px 20px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
}

.se-input-box {
  border: 1px solid #ccc;
  background-color: #FFFFFF;
  overflow: hidden;
  display: flex;
  border-radius: 6px;
  height: 40px;
  //width: 50%;
  align-items: center;
  transition: .2s;
  color: #222;
  //margin: 0 auto;

  &:hover {
    border-color: rgba(223, 225, 229, 0);
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
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
}

.se-scrollbar-container {
  height: 50vh;
}

.se-container {
  margin-top: 10px;
  display: flex;
  border-radius: 6px;
  flex-wrap: wrap;
}

.cate-container {
  flex: 0 0 150px;
  margin-bottom: 20px;
}

.cate-name {
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
}

.cate-list {
  list-style: none;
  min-width: 110px;
  box-sizing: border-box;
  padding: 0;

  .cate-item {
    box-sizing: border-box;
    padding: 0 10px;

    .as-subMenu-text {
      margin: 0;
    }

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
