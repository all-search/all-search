<template>
  <popover
    :placement="placement"
    :trigger="isMobileRef ? 'click' : 'hover'"
    popper-class="as-subMenu-container">
    <template #reference>
      <div class="as-menu-item"
           :class="classList">
        <icon :name="item.name"/>
        <span
          class="as-menu-item-title"
          v-text="item.nameZh"
          @click="handleClick(item.list[0], false, isMobileRef)"
          @click.middle="handleClick(item.list[0], true)">
        </span>
      </div>
    </template>
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
  </popover>
</template>

<script>
import { computed, ref, unref } from 'vue'
import popover from 'element-plus/lib/el-popover'
import 'element-plus/lib/theme-chalk/el-popover.css'
import { siteInfo } from '../config/loadList'
import parseUrl from '../util/parseUrl'
import { getKeyword, isMobile } from '../util'
import icon from '../components/icon.vue'

export default {
  name: 'menuItem',
  components: {
    popover,
    icon
  },
  props: {
    item: {
      type: Object
    },
    mode: {
      type: String,
      default: 'horizontal'
    }
  },
  setup (props) {
    const isMobileRef = ref(isMobile())
    const currentSite = siteInfo()
    const classList = computed(() =>
      props.mode === 'horizontal' ? 'horizontal' : 'vertical'
    )
    const placement = computed(() =>
      props.mode === 'horizontal' ? 'bottom-start' : 'right-start'
    )

    function getFavicon (item) {
      if (item.icon) {
        return item.icon
      }
      const obj = parseUrl(item.url)
      const arr = obj.host.split('.')
      let mainDomain = obj.origin
      return `${mainDomain}/favicon.ico`
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
    const handleClick = (item, isOpen, disabled) => {
      const disVal = unref(disabled)
      if (disVal) {
        return
      }
      const keyword = defaultKeyword()
      if (isOpen) {
        window.open(item.url.replace('%s', keyword))
      } else {
        window.location.href = item.url.replace('%s', keyword)
      }
    }

    return {
      placement,
      classList,
      getFavicon,
      handleMenuShow,
      handleClick,
      isMobileRef
    }
  }
}
</script>
<style lang="scss">
  @import "../assets/common";

  .as-menu-item.horizontal {
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
  }

  .as-menu-item.vertical {
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
  }

  .as-menu-item {
    height: $height;
    line-height: $height;
    list-style: none;
    position: relative;
    color: var(--as-primary-text-color);
    transition: color .3s cubic-bezier(.645, .045, .355, 1), border-color .3s cubic-bezier(.645, .045, .355, 1), background .3s cubic-bezier(.645, .045, .355, 1);
    box-sizing: border-box;
    padding: 0 16px;
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
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

  }

  .el-popover.el-popper.as-subMenu-container {
    padding: 0;
  }

  .as-subMenu-container {
    .as-subMenu {
      list-style: none;
      padding: 0;
      min-width: 90px;
      box-sizing: border-box;
      margin: 4px 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

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
  }
</style>
