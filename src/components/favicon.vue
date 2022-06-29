<template>
  <div
    v-if="favicon === 1"
    class="as-url-icon">
    <img
      :src="img"
      onerror="this.classList.add('error')">
  </div>
</template>

<script>
import { computed } from 'vue'
import parseUrl from '../util/parseUrl'
import useFavicon from './useFavicon'

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
    const img = computed(() => {
      if (props.icon) {
        return props.icon
      }
      const obj = parseUrl(props.url)
      // return `${obj.origin}/favicon.ico`
      return `https://ico.hnysnet.com/get.php?url=${obj.origin}`
    })

    const { favicon } = useFavicon()

    return {
      img,
      favicon
    }
  }
}
</script>

<style lang="scss">
.as-url-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
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
