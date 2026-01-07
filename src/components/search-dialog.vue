<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import asDialog from './dialog.vue'
import icon from './icon.vue'
import favicon from './favicon.vue'
import useSites from './useSites'
import scrollbar from './scrollbar/src/scrollbar.vue'
import { Site } from '../types/site'

const props = withDefaults(defineProps<{
  visible?: boolean
  keyword?: string | number
}>(), {
  visible: false,
  keyword: ''
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const localVisible = computed({
  get: () => !!props.visible,
  set: value => {
    emit('update:visible', value)
  }
})

watch(() => props.visible, val => {
  inputValue.value = val ? String(props.keyword) : ''
})

const inputValue = ref('')

const { sites } = useSites('tm')

const handleClick = (item: Site, newWin: boolean) => {
  const keyword = inputValue.value
  const url = (item.url as string).replace('%s', keyword)
  if (newWin) {
    window.open(url)
  } else {
    window.location.href = url
  }
}
</script>

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
                 @click.exact="handleClick(child, false)"
                 @click.ctrl.exact="handleClick(child, true)"
                 @click.middle.exact="handleClick(child, true)">
                <favicon
                  class="as-url-icon"
                  :url="(child.url as string)"
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

<style lang="scss">
$bg: rgba(242, 242, 242, .9);
$bg1: #f3f3f3 radial-gradient(#eff4f9 75%, #f3f3f3 100%) no-repeat fixed;
$bg2: rgba(255, 255, 255, 0.67);

.se-header {
  padding: 15px 20px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
  background: #f3f3f3 radial-gradient(#eff4f9 75%, #f3f3f3 100%) no-repeat fixed;
}

.se-input-box {
  border: 1px solid #ccc;
  background-color: $bg2;
  overflow: hidden;
  display: flex;
  border-radius: 6px;
  height: 40px;
  align-items: center;
  transition: .2s;
  color: #222;

  &:hover {
    border-color: #fff;
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  }

  &:active {
    border-color: #fff;
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
  padding: 0 20px 20px;
  background: $bg1;
}

.se-container {
  margin-top: 10px;
  display: flex;
  border-radius: 6px;
  flex-wrap: wrap;
}

.cate-container {
  flex: 0 0 150px;
  margin: 0 10px 10px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: $bg2;
  padding: 6px;
}

.cate-name {
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  display: flex;
  align-items: center;
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
      color: var(--as-primary-text-color);
    }

    &:hover {
      background-color: #fff;
      color: var(--as-primary-color);
    }
  }
}
</style>
