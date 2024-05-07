<template>
  <div
    v-if="favicon === 1"
    class="as-img-icon">
    <img
      :class="{error: isError}"
      :src="img"
      crossOrigin=""
      @error="handleError"
      @load="handleLoad">
  </div>
</template>

<script>
import { computed, ref, toValue } from 'vue'
import parseUrl from '../util/parseUrl'
import useFavicon from './useFavicon'
import { getStorage, setStorage } from '../util/storage'
import { debounce } from '../util'

const iconCache = ref({})
getStorage('iconCache', 'local').then(iconData => {
  iconCache.value = iconData || {}
})

const setStorageDebounce = debounce(() => {
  setStorage('iconCache', iconCache, 'local')
}, 1000)

export default {
  name: 'favicon',
  props: {
    url: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const isError = ref(false)

    const { hostname, origin } = parseUrl(props.url)
    const cache = toValue(iconCache)
    const img = computed(() => {
      if (isError.value) {
        return `${origin}/favicon.ico`
      } else if (cache[hostname]) {
        return cache[hostname]
      } else {
        return `https://favicon.yandex.net/favicon/v2/${encodeURI(hostname)}?size=32`
      }
    })

    const { favicon } = useFavicon()

    function getBase64Image (image) {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
      // 得到图片的base64编码数据
      return canvas.toDataURL('image/png', 1)
    }

    function handleLoad (e) {
      if (!isError.value && !img.value.startsWith('data:image')) {
        const base64 = getBase64Image(e.target)
        if (base64) {
          toValue(iconCache)[hostname] = base64
          setStorageDebounce()
        }
      }
    }

    function handleError () {
      isError.value = true
    }

    return {
      img,
      favicon,
      handleLoad,
      handleError,
      isError
    }
  }
}
</script>

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
