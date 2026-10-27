<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import icon from './icon.vue'
import favicon from './favicon.vue'
import useCategoryIcon from './useCategoryIcon'
import { categoryIconUrl } from '../util/categoryIcon'
import type { SiteCategory } from '../types/site'

/**
 * 分类图标（issue #90）。
 *
 * - 默认用 iconfont 里的内置 SVG（零请求）
 * - 设置里切成「首个站点图标」后，用该分类第一个启用站点的 favicon，
 *   加载失败或分类为空时自动退回内置 SVG
 */
const props = defineProps<{
  item: SiteCategory
}>()

const { categoryIconSource } = useCategoryIcon()
const failed = ref(false)
const loaded = ref(false)

const siteUrl = computed(() => categoryIconUrl(props.item))
const useSiteIcon = computed(() => categoryIconSource.value === 'site' && !!siteUrl.value && !failed.value)

watch(() => props.item.name, () => {
  failed.value = false
  loaded.value = false
})
watch(siteUrl, () => {
  failed.value = false
  loaded.value = false
})
</script>

<template>
  <span class="as-category-icon">
    <!-- 站点图标盖在内置图标上：加载完成前先显示内置的，避免空白 -->
    <icon
      v-if="!loaded"
      :name="item.name" />
    <favicon
      v-if="useSiteIcon"
      class="as-category-icon-site"
      :url="siteUrl"
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
  width: 1em;
  height: 1em;
  margin-right: 4px;
  vertical-align: -0.15em;

  .as-icon {
    margin: 0;
  }

  .as-category-icon-site {
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
}
</style>
