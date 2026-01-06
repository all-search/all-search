<script lang="ts">
import { computed, ref } from 'vue'
import { getStorage, setStorage } from '../util/storage'
import { debounce } from '../util'

const iconCache = ref<Record<string, string>>({})
const isLoaded = ref(false)
getStorage('iconCache', 'local').then(iconData => {
  iconCache.value = (iconData as Record<string, string>) || {}
}).finally(() => {
  isLoaded.value = true
})

const setStorageDebounce = debounce(() => {
  setStorage('iconCache', iconCache.value)
}, 1000)
</script>

<script setup lang="ts">
import parseUrl from '../util/parseUrl'
import useFavicon from './useFavicon'

const props = defineProps<{
  url?: string
  icon?: string
}>()

const isError = ref(false)

const { hostname, origin } = parseUrl(props.url || '')
const img = computed(() => {
  if (!isLoaded.value) {
    return ''
  }
  if (iconCache.value[hostname]) {
    return iconCache.value[hostname]
  } else if (!isError.value) {
    return faviconApi.value
  } else {
    return `${origin}/favicon.ico`
  }
})

const index = ref(0)

const faviconApis = computed(() => [
  props.icon,
  `https://favicon.yandex.net/favicon/v2/${encodeURI(hostname)}?size=32`,
  `https://invisible-scarlet-centipede.faviconkit.com/${encodeURI(hostname)}`,
  `${origin}/favicon.ico`
].filter((j): j is string => !!j))

const faviconApi = computed(() => faviconApis.value[index.value])

const { favicon } = useFavicon()

function getBase64Image (image: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext('2d')
  if (!context) return ''
  context.drawImage(image, 0, 0, image.width, image.height)
  // 得到图片的base64编码数据
  return canvas.toDataURL('image/png', 1)
}

function handleLoad (e: Event) {
  if (!isError.value && !img.value.startsWith('data:image')) {
    const base64 = getBase64Image(e.target as HTMLImageElement)
    if (base64) {
      iconCache.value[hostname] = base64
      setStorageDebounce()
    }
  }
}

function handleError (e: Event) {
  const target = e.currentTarget as HTMLImageElement
  if (target.src === faviconApi.value) {
    if (index.value === faviconApis.value.length - 1) {
      isError.value = true
    }
    index.value++
  }
}
</script>

<template>
  <div
    v-if="favicon === 1"
    class="as-img-icon">
    <img
      v-if="isLoaded"
      :class="{error: isError}"
      :src="img"
      crossOrigin=""
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
