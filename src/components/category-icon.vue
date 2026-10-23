<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import favicon from './favicon.vue'
import useFavicon from './useFavicon'
import { getAsShadowRoot } from '../util/dom'
import { iconLetter, iconPalette } from '../util/favicon'
import { SiteCategory } from '../types/site'

/**
 * 分类图标 = 分类里第一个「启用」的站点图标。
 * 这样新增分类（AI、用户自建的 personal-*）不用再手绘 SVG，图标跟着内容走。
 *
 * 兜底顺序：站点图标 → 老的分类 SVG（iconfont.vue 里有就用）→ 首字母色块。
 * 站点图标加载出来之前先显示兜底，避免出现空白格。
 */
const props = defineProps<{
  item: SiteCategory
}>()

const { favicon: faviconMode } = useFavicon()

/**
 * 取列表里第一个可见站点，跟当前所在页面无关：
 * 这样即使当前站被「隐藏同站链接」过滤掉，分类图标也不会跳成第二个。
 */
const first = computed(() => {
  const list = (props.item.list || []) as any[]
  return list.find(child => child?.data?.visible !== false) || list[0] || null
})

const failed = ref(false)
const loaded = ref(false)
const hasSprite = ref(false)
const letter = computed(() => iconLetter(props.item.nameZh || props.item.name))
const letterStyle = computed(() => {
  const palette = iconPalette(props.item.name || props.item.nameZh || '?')
  return { background: palette.bg, color: palette.fg }
})

/** 老的分类还有手绘 SVG（iconfont.vue 里的 symbol），有就继续用，没有就显示首字母 */
const checkSprite = () => {
  hasSprite.value = !!getAsShadowRoot()?.querySelector(`#icon-${props.item.name}`)
}

onMounted(checkSprite)

watch(() => props.item.name, () => {
  failed.value = false
  loaded.value = false
  checkSprite()
})

watch(() => props.item.list, () => {
  failed.value = false
  loaded.value = false
})
</script>

<template>
  <span class="as-category-icon">
    <span
      v-if="!loaded"
      class="as-category-icon-fallback">
      <svg
        v-if="hasSprite"
        class="as-icon"
        aria-hidden="true">
        <use :xlink:href="`#icon-${item.name}`"></use>
      </svg>
      <span
        v-else
        class="as-category-icon-letter"
        :style="letterStyle"
        aria-hidden="true">{{ letter }}</span>
    </span>
    <favicon
      v-if="faviconMode === 1 && first && !failed"
      class="as-category-icon-img"
      :url="String(first.url || '')"
      :icon="first.icon"
      @load="loaded = true"
      @error="failed = true" />
  </span>
</template>

<style lang="scss">
.as-category-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 1.1em;
  height: 1.1em;
  margin-right: 5px;
  vertical-align: -0.15em;
  overflow: hidden;
  border-radius: 3px;

  .as-category-icon-fallback {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  /* favicon.vue 的根节点盖在兜底图标上，加载完成后才显示 */
  .as-category-icon-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    .as-img-icon {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .as-icon {
    margin: 0;
    width: 1em;
    height: 1em;
  }
}

.as-category-icon-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 0.62em;
  font-weight: 600;
  line-height: 1;
  border-radius: 3px;
  user-select: none;
}
</style>
