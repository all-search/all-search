<script lang="ts">
import { computed, ref } from 'vue'
import { getStorage, setStorage } from '../util/storage'
import { debounce } from '../util'

const iconCache = ref<Record<string, string>>({})
const isLoaded = ref(false)
getStorage('iconCache').then(iconData => {
  iconCache.value = (iconData as Record<string, string>) || {}
}).catch(() => {
  // 无 GM 环境（插件/单测）时不上报未捕获异常
  iconCache.value = {}
}).finally(() => {
  isLoaded.value = true
})

const setStorageDebounce = debounce(() => {
  iconCache.value = trimIconCache(iconCache.value)
  setStorage('iconCache', iconCache.value)
}, 1000)
</script>

<script setup lang="ts">
import parseUrl from '../util/parseUrl'
import { faviconCandidates, isCorsFriendly, toIconDataUrl, trimIconCache } from '../util/favicon'
import useFavicon from './useFavicon'

const props = defineProps<{
  url?: string
  icon?: string
}>()

const emit = defineEmits<{
  /** 图片加载成功（缓存命中也会触发），调用方可以据此把兜底图标换掉 */
  (e: 'load'): void
  /** 所有候选都加载失败，调用方可以据此换兜底图标 */
  (e: 'error'): void
}>()

const isError = ref(false)

const { hostname } = parseUrl(props.url || '')
const index = ref(0)

const faviconApis = computed(() => faviconCandidates(props.url, props.icon))
const faviconApi = computed(() => faviconApis.value[index.value] || '')
/** 只有带 CORS 头的服务才加 crossorigin，否则连图都显示不出来 */
const corsAllowed = computed(() => isCorsFriendly(faviconApi.value))

const img = computed(() => {
  if (!isLoaded.value || isError.value) return ''
  return iconCache.value[hostname] || faviconApi.value
})

const { favicon } = useFavicon()

function handleLoad (e: Event) {
  emit('load')
  if (isError.value || !faviconApi.value || faviconApi.value.startsWith('data:image')) return
  if (!corsAllowed.value) return
  // 跨域图（站点自己的 /favicon.ico 等）没有 CORS 头，canvas 会被污染，
  // toIconDataUrl 内部已经 try/catch，返回空串就表示「只能看、不缓存」
  const base64 = toIconDataUrl(e.target as HTMLImageElement)
  if (base64) {
    iconCache.value[hostname] = base64
    setStorageDebounce()
  }
}

function handleError (e: Event) {
  const target = e.currentTarget as HTMLImageElement
  if (target.src !== faviconApi.value) return
  if (index.value >= faviconApis.value.length - 1) {
    isError.value = true
    emit('error')
    return
  }
  index.value += 1
}
</script>

<template>
  <div
    v-if="favicon === 1"
    class="as-img-icon">
    <img
      v-if="isLoaded && img"
      :key="index"
      :class="{error: isError}"
      :src="img"
      :crossorigin="corsAllowed ? 'anonymous' : undefined"
      @error="handleError"
      @load="handleLoad">
  </div>
</template>

<style lang="scss">
.as-img-icon {
  border: none;
  position: relative;
  font-size: 0;

  img {
    width: 100%;
    height: 100%;
    border: none;
    vertical-align: top;
  }

  img.error {
    display: inline-block;
    transform: scale(1);
    content: '';
    color: transparent;
  }

  img.error {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #f5f5f5 no-repeat center / 50% 50%;
    }

    &::after {
      content: attr(alt);
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      line-height: 2;
      background-color: rgba(0, 0, 0, .5);
      color: white;
      font-size: 12px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
