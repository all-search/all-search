<template>
  <El-popper
    class="as-menu-item"
    trigger="hover"
    appendToBody>
    <template #reference>
      <div class="as-menu-item-title">
        <icon :name="item.name"/>
        <span
          v-text="item.nameZh"
          @click="handleClick(item.list[0])"
          @click.middle="handleClick(item.list[0], true)">
        </span>
      </div>
    </template>
    <!--<div class="as-subMenu-container">
      <ul class="as-subMenu">
        <li
          v-for="(child, i) in item.list"
          :key="`${item.name}_${i}`"
          v-show="child.data.visible"
          @click="handleClick(child)"
          @click.middle="handleClick(child, true)">
          <div class="as-url-icon">
            <img
              :src="getFavicon(child)"
              onerror="this.classList.add('error')">
          </div>
          <p class="as-subMenu-text"
             v-text="child.nameZh">
          </p>
        </li>
      </ul>
    </div>-->
  </El-popper>
</template>

<script>
import { computed, ref } from 'vue'
import ElPopper from 'element-plus/lib/el-popper'
import 'element-plus/packages/theme-chalk/src/popover.scss'
import { siteInfo } from '../config/loadList'
import parseUrl from '../util/parseUrl'
import { getKeyword } from '../util'
import icon from '../components/icon.vue'

export default {
  name: 'menuItem',
  components: {
    ElPopper,
    icon
  },
  props: {
    item: {
      type: Object
    }
  },
  setup (props) {
    const menuEl = ref(null)
    const subMenuEl = ref(null)
    const currentSite = siteInfo()

    const transition = computed(() =>
      props.mode === 'horizontal' ? 'drop' : 'fade'
    )

    function getFavicon (item) {
      if (item.icon) {
        return item.icon
      }
      const obj = parseUrl(item.url)
      const arr = obj.host.split('.')
      let mainDomain = obj.host
      if (arr.length > 2) {
        mainDomain = arr.slice(1).join('.')
      }
      return `https://ico.ihuan.me/${mainDomain}/cdn.ico`
      // return `https://api.iowen.cn/favicon/${mainDomain}.png`
      // return `http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=${mainDomain}`
      // return `https://api.jxcxin.cn/api/Favicon/api.php?url=${mainDomain}`
    }

    const handleMenuShow = (value, item) => {
      item.show = value
    }
    const defaultKeyword = () => {
      let keyword = getKeyword()
      if (currentSite && currentSite.keyword) {
        keyword = currentSite.keyword()
      }
      return encodeURIComponent(keyword)
    }
    const handleClick = (item, isOpen) => {
      const keyword = defaultKeyword()
      if (isOpen) {
        window.open(item.url.replace('%s', keyword))
      } else {
        window.location.href = item.url.replace('%s', keyword)
      }
    }

    return {
      menuEl,
      subMenuEl,
      transition,
      getFavicon,
      handleMenuShow,
      handleClick
    }
  }
}
</script>
<style lang="scss">
  @import "../assets/common";

  .as-menu-item.as-horizontal {
    position: relative;
    &::after {
      content: "";
      transform: scaleX(0);
      opacity: 0;
      transition: transform .15s cubic-bezier(.645, .045, .355, 1), opacity .15s cubic-bezier(.645, .045, .355, 1);
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      border-bottom: 2px solid var(--as-primary-color);
    }
    &:hover::after {
      transform: scaleX(1);
      opacity: 1;
    }
    /*    .as-subMenu-container {
          left: -22px;
          top: 24px;
        }*/
  }

  .as-menu-item.as-vertical {
    margin: 5px 0;
    position: relative;
    &::after {
      content: "";
      transform: scaleY(0);
      opacity: 0;
      transition: transform .15s cubic-bezier(.645, .045, .355, 1), opacity .15s cubic-bezier(.645, .045, .355, 1);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      border-right: 2.5px solid var(--as-primary-color);
    }
    &:hover::after {
      transform: scaleY(1);
      opacity: 1;
    }

    /*    .as-subMenu-container {
          left: $verticalWidth - 15px;
          top: -16px;
        }*/
  }

  .as-menu-item {
    height: $height;
    line-height: $height;
    list-style: none;
    position: relative;
    color: var(--as-primary-text-color);
    transition: color .3s cubic-bezier(.645, .045, .355, 1), border-color .3s cubic-bezier(.645, .045, .355, 1), background .3s cubic-bezier(.645, .045, .355, 1);
    box-sizing: border-box;
    &:hover {
      border-color: var(--as-primary-color);
      .as-menu-item-icon, .as-menu-item-title {
        color: var(--as-primary-color);
      }
    }
  }

  .as-menu-item-icon {
    color: var(--as-primary-text-color);
    margin: 1.25px 10px 0 0;
    line-height: $height - 1.25px;
  }

  .as-menu-item-title {
    height: 100%;
    padding: 0 16px;
    position: relative;
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: var(--as-primary-text-color);
  }

  .as-subMenu-container {
    position: relative;
    padding: 0 20px 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  .as-subMenu {
    list-style: none;
    padding: 4px 0;
    min-width: 90px;
    border: 1px solid #e4e7ed;
    border-radius: 2px;
    background-color: var(--as-bg-color);
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .12),
    0 6px 16px 0 rgba(0, 0, 0, .08),
    0 9px 28px 8px rgba(0, 0, 0, .05);
    box-sizing: border-box;
    margin: 10px 0;

    li {
      display: flex;
      align-items: center;
      padding: 0 16px;
      position: relative;
      overflow: hidden;
      height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: var(--as-secondary-background-color);
        color: var(--as-primary-color);
      }
    }

    .as-subMenu-text {
      flex: 1;
      font-size: 14px;
      text-overflow: ellipsis;
      color: var(--as-primary-text-color);
      white-space: nowrap;
      margin: 0;
      line-height: 34px;
      font-weight: normal;
    }

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
  }
</style>
